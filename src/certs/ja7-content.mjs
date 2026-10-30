// JAE7 · AI Agent — step-by-step training content (Junior AE track).
// Built from the Junior AE Knowledge Bank; unconfirmed numbers are held back until the co-manager answers.

export const JA7_TRAINING = {
  "title": "AI Agent",
  "summary": "What Momence's AI agent does, how owners set it up and control it, and how to talk about it honestly, including cost pushback and questions you can't answer yet. AI pricing and trial terms are still being confirmed, so this cert teaches how to handle them, not the numbers. About 12 minutes.",
  "format": "steps",
  "minutes": 12,
  "quizNote": "10 scenario questions from real demo moments. You need 80% to pass.",
  "steps": [
    {
      "title": "What the support agent does",
      "why": "Owners ask \"is it just a chatbot?\" You need to say exactly what it handles, in one breath.",
      "idea": "The support agent works inside the all-in-one inbox. It answers clients by text, email and web chat. It can book, cancel following the studio's own cancellation policy, freeze memberships, handle payments and refunds, manage waitlists, and escalate to staff. Anything it can't handle, like \"is class cancelled because of the weather?\", goes to a team member.",
      "say": "\"It answers your texts, emails and web chat, and it can actually book, cancel by your policy, freeze a membership or move someone off the waitlist.\"",
      "good": [
        {
          "text": "The AE moved from the inbox straight into the agent: most member messages are about rebooking and cancelling, and the agent handles them within policy. She listed its actions on screen and gave a clear example of what it escalates.",
          "source": "Her Zen Studio demo",
          "clip": {
            "src": "/content/videos/ja7-1-good.mp4",
            "seconds": 108
          }
        },
        {
          "text": "Asked whether she needed the AI to run her marketing, the AE separated the two clearly: marketing automations follow triggers you set, like an abandoned checkout. The AI agent handles the stream of inbound questions, like rescheduling, parking and freezes.",
          "source": "Comova, first call",
          "clip": {
            "src": "/content/videos/ja7-1-good-b.mp4",
            "seconds": 100
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect asked about an AI chat on the website. The AE said \"we don't have one of those.\" On the next call, a teammate showed web chat landing in the inbox, where the agent can answer it.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja7-1-missed.mp4",
            "seconds": 85
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, \"Can your AI do anything, or does it just answer FAQs?\" What's the most accurate answer?",
        "options": [
          "It answers common questions and sends anything harder to your staff",
          "It answers and acts: books, cancels by policy, freezes, escalates",
          "It answers FAQs on your website chat, and sequences do the rest",
          "It can do whatever your front desk does, with no setup required"
        ],
        "answer": 1,
        "why": "The difference is that it takes actions in the account, not only answers. And it follows the studio's own policies."
      },
      "points": [
        {
          "label": "Agent in inbox",
          "text": "The support agent works inside the all-in-one inbox."
        },
        {
          "label": "Answers across channels",
          "text": "It answers clients by text, email and web chat."
        },
        {
          "label": "Actions it takes",
          "text": "It can book, cancel following the studio's own cancellation policy, freeze memberships, handle payments and refunds, manage waitlists, and escalate to staff."
        },
        {
          "label": "Hands off to staff",
          "text": "Anything it can't handle, like \"is class cancelled because of the weather?\", goes to a team member."
        }
      ]
    },
    {
      "title": "Switches and escalation",
      "why": "Owners who are nervous about AI relax once they see they control what it does.",
      "idea": "Each request type is its own switch: bookings, cancellations, freezes and so on. The owner turns on only what they want the agent to handle. They also choose what always goes to a person, for example a question about a high-value membership the owner wants to close herself. Escalated conversations land in the inbox and staff get notified.",
      "say": "\"You decide what it handles. Turn on bookings and freezes, and send anything about your premium memberships straight to you.\"",
      "good": [
        {
          "text": "The AE showed the request types toggled on and off, then walked one booking text and one freeze text through to done. She finished with how the owner picks what escalates to her instead.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja7-2-good.mp4",
            "seconds": 95
          }
        }
      ],
      "missed": [
        {
          "text": "Asked if the AI follows up toward a sale, the AE said \"I think so. I think it can do pretty much everything.\" Showing the switches and what each one does would have been a precise answer.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja7-2-missed.mp4",
            "seconds": 88
          }
        }
      ],
      "check": {
        "prompt": "An owner says, \"I don't want a robot cancelling memberships.\" What do you show her?",
        "options": [
          "The agent's results screen with how much staff time it has saved",
          "The policy settings, since it always applies your cancel rules",
          "A sequence that follows up with people after they have cancelled",
          "The request-type switches, with cancellations turned off for her"
        ],
        "answer": 3,
        "why": "Each request type can be switched off. Show her the control, then let her decide what it handles."
      },
      "points": [
        {
          "label": "Request type switches",
          "text": "Each request type is its own switch: bookings, cancellations, freezes and so on."
        },
        {
          "label": "Owner picks tasks",
          "text": "The owner turns on only what they want the agent to handle."
        },
        {
          "label": "Always to a person",
          "text": "They also choose what always goes to a person, for example a question about a high-value membership the owner wants to close herself."
        },
        {
          "label": "Escalation notifications",
          "text": "Escalated conversations land in the inbox and staff get notified."
        }
      ]
    },
    {
      "title": "Setting it up",
      "why": "The agent is only as good as what it knows. Owners want to know how much work that is.",
      "idea": "In AI customization the owner sets the agent's name, brand voice (direct and professional, friendly, playful), response length (concise, standard or detailed), response style and example messages. A setup score reads the account and says what's missing, such as fuller membership descriptions, and moves from average to high as the gaps are filled. Onboarding walks through this setup with the owner.",
      "say": "\"You pick how it sounds and how much it says. The setup score tells you exactly what to add so it answers correctly.\"",
      "good": [
        {
          "text": "The AE walked the settings: what the agent should know (cancellation, membership and freeze policies), brand voice, how detailed answers should be, and which questions should go to a human.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja7-3-good.mp4",
            "seconds": 105
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect asked if clients are told they're talking to an AI. The AE answered \"I think you can decide… I do believe… I think it introduces themselves.\" A clean \"let me confirm that for you\" would have kept her trust.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja7-3-missed.mp4",
            "seconds": 50
          }
        }
      ],
      "check": {
        "prompt": "The agent's setup score says \"average.\" What does that tell the owner?",
        "options": [
          "Some information is missing, like fuller membership descriptions",
          "The agent has been switched on for only some of the request types",
          "Clients have given the agent's answers an average rating so far",
          "The agent hasn't run long enough to learn from the staff's replies"
        ],
        "answer": 0,
        "why": "The score reads the account and points to what's missing. Filling it in moves it toward a high setup."
      },
      "points": [
        {
          "label": "Name, voice and length",
          "text": "In AI customization the owner sets the agent's name, brand voice (direct and professional, friendly, playful), response length (concise, standard or detailed), response style and example messages."
        },
        {
          "label": "Setup score",
          "text": "A setup score reads the account and says what's missing, such as fuller membership descriptions, and moves from average to high as the gaps are filled."
        },
        {
          "label": "Onboarding helps setup",
          "text": "Onboarding walks through this setup with the owner."
        }
      ]
    },
    {
      "title": "Sales agent and sequences",
      "why": "The sales side is where the agent brings in new revenue, and it depends on how the sequences are written.",
      "idea": "The sales agent works leads through sequences. The owner sets a follow-up tone (gentle reminder, encouraging push or high urgency), and the screen tracks leads contacted and revenue. It works best when sequence messages end in a question. When a lead replies, the conversation opens in the inbox and the agent takes it from there. A pre-purchase sequence can stop as soon as the lead buys any membership or pack.",
      "say": "\"End your intro messages with a question. When they reply, the agent picks up the conversation and books them.\"",
      "good": [
        {
          "text": "The AE opened a live studio's pre-purchase sequence and pointed out that its texts end in a question. Replies land in the inbox, and the agent takes over the conversation.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja7-4-good.mp4",
            "seconds": 94
          }
        }
      ],
      "missed": [
        {
          "text": "On the sales agent screen, the AE pointed to one studio's 30-day revenue and said it had \"almost paid for itself.\" That figure isn't verified, so the point rested on a number reps can't stand behind.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja7-4-missed.mp4",
            "seconds": 100
          }
        }
      ],
      "check": {
        "prompt": "A studio's lead sequence gets few replies, so the sales agent rarely steps in. What change helps most?",
        "options": [
          "Set the follow-up tone to high urgency for every lead in the list",
          "Add more steps so each lead gets more messages before it stops",
          "Rewrite the messages so each one ends with a question to answer",
          "Send the whole sequence by email instead of by text message"
        ],
        "answer": 2,
        "why": "The agent works conversations. A message that ends in a question invites the reply that hands the lead to it."
      },
      "points": [
        {
          "label": "Sales agent and sequences",
          "text": "The sales agent works leads through sequences."
        },
        {
          "label": "Follow-up tone",
          "text": "The owner sets a follow-up tone (gentle reminder, encouraging push or high urgency), and the screen tracks leads contacted and revenue."
        },
        {
          "label": "End with a question",
          "text": "It works best when sequence messages end in a question."
        },
        {
          "label": "Replies open in inbox",
          "text": "When a lead replies, the conversation opens in the inbox and the agent takes it from there."
        },
        {
          "label": "Stop on purchase",
          "text": "A pre-purchase sequence can stop as soon as the lead buys any membership or pack."
        }
      ]
    },
    {
      "title": "When AI is the reason",
      "why": "For some prospects, the AI is the reason they took the call. Learn what job they want it to do before you demo it.",
      "idea": "Ask what they want the AI to handle: after-hours messages, a busy front desk, lead follow-up, or something else. Ask what they pay today across every tool doing that job. Then demo the agent against their answer. Momence's AI is customer-facing. If the job they describe is something else, like reporting, find that out early and say so plainly.",
      "say": "\"When you picture the AI working for you, what's it doing? Answering after hours, booking, chasing leads?\"",
      "good": [
        {
          "text": "A day spa owner said she'd switch if Boulevard didn't add an AI chatbot. The AE asked what she paid across Boulevard and Podium, then showed the agent's setup, custom instructions and escalation to staff, all tied to booking in one inbox.",
          "source": "Purity Day Spa demo"
        }
      ],
      "missed": [
        {
          "text": "The AI the prospect valued most was Arketa's natural-language reporting. Nobody asked what she wanted AI for, so it surfaced an hour in, after the agent had been demoed.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja7-5-missed.mp4",
            "seconds": 40
          }
        }
      ],
      "check": {
        "prompt": "A prospect opens with, \"Honestly, I'm here for the AI.\" What's your best first move?",
        "options": [
          "Show the agent's setup screen right away while her interest is high",
          "Ask what she wants the AI to handle and what that costs her today",
          "Offer a trial of the agent so she can test it in her own business",
          "Explain how our AI compares to the AI in her current software"
        ],
        "answer": 1,
        "why": "The job she wants done decides what you show. Her current spend gives you the comparison later."
      },
      "points": [
        {
          "label": "Ask what AI handles",
          "text": "Ask what they want the AI to handle: after-hours messages, a busy front desk, lead follow-up, or something else."
        },
        {
          "label": "Ask current spend",
          "text": "Ask what they pay today across every tool doing that job."
        },
        {
          "label": "Demo against answer",
          "text": "Then demo the agent against their answer."
        },
        {
          "label": "AI is customer-facing",
          "text": "Momence's AI is customer-facing."
        },
        {
          "label": "Flag mismatches early",
          "text": "If the job they describe is something else, like reporting, find that out early and say so plainly."
        }
      ]
    },
    {
      "title": "Describing it honestly",
      "why": "Prospects have seen a lot of AI claims. One overreach and they doubt the rest of the demo.",
      "idea": "Describe what it does and how the owner controls it: it answers and takes actions in the inbox, within the permissions and policies they set. Don't knock a competitor's AI as \"not really AI\". Don't quote time-saved or revenue figures from other studios, because they aren't verified. If they ask about AI reporting or analytics, say what's true today: the agent is customer-facing.",
      "say": "\"It answers and takes actions in your inbox, within the permissions you give it. You can watch every conversation.\"",
      "good": [
        {
          "text": "In one clear line the AE said what sets it apart: it can take actions, like booking a class with the client's credit or freezing an account, depending on the permissions the studio gives it.",
          "source": "Rabbithole demo",
          "clip": {
            "src": "/content/videos/ja7-6-good.mp4",
            "seconds": 85
          }
        }
      ],
      "missed": [
        {
          "text": "The prospect's current software has an AI web chat. The AE called it \"not really AI\". That's an unverified claim about a competitor, and the prospect had already seen it work.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja7-6-missed.mp4",
            "seconds": 95
          }
        }
      ],
      "check": {
        "prompt": "Which line describes the agent most accurately on a demo?",
        "options": [
          "\"It replaces your front desk and never gets a single answer wrong.\"",
          "\"Unlike other tools, ours is real AI and not a simple FAQ chatbot.\"",
          "\"It learns your business and runs your reporting and KPIs for you.\"",
          "\"It answers and takes actions in your inbox, within your settings.\""
        ],
        "answer": 3,
        "why": "The others overpromise, knock competitors, or claim reporting the agent doesn't do."
      },
      "points": [
        {
          "label": "Describe owner control",
          "text": "Describe what it does and how the owner controls it: it answers and takes actions in the inbox, within the permissions and policies they set."
        },
        {
          "label": "Don't knock competitor AI",
          "text": "Don't knock a competitor's AI as \"not really AI\"."
        },
        {
          "label": "No unverified figures",
          "text": "Don't quote time-saved or revenue figures from other studios, because they aren't verified."
        },
        {
          "label": "Answer reporting questions",
          "text": "If they ask about AI reporting or analytics, say what's true today: the agent is customer-facing."
        }
      ]
    },
    {
      "title": "Cost pushback: sequences first",
      "why": "When AI tips the price over budget, pushing harder loses the deal. A sequence-first path keeps it.",
      "idea": "If a prospect balks at the cost, don't lead with the AI. Get the sequences running first. That's where follow-up starts paying off, and it's the base the agent works on, since replies to sequences are what it picks up. Add the AI once they see results. The AI's price and any trial terms are being confirmed, so quote from the pricing calculator or check with your manager. Don't give away the AI before you know the prospect's core need.",
      "say": "\"If cost is the worry, start with your sequences. Once you see replies coming in, the AI is the next step.\"",
      "good": [
        {
          "text": "The prospect asked \"who are these rich people running yoga studios?\" The AE didn't push. She said to start with sequences and add the AI once they're working. (The revenue figure she quoted is unverified, so don't repeat it.)",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja7-7-good.mp4",
            "seconds": 90
          }
        }
      ],
      "missed": [
        {
          "text": "Up against a cheaper competitor, the AI was offered free for three months before the prospect's deciding need had come up. The concession came before the proof. The trial terms are still being confirmed.",
          "source": "105 Fever, third call",
          "clip": {
            "src": "/content/videos/ja7-7-missed.mp4",
            "seconds": 90
          }
        }
      ],
      "check": {
        "prompt": "A prospect on a tight budget likes the agent but winces at the total. What do you suggest?",
        "options": [
          "Keep the AI and drop the marketing suite to bring the total down",
          "Offer the AI free right away so the total fits her budget today",
          "Start with sequences and add the AI once they're bringing replies",
          "Skip both for now and revisit the marketing tools at renewal time"
        ],
        "answer": 2,
        "why": "The agent works best on top of sequences that end in a question. Sequences first is the cheaper start and the better setup."
      },
      "points": [
        {
          "label": "Don't lead with AI",
          "text": "If a prospect balks at the cost, don't lead with the AI."
        },
        {
          "label": "Sequences first",
          "text": "Get the sequences running first."
        },
        {
          "label": "Sequences feed the agent",
          "text": "That's where follow-up starts paying off, and it's the base the agent works on, since replies to sequences are what it picks up."
        },
        {
          "label": "Add AI later",
          "text": "Add the AI once they see results."
        },
        {
          "label": "Quote from calculator",
          "text": "The AI's price and any trial terms are being confirmed, so quote from the pricing calculator or check with your manager."
        },
        {
          "label": "Know the core need",
          "text": "Don't give away the AI before you know the prospect's core need."
        }
      ]
    },
    {
      "title": "Questions you can't answer",
      "why": "A guessed answer about AI price or roadmap can follow you into the contract.",
      "idea": "Price, trial terms, and roadmap items like an AI analytics dashboard or natural-language reporting are all being confirmed. Don't guess. Say what's true today, say you'll confirm the rest, and give a date for the answer. A price comes from the pricing calculator or your manager, never from memory.",
      "say": "\"I don't want to guess on that. I'll confirm it with my team and have the answer to you by Thursday.\"",
      "good": [
        {
          "text": "Asked for a timeline on AI reporting, the AE said the agent today is customer-facing, \"I'm not sure on that,\" and committed to get a clear timeline.",
          "source": "Sol Space demo",
          "clip": {
            "src": "/content/videos/ja7-8-good.mp4",
            "seconds": 76
          }
        }
      ],
      "missed": [
        {
          "text": "Asked the AI's price, the AE said \"I think the AI inbox is $200.\" It was corrected to a different figure on the next call, after the prospect had already reacted to the first number.",
          "source": "105 Fever, second call",
          "clip": {
            "src": "/content/videos/ja7-8-missed.mp4",
            "seconds": 45
          }
        }
      ],
      "check": {
        "prompt": "A prospect asks, \"When will your AI do reporting like Arketa's?\" You don't know. What do you say?",
        "options": [
          "\"Today it's customer-facing. I'll find out the timeline for you.\"",
          "\"Soon. It's on the roadmap and should be out early next year.\"",
          "\"Our AI doesn't need that, since the reports library covers it.\"",
          "\"Their reporting AI isn't as good as it looks in their demos.\""
        ],
        "answer": 0,
        "why": "Say what's true now and commit to find out. A guessed date becomes a promise."
      },
      "points": [
        {
          "label": "Items being confirmed",
          "text": "Price, trial terms, and roadmap items like an AI analytics dashboard or natural-language reporting are all being confirmed."
        },
        {
          "label": "Don't guess",
          "text": "Don't guess."
        },
        {
          "label": "Confirm with a date",
          "text": "Say what's true today, say you'll confirm the rest, and give a date for the answer."
        },
        {
          "label": "Price from calculator",
          "text": "A price comes from the pricing calculator or your manager, never from memory."
        }
      ]
    }
  ],
  "sections": []
};
