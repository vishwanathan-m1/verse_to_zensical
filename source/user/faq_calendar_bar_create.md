# How do I schedule a meeting?

You can schedule meetings from the Calendar Bar or the Calendar Inbox.

From the Calendar Bar, click the **+** button or an empty time slot in the calendar bar. From the Calendar Inbox, click the **New** button. You'll be presented with a form to schedule a new meeting.

The following picture shows a new meeting with basic options filled out.

![new meeting form](images/meeting_form.png)

The following features are also available.

## Online meeting Configuration

When you schedule a meeting, you can select the online meeting option. The meeting that is chosen as the default meeting in the list can be configured in **{{ shortVerseProductName }} Settings**. The list of meetings in the drop down are the meetings that are configured in the {{ shortVerseProductName }} Settings page. You can navigate to the **Online Meeting Configuration** section of **{{ shortVerseProductName }} Settings** by choosing the **Configure Meetings** option in the meeting drop down list.

![Online meeting preferences](images/onlinemeeting.png)

## Find availability of invitees

When scheduling a new meeting, you can find the availability for required invitees \(default\) or for all invitees. Click on **Find a time** and choose the desired time slot. You can select from the suggested time or drag the slider to select the desired time.

![finding available time](images/Find_a_time.png)

## Schedule a repeat meeting

Schedule a meeting to repeat at a specified interval and duration.

![Repeat meeting options](images/repeat_meeting.png)

**Note:** If the selected interval and duration result in 1000 or less instances of the meeting, you can **Save** or **Save and Send** the recurring event. However, if the number of instances exceeds 1000, you will receive an alert message informing you that you have exceeded the limit, and the **Save** and **Save and Send** function buttons will be disabled.

## Schedule the meeting for a different time zone

You can schedule a meeting in a different time than your time zone. The meeting shows in the calendar in that time zone.

![Meeting scheduled in a different time zone](images/different_timezone.png)

## Customize the meeting description

Open the editing toolbar to customize the meeting description. Change the font or text alignment. Add a table, link, or image.

![Editing options in the meeting form](images/editing_toolbar.png)

## Schedule an all-day event

Schedule an all-day event. Use the repeat meeting option to extend it for more than one day.

![All-day event form](images/allday_event.png)

The event shows at the top of your calendar:

![All-day event in the calendar](images/allday_event2.png)

## Create a personal reminder

Create a reminder. For example, remind yourself to fill out your time sheet each week. You need to select just a start date and time.

![Calendar reminder form](images/reminder.png)

## Use Options

Click **Options** and select any of these options:

| Option | Description |
|---|---|
| **Sign** | Digitally sign the meeting invitation. |
| **Encrypt** | Encrypt the meeting invitation. |
| **Mark Private** | Prevent someone who manages your calendar from reading the content of the meeting. |
| **Request Response** | Receive a notice from each optional and required attendee, room, and resource that responds. |
| **Return Receipt** | Receive a message from each attendee who opens the invitation. |
| **Remind me** | Choose when to receive a reminder about the meeting. |
| **Show as** | Select **Busy** to indicate to others that you are busy at the selected time. Select **Available** to show that you are available. |
| **Delivery Priority** | Select one of the following options:<br>• **High**: Route the invitation immediately and display a High priority icon next to the invitation in each recipient's Inbox.<br>• **Normal**: Route the invitation the next time your mail server sends mail (default).<br>• **Low**: Wait until off-peak hours to route the invitation (usually between midnight and 6:00 AM). |
| **Delivery Report** | Select one of the following options:<br>• **None**: Don't send delivery reports.<br>• **Only on failure**: Send a report when invitations can't be delivered.<br>• **Confirm delivery**: Send reports when invitations are delivered.<br>• **Trace entire path**: Send a report from each server through which an invitation is routed and a final report indicating whether the invitation was delivered. |

## Confirm meeting as a chair
{% if isVerse %}
The HCL Verse 3.2.1 release allows the chair of a meeting to confirm the meeting. Confirming a meeting will send all invitees a Confirmation notice. To confirm a meeting, go to **Calendar**. Open the meeting and click on **Confirm**. Optionally, type comments to add to the Confirmation notice and click OK.
{% else %}
The chair of a meeting can confirm the meeting. Confirming a meeting will send all invitees a Confirmation notice. To confirm a meeting, go to **Calendar**. Open the meeting and click on **Confirm**. Optionally, type comments to add to the Confirmation notice and click OK.
{% endif %}

![Confirm meeting as a chair](images/Confirm_meeting.png)

**Parent topic:** [How do I manage my calendar?](../user/faq_calendar.md)

