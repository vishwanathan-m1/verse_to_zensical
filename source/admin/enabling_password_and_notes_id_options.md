# Enabling password and Notes ID options

As of Verse 1.0.8, features are available in Security settings for users to change the passwords they use to log in to Verse, change their Notes ID passwords, and manage their Notes IDs. This topic describes the configuration requirements for each of these features.

**Note:** These features require Verse running on a Domino 10.0.1 FP2 or later server.

For more information on using these features, see [How do I manage passwords and my Notes ID?](../user/faq_manage_ids_t.md).

<table markdown id="table_on3_s1n_rhb"><thead><tr><th>

Option in user Security settings

</th><th>

Requirement

</th></tr></thead><tbody><tr><td>

Change the internet password to use to log in to Verse.1

</td><td>

Administrators must enable the following options: -   **Modification of Internet Password** in the Verse tab of the server Configuration document.
-   **Allow users to change Internet Password over HTTP** option in Password Management &gt; Basics tab of Security Settings policy.

</td></tr><tr><td>

Display information about your Notes ID file and manage certificates.

</td><td>

Requires a Notes ID in the ID vault or in the mail file.

</td></tr><tr><td>

Sync your Notes ID with the copy on an ID vault on a server.

</td><td>

Requires a Notes ID in the ID vault.

</td></tr><tr><td>

Import your Notes ID into your mail file.

</td><td>

Requires a local copy of the ID file.

</td></tr><tr><td>

Delete your Notes ID from your mail file.

</td><td>

Requires a Notes ID in the mail file

 Administrators must enable the option **Allow users to delete their Notes ID from their mail database** in the Verse tab of the server Configuration document.

</td></tr><tr><td>

Export your Notes ID from your mail file to save a local copy.

</td><td>

Requires a Notes ID in the mail file.

 Administrators must enable the option **Allow users to Export their Notes ID** in the Verse tab of the server Configuration document.

</td></tr><tr><td>

Change your Notes ID password.1

</td><td>

Requires a Notes ID in the ID vault or in the mail file.

</td></tr></tbody>
</table>1 If you enable the security setting **Update Internet password when Notes client password changes** in the Password Management &gt; Basics tab of Security Settings policy, users sees just one option, **Change Password**, in Security settings.

