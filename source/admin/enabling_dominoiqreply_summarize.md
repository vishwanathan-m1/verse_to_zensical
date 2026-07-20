# Enabling Domino IQ in Domino platform   
{% if isDominoWorkspace %}
{{ fullVerseProductName }} uses Domino IQ to provide AI-powered features that help users work more efficiently. Through the Domino IQ APIs, Verse can send requests to the Domino server, receive AI-generated results, and present them directly within the Verse user interface.  
{% else %}
In HCL Verse 3.2.7, Verse uses Domino IQ to provide AI-powered features that help users work more efficiently. Through the Domino IQ APIs, Verse can send requests to the Domino server, receive AI-generated results, and present them directly within the Verse user interface.  
{% endif %}
**Note:** Domino IQ must be installed and configured on the Domino server before this feature is available. See [Installing Domino IQ](https://help.hcl-software.com/domino/14.5.0/admin/conf_install_domino_iq.html).

This feature is disabled by default and can be enabled by applying the notes.ini setting VOP_GK_FEATURE_301=1 on the Domino server that runs Verse. This can only be enabled on a **Domino 14.5 or greater** server. The Verse endpoint `/verse/dominiq` is new in the Verse 3.2.7 release. This endpoint will open user's mail file on the Verse mail server and open the document in relation to the action being performed. The endpoint will then use the Domino IQ Java APIs that are installed on the mail server as part of Domino 14.5 or greater.

To learn how to generate summaries, see [Summarizing emails with Domino IQ](../user/dominoiq_summarize.md).
To learn how to generate automated responses, see [Have Domino IQ suggest a reply email](../user/dominoiq_reply.md).