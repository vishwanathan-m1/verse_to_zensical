(() => {
	// Smartcat inflight search-query translation for help.hcl-software.com
	//
	// Served as javascripts/SearchTranslation.js on every page of the site.
	//
	// How it works:
	//   Stage 1 (typing): Material posts {type: 2, data: "<query>"} to its search
	//     web worker on every keystroke. We intercept that message, debounce it,
	//     translate the query into the site's source language (English) through
	//     the Smartcat realtime-translation API, and forward the translated query
	//     to the worker instead.
	//   Stage 2 (Enter): natively, Enter opens the highest-scoring result.
	//     While a translation is still in flight the worker holds the previous
	//     (zero-result) state, so native Enter would silently do nothing.
	//     We hold the Enter key and open the best result once results arrive.
	//   Stage 3 (result links): Material appends ?h=<matched terms> to every
	//     result link, but those terms come from the translated (English) query,
	//     so on a translated page they highlight nothing. Just before a result
	//     link is followed we rewrite ?h= to the query as the user typed it.
	//   Stage 4 (highlighting): on the destination page Material applies ?h= as
	//     soon as its search index has loaded, which is usually before Smartcat
	//     has swapped the English DOM for the translation — the marks then land on
	//     text that is about to be replaced. We re-run the pass once the
	//     translated DOM has settled.
	//
	// window.sc is created asynchronously by __translator.js and is frequently not
	// there yet when this file runs, so nothing here may depend on it at load time:
	// the worker hook is installed unconditionally and resolves the translator per
	// query. A query that was already posted while the translator was still booting
	// (a ?q= deep link, or fast typing) is re-run as soon as it shows up.

	const BUILD = '2026-08-30b';   // shown in the install log: confirms which build is live

	if (window.__scSearchFix) {
	  console.warn(`[sc-search-fix] already installed by another copy of this script, so build ${BUILD} is doing nothing — remove the other copy`);
	  return;
	}

	// Every keystroke that crosses this gap costs one translation request. At 350ms,
	// typing a sentence at normal speed fired 52 requests and the API degraded to
	// 2.8s each; 700ms brings that down to 3, for ~0.45s more after the last keystroke.
	const DEBOUNCE_MS = 700;
	const TRANSLATOR_POLL_MS = 100;
	const TRANSLATOR_WAIT_MS = 20000;
	const ENTER_GATE_TIMEOUT_MS = 8000;
	const HIGHLIGHT_SETTLE_MS = 400;
	const HIGHLIGHT_MAX_WAIT_MS = 20000;
	const HIGHLIGHT_MIN_TERM_LENGTH = 2;
	const HIGHLIGHT_MIN_STEM_LENGTH = 4;   // shortest term allowed to match by prefix
	const SEARCH_INPUT_SELECTOR = '[data-md-component="search-query"], .md-search__input';

	const state = {
	  translationCache: new Map(),   // raw query -> translated query
	  debounceTimer: null,           // pending debounce timer for the last keystroke
	  latestRequestId: 0,            // supersedes stale keystrokes
	  awaitingRequestId: 0,          // the one request whose answer the UI still needs
	  enterPending: false,           // Enter was held back while a translation was in flight
	  enterAwaitingResults: false,   // translated query posted; next result message replays Enter
	  enterGateTimer: null,
	  log: []                        // inspect via window.__scSearchFix.log
	};
	window.__scSearchFix = state;

	const log = (...messageParts) => {
	  state.log.push(messageParts.join(' '));
	  console.debug('[sc-search-fix]', ...messageParts);
	};

	const getTranslator = () => {
	  const translator = window.sc;
	  return translator && typeof translator.translateTexts === 'function' ? translator : null;
	};

	// The locale pair a query has to be translated across, or null when there is
	// nothing to do: translator not up yet, or a visitor reading the source language.
	const translationRoute = () => {
	  const translator = getTranslator();
	  if (!translator) {
		return null;
	  }
	  const currentLocale = translator.getLocale && translator.getLocale();
	  const sourceLocale = translator.getSourceLocale && translator.getSourceLocale();
	  if (!currentLocale || !sourceLocale || currentLocale === sourceLocale) {
		return null;
	  }
	  return { translator, currentLocale, sourceLocale };
	};

	const whenTranslatorReady = (onReady) => {
	  if (getTranslator()) {
		onReady();
		return;
	  }
	  const startedAt = Date.now();
	  const poll = setInterval(() => {
		if (getTranslator()) {
		  clearInterval(poll);
		  onReady();
		} else if (Date.now() - startedAt >= TRANSLATOR_WAIT_MS) {
		  clearInterval(poll);
		  console.warn('[sc-search-fix] Smartcat translator (window.sc) never appeared; queries stay untranslated');
		}
	  }, TRANSLATOR_POLL_MS);
	};

	const isTranslationPending = () =>
	  state.debounceTimer !== null || state.awaitingRequestId !== 0;

	// Drops whatever translation is scheduled or in flight: its answer has been
	// superseded, and letting it land would overwrite fresher results.
	const cancelPendingTranslation = () => {
	  clearTimeout(state.debounceTimer);
	  state.debounceTimer = null;
	  state.awaitingRequestId = 0;
	  state.latestRequestId++;
	};

	const clearEnterGate = () => {
	  state.enterPending = false;
	  state.enterAwaitingResults = false;
	  clearTimeout(state.enterGateTimer);
	  state.enterGateTimer = null;
	};

	// Replays a gated Enter press once the translated query's results have been
	// rendered. Material opens the result with the highest data-md-score, which is
	// not the first link in the DOM — that one is the page-level result, and its
	// ?h= is empty — so mirror its choice exactly.
	const openBestSearchResult = () => {
	  // Give Material two animation frames to render the results dropdown.
	  requestAnimationFrame(() => requestAnimationFrame(() => {
		const resultContainer = document.querySelector('[data-md-component="search-result"]');
		const resultLinks = resultContainer ? resultContainer.querySelectorAll(':first-child [href]') : [];
		let bestLink = null;
		let bestScore = -Infinity;
		for (const resultLink of resultLinks) {
		  const article = resultLink.firstElementChild;
		  const score = article ? parseFloat(article.getAttribute('data-md-score')) : NaN;
		  if (score > bestScore) {
			bestScore = score;
			bestLink = resultLink;
		  }
		}
		if (!bestLink) {
		  log('gated Enter -> translated query has no results');
		  return;
		}
		log('gated Enter -> opening', bestLink.href);
		bestLink.click();
	  }));
	};

	// ---- Stage 1 (typing): intercept the search worker's QUERY messages ----
	// The worker may already exist by the time this file runs, so patch the
	// prototype — instance postMessage calls resolve through it.
	const originalPostMessage = Worker.prototype.postMessage;
	const hookedWorkers = new WeakSet();
	let searchWorker = null;

	const forwardQuery = (worker, query) => {
	  if (state.enterPending) {
		// This is the message whose answer the held Enter is waiting for.
		state.enterPending = false;
		state.enterAwaitingResults = true;
		clearTimeout(state.enterGateTimer);
		state.enterGateTimer = setTimeout(() => {
		  state.enterAwaitingResults = false;
		  log('gated Enter -> no results arrived, dropping the held Enter');
		}, ENTER_GATE_TIMEOUT_MS);
	  }
	  return originalPostMessage.call(worker, { type: 2, data: query });
	};

	Worker.prototype.postMessage = function (message, ...transferables) {
	  const isSearchQueryMessage =
		message && message.type === 2 && typeof message.data === 'string';
	  if (!isSearchQueryMessage) {
		return originalPostMessage.call(this, message, ...transferables);
	  }

	  // The first QUERY message identifies the search worker. Listen for its
	  // results so the Enter gate knows when the translated query was answered.
	  searchWorker = this;
	  if (!hookedWorkers.has(this)) {
		hookedWorkers.add(this);
		this.addEventListener('message', (workerEvent) => {
		  const isResultMessage = workerEvent.data && workerEvent.data.type === 3;
		  if (!isResultMessage || !state.enterAwaitingResults) {
			return;
		  }
		  clearEnterGate();
		  openBestSearchResult();
		});
	  }

	  const rawQuery = message.data.trim();
	  const route = translationRoute();

	  // Pass through untouched: empty query (clearing the box must clear results
	  // instantly), source-language visitors, or a translator that is still booting
	  // (whenTranslatorReady re-runs the query once it is up).
	  if (!rawQuery || !route) {
		cancelPendingTranslation();
		return originalPostMessage.call(this, message, ...transferables);
	  }

	  if (state.translationCache.has(rawQuery)) {
		cancelPendingTranslation();
		const cachedTranslation = state.translationCache.get(rawQuery);
		log(`cache "${rawQuery}" -> "${cachedTranslation}"`);
		return forwardQuery(this, cachedTranslation);
	  }

	  // Debounce: only the last keystroke gets translated; stale ones are dropped.
	  clearTimeout(state.debounceTimer);
	  const requestId = ++state.latestRequestId;
	  const isStillLatestRequest = () => requestId === state.latestRequestId;
	  const worker = this;

	  state.debounceTimer = setTimeout(async () => {
		state.debounceTimer = null;
		state.awaitingRequestId = requestId;
		try {
		  const startedAt = performance.now();
		  const apiResponse = await route.translator.translateTexts([rawQuery], route.currentLocale, route.sourceLocale);
		  const translatedQuery =
			((apiResponse && apiResponse[0] && apiResponse[0].translation) || rawQuery).trim() || rawQuery;
		  state.translationCache.set(rawQuery, translatedQuery);
		  log(`translated "${rawQuery}" -> "${translatedQuery}" in ${Math.round(performance.now() - startedAt)}ms`);
		  if (isStillLatestRequest()) {
			forwardQuery(worker, translatedQuery);
		  }
		} catch (error) {
		  console.warn('[sc-search-fix] translation failed, forwarding raw query', error);
		  if (isStillLatestRequest()) {
			forwardQuery(worker, rawQuery);
		  }
		} finally {
		  if (state.awaitingRequestId === requestId) {
			state.awaitingRequestId = 0;
		  }
		}
	  }, DEBOUNCE_MS);
	};

	// Re-runs whatever is in the search box through the hook above. Covers the
	// queries Material posted before the translator existed — a ?q= deep link, or
	// the first keystrokes of a visitor who started typing straight away.
	const reissueCurrentQuery = () => {
	  const searchInput = document.querySelector(SEARCH_INPUT_SELECTOR);
	  const currentQuery = searchInput && searchInput.value.trim();
	  if (!currentQuery || !searchWorker) {
		return;
	  }
	  log(`re-running "${currentQuery}" now that the translator is up`);
	  searchWorker.postMessage({ type: 2, data: currentQuery });
	};

	// ---- Stage 2 (Enter): gate Enter while a translation is still in flight ----
	document.addEventListener('keydown', (keyEvent) => {
	  const target = keyEvent.target;
	  const isSearchInput =
		target && target.matches && target.matches(SEARCH_INPUT_SELECTOR);
	  if (!isSearchInput) {
		return;
	  }

	  if (keyEvent.key !== 'Enter') {
		// The user kept editing, or pressed Escape: a held Enter belongs to a query
		// they have moved on from, and replaying it would navigate them away.
		clearEnterGate();
		return;
	  }

	  if (isTranslationPending()) {
		log('Enter gated: waiting for translation');
		state.enterPending = true;
		keyEvent.preventDefault();
		keyEvent.stopImmediatePropagation();
	  }
	}, true);

	// ---- Stage 3 (result links): put the user's own words into ?h= ----
	// The destination page highlights whatever terms ?h= carries against its
	// visible (translated) text, so the terms must be in the page language, not
	// the source language Lunr was queried with. Capture phase runs before
	// Material's instant-navigation click handler reads the href, so rewriting
	// here covers both a mouse click and the synthetic click from the Enter gate.
	document.addEventListener('click', (clickEvent) => {
	  const resultLink = clickEvent.target instanceof Element &&
		clickEvent.target.closest('.md-search-result__link');
	  if (!resultLink || !translationRoute()) {
		return;
	  }

	  const searchInput = document.querySelector(SEARCH_INPUT_SELECTOR);
	  const rawQuery = searchInput && searchInput.value.trim();
	  const url = new URL(resultLink.href);
	  if (!rawQuery || !url.searchParams.get('h')) {
		return;
	  }

	  // Material only ever puts index terms it actually matched into ?h=, and Lunr has
	  // already dropped stopwords from those. The raw query has been through none of that,
	  // so a whole typed sentence would light up "die", "für", "Sie" across the destination
	  // page. Keep the words long enough to be worth marking — unless that leaves nothing,
	  // as it would for a short one-word query like "PDF".
	  const highlightWords = (rawQuery.match(/[\p{L}\p{N}]+/gu) || [])
		.filter((word) => word.length >= HIGHLIGHT_MIN_STEM_LENGTH);
	  const highlightQuery = highlightWords.length ? highlightWords.join(' ') : rawQuery;

	  url.searchParams.set('h', highlightQuery);
	  resultLink.href = url.toString();
	  log(`highlight param rewritten -> "h=${highlightQuery}"`);
	}, true);

	// ---- Stage 4 (highlighting): re-apply ?h= to the translated page ----
	// German inflection mutates the vowel: a page about "Anhang" only ever writes
	// "Anhänge" / "Anhängen", so literal matching (Material's and ours) finds nothing.
	// Compare with diacritics folded away, and treat a term as matching any longer word
	// it starts, or a shorter word that starts it. Terms below the stem length must match
	// exactly, so that stopwords in a long query do not light up half the page.
	const foldWord = (text) =>
	  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').toLowerCase();

	const wordMatchesTerm = (foldedWord, foldedTerm) => {
	  if (foldedWord === foldedTerm) {
		return true;
	  }
	  const isWordShorter = foldedWord.length < foldedTerm.length;
	  const shorter = isWordShorter ? foldedWord : foldedTerm;
	  const longer = isWordShorter ? foldedTerm : foldedWord;
	  return shorter.length >= HIGHLIGHT_MIN_STEM_LENGTH && longer.startsWith(shorter);
	};

	const highlightTerms = (terms) => {
	  const foldedTerms = (terms.match(/[\p{L}\p{N}]+/gu) || [])
		.filter((word) => word.length >= HIGHLIGHT_MIN_TERM_LENGTH)
		.map(foldWord);
	  if (!foldedTerms.length) {
		return;
	  }

	  let markCount = 0;
	  for (const root of document.querySelectorAll('[data-md-component="content"]')) {
		const candidateNodes = [];
		const textNodes = document.createNodeIterator(root, NodeFilter.SHOW_TEXT);
		for (let node = textNodes.nextNode(); node; node = textNodes.nextNode()) {
		  const parent = node.parentElement;
		  // Skip invisible text (Material does the same) and anything Material
		  // already marked, so a pass that lost the race cannot double-wrap it.
		  if (!parent || !parent.offsetHeight || parent.closest('mark[data-md-highlight]')) {
			continue;
		  }
		  candidateNodes.push(node);
		}
		for (const node of candidateNodes) {
		  // Odd pieces are words, even ones the spaces and punctuation between them.
		  const pieces = node.textContent.split(/([\p{L}\p{N}]+)/u);
		  const replacement = [];
		  let matchedHere = false;
		  pieces.forEach((piece, index) => {
			if (!piece) {
			  return;
			}
			const isWord = index % 2 === 1;
			if (isWord && foldedTerms.some((term) => wordMatchesTerm(foldWord(piece), term))) {
			  const mark = document.createElement('mark');
			  mark.setAttribute('data-md-highlight', '');
			  mark.textContent = piece;
			  replacement.push(mark);
			  markCount++;
			  matchedHere = true;
			} else {
			  replacement.push(document.createTextNode(piece));
			}
		  });
		  if (matchedHere) {
			node.replaceWith(...replacement);
		  }
		}
	  }
	  log(`re-highlighted "${terms}" -> ${markCount} marks`);
	};

	// Smartcat replaces the page text node by node, so wait for the DOM to stop
	// changing before highlighting; the deadline covers a page that never settles.
	const scheduleHighlightPass = () => {
	  const terms = new URL(location.href).searchParams.get('h');
	  const root = document.querySelector('[data-md-component="content"]');
	  if (!terms || !root) {
		return;
	  }

	  let settleTimer = null;
	  let deadlineTimer = null;
	  const observer = new MutationObserver(() => {
		clearTimeout(settleTimer);
		settleTimer = setTimeout(runPass, HIGHLIGHT_SETTLE_MS);
	  });

	  function runPass() {
		clearTimeout(settleTimer);
		clearTimeout(deadlineTimer);
		observer.disconnect();
		highlightTerms(terms);
	  }

	  observer.observe(root, { childList: true, subtree: true, characterData: true });
	  settleTimer = setTimeout(runPass, HIGHLIGHT_SETTLE_MS);
	  deadlineTimer = setTimeout(runPass, HIGHLIGHT_MAX_WAIT_MS);
	};

	log(`installed: build ${BUILD}, debounce ${DEBOUNCE_MS}ms`);
	whenTranslatorReady(() => {
	  const route = translationRoute();
	  log(`translator up: ${route ? `${route.currentLocale} -> ${route.sourceLocale}` : 'source language, nothing to translate'}`);
	  reissueCurrentQuery();
	  if (route) {
		scheduleHighlightPass();
	  }
	});
})();
