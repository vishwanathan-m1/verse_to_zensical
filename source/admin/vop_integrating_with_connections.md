# Integrating with Connections

You can configure {{ fullVerseProductName }} to work with HCL Connections™ 5.5 CR2, 6, 6.5, 7.0, or 8.0.

Complete the procedure [Installing and configuring](vop_configuring_server.md#).

Integrating with Connections is optional. This integration leverages Connections profiles to enable business cards, photos, and electronic email signatures in {{ shortVerseProductName }}. It also enables {{ shortVerseProductName }} users to attach and download Connections files when composing and reading messages.

Requirements:

-   HCL Connections 5.5 CR2, 6, 6.5, or 7.0.
-   The user email address in the Domino Person document Internet Address field must match the email address in the Connections profile. To retrieve information such as a photo, the Domino user address is encoded and a call is made to Connections. The Domino encoded address must match the Connections encoded address to retrieve the information.

This procedure describes the steps to install and configure Connections in your environment and then to enable it to work with {{ fullVerseProductName }}. If you already, you do not have to set up a new environment.

1.  Install HCL Connections. See the **Installing** section of the [HCL Connections documentation](https://help.hcltechsw.com/connections/welcome/index.html).

    **Note:** If you upgraded from a Connections release that is earlier than 5.5, complete the procedure [Upgrading older profiles](vop_upgrading_older_profiles.md#).

2.  Configure the IBM HTTP Server that is used to access Connections. See **Configuring the IBM HTTP Server** in the [HCL Connections documentation](https://help.hcltechsw.com/connections/welcome/index.html).

3.  Enable SSL on the IBM HTTP Server. See **Configuring IBM HTTP Server for encrypted connection**s in the [HCL Connections documentation](https://help.hcltechsw.com/connections/welcome/index.html).

4.  Enable single sign-on for Domino. See **Enabling single sign-on for Domino** in the [HCL Connections documentation](https://help.hcltechsw.com/connections/welcome/index.html).

5.  Edit the IBM HTTP Server `httpd.conf` file as follows. This file is typically in the `<IHS_ROOT>/conf` directory. This step enables cross-origin resource sharing \(CORS\) so that {{ shortVerseProductName }} can access HCL Connections APIs.

    **Note:** Some text shown in this step is broken into multiple lines so that the content fits on the documentation page; the additional lines are indented. In the actual file, this text is on one line.

    1.  Make a backup copy of `httpd.conf`.

    2.  Remove any comment symbols \(\#\) from the following lines:

        ```
        LoadModule headers_module modules/mod_headers.so
        LoadModule rewrite_module modules/mod_rewrite.so
        ```

    3.  Locate an appropriate `<VirtualHost>` block for your global configuration. This may be a broad virtual server for all requests accessing this host, it may be for SSL traffic only, or it may be mapped for the particular applications you would like to allow. It is often convenient to use `<VirtualHost *:443>` for this purpose. It must be active for traffic to the Connections APIs that {{ shortVerseProductName }} calls.

        Copy the following lines and paste them at the end of the `<VirtualHost>` block:

        ```
        RewriteEngine on
        
        # Minor change to adjust for Cloud vs On-Premises API variation of parameter name
        RewriteCond %{REQUEST_METHOD} PUT
        RewriteCond %{QUERY_STRING} ^(.*)uid=(.*)
        RewriteRule ^/profiles/photo.do /profiles/photo.do?%1userid=%2 [L]
        
        # Added necessary CORS headers when Origin header present
        Header unset Access-Control-Allow-Origin
        SetEnvIf Origin "^https://(vop_server_hostname\.)?(domain_name)$" origin_is=$0
        Header always set Access-Control-Allow-Origin %{origin_is}e env=origin_is
        Header always set Access-Control-Allow-Credentials "true" env=origin_is
        Header always set Access-Control-Allow-Headers "X-Requested-With, Content-Type, slug" env=origin_is
        Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT" env=origin_is
        Header always set Access-Control-Max-Age "1000" env=origin_is
        Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT" env=origin_is
        # Header always set Access-Control-Allow-Headers "X-Requested-With, 
           Content-Type, Origin, Authorization, Accept, Client-Security-Token, 
           Accept-Encoding, slug" env=origin_is
        Header always set Access-Control-Allow-Headers "X-Requested-With, 
           Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, 
           Pragma, slug, X-Update-Nonce" env=origin_is
        Header always set Access-Control-Expose-Headers "Content-Disposition, 
           Content-Encoding, Content-Length, Date, Transfer-Encoding, Vary, 
           ETag, Set-Cookie, Location, Connection, X-UA-Compatible, 
           X-LConn-Auth, X-LConn-UserId" env=origin_is
        
        # Added a rewrite to respond with a 200 SUCCESS on every OPTIONS request.
        RewriteCond %{REQUEST_METHOD} OPTIONS
        RewriteRule .* - [R=200,L]
        
        # Remove the Origin header if it exists for other requests 
           (POST, GET, DELETE, PUT). Causes problems with Connections 
           returning 403 response.
        RequestHeader unset Origin env=origin_is
        
        ```

    4.  Find the following line in the pasted text:

        ```
        SetEnvIf Origin "^https://(vop_server_hostname\.)?(domain_name)$" origin_is=$0
        ```

        Edit this line:

        -   Replace `*vop\_server\_hostname*` with the host name portion of the {{ shortVerseProductName }} mail server name.
        -   Replace `*domain\_name*` with the domain of the {{ shortVerseProductName }} On Premises mail server.
        Escape with a backslash \(\\\) any periods in the names.

        For example, assume that your Connections server is `https://connections.renovations.com` and that your mail servers are:

        ```
        https://mail1.uk.renovations.com
        https://mail2.us.renovations.com
        https://mail3.jp.renovations.com
        ```

        In this case, specify the following lines:

        ```
        SetEnvIf Origin "^https://(mail1\.)?(uk\.renovations\.com)$" origin_is=$0
        SetEnvIf Origin "^https://(mail2\.)?(us\.renovations\.com)$" origin_is=$0
        SetEnvIf Origin "^https://(mail3\.)?(jp\.renovations\.com)$" origin_is=$0 
        ```

        Or, specify the following line to represent all the servers, to avoid the need to add a line for each one:

        ```
        SetEnvIf Origin "^https://(mail.*\.)?(.*\.renovations\.com)$" origin_is=$0
        ```

6.  To enable {{ shortVerseProductName }} users to connect to the Connections server, add the following line to the `notes.ini` file in the Domino data directory:

    ```
    VOP_LLN2_BSSUIServer_URL=https://*HCL\_http\_server\_hostname*
    ```

    **Note:** If the setting is the last line in the `notes.ini` file, press ENTER after the line.

7.  Restart the Domino server:

    ```
    Restart server
    ```


-   **[Integrating with HCL Connections Docs](../admin/vop_integrating_docs.md)**  
You can configure {{ fullVerseProductName }} to work with HCL Connections Docs™ 2.0 to get an enhanced preview for file attachments. Integration with Docs enables {{ shortVerseProductName }} users to preview PDF, Microsoft Office, OpenOffice and other types of file attachments when reading and composing messages, without having to download those attachments first.
-   **[Upgrading older profiles](../admin/vop_upgrading_older_profiles.md)**  
If you upgrade from an HCL Connections release that is earlier than 5.5, complete this procedure in Connections 5.5 to upgrade older profiles so that they work in {{ fullVerseProductName }}.

