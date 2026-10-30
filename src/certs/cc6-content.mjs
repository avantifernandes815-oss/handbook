// CC6 · Booking the Meeting — training page content and the booking roleplay.
// Approved in the "CC6 · Booking the Meeting — Training, Quiz & Roleplay" doc on Oct 29, 2026.

import {VERTICALS, PERSONAS} from './cc2-content.mjs';

export const CC6_TRAINING = {
  title: 'Booking the Meeting',
  summary: 'Spot the signal, ask with a specific time, and turn a soft yes into a firm one. About 20 minutes.',
  sections: [
    {type: 'why', label: '1 · WHY', title: 'Don’t talk past it',
      body: 'More meetings are lost by talking past the moment than by asking too early. The prospect gives you a signal, you keep pitching, and the moment’s gone.',
      quote: 'The moment there’s a legitimate reason for another conversation, go.'},
    {type: 'table', label: '2 · BUYING SIGNALS', title: 'What “I’m interested” actually sounds like',
      head: ['Signal', 'Sounds like', 'What it means'],
      rows: [
        ['A “how” question', '“How would that work with our memberships?”', 'They’re picturing using it'],
        ['Asking about others', '“How do other studios handle that?”', 'They want proof it works for businesses like theirs'],
        ['Logistics', '“How long does switching take?” “What’s the process?”', 'They’re thinking past the call'],
        ['Agreeing with the pain', '“Yeah, that’s exactly our problem.”', 'You’ve connected value'],
        ['Bringing in someone else', '“My manager would want to see this.”', 'They’re already selling it internally'],
        ['Timing out loud', '“Our contract’s up in March.”', 'There’s a window']
      ],
      after: 'The rule: answer briefly, then ask. A signal is a door, not a cue to keep talking.'},
    {type: 'pickup', label: '3 · SORT IT', title: 'Signal or not yet?', body: 'Ten lines. Sort each one.', tryLabel: 'TRY IT · SORT IT',
      options: ['Buying signal', 'Not yet'],
      cards: [
        {setup: '', line: '“How do other Pilates studios use it?”', answer: 'Buying signal', why: 'They want proof it works for businesses like theirs.'},
        {setup: '', line: '“Sounds interesting.” (nothing after it)', answer: 'Not yet', why: 'Polite filler. Ask a question to find out where they are.'},
        {setup: '', line: '“Would my front desk need training?”', answer: 'Buying signal', why: 'They’re picturing their team using it.'},
        {setup: '', line: '“We’re pretty busy right now.”', answer: 'Not yet', why: 'That’s a timing brush-off, not interest.'},
        {setup: '', line: '“Yeah, that’s exactly our problem.”', answer: 'Buying signal', why: 'You’ve connected value. Go for the ask.'},
        {setup: '', line: '“What is Momence again?”', answer: 'Not yet', why: 'They’re still catching up. Earn attention first.'},
        {setup: '', line: '“Our contract’s up in March.”', answer: 'Buying signal', why: 'There’s a window, and they told you about it.'},
        {setup: '', line: '“I’d have to think about it.” (before you’ve asked anything)', answer: 'Not yet', why: 'A reflex. Find out what they’d be thinking about.'},
        {setup: '', line: '“My manager would want to see this.”', answer: 'Buying signal', why: 'They’re already selling it internally. Invite the manager.'},
        {setup: '', line: '“How long does switching usually take?”', answer: 'Buying signal', why: 'They’re thinking past the call.'}
      ]},
    {type: 'table', label: '4 · THE TRIAL CLOSE', title: 'A small yes before the big one',
      body: 'A trial close checks they’re with you without asking for the meeting yet. A yes means go straight to the ask.',
      head: ['Trial close', 'When'],
      rows: [
        ['“Would it help to see how that works with your schedule?”', 'They named a pain, and you’re about to ask'],
        ['“Is that the main thing you’d want to fix?”', 'Before you play back the pain'],
        ['“Does that sound like what you’re dealing with?”', 'After you connect value']
      ]},
    {type: 'build', label: '5 · TRY IT · BUILD THE ASK', prompt: 'Four parts: playback of their pain, the reason to meet, a specific time, who should be there. Two cards don’t belong.',
      parts: ['“So it’s the manual reporting across three locations.”', '“That’s exactly what the AE can walk you through.”', '“Let’s do Thursday at 10. Does that work?”', '“Does your ops manager want to join?”'],
      decoys: [
        {text: '“Do you maybe want to set something up sometime?”', why: 'Vague. It puts the work on them.'},
        {text: '“It’s only 30 minutes, I promise.”', why: 'It apologizes for the meeting. Say it like the next logical step.'}
      ],
      done: 'That’s the firm ask: their pain, the reason, one specific time, the right people.'},
    {type: 'pickup', label: '6 · SOFT YES TO FIRM YES', title: 'Agree with the stall, then name a time', body: 'Four stalls at the ask. Pick the best response.', tryLabel: 'TRY IT · PICK THE RESPONSE',
      cards: [
        {setup: 'Pilates · owner · at the ask', line: '“Sure, send me something.”',
          options: ['Send it and move on', '“Happy to. So it’s not just another email, let’s put 20 minutes on the calendar to walk through it. Tomorrow at 2?”', '“So that’s a no?”', '“Info won’t really help you.”'],
          answer: '“Happy to. So it’s not just another email, let’s put 20 minutes on the calendar to walk through it. Tomorrow at 2?”', why: 'Agree, then turn it into a specific time.'},
        {setup: 'Yoga · owner · at the ask', line: '“Let me check with my business partner.”',
          options: ['Wait for her to call back', '“Makes sense. Let’s find a time that works for both of you. Is she usually free mornings?”', 'Book it without the partner', 'Send info for the partner'],
          answer: '“Makes sense. Let’s find a time that works for both of you. Is she usually free mornings?”', why: 'Bring the partner in instead of waiting on them.'},
        {setup: 'Fitness · ops manager · at the ask', line: '“Call me next week.”',
          options: ['Agree and hang up', 'Push for a meeting today', '“Will do. Let’s lock in the time now so it doesn’t slip. Tuesday at 11?”', 'Argue the timing'],
          answer: '“Will do. Let’s lock in the time now so it doesn’t slip. Tuesday at 11?”', why: 'A callback with no time usually doesn’t happen.'},
        {setup: 'Wellness practice · owner · at the ask', line: '“I’ll look at my calendar and get back to you.”',
          options: ['Wait for them', 'Email them a link', 'Call back in a week', '“Easy. Have you got it open now? I’ll hold Wednesday at 3.”'],
          answer: '“Easy. Have you got it open now? I’ll hold Wednesday at 3.”', why: 'Do it together while you have them.'}
      ]},
    {type: 'table', label: '7 · SET THE AGENDA', title: 'Give them a reason to show up',
      body: 'An agenda makes the meeting feel worth keeping, and it tells the AE what matters.',
      head: ['Part', 'Example'],
      rows: [
        ['Their reason, their words', '“You said reporting across three locations eats your Monday.”'],
        ['What the AE will show', '“The AE will walk you through how that looks in Momence.”'],
        ['How long', '“About 30 minutes.”'],
        ['Who should be there', '“If your ops manager can join, even better.”']
      ]},
    {type: 'killers', label: '8 · WATCH OUT', title: 'What loses the yes',
      items: [
        ['Talking past yes', 'They agreed and you kept selling', 'Stop selling the moment they agree'],
        ['The vague ask', '“Sometime next week?”', 'Name a day and time, 0–3 days out'],
        ['Accepting “send me something”', 'Info gets skimmed', 'Turn it into a time'],
        ['No decision-maker', 'The meeting has to happen twice', 'Ask who else should be there'],
        ['No agenda', 'Nothing to remember it by', 'Their reason, what the AE shows, how long'],
        ['Apologizing for the meeting', '“It’s quick, I promise”', 'Say it like the next logical step']
      ]},
    {type: 'application', label: '9 · APPLICATION', title: 'Write the ask for three leads',
      body: 'Three real leads from your Book. For each, the pain you expect, your firm ask and a one-line agenda. They come with you to the roleplay.',
      textMin: 40, unit: 'leads', unitVerb: 'Prep', doneWord: 'prepped',
      fields: [
        {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
        {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
        {key: 'business', label: 'Business', kind: 'input', required: true},
        {key: 'note', label: 'The pain you expect to hear', kind: 'input', required: true},
        {key: 'opener', label: 'Your ask', kind: 'textarea', placeholder: 'Playback of their pain, the reason to meet, a specific time, who should be there.', required: true},
        {key: 'agenda', label: 'Your one-line agenda', kind: 'input', required: true}
      ],
      slots: [
        {type: 'Lead 1', hint: 'A lead from your Book'},
        {type: 'Lead 2', hint: 'Another lead'},
        {type: 'Lead 3', hint: 'Another lead'}
      ]}
  ]
};

export const CC6_ROLEPLAY = {
  title: 'Booking roleplay',
  mode: 'rapid',
  slots: ['Lead 1', 'Lead 2', 'Lead 3'],
  leadFields: [
    {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
    {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
    {key: 'business', label: 'Business', kind: 'input', required: true},
    {key: 'note', label: 'The pain you expect to hear', kind: 'input', required: true},
    {key: 'opener', label: 'Your ask', kind: 'textarea', required: true}
  ],
  prepNote: 'Carried over from training. Each round starts late in the call, right before the ask.',
  setup: 'Three rounds, about 3 minutes each. Read one line of context (“You’ve done discovery; she told you…”), then play the card from the ask.',
  maxDq: 1,
  callMust: 'book',
  criteria: [
    {id: 'signal', name: 'Spots the signal', hint: 'Answers a buying signal briefly, then moves to the ask.'},
    {id: 'trial', name: 'Trial close', hint: 'Checks they’re with you before the big ask.'},
    {id: 'ask', name: 'Firm, specific ask', hint: 'Playback, the reason to meet, one specific time 0–3 days out.'},
    {id: 'stall', name: 'Handles the stall', hint: 'Agrees, then turns it into a time.'},
    {id: 'agenda', name: 'Sets the agenda', hint: 'Their reason, what the AE will show, how long.'},
    {id: 'people', name: 'Gets the right people', hint: 'Asks who else should be there.'}
  ],
  musts: [
    {id: 'book', name: 'Right call on booking', auto: true},
    {id: 'specific', name: 'Left with a specific day and time (first ask 0–3 days out), or a clear reason not to book'},
    {id: 'noprice', name: 'Didn’t quote or promise pricing'}
  ],
  cards: [
    {id: 'signal', title: 'Card 1 · Clear signal', call: 'book', rows: [['Play it', 'Ask “How do other studios like ours handle that?”'], ['Strong rep', 'Answers in a sentence, then asks for a time.']]},
    {id: 'send', title: 'Card 2 · Send me something', call: 'book', rows: [['Play it', 'At the ask: “Sure, send me something.”'], ['Gives in if', 'The rep turns it into a time.']]},
    {id: 'partner', title: 'Card 3 · Business partner', call: 'book', rows: [['Play it', '“I’d need to check with my partner.”'], ['Gives in if', 'The rep invites the partner and picks a time for both.']]},
    {id: 'nextweek', title: 'Card 4 · Call me next week', call: 'book', rows: [['Play it', '“Call me next week, it’s a crazy one.”'], ['Gives in if', 'The rep locks the time in now.']]},
    {id: 'calendar', title: 'Card 5 · Calendar check', call: 'book', rows: [['Play it', '“Let me look at my calendar and get back to you.”'], ['Gives in if', 'The rep asks them to open it now.']]},
    {id: 'early', title: 'Card 6 · Ready early', call: 'book', rows: [['Play it', 'Say “Yeah, I’d like to see it” while the rep is still pitching.'], ['The trap', 'The rep keeps talking.']], callNote: 'Right away.'},
    {id: 'offphone', title: 'Card 7 · Get off the phone', call: 'nobook', dq: true, rows: [['Play it', 'At the ask: “Honestly, I’d only be saying yes to get off the phone.”']], callNote: 'Respect it and log it, or go back to discovery for a real reason. If nothing real comes up, log it.'}
  ]
};
