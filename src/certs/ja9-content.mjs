// JAE10 · Mock Demo — the last step of the mandatory Junior AE path. Roleplay only.
// The Senior SDR books a full mock demo with their manager once JAE1–JAE8 are passed.
// The manager plays a prospect drawn from a hidden card. Cards are built from real AE demos in the Junior AE Knowledge Bank.

export const JA9_ROLEPLAY = {
  title: 'Mock demo',
  mode: 'rapid',
  slots: ['Mock demo'],
  leadFields: [
    {key: 'business', label: 'What do you most want feedback on?', kind: 'input', required: true}
  ],
  copy: {
    intro: 'A full mock demo with your manager. The last step of the Junior AE path.',
    nextTitle: 'Book your mock demo.',
    listTitle: 'Your focus',
    listHint: 'Your manager plays a prospect from a hidden card based on a real demo. Run the whole call: discovery, the demo, pricing, and the close.',
    word: 'mock demo'
  },
  setup: 'One full demo, about 30–40 minutes, one take. Draw a card and play that prospect. Share the details on the card only when the rep asks for them, and raise the objection and the curveball when they fit naturally.',
  minutes: 45,
  criteria: [
    {id: 'contract', name: 'Up-front contract and discovery', hint: 'JAE8 · JAE9 · Agreed time, agenda and how the call ends. Found the pain, its cost, the budget and who decides before demoing.'},
    {id: 'fulfill', name: 'Demo tied to their pain', hint: 'JAE8 · JAE9 · Led with their top need, tied each screen to what they said, skipped what didn’t matter to them.'},
    {id: 'product', name: 'Product knowledge', hint: 'JAE1 · JAE7 · Showed checkout, back end, marketing and the AI accurately and confidently.'},
    {id: 'competitor', name: 'Their current software', hint: 'JAE5 · Acknowledged what works for them, showed where Momence is better, no knocks.'},
    {id: 'pricing', name: 'Custom quote and payments', hint: 'JAE2 · JAE3 · Anchored to their current total spend, built a custom quote in the calculator (the core platform plus the add-ons they need, no named plans), explained card rates and fees clearly.'},
    {id: 'switch', name: 'Migration and onboarding', hint: 'JAE4 · Said clearly what moves over and what isn’t guaranteed, and set honest expectations.'},
    {id: 'close', name: 'Close and next step', hint: 'JAE6 · Handled the stall, brought in the decision-maker, stated the contract and sign-up terms correctly, ended with a close or a dated next step.'}
  ],
  musts: [
    {id: 'accurate', name: 'Every claim accurate. Said “I’ll confirm” instead of guessing'},
    {id: 'noknock', name: 'No knocking their current software or a competitor'},
    {id: 'nextstep', name: 'Ended with a close or a dated next step, not “I’ll send info”'},
    {id: 'quote', name: 'No named plans, improvised prices or promised discounts'}
  ],
  cards: [
    {id: 'mbswitch', title: 'Card 1 · The burned MindBody owner', call: 'book', rows: [
      ['Business', 'Hot and non-hot yoga and fitness studio, about 6 months old, 21 instructors, about 70 members. Privates about to start.'],
      ['Current software', 'MindBody with its marketing suite and a branded app. Says “about $500 a month” if asked. Renews in about a month.'],
      ['Pain, if they dig', 'Onboarding was 12 Zoom calls and the last six repeated themselves. Leads sat unseen for weeks, so members are tracked on Post-its. Calls support almost daily.'],
      ['Must-have', 'Knowing when a lead comes in, and a back end the front desk can actually use.'],
      ['Decision', 'A business partner decides with them. Only mention her if the rep asks who else is involved.'],
      ['Objection', '“How do I know onboarding won’t be another 12 calls?”'],
      ['Curveball', '“What exactly will your card rate be?” A strong rep gives the confirmed rates (3.9% + $0.30 online, 3.7% + $0.05 in person, 1.8% ACH) and says the fees can be passed on to clients.'],
      ['Late question', '“How long am I locked in?” A strong rep says 12 months from the first bill date, auto-renewing, with no early exit, so leaving early means paying the remaining months.'],
      ['Strong close', 'Plans the switch around the renewal date and books a follow-up with the partner on it.']
    ]},
    {id: 'wlevents', title: 'Card 2 · The WellnessLiving studio with private events', call: 'book', rows: [
      ['Business', 'Hot yoga and aerial studio, about 2 years old, with a chiropractor and massage therapist on site. Database of about 4,000.'],
      ['Current software', 'WellnessLiving, “about $225 a month,” with a white-label app clients like. Uses Square to invoice private events by hand.'],
      ['Pain, if they dig', 'Automations are generic and nobody opens them. Booking makes clients create an account. Private aerial parties need phone calls and manual invoices.'],
      ['Must-have', 'Private events booked online with a deposit, then the balance later. Only say it’s “a huge part of my business” if the rep asks what would make switching worth it.'],
      ['Decision', 'Their spouse used the free trial and has a say.'],
      ['Objection', '“Arketa showed me something cheaper.”'],
      ['Curveball', '“Will all my clients’ saved cards come over?” A strong rep says it depends on the source software, and WellnessLiving charges a card-data export fee of about $500.'],
      ['Strong close', 'Shows or confirms the private-event flow, brings the spouse into the next call, and dates it.']
    ]},
    {id: 'arketa', title: 'Card 3 · The Arketa owner opening a second location', call: 'book', rows: [
      ['Business', 'One-room yoga studio, 18 months old, with a staffed front desk. Opening a luxury wellness location with a partner (massage, facials, IV therapy).'],
      ['Current software', 'Arketa. Says “$400 a month plus the branded app” if asked. Contract ends in December.'],
      ['Pain, if they dig', 'Arketa charges a whole new fee per location and can’t sell add-ons at checkout for a spa menu. Months of bugs. Their Meta ads don’t track leads.'],
      ['Must-have', 'Service booking with add-ons for the new location, at a sensible two-location price.'],
      ['What keeps them', 'Arketa’s natural-language reporting (“ask it what my churn is”).'],
      ['Decision', 'The partner on the new location.'],
      ['Curveball', '“Do you have AI reporting like that?” A strong rep is honest that the AI today is customer-facing, and quotes only a Productboard quarter, never a date.'],
      ['Strong close', 'Quotes two locations from the calculator and books a call with the partner before December.']
    ]},
    {id: 'preopen', title: 'Card 4 · The pre-open founder', call: 'book', rows: [
      ['Business', 'Lagree-style studio, lease just signed, opening in about 4 months. Running pop-ups before then with 10 portable reformers. First event in 6 weeks.'],
      ['Current software', 'None yet. Was leaning toward Walla and also looked at Mariana Tek.'],
      ['Pain, if they dig', 'The pop-up venue pushes its own ticketing app, and they want the attendee list in their own system.'],
      ['Must-have', 'Selling pop-up time slots (1:00, 1:30, 2:00) with about 10 tickets each, plus founding memberships before opening.'],
      ['Decision', 'Decides alone and wants to decide this week.'],
      ['Objection', '“Is there a lighter version until I open?” A strong rep explains there are no set plans: start on the core platform and add add-ons when they’re needed.'],
      ['Curveball', '“Aren’t you and Mariana Tek the same company?” A strong rep says sister companies under Xplor, run separately, with Mariana Tek suited to large franchises with a big brand presence. No knocks.'],
      ['Strong close', 'Shows the time-slot setup and founding memberships, then books a dated next step tied to the first event.']
    ]},
    {id: 'attentive', title: 'Card 5 · The MindBody owner with a tool that never worked', call: 'book', rows: [
      ['Business', 'Multi-modality studio (Pilates, yoga, HIIT, strength) opened this year. Second location, same brand, opening in the spring.'],
      ['Current software', 'MindBody, “about $300 a month, discounted to keep me.” Has paid for an AI marketing add-on for months that was never set up.'],
      ['Pain, if they dig', 'Copies lead emails by hand. Private promos have to be public to be bought. Online merch sales don’t work.'],
      ['Must-have', 'Marketing that actually runs on its own, and a clear plan for the second location.'],
      ['Decision', 'Not sure if they’re still under contract. Demoing Arketa tomorrow.'],
      ['Objection', '“Your price isn’t that far off, but MindBody is discounting me right now. Can you do better?” A strong rep promises no discount and takes any request to the manager.'],
      ['Curveball', '“Can my clients track their progress with photos and measurements?”'],
      ['Late question', '“Is there anything for signing now?” A strong rep says the first month is free depending on this month’s promotion, and doesn’t add to it.'],
      ['Strong close', 'Prepares them for the retention offer and the Arketa demo, and books a dated follow-up.']
    ]}
  ]
};
