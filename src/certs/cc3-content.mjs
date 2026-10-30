// CC3 · Discovery — training page content and the discovery roleplay.
// Approved in the "CC3 · Discovery — Training, Quiz & Roleplay" doc on Oct 29, 2026.

import {VERTICALS, PERSONAS} from './cc2-content.mjs';

export const CC3_TRAINING = {
  title: 'Discovery',
  summary: 'Find the pain and confirm the fit without it feeling like a checklist. About 20 minutes.',
  sections: [
    {type: 'why', label: '1 · WHY', title: 'Discovery is the call',
      body: 'The opener earns 30 seconds. Discovery turns them into a meeting that shows up. When the owner says the problem out loud, the AE walks in knowing what matters, and the owner remembers why they said yes. A demo booked on “sure, send me something” is the one that no-shows.',
      quote: 'The prospect should talk more than you, and every question should come from something they just said.'},
    {type: 'table', label: '2 · THE LADDER', title: 'Five kinds of question, wide to specific',
      body: 'Good discovery climbs the ladder. It doesn’t jump to the top.',
      head: ['Rung', 'What it does', 'Example · 6-location Pilates group on Mindbody'],
      rows: [
        ['Open', 'Gets them talking about their world', '“How’s the setup working now that you’re at six locations?”'],
        ['Thread', 'Pulls on a word they used', '“You said reporting is a headache. What does that look like week to week?”'],
        ['Impact', 'Puts a cost on it', '“Who ends up pulling those numbers, and how long does it take them?”'],
        ['Qualify', 'Confirms a fact you need', '“How many classes are you running across the six a week?”'],
        ['Confirm', 'Plays it back before the ask', '“So it’s the manual reporting and paying for two systems. Did I get that right?”']
      ]},
    {type: 'pickup', label: '3 · SORT IT', title: 'Discovery or interrogation?', body: 'Ten questions. Sort each one.',
      tryLabel: 'TRY IT · SORT IT', options: ['Discovery', 'Interrogation'],
      cards: [
        {setup: '', line: '“What made you pick your current system?”', answer: 'Discovery', why: 'It’s open, and they choose the direction.'},
        {setup: '', line: '“How many staff? How many classes? When’s your contract up?”', answer: 'Interrogation', why: 'Three facts in a row with no reason given. That’s a form, not a conversation.'},
        {setup: '', line: '“You mentioned the front desk. What are they spending most of their day on?”', answer: 'Discovery', why: 'It pulls on something they just said.'},
        {setup: '', line: '“Wouldn’t it be easier if clients could book from an app?”', answer: 'Interrogation', why: 'It’s a pitch with a question mark. They can only agree or push back.'},
        {setup: '', line: '“If you could change one thing about how the week runs, what would it be?”', answer: 'Discovery', why: 'Open, and it gets under “it’s fine.”'},
        {setup: '', line: '“Are you the owner?”', answer: 'Interrogation', why: 'Cold and closed. “Who else would want to be in the room?” confirms it naturally.'},
        {setup: '', line: '“Who ends up pulling those numbers, and how long does it take?”', answer: 'Discovery', why: 'An impact question that follows their thread.'},
        {setup: '', line: '“How many locations do you have?” (it’s on their website)', answer: 'Interrogation', why: 'Asking what the site already says tells them you didn’t look. Confirm it instead.'},
        {setup: '', line: '“You said it’s a bit clunky. What do you mean by clunky?”', answer: 'Discovery', why: 'Their word, pulled one level deeper.'},
        {setup: '', line: '“Do you use online booking? Do you have an app? Do you send texts?”', answer: 'Interrogation', why: 'Yes/no questions fired in a row. You’ll get short answers and no pain.'}
      ]},
    {type: 'pickup', label: '4 · ONE LEVEL DEEPER', title: '“Fine” is the surface',
      body: 'Pick the best next question. Then see what the prospect says one level down.', tryLabel: 'TRY IT · PICK THE NEXT QUESTION',
      cards: [
        {setup: 'Yoga studio · 4 rooms · WellnessLiving · they just said', line: '“Honestly it’s fine. The app’s a bit clunky.”',
          options: ['“What do you mean by clunky?”', '“We have a much better app.”', '“How many members do you have?”', '“Got it. When’s your contract up?”'],
          answer: '“What do you mean by clunky?”', why: 'Pull on their word, not your agenda.',
          layer: '“Members can’t see waitlist spots, so they email us and we add them by hand.” That’s the pain. “Fine” was the surface.'},
        {setup: 'Pilates group · 3 locations · Mindbody · director · they just said', line: '“Reporting across the studios is a bit of a mess.”',
          options: ['“Our reporting is really strong.”', '“How many studios is that?”', '“What does ‘a mess’ look like week to week?”', '“Is the owner involved in reporting?”'],
          answer: '“What does ‘a mess’ look like week to week?”', why: 'Their words, asked open, so the detail comes out.',
          layer: '“Every Monday I export three reports and merge them in a spreadsheet. Takes me most of the morning.” Now there’s a cost.'},
        {setup: 'Wellness practice · 6 providers · operations manager · they just said', line: '“Our providers spend a lot of time on the phone rescheduling.”',
          options: ['“Would an app help with that?”', '“Roughly how many hours a week does that take across the team?”', '“Do you use online booking?”', '“Is that a big deal?”'],
          answer: '“Roughly how many hours a week does that take across the team?”', why: 'An impact question. It asks for a number they can feel without suggesting the answer.',
          layer: '“Probably ten hours a week, and that’s time they could be seeing clients.” That’s the reason to meet.'}
      ]},
    {type: 'cards', label: '5 · QUALIFY IN THE CONVERSATION', title: 'Confirm the fit without a checklist',
      body: 'Website and physical location are checked before the call. The rest gets confirmed inside the conversation, each tied to something they said.',
      items: [
        {title: 'Size', sub: '8+ weekly classes or 2+ bookable staff. Ask when scheduling or staffing comes up.', quote: '“How many classes are you running a week right now?”'},
        {title: 'Contract', sub: 'Ends within 6 months. Ask when switching comes up.', quote: '“When does your agreement with them come up for renewal?”'},
        {title: 'Current software', sub: 'Usually on the site, so confirm it. Gymmaster and ClubReady don’t qualify. Mariana Tek is our sister company and suits large franchises with a big brand, so don’t pursue it unless they’re unhappy with it.', quote: '“You’re on Mindbody today, right?”'},
        {title: 'Title', sub: 'Owner, founder, director, studio manager or operations manager.', quote: '“Who else would want to be in the room when you look at options?”'}
      ],
      after: 'Rule of thumb: never two qualifying questions in a row without a reason in between.'},
    {type: 'killers', label: '6 · WATCH OUT', title: 'Discovery killers',
      items: [
        ['The machine gun', 'Five questions, no listening', 'One question, then follow their answer'],
        ['Pitching the first pain', 'The feature tour starts too early', 'Ask one more question first'],
        ['Taking “it’s fine”', 'The surface answer wins', '“What would you change if you could?”'],
        ['Asking what the site says', 'Tells them you didn’t look', '“I saw you’ve got three locations. Is that right?”'],
        ['Leading questions', '“Wouldn’t it be great if…”', 'Ask what they’d want, don’t suggest it'],
        ['Skipping the playback', 'Straight to the ask', 'Their words first, then ask']
      ]},
    {type: 'note', label: '7 · WRITE THE NOTE', title: 'What the AE reads', tryLabel: 'TRY IT · FROM THE CALL EXCERPT',
      body: 'Read the excerpt and fill the fields the AE reads before the demo. Then compare with a model note. Not graded.',
      setup: '3-location fitness studio · owner · Mindbody',
      excerpt: '“Every Monday I’m merging three location reports by hand. Honestly it eats my morning. And we double-booked the same trainer twice last week, which was embarrassing. Our contract runs out in March, so I figured I’d at least look. We use Mailchimp for emails and Square at the front desk.”',
      min: 40,
      fields: [
        {label: 'Why are they taking the call?', model: 'Wants one view across all three locations before the Mindbody contract ends in March.'},
        {label: 'Pain points', model: 'Merges 3 location reports by hand every Monday, most of the morning. Same trainer double-booked twice last week.'},
        {label: 'Tech stack', model: 'Mindbody (contract ends March), Mailchimp for email, Square at the front desk.'},
        {label: 'General notes', model: 'Owner is the decision-maker and called the double-booking embarrassing. Lead with multi-location reporting and staff scheduling.'}
      ]},
    {type: 'application', label: '8 · APPLICATION', title: 'Prep three leads from your Book',
      body: 'Three real leads, at least two different verticals. They come with you to the roleplay, where your manager plays someone at each business.',
      distinct: 'vertical', distinctMin: 2, textMin: 20, unit: 'leads', unitVerb: 'Prep', doneWord: 'prepped',
      fields: [
        {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
        {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
        {key: 'business', label: 'Business', kind: 'input', required: true},
        {key: 'note', label: 'What you already know', kind: 'input', required: true},
        {key: 'opener', label: 'Your first open question', kind: 'textarea', placeholder: 'One open question they can take anywhere.', required: true},
        {key: 'thread', label: 'The thread you expect to pull', kind: 'input', required: true}
      ],
      slots: [
        {type: 'Lead 1', hint: 'A lead from your Book'},
        {type: 'Lead 2', hint: 'A different vertical'},
        {type: 'Lead 3', hint: 'Any vertical'}
      ]}
  ]
};

export const CC3_ROLEPLAY = {
  title: 'Discovery roleplay',
  mode: 'rapid',
  slots: ['Lead 1', 'Lead 2', 'Lead 3'],
  distinct: 'vertical', distinctMin: 2,
  leadFields: [
    {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
    {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
    {key: 'business', label: 'Business', kind: 'input', required: true},
    {key: 'note', label: 'What you already know', kind: 'input', required: true},
    {key: 'opener', label: 'Your first open question', kind: 'textarea', required: true}
  ],
  prepNote: 'Carried over from your training prep. Your manager plays someone at each business. You won’t know what they’re hiding.',
  setup: 'Three rounds, about 4 minutes each. Skip the opener: start with “Sure, I’ve got a minute.” Play the card, give up the pain only when they earn it, and end the round when they ask or walk away.',
  maxDq: 1,
  callMust: 'qualify',
  criteria: [
    {id: 'open', name: 'Opens wide', hint: 'First question is open and lets the prospect pick the direction.'},
    {id: 'thread', name: 'Follows the thread', hint: 'Next questions use the prospect’s own words.'},
    {id: 'impact', name: 'Gets to impact', hint: 'At least one question puts a cost on the pain: time, money or members.'},
    {id: 'qualify', name: 'Qualifies naturally', hint: 'Size, contract and decision-maker confirmed, never two in a row without a reason.'},
    {id: 'playback', name: 'Plays it back', hint: 'Summary in the prospect’s words before the ask or the close.'},
    {id: 'natural', name: 'Natural', hint: 'Sounds like a conversation, not a form.'}
  ],
  musts: [
    {id: 'qualify', name: 'Made the right call on qualification', auto: true},
    {id: 'nopitch', name: 'No pitch before the prospect named a pain'},
    {id: 'noprice', name: 'Didn’t quote or promise pricing'}
  ],
  cards: [
    {id: 'set', title: 'Card 1 · “We’re pretty set”', call: 'book',
      rows: [['Play it', 'Polite. Says it’s all fine.'], ['Buried pain', 'Reporting across locations is pulled by hand into a spreadsheet every Monday, about 3 hours.'], ['Facts', '30 classes a week, on Mindbody, contract ends in 4 months.'], ['Unlocks if', 'They ask what you’d change or pull on a small complaint.']]},
    {id: 'short', title: 'Card 2 · Short answers', call: 'book',
      rows: [['Play it', 'Answer closed questions with one word.'], ['Buried pain', 'Members can’t see the waitlist, so they email and staff add them by hand.'], ['Facts', '12 classes a week, 3 instructors, month to month.'], ['Unlocks if', 'They switch to open questions.']]},
    {id: 'price', title: 'Card 3 · Price first', call: 'book',
      rows: [['Play it', 'Ask “How much is it?” within the first minute.'], ['Buried pain', 'Paying for booking software plus a separate email tool, and the two don’t talk to each other.'], ['Facts', '2 locations, contract ends in 5 months.'], ['Unlocks if', 'They leave pricing to the AE and ask a question back.']]},
    {id: 'software', title: 'Card 4 · Great conversation, wrong software', call: 'nobook', dq: true,
      rows: [['Play it', 'Friendly and open. Front desk is overloaded with trial follow-ups.'], ['Facts', 'On ClubReady. 25 classes a week.'], ['Unlocks if', 'They confirm the current system.']]},
    {id: 'small', title: 'Card 5 · Too small', call: 'nobook', dq: true,
      rows: [['Play it', 'Enthusiastic.'], ['Facts', '1 instructor, 5 classes a week.'], ['Unlocks if', 'They ask about the schedule or the team.']]},
    {id: 'manager', title: 'Card 6 · Not the only decider', call: 'book',
      rows: [['Play it', 'Studio manager who loves the idea but mentions the owner usually weighs in.'], ['Buried pain', 'Late cancels aren’t enforced, so classes look full and aren’t.'], ['Facts', '20 classes a week, contract ends in 3 months.'], ['Unlocks if', 'They ask who else should be in the room. Studio manager is a qualifying title, so it books without the owner.']]},
    {id: 'rambler', title: 'Card 7 · The rambler', call: 'book',
      rows: [['Play it', 'Talk about five things at once.'], ['Buried pain', 'No-shows. They have to pick the one with the biggest cost and play it back.'], ['Facts', '40 classes a week, contract renews in 2 months.']]}
  ]
};
