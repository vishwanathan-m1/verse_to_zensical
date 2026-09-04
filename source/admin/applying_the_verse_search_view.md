# Applying the {{ shortVerseProductName }} search view changes to existing mail files

The advanced feature descibed in [How to search for emails from a user sent by a delegatee](../user/how_to_search_emails_sent_in_deligation_mode.md), added in Verse 3.2.5, requires an update to user's mail file design if the users' mail file design is using a mail template prior to HCL Domino 14.5.1. The design updates are in the supplied vopdesign.nsf at the root of the {{ shortVerseProductName }} install kit.

If users' mail file designs are not using the HCL Domino 14.5.1 (or greater) mail template, follow these steps to apply the {{ shortVerseProductName }} search view changes to your mail file templates:

1.  Copy the vopdesign.nsf to the Domino data directory.

2.  Make a backup of your existing mail file templates.

3.  In HCL Domino Designer, open the mail templates being used by your users on the server.

4.  Delete the following views from your mail template on the server: `($VerseLookup)`and `($VerseTrashLookup)`

5.  In HCL Domino Designer, open the vopdesign.nsf file that you copied to the data directory.

6.  Copy the following views from the vopdesign.nsf to the mail template on the server: `($VerseLookup)`and `($VerseTrashLookup)`.

7.  Save the mail file templates.

8.  Sign the mail file templates using a trusted Notes ID used for signing Template Design elements.

9.  In the Domino server console, type the following commands:

    ```
        load design
        load updall -R
    ```

    If you want to apply the view changes to individual mail files, follow the same steps using the specific mail files instead of the mail file templates.

    **Note:** The design changes need to be applied when the server is running Verse 3.2.5 and above. If an older version of {{ shortVerseProductName }} is deployed and the design changes are applied, {{ shortVerseProductName }} users will see issues with the search results.


