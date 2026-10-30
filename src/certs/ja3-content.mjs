// JA3 · Payments and Card Fees — step-by-step training content (Junior AE track).
// Built from the Junior AE Knowledge Bank; unconfirmed numbers are held back until the co-manager answers.

export const JA3_TRAINING = {
  "title": "Payments and Card Fees",
  "summary": "How processing, saved cards, fee pass-through, failed payments and card readers work, and how to handle “what’s your rate?” while rates are being confirmed. About 12 minutes.",
  "format": "steps",
  "minutes": 12,
  "quizNote": "10 scenario questions from real demo moments. You need 80% to pass.",
  "steps": [
    {
      "title": "How processing works",
      "why": "Owners ask early whether processing is another bill, and a muddled answer makes the price feel bigger than it is.",
      "idea": "Momence processes payments through Stripe. During onboarding the studio connects its own Stripe account, and connecting it early lets them start taking payments sooner. There's no separate processing plan on top of the software. Fees come out of each transaction, as they do on every booking system. Our exact card and ACH rates are being confirmed right now, so this cert teaches the setup and leaves the numbers out.",
      "say": "“You pay the plan price, then a fee on each transaction, like any system. There’s no second bill for processing.”",
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
        "why": "Processing fees are taken per transaction. There’s no extra processing plan, and the rate itself is being confirmed."
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
          "label": "Rates being confirmed",
          "text": "Our exact card and ACH rates are being confirmed right now, so this cert teaches the setup and leaves the numbers out."
        }
      ]
    },
    {
      "title": "Card on file and ACH",
      "why": "Saved cards make memberships, no-show fees and quick front-desk sales work, so owners want to see them.",
      "idea": "Clients can save their card at checkout for future purchases, and a recurring membership charges that saved card automatically each billing date. For appointments, the studio can take card details without charging, to hold the spot and back up a late-cancel or no-show fee written into its terms. Clients can also pay by ACH from their bank account, which costs the studio less than a card. The ACH rate is being confirmed, so say it’s lower and don’t give a number.",
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
          "text": "Asked what ACH costs, the AE guessed a number on the spot (“I want to say like…”). Another demo quoted a different one. A guessed rate is the one the prospect remembers.",
          "source": "Pure Yoga demo"
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
          "label": "ACH bank payments",
          "text": "Clients can also pay by ACH from their bank account, which costs the studio less than a card."
        },
        {
          "label": "Don't give ACH rate",
          "text": "The ACH rate is being confirmed, so say it’s lower and don’t give a number."
        }
      ]
    },
    {
      "title": "Passing on card fees",
      "why": "It’s one of the biggest money levers in a demo, and AEs have explained it several different ways.",
      "idea": "The studio can turn on passing the card fee to the client. At checkout the client sees the fee as its own line, then the total. It’s a setting, so the studio can leave it off and pay the fee itself. Whether a studio can pass on only part of the fee, or exempt members, is still being confirmed, so don’t promise either. Arketa studios can pass fees on too, so present it as an option the owner controls and don’t pitch it as unique to Momence.",
      "say": "“You can pass the card fee to clients or keep paying it yourself. It’s a setting you control.”",
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
          "text": "The AE pushed it hard (“I recommend doing this”) and quoted a monthly savings range that nobody has verified. Present it as an option and leave unverified numbers out.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja3-3-missed.mp4",
            "seconds": 55
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Can I pass on half the fee and keep members exempt?” What do you say?",
        "options": [
          "Yes, you can set any share and exclude members from the fee",
          "No, it’s all or nothing, and members pay the fee like anyone",
          "Suggest leaving it off for now so the question doesn’t matter",
          "Say that detail is being confirmed and you’ll get back to her"
        ],
        "answer": 3,
        "why": "Demos have answered this both ways. Confirm it before you promise anything."
      },
      "points": [
        {
          "label": "Pass card fee on",
          "text": "The studio can turn on passing the card fee to the client."
        },
        {
          "label": "Fee shown at checkout",
          "text": "At checkout the client sees the fee as its own line, then the total."
        },
        {
          "label": "Optional setting",
          "text": "It’s a setting, so the studio can leave it off and pay the fee itself."
        },
        {
          "label": "Partial pass-through unconfirmed",
          "text": "Whether a studio can pass on only part of the fee, or exempt members, is still being confirmed, so don’t promise either."
        },
        {
          "label": "Not unique to Momence",
          "text": "Arketa studios can pass fees on too, so present it as an option the owner controls and don’t pitch it as unique to Momence."
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
          "text": "The prospect said her older, small-town clients would mind paying fees. The AE pushed passing fees on twice more before he adapted.",
          "source": "Pure Yoga demo"
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
      "why": "Card rates were the last objection in several deals, and AEs have quoted at least five different numbers.",
      "idea": "Our card and ACH rates are being confirmed with management, so don’t quote one from memory. Ask what they pay now and whether they pass it on, and get a statement if you can. Tell them you’ll send current rates in writing. If their rate is lower, take it to your manager before you promise a match. Then compare the total, software plus processing, against what they pay today.",
      "say": "“Send me what you pay now. I’ll get you our rates in writing and see what we can do.”",
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
          "text": "The prospect asked if processing was an extra charge. The AE cleared that up, then quoted card and ACH rates from memory. Other demos quoted different rates, which is why rates are being confirmed.",
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
          "Ask what she pays now and send current rates in writing",
          "Give the rate you hear most in demos, and say it may drop",
          "Say our rate matches whatever her provider charges today",
          "Say rates depend on volume and come up once she’s signed"
        ],
        "answer": 0,
        "why": "Her current rate gives you a real comparison. Ours goes in writing once it’s confirmed."
      },
      "points": [
        {
          "label": "Don't quote rates",
          "text": "Our card and ACH rates are being confirmed with management, so don’t quote one from memory."
        },
        {
          "label": "Ask current rate",
          "text": "Ask what they pay now and whether they pass it on, and get a statement if you can."
        },
        {
          "label": "Send rates in writing",
          "text": "Tell them you’ll send current rates in writing."
        },
        {
          "label": "Escalate rate matches",
          "text": "If their rate is lower, take it to your manager before you promise a match."
        },
        {
          "label": "Compare full total",
          "text": "Then compare the total, software plus processing, against what they pay today."
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
      ]
    },
    {
      "title": "Point of sale and readers",
      "why": "Walk-ins, retail and front-desk sales happen every day, and owners need to see staff take money in person.",
      "idea": "Point of sale is part of the core platform. From a class roster or an appointment, “take payment” opens the POS with the client and the item already in the cart. Staff can charge the card on file, take another payment method, or send a payment link the client pays on their phone. A card reader works through the studio’s Stripe account. The reader model, price and where to buy it are being confirmed, so don’t quote them.",
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
          "source": "SALSAtlanta demo"
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
          "label": "Reader details unconfirmed",
          "text": "The reader model, price and where to buy it are being confirmed, so don’t quote them."
        }
      ]
    },
    {
      "title": "Stored cards when switching",
      "why": "“Will my members’ cards come over?” often decides whether the switch feels safe.",
      "idea": "Client data and stored cards are two different things. Momence’s team pulls the client data, but the old provider controls the card file, and some charge a fee to release it. Some providers make it hard, so never promise that every card will transfer. Ask how many members pay on recurring cards, because they’re the ones affected. JA4 covers migration in depth, and fees and timing are being confirmed.",
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
          "label": "Migration covered in JA4",
          "text": "JA4 covers migration in depth, and fees and timing are being confirmed."
        }
      ]
    }
  ],
  "sections": []
};
