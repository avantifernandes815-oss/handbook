// CC1 · Openers — training page content and the rapid-fire opener roleplay.
// Approved in the "CC1 · Openers — Training, Quiz & Roleplay" doc on Oct 29, 2026.

export const CC1_TRAINING = {
  title: 'Openers',
  summary: 'Earn the next thirty seconds on any kind of pickup. About 20 minutes.',
  sections: [
    {type: 'why', label: '1 · WHY', title: 'The opener decides the call',
      body: 'You can’t discover, connect value or book anything if they hang up in the first ten seconds. If your connects are fine but conversations are low, look at your opener first.',
      stat: {big: '10s', line: 'One job: earn the next thirty seconds.', sub: 'Not to explain Momence. Not to qualify. Not to book.'}},
    {type: 'table', label: '2 · FRAMEWORK', title: 'The four-part opener', body: 'Under fifteen seconds. Part 3 carries the weight: it’s the only part that tells them this call is about their business.',
      head: ['Part', 'What you say', 'Day 5 truth'],
      rows: [
        ['1 · Their name', '“Hi, is this Dana?”', 'Sound human'],
        ['2 · Who you are', '“It’s Sam with Momence.”', 'Be clear'],
        ['3 · Why them, why now', 'One sentence from your research', 'Earn attention'],
        ['4 · A question back', '“Is that something you think about?”', 'Get permission, or lead the call somewhere with a question']
      ]},
    {type: 'build', label: 'TRY IT · BUILD THE OPENER', prompt: 'Put the four parts in order. Two cards don’t belong anywhere.',
      parts: ['“Hi, is this Dana?”', '“It’s Sam with Momence.”', '“I help reformer studios cut no-shows.”', '“Got thirty seconds?”'],
      decoys: [
        {text: '“How are you today?”', why: 'It sounds like every sales call they’ve ever had.'},
        {text: '“We do booking, payments, marketing and more.”', why: 'That’s a feature list: a pitch before they’ve agreed to listen.'}
      ]},
    {type: 'table', label: '3 · READ THE PICKUP', title: 'Pick the opener in their first two words', body: 'Day 5 gave you two styles. The skill is choosing fast.',
      head: ['They sound…', 'Use', 'What it sounds like'],
      rows: [
        ['Rushed, sharp, annoyed', 'Permission-based', '“I’ll be quick: I work with a lot of Pilates studios on no-shows. Worth thirty seconds?”'],
        ['Relaxed, open, chatty', 'Friendly', '“Sounds like a good day over there. I’m calling because…”'],
        ['Unsure who you are', 'Slow down', '“It’s Sam, with Momence. We work with studios like yours.”']
      ]},
    {type: 'pickup', label: 'TRY IT · READ THE PICKUP', options: ['Permission-based', 'Friendly', 'Slow down'],
      cards: [
        {setup: 'The owner answers. Music behind her.', line: '“Yeah, what?”', answer: 'Permission-based', why: 'She’s busy and sharp: get to the reason fast and ask for thirty seconds.'},
        {setup: 'Warm voice, no rush.', line: '“Hi there! It’s a slow afternoon, what can I do for you?”', answer: 'Friendly', why: 'She’s open. Match her energy for a moment, then give your reason.'},
        {setup: 'You’ve just said your name and company.', line: '“Sorry… who is this?”', answer: 'Slow down', why: 'If they don’t know who you are, nothing after it lands. Repeat it clearly.'},
        {setup: 'Clipped, between clients.', line: '“I’ve got two minutes. Go.”', answer: 'Permission-based', why: 'He’s given you a window. Use it: reason first, then a question.'}
      ]},
    {type: 'write', label: '4 · YOUR NOTE', title: 'Part 3 comes from your note',
      body: 'What I know → what might matter → why I’m calling. One sentence, about their kind of business, no feature names, nothing you can’t back up from the note.',
      head: ['What the note says', 'What might matter', 'Part 3 of the opener'],
      rows: [
        ['Yoga · 22 weekly classes · MindBody', 'Booking friction, class fill', '“I work with a lot of yoga studios your size on keeping classes full.”'],
        ['Pilates · reformer · 1 location · Acuity + Square', 'Two systems, packs tracked by hand', '“Most reformer studios I talk to are juggling booking and payments in two places.”'],
        ['Dance · drop-in classes · no software found', 'Manual scheduling, payments at the door', '“I help drop-in dance studios take bookings and payments in one spot.”'],
        ['Gym · 2 locations · Glofox', 'Running two sites', '“I work with a few gyms running more than one location.”']
      ],
      notes: [
        {note: 'AF1 · Pilates · reformer · 1 location · Acuity booking + Square payments · class packs', example: '“Most reformer studios I talk to are running bookings and payments in two different places.”'},
        {note: 'AF1 · Yoga · 3 locations · MindBody · 40+ weekly classes', example: '“I work with a lot of multi-location yoga studios on keeping three schedules full without three times the admin.”'},
        {note: 'AF2 · Barre · 1 location · 10 weekly classes · no booking software found, takes payment by Venmo', example: '“I help smaller barre studios take bookings and payments in one place instead of by text and Venmo.”'}
      ]},
    {type: 'table', label: '5 · SITUATIONS', title: 'Openers for specific situations', after: 'A name-drop that isn’t true burns the account. If you don’t have one, don’t invent one.',
      head: ['Situation', 'What changes', 'Example'],
      rows: [
        ['Recycled lead', 'Acknowledge the last conversation', '“We spoke a few months back when the timing wasn’t right. Has that changed?”'],
        ['They asked for a callback', 'Lead with their request', '“You asked me to try you Thursday at three. Is now still good?”'],
        ['Referral or name-drop', 'Name who sent you, only if true', '“Jordan at your other location suggested I reach out.”'],
        ['Gatekeeper', 'Bare minimum, ask by name', '“Hi, it’s Sam with Momence. Is Dana in today?”'],
        ['Wrong person, right business', 'Get a name and a route, don’t pitch', '“No problem. Who handles your booking software?”']
      ]},
    {type: 'killers', label: '6 · WATCH OUT', title: 'What kills an opener',
      items: [
        ['“How are you today?”', 'Sounds like every sales call they’ve ever had', 'Use their name and get to the reason'],
        ['“Did I catch you at a bad time?”', 'Hands them the easiest no of the day', 'Ask for thirty seconds'],
        ['A 20-second company intro', 'They still don’t know why you called them', 'One line on why them'],
        ['Listing features', 'It’s a pitch before they’ve agreed to listen', 'Save it; that’s CC2 and the AE'],
        ['Reading word for word', 'They hear the script, not you', 'Know the four parts, say them your way'],
        ['Asking for “the owner” when the note has a name', 'Tells them you didn’t do the work', 'Ask for the person by name']
      ]},
    {type: 'text', label: '7 · THEN STOP TALKING', title: 'When the opener lands',
      body: 'The opener ends on a question. Then you listen. If they answer, you’ve earned the thirty seconds: move into relevance and discovery (Day 5). If they brush you off, that’s Day 6: they haven’t given you attention yet, so earn it once more. Don’t pitch harder.'},
    {type: 'application', label: '8 · APPLICATION', title: 'Three openers from your own Book',
      body: 'Pick three leads from your own Book and write a four-part opener for each. They’re saved here and come with you to the roleplay.',
      slots: [
        {type: 'New', hint: 'A New lead you’ve pre-vetted'},
        {type: 'Recycled', hint: 'A Recycled lead: acknowledge the last conversation'},
        {type: 'Named contact', hint: 'A lead where the note names a contact and the front desk usually answers'}
      ]}
  ]
};

export const CC1_ROLEPLAY = {
  mode: 'rapid',
  slots: ['New', 'Recycled', 'Named contact', 'Cold'],
  setup: 'Four openers back to back, about 10 minutes. Your manager plays each pickup and stops the call once the prospect is talking.',
  criteria: [
    {id: 'human', name: 'Sounded human', hint: 'Natural pace, not read, used their name.'},
    {id: 'clear', name: 'Clear who and why', hint: 'Name and company in the first breath; they never had to ask twice.'},
    {id: 'relevant', name: 'Relevant to them', hint: 'Part 3 came from the note and fit their kind of business.'},
    {id: 'read', name: 'Read the pickup', hint: 'Picked the right style for how they answered, and shifted if they did.'},
    {id: 'situation', name: 'Fit the situation', hint: 'Recycled, callback, gatekeeper and wrong-person openers handled the right way.'},
    {id: 'earned', name: 'Earned the next thirty seconds', hint: 'Ended on a question, then stopped talking, and got them talking in most calls.'}
  ],
  musts: [
    {id: 'said', name: 'Said who they are and why they’re calling on every call'},
    {id: 'accurate', name: 'Made no claim about Momence or a competitor they couldn’t back up'},
    {id: 'nopitch', name: 'Didn’t pitch the gatekeeper or the wrong person'}
  ],
  cards: [
    {id: 'midclass', title: 'Card 1 · Mid-class', answer: '“Yeah? I’ve got class in two minutes.” Music behind you.', next: 'Give one chance. If the reason is clear and short, say “go on.”', yes: 'Permission-based, under ten seconds, asks for thirty seconds or a time.'},
    {id: 'chat', title: 'Card 2 · Happy to chat', answer: 'Warm, slow afternoon. You ask where they’re calling from.', next: 'Talk about the studio if invited.', yes: 'Matches your energy, then gets back to why they called within a minute.'},
    {id: 'frontdesk', title: 'Card 3 · Front desk', answer: '“Studio, this is Kelly. What’s this regarding?”', next: 'Put them through only if they ask for the owner by name and don’t pitch you.', yes: 'Bare minimum, asks for the named contact, no pitch.'},
    {id: 'who', title: 'Card 4 · “Who?”', answer: 'You didn’t catch the name: “Sorry, who is this?”', next: 'Stay confused if they rush.', yes: 'Slows down and repeats name and company clearly.'},
    {id: 'remembers', title: 'Card 5 · Remembers you', answer: '“Oh, you called a while back, right?”', next: 'Warm if they acknowledge the last call, cool if they act like it’s new.', yes: 'Acknowledges the earlier conversation and asks what’s changed.'},
    {id: 'brushoff', title: 'Card 6 · Instant brush-off', answer: '“Not interested.” before they finish.', next: 'Stay on the line one more beat.', yes: 'Doesn’t argue or pitch harder; earns attention once with a short, relevant line.'},
    {id: 'wrong', title: 'Card 7 · Wrong person', answer: 'An instructor: “I just teach here.”', next: 'Give the owner’s name if asked.', yes: 'Asks who handles the software and gets a name, no pitch.'}
  ]
};
