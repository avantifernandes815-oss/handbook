// JA1 · Core Product — step-by-step training content (Junior AE track).
// Built from the Junior AE Knowledge Bank; unconfirmed numbers are held back until the co-manager answers.

export const JA1_TRAINING = {
  "title": "Core Product",
  "summary": "What a Junior AE needs to demo the core platform with confidence: checkout, classes, memberships, appointments, the inbox, the CRM and the free app. One step per screen, each with a real example from our AE calls and a quick check. About 12 minutes.",
  "format": "steps",
  "minutes": 12,
  "quizNote": "10 scenario questions from real demo moments. You need 80% to pass.",
  "steps": [
    {
      "title": "One-page checkout",
      "why": "Booking is the first thing a new client touches, and it's the screen prospects compare most closely with their current system.",
      "idea": "A new client picks a class, sees memberships and packs above it, enters a few contact details, signs the waiver and pays on one page. There's no account or password to create first. Momence still builds a contact record behind the scenes, so even someone who leaves before paying is captured as an abandoned checkout. Every class and offer also has its own link, and the schedule can open Momence's checkout over the studio's site or sit embedded in the page.",
      "say": "“Let's book a drop-in the way a brand-new client would. Then we'll try the same thing on your site.”",
      "good": [
        {
          "text": "The AE booked a class on a live studio's site: drop-in price on the class, memberships up top, contact details, waiver, pay. He explained that Momence creates and updates a contact record for every booking, even when the client never makes an account.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja1-1-good.mp4",
            "seconds": 105
          }
        }
      ],
      "missed": [
        {
          "text": "Explaining why he recommends the default pop-up checkout over an embedded one, the AE told the prospect three times that 98% of clients prefer it. No source backs that number.",
          "source": "Greylock Yoga demo"
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Does a new client need an account to book a drop-in?” What's accurate?",
        "options": [
          "Yes, they set a password before they can pay for a class",
          "No. Details, waiver and payment, all on one page",
          "Only when the studio passes card fees on to its clients",
          "Only when they book on the website instead of the app"
        ],
        "answer": 1,
        "why": "No account or password is needed to book. Momence creates the contact record for the studio in the background."
      },
      "points": [
        {
          "label": "One-page checkout",
          "text": "A new client picks a class, sees memberships and packs above it, enters a few contact details, signs the waiver and pays on one page."
        },
        {
          "label": "No account needed",
          "text": "There's no account or password to create first."
        },
        {
          "label": "Abandoned checkout captured",
          "text": "Momence still builds a contact record behind the scenes, so even someone who leaves before paying is captured as an abandoned checkout."
        },
        {
          "label": "Links and embedded schedule",
          "text": "Every class and offer also has its own link, and the schedule can open Momence's checkout over the studio's site or sit embedded in the page."
        }
      ]
    },
    {
      "title": "Checkout options",
      "why": "Bring-a-friend, waivers and waitlists come up in almost every demo, and each one shows less work for the front desk.",
      "idea": "Studios write their own checkout questions for each class, and an answer like an injury can tag the client so the instructor sees it on the roster. Waivers are signed inside checkout. Clients can reserve extra spots for friends, who get their own contact record and booking email, and memberships and packs show above the class as upsells. Full classes get a waitlist that either notifies everyone, so the first to claim gets the spot, or offers it to the first person in line.",
      "say": "“If someone wants to bring a friend, they add a second spot. Your friend's details land in your client list too.”",
      "good": [
        {
          "text": "The AE showed checkout questions built for each class and explained that an injury answer tags the client on the roster. Then she reserved a second spot for a friend in the same checkout.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja1-2-good.mp4",
            "seconds": 72
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect's one deal-breaker was a parent booking herself and her children in one checkout. The AE didn't know and said she'd check. Earlier demo screens show child-account options at checkout, and how they work is still being confirmed.",
          "source": "Kaylea C. demo"
        }
      ],
      "check": {
        "prompt": "A dance studio wants each student's level and any injuries before class. What do you show?",
        "options": [
          "Checkout questions, with answers that tag the client",
          "An intake form the studio emails after each booking",
          "A note the teacher types into each profile by hand",
          "A survey sent with the newsletter after the class"
        ],
        "answer": 0,
        "why": "The studio sets its own checkout questions per class. Answers can become tags that show on the roster."
      },
      "points": [
        {
          "label": "Custom checkout questions",
          "text": "Studios write their own checkout questions for each class, and an answer like an injury can tag the client so the instructor sees it on the roster."
        },
        {
          "label": "Waivers in checkout",
          "text": "Waivers are signed inside checkout."
        },
        {
          "label": "Extra spots and upsells",
          "text": "Clients can reserve extra spots for friends, who get their own contact record and booking email, and memberships and packs show above the class as upsells."
        },
        {
          "label": "Waitlist options",
          "text": "Full classes get a waitlist that either notifies everyone, so the first to claim gets the spot, or offers it to the first person in line."
        }
      ]
    },
    {
      "title": "Roster, check-in and subs",
      "why": "Instructors and front desk staff live on the class page, so this is where owners picture their day.",
      "idea": "The roster flags who's in the room: new clients, injuries, birthdays, visit milestones, and the membership or pack each person used. Staff check people in with a toggle on a phone, or clients self check-in on an iPad up front. One click messages everyone in the class by email, text or in-app. A teacher who can't make it sends a substitute request to every instructor who can teach that class, and the first to accept takes it.",
      "say": "“How do your instructors find a sub today? Here's what that looks like in Momence.”",
      "good": [
        {
          "text": "The AE checked a client in from the roster, then asked how instructors find subs today. “Our group text.” She showed a substitute request going out to every teacher who can teach that class, with the first to accept swapped in.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja1-3-good.mp4",
            "seconds": 115
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect said his priority was fast check-in at the door before class. The class page and check-in came about 20 minutes in, after other features.",
          "source": "SALSAtlanta demo"
        }
      ],
      "check": {
        "prompt": "A teacher calls in sick an hour before class. What does a substitute request do?",
        "options": [
          "Lets the owner pick a sub from a list and assign them",
          "Posts the class to the community page for all to see",
          "Cancels the class and messages everyone on the roster",
          "Alerts teachers who can teach it; first to accept wins"
        ],
        "answer": 3,
        "why": "The request goes to every instructor who can teach that class. Whoever accepts first replaces the original teacher automatically."
      },
      "points": [
        {
          "label": "Roster flags",
          "text": "The roster flags who's in the room: new clients, injuries, birthdays, visit milestones, and the membership or pack each person used."
        },
        {
          "label": "Phone or iPad check-in",
          "text": "Staff check people in with a toggle on a phone, or clients self check-in on an iPad up front."
        },
        {
          "label": "Message the class",
          "text": "One click messages everyone in the class by email, text or in-app."
        },
        {
          "label": "Substitute requests",
          "text": "A teacher who can't make it sends a substitute request to every instructor who can teach that class, and the first to accept takes it."
        }
      ]
    },
    {
      "title": "Memberships and packs",
      "why": "Most studios run on memberships and packs, and the settings answer questions owners assume only their current system can handle.",
      "idea": "A membership can activate on first use, with a deadline so it starts on its own if the client never comes in. That's how pre-open studios sell founding memberships. You choose which classes and appointments it covers, set usage limits, include guest passes and tag buyers automatically. Packs can auto-refill when the last credit is used, and price rules give a tagged group, like members, a lower price.",
      "say": "“You can sell founding memberships now and have each one start on that client's first class.”",
      "good": [
        {
          "text": "Setting the prospect up for her trial, the AE built a membership live: a fixed price, a length, and the choice to activate it on first use.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja1-4-good.mp4",
            "seconds": 68
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect described a Walla intro offer she bought with a start date and then couldn't pre-book. The AE said “that's good to know” and moved on. Momence's activation settings never came up in the call.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja1-4-missed.mp4",
            "seconds": 55
          }
        }
      ],
      "check": {
        "prompt": "An owner wants unlimited members to bring two friends a month for free. Where do you set that up?",
        "options": [
          "A referral program in the marketing suite",
          "A price rule on a friends-and-family tag",
          "Guest passes in the membership settings",
          "A promo code each member shares by text"
        ],
        "answer": 2,
        "why": "Guest passes live on the membership. Members use them when they book, with no call to the studio."
      },
      "points": [
        {
          "label": "Activate on first use",
          "text": "A membership can activate on first use, with a deadline so it starts on its own if the client never comes in."
        },
        {
          "label": "Founding memberships",
          "text": "That's how pre-open studios sell founding memberships."
        },
        {
          "label": "Coverage and usage limits",
          "text": "You choose which classes and appointments it covers, set usage limits, include guest passes and tag buyers automatically."
        },
        {
          "label": "Auto-refill and price rules",
          "text": "Packs can auto-refill when the last credit is used, and price rules give a tagged group, like members, a lower price."
        }
      ]
    },
    {
      "title": "Appointments and multi-service",
      "why": "Privates, massage and other services come up even at class studios, and owners with both often run two systems today.",
      "idea": "Clients pick a service, add-ons that can add time or money, a practitioner or “any,” then a time, and the studio chooses whether time or practitioner comes first. A card on file can hold the booking, with payment taken at the visit. Staff see the day by practitioner or by room (called venues) and can book for someone who calls. A multi-service checkout books several services back to back and blocks each room.",
      "say": "“Your massage therapist and your classes can run in one system, with one client history.”",
      "good": [
        {
          "text": "The prospect said she couldn't get her chiropractor and massage bookings working in her current system. The AE showed a studio that runs both: a massage with an add-on, any practitioner, an open time, then the back-end view by practitioner or venue.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja1-5-good.mp4",
            "seconds": 115
          }
        }
      ],
      "missed": [
        {
          "text": "With more providers than rooms on weekends, the spa owner asked whether rooms could block and be prioritized. The AE couldn't say and committed to confirm. He didn't overpromise, but it's the kind of question to know before a spa demo. The answer is still being confirmed.",
          "source": "Purity Day Spa demo"
        }
      ],
      "check": {
        "prompt": "A spa owner asks if a client can book a massage and a facial in one go. What's accurate?",
        "options": [
          "Yes, as long as one practitioner does both",
          "Yes, back to back in one checkout, rooms blocked",
          "No, each service needs its own separate checkout",
          "Yes, but staff assign the rooms by hand later"
        ],
        "answer": 1,
        "why": "Multi-service checkout books the services back to back in the order the client picks and blocks each room."
      },
      "points": [
        {
          "label": "Appointment booking flow",
          "text": "Clients pick a service, add-ons that can add time or money, a practitioner or “any,” then a time, and the studio chooses whether time or practitioner comes first."
        },
        {
          "label": "Card holds the booking",
          "text": "A card on file can hold the booking, with payment taken at the visit."
        },
        {
          "label": "Practitioner or room view",
          "text": "Staff see the day by practitioner or by room (called venues) and can book for someone who calls."
        },
        {
          "label": "Multi-service checkout",
          "text": "A multi-service checkout books several services back to back and blocks each room."
        }
      ]
    },
    {
      "title": "Inbox and local number",
      "why": "Owners juggle texts, emails and calls in different places, and one inbox is a fast, visible win.",
      "idea": "Email, text, calls and in-app messages from one client sit in one thread. Momence gives the studio a local number for two-way texts and calls; voicemails are transcribed, and the number can forward to an existing line. A side panel shows the client's memberships, last and next visit, and tags while you reply. Text and call allowances are being confirmed, so don't quote a number yet.",
      "say": "“When a client texts and then emails about the same booking, you'll see both in one thread, with her membership right beside it.”",
      "good": [
        {
          "text": "The AE showed one thread mixing email and text, the local number, a transcribed voicemail and call-back, and forwarding to an existing line. Then she opened the side panel with the client's memberships, visits and tags.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja1-6-good.mp4",
            "seconds": 110
          }
        }
      ],
      "missed": [
        {
          "text": "Asked whether texts cost extra, the AE quoted exact monthly text and calling allowances. Those allowances are described differently across demos and are still being confirmed, so a number said on a call may not hold.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja1-6-missed.mp4",
            "seconds": 78
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, “Will clients be texting my personal cell?” What do you tell her?",
        "options": [
          "Yes, Momence routes texts to the owner's own mobile",
          "Texts arrive as emails, so clients have no number",
          "Only if she buys a separate business phone service",
          "No, the studio gets a local number for texts"
        ],
        "answer": 3,
        "why": "Momence supplies a local number. Texts and calls come into the inbox, and calls can forward to another line."
      },
      "points": [
        {
          "label": "One thread per client",
          "text": "Email, text, calls and in-app messages from one client sit in one thread."
        },
        {
          "label": "Local number for texts",
          "text": "Momence gives the studio a local number for two-way texts and calls; voicemails are transcribed, and the number can forward to an existing line."
        },
        {
          "label": "Client side panel",
          "text": "A side panel shows the client's memberships, last and next visit, and tags while you reply."
        },
        {
          "label": "Don't quote allowances",
          "text": "Text and call allowances are being confirmed, so don't quote a number yet."
        }
      ]
    },
    {
      "title": "CRM, segments and reports",
      "why": "Owners want to know who to reach and whether it's working. This is where their data turns into bookings.",
      "idea": "Every booking, lead and purchase builds a client profile. Tags come from purchases, checkout answers or staff, and segments filter the list by things like recent visits or class type. You can send a drag-and-drop newsletter, a text or an in-app message to any segment. The dashboard is customizable by role, and reports go down to staff pay, which is paid outside Momence.",
      "say": "“Let's find everyone who's been in twice in the last 120 days and invite them to your workshop.”",
      "good": [
        {
          "text": "The AE opened a report straight from the dashboard, then a funnel of intro-offer buyers. She showed how to segment the ones who didn't buy a membership and message them by text, email or in-app.",
          "source": "105 Fever, first call",
          "clip": {
            "src": "/content/videos/ja1-7-good.mp4",
            "seconds": 108
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect said Arketa's natural-language reporting was what kept her there. After showing one report, the AE said it's on the roadmap with no date. Roadmap answers need confirming before you give them.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja1-7-missed.mp4",
            "seconds": 82
          }
        }
      ],
      "check": {
        "prompt": "Which of these can tag a client automatically?",
        "options": [
          "A purchase or an answer at checkout",
          "Only staff adding the tag by hand",
          "Only the client, from the free app",
          "Only an import from the old system"
        ],
        "answer": 0,
        "why": "Tags can be added by hand, but purchases and checkout answers add them automatically."
      },
      "points": [
        {
          "label": "Client profiles",
          "text": "Every booking, lead and purchase builds a client profile."
        },
        {
          "label": "Tags and segments",
          "text": "Tags come from purchases, checkout answers or staff, and segments filter the list by things like recent visits or class type."
        },
        {
          "label": "Send to any segment",
          "text": "You can send a drag-and-drop newsletter, a text or an in-app message to any segment."
        },
        {
          "label": "Dashboard and reports",
          "text": "The dashboard is customizable by role, and reports go down to staff pay, which is paid outside Momence."
        }
      ]
    },
    {
      "title": "The free Momence app",
      "why": "Prospects ask whether clients will see other studios, and whether they need to pay for an app at all.",
      "idea": "Every plan includes the free Momence app, and clients see only the studios their email is linked to. It isn't a marketplace, so no other studio can advertise to them. Clients book, manage passes, buy retail and gift cards, message the studio and get its push notifications. For staff, Momence is mobile-first: they add it to their phone's home screen to check people in.",
      "say": "“Your clients only see your studio in the app. Nobody else can market to them there.”",
      "good": [
        {
          "text": "The prospect asked if other studios show up in the free app. The AE explained that clients see the studios their email is linked to, and that it isn't a marketplace where others advertise.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja1-8-good.mp4",
            "seconds": 77
          }
        }
      ],
      "missed": [
        {
          "text": "Asked about a business app for staff, the AE said a native one is coming “within the next couple of months” at no extra cost. That's an unconfirmed roadmap promise. What exists today is Momence running on staff phones from the home screen.",
          "source": "Alli F. demo",
          "clip": {
            "src": "/content/videos/ja1-8-missed.mp4",
            "seconds": 80
          }
        }
      ],
      "check": {
        "prompt": "A front desk worker asks how staff check people in from a phone. What's accurate today?",
        "options": [
          "Staff use the free client app to check people in",
          "Staff need the branded app to work from a phone",
          "Add Momence to the phone's home screen and use it",
          "Check-in only works from the front desk computer"
        ],
        "answer": 2,
        "why": "Momence is mobile-first. Staff add it to the home screen and check people in from the class page."
      },
      "points": [
        {
          "label": "Free Momence app",
          "text": "Every plan includes the free Momence app, and clients see only the studios their email is linked to."
        },
        {
          "label": "Not a marketplace",
          "text": "It isn't a marketplace, so no other studio can advertise to them."
        },
        {
          "label": "What clients can do",
          "text": "Clients book, manage passes, buy retail and gift cards, message the studio and get its push notifications."
        },
        {
          "label": "Mobile-first for staff",
          "text": "For staff, Momence is mobile-first: they add it to their phone's home screen to check people in."
        }
      ]
    }
  ],
  "sections": []
};
