# Enabling Domino IQ in Domino platform   

{{ fullVerseProductName }} uses Domino IQ to provide AI-powered features that help users work more efficiently. Through the Domino IQ APIs, {{ shortVerseProductName }} can send requests to the Domino server, receive AI-generated results, and present them directly within the {{ shortVerseProductName }} user interface.  

**Note:** Domino IQ must be installed and configured on the Domino server before this feature is available. See [Installing Domino IQ](https://help.hcl-software.com/domino/14.5.0/admin/conf_install_domino_iq.html).

This feature is disabled by default and can be enabled by applying the notes.ini setting VOP_GK_FEATURE_301=1 on the Domino server that runs {{ shortVerseProductName }}. This can only be enabled on a **Domino 14.5 or greater** server. The {{ shortVerseProductName }} endpoint `/verse/dominoiq` is new in the long {{ fullVerseProductName }} release. This endpoint will open user's mail file on the {{ shortVerseProductName }} mail server and open the document in relation to the action being performed. The endpoint will then use the Domino IQ Java APIs that are installed on the mail server as part of Domino 14.5 or greater.

To learn how to generate summaries, see [Summarizing emails with Domino IQ](../user/dominoiq_summarize.md).
To learn how to generate automated responses, see [Have Domino IQ suggest a reply email](../user/dominoiq_reply.md).