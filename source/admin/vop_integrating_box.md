# Integrating with Box

If you've purchased Box, follow this procedure to enable users to share Box files and folders from HCL Verse™.

1.  Register an application on the [Box Developers web site](https://developer.box.com/) and save the client\_id.

2.  Add the following setting to the `notes.ini` file in the Domino data directory:

    ```
    VOP_BOX_CLIENT_ID=*client\_id*
    ```

3.  Restart the Domino server:

    ```
    Restart server
    ```


