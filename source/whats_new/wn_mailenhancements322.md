# Mail enhancements

HCL Verse 3.2.2 provides the following features and enhancements related to Mail.

## Preview text file attachments

HCL Verse 3.2.2 allows a user to preview file attachments that are text files, without downloading them. For example, .txt, .text, etc. The user can click on the file name to preview the file.

## Allow opening a delegator's Archive mail file

HCL Verse 3.2.2 now allows a user to access a delegator's Archive mail files. For more information, see [Accessing delegator's Archive mail file](../user/faq_delegated_access_to_me_on_prem.md#section_agm_n1r_1cc).

## 'Modify on send' extension update

Beginning with HCL Verse 3.2.2, the **Modify on send** extension can now modify the body of a mail. The extension allows you to invoke custom logic to modify mail before it is sent. In order to modify the body, the extension needs to return the new body. For example:

```
modifiedContext: {
    subject: "The subject of this message has been modified",
    signature: "This email and any attached files are confidential and intended solely for the use of the individual(s) to whom they are addressed.",
    body: `My Disclaimer: ${context.body}`
}
```

This enhancement is not enabled by default. For more information, see [Enabling advanced Modify on Send extension](../admin/enabling_advanced_modify_on_send_extension.md) and [Verse Extension documentation](https://opensource.hcltechsw.com/Verse-Extension-Documentation/docs/extension-points/#modify-on-send).

**Parent topic:** [What's new in Verse 3.2.2?](../whats_new/whatsnew_3.2.2.md)

