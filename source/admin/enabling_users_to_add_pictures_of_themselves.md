# Enabling users to add photos of themselves

You can allow users to add photos of themselves through Domino, Connections, or the Gravatar service.

The following table describes each method and how to enable it.

**Note:** How Photos are cached in the browser client is determined by the cache control settings from the image source, whether the images are served from Domino, Connections, or Gravatar. This is still true when using the`resolvePhotoUrlDomains` setting available for Domino and described in the following table; {{ shortVerseProductName }} remembers the cache settings the image was served with from the original source and applies them when serving the data URI. Customers using Connections or Domino who wish to avoid having user photos stored in the browser cache can change the cache options through server settings or a proxy. Gravatar manages its own cache headers, if browser caching is unacceptable Gravatar should not be used.

<table markdown id="table_ux4_zxs_x4b"><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead><tbody><tr><td>

Domino

</td><td>

From {{ shortVerseProductName }}, users can add photos of themselves in the following ways:

-   Upload images from their computers or take photos of themselves to upload. The images are saved in the Basics tab of their Person documents in the Domino directory. A URL to the uploaded image is also added to **Photo URL** field in the Miscellaneous tab.
-   Provide a URL to images, which are added to the **Photo URL** field in the Miscellaneous tab. The URL must be to a web image resource that doesn't require additional authentication or that is in the same SSO domain as the Domino server.

 Supported image types for upload are JPEG, GIF, BMP WBMP and PNG. In a Server document, the maximum allowed size of uploaded images is controlled through this setting: **Internet Protocols** &gt; **HTTP** &gt; **HTTP Protocol Limits** &gt; **Maximum size of request content**. In a Web Site document, maximum allowed size is controlled through this setting: **Domino Web Engine** &gt; **POST Data** &gt; **Maximum POST data \(in kilobytes\)**.

 To enable this feature, add the following setting to the server notes.ini file: `VOP_GK_FEATURE_230=1`.

 To customize this feature, use the notes.ini setting `VOP_PhotoServiceOptions` and specify any of the following options in a comma-separated list:

 -   `disableConnectionsPhotos`. If you integrate with Connections, use `disableConnectionsPhotos=true` to use Domino for photo management. Otherwise, photos continue to be controlled through Connections profiles.
-   `maxCacheEntries=<positive, non-zero integer>` Specifies the maximum number of cache entries used for caching responses. The default is 250.
-   `cacheValidationMinutes=<positive integer>` Specifies the number of minutes that cached entries can be reused before they are considered to be stale and need to be re-validated. The default is 180 \(3 hours\).
-   `resolvePhotoUrlDomains=<string>`. Specifies the domains of photo URLs that should be resolved by the server to data URIs. Use this option when you have a photo server that is behind a firewall and is not accessible from the internet. Separate domains with \|. Wildcard characters \* and ? are supported and a leading . is used to match sub-domains. Note that this option applies only to photos hosted externally to Domino. Photos served from the specified domains are expected to be thumbnail size and there is a 100 KB size limit for converting a photo to a data URI.
-   `disablelinkurls=true`. Disables the link to image option in the **photo booth** that appears when you choose **Change My Picture** in the user menu.

 `VOP_PhotoServiceOptions` examples:

-   `VOP_PhotoServiceOptions=disableConnectionsPhotos=true`
-   `VOP_PhotoServiceOptions=resolvePhotoUrlDomains=.boston.renovations.com|.taiwan.renovations.com`
-   `VOP_PhotoServiceOptions=maxCacheEntries=500,cacheValidationMinutes=200`

</td></tr><tr><td>

Connections

</td><td>

From {{ shortVerseProductName }}, users can upload images from their computers or take photos to upload to their Connections profiles. This feature is enabled automatically if you configure {{ shortVerseProductName }} to integrate with Connections.

</td></tr><tr><td>

Gravatar

</td><td>

Users complete the following steps to display photos in {{ shortVerseProductName }}: 1.  Go to www.gravatar.com.
2.  Create an account using their {{ shortVerseProductName }} email addresses. Gravatar uses WordPress for account creation. WordPress sends emails to the users.
3.  Open the WordPress emails and activate their accounts.
4.  Add images to Gravatar.

To use this method, add the following setting to the Domino notes.ini file: `VOP_GK_FEATURE_182=1`.

When using Gravatar, image caching is managed by the browser and the Gravatar.service.

</td></tr></tbody>
</table>The following table describes which photo source is used depending on the methods enabled. Note that when Gravatar is enabled, it is always the photo source.

|Domino enabled|Connections configured|Gravatar enabled|Photo source|
|--------------|----------------------|----------------|------------|
|X| | |Domino|
| |X| |Connections|
| | |X|Gravatar|
|X|X| |Connections1|
| |X|X|Gravatar|
|X| |X|Gravatar|
|X|X|X|Gravatar|

1 If `VOP_PhotoServiceOptions=disableConnectionsPhotos=true` is used, the source becomes Domino.

