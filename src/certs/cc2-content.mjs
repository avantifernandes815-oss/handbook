// CC2 · Elevator Pitch — training page content and the pitch roleplay.
// Approved in the "CC2 · Elevator Pitch — Training, Quiz & Roleplay" doc on Oct 29, 2026.
// Examples use bigger businesses already on software (Avanti's direction, Oct 29).

export const VERTICALS = ['Pilates', 'Yoga', 'Fitness', 'Wellness practice', 'Dance (drop-in)'];
export const PERSONAS = ['Owner or founder', 'Director', 'Studio manager', 'Operations manager'];

export const CC2_TRAINING = {
  title: 'Elevator Pitch',
  summary: 'Pitch in under twenty seconds, built from what they just said. About 20 minutes.',
  sections: [
    {type: 'stats', label: '1 · WHY', title: 'A pitch is a bridge, not a speech',
      body: 'The pitch connects what they just told you to a reason to keep talking. Recite it and you lose them; respond with it and you earn the meeting.',
      stats: [
        {big: '20s', line: 'Under twenty seconds', sub: 'Past that, you’re presenting, not talking'},
        {big: '1', line: 'One problem, one value', sub: 'The one capability that matches. Not the list'},
        {big: '?', line: 'Hand it back', sub: 'End on a question or the ask, never a full stop'}
      ]},
    {type: 'table', label: '2 · FRAMEWORK', title: 'The four-part pitch',
      body: 'Parts 1 and 4 barely change. Parts 2 and 3 are where your pre-vetting and listening show up.',
      head: ['Part', 'Fixed or changes?', 'Example'],
      rows: [
        ['1 · Who we help', 'Fixed', '“Momence is an all-in-one platform designed to simplify operations for wellness businesses.”'],
        ['2 · Their problem', 'Changes every time', '“You mentioned your front desk spends hours every week chasing reminders and class-pack renewals.”'],
        ['3 · One relevant value', 'Changes every time', '“Momence automates those reminders and renewals, so your team stops doing them by hand.”'],
        ['4 · A reason to continue', 'Fixed', '“Do you have time this week so we can show you how that would work for you?”']
      ],
      after: 'No specific hook from pre-vetting? Use what’s true of their industry or their current software. A relevant generalization beats a generic pitch.'},
    {type: 'build', label: 'TRY IT · BUILD THE PITCH', prompt: 'Put the four parts in order. Two cards don’t belong anywhere.',
      parts: ['“Momence is an all-in-one platform for wellness businesses.”', '“You said your front desk chases renewals every week.”', '“We automate those reminders and renewals.”', '“Do you have time this week so we can show you?”'],
      decoys: [
        {text: '“Plans start at a low monthly price.”', why: 'Price without context loses the meeting.'},
        {text: '“Bookings, payments, app, marketing, 24/7 support…”', why: 'That’s the feature list: nothing in it is about them.'}
      ],
      done: 'That’s the pitch: who we help, their problem, one value, a reason to continue. Under twenty seconds.'},
    {type: 'table', label: '3 · HEAR THE PROBLEM', title: 'Pick the theme in a second', body: 'Four themes. The skill is placing what they said under one of them fast.',
      head: ['Theme', 'It sounds like…', 'What Momence does about it'],
      rows: [
        ['Growth', '“Everything runs through me, so I can’t add more.”', 'Memberships and packs, payments and point of sale, reviews'],
        ['Retention', '“People come once and we never see them again.”', 'Automated sequences, on-demand content, community posts'],
        ['Time and admin', '“I spend Sunday nights matching payments to bookings.”', 'Scheduling in one place, automations, staff management, reporting'],
        ['Client experience', '“Booking is clunky and we miss their texts.”', 'Two-way SMS, email and in-app messaging, website plugins, mobile app']
      ]},
    {type: 'pickup', label: 'TRY IT · SORT IT', options: ['Growth', 'Retention', 'Time and admin', 'Client experience'],
      cards: [
        {setup: 'Owner, two-location yoga studio', line: '“We get plenty of first-timers, but most don’t come back.”', answer: 'Retention', why: 'Clients who come once and disappear is the retention problem.'},
        {setup: 'Studio manager, Pilates studio on MindBody', line: '“My front desk spends hours every week on reminders and renewals.”', answer: 'Time and admin', why: 'Hours lost to manual work is time and admin. Automations answer it.'},
        {setup: 'Owner, wellness practice with five practitioners', line: '“Clients say booking is clunky, and their texts slip through.”', answer: 'Client experience', why: 'How it feels to book and reach them is client experience.'},
        {setup: 'Founder, fitness studio', line: '“We can’t open a third location because everything runs through me.”', answer: 'Growth', why: 'Growth capped by what the owner can personally handle.'},
        {setup: 'Operations manager, yoga studio', line: '“We reconcile payments against bookings every Sunday.”', answer: 'Time and admin', why: 'Manual reconciliation is admin. Scheduling and payments in one place answer it.'},
        {setup: 'Director, fitness studio', line: '“Members drop off after their intro month.”', answer: 'Retention', why: 'Losing people after the first month is retention. Automated follow-up answers it.'}
      ]},
    {type: 'table', label: '4 · BY VERTICAL', title: 'Same Momence, different vertical', after: 'Starting points, not scripts. If what they told you points somewhere else, follow them.',
      head: ['Vertical', 'What you’ll often notice', 'What you’d lead with'],
      rows: [
        ['Pilates', 'Two locations on MindBody; front desk chases renewals and late cancels', '“Automating the reminders and renewals your front desk chases by hand.”'],
        ['Yoga', 'Lots of weekly classes; multi-location schedules', '“Keeping every class full without more admin for you.”'],
        ['Fitness', 'Plenty of first visits; clients drift after a few weeks', '“Automated follow-up so new clients don’t quietly disappear.”'],
        ['Wellness practice', 'Several practitioners; scheduling and messaging in separate tools', '“One place for scheduling and client messaging, instead of two.”'],
        ['Dance (drop-in)', 'On a basic booking tool; drop-ins and packs tracked separately', '“Drop-ins, packs and memberships, all in one system.”']
      ]},
    {type: 'write', label: '5 · BY PERSONA', title: 'Same Momence, different persona', noteLabel: 'THE PROSPECT · WHAT THEY JUST SAID', writeLabel: 'Your parts 2 and 3', tryLabel: 'TRY IT · WRITE PARTS 2 AND 3',
      body: 'A front desk or instructor can’t be pitched into a meeting: it won’t qualify. Note what they tell you and ask who handles the software.',
      head: ['Persona', 'What they own', 'What usually lands'],
      rows: [
        ['Owner or founder', 'The business and the software decision', 'Growth, revenue, getting their time back'],
        ['Director', 'A program, a location or the whole studio’s operations', 'The results they’re measured on: full classes, retention, a smoother week'],
        ['Studio manager', 'The schedule and the front desk', 'Less admin, fewer schedule headaches'],
        ['Operations manager', 'Staff, systems, reporting', 'One system instead of several; staff management and reporting']
      ],
      notes: [
        {note: 'Fitness · Operations manager · “Getting staff to cover classes eats my whole Monday.”', example: '“You said covering classes eats your Monday. Momence keeps staff management and scheduling in one place, so it isn’t all landing on you.”'},
        {note: 'Pilates · Owner · two locations on MindBody · “We renew class packs by hand at both desks.”', example: '“You’re renewing packs by hand at two desks. Momence automates renewals and reminders, so your team doesn’t have to.”'},
        {note: 'Wellness practice · Studio manager · “Clients text, email and DM us, and things slip.”', example: '“You said messages slip across three channels. Momence puts client messaging in one place, right next to the schedule.”'}
      ]},
    {type: 'table', label: '6 · IN THE CONVERSATION', title: 'Pitch in the conversation, not at them',
      head: ['Reciting', 'Responding'],
      rows: [['The same words on every call', 'Built from what they just said'], ['Mostly about Momence', 'One capability, not the catalogue'], ['Waiting for your turn to speak', 'Ends by handing it back to them']],
      after: 'The pitch comes once they’ve told you something isn’t working. Before that, it’s reciting. And a detail you found only matters if you connect it to a problem they’d recognize.'},
    {type: 'killers', label: '7 · WATCH OUT', title: 'What kills a pitch',
      items: [
        ['The feature list', 'Nothing in it is about them', 'One value tied to their problem'],
        ['Running past 30 seconds', 'You’re presenting, not talking', 'Stop at twenty and hand it back'],
        ['Knocking their current software', 'They chose it; now they’re defending it', 'Ask what they’d change, then pitch to that'],
        ['Talking price', 'Price without context loses the meeting', '“That’s exactly what the meeting is for”'],
        ['“Save time and money” with no detail', 'True of every product; sounds like a script', 'Their problem, in their words'],
        ['Ending on a full stop', 'The call stalls in silence', 'End on a question or the ask']
      ]},
    {type: 'application', label: '8 · APPLICATION', title: 'Three pitches from your own Book',
      body: 'Pick three leads from your own Book in three different verticals. For each, write a four-part pitch under twenty seconds. They’re saved here and come with you to the roleplay.',
      distinct: 'vertical', distinctMin: 3, textKey: 'opener', textMin: 40,
      fields: [
        {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
        {key: 'persona', label: 'Persona you’ll reach', kind: 'select', options: PERSONAS, required: true},
        {key: 'business', label: 'Business', kind: 'input', required: true},
        {key: 'note', label: 'What you noticed in pre-vetting', kind: 'input', required: true},
        {key: 'opener', label: 'Your four-part pitch', kind: 'textarea', placeholder: 'Who we help, their problem, one value, a reason to continue.', required: true}
      ],
      slots: [
        {type: 'Lead 1', hint: 'A lead from your Book'},
        {type: 'Lead 2', hint: 'A different vertical'},
        {type: 'Lead 3', hint: 'A third vertical'}
      ]}
  ]
};

export const CC2_ROLEPLAY = {
  mode: 'rapid',
  slots: ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4'],
  distinct: 'vertical', distinctMin: 3,
  leadFields: [
    {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
    {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
    {key: 'business', label: 'Business', kind: 'input', required: true},
    {key: 'note', label: 'SDR Additional Note', kind: 'input', required: true},
    {key: 'opener', label: 'Your pitch', kind: 'textarea', required: true, optionalFor: ['Lead 4']}
  ],
  prepNote: 'The first three come from the pitches you wrote in training. The fourth is new: you’ll build its pitch live.',
  setup: 'Four pitches back to back, about 10 minutes. Your manager plays the persona for each lead, says what the prospect just told you, and you pitch.',
  criteria: [
    {id: 'short', name: 'Under twenty seconds', hint: 'Every pitch landed and stopped; none ran past thirty.'},
    {id: 'words', name: 'Their words', hint: 'Restated what the prospect said in their language before pitching.'},
    {id: 'value', name: 'One relevant value', hint: 'Picked the one capability that matches the problem, not a list.'},
    {id: 'fit', name: 'Fit the vertical and persona', hint: 'The angle changed with the business and with who was on the phone.'},
    {id: 'handback', name: 'Handed it back', hint: 'Ended every pitch on a question or a clear reason to continue.'},
    {id: 'natural', name: 'Sounded natural', hint: 'Responding, not reciting; no two pitches sounded the same.'}
  ],
  musts: [
    {id: 'accurate', name: 'Made no claim about Momence or a competitor they couldn’t back up'},
    {id: 'noprice', name: 'Didn’t quote or promise pricing'},
    {id: 'noknock', name: 'Didn’t knock the prospect’s current software'}
  ],
  cards: [
    {id: 'frontdesk', title: 'Card 1 · Front desk buried', answer: '“My front desk spends half the day on reminders, renewals and late cancels.”', yes: 'Automations that take reminders and renewals off the front desk (time and admin).'},
    {id: 'twosystems', title: 'Card 2 · Two systems', answer: '“Bookings are in one app, payments in another, and I match them up by hand.”', yes: 'Scheduling and payments in one place; asks for time to show them.'},
    {id: 'drift', title: 'Card 3 · They drift', answer: '“We get plenty of first-timers, but most don’t come back.”', yes: 'Automated follow-up across the client journey (retention).'},
    {id: 'messages', title: 'Card 4 · Messages slip', answer: '“Clients text, email and DM us, and things fall through the cracks.”', yes: 'Two-way messaging in one place (client experience).'},
    {id: 'throughme', title: 'Card 5 · Runs through me', answer: '“I can’t grow, because everything runs through me.”', yes: 'Memberships, packs and automations that run without them (growth).'},
    {id: 'happy', title: 'Card 6 · Happy with it', answer: '“Honestly, our software is fine.”', yes: 'Doesn’t pitch blind or knock it; asks what they’d change, then pitches to that answer.'},
    {id: 'price', title: 'Card 7 · Price first', answer: '“What does it cost?” before anything else.', yes: 'Doesn’t quote; says that’s what the meeting is for and ties it to a problem.'}
  ]
};
