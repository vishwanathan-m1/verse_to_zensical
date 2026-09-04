# Configuring a proxy to provide high-availablity

You can configure a proxy for {{ fullVerseProductName }} to distribute requests across Domino servers to provide high-availability.

For information about the benefits and requirements of a high-availability \(HA\) {{ shortVerseProductName }} deployment, see the article [Configuring a Proxy for {{ fullVerseProductName }} High Availability](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0084455) on the Support site. This article includes a case study using a F5 BIG-IP LTM virtual appliance as the proxy technology and LTPA based Domino authentication for SSO.

The following files are installed with {{ shortVerseProductName }} but used only for a HA proxy configuration:

-   `servers-lookup-<version>.jar` where `<version>` is specific to the version of {{ shortVerseProductName }}. See the section **Deploy serverslookup servlet to hub server\(s\)** in the article for information about this file.
-   `catalog12.ntf`. See the section **Domino Domain “hub” server\(s\) maintaining a domain catalog** in the article for information about this file.

For information on using HCL SafeLinx to provide the proxy functionality, see [Configuring SafeLinx as a reverse proxy for {{ shortVerseProductName }} high availability](https://help.hcltechsw.com/safelinx/1.3/adminguide/configuring_safelinx_proxy_for_verse.html) in the Safelinx documentation. HCL SafeLinx 1.3 or higher is required.

