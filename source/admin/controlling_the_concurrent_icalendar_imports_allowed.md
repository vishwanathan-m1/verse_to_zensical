# Controlling the concurrent iCalendar imports allowed

Use the server notes.ini setting `VOP_ConCurr_Upload_iCal` to control the number of iCalendars that can be imported concurrently into users' {{ shortVerseProductName }} calendars. By default, 30 concurrent imports are allowed.

For example, to allow only 10 concurrent iCalendar imports, specify `VOP_ConCurr_Upload_iCal=10`.

