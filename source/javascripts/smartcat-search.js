document.addEventListener("DOMContentLoaded", function () {
    // Target the search input field
    var searchInput = document.querySelector(".md-search__input");
    if (searchInput) {
      // If Smartcat requires it as an HTML attribute:
      searchInput.setAttribute("sc-autotranslate", "true");
      
      // If Smartcat requires it as a CSS class instead, uncomment the line below:
      // searchInput.classList.add("sc-autotranslate");
    }
  
    // Target the search form container (optional, depending on Smartcat requirements)
    var searchForm = document.querySelector(".md-search__form");
    if (searchForm) {
      searchForm.setAttribute("sc-autotranslate", "true");
    }
  });