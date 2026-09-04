# Controlling if the default online meeting is used automatically

HCL Verse 3.2.3 allows end users to go into their **{{ shortVerseProductName }} Settings** and change the value of the *Always add an online meeting when creating a calendar event* preference through the **Calendar** &gt; **Define Default Meeting**

The notes.ini setting `VOP_ALWAYS_ADD_ONLINE_MEETING_DEFAULT` will control the default of this preference for all users on the Domino server.

The preference is enabled by default and can disabled by applying a notes.ini setting:

<table markdown id="simpletable_fcl_xg1_hdc"><tbody><tr><td>

`VOP_ALWAYS_ADD_ONLINE_MEETING_DEFAULT=0`

</td><td>

Disables the default online meeting from being added automatically.

</td></tr><tr><td>

`VOP_ALWAYS_ADD_ONLINE_MEETING_DEFAULT=1`

</td><td>

The default setting is to automatically add the default online meeting.

</td></tr></tbody>
</table>If `VOP_ALWAYS_ADD_ONLINE_MEETING_DEFAULT` is not in notes.ini, the default is to add the default online meeting automatically.

**Note:** The notes.ini setting does not lock the value. The end user can go to their **{{ shortVerseProductName }} Settings** page and change the value as needed.

