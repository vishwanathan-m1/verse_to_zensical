# Configuring integration with HCL Sametime

Starting with Verse 3.1.0, integration with Sametime 12 is supported.

## Before you begin

-   Configure Sametime integration for HCL Verse. For more information, see the topic [Integrating with HCL Verse](https://pages.git.cwp.pnp-hcl.com/CWPdoc/sametime-MKDocs/v1203/admin/integrating-with-HCL-Verse.html) in Sametime documentation.

## Procedure

Add the following settings to the notes.ini file on the Domino server that hosts Verse, then restart the HTTP task:

```
iNotes_WA_SametimeProxyServerSSL=<ST proxy server>
VOP_GK_sametime=1
VOP_GK_sametime_rich_client=0
```

where `iNotes_WA_SametimeProxyServerSSL` is the Sametime proxy server, for example, `iNotes_WA_SametimeProxyServerSSL=https://stweb.renovations.com`

**Note:**

-   Use `VOP_GK_sametime_rich_client=0` if you always want users to chat through the Sametime web client. Use `VOP_GK_sametime_rich_client=1` if you want users to chat through the Sametime rich client \(either standalone or embedded in Notes\) when available but otherwise chat through the web client.
-   If you use the embedded Sametime client in Notes, add the setting `com.ibm.collaboration.realtime.webapi/startWebContainer=true` into plugin\_customization.ini, located at `C:\notes_install_directory\framework\rcp`.

## Enabling Sametime logout with Verse logout

Beginning with HCL Verse 3.2.2, user can be logged out of Sametime when logging out of Verse.

This feature is disabled by default and can enabled by applying a notes.ini setting `VOP_Logout_Sametime=1`.

