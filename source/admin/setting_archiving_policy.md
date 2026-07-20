# Setting up archive policies

The Verse client provides users with the capability to access server-side mail archives, as well as the option to archive documents directly into those archives. Archiving a document from a Verse client requires you to be online and requires the archive mail file to be on a server. The list of archive mail files that are displayed to the user come from two sources:

-   HCL Notes client archive settings.
-   Archive policies and criteria. See below on how to set this up for Verse.

1.  From the HCL Domino® Administrator, click the **People &amp; Groups** tab, and then open the **Settings**view.

2.  Click **Add Settings** and then select **Archiving**.

3.  On the **Basics** tab, complete these fields:

    -   **Name** -- Enter a name that identifies the users or the settings themselves.
    -   **Description** -- Enter a description of the settings.
4.  Make sure **Prohibit archiving** is not selected.

5.  Under **Archiving will be performed on**, choose **Server**.

6.  Under **Archiving source database is on**, specify the server on which the mail file that will be archived is located.

    Choose one:

    -   **Specific server** -- Choose this option if the mail file is on a server other than the user's designated mail server. Specify the name of the server in the *Choose Source Server* section. Any scheduled archive function will be performed against a mail file replica on the specified server.

        **Note:** If *__specific server__* is chosen, if the Verse user is logged in to a server that is not the selected *source database*, then archiving actions from the Verse client will not complete successfully.

    -   **Mail server**-- Choose this option if the mail file is on the mail server.
7.  Under **Destination database is on**, specify the server on which the archive database and archive log will reside.

    Choose one:

    -   **Specific server**-- to create the mail archive database on a server other than the mail server. After selecting this option, specify the name of the server in the *Choose Destination Server* section.
    -   **Mail server**-- to create the mail archive database on the user's designated mail server.

        **Note:** If *__mail server__* is chosen, for Verse client archive actions to complete successfully from any mail server, there must be a replica of the archive mail file on all mail servers.

8.  On the **Selection Criteria** tab, do one or more of the following:

    -   Click **New Criteria** to create a new *Archive Criteria Settings* document. Then, click **Add Criteria** and select your newly-defined criteria document. See the related topics for instructions on specifying details of the criteria in the new document.
    -   Click **Add Criteria**, and then choose one or more *Archive Criteria Settings* documents to add to your archiving settings.
    -   Click **Remove Criteria**, and then choose one or more *Archive Criteria Settings* document to remove from your archiving settings.
    **Note:** The database defined in the criteria will be listed as an available archive in the Verse client.

9.  On the **Logging** tab, complete any of the desired fields.

10. The **Schedule** tab only applies to HCL Notes clients.

11. On the **Advanced** tab, complete any of the desired fields.

12. Save the document.


**Related information**  


[How can I manage my archived mail?\(HCL Verse documentation\)](../user/faq_archived_mail_.md)

[Creating an archiving policy settings document \(HCL Domino documentation\)](https://help.hcl-software.com/domino/14.5.0/admin/conf_creatinganarchivepolicysettingsdocument_t.html)

