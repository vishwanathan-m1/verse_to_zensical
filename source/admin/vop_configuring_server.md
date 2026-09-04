# Installing and configuring

To install and configure {{ fullVerseProductName }} on a Domino® mail server, complete the following steps.

Make sure that your Domino server meets the [system requirements](vop_system_requirements.md#). For configuring a proxy, see [Configuring a proxy to provide high-availablity](configuring_proxy.md).

1.  Enable {{ fullVerseProductName }} on the Domino® server. Make sure that you run the HTTP server task and that you configure {{ shortVerseProductName }} settings. See the topic [Configuring {{ shortVerseProductName }}](https://help.hcl-software.com/domino/14.5.0/admin/conf_configuringinotes_m.html) in the Domino documentation.

2.  Register users as {{ shortVerseProductName }} users. See the topic [Registering {{ shortVerseProductName }} users](https://help.hcl-software.com/domino/14.5.0/admin/conf_registeringlotusinotesusers_t.html) in the Domino documentation.

3.  To ensure that international characters are displayed correctly, configure the Web server to use UTF-8 for output:

    1.  In the Domino Directory, open the Server document in edit mode.

    2.  Click the **Internet Protocols** tab and then the **Domino Web Engine** tab.

    3.  In the Character Set section for **Use UTF-8 for output**, select `Yes`.

    Or, if you use a Web Site document, see the topic [Specifying the character set to use when retrieving Web pages](https://help.hcltechsw.com/domino/14.5.0/admin/conf_specifyingthecharactersettousewhenretrievingwebp_t.html) in the Domino documentation.

4.  Create full-text indexes on mail files, if they don't already have them. For information, see the topic [Full-text indexes for single databases](https://help.hcltechsw.com/domino/14.5.0/admin/admn_fulltextindexesforsingledatabases_c.html) in the Domino documentation.

5.  Configure the following `notes.ini` settings on the Domino server:

    ```
    HTTPJVMMaxHeapSize=2048M
    HTTPJVMMaxHeapSizeSet=1
    ```

    If the settings don't exist, add them. If they exist, make sure that they have these values.

    **Note:** Make sure `INOTESDISABLEXPAGECMD=1` is not set or set to `0` in `notes.ini` as that will disable the OSGI framework.

6.  Enable TLS on the Domino server. {{ shortVerseProductName }} requires HTTPS and a valid certificate. For Domino 12.0 and later follow the instructions on **Generating TLS certificates using CertMgr and enabling TLS** in the Domino documentation. For older versions of Domino follow the instructions **Generating a keyring file with a third party CA SHA-2 cert using OpenSSL and KYRTool on a Windows™ workstation** in [this article](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0033348) on the HCL Customer Support site.

    **Note:**

    -   If you are using a proxy server in front of the Domino server, it is the proxy server that needs to support HTTPS and have a valid certificate.
    -   Domino 11 ships a version of KYRTool. For other versions of Domino, you can get a version of the tool from [here](https://support.hcltechsw.com/sys_attachment.do?sys_id=00ca67051b1c84d483cb86e9cd4bcbea) on the HCL Support site.

7.  Make sure the TLS port status is enabled. For more information, see the topic [Modifying Web server Internet port and protocol settings](https://help.hcltechsw.com/domino/14.5.0/admin/conf_modifyingwebserverinternetportandprotocolsettings_t.html) in the Domino documentation.

8.  Make sure that you configure the ID vault on the Domino server and that you assign {{ shortVerseProductName }} users to the vault. An ID vault is required so users can read and send signed or encrypted messages. For information, see the topic [Notes ID vault](https://help.hcltechsw.com/domino/14.5.0/admin/conf_notesidvault_c.html) in the Domino documentation.

    **Note:** In the ID vault tab of the Security Settings document that you use to assign users to the vault, select the option **Allow Notes-based programs to use the Notes ID vault**.

9.  Make sure that users have valid Internet addresses in their Domino directory Person documents:

    1.  Open the Person document.

    2.  On the Basics tab, verify that the **Internet Address** field contains a valid address for example, `sdaryn@renovations.com`.

10. Extract the files from the {{ shortVerseProductName }} package into a temporary directory. The package contains the following files:

    ```
    catalog12.ntf
    HCL_Verse.zip
    readme.html
    servers-lookup-<version>.jar
    vopdesign.nsf
    ```

    > **Note:** For Domino v12.0.x and above, the {{ shortVerseProductName }} package is included in &lt;ProgramDir&gt;/addons/verse > > directory.

    >**Note:**
    >
    >-   For `catalog12.ntf` and `servers-lookup-<version>.jar`, you only needed it if you're following the instruction for [Configuring a proxy to provide high-availablity](configuring_proxy.md). catalog12.ntf is from the HCL Domino 12 release. This file will remain unchanged in each {{ fullVerseProductName }} package.
    >
    >-   The following steps provide a clear guide on how to effectively extract the `HCL_Verse.zip`.

11. Stop the Domino server. From the server console, enter:

    ```
    quit
    ```

12. If you are manually updating a previous version of {{ shortVerseProductName }} on your server, follow the details below to remove the previous version.

    If a previous version of {{ shortVerseProductName }}™ is installed in the Domino data directory, delete the existing {{ shortVerseProductName }}™ jar files from the following directory:

    ```
    <Domino data directory>/domino/workspace/applications/eclipse/plugins 
    ```

    If a previous version of {{ shortVerseProductName }}™ is installed in the Domino program directory, delete the existing {{ shortVerseProductName }}™ jar files from the following directory:

    ```
    <ProgramDir>/osgi/shared/eclipse/plugins 
    ```

    Delete the following files: `ats-*.jar`, `sequoia-osgi-*.jar`, `core-*.jar`, `servlet-*.jar`, `servers-lookup-*.jar`.

13. Installing {{ shortVerseProductName }} Files

    The installer for Domino 14.0.x will install {{ shortVerseProductName }} files from `<ProgramDir>/addons/{{ shortVerseProductName }}/HCL_Verse.zip` into `<Domino data directory>/domino/workspace/applications/eclipse/plugins.`

    Starting with Domino 14.5, the Domino installer will install {{ shortVerseProductName }} files from `<ProgramDir>/addons/{{ shortVerseProductName }}/HCL_Verse.zip` into the `<ProgramDir>/osgi/shared/eclipse/plugins` directory.  
       
     If you are deploying a version of {{ shortVerseProductName }} that you have downloaded or you want to manually install the {{ shortVerseProductName }} files from `<ProgramDir>/addons/{{ shortVerseProductName }}/HCL_Verse.zip` , follow the details below.

    If you are using Domino 14.5 or greater, extract the contents of the HCL\_Verse.zip file to the following directory:

    `<ProgramDir>/osgi/shared`

    `<ProgramDir>` is typically:

    Windows: C:\\Program Files\\HCL\\Domino

    Linux: /opt/hcl/domino/notes/latest/linux

    IBM i: /QIBM/ProdData

    Unzip {{ shortVerseProductName }}/HCL\_Verse.zip -d &lt;ProgramDir&gt;/osgi/shared.

    For example, for Linux: unzip {{ shortVerseProductName }}/HCL\_Verse.zip -d &lt;ProgramDir&gt;/osgi/shared .



    **Note:** Extract with the directory structure intact. After extraction, the {{ shortVerseProductName }} .jar files should be in the following directory:

    ```
    <ProgramDir>/osgi/shared/eclipse/plugins 
    ```

    If you are using a Domino release prior to 14.5, extract the contents of the HCL\_Verse.zip file to the following directory:

    ```
    <Domino data directory>/domino/workspace/applications
    ```

    **Note:** In a container deployment \(Docker, Kubernetes\), {{ fullVerseProductName }} is installed by using a different container image. For example, by building a container image with {{ shortVerseProductName }} included: [Build Command Documentation](https://opensource.hcltechsw.com/domino-container/reference_build/#reference-build-usage).

14. A new search enhancement in Verse 3.2.5 \(see [How to search for emails from a user sent by a delegatee?](../user/how_to_search_emails_sent_in_deligation_mode.md)\) requires updates to the user mail files. For more information, see [Applying the {{ shortVerseProductName }} search view changes to existing mail files](applying_the_verse_search_view.md). These steps will use the provided vopdesign.nsf. The contents of vopdesign.nsf has not changed since the HCL Verse 3.2.5 release. This step can be skipped if your users are using HCL Domino 14.5.1 mail template as the changes in vopdesign.nsf are incorporated into the 14.5.1 mail template.

15. Start the Domino server.

16. If your Domino server deployment requires redirecting users to their mail servers follow the steps below, otherwise skip to step 17. Single server deployments do not require redirection. For more information on using redirection, see [Using {{ shortVerseProductName }}® Redirect to access mail in {{ shortVerseProductName }}®](https://help.hcl-software.com/domino/14.5.0/admin/conf_usinginotesredirecttoaccessmailinlotusinotes_t.html) in the Domino documentation.

    If there isn't a redirector database, create one using the iwaredir.ntf template.

    Open the redirector database and on the **UI Setup** page, select options to enable users to log on to {{ shortVerseProductName }}:

    If you use Domino to authenticate:

    -   **Enable Personal Options?** `No`
    -   **Enable Login Options?** `Yes`
    -   **Enable {{ fullVerseProductName }}?** `Yes`
    -   Optional setting to enable TOTP support \(starting from Domino 12.0.1\):
    -   **Enable TOTP Login Form?** `Yes or No`
    
    
    If you use SAML to authenticate:

    -   **Enable Personal Options?** `No`
    -   **Enable SAML Options?** `Yes`
    -   **Select Default Mail Application** `{{ shortVerseProductName }}`
    
    **Note:** The option **Enable {{ fullVerseProductName }}?** is not applicable for SAML authentication.

17. Ensure you have created a Domino® Web Server Configuration application \(see [Creating the Domino® Web Server Configuration database](https://help.hcltechsw.com/domino/14.5.0/admin/conf_creatingthedominoconfigurationdatabase_t.html)\) and set the target database and target login form:
       1. Open the Domino® Web Server Configuration application \(`DOMCFG.NSF`\)
       2. Click **Add Mapping**.
       If your Domino server deployment uses redirection:
         1. Change the Target Database to your redirector database \(i.e. iwaredir.nsf\)
         2. Change the Target Form to DWALoginForm.
         
            **Note:** The DWALoginForm handles TOTP login starting in Domino 12.0.

         3. Click Save &amp; Close.

         If your Domino server deployment does not use redirection:
         
           1.  Change the Target Database to point to `DOMCFG.NSF`.
           2.  Change the Target Form to CustomLoginForm \(or LoginUserFormMFA for [TOTP](https://help.hcltechsw.com/domino/14.5.0/admin/conf_totp_config_login.html) login\
           3.  Click Save &amp; Close.
            
 18.  From the HCL Domino® Administrator, click Configuration and expand the Messaging section.
      
      1.  Click Configurations.
      2.  Select the configuration settings document for the {{ shortVerseProductName }} mail server\(s\) and click Edit Configuration.
      3.  Select the {{ shortVerseProductName }}® tab.
      4.  Under Mail, enable Name resolution and validation.
      5.  Save the document and restart the Domino® server.

19. Set your server's home URL. For more information on where to set the home URL, see the topic [Configuring HTML, CGI, icon, and Java files for Web Site documents](https://help.hcltechsw.com/domino/14.5.0/admin/conf_configuringhtmlcgiiconandjavafilesforwebsite_t.html) in the Domino documentation.

    -   If your Domino server deployment uses redirection, set the home URL to `/iwaredir.nsf?open`.

    -   If your Domino server deployment does not use redirection, set the home URL to `/verse`.

20. If there is not a credential store application on the server, create one. For instructions, see the Domino documentation:

    -   If the {{ shortVerseProductName }} server is not in a cluster, complete the procedure [Creating the credential store application on a single Domino server.](https://help.hcltechsw.com/domino/14.5.0/admin/secu_creating_the_credential_store_application_on_a_single_domino_server_t.html)
    -   If the {{ shortVerseProductName }} server is in a cluster, complete the procedure [Creating the credential store application in a cluster.](https://help.hcltechsw.com/domino/14.5.0/admin/secu_creating_the_credential_store_application_in_a_cluster_t.html)
   
 21.  To confirm that {{ shortVerseProductName }} works, have a user with a mail file on the server complete these steps:
    
      1.  From a browser, go to `https://*domino\_hostname*/verse`.
      2.  Log in.
      3.  Verify that you see the {{ shortVerseProductName }} user interface.


