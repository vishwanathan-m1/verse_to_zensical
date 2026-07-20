# Configuring XHR timeouts

Starting in Verse 3.2.7, new notes.ini entries can control the timeout length for GET and POST requests. 
 
The notes.ini entries are:

- VOP_XHR_GET_TIMEOUT= <`number`>

- VOP_XHR_POST_TIMEOUT=<`number`>

Where <`number`> represents milliseconds and can be between 1 and 600000 (10 minutes). Note that many browsers may override long timeout values and set them to 5 minutes. The default is 60000 milliseconds or 1 minute. If needed, a value of 120000 (2 minutes) or 180000 (3 minutes) may be enough. It's not recommended to set the values to lower than 60000 (1 minute).

To view notes.ini settings for HCL Verse, see [notes.ini](../admin/notes.ini.md) settings.
