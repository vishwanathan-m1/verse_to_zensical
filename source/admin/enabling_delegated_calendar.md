# Enabling a redirect to delegated Calendar when user does not have access to delegated Mail

In HCL Verse 3.2.6, when a user is granted delegation access to Calendar only, any attempt to access the Mail page will result in a redirect to the Calendar page.

This feature is disabled by default and can enabled by applying the notes.ini setting VOP\_GK\_FEATURE\_296=1 on the Domino server that runs Verse.

See [How do I access mail and calendars delegated to me?](../user/faq_delegated_access_to_me_on_prem.md) for the usage.

