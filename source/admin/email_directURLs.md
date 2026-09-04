# Access email messages through direct URLs

Starting in {{ shortVerseVersionProductName }}, emails can be opened in a browser through the {{ shortVerseProductName }} user interface by using a specific URL pattern. After opening the URL, if the user has not logged in, the user will be prompted for credentials. This is useful if a user wants to bookmark a URL for an email or if you have an agent that needs to send links to specific emails in a mail file.

## URL Pattern

- For an email that uses the memo form type, use the following URL pattern:
    > https://server.com/verse?mode=mailread#/tearoff/<`document_id`>

- For an email that uses a calendar form, use the following URL pattern:

    https://server.com/verse?mode=calendarread#/tearoff/<`document_id`>

Where <`document_id`> is UNID of the mail you want to open.

Example:
> https://server.com/verse?mode=mailread#/tearoff/CBA72A23851BA7DE85258E0D005C2A94