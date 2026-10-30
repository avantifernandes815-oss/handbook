// JAE3 · Payments and Card Fees — step-by-step training content (Junior AE track).
// Built from the Junior AE Knowledge Bank. Card and ACH rates, pass-through, the reader and the card-export fee follow the co-manager's confirmed answers (Oct 30, 2026).

export const JA3_TRAINING = {
  "title": "Payments and Card Fees",
  "summary": "How processing works and what it costs, saved cards and ACH, passing fees on, failed payments, the card reader, and how to answer “what’s your rate?” with the confirmed rates. About 12 minutes.",
  "format": "steps",
  "minutes": 12,
  "quizNote": "10 scenario questions from real demo moments. You need 80% to pass.",
  "steps": [
    {
      "title": "How processing works",
      "why": "Owners ask early whether processing is another bill, and a muddled answer makes the price feel bigger than it is.",
      "idea": "Momence processes payments through Stripe. During onboarding the studio connects its own Stripe account, and connecting it early lets them start taking payments sooner. There's no separate processing plan on top of the software. Fees come out of each transaction, as they do on every booking system. Online card payments are 3.9% + $0.30, in-person card payments are 3.7% + $0.05, and ACH (direct debit) is 1.8%. Chargeback fees, refund fees, PCI compliance fees and the automatic card updater are all included in those rates.",
      "say": "“You pay your plan price, then a fee on each transaction, like any system. Chargebacks, refunds and PCI compliance are already in that rate.”",
      "good": [
        {
          "text": "The prospect said MindBody took fees she was never told about. The AE said the only fees were the software and payment processing, and showed that passing the processing fee on is an on-or-off choice.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja3-1-good.mp4",
            "seconds": 95
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect asked if she could take HSA payments. The AE said yes right away, and nobody has confirmed it. A payment question the studio will build around needs “let me confirm that” first.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja3-1-missed.mp4",
            "seconds": 60
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Is payment processing another monthly bill on top of the plan?” What’s accurate?",
        "options": [
          "Yes, processing is its own monthly plan billed with the software",
          "No, it’s free, because Momence covers processing for all studios",
          "No, fees come out per transaction through Stripe, like any system",
          "It depends on the plan, so check the calculator before answering"
        ],
        "answer": 2,
        "why": "Processing fees are taken per transaction, and chargebacks, refunds and PCI compliance are included. There’s no extra processing plan."
      },
      "points": [
        {
          "label": "Payments through Stripe",
          "text": "Momence processes payments through Stripe."
        },
        {
          "label": "Connect Stripe early",
          "text": "During onboarding the studio connects its own Stripe account, and connecting it early lets them start taking payments sooner."
        },
        {
          "label": "No separate processing plan",
          "text": "There's no separate processing plan on top of the software."
        },
        {
          "label": "Fees per transaction",
          "text": "Fees come out of each transaction, as they do on every booking system."
        },
        {
          "label": "Card and ACH rates",
          "text": "Online card payments are 3.9% + $0.30, in-person card payments are 3.7% + $0.05, and ACH (direct debit) is 1.8%."
        },
        {
          "label": "What the rates include",
          "text": "Chargeback fees, refund fees, PCI compliance fees and the automatic card updater are all included in those rates."
        }
      ]
    },
    {
      "title": "Card on file and ACH",
      "why": "Saved cards make memberships, no-show fees and quick front-desk sales work, so owners want to see them.",
      "idea": "Clients can save their card at checkout for future purchases, and a recurring membership charges that saved card automatically each billing date. For appointments, the studio can take card details without charging, to hold the spot and back up a late-cancel or no-show fee written into its terms. Clients can also pay by ACH from their bank account. ACH is 1.8%, which costs the studio less than a card.",
      "say": "“For privates, you can save their card at booking without charging it, so your no-show fee actually gets collected.”",
      "good": [
        {
          "text": "On an appointment booking, the AE showed the card being saved without a charge to hold the spot, tied it to late-cancel and no-show terms, then showed taking payment with the card on file in one click.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja3-2-good.mp4",
            "seconds": 75
          }
        }
      ],
      "missed": [
        {
          "text": "Asked what ACH costs, the AE guessed a number on the spot (“I want to say like…”). Another demo quoted a different one. A guessed rate is the one the prospect remembers. The ACH rate is 1.8%.",
          "source": "Pure Yoga demo",
          "clip": {
            "src": "/content/videos/ja3-2-missed-o1.mp4",
            "seconds": 50
          }
        },
        {
          "text": "The AE told the prospect that paying by direct debit (ACH) carries no processing fee. Later in the call she found a fee on the quote, and he had to correct himself. ACH is 1.8%. It’s cheaper than a card, and it still has a fee.",
          "source": "Jenn G. demo",
          "clip": {
            "src": "/content/videos/ja3-2-missed-a1.mp4",
            "seconds": 90
          }
        }
      ],
      "check": {
        "prompt": "A massage therapist loses money to no-shows. Which feature do you show her?",
        "options": [
          "Saving the card at booking so a no-show fee can be charged",
          "Passing the card fee on so clients cover processing costs",
          "Setting up ACH so clients pay from their bank for less",
          "Sending a payment link by email after a missed booking"
        ],
        "answer": 0,
        "why": "A saved card holds the spot without a charge. With a no-show fee in her terms, she can actually collect it."
      },
      "points": [
        {
          "label": "Saved cards and memberships",
          "text": "Clients can save their card at checkout for future purchases, and a recurring membership charges that saved card automatically each billing date."
        },
        {
          "label": "Card holds for appointments",
          "text": "For appointments, the studio can take card details without charging, to hold the spot and back up a late-cancel or no-show fee written into its terms."
        },
        {
          "label": "ACH at 1.8%",
          "text": "Clients can also pay by ACH from their bank account. ACH is 1.8%, which costs the studio less than a card."
        }
      ],
      "voice": [
        {
          "text": "Last-minute cancellations are becoming a real problem. She's never charged a cancellation fee and asked how clients would know one might apply.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja3-2-voice.mp4",
            "seconds": 32
          }
        }
      ]
    },
    {
      "title": "Passing on card fees",
      "why": "It’s one of the biggest money levers in a demo, and AEs have explained it several different ways.",
      "idea": "The studio can turn on passing fees to the client. At checkout the client sees the fee as its own line, then the total. It’s flexible: the studio can pass on all of the fees, part of them on a sliding scale, or none and pay them itself. Passing fees on saves studios $400 to $2,000 a month. Whether members can be exempted is still being confirmed, so don’t promise it. Arketa studios can pass fees on too, so present it as an option the owner controls and don’t pitch it as unique to Momence.",
      "say": "“You can pass the card fee to clients, pass on part of it, or keep paying it yourself. It’s a setting you control.”",
      "good": [
        {
          "text": "The AE showed the card fee as a separate line before the total, said the studio could pay it or pass it on, and noted that some owners are against it and some are all for it.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja3-3-good.mp4",
            "seconds": 60
          }
        }
      ],
      "missed": [
        {
          "text": "The AE pushed it hard (“I recommend doing this”) and quoted a monthly savings range. The confirmed figure is $400 to $2,000 a month, and it still belongs after you’ve asked how the owner feels about fees. Present it as an option.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja3-3-missed.mp4",
            "seconds": 55
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Can I pass on just part of the card fee?” What’s accurate?",
        "options": [
          "No, it’s all or nothing: clients pay the full fee or none of it",
          "Only online; in-person card fees can’t be passed on to clients",
          "Only if she turns ACH off, since that fee can’t be passed on",
          "Yes, she can pass on all, part or none of it, on a sliding scale"
        ],
        "answer": 3,
        "why": "Pass-through is flexible. Any share of the fees can go to clients on a sliding scale, or none at all."
      },
      "points": [
        {
          "label": "Pass fees on",
          "text": "The studio can turn on passing fees to the client."
        },
        {
          "label": "Fee shown at checkout",
          "text": "At checkout the client sees the fee as its own line, then the total."
        },
        {
          "label": "Sliding scale",
          "text": "It’s flexible: the studio can pass on all of the fees, part of them on a sliding scale, or none and pay them itself."
        },
        {
          "label": "What it saves",
          "text": "Passing fees on saves studios $400 to $2,000 a month."
        },
        {
          "label": "Member exemptions",
          "text": "Whether members can be exempted is still being confirmed, so don’t promise it."
        },
        {
          "label": "Not unique to Momence",
          "text": "Arketa studios can pass fees on too, so present it as an option the owner controls and don’t pitch it as unique to Momence."
        }
      ],
      "voice": [
        {
          "text": "She already passes the card fee on to all clients as a flat convenience fee. That keeps pricing even between people who pay by card and people who pay cash.",
          "source": "Core Fluency Pilates demo",
          "clip": {
            "src": "/content/videos/ja3-3-voice.mp4",
            "seconds": 50
          }
        }
      ]
    },
    {
      "title": "“My clients will mind fees”",
      "why": "Older or small-town client bases often push back on fees, and pressing the point can cost you the deal.",
      "idea": "Ask first whether they pass fees on today and how their clients would react. If the owner says clients will mind, take that at face value. Pass-through is optional, so the rest of the demo works with it switched off. Compare total cost against what they pay now, with fees off, and show passing them on only as a choice. Then move on.",
      "say": "“That’s fair. Plenty of studios keep it off. Let’s compare your costs with it off, and you decide.”",
      "good": [
        {
          "text": "The AE asked if the prospect passed fees on with Arketa. She could but didn’t, so the AE said some owners are against it, left it as an option and moved on.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja3-4-good.mp4",
            "seconds": 50
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect kept pushing back on passing card fees to her members. The AE kept pushing (squeaky wheels, monthly credits) until she explained her town is small and her members are older. Only then did he adapt.",
          "source": "Pure Yoga demo",
          "clip": {
            "src": "/content/videos/ja3-4-missed-o1.mp4",
            "seconds": 95
          }
        },
        {
          "text": "For the second time in the call, the AE told a brand-new studio owner to pass card fees on, saying it would save at least $400 a month and pay for Momence. He never asked whether she passes fees on today or how her students would feel about it.",
          "source": "New yoga studio demo (Manhattan)",
          "clip": {
            "src": "/content/videos/ja3-4-missed-a1.mp4",
            "seconds": 68
          }
        }
      ],
      "check": {
        "prompt": "Your prospect says, “My clients are older. They’d hate a card fee.” What’s the best response?",
        "options": [
          "Explain that most studios pass fees on, so clients adjust",
          "Accept it, keep the fee off and compare costs without it",
          "Offer clients credits so the fee doesn’t feel like a cost",
          "Show the savings she’d miss each month by keeping it off"
        ],
        "answer": 1,
        "why": "It’s her call and her clients. Respect it and compare costs the way she’ll actually run."
      },
      "points": [
        {
          "label": "Ask about fees today",
          "text": "Ask first whether they pass fees on today and how their clients would react."
        },
        {
          "label": "Accept client concerns",
          "text": "If the owner says clients will mind, take that at face value."
        },
        {
          "label": "Demo with fees off",
          "text": "Pass-through is optional, so the rest of the demo works with it switched off."
        },
        {
          "label": "Compare total cost",
          "text": "Compare total cost against what they pay now, with fees off, and show passing them on only as a choice."
        },
        {
          "label": "Then move on",
          "text": "Then move on."
        }
      ]
    },
    {
      "title": "“What’s your rate?”",
      "why": "Card rates were the last objection in several deals, and AEs quoted at least five different numbers. Now there’s one set of rates to quote.",
      "idea": "Quote the confirmed rates: 3.9% + $0.30 online, 3.7% + $0.05 in person and 1.8% for ACH. Say what’s included: chargebacks, refunds, PCI compliance and the automatic card updater. Ask what they pay now, what that covers and whether they pass it on, and get a statement if you can. If their rate is lower, take it to your manager before you promise a match. Then compare the total, software plus processing, against what they pay today.",
      "say": "“Online cards are 3.9% plus 30 cents, in person it’s 3.7% plus 5 cents, and ACH is 1.8%. Chargebacks, refunds and PCI are included. What are you paying now?”",
      "good": [
        {
          "text": "The AE said she’d send the processing fees in writing, said they’re negotiable, and asked the prospect to send her current MindBody fees so she could try to get them matched.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja3-5-good.mp4",
            "seconds": 48
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect asked if processing was an extra charge. The AE cleared that up, then quoted card and ACH rates from memory, and other demos quoted different ones. The rates are now confirmed: 3.9% + $0.30 online, 3.7% + $0.05 in person and 1.8% ACH. Quote those exactly.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja3-5-missed.mp4",
            "seconds": 70
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks for your online card rate. What should you do?",
        "options": [
          "Give 3.9% + $0.30, say what’s included, and ask what she pays now",
          "Give the rate you hear most in demos, and say it may drop later",
          "Say our rate matches whatever her provider charges her today",
          "Say rates depend on volume and come up once she’s signed up"
        ],
        "answer": 0,
        "why": "Quote the confirmed rate and what it covers. Her current rate then gives you a real comparison."
      },
      "points": [
        {
          "label": "Quote the confirmed rates",
          "text": "Quote the confirmed rates: 3.9% + $0.30 online, 3.7% + $0.05 in person and 1.8% for ACH."
        },
        {
          "label": "Say what's included",
          "text": "Say what’s included: chargebacks, refunds, PCI compliance and the automatic card updater."
        },
        {
          "label": "Ask current rate",
          "text": "Ask what they pay now, what that covers and whether they pass it on, and get a statement if you can."
        },
        {
          "label": "Escalate rate matches",
          "text": "If their rate is lower, take it to your manager before you promise a match."
        },
        {
          "label": "Compare full total",
          "text": "Then compare the total, software plus processing, against what they pay today."
        }
      ],
      "voice": [
        {
          "text": "Asked what she pays, she said her card fees range from about 2.75 to 3.3 percent, so she charges clients 3.2 as a middle figure. Clients rarely complain, and a few pay by check instead.",
          "source": "Core Fluency Pilates demo",
          "clip": {
            "src": "/content/videos/ja3-5-voice.mp4",
            "seconds": 42
          }
        }
      ]
    },
    {
      "title": "Failed payments",
      "why": "Owners lose members quietly when cards fail, and showing the fix builds trust fast.",
      "idea": "Failed membership payments show as a tile on the dashboard, with a report behind it. The report shows whose payments failed, which were paid later and which weren’t, and when the next automatic rerun is. Transactional email templates tell the client a payment failed or will be retried, and the studio can edit them. How many times the system retries is being confirmed, so don’t give a number.",
      "say": "“This tile shows failed payments the moment you log in, and the system reruns them for you.”",
      "good": [
        {
          "text": "The prospect asked how she’d see money recovered from failed payments. The AE showed the dashboard tile and the report: who eventually paid, and who still needs a call.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja3-6-good.mp4",
            "seconds": 44
          }
        }
      ],
      "missed": [
        {
          "text": "Asked how failed payments get recovered, the AE showed the tile and the email templates well, then guessed the retry count (“two or three times”). Say you’ll confirm it.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja3-6-missed.mp4",
            "seconds": 120
          }
        }
      ],
      "check": {
        "prompt": "An owner says, “Members turn off their cards and I find out weeks later.” What do you show?",
        "options": [
          "A CRM segment of members who might be at risk of leaving",
          "A sequence that emails members before each billing date",
          "The pass-through setting, so declined fees hit the client",
          "The failed payments tile, its report and automatic reruns"
        ],
        "answer": 3,
        "why": "That’s the exact pain the tile and reruns solve. Show it as soon as she names it."
      },
      "points": [
        {
          "label": "Failed payments tile",
          "text": "Failed membership payments show as a tile on the dashboard, with a report behind it."
        },
        {
          "label": "Failed payments report",
          "text": "The report shows whose payments failed, which were paid later and which weren’t, and when the next automatic rerun is."
        },
        {
          "label": "Editable payment emails",
          "text": "Transactional email templates tell the client a payment failed or will be retried, and the studio can edit them."
        },
        {
          "label": "Retry count unconfirmed",
          "text": "How many times the system retries is being confirmed, so don’t give a number."
        }
      ],
      "voice": [
        {
          "text": "The owners said retries recover most failed payments, and the ones that don't recover are usually the same repeat clients. Automatic retries take a load off their admin team.",
          "source": "ReformX Pilates, second call (Australian franchise)",
          "clip": {
            "src": "/content/videos/ja3-6-voice.mp4",
            "seconds": 70
          }
        }
      ]
    },
    {
      "title": "Point of sale and readers",
      "why": "Walk-ins, retail and front-desk sales happen every day, and owners need to see staff take money in person.",
      "idea": "Point of sale is part of the core platform. From a class roster or an appointment, “take payment” opens the POS with the client and the item already in the cart. Staff can charge the card on file, take another payment method, or send a payment link the client pays on their phone. A card reader works through the studio’s Stripe account. Momence POS works with Stripe’s BBPOS WisePOS E reader. It costs $249 one time, bought directly from Stripe.",
      "say": "“If someone’s at the desk, tap take payment, and their card on file is right there.”",
      "good": [
        {
          "text": "Asked whether Momence sells the card reader, the AE explained it works through the studio’s own Stripe account, and confirmed that a membership bought in person charges the saved card each month.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja3-7-good.mp4",
            "seconds": 50
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect said fast check-in and payment at the door was his priority. The door-side flow with the card reader came 20 minutes in.",
          "source": "SALSAtlanta demo",
          "clip": {
            "src": "/content/videos/ja3-7-missed-o1.mp4",
            "seconds": 118
          }
        },
        {
          "text": "The operations lead asked whether staff could record cash taken in person. The AE moved on to saved cards and passing fees on, then the dashboard and inbox. He came back to paying at the desk about a minute later.",
          "source": "Skillz Sports Lab demo (Toronto)",
          "clip": {
            "src": "/content/videos/ja3-7-missed-a1.mp4",
            "seconds": 107
          }
        }
      ],
      "check": {
        "prompt": "A client arrives for a private that isn’t paid yet. How does staff collect?",
        "options": [
          "Ask the client to rebook online so checkout takes the payment",
          "Open the appointment, tap take payment and use the saved card",
          "Record it as cash, then charge the card after the session ends",
          "Email the owner so she can run the charge inside Stripe itself"
        ],
        "answer": 1,
        "why": "Take payment opens point of sale with the client and service already filled in."
      },
      "points": [
        {
          "label": "POS in core",
          "text": "Point of sale is part of the core platform."
        },
        {
          "label": "Take payment from roster",
          "text": "From a class roster or an appointment, “take payment” opens the POS with the client and the item already in the cart."
        },
        {
          "label": "Payment options",
          "text": "Staff can charge the card on file, take another payment method, or send a payment link the client pays on their phone."
        },
        {
          "label": "Card reader via Stripe",
          "text": "A card reader works through the studio’s Stripe account."
        },
        {
          "label": "WisePOS E reader",
          "text": "Momence POS works with Stripe’s BBPOS WisePOS E reader. It costs $249 one time, bought directly from Stripe."
        }
      ]
    },
    {
      "title": "Stored cards when switching",
      "why": "“Will my members’ cards come over?” often decides whether the switch feels safe.",
      "idea": "Client data and stored cards are two different things. Momence’s team pulls the client data, but the old provider controls the card file, and some charge a fee to release it. Some providers make it hard, so never promise that every card will transfer. Ask how many members pay on recurring cards, because they’re the ones affected. The card-export fee depends on the software and is about $500. MindBody, WellnessLiving and Glofox all charge for it. JAE4 covers migration in depth.",
      "say": "“Your client list comes over. Cards depend on your current provider, so let’s check what they’ll release.”",
      "good": [
        {
          "text": "The AE explained that Momence’s team can pull the studio’s MindBody data, and that payment profiles only come over if the studio requests MindBody’s exit file, which MindBody charges for.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja3-8-good.mp4",
            "seconds": 45
          }
        }
      ],
      "missed": [
        {
          "text": "Asked whether recurring payments would keep running after the switch, the AE was honest that not every card might transfer. But the answer turned into a joke at WellnessLiving’s expense and never covered members whose cards don’t come over.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja3-8-missed.mp4",
            "seconds": 75
          }
        }
      ],
      "check": {
        "prompt": "A MindBody studio asks, “Will all my members’ saved cards move over?” What’s the best answer?",
        "options": [
          "Yes, the onboarding team moves every saved card for free",
          "No, every member re-enters their card after the switch",
          "It depends on MindBody releasing the card file; let’s check",
          "Only cards of members who log in in the first week move"
        ],
        "answer": 2,
        "why": "The old provider controls the card file. Don’t promise every card, and don’t scare them either."
      },
      "points": [
        {
          "label": "Data versus stored cards",
          "text": "Client data and stored cards are two different things."
        },
        {
          "label": "Old provider controls cards",
          "text": "Momence’s team pulls the client data, but the old provider controls the card file, and some charge a fee to release it."
        },
        {
          "label": "Never promise every card",
          "text": "Some providers make it hard, so never promise that every card will transfer."
        },
        {
          "label": "Ask about recurring members",
          "text": "Ask how many members pay on recurring cards, because they’re the ones affected."
        },
        {
          "label": "Card-export fee",
          "text": "The card-export fee depends on the software and is about $500. MindBody, WellnessLiving and Glofox all charge for it. JAE4 covers migration in depth."
        }
      ],
      "voice": [
        {
          "text": "She hasn't been storing clients' cards, so that isn't a worry when she switches. For long-time clients whose older records may not come over, she has their emails and will ask them to sign up again.",
          "source": "Hansing's School of Dance demo",
          "clip": {
            "src": "/content/videos/ja3-8-voice.mp4",
            "seconds": 30
          }
        }
      ]
    }
  ],
  "sections": []
};
