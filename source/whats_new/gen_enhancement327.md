# General enhancements 
{% if isDominoWorkspace %}
{{ fullVerseProductName }} has the following general enhancements.
{% else %} 
HCL Verse 3.2.7 has the following general enhancements.
{% endif %}
{% if isDominoWorkspace %}
## **Domino Files Integration**
The Domino Workspace Files feature seamlessly integrates email collaboration with modern file management. Instead of sending large, static attachments that clog user inboxes, users can leverage the Files service directly within their email workflow.

With this feature, users can:

Send links to files, which insert secure, shareable links to documents and upload email attachments, which local files attached to an email straight into the files service.

See [Enabling Domino Workspace files service](../admin/enabling_dw_files_service.md) for Admin docs.

For more information see the [How do I send file links and save mail attachments to Domino files?](../user/how_do_i_send_file_links.md).
{% endif %}
## **Opening an email directly**

Emails can be opened directly in a web browser through the {{ shortVerseProductName }} user interface by using a specific URL pattern. When users access the URL, they're prompted to log in if they're not already authenticated. This capability is useful for bookmarking links to specific emails or agents that need to generate links to individual messages in a mail file. 

See [Access email messages through direct URLs](../admin/email_directURLs.md).
{% if isVerse %}
## **HCL Doc IQ chatbot**

The HCL Doc IQ chatbot transforms the way you interact with Help Center documentation by providing a conversational, AI-powered search experience. Instead of spending time navigating through multiple documentation pages or manually searching for specific topics, you can simply ask questions in natural language and receive clear, contextual answers based on the available documentation. For more information, see [HCL Doc IQ chatbot](../user/faq_dociqchat.md).

## **Installation update**

Starting with Verse 3.2.7, the Verse package no longer contains a copy of the HCL Domino 11.0.1 iwaredir.ntf file. The steps involving iwaredir.ntf have been removed from the installation and configuration documentation.

## **Modify-on send extension enhancement**

The modify-on-send extension for the Verse client now has a new optional feature. The extension can now return a value (sendEncrypted: true) in it's response that will cause the email to be sent as encrypted. For more information see the [Modify-on-send developer documentation](https://opensource.hcltechsw.com/Verse-Extension-Documentation/docs/extension-points/#modify-on-send).

## **Configuring XHR timeouts**

XHR requests made from the Verse client have a default timeout of 1 minute. Certain deployments may need to increase these timeout values. New notes.ini entries can now control the timeout length for GET and POST requests. 

See [Configuring XHR timeouts](../admin/EnhanccetimeoutXHR.md) for more information.
{% endif %}


{% if isDominoWorkspace %}
**Parent topic:** [What's new in Verse 3.2.7?](../whats_new/whats_new_3.2.7.md)
{% else %}
**Parent topic:** [What's new in Domino Workspace?](../whats_new/whats_new_3.2.7.md)
{% endif %}