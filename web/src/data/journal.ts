import { localSeoArticles } from "@/data/local-seo-articles";

export type JournalSection = {
  heading: string;
  body: string[];
  table?: { headers: string[]; rows: string[][] };
  links?: { href: string; label: string }[];
};

export type JournalPost = {
  slug: string;
  title: string;
  minutes: number;
  image: string;
  excerpt: string;
  intro: string;
  sections: JournalSection[];
  faq: { q: string; a: string }[];
  relatedProducts: string[];
  category?: string;
  publishedAt?: string;
  modifiedAt?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  featuredProductId?: string;
  productHighlight?: string;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "small-living-room-sofa-ideas-nairobi",
    title: "Small-space sofa ideas for Nairobi apartments",
    minutes: 6,
    image: "/images/living-l-sofa.jpeg",
    excerpt:
      "Apartments in Nairobi and Mombasa are getting smaller. Here is how to pick a sofa that still feels generous.",
    intro:
      "Most small apartments are not actually small — they are badly proportioned. The difference between a room that feels cramped and one that feels generous is almost always the depth of the sofa and the walkway you keep around it.",
    sections: [
      {
        heading: "Buy for the walkway, not the seat",
        body: [
          "The most common mistake is a sofa that fits the wall perfectly and leaves nothing behind it. You want a 90 cm primary walkway behind the sofa for people to pass, and ideally 60 cm at the front where legs go.",
          "That single rule eliminates most sofas before you fall in love with them. Measure your room, then measure the piece including its clearance, and you will avoid the disappointment of delivery day.",
        ],
      },
      {
        heading: "Depth matters more than width",
        body: [
          "A 90 cm deep sofa eats 30 cm more floor than an 80 cm one. In a 3 m room that difference decides whether you can walk past the coffee table. When you are shopping small, prioritise depth over width.",
          "Our L-shaped sofas come in 165 cm and 170 cm depths for exactly this reason — the shallower version is the one that keeps a walkway in a compact room.",
        ],
      },
      {
        heading: "Raise the legs",
        body: [
          "Furniture on slim legs reads lighter and makes a low room feel taller. It also gives you a visible gap to tuck occasional seating or a basket into, which buys storage without buying a cabinet.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the smallest room a 3-seater sofa works in?",
        a: "A 3-seater with a chaise needs roughly 3.8 x 2.5 m to keep a 90 cm walkway. In anything smaller, a straight sofa or a modular piece you can configure to your room is a better fit.",
      },
      {
        q: "Should a small sofa be light coloured?",
        a: "Light and mid tones make a room feel larger because they reflect light. Dark sofas anchor a room but visually reduce the space, so balance them with a light rug and pale walls.",
      },
    ],
    relatedProducts: ["the-cloud", "the-linen"],
  },
  {
    slug: "how-to-choose-dining-table-size",
    title: "How to choose a dining table size for your room",
    minutes: 7,
    image: "/images/6-seats-dinning.jpeg",
    excerpt:
      "Round or rectangular? How many centimetres per person? The spacing rules that make a dining table comfortable.",
    intro:
      "Choosing a dining table is not about how many guests you might host once a year. It is about how the table feels on an ordinary Tuesday evening, with the family around it, in the room you actually have.",
    sections: [
      {
        heading: "Count the space per person",
        body: [
          "Give each person 55 cm of table edge. That is enough for a plate, a glass and elbows without anyone sitting at an angle. A 170 cm table seats six comfortably; it does not seat eight.",
          "Round tables give everyone equal space and no corner seat, which makes them far better for conversation. Rectangular tables suit narrower rooms because you can seat people on the long sides.",
        ],
      },
      {
        heading: "Leave 90 cm to walk round it",
        body: [
          "You need about 90 cm between the table edge and the wall to pull a chair out and walk behind it. Below that, chairs scrape the wall and servers cannot pass.",
          "Add a 60 cm chair pull-out zone in front of each seating position. If that pushes the room past its walls, the honest answer is to go down a size.",
        ],
      },
      {
        heading: "Measure the room, not the dining area",
        body: [
          "A dining table rarely lives alone. You also need to open the fridge, walk past a serving station and fit a rug underneath. Our 2D clearance simulator on every dining page draws the room to scale so you can see exactly where that leaves you.",
        ],
      },
    ],
    faq: [
      {
        q: "What size dining table fits a 3.5 x 2.7 m room?",
        a: "A 170 x 90 cm rectangular table fits that room with a 60 cm chair pull-out. An 8-seater at 220 cm needs roughly 4.4 m of length.",
      },
      {
        q: "Is a round table better for a small room?",
        a: "Usually yes. A 110 cm round table seats four in a 2.6 m square room, and because there is no corner seat it feels more open than a rectangle of the same capacity.",
      },
    ],
    relatedProducts: ["the-fluted", "the-orbit", "the-ivory"],
  },
  {
    slug: "best-sofa-fabric-for-kids-and-pets",
    title: "Best sofa fabrics for homes with kids and pets",
    minutes: 5,
    image: "/images/sofa-detail.jpeg",
    excerpt:
      "Questions to ask about upholstery composition, care instructions and tested performance before choosing a sofa.",
    intro:
      "Fabric names alone do not tell you how an upholstery will respond to spills, claws, cleaning or daily use. Ask for composition, supplier care instructions and test evidence for the exact fabric and finish before you decide.",
    sections: [
      {
        heading: "Ask what performance means",
        body: [
          "A product name does not prove spill resistance, abrasion strength or cleanability. Ask for the fabric composition, the test method and result, and the cleaning instructions that apply to the exact upholstery being offered.",
        ],
      },
      {
        heading: "Check care instructions",
        body: [
          "Ask the supplier for written care steps, including which cleaner is allowed, how to handle a spill and whether professional cleaning is recommended. Do not test a cleaner on the visible part of a finished sofa.",
        ],
      },
      {
        heading: "Consider how the room is used",
        body: [
          "Think about pets, children, food and the amount of daily use the sofa will get. Ask how the specific weave behaves with hair, snagging and routine vacuuming, and confirm any limits in the maker's care information.",
        ],
      },
      {
        heading: "Compare evidence, not labels",
        body: [
          "Compare composition, colour options, care requirements and documented test results side by side. If the details are not available, treat performance as unconfirmed and choose based on appearance only after seeing a real sample.",
        ],
      },
    ],
    faq: [
      {
        q: "Which fabric is best with pets?",
        a: "There is no answer based on the fabric name alone. Confirm the exact composition, cleaning instructions and relevant test evidence for each upholstery option.",
      },
      {
        q: "Is linen blend hard to clean?",
        a: "Check the supplier's care instructions for the exact fabric and whether covers are removable and washable before ordering.",
      },
    ],
    relatedProducts: ["the-truffle", "the-linen", "the-cloud"],
  },
  {
    slug: "how-to-measure-your-room-for-a-sofa",
    title: "Measure twice. Fall in love once.",
    minutes: 4,
    image: "/images/4-seats-dinning.jpeg",
    excerpt: "A room checklist that stops delivery-day disappointment.",
    intro:
      "Almost every furniture regret we hear about started with a tape measure that never came out of the drawer. Ten minutes of measuring prevents almost all of it.",
    sections: [
      {
        heading: "The three numbers you need",
        body: [
          "Room length, room width, and the door or window the piece has to come through. That third one surprises people: a 280 cm sofa does not go up a 76 cm stairwell no matter how it is turned.",
          "Measure the narrowest point of the delivery path, not just your front door.",
        ],
      },
      {
        heading: "Check your power sockets",
        body: [
          "Sofas go against walls, and walls have sockets. Before you commit, note where your sockets are and make sure the piece does not bury them — or accept that you will move it later.",
        ],
      },
    ],
    faq: [
      {
        q: "How much space should I leave around a sofa?",
        a: "90 cm behind for the primary walkway, 60 cm in front for legs. Below 90 cm behind you will feel the difference every day.",
      },
    ],
    relatedProducts: ["the-ivory", "the-orbit"],
  },
  {
    slug: "balcony-is-a-room",
    title: "Your balcony is a room you have not furnished yet",
    minutes: 5,
    image: "/images/dining-close.jpeg",
    excerpt: "Making a small Nairobi balcony work, with the right materials.",
    intro:
      "If your balcony is covered, it is not an outdoor area — it is a room with excellent light and a door to the kitchen. That changes what furniture you can put in it.",
    sections: [
      {
        heading: "Covered means you have options",
        body: [
          "A roof does not establish that furniture is suitable for outdoor use. Ask the supplier whether the selected frame, upholstery and finish are rated for sunlight, humidity and occasional moisture, and follow their care instructions.",
        ],
      },
      {
        heading: "Round tables win in small spaces",
        body: [
          "With a balcony door opening inward and walls close on two sides, a rectangular table will feel cramped. A round table of 110 cm seats four in 2.6 m square and leaves the corners free for chairs.",
        ],
      },
    ],
    faq: [
      {
        q: "Can a sofa go on a balcony?",
        a: "Only if the maker confirms that the specific frame, upholstery and finish are suitable for those conditions. Ask about sun exposure, humidity, rain and care before choosing.",
      },
    ],
    relatedProducts: ["the-orbit", "the-cloud"],
  },
  {
    slug: "fabric-that-forgives",
    title: "The fabric test every Kenyan living room deserves",
    minutes: 6,
    image: "/images/curved-sofas.jpeg",
    excerpt: "How to test upholstery before you commit to it.",
    intro:
      "Fabric swatches feel different under showroom light than they do in your own home. Here is how to test them honestly before you spend on a sofa you will live with for years.",
    sections: [
      {
        heading: "Ask about documented testing",
        body: [
          "Do not pour drinks onto a sample unless the supplier explicitly recommends that test. Ask what spills or abrasion tests were run, on which exact fabric, and what the results do and do not show.",
        ],
      },
      {
        heading: "View a sample in your room",
        body: [
          "If a sample is available, view it near the room's windows and under its evening lights. Screen and showroom colours can differ from the upholstery delivered, so ask what sample service is currently available.",
        ],
      },
      {
        heading: "Ask before comparing handfeel",
        body: [
          "Touch the actual sample and compare the texture, pile and weave. Ask whether the sample represents the current production fabric and whether the colour or texture can vary between batches.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I get fabric samples before ordering?",
        a: "Contact Home Update to ask whether samples are currently available and whether collection or delivery fees apply.",
      },
    ],
    relatedProducts: ["the-cloud", "the-truffle"],
  },
  {
    slug: "how-many-people-does-a-6-seater-table-seat",
    title: "How many people does a 6-seater dining table seat?",
    minutes: 5,
    image: "/images/6-seats-dinning.jpeg",
    excerpt: "What six seats means in everyday use, and what to check before choosing a dining set.",
    intro: "A six-seater label is a useful starting point, not a promise that every six people will have the same amount of space. Chair width, table shape, place settings and the way people use the room all affect how comfortable a table feels. Check the exact product dimensions and seating arrangement before you decide.",
    sections: [
      { heading: "Start with the table shape and edge", body: ["A rectangular table usually places seats along its long sides, with some designs adding a seat at each end. A round table arranges chairs around the perimeter. The number of seats a maker lists depends on the actual top, base and chair design, so use the product's stated capacity and confirm it for the model you want.", "A wider chair or one with arms can take more room than a slim side chair. The table base matters too: a pedestal and four legs create different usable seating positions. Look at the chair and table together rather than counting places from the tabletop alone."] },
      { heading: "Think about the way you will use it", body: ["For a quick weekday meal, six places may feel different from a long dinner with serving dishes in the middle. Consider how much elbow room you want, whether you use placemats, and if someone needs to sit at the ends. If the table will double as a work surface, think through that arrangement separately.", "Ask how many people the exact product is designed to seat, whether all chairs are included and whether alternate chair sizes change the arrangement. Request a photo of the table set with its listed chairs if you need to judge the spacing."] },
      { heading: "Check room size and access", body: ["Measure the room's clear floor area, then allow space for chairs to move and for people to pass. Treat the 60 cm chair pull-out and 90 cm walkway used in our planning guide as estimates, not rules that guarantee a comfortable fit. Door swings, cupboards and nearby furniture can change the usable space.", "Measure the path into the room as well, including the narrowest corridor, lift or stair turn. Send the room and access measurements on WhatsApp and ask us to confirm the current product dimensions, seating details and delivery requirements before ordering."] },
      { heading: "Questions to ask before buying", body: ["Confirm the table's full dimensions, the included chair count, seat width, material and finish options, current price and lead time. Ask about care instructions, delivery and setup for your area, and warranty terms. These details can vary by configuration, so get the answers for the exact set you are considering."] },
    ],
    faq: [
      { q: "Does a 6-seater always fit six adults comfortably?", a: "Not necessarily. Chair width, table shape and the space each person prefers all matter. Ask for the capacity and chair dimensions of the exact set." },
      { q: "How much room should I leave around it?", a: "Use the room-fit guide as a planning estimate, then check the table, chairs, doors and walkways in your own layout." },
    ],
    relatedProducts: ["the-fluted", "the-regent", "the-orbit"],
  },
  {
    slug: "boucle-vs-velvet-vs-chenille",
    title: "Bouclé vs velvet vs chenille: how to compare upholstery",
    minutes: 6,
    image: "/images/sofa-detail.jpeg",
    excerpt: "Compare upholstery using the actual fabric composition, sample, care label and verified performance information.",
    intro: "Bouclé, velvet and chenille describe different upholstery looks and constructions, but a name alone does not tell you how a particular fabric will wear, clean or respond to a spill. Composition, weave, backing, finishing treatment and supplier care instructions all matter. Compare the specific fabric swatches being offered, and ask for documentation before relying on a performance claim.",
    sections: [
      { heading: "Compare the feel and surface", body: ["Look closely at the yarn, pile and texture, then handle a real sample if one is available. Consider whether you prefer a smooth surface, a visible texture or a plush appearance. The exact feel varies between suppliers and fabric blends, so the material name should not replace seeing the actual swatch.", "Check the sample in the room where the furniture will be used. Daylight and evening lighting can change how a colour appears. Ask whether the sample matches the current production fabric and whether shade or texture can vary between batches."] },
      { heading: "Check care and composition", body: ["Ask for the fiber composition and written cleaning instructions for the exact upholstery. Confirm which cleaners are permitted, how to handle a spill, whether vacuum attachments or professional cleaning are recommended and whether the covers can be removed. Do not assume that a fabric is machine washable or wipe-clean from its name.", "If a seller describes a fabric as suitable for children, pets or high-use rooms, ask what the claim means and what evidence supports it. Useful evidence identifies the tested fabric, the test method, the result and any limits. A test on one colour or finish may not apply to another."] },
      { heading: "Compare performance evidence", body: ["For water or stain resistance, ask what liquid was used, how long it remained on the sample, how it was cleaned and whether the result was independently tested. Ask about abrasion, pilling, fading and snagging only where relevant to how your household uses the furniture. Treat unsupported descriptions as unconfirmed.", "Never pour a drink or apply a household cleaner to a showroom sample unless its supplier recommends the test. A demonstration can be useful when it is filmed or described honestly, but one short clip does not establish performance in every home or over the full life of a sofa."] },
      { heading: "Make a like-for-like choice", body: ["Compare the exact swatches side by side for colour, handfeel, composition, care steps, available evidence and price. Ask whether switching fabric changes the lead time or price, and confirm availability before ordering. If a detail is missing, ask the seller to check rather than treating a general fabric description as a guarantee.", "Send Home Update the sofa model, room use and the fabric names you are considering. We can confirm which options and care details are currently available for that product and whether samples can be provided."] },
    ],
    faq: [
      { q: "Which of these fabrics is easiest to clean?", a: "The name alone is not enough to answer. Ask for the care instructions and tested performance details for the exact fabric option." },
      { q: "Can I compare a sample at home?", a: "Ask Home Update whether samples are currently available and whether collection or delivery fees apply." },
    ],
    relatedProducts: ["the-cloud", "the-truffle", "the-linen"],
  },
  ...localSeoArticles,
];

export function getPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
