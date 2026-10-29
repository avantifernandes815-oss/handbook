// CC5 · Competitor Positioning L1 — training page content and the competitor roleplay.
// Approved in the "CC5 · Competitor Positioning L1 — Training, Quiz & Roleplay" doc on Oct 29, 2026.
// Sources: Momence battle cards (MindBody, WellnessLiving, Glofox, Arketa, Walla) and public reviews
// (Capterra, Trustpilot, BBB). Every competitor fee here is first-party per the battle cards.
// Posture (Avanti): acknowledge their strength, then tie it to where Momence is better. Never concede.

import {VERTICALS, PERSONAS} from './cc2-content.mjs';

export const COMPETITORS = ['MindBody', 'WellnessLiving', 'Glofox', 'Arketa', 'Walla'];

export const QUICK_FACTS = {
  MindBody: [['Our edge', 'Two-click booking, no marketplace fee on new clients'], ['Weak spot', 'Complexity, stacked fees, 60–90 day setup'], ['Verified fee', '20% marketplace fee, capped at $30, on new clients from the MindBody app'], ['Landmine', '“When a new client finds you through the MindBody app, do you know what you pay for that lead?”']],
  WellnessLiving: [['Our edge', 'Built for studios; terms are in the agreement you sign'], ['Weak spot', 'Billing and contract terms: add-ons without clear agreement, billing after cancellation (BBB)'], ['Verified fee', 'Processing “starting at 2.59%”, a floor, not a rate'], ['Landmine', '“If you cancelled tomorrow, how confident are you the charges would actually stop?”']],
  Glofox: [['Our edge', 'Native live and on-demand video, pick-a-spot booking'], ['Weak spot', 'Cost structure and renewal increases with little notice'], ['Verified fee', '3.80% per card transaction, $0.10 per text, $3 per e-agreement (their own proposal)'], ['Landmine', '“What did your price move to at your last renewal, and how much notice did you get?”']],
  Arketa: [['Our edge', 'Live and on-demand video too, with marketing, app and messaging in one platform'], ['Weak spot', 'Fees on top of Stripe, reporting accuracy, stability'], ['Verified fee', '3% transaction fee + Stripe fees (their pricing page)'], ['Landmine', '“When you pull a revenue report, does it reconcile against Stripe?”']],
  Walla: [['Our edge', 'Easy too, and replaces the 3–4 tools studios run alongside it'], ['Weak spot', 'Growth and consolidation: features still being built, limited automation'], ['Verified fee', 'No fee angle. Use consolidation'], ['Landmine', '“Besides Walla, what other tools are you paying for: email, SMS, reviews, forms?”']]
};

export const CC5_TRAINING = {
  title: 'Competitor Positioning',
  summary: 'MindBody, WellnessLiving, Glofox, Arketa and Walla on a live call. About 25 minutes.',
  sections: [
    {type: 'why', label: '1 · WHY', title: 'They’re ready to defend it',
      body: 'The moment a prospect names their software, they’re ready to defend it. Knock it and you lose the call. Acknowledge it, show where Momence is stronger, and ask the question that lets them find the cost themselves.',
      quote: 'Acknowledge what’s true, then show where Momence is stronger.'},
    {type: 'table', label: '2 · THE POSTURE', title: 'Three wins against every competitor',
      body: 'These hold whichever platform they’re on. The competitor-specific angles sit on top of them.',
      head: ['The win', 'On their platform', 'Momence', 'Ask'],
      rows: [
        ['Booking isn’t a chore', 'Upwards of 8 steps and a forced account before a first-timer can book', 'Two clicks, and we still capture everything the business needs', '“How many steps does a first-time client go through to book, and do they have to create an account?”'],
        ['The software does the work', 'The owner still sends confirmations and follow-ups by hand', 'Automations handle the follow-up. The owner stops being the system', '“What’s still done by hand around the software: reminders, follow-ups, win-backs?”'],
        ['One platform, not four tools', 'Separate tools and bills for marketing, lead gen and billing', 'All of it in one platform', '“Besides your software, what else are you paying for to run marketing and follow-up?”']
      ],
      after: 'Do: acknowledge their strength and tie it to ours, ask questions they answer from their own statement, use first-party facts. Don’t: say “their support is bad” (several of them out-rate us on review sites), quote numbers from a blog, start a feature war, or quote Momence pricing.'},
    {type: 'pickup', label: '3 · SORT IT', title: 'Landmine or attack?', body: 'Ten lines. A landmine is a question they answer from their own experience. An attack is a claim they have to defend.', tryLabel: 'TRY IT · SORT IT',
      options: ['Landmine', 'Attack'],
      cards: [
        {setup: '', line: '“What rate are you actually paying per card transaction, all in?”', answer: 'Landmine', why: 'They answer it from their own statement.'},
        {setup: '', line: '“Glofox is going to raise your price 70%.”', answer: 'Attack', why: 'A prediction they’ll defend against. Ask what happened at their last renewal instead.'},
        {setup: '', line: '“When a new client finds you through the MindBody app, do you know what you pay for that lead?”', answer: 'Landmine', why: 'They find the marketplace fee themselves.'},
        {setup: '', line: '“WellnessLiving’s support is terrible.”', answer: 'Attack', why: 'And not supported: their day-to-day service scores are good.'},
        {setup: '', line: '“If you cancelled tomorrow, how confident are you the charges would stop?”', answer: 'Landmine', why: 'It surfaces the billing pattern without a claim.'},
        {setup: '', line: '“Arketa is buggy and everyone’s leaving.”', answer: 'Attack', why: 'A broad claim. Ask whether their revenue report reconciles against Stripe.'},
        {setup: '', line: '“Besides Walla, what else are you paying for to run marketing?”', answer: 'Landmine', why: 'Consolidation, in their own numbers.'},
        {setup: '', line: '“Nobody serious uses MindBody anymore.”', answer: 'Attack', why: 'Now they’re defending their choice instead of listening.'},
        {setup: '', line: '“How many steps does a first-time client go through to book?”', answer: 'Landmine', why: 'One of the three wins, asked as a question.'},
        {setup: '', line: '“Their app is worse than ours.”', answer: 'Attack', why: 'A comparison claim. Let them tell you what their members say.'}
      ]},
    {type: 'tabs', label: '4 · THE FIVE', title: 'One card per competitor', body: 'Same four lines for each. Tap a competitor.',
      items: [
        {name: 'MindBody', rows: [['Acknowledge, then our edge', 'Breadth and brand. Momence gives you that breadth with two-click booking and no marketplace fee on new clients.'], ['The real weak spot', 'Complexity and stacked fees, including a 20% marketplace fee (capped at $30) on new clients who find the studio through the MindBody app. Setup takes 60–90 days.'], ['Your landmine', '“When a new client finds you through the MindBody app, do you know what you’re paying for that lead?”'], ['What their customers say', 'Too many clicks, price increases, contracts that are hard to exit.']]},
        {name: 'WellnessLiving', rows: [['Acknowledge, then our edge', 'Low entry price and broad coverage. Momence is built for studios specifically, and its terms are in the agreement you sign, not on a webpage.'], ['The real weak spot', 'Billing and contract terms. Their BBB pattern: add-ons charged without clear agreement and billing after cancellation.'], ['Your landmine', '“If you cancelled tomorrow, how confident are you the charges would actually stop?”'], ['What their customers say', 'A cluttered interface and migrations that didn’t fully transfer.']]},
        {name: 'Glofox', rows: [['Acknowledge, then our edge', 'Franchise depth. Momence does that with native live and on-demand video and pick-a-spot booking, which Glofox doesn’t have.'], ['The real weak spot', 'Cost structure. Their own proposal quotes 3.80% per card transaction, $0.10 per text and $3 per e-agreement. Renewal increases with little notice.'], ['Your landmine', '“What did your price move to at your last renewal, and how much notice did you get?”'], ['What their customers say', 'Renewal jumps and an admin side that needs a laptop.']]},
        {name: 'Arketa', rows: [['Acknowledge, then our edge', 'Video and brand. Momence streams live and on-demand too, with marketing, the branded app and messaging in one platform instead of up-charges.'], ['The real weak spot', 'Their own pricing page: “3% transaction fee + Stripe fees.” Reviewers question reporting accuracy and stability.'], ['Your landmine', '“When you pull a revenue report, does it reconcile against Stripe, or do you keep a spreadsheet alongside it?”'], ['What their customers say', 'Recurring bugs and slow support replies.']]},
        {name: 'Walla', rows: [['Acknowledge, then our edge', 'Simple and built by studio owners. Momence is easy to use too, and it replaces the 3–4 tools studios run alongside Walla.'], ['The real weak spot', 'Growth and consolidation. Features still being built and limited automation.'], ['Your landmine', '“Besides Walla, what other tools are you paying for: email, SMS, reviews, forms?”'], ['What their customers say', 'Few complaints. Mostly missing features and limited automation.']]}
      ]},
    {type: 'table', label: '5 · “WHAT MAKES YOU DIFFERENT?”', title: 'VARS',
      head: ['Step', 'What it does', 'Example · Glofox'],
      rows: [
        ['Validate', 'Respect the question', '“Fair question. Glofox belongs on your list.”'],
        ['Acknowledge', 'Name their strength, tie it to ours', '“They do franchise well, and we do that with native video and pick-a-spot built in.”'],
        ['Reframe', 'Name the real cost', '“Where it gets expensive is the structure: their own pricing runs 3.80% per transaction plus per-text fees.”'],
        ['Specify', 'Make it about them, then the meeting', '“That’s exactly what the AE can walk through with your numbers.”']
      ]},
    {type: 'pickup', label: '6 · THEIR OBJECTION, YOUR MOVE', title: 'Five scenarios', body: 'Pick the best response. One per competitor.', tryLabel: 'TRY IT · PICK THE RESPONSE',
      cards: [
        {setup: 'Fitness studio · owner · on Glofox', line: '“Glofox is cheaper than you.”',
          options: ['“We’re actually cheaper.”', '“On the subscription, maybe. Their own pricing adds 3.80% per transaction and per-text fees. What’s your monthly card volume?”', '“Their support is bad, though.”', '“OK, no problem.”'],
          answer: '“On the subscription, maybe. Their own pricing adds 3.80% per transaction and per-text fees. What’s your monthly card volume?”', why: 'Acknowledge the sticker price, reframe on the all-in cost, make it about their numbers.'},
        {setup: 'Yoga studio · director · on WellnessLiving', line: '“WellnessLiving has great reviews.”',
          options: ['“Reviews are fake.”', '“Their support is terrible.”', '“They do, and day to day people like it. Worth asking how they’d handle a billing dispute before you sign an annual contract.”', '“Ours are better.”'],
          answer: '“They do, and day to day people like it. Worth asking how they’d handle a billing dispute before you sign an annual contract.”', why: 'Both are true: good day-to-day reviews, and a billing pattern on the BBB.'},
        {setup: 'Pilates studio · owner · on MindBody', line: '“MindBody’s app brings us new clients.”',
          options: ['“That channel is real. Do you know what share of new signups come through it, and what that fee adds up to in a year?”', '“It doesn’t.”', '“Marketplaces are dead.”', '“Then you should stay.”'],
          answer: '“That channel is real. Do you know what share of new signups come through it, and what that fee adds up to in a year?”', why: 'Acknowledge the channel, then let them do the math on a fee Momence doesn’t charge.'},
        {setup: 'Wellness practice · owner · on Arketa', line: '“We love Arketa’s video.”',
          options: ['“Video doesn’t matter.”', '“Theirs isn’t good.”', '“We have more features.”', '“Video’s a real strength, and we do live and on-demand too. Worth weighing against the 3% on every transaction.”'],
          answer: '“Video’s a real strength, and we do live and on-demand too. Worth weighing against the 3% on every transaction.”', why: 'Acknowledge, show we match it, then reframe.'},
        {setup: 'Yoga studio · owner · on Walla', line: '“Walla is easier to use.”',
          options: ['“It isn’t.”', '“They’ve done a great job on simplicity, and Momence is easy too. Besides Walla, what else are you paying for to run marketing and reviews?”', '“Ours is easier.”', 'Drop the subject'],
          answer: '“They’ve done a great job on simplicity, and Momence is easy too. Besides Walla, what else are you paying for to run marketing and reviews?”', why: 'Acknowledge, match, then show where Momence goes further.'}
      ]},
    {type: 'table', label: '7 · QUICK REFERENCE', title: 'Fees you can cite',
      head: ['Competitor', 'Fee', 'Source'],
      rows: [
        ['MindBody', '20% marketplace fee, capped at $30, on new clients from their app', 'MindBody’s own documentation'],
        ['Glofox', '3.80% per card transaction · $0.10 per text · $3 per e-agreement', 'Glofox’s own enterprise proposal'],
        ['Arketa', '3% transaction fee + Stripe fees', 'Arketa’s pricing page'],
        ['WellnessLiving', 'Processing “starting at 2.59%” (a floor, not a rate)', 'Their pricing page'],
        ['Walla', 'No fee angle. Use consolidation', '—']
      ],
      after: 'Internal notes sometimes carry a price one studio was quoted. Say “studios we’ve talked to were quoted around…” or skip it. Never present it as their published price.'},
    {type: 'killers', label: '8 · WATCH OUT', title: 'What loses the room',
      items: [
        ['The broad attack', '“Their support is awful”', 'Verified, specific weak spots only'],
        ['The unverified number', '“Arketa costs $299”', '“Studios we’ve talked to were quoted around…” or skip it'],
        ['The feature war', 'A comparison sheet read aloud', 'One gap that matters to them, then the meeting'],
        ['Knocking their choice', 'Now they’re defending it', 'Acknowledge it, then show where we’re stronger'],
        ['Quoting our price', 'It loses the meeting', 'The AE covers it'],
        ['Claiming what you can’t confirm', 'One wrong fact costs your credibility', 'Ask how they handle it today']
      ]},
    {type: 'application', label: '9 · APPLICATION', title: 'Prep three leads on competitor software',
      body: 'Three real leads from your Book, on at least two different competitors. They come with you to the roleplay.',
      distinct: 'competitor', distinctMin: 2, textMin: 20, unit: 'leads', unitVerb: 'Prep', doneWord: 'prepped',
      fields: [
        {key: 'competitor', label: 'Current software', kind: 'select', options: COMPETITORS, required: true},
        {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
        {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
        {key: 'business', label: 'Business', kind: 'input', required: true},
        {key: 'note', label: 'What you already know', kind: 'input', required: true},
        {key: 'opener', label: 'The landmine you’ll use', kind: 'textarea', placeholder: 'A question they answer from their own experience.', required: true}
      ],
      slots: [
        {type: 'Lead 1', hint: 'A lead on competitor software'},
        {type: 'Lead 2', hint: 'A different competitor'},
        {type: 'Lead 3', hint: 'Any competitor'}
      ]}
  ]
};

export const CC5_ROLEPLAY = {
  title: 'Competitor roleplay',
  mode: 'rapid',
  slots: ['Lead 1', 'Lead 2', 'Lead 3'],
  distinct: 'competitor', distinctMin: 2,
  leadFields: [
    {key: 'competitor', label: 'Current software', kind: 'select', options: COMPETITORS, required: true},
    {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
    {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
    {key: 'business', label: 'Business', kind: 'input', required: true},
    {key: 'note', label: 'What you already know', kind: 'input', required: true},
    {key: 'opener', label: 'Your landmine', kind: 'textarea', required: true}
  ],
  quickFacts: QUICK_FACTS, factsKey: 'competitor',
  prepNote: 'Carried over from training. Your manager plays a customer of each lead’s software.',
  setup: 'Three rounds, about 4 minutes each. Start after the opener with the prospect naming their software. Play the stance; use the quick facts to judge accuracy.',
  criteria: [
    {id: 'acknowledge', name: 'Acknowledges, then positions Momence', hint: 'Names a real strength, then ties it to where Momence is better.'},
    {id: 'landmine', name: 'Plants a landmine', hint: 'A question the prospect answers from their own experience. One of the three wins counts.'},
    {id: 'facts', name: 'Uses verified facts', hint: 'Every number or claim matches the quick facts and battle card.'},
    {id: 'vars', name: 'VARS when asked', hint: '“What makes you different?” gets Validate, Acknowledge, Reframe, Specify.'},
    {id: 'meeting', name: 'Ties it to the meeting', hint: 'What they noticed becomes the reason for the AE call. Not asked when a contract has 6+ months left.'},
    {id: 'natural', name: 'Natural', hint: 'A conversation, not a comparison sheet.'}
  ],
  musts: [
    {id: 'accurate', name: 'No inaccurate or unverified claim'},
    {id: 'noknock', name: 'Never knocked their software or made a broad quality attack'},
    {id: 'noprice', name: 'Didn’t quote Momence pricing'}
  ],
  cards: [
    {id: 'fan', title: 'Card 1 · Loyal fan', rows: [['Play it', '“Honestly, we love it.”'], ['Hidden', 'One real cost they’ve never added up: the fee or renewal from the quick facts.'], ['Unlocks if', 'The rep acknowledges, positions Momence and plants the landmine.']]},
    {id: 'price', title: 'Card 2 · Price shopper', rows: [['Play it', '“They’re cheaper than you.”'], ['Hidden', 'Hasn’t counted transaction fees or the extra tools they pay for.'], ['Unlocks if', 'The rep asks about the all-in cost instead of arguing the sticker price.']]},
    {id: 'reviews', title: 'Card 3 · Reviews quoter', rows: [['Play it', '“They have better reviews than you.”'], ['Hidden', 'Frustrated by the weak spot on the quick facts.'], ['Unlocks if', 'The rep agrees the reviews are good, then asks about that one thing.']]},
    {id: 'burned', title: 'Card 4 · Recently burned', rows: [['Play it', 'Vent about a renewal increase or a billing problem.'], ['The trap', 'The rep piles on.'], ['Strong rep', 'Stays professional, doesn’t knock them, turns it into the meeting.']]},
    {id: 'features', title: 'Card 5 · Feature asker', rows: [['Play it', '“So what can you do that they can’t?”'], ['Tests', 'VARS without starting a feature war.']]},
    {id: 'fatigued', title: 'Card 6 · Switch-fatigued', rows: [['Play it', '“We switched to them a year ago. Not doing it again.”'], ['Hidden', 'The migration lost data.'], ['Unlocks if', 'The rep uses the migration line (“we’re getting a little ahead of ourselves…”) and asks what went wrong.']]},
    {id: 'locked', title: 'Card 7 · Locked in', rows: [['Play it', '“We’re under contract for another year.”'], ['Strong rep', 'Acknowledges, plants one landmine, gets the renewal date and logs it.'], ['Note', 'More than 6 months left, so the rep doesn’t ask for the meeting. Asking anyway counts against “Ties it to the meeting.”']]}
  ]
};
