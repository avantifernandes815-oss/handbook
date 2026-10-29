// CC4 · Objection Handling — training page content and the stacked-objection roleplay.
// Approved in the "CC4 · Objection Handling — Training, Quiz & Roleplay" doc on Oct 29, 2026.

import {VERTICALS, PERSONAS} from './cc2-content.mjs';

export const CC4_TRAINING = {
  title: 'Objection Handling',
  summary: 'Read the pushback, handle the second one, and know when to stop. About 20 minutes.',
  sections: [
    {type: 'why', label: '1 · WHY', title: 'The second no is the real one',
      body: 'A cold call is an interruption, so the first no is usually a reflex. The one after it is usually what’s really on their mind. This is about the second objection, and knowing when there shouldn’t be a third try.',
      quote: 'Pushback is information. Read it before you answer it.'},
    {type: 'table', label: '2 · READ IT FIRST', title: 'Not every no is the same',
      head: ['What you hear', 'What it is', 'Your move'],
      rows: [
        ['“Our software works fine.” “It’s too expensive.” “I’ve migrated before. Nightmare.”', 'An objection about the offer', 'Answer the thing they raised with the four steps'],
        ['“I don’t have time.” “Just send me some info.” “Not a priority right now.”', 'A brush-off about the moment', 'Go back and earn attention. Answering it won’t help'],
        ['“I’m not the one who buys software.” “They’re not here.”', 'Routing', 'Change who you’re talking to, not what you’re saying'],
        ['“Please don’t call again.” A clear no, more than once', 'A signal to stop', 'Stop politely and log it honestly']
      ]},
    {type: 'pickup', label: '3 · SORT IT', title: 'Which kind of no?', body: 'Ten lines. Sort each one.', tryLabel: 'TRY IT · SORT IT',
      options: ['Objection', 'Brush-off', 'Routing', 'Stop'],
      cards: [
        {setup: '', line: '“We’d never get the staff to learn a new system.”', answer: 'Objection', why: 'A real concern about the offer. You can answer it.'},
        {setup: '', line: '“Call me in the new year.” (no reason given)', answer: 'Brush-off', why: 'No reason, just a delay. Earn attention first.'},
        {setup: '', line: '“The owner handles all of that.”', answer: 'Routing', why: 'Change who you’re talking to, not what you’re saying.'},
        {setup: '', line: '“I’ve said no twice. Take me off your list.”', answer: 'Stop', why: 'A clear no and a do-not-call. Stop, thank them and log it.'},
        {setup: '', line: '“It’s too expensive.”', answer: 'Objection', why: 'About the offer. Answer it without quoting price.'},
        {setup: '', line: '“I don’t have time for sales calls.”', answer: 'Brush-off', why: 'About the moment, not the offer. One relevant thing, then ask.'},
        {setup: '', line: '“She’s not in today.”', answer: 'Routing', why: 'Get her name and the best time to reach her.'},
        {setup: '', line: '“I’ve migrated before. It was a nightmare.”', answer: 'Objection', why: 'A real worry you can disarm and answer.'},
        {setup: '', line: '“Just send me some info.” (right after your opener)', answer: 'Brush-off', why: 'You haven’t earned attention yet. Info won’t change that.'},
        {setup: '', line: '“Please don’t call this number again.”', answer: 'Stop', why: 'Log it as do not call. It goes to Dead and stays there.'}
      ]},
    {type: 'table', label: '4 · CLARIFY AND ISOLATE', title: 'When you can’t tell what’s behind it',
      body: 'When the objection is vague, the Ask step is a question for more information, not the meeting.',
      head: ['Move', 'When', 'Sounds like'],
      rows: [
        ['Clarify', 'The objection is vague', '“When you say it’s not a fit, what’s behind that?”'],
        ['Isolate', 'You want the real one', '“Is that the main thing, or is there something else that makes it a no?”'],
        ['Use it as the reason', 'They gave you a real concern', '“That’s exactly why it’s worth 15 minutes. You’d see how it works before deciding anything.”']
      ]},
    {type: 'pickup', label: '5 · STACKED OBJECTIONS', title: 'A new objection gets a new acknowledge',
      body: 'Each prospect pushes back twice. Pick the best response to the second objection, then see what they say next. Don’t repeat yourself.', tryLabel: 'TRY IT · ANSWER THE SECOND ONE',
      cards: [
        {setup: 'Pilates · 2 locations · Mindbody · owner · first: “It works fine.” You handled it. Then:', line: '“Honestly we just don’t have the bandwidth to switch.”',
          options: ['Repeat the first answer', '“Totally get it. Switching is a lot. What’s eating most of the team’s time right now?”', '“It only takes a day to switch.”', '“No problem, I’ll send some info.”'],
          answer: '“Totally get it. Switching is a lot. What’s eating most of the team’s time right now?”', why: 'A new acknowledge, then a question that can surface the pain.',
          layer: '“The front desk is buried in client messages, honestly.” The real reason to meet came out on the second objection.'},
        {setup: 'Fitness studio · 3 locations · operations manager · first: “Bad timing, we’re slammed.” You handled it. Then:', line: '“And honestly it’s probably too expensive anyway.”',
          options: ['Quote a number to show it isn’t', '“We’re cheaper than everyone.”', '“So it’s a no then?”', '“Fair enough. Price depends on the setup, and the AE covers that. What’s making this month so hectic?”'],
          answer: '“Fair enough. Price depends on the setup, and the AE covers that. What’s making this month so hectic?”', why: 'No price, no argument, and back to the thread that matters.',
          layer: '“We’re opening a fourth location and the schedule is a mess.” That’s a reason to meet, not a reason to wait.'},
        {setup: 'Yoga studio · 2 locations · owner · first: “It’s not a priority.” You handled it. Then:', line: '“I’ve migrated before. It was a nightmare.”',
          options: ['“Ours is painless, I promise.”', '“Totally fair, and we’re getting a little ahead of ourselves. We hear that a lot, which is why we’ve put so much into a smooth onboarding. What made it so painful last time?”', '“OK, I’ll let you go.”', '“That was the other company’s fault.”'],
          answer: '“Totally fair, and we’re getting a little ahead of ourselves. We hear that a lot, which is why we’ve put so much into a smooth onboarding. What made it so painful last time?”', why: 'Disarm, name the onboarding focus without promising specifics, then clarify. The AE covers the details.',
          layer: '“We lost half our client history.” Now you know what the AE needs to walk them through.'}
      ]},
    {type: 'cards', label: '6 · HAPPY WITH THEIR SOFTWARE', title: 'Four ways to hear it',
      items: [
        {title: '“It works fine.”', sub: 'Usually means no pain they’ve thought about. Ask about what sits around the software: follow-up, messaging, reporting.'},
        {title: '“We just switched.”', sub: 'Respect it. Ask what made them switch and what they wish it did. Log it honestly.'},
        {title: '“The owner picked it.”', sub: 'Routing in disguise. Ask who would weigh in if they looked at options.'},
        {title: '“We’re under contract.”', sub: 'Ask when it comes up. Don’t push a meeting that can’t go anywhere yet.'}
      ],
      after: 'Migration worries: “We’re getting a little ahead of ourselves.” If needed, say we’ve heard how rough onboarding is with other providers, and that’s why we’ve invested so much in a smooth onboarding with our team. The AE can go into the details. Then push for the call.'},
    {type: 'cards', label: '7 · TIMING', title: 'Four ways to hear it',
      items: [
        {title: '“Bad timing, we’re slammed.”', sub: 'Acknowledge the week they’re having, then ask what’s making it busy. Busy is often the pain.'},
        {title: '“Not a priority right now.”', sub: 'A brush-off. Earn attention with one relevant thing, then ask.'},
        {title: '“Call me next quarter.”', sub: 'Ask what changes then. A real reason gets a real follow-up date. No reason means it’s a brush-off.'},
        {title: '“We’re opening a new location.”', sub: 'That’s a reason to meet, not a reason to wait.'}
      ]},
    {type: 'killers', label: '8 · WATCH OUT', title: 'What kills it',
      items: [
        ['Answering too fast', 'You respond to the reflex, not the person', 'Hear it, then acknowledge'],
        ['Arguing', '“No you’re not happy, and here’s why”', 'Agree with something true, then redirect'],
        ['Repeating yourself', 'Same answer to a second objection', 'A new objection gets a new acknowledge'],
        ['Leaving it hanging', 'A great response with no question', 'Always end on a question'],
        ['Knocking their software', 'Now they’re defending it', 'Talk about what sits around it'],
        ['Pushing past a clear no', 'An argued no is gone either way', 'Stop, thank them, log it honestly']
      ]},
    {type: 'application', label: '9 · APPLICATION', title: 'Prep three leads from your Book',
      body: 'Three real leads, at least two different verticals. For each, the objection you expect and your four-step response. The leads come with you to the roleplay.',
      distinct: 'vertical', distinctMin: 2, textMin: 40, unit: 'leads', unitVerb: 'Prep', doneWord: 'prepped',
      fields: [
        {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
        {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
        {key: 'business', label: 'Business', kind: 'input', required: true},
        {key: 'note', label: 'What you already know', kind: 'input', required: true},
        {key: 'opener', label: 'The objection you expect', kind: 'input', required: true},
        {key: 'response', label: 'Your four-step response', kind: 'textarea', placeholder: 'Acknowledge, disarm, add value, ask.', required: true}
      ],
      slots: [
        {type: 'Lead 1', hint: 'A lead from your Book'},
        {type: 'Lead 2', hint: 'A different vertical'},
        {type: 'Lead 3', hint: 'Any vertical'}
      ]}
  ]
};

export const CC4_ROLEPLAY = {
  title: 'Stacked-objection roleplay',
  mode: 'rapid',
  slots: ['Lead 1', 'Lead 2', 'Lead 3'],
  distinct: 'vertical', distinctMin: 2,
  leadFields: [
    {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
    {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
    {key: 'business', label: 'Business', kind: 'input', required: true},
    {key: 'note', label: 'What you already know', kind: 'input', required: true},
    {key: 'opener', label: 'Your expected objection', kind: 'input', required: true}
  ],
  prepNote: 'Carried over from training. You open each one; your manager pushes back. Expect more than one objection.',
  setup: 'Three rounds, about 4 minutes each. Let them open. Raise the first objection within 30 seconds, then stack the second. Give up the real concern only if they earn it.',
  maxDq: 1,
  callMust: 'stop',
  callPrompt: 'When the round ends, did they keep going (the meeting, or the right person) or stop and log it?',
  callLabels: {book: 'Kept going', nobook: 'Stopped and logged it'},
  callChips: {book: 'Keep going', nobook: 'Stop and log it'},
  dqLabel: 'stop card',
  criteria: [
    {id: 'read', name: 'Reads it', hint: 'Treats a brush-off, an objection and routing differently.'},
    {id: 'disarm', name: 'Acknowledges and disarms', hint: 'They feel heard and the guard comes down. No arguing.'},
    {id: 'value', name: 'Adds relevant value', hint: 'One thing, tied to what they said, not a feature drop.'},
    {id: 'ask', name: 'Always asks', hint: 'Every response ends on a question: more information or the meeting.'},
    {id: 'stack', name: 'Handles the stack', hint: 'A new acknowledge for the second objection, no repeating.'},
    {id: 'natural', name: 'Natural', hint: 'Sounds like a person, not four steps.'}
  ],
  musts: [
    {id: 'stop', name: 'Right call on when to stop', auto: true},
    {id: 'noargue', name: 'Never argued or knocked their software'},
    {id: 'noprice', name: 'Didn’t quote or promise pricing'}
  ],
  cards: [
    {id: 'fine', title: 'Card 1 · Works fine → no bandwidth', call: 'book',
      rows: [['First', '“Our software works just fine.”'], ['Then', '“We don’t have the bandwidth to switch.”'], ['Real concern', 'If earned: the front desk is buried in client messages.']],
      callNote: 'Ask for the meeting.'},
    {id: 'slammed', title: 'Card 2 · Slammed → send me info', call: 'book',
      rows: [['First', '“Bad timing, we’re slammed.”'], ['Then', '“Just send me some info.”'], ['Real concern', 'If earned: opening a second location in the spring.']],
      callNote: 'Treat the new location as the reason to meet.'},
    {id: 'price', title: 'Card 3 · Too expensive → just renewed', call: 'book',
      rows: [['First', '“It’s too expensive.”'], ['Then', '“We just renewed anyway.”'], ['Real concern', 'If earned: the contract actually ends in 5 months, and they pay for two tools.']],
      callNote: 'Ask when the contract comes up.'},
    {id: 'migrate', title: 'Card 4 · Migration nightmare → staff would revolt', call: 'book',
      rows: [['First', '“I’ve migrated before. Nightmare.”'], ['Then', '“My staff would never learn a new system.”'], ['Real concern', 'If earned: they lost client history last time.']],
      callNote: 'Disarm (“we’re getting a little ahead of ourselves”), mention the onboarding focus if needed, leave details to the AE, then push for the call.'},
    {id: 'routing', title: 'Card 5 · Not the buyer', call: 'book',
      rows: [['First', '“I’m not the one who buys software.”'], ['Then', '“She’s not in today.”'], ['Real concern', 'None. It’s routing.']],
      callNote: 'Get the owner’s name and the best time to reach her. Don’t pitch the front desk.'},
    {id: 'dnc', title: 'Card 6 · Do not call', call: 'nobook', dq: true,
      rows: [['First', '“Not interested.”'], ['Then', '“Please take me off your list.”']],
      callNote: 'Thank them and log it as do not call.'},
    {id: 'twice', title: 'Card 7 · Clear no, twice', call: 'nobook', dq: true,
      rows: [['First', '“Not interested.”'], ['Then', '“I said no. We’re not looking.” Give no reason, however they ask.']],
      callNote: 'Stop politely and log it as not interested.'}
  ]
};
