# Enabling user names to display in Notes format

You can choose to display names in Notes format, for example, Lucia Hernandez/Baldwin.

Use the server notes.ini setting `VOP_GK_FEATURE_206=1` to display names in Notes format in business cards and in messages when using type-ahead addressing or when searching the directory. The Notes name is followed by the internet-style address, for example:

![Type-ahead addressing showing the Notes name](images/notes_name.png)

Without this setting, only the internet-style address is shown.

When names are resolved after being found in a directory, use the server notes.ini setting `VOP_GK_FEATURE_220=1` to display them in Notes format, for example:

![Resolved name showing the Notes name](images/noteschicklet.png)

Without this setting, only the first part of the name is shown, without the organization component.

