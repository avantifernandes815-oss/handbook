// CC7 · Full Call Capstone — one unscripted call on a real lead. Roleplay only.
// Approved in the "CC7 · Full Call Capstone — Roleplay" doc on Oct 29, 2026.

import {VERTICALS, PERSONAS} from './cc2-content.mjs';
import {COMPETITORS, QUICK_FACTS} from './cc5-content.mjs';

export const CC7_ROLEPLAY = {
  title: 'Full call capstone',
  mode: 'rapid',
  slots: ['Lead'],
  leadFields: [
    {key: 'business', label: 'Business', kind: 'input', required: true},
    {key: 'vertical', label: 'Vertical', kind: 'select', options: VERTICALS, required: true},
    {key: 'persona', label: 'Persona', kind: 'select', options: PERSONAS, required: true},
    {key: 'competitor', label: 'Current software', kind: 'select', options: COMPETITORS, required: true},
    {key: 'note', label: 'What you know from pre-vetting', kind: 'input', required: true}
  ],
  prepNote: 'One real, pre-vetted account from your Book. No prepared opener: your manager plays whoever answers, and you run the whole call.',
  setup: 'One call, about 10 minutes, one take. Play whoever answers at their business, using the card and the quick facts.',
  minutes: 20,
  quickFacts: QUICK_FACTS, factsKey: 'competitor',
  callMust: 'book',
  callPrompt: 'How did the call end?',
  criteria: [
    {id: 'opener', name: 'Opener', hint: 'CC1 · Specific to the business, earns the next 30 seconds, hands it back.'},
    {id: 'pitch', name: 'Pitch', hint: 'CC2 · Under 20 seconds, built from what they said, one value.'},
    {id: 'discovery', name: 'Discovery', hint: 'CC3 · Opens wide, follows the thread, gets to impact, qualifies naturally.'},
    {id: 'objections', name: 'Objections', hint: 'CC4 · Reads it, acknowledges and disarms, handles the stack without repeating.'},
    {id: 'competitor', name: 'Competitor', hint: 'CC5 · Acknowledges, ties it to where Momence is better, plants a landmine, verified facts only.'},
    {id: 'booking', name: 'Booking', hint: 'CC6 · Spots the signal, firm specific ask, handles the stall, sets the agenda.'},
    {id: 'flow', name: 'Flow', hint: 'Sounds like a person, knows where they are in the call, doesn’t rush or stall.'}
  ],
  musts: [
    {id: 'book', name: 'Right call on booking', auto: true},
    {id: 'specific', name: 'Specific day and time (0–3 days out on the first ask), or a clear reason not to book'},
    {id: 'accurate', name: 'No inaccurate claim and no knocking their software'},
    {id: 'noprice', name: 'Didn’t quote or promise pricing'}
  ],
  cards: [
    {id: 'busy', title: 'Card 1 · The busy owner', call: 'book', rows: [['Pickup', 'Rushed. “Yeah, what is it?”'], ['Objections', '“We’re happy with what we have,” then “Just send me something.”'], ['Buried pain', 'First-time clients drop off during a long booking flow.'], ['Facts', '22 classes a week, month to month.'], ['Signal', '“How many steps is it on yours?”'], ['Stall at the ask', '“Call me next week.”']]},
    {id: 'friendly', title: 'Card 2 · The friendly manager', call: 'book', rows: [['Pickup', 'Warm and chatty.'], ['Objections', '“Bad timing, we’re slammed,” then “It’s probably too expensive anyway.”'], ['Buried pain', 'The renewal price jumped and the front desk chases renewals by hand.'], ['Facts', 'Studio manager, 2 locations, 30 classes a week, contract ends in 4 months.'], ['Signal', '“How do other studios handle that?”'], ['Stall at the ask', '“Let me look at my calendar.”']]},
    {id: 'guarded', title: 'Card 3 · The guarded co-owner', call: 'book', rows: [['Pickup', 'Suspicious. “Who is this?”'], ['Objections', '“I’m not the one who buys software” (she co-owns it), then “I’d need to check with my partner.”'], ['Buried pain', 'A billing surprise on the last statement.'], ['Facts', '5 providers, contract ends in 2 months.'], ['Signal', '“What would switching even involve?”'], ['Stall', 'The partner. The strong move is to invite her.']]},
    {id: 'shopper', title: 'Card 4 · The comparison shopper', call: 'book', rows: [['Pickup', 'Neutral.'], ['Objections', '“So what makes you different from what we use?”, then “Their reviews are better than yours.”'], ['Buried pain', 'Their reports don’t reconcile, so they keep a spreadsheet alongside.'], ['Facts', 'Director, 18 classes a week, contract ends in 5 months.'], ['Signal', '“Could you show me the reporting side?”'], ['Stall', 'None. A test of not talking past yes.']]},
    {id: 'rambler', title: 'Card 5 · The rambler', call: 'book', rows: [['Pickup', 'Talks about five things at once.'], ['Objections', '“We switched last year, not doing that again,” then “Not sure the timing’s right.”'], ['Buried pain', 'No-shows and late cancels.'], ['Facts', '40 classes a week, contract renews in 2 months.'], ['Signal', '“Would my team need training?”'], ['Stall at the ask', '“Send me something.”']], callNote: 'They have to pick the costliest thread and use the migration line.'},
    {id: 'locked', title: 'Card 6 · Locked in', call: 'nobook', dq: true, rows: [['Pickup', 'Polite.'], ['Objections', '“We’re happy,” then “We just signed for two years.”'], ['Buried pain', 'They run three extra tools alongside their software.'], ['Facts', '15 classes a week, 14+ months left on the contract.']], callNote: 'Plant the landmine, get the renewal date, log it.'}
  ]
};
