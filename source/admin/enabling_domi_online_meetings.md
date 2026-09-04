# Enabling dynamic online meeting services

Beginning with Verse 3.2.1, administrators can apply a notes.ini setting to control the meeting services that are available for users to schedule dynamic online meetings.

**Note:** The dynamic online meeting feature is only supported in Domino 12.0.2 FP2 and above.

The meeting services are controlled using a notes.ini on the server: `$OnlineMeetingIntegration`. For example, to enable just Sametime and WebEx, the admin would set: `$OnlineMeetingIntegration=Sametime,WebEx`. If this setting is not set, then all of the supported services are visible to the end user.

```
The supported meeting service values for $OnlineMeetingIntegration are:
WebEx -> WebEx
Sametime -> Sametime
Microsoft Team -> Teams
Zoom -> Zoom
GoToMeeting -> gtm
```

**Note:** The notes.ini values for `$OnlineMeetingIntegration` are case-insensitive. So the following examples have the same effect:

`$OnlineMeetingIntegration=Sametime,WebEx`

`$OnlineMeetingIntegration=sametime,webex`

**Note:** This feature requires the Domino server be able to send outgoing HTTPS messages to the following external resources.

-   For all providers - [https://integration-auth-token.hcltechsw.com](https://integration-auth-token.hcltechsw.com/)
-   For Webex - [https://webexapis.com/v1/meetings](https://webexapis.com/v1/meetings)
-   For MS Teams - [https://graph.microsoft.com/v1.0/me/onlineMeetings](https://graph.microsoft.com/v1.0/me/onlineMeetings)
-   For GoToMeetings - [https://api.getgo.com/G2M/rest/meetings](https://api.getgo.com/G2M/rest/meetings)
-   For Zoom - [https://api.zoom.us/v2/users/me/meetings](https://api.zoom.us/v2/users/me/meetings)

You may need to adjust your proxy/firewall rules to allow this.

**For Sametime only:** The Sametime/ {{ shortVerseProductName }} integration needs to be enabled. For more information, see [Configuring integration with HCL Sametime](configuring_integration_with_ibm_sametime.md). Additionally, the following notes.ini is required: `VOP_DOMI_ST_ROOTURL=<url to the Sametime meeting server>.`

**Note:** Administrators should note that `iNotes_WA_SametimeProxyServerSSL` and `VOP_DOMI_ST_ROOTURL` are different. `iNotes_WA_SametimeProxyServerSSL` points to the Sametime chat server while `VOP_DOMI_ST_ROOTURL` points to the Sametime meetings server.

**Related information**  


[How do I integrate an online meeting?](../user/faq_online_meeting_integration.md)

