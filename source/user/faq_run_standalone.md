# How do I run {{ shortVerseProductName }} as a standalone app?

{% if isVerse %}
Beginning with HCL Verse 2.0, you can install and run HCL Verse as a standalone browser app that is based on progressive web app (PWA) technology.
{% else %}
You can install and run {{ fullVerseProductName }} as a standalone browser app that is based on progressive web app (PWA) technology.
{% endif %}

As a PWA, {{ shortVerseProductName }} runs in its own window rather than as a tab in your browser. You start and stop it as you do other installed browser apps.

{% if isDominoWorkspace %}
{{ shortVerseProductName }} as a standalone browser app is currently supported for the following browsers.
{% else %}
Verse as a standalone browser app is currently supported for the following browsers. For supported browser versions, see the [Verse 2.0 system requirements](https://support.hcl-software.com/csm?id=kb_article&sysparm_article=KB0041937).
{% endif %}

-   Chrome on Microsoft™ Windows™, Mac OS, and Android
-   Microsoft™ Edge \(80+\) on Microsoft™ Windows™
-   Apple Safari on iOS

To install {{ shortVerseProductName }} as a standalone app:

1.  Log in to {{ shortVerseProductName }} through the server browser URL, for example: `https://baldwin-design.com/verse`.

2.  Install the {{ shortVerseProductName }} app.

    The browser may indicate that there is an app to be installed. For example, on Chrome running on Windows, a + icon is shown in the browser bar, which you can click to install the {{ shortVerseProductName }} app:

    ![The plus (+) icon](images/install_app_chrome_sm_icon.png)

    ![Picture of the prompt that says "Install app?"](images/install_app_chrome.png)

    On some browsers the prompt to install {{ shortVerseProductName }} is shown automatically

    On mobile devices, you are given instructions about how to add the {{ shortVerseProductName }} app to your home screen.


{{ shortVerseProductName }} immediately starts in its own window. Stop, start, or uninstall {{ shortVerseProductName }} just as you do other installed browser apps.

{% if isVerse %}
![Picture of {{ shortVerseProductName }} running as a standalone app](images/verse_pwa.png)
{% endif %}

**Parent topic:** [User Documentation](../user/welcometoibmverse.md)

