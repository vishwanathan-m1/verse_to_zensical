# Delegation enhancement

HCL Verse 3.2.6 provides enhancement related to delegated mail files.

## Redirect user to the delegated Calendar if they do not have Mail access

If your administrator has enabled this new option and if you are given Calendar-only delegation access and try to open Mail, Verse will redirect you to the delegated Calendar.

See [How do I access mail and calendars delegated to me?](../user/faq_delegated_access_to_me_on_prem.md)

**Note:** This optional delegation feature will be enabled if the HCL Domino administrator sets the following notes.ini setting on the Domino server that runs Verse: VOP\_GK\_FEATURE\_296=1

See [Enabling a redirect to delegated Calendar when user does not have access to delegated Mail](../admin/enabling_delegated_calendar.md)

**Parent topic:** [What's new in Verse 3.2.6?](../whats_new/wn_verse326.md)

