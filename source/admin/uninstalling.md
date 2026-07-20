# Uninstalling

If you need to uninstall Verse™ application files, simply stop the Domino server, remove the Verse .jar files, and then restart the Domino server.

1.  Stop the Domino server. From the server console, enter:

    ```
    quit
    ```

2.  Delete the existing Verse jar files from the following directory:

    For installs on Domino versions prior to 14.5: &lt;Domino data directory&gt;/domino/workspace/applications/eclipse/plugins

    For installs on Domino 14.5+: &lt;ProgramDir&gt;/osgi/shared/eclipse/plugins

    Delete the following files: `ats-*.jar`, `sequoia-osgi-*.jar`, `core-*.jar`, `servlet-*.jar`, `servers-lookup-*.jar`.

3.  Start the Domino server again.


