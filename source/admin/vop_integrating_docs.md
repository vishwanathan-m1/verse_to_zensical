# Integrating with HCL Connections Docs

You can configure {{ fullVerseProductName }} to work with HCL Connections Docs™ 2.0 to get an enhanced preview for file attachments. Integration with Docs enables {{ shortVerseProductName }} users to preview PDF, Microsoft Office, OpenOffice and other types of file attachments when reading and composing messages, without having to download those attachments first.

**Note:**

-   SAML authentication and previewing and sharing attachments in encrypted messages are not supported in this release.
-   Do not use the iNotes\_WA\_Security\_NonceCheck=0 notes.ini setting on the server. Doing so will prevent attachment previewing.

1.  Install HCL Connections Docs 2.0. For information, see the [HCL Connections Docs documentation](https://help.hcl-software.com/connections/latest/admin/install/t_inst_deploy_file_viewr.html).
2.  Enable CORS on J Docs to allow cross origin requests. {{ shortVerseProductName }} uses Docs JavaScript API to communicate with Docs. To enable CORS access, the Domino server's domain name must be added into the WhiteDomainList of Docs. For more information, see the [HCL Connections Docs documentation](https://ds_infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=HCL+Connections+8.0+API+Documentation#action=openDocument%26res_title=Cross-Origin_Resource_Sharing_80%26content=apicontent).

    **Note:** {{ shortVerseProductName }} communicates with Docs' Viewer component. So in addition to concord-config.json, WhiteDomainList field inside viewer-config.json also needs to be updated.

    Example:

    ```
    "WhiteDomainList": ["https://mail.hcl.com"],
      "IHS_fast_download": {
        "cache_root_alias": "/rendition_content",
        "enabled": "false"
    },
    ```

    **Note:** If you are using a proxy server in front of the Domino server, the proxy server's domain name must be added to the **WhiteDomainList** of Docs.

3.  Enable DAOS on the Domino server to improve preview performance.

    Domino Attachment and Object Service \(DAOS\) enables an attachment to be identified using a unique key \(DAOS key\) that's generated based on the attachment data. For more information on DAOS, see **Attachment consolidation** in the [HCL Domino documentation](https://help.hcltechsw.com/domino/welcome/index.html). When previewing an attachment in a DAOS-enabled mail file, {{ shortVerseProductName }} will use the DAOS key to check if the attachment has already been cached in Docs. This avoids having to transfer the attachment again if it has already been cached.

4.  Add `Create_R85_Databases=1` to Domino server's notes.ini and restart Domino.
5.  From the server console, enter: `load compact -c` to upgrade mail files. This will perform a copy style compact of all databases and upgrade mail files to the current ODS level.

**Note:** Mail files should not be used during the compact process, otherwise the compact operation may fail to execute.

**Parent topic:** [Integrating with Connections](../admin/vop_integrating_with_connections.md)

