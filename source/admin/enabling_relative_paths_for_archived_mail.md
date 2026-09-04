# Enabling relative paths for archived and delegated mail

To allow archive mail file or delegated mail file URLs to be relative to the Domino server being used, use the server notes.ini setting `iNotes_WA_UseRelativeUrl=1`.

For example, assume on Domino the configured archive server is set to `SERVERB/MYORG` and the path to the archive is set to `/archives/joe_archive.nsf`. If you enable this setting and the user logs on to {{ shortVerseProductName }} on a different server, SERVERA, when they access their archived mail \(from a link in the folder panel\), the archive mail URL is `https://ServerA/archives/joe_archive.nsf/verse` rather than `https://ServerB/archives/joe_archive.nsf/verse`.

