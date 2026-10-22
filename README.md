# TuitionDesk

Mobile-first React + Tailwind prototype for Indian tuition teachers.

## Run locally
1. Install Node.js 18+.
2. Extract this folder and open a terminal inside it.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Included
- Five responsive screens: Fees, Attendance, Test report, Parent app, Dashboard.
- Student and batch create/edit/delete UI.
- Students, batches, attendance and enquiries saved in `localStorage`.
- WhatsApp `wa.me` links with pre-filled fee reminders, absent alerts, test report and receipt messages.
- UPI deep link for the demo parent fee screen.
- Demo data in Hinglish and INR formatting.

## Important demo notes
- WhatsApp links open separate chats; the user must review and tap Send in WhatsApp. Browsers cannot silently send WhatsApp messages.
- `upi://pay` opens a compatible UPI app if installed. This demo cannot verify payment completion, so its receipt message is explicitly marked as a demo receipt. Verify payment before sending a real receipt.
- Demo phone numbers are placeholders. Replace them with real parent numbers including country code before use.
- Data is stored in this browser/device only. This is a front-end prototype, not a secure production system. Production use needs authenticated accounts, server-side storage, backups, privacy controls and a verified payment provider.
