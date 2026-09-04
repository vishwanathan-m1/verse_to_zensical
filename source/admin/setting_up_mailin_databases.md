# Setting up mail-in databases

You can create mail-in databases on the Domino server that {{ fullVerseProductName }} users can open through the delegation panel.

A mail-in database is a mail and calendar file that is created on the server for multiple users to share. People who are given access to a mail-in database, can open it through the delegation panel in {{ shortVerseProductName }}.

For information on creating a mail-in database, see the [Creating a mail-in database for a new database](https://help.hcltechsw.com/domino/14.5.0/admin/admn_creatingamailindatabasedocumentforanewdatabase_t.html) in the Domino documentation. The following are the requirements to use mail-in databases in {{ fullVerseProductName }}:

-   The mail-in database must be created from the mail template \(mail&lt;x&gt;.ntf\).
{% if isVerse %}
-   The mail-in database must be on a Domino server running one of the following versions: 11.0.1 FP3+, 10.0.1 FP7+, 12.0+
{% endif %}
-   The **Mail-in name** field in the Mail-In Database document must also be in the Notes name format, for example, `HRmailin/Baldwin`.
{% if isVerse %}
-   The owner of the mail-in database must be specified in the Notes name format, for example, `HRmailin/Baldwin`. To specify the owner, from HCL Notes, click **More** &gt; **Preferences**.
{% else %}
-   The owner of the mail-in database must be specified in the Notes name format, for example, `HRmailin/Baldwin`.
{% endif %}
-   The **Internet Address** field in the Mail-In Database document must have a valid address.

For information on how users open a mail-in database in {{ shortVerseProductName }}, see the topic [How do I open a mail-in database?](../user/faq_mailindatabase.md) in the user documentation.

