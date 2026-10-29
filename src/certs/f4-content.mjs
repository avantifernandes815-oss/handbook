// F4 · Yes to Meeting Held: the written Piper exercise and the confirmation-call situations.
// The answer key and hidden reactions are only ever sent to managers.

export const PIPER_F4 = {
  kind: 'piper',
  component: 'written',
  title: 'Fix a Piper draft',
  brief: 'Piper is a fast first draft, not a finished one. This draft has problems. Fix all three sections so the AE walks in ready and the prospect gets an email that sounds like your call. Then list every change you made, with one line on why.',
  sampleHeader: 'Juniper Pilates (fictional) · booking call on Thursday, November 5 · SDR: Sam · Prospect: Dana, owner · Website lists 12 weekly reformer classes and an Acuity booking widget.',
  transcript: [
    ['Sam', 'Hi, is this Dana? It’s Sam with Momence.'],
    ['Dana', 'Yeah, I’ve got a few minutes before my 12 o’clock class.'],
    ['Sam', 'I’ll be quick. We work with a lot of Pilates studios on bookings and payments. How’s your experience been with your setup?'],
    ['Dana', 'Honestly, it works. Clients book in Acuity, we take payments in Square, and Mailchimp does the newsletter.'],
    ['Sam', 'Booking in one place and payments in another. How do you keep those in sync?'],
    ['Dana', 'I don’t, really. Every Sunday night I go through Square and match it against who booked in Acuity. Class packs are the worst. I track who has credits left in a spreadsheet.'],
    ['Sam', 'How long does that take you?'],
    ['Dana', 'Two, three hours? Leah, my co-owner, usually helps on the money side.'],
    ['Sam', 'If one system handled booking, payments and the packs, would that be worth a look?'],
    ['Dana', 'Maybe. I’m not looking to switch tomorrow. We just renewed Acuity in the summer. But I’d be curious to see if one system could do it.'],
    ['Sam', 'That’s exactly what a 30-minute look is for. Jordan on our team runs these. Does Monday at 11 work?'],
    ['Dana', 'Monday at 11 Eastern works.'],
    ['Sam', 'Should Leah join?'],
    ['Dana', 'Maybe. I’ll ask her. She’s usually in on Mondays.'],
    ['Sam', 'I just sent the invite. Can you click Yes so it’s on your calendar?'],
    ['Dana', 'I’m walking into class. I’ll do it later.'],
    ['Sam', 'No problem. If it’s not accepted by tomorrow afternoon, I’ll give you a quick call.'],
    ['Dana', 'Sounds good.']
  ],
  noteFields: [
    {id: 'general', label: 'General Notes'},
    {id: 'tech', label: 'What is their tech stack?'},
    {id: 'why', label: 'Why specifically are they taking the call?'},
    {id: 'pain', label: 'Pain Points'},
    {id: 'background', label: 'Random background info'}
  ],
  draft: {
    note: {
      general: 'Juniper Pilates is a reformer studio with 12 weekly classes. Dana is excited and ready to switch off Acuity.',
      tech: 'Acuity for booking (confirmed on the call and the website).',
      why: 'Wants to replace Acuity as soon as possible.',
      pain: 'Multi-select: Expensive; Not growing. Additional context: the website has no intro offer, so their marketing is weak and they’re likely struggling to attract new clients.',
      background: 'Friendly, said yes quickly. AE focus: show the full platform.'
    },
    email: 'Subject: Juniper Pilates + Momence Zoom Tour\n\nHi Dana,\n\nYou’re all set to meet with Jordan on Tuesday, November 9 at 11:00 AM ET for a 30-minute Zoom demo! Momence will streamline your entire business and unlock growth with all-in-one booking, payments, marketing, retail and more.\n\nI’ve included Jordan here. Please have a laptop, desktop, or tablet available since they’ll be sharing their screen. [Zoom link]\n\nI’ll keep an eye out for your calendar confirmation and give you a quick call to confirm before the demo.\n\nBest,\nSam',
    plan: 'Call Dana on Friday, November 6 to confirm attendance.'
  },
  key: [
    {issue: '“Excited and ready to switch.”', fix: 'She said she’s not looking to switch tomorrow and is curious. Exploring, not switching.'},
    {issue: 'Tech stack is incomplete.', fix: 'Acuity for booking, Square for payments, Mailchimp for the newsletter, and a spreadsheet for class-pack credits.'},
    {issue: '“Replace Acuity as soon as possible.”', fix: 'Invented urgency, and she just renewed in the summer. She wants to see whether one system can handle booking, payments and packs.'},
    {issue: 'Pain multi-select: Expensive, Not growing.', fix: 'Neither came up. Using too many software systems and Lack of automation are supported by the call.'},
    {issue: 'Website inference stated as pain.', fix: 'No intro offer doesn’t mean weak marketing. Remove it, or label it “worth exploring; not confirmed by prospect.”'},
    {issue: 'Leah is missing.', fix: 'The co-owner handles the money side and may join. Note her, and that Dana is asking her to attend.'},
    {issue: 'Wrong weekday.', fix: 'November 9 is a Monday, not a Tuesday.'},
    {issue: 'Feature dump in the email.', fix: 'Replace it with her reason in her words: seeing whether one system can handle bookings, payments and class packs, so she isn’t matching them up on Sunday nights.'},
    {issue: 'Confirmation plan.', fix: 'The Friday call is right only as the promised receipt check if the invite is still unaccepted. A Monday demo still needs a confirmation call Monday morning before 11. Add reminders to CC Jordan, replace the Zoom link placeholder, and ask whether Leah is joining.'}
  ],
  criteria: [
    {id: 'faithful', name: 'Faithful to the call', hint: 'Nothing invented or inflated.'},
    {id: 'ready', name: 'AE readiness', hint: 'Who they are, why they agreed, what matters and the context, including Leah.'},
    {id: 'email', name: 'The email', hint: 'Her reason in her words, correct logistics, no feature dump.'},
    {id: 'plan', name: 'The confirmation plan', hint: 'The right touches on the right days.'},
    {id: 'why', name: 'Explains the why', hint: 'Each change has a reason tied to the call or to Day 8.'}
  ],
  must: 'No invented pain, urgency or promise is left in the final version'
};

export const F4_ROLEPLAY = {
  mode: 'situation',
  business: 'Juniper Pilates',
  setup: 'You booked Dana (owner) for a 30-minute Zoom demo with Jordan (AE). She agreed because client bookings and payments live in two different systems, and she reconciles them by hand.',
  criteria: [
    {id: 'reason', name: 'An easy reason for the call', hint: 'Non-awkward, and it gave her an easy way to answer.'},
    {id: 'read', name: 'Read the situation', hint: 'The response matched what actually happened.'},
    {id: 'reconnect', name: 'Reconnected to why she agreed', hint: 'In her words, not a pitch.'},
    {id: 'details', name: 'Locked in the details', hint: 'Time, attendees, an invite accepted on the call, the link and device.'},
    {id: 'tone', name: 'Assumptive, not aggressive', hint: 'Talked as though the meeting is happening and still left the door open.'},
    {id: 'next', name: 'Clear next step', hint: 'Said what happens next, and when.'}
  ],
  musts: [
    {id: 'noreschedule', name: 'Never offered a reschedule she didn’t ask for'},
    {id: 'respected', name: 'Respected a clear no or a request to stop'},
    {id: 'accurate', name: 'Made no inaccurate claims about Momence'}
  ],
  cards: [
    {id: 'spam', title: 'Situation 1 · The invite went to spam', brief: 'Demo tomorrow at 11 AM ET. The invite is not accepted. It’s the day before: make your confirmation call.', answer: 'Friendly. You never saw the invite: it’s in spam. You’re still keen.', yes: 'They help you find it and get it accepted while you’re on the phone, recap the time and who you’re meeting, and mention joining from a laptop.'},
    {id: 'cameup', title: 'Situation 2 · Something came up', brief: 'Demo tomorrow at 2 PM ET. The invite is accepted. It’s the day before: make your confirmation call.', answer: 'An instructor called out and you have to teach tomorrow afternoon. “Can we just skip it?”', yes: 'They acknowledge it and reschedule fast, to a specific time within a few days. The new invite gets accepted on the call.'},
    {id: 'rushed', title: 'Situation 3 · Morning of, in a rush', brief: 'Demo today at 11 AM ET. The invite is accepted. It’s the morning of: make your call.', answer: 'Rushed. “Yeah, yeah, I’ll be there.” You were planning to join from your phone between clients.', yes: 'They stay assumptive and short, text the Zoom link, and suggest a laptop or tablet because Jordan will share a screen. No reschedule offered.'},
    {id: 'justyes', title: 'Situation 4 · “Honestly, I just said yes”', brief: 'Demo tomorrow at 10 AM ET. The invite is not accepted. It’s the day before: make your confirmation call.', answer: '“Honestly, I only said yes to get off the phone.” If they reconnect to why you agreed, admit it really is a Sunday-night headache and keep the meeting. If they push or argue, say no.', yes: 'They find the real reason: the meeting is kept because it still matters, or it ends with a clean no they say they’ll log honestly.'},
    {id: 'moving', title: 'Situation 5 · Not now, for a real reason', brief: 'Demo tomorrow at 3 PM ET. The invite is accepted. It’s the day before: make your confirmation call.', answer: '“We just found out we’re moving locations in January. Can we talk after that?” It’s true.', yes: 'They check it’s real and ask what changes with the move, then keep the meeting if the move makes it more relevant, or agree a specific time to reconnect and say they’ll set a task. No pushing.'},
    {id: 'coowner', title: 'Situation 6 · Someone else should be there', brief: 'Demo tomorrow at 1 PM ET. The invite is accepted. It’s the day before: make your confirmation call.', answer: '“My co-owner Leah handles the money side. She should be on this, but she’s only free Thursday.”', yes: 'They move it to a Thursday time that works for both of you, add Leah to the invite and get it accepted. The reschedule is right here because you asked for it.'}
  ]
};
