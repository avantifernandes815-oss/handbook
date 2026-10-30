// JAE4 · Migration and Onboarding — step-by-step training content (Junior AE track).
// Built from the Junior AE Knowledge Bank. The card-export fee, sign-up offer and migration volume follow the co-manager's confirmed answers (Oct 30, 2026); onboarding length is still unconfirmed.

export const JA4_TRAINING = {
  "title": "Migration and Onboarding",
  "summary": "What migration brings over, who does the work, and how to plan the switch and set expectations without promising what isn't confirmed. One step per screen, each with a real example from our AE calls and a quick check. About 12 minutes.",
  "format": "steps",
  "minutes": 12,
  "quizNote": "10 scenario questions from real demo moments. You need 80% to pass.",
  "steps": [
    {
      "title": "What comes over",
      "why": "Owners decide whether to switch based on what they might lose. A vague answer makes them assume the worst.",
      "idea": "Momence's team brings over the studio's client list, and demos agree that remaining credits are matched too. How much detail comes with each client depends on the old system and what its export includes. The team has a migration guide for each source software. Visit history, client logins and tags on migrated clients are still being confirmed, so don't promise them. Say what's certain, then say onboarding will confirm the rest.",
      "say": "“Your client list comes over, and our team matches what people have left on their packages. The finer detail depends on what your current system exports, and onboarding confirms that with you.”",
      "good": [
        {
          "text": "Moving from Acuity, the AE split it clearly: Momence's team pulls the client data, and stored cards need a separate encrypted export from Acuity.",
          "source": "Wild Yoga demo",
          "clip": {
            "src": "/content/videos/ja4-1-good-o1.mp4",
            "seconds": 96
          }
        },
        {
          "text": "The AE split it clearly: Momence's onboarding team pulls the data out of Arketa for her, while stored cards are the one thing she may have to collect again. The owner said she only wanted her client list anyway, and the AE confirmed that's a simple export and upload.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja4-1-good-a1.mp4",
            "seconds": 50
          }
        }
      ],
      "missed": [
        {
          "text": "Asked if each client's class history comes over, the AE said yes. Asked about tags, she guessed how they'd work before calling it a question for onboarding. Both answers went past what we can confirm.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja4-1-missed.mp4",
            "seconds": 108
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks if every detail of each client's history will come over. What's the best answer?",
        "options": [
          "Yes, everything in the old system comes over exactly as it is today",
          "No, only names and emails come over, so plan to rebuild the rest",
          "The client list comes over, and onboarding confirms the finer detail",
          "That depends on your plan, so let's look at the pricing first today"
        ],
        "answer": 2,
        "why": "Name what's certain and hand the detail to onboarding. A flat yes can turn into a broken promise."
      },
      "points": [
        {
          "label": "Client list and credits",
          "text": "Momence's team brings over the studio's client list, and demos agree that remaining credits are matched too."
        },
        {
          "label": "Detail depends on export",
          "text": "How much detail comes with each client depends on the old system and what its export includes. The team has a migration guide for each source software."
        },
        {
          "label": "Unconfirmed migration details",
          "text": "Visit history, client logins and tags on migrated clients are still being confirmed, so don't promise them."
        },
        {
          "label": "Say what's certain",
          "text": "Say what's certain, then say onboarding will confirm the rest."
        }
      ],
      "voice": [
        {
          "text": "She said that every time she has migrated, all her clients look new. She asked how to stop someone who bought an intro offer in Walla from buying it again after the move.",
          "source": "Hot For Yoga demo",
          "clip": {
            "src": "/content/videos/ja4-1-voice.mp4",
            "seconds": 35
          }
        }
      ]
    },
    {
      "title": "Stored cards",
      "why": "Stored cards are the piece most likely to go wrong, and owners dread chasing every member for a card.",
      "idea": "Stored cards aren't guaranteed. They depend on the old provider releasing the card data, usually through a separate export file the studio requests. The card-export fee depends on the software and is about $500. MindBody, WellnessLiving and Glofox all charge for it. Cards are also the slowest part of a migration, and some owners choose to bring over only the client list and collect cards again.",
      "say": "“Your client list comes over either way. Cards depend on your current provider releasing them, and depending on your software that file can cost about $500, so I won't promise every card. Onboarding walks you through that export.”",
      "good": [
        {
          "text": "The AE said the team would export her Arketa data and that cards might need to be captured again. She chose to bring over the client list only, and the AE confirmed that's a simple contact export.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja4-2-good.mp4",
            "seconds": 50
          }
        }
      ],
      "missed": [
        {
          "text": "The AE told a MindBody customer they could “flip a switch” with all members and data handled by Momence. He didn't mention that stored cards depend on MindBody releasing them.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja4-2-missed.mp4",
            "seconds": 62
          }
        }
      ],
      "check": {
        "prompt": "A MindBody studio asks, “Will all my members' cards come over?” What do you say?",
        "options": [
          "Cards depend on MindBody releasing them, so I can't promise all",
          "Yes. Our team moves every card over, so members won't notice",
          "No. Every member will have to enter a card again at launch",
          "Cards are simple. We can sort that out after you've signed up"
        ],
        "answer": 0,
        "why": "Cards rely on the old provider. Say so up front, and the owner trusts the rest of your answer."
      },
      "points": [
        {
          "label": "Cards not guaranteed",
          "text": "Stored cards aren't guaranteed."
        },
        {
          "label": "Old provider releases cards",
          "text": "They depend on the old provider releasing the card data, usually through a separate export file the studio requests."
        },
        {
          "label": "Card-export fee",
          "text": "The card-export fee depends on the software and is about $500. MindBody, WellnessLiving and Glofox all charge for it."
        },
        {
          "label": "Cards are slowest",
          "text": "Cards are also the slowest part of a migration, and some owners choose to bring over only the client list and collect cards again."
        }
      ],
      "voice": [
        {
          "text": "She has about 60 active memberships, and MindBody's web and app wallets don't match. If cards can't come over, her teachers can each contact about ten clients to collect cards again. She said that's not the end of the world.",
          "source": "Core Fluency Pilates demo",
          "clip": {
            "src": "/content/videos/ja4-2-voice.mp4",
            "seconds": 44
          }
        }
      ]
    },
    {
      "title": "Who does what",
      "why": "Owners who've had a hard setup before want to know exactly what lands on their plate.",
      "idea": "Momence's team does the data migration. The owner doesn't export or upload clients. The owner's job is to build the business in Momence with an onboarding specialist: classes, memberships, packs and appointments. These get built before the migration, so migrated clients land in the right memberships. The specialist shows how, builds some with the owner, and gives homework between sessions.",
      "say": "“Our team moves your data. Your part is building your memberships and classes with your specialist, so everyone lands in the right place.”",
      "good": [
        {
          "text": "The prospect worried she'd have to move member data herself. The AE said the team handles the migration, and her part is setting up memberships like her unlimited so the specialist can bring members into them.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja4-3-good.mp4",
            "seconds": 45
          }
        }
      ],
      "missed": [
        {
          "text": "After hearing about her 12 MindBody onboarding calls, the AE was asked what onboarding would look like. He said a team member would handle her data and that Momence is simpler. He didn't say what she would build or how the calls would run.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja4-3-missed.mp4",
            "seconds": 60
          }
        }
      ],
      "check": {
        "prompt": "Which part of the switch is the owner's job?",
        "options": [
          "Exporting the client file from the old system and uploading it",
          "Re-entering every member and their remaining credits by hand",
          "Pulling reports from the old system for the migration team",
          "Building memberships and classes with the onboarding specialist"
        ],
        "answer": 3,
        "why": "Momence's team moves the data. The owner builds the business it lands in."
      },
      "points": [
        {
          "label": "Momence migrates data",
          "text": "Momence's team does the data migration."
        },
        {
          "label": "Owner doesn't upload",
          "text": "The owner doesn't export or upload clients."
        },
        {
          "label": "Owner builds with specialist",
          "text": "The owner's job is to build the business in Momence with an onboarding specialist: classes, memberships, packs and appointments."
        },
        {
          "label": "Build before migration",
          "text": "These get built before the migration, so migrated clients land in the right memberships."
        },
        {
          "label": "Sessions and homework",
          "text": "The specialist shows how, builds some with the owner, and gives homework between sessions."
        }
      ],
      "voice": [
        {
          "text": "The owner wants the decision made this week so the business partner, who has more time while the owner handles construction, can lead onboarding. They want a presale running within a few weeks.",
          "source": "The Mill Yoga demo",
          "clip": {
            "src": "/content/videos/ja4-3-voice.mp4",
            "seconds": 40
          }
        }
      ]
    },
    {
      "title": "Running both systems",
      "why": "Owners fear a gap where nobody can book, or a mess where clients book in two places.",
      "idea": "The studio keeps running on its current system while Momence is built. Clients book and pay there as usual. Once the setup is ready, the studio sets a conversion date with onboarding. The team pulls the latest data at the switch, checks it with the owner, and the studio moves over. That way nobody books in two systems at once.",
      "say": "“Keep running on your current system while we build. When everything's ready, we set a conversion date and switch you over.”",
      "good": [
        {
          "text": "The prospect checked her understanding: WellnessLiving stays live while Momence is built, then a switch. The AE confirmed it and explained how the team brings packages over as they stand on the day of the switch.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja4-4-good.mp4",
            "seconds": 102
          }
        }
      ],
      "missed": [
        {
          "text": "Her Arketa contract end was in the SDR notes from the start. How the rollout and client import would work came up only at minute 74 of 78, when she asked.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja4-4-missed.mp4",
            "seconds": 66
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Will my studio be offline while we move?” What do you tell her?",
        "options": [
          "Yes. Plan a quiet week, because bookings pause during the move",
          "No. You keep running on your current system until the switch",
          "Only if you migrate cards. Without cards there's no downtime",
          "It depends on your plan, so we'll confirm that in onboarding"
        ],
        "answer": 1,
        "why": "The old system runs until the conversion date. That answers the fear of a gap."
      },
      "points": [
        {
          "label": "Current system keeps running",
          "text": "The studio keeps running on its current system while Momence is built."
        },
        {
          "label": "Clients book as usual",
          "text": "Clients book and pay there as usual."
        },
        {
          "label": "Set a conversion date",
          "text": "Once the setup is ready, the studio sets a conversion date with onboarding."
        },
        {
          "label": "Final data pull",
          "text": "The team pulls the latest data at the switch, checks it with the owner, and the studio moves over."
        },
        {
          "label": "No double booking",
          "text": "That way nobody books in two systems at once."
        }
      ],
      "voice": [
        {
          "text": "She described how she pictures it: meetings with an onboarding person during her admin time, building up to a set date, then a quick switch so clients and teachers never use two systems at once.",
          "source": "Core Fluency Pilates demo",
          "clip": {
            "src": "/content/videos/ja4-4-voice.mp4",
            "seconds": 50
          }
        }
      ]
    },
    {
      "title": "Plan around the renewal",
      "why": "A switch timed to the current contract avoids a rushed launch and paying for two systems longer than needed.",
      "idea": "Ask when the current contract renews or ends, early in discovery. Then plan backwards from it: sign, build during the time left, and set the conversion date before the renewal. If the owner doesn't know the date, make checking it a next step. The sign-up offer is usually the first month free, depending on that month's promotion. Near year end there's usually no free month if the first bill lands after January 1. Anything beyond that offer, like extra free months to cover the overlap, goes to your manager before you offer it.",
      "say": "“When does your current contract renew? Let's work backwards from that so you're live on Momence before it does.”",
      "good": [
        {
          "text": "Five minutes in, the AE confirmed her MindBody contract renewed in November. Later he used that date to plan building Momence before the renewal, then switching.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja4-5-good.mp4",
            "seconds": 50
          }
        }
      ],
      "missed": [
        {
          "text": "Whether she was still under a MindBody contract came up at minute 55 of a 66-minute call. With no end date, the switch couldn't be planned on the call.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja4-5-missed.mp4",
            "seconds": 90
          }
        }
      ],
      "check": {
        "prompt": "When should you find out the prospect's current contract renewal date?",
        "options": [
          "After pricing, once you know which plan they want to sign up for",
          "At signing, so onboarding can work out the switch date from there",
          "Only if the prospect brings up their contract as an objection",
          "In discovery, so you can plan the switch backwards from that date"
        ],
        "answer": 3,
        "why": "Knowing the date early lets you plan the build and the switch, and gives the close a real deadline."
      },
      "points": [
        {
          "label": "Ask about contract renewal",
          "text": "Ask when the current contract renews or ends, early in discovery."
        },
        {
          "label": "Plan backwards",
          "text": "Then plan backwards from it: sign, build during the time left, and set the conversion date before the renewal."
        },
        {
          "label": "Check the date next",
          "text": "If the owner doesn't know the date, make checking it a next step."
        },
        {
          "label": "Sign-up offer",
          "text": "The sign-up offer is usually the first month free, depending on that month's promotion. Near year end there's usually no free month if the first bill lands after January 1."
        },
        {
          "label": "Overlap offers need approval",
          "text": "Anything beyond that offer, like extra free months to cover the overlap, goes to your manager before you offer it."
        }
      ],
      "voice": [
        {
          "text": "She's been with MindBody since 2017 and doesn't remember signing a contract. She'll find out when it ends, then email to pick a start date.",
          "source": "Core Fluency Pilates demo",
          "clip": {
            "src": "/content/videos/ja4-5-voice.mp4",
            "seconds": 58
          }
        },
        {
          "text": "She said MindBody is hard to get off and she's not sure whether she's under contract, because she can't remember what she signed up for.",
          "source": "Hansing's School of Dance demo",
          "clip": {
            "src": "/content/videos/ja4-5-voice-b.mp4",
            "seconds": 36
          }
        }
      ]
    },
    {
      "title": "Set expectations",
      "why": "AEs have quoted onboarding differently from demo to demo. A promise you can't keep is what the owner remembers.",
      "idea": "Demos have given different numbers of onboarding calls, weeks and owner hours. Those are being confirmed, so don't quote one as fact. Tell the owner what's certain: a specialist works with them, Momence's team moves the data, and the pace depends mostly on how much time they give the build. Tie the plan to their launch or renewal date. When you don't know something, say onboarding will confirm it and follow up.",
      "say": "“How fast it goes depends mostly on how much time you can give it. Your specialist will map the plan to your launch date.”",
      "good": [
        {
          "text": "Asked if inactive clients could be pulled from her WellnessLiving data, the AE said she wasn't sure what WellnessLiving's export includes. A few minutes later she messaged the onboarding team to find out.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja4-6-good.mp4",
            "seconds": 50
          }
        }
      ],
      "missed": [
        {
          "text": "Asked how long onboarding takes, the AE gave firm week ranges. Other AEs have quoted different ranges, and the timeline isn't confirmed.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja4-6-missed.mp4",
            "seconds": 45
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Exactly how many onboarding calls will I get?” What's the best response?",
        "options": [
          "Explain how onboarding works, and that onboarding confirms the plan",
          "Give the number you heard on another AE's call so she has one",
          "Promise as many calls as she needs so the question goes away",
          "Tell her it's in the contract and you'll send it over after"
        ],
        "answer": 0,
        "why": "The number isn't confirmed. Explain how it works, flag what onboarding confirms, and move on."
      },
      "points": [
        {
          "label": "Demo numbers vary",
          "text": "Demos have given different numbers of onboarding calls, weeks and owner hours."
        },
        {
          "label": "Don't quote as fact",
          "text": "Those are being confirmed, so don't quote one as fact."
        },
        {
          "label": "Tell what's certain",
          "text": "Tell the owner what's certain: a specialist works with them, Momence's team moves the data, and the pace depends mostly on how much time they give the build."
        },
        {
          "label": "Tie to their date",
          "text": "Tie the plan to their launch or renewal date."
        },
        {
          "label": "Onboarding will confirm",
          "text": "When you don't know something, say onboarding will confirm it and follow up."
        }
      ],
      "voice": [
        {
          "text": "She has a first pop-up event about six weeks out and no ticketing system yet. She said she doesn't know how long onboarding takes.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja4-6-voice.mp4",
            "seconds": 56
          }
        }
      ]
    },
    {
      "title": "Migration fear",
      "why": "Fear of losing members, data or cards was the most common objection in our demos.",
      "idea": "Ask what happened last time, or what they're most afraid of losing. Then answer early and specifically: Momence's team moves the data, the old system runs until the switch, and the owner builds with a specialist. Momence's team moves about 25 MindBody studios a week, about 100 a month. Be honest about what isn't guaranteed, like stored cards. Don't calm the fear by knocking the old vendor. Specifics do more.",
      "say": "“What are you most worried about losing? Let me walk you through exactly what happens to it.”",
      "good": [
        {
          "text": "He'd lost members in a past switch to MindBody. The AE answered early and specifically: Momence's team pulls the client file, creates each client's account and matches remaining credits.",
          "source": "Massage Kingdom Spa demo"
        },
        {
          "text": "The owner had been burned by a past switch. Before any timeline talk, the AE offered to introduce the onboarding manager before she commits. The product rep then laid out the plan: build one location, copy it to the rest, and clients just reset their password.",
          "source": "ReformX Pilates, first call (Australian franchise)",
          "clip": {
            "src": "/content/videos/ja4-7-good-b.mp4",
            "seconds": 98
          }
        },
        {
          "text": "Asked what the rollout “truly” looks like, the AE got specific. The owner keeps Arketa running while she builds in Momence. Then they set a conversion date, Momence's team pulls the reports and the data comes over in a day or two, and they check it together.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja4-7-good-a1.mp4",
            "seconds": 85
          }
        }
      ],
      "missed": [
        {
          "text": "Asked if cards would come over, the AEs answered honestly and added comments about WellnessLiving: “they'll try to do anything to get you to not switch” and “not the best people to work with.” Keep the answer on what the owner can check: the card-export file, its fee, and what happens if some cards don't come over.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja4-7-missed.mp4",
            "seconds": 54
          }
        }
      ],
      "check": {
        "prompt": "A spa owner says, “Last time we switched, we lost members.” What do you do first?",
        "options": [
          "Reassure him nothing like that can ever happen with Momence",
          "Ask what went wrong, then answer that part with specifics",
          "Say the old provider caused it and Momence works differently",
          "Move on to pricing so the worry doesn't take over the call"
        ],
        "answer": 1,
        "why": "Find the exact fear, then answer it with what's certain. Blanket reassurance sounds like a sales line."
      },
      "points": [
        {
          "label": "Ask about their fear",
          "text": "Ask what happened last time, or what they're most afraid of losing."
        },
        {
          "label": "Answer specifically",
          "text": "Then answer early and specifically: Momence's team moves the data, the old system runs until the switch, and the owner builds with a specialist."
        },
        {
          "label": "Use the numbers",
          "text": "Momence's team moves about 25 MindBody studios a week, about 100 a month."
        },
        {
          "label": "Be honest on cards",
          "text": "Be honest about what isn't guaranteed, like stored cards."
        },
        {
          "label": "Don't knock the vendor",
          "text": "Don't calm the fear by knocking the old vendor."
        },
        {
          "label": "Specifics do more",
          "text": "Specifics do more."
        }
      ],
      "voice": [
        {
          "text": "After listing what MindBody makes hard, she said what scares her most is a cumbersome switch: she's busy, and some of her clients are older and will face a learning curve.",
          "source": "Core Fluency Pilates demo",
          "clip": {
            "src": "/content/videos/ja4-7-voice.mp4",
            "seconds": 88
          }
        }
      ]
    },
    {
      "title": "Past bad onboarding",
      "why": "Owners who've had a bad onboarding expect the same again. Their story tells you what to do differently.",
      "idea": "Many prospects come from a rough setup. One sat through 12 MindBody Zoom calls, the last six repetitive, and still tracked leads on Post-its. Ask what went wrong, then show how Momence's onboarding answers that problem: the owner builds their own memberships and classes with a specialist, and the account has an onboarding checklist. Use what they tell you to shape the plan. Don't let the story pass with a quick “sorry to hear that.”",
      "say": "“You mentioned onboarding was rough last time. What would you want to be different this time?”",
      "good": [
        {
          "text": "The AE had read the SDR's note and asked about onboarding first. She described 12 MindBody Zoom calls, the last six repetitive, and leads tracked on Post-its.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja4-8-good.mp4",
            "seconds": 100
          }
        }
      ],
      "missed": [
        {
          "text": "At the end of the call, the prospect said her MindBody setup went so badly she had to do it again. The AE said she was sorry to hear it and wrapped up.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja4-8-missed.mp4",
            "seconds": 45
          }
        }
      ],
      "check": {
        "prompt": "A prospect says her last onboarding was a string of repetitive calls. What's the best move?",
        "options": [
          "Promise this one will be shorter and need fewer calls overall",
          "Say Momence is simpler, so onboarding won't be a problem here",
          "Ask what went wrong and tie your onboarding answer to that",
          "Note it for the onboarding team and keep going with the demo"
        ],
        "answer": 2,
        "why": "Her story is discovery. Use it to show what she'll do and how it's different."
      },
      "points": [
        {
          "label": "Rough past setups",
          "text": "Many prospects come from a rough setup."
        },
        {
          "label": "12 MindBody calls",
          "text": "One sat through 12 MindBody Zoom calls, the last six repetitive, and still tracked leads on Post-its."
        },
        {
          "label": "Show how onboarding helps",
          "text": "Ask what went wrong, then show how Momence's onboarding answers that problem: the owner builds their own memberships and classes with a specialist, and the account has an onboarding checklist."
        },
        {
          "label": "Shape the plan",
          "text": "Use what they tell you to shape the plan."
        },
        {
          "label": "Don't brush it off",
          "text": "Don't let the story pass with a quick “sorry to hear that.”"
        }
      ],
      "voice": [
        {
          "text": "The franchise team said their move to Hapana about two years ago wasn't smooth. They don't want to keep moving clients from company to company, and the next switch can't affect clients.",
          "source": "ReformX Pilates, second call (Australian franchise)",
          "clip": {
            "src": "/content/videos/ja4-8-voice.mp4",
            "seconds": 42
          }
        },
        {
          "text": "Months after onboarding, she said they still call MindBody about once a day, and it usually ends with support remoting into their computer to do the task or show them.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja4-8-voice-b.mp4",
            "seconds": 42
          }
        }
      ]
    }
  ],
  "sections": []
};
