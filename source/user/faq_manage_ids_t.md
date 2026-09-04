# How do I manage passwords and my Notes ID?

{% if isVerse %}
If your administrator allows you to, you can use Security settings to change the password you use to log on to Verse, to change your Notes ID password, and to manage your Notes ID. 
{% else %}
You can use Security settings to change the password you use to log on to {{ shortVerseProductName }}.
{% endif %}

From the navigation bar, click your profile image and click **{{ shortVerseProductName }} Settings**. In the Security section, use any of the options described in the following table.

**Note:**

{% if isVerse %}
-   These features require {{ shortVerseProductName }} running on a Domino 10.0.1 FP2 or later server.
-   Your administrator controls whether you see these options.
-   To use these features, allow your browser to display popups from the {{ shortVerseProductName }} server.
{% else %}
To use these features, allow your browser to display popups from the {{ shortVerseProductName }} server.
{% endif %}

{% if isVerse %}
| Option | Description |
| :--- | :--- |
| **Change Internet Password** | To change the password you use to log in to {{ shortVerseProductName }}, click **Change** under **Change Internet Password**, and then follow the instructions that are shown. You might have to wait anywhere from five minutes to several hours for the change to take effect depending on server settings; wait for your old password to stop working before using your new one. |
| **Notes ID Info** | To see information about your Notes ID and its certificates, next to **Your mail file CONTAINS a Notes ID**, click **Notes ID Info**.<br><br>• To see information about your Notes certificate, click **Show Details**.<br>• To see and manage your Internet certificates, click **Manage Internet Certificates**. Take any of the following steps to import, export, or delete Internet certificates:<br>&nbsp;&nbsp;&nbsp;&nbsp;– **Import:** Click **Import**, locate the Internet certificate (typically in a file with a `.p12` extension), type the password for the Internet certificate, and click **OK**.<br>&nbsp;&nbsp;&nbsp;&nbsp;– **Export:** Click **Export**, type and then retype your password for the certificate, and click **OK**. Then click **Save** and select a location for the exported certificate file.<br>&nbsp;&nbsp;&nbsp;&nbsp;– **Delete:** Click **Delete**. If you do not have access to delete your Internet certificate, an error message displays. |
| **Sync with Vault** | To sync your Notes ID with the one in the ID vault on a server, click **Sync with Vault**. If your mail file does not contain your Notes ID, synchronizing with the ID vault also adds a copy of your Notes ID to your mail file. |
| **Import Notes ID** | Use this option to import your Notes ID into your mail file so that you can sign, encrypt, and decrypt messages:<br>1. Click **Import Notes ID**.<br>2. Browse and select your Notes ID file.<br>3. Type your Notes ID password. |
| **Delete Notes ID** | To delete your Notes ID from your mail file, click **Delete Notes ID**. |
| **Export Notes ID** | To save a local copy of your Notes ID file, click **Export Notes ID**. |
| **Change Notes ID Password** | To change the password for your Notes ID, next to **Change Notes ID Password**, click **Change**. Type your old and new Notes ID passwords as prompted. |

**Note:** Your administrator may require that your Internet password and your Notes ID password be the same. If so, you see just one option, **Change Password**.
{% else %}
| Option | Description |
| :--- | :--- |
| **Change Internet Password** | To change the password you use to log in to {{ shortVerseProductName }}, click **Change** under **Change Internet Password**, and then follow the instructions that are shown. You might have to wait anywhere from five minutes to several hours for the change to take effect depending on server settings; wait for your old password to stop working before using your new one. |
| **Notes ID Info** | To see information about your Notes ID and its certificates, next to **Your mail file CONTAINS a Notes ID**, click **Notes ID Info**.<br><br>• To see information about your Notes certificate, click **Show Details**.<br>• To see and manage your Internet certificates, click **Manage Internet Certificates**. Take any of the following steps to import, export, or delete Internet certificates:<br>&nbsp;&nbsp;&nbsp;&nbsp;– **Import:** Click **Import**, locate the Internet certificate (typically in a file with a `.p12` extension), type the password for the Internet certificate, and click **OK**.<br>&nbsp;&nbsp;&nbsp;&nbsp;– **Export:** Click **Export**, type and then retype your password for the certificate, and click **OK**. Then click **Save** and select a location for the exported certificate file.<br>&nbsp;&nbsp;&nbsp;&nbsp;– **Delete:** Click **Delete**. If you do not have access to delete your Internet certificate, an error message displays. |
{% endif %}
**Parent topic:** [User Documentation](../user/welcometoibmverse.md)

