export type JournalPost = {
  slug: string;
  title: string;
  minutes: number;
  image: string;
  excerpt: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  faq: { q: string; a: string }[];
  relatedProducts: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "small-space-sofa-ideas",
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
    slug: "fabrics-for-kids-and-pets",
    title: "Best sofa fabrics for homes with kids and pets",
    minutes: 5,
    image: "/images/sofa-detail.jpeg",
    excerpt:
      "Performance velvet, chenille and linen blend compared for spills, claws, hair and everyday life.",
    intro:
      "Fabric is the only part of a sofa you will choose in daylight and regret at 7pm with a juice box in your hand. Here is an honest comparison of what actually survives a busy home.",
    sections: [
      {
        heading: "Performance velvet is the workhorse",
        body: [
          "Performance velvet is the easiest of these to live with. Liquids bead on the surface instead of soaking in, hair lifts off with a cloth, and it wipes clean in seconds. It is the safe answer for a family room.",
        ],
      },
      {
        heading: "Chenille is the durable middle ground",
        body: [
          "Chenille is hard-wearing and soft, and it hides everyday marks well. It is not fully waterproof, so it wants blotting rather than scrubbing, but it takes far more punishment than linen.",
        ],
      },
      {
        heading: "Bouclé is beautiful and fussy",
        body: [
          "Bouclé has the texture people fall for, but the loops trap debris and show spills. In a house with pets or small children, bouclé needs a strict vacuum schedule and prompt blotting.",
        ],
      },
      {
        heading: "Linen blend is for calm rooms",
        body: [
          "Linen blend looks relaxed and breathable, which is why it suits small, light-filled spaces. It wrinkles, absorbs and is unforgiving with grease stains. Choose it for the bedroom or the calm corner, not the family sofa.",
        ],
      },
    ],
    faq: [
      {
        q: "Which fabric is best with pets?",
        a: "Performance velvet and chenille. Both lift hair easily and performance velvet will not absorb a spill.",
      },
      {
        q: "Is linen blend hard to clean?",
        a: "Yes, more than the others. It is best in low-traffic rooms or on removable covers you can wash.",
      },
    ],
    relatedProducts: ["the-truffle", "the-linen", "the-cloud"],
  },
  {
    slug: "measure-before-you-fall",
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
          "A covered balcony in Nairobi gets far less rain and sun than an open one, which means performance fabrics and wipe-clean finishes are viable. That is why we qualify every water-resistant claim as applying to covered balconies specifically.",
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
        a: "On a covered balcony, yes — with a wipe-clean fabric. We only claim water resistance for covered spaces, and we will confirm the specifics on WhatsApp before you order.",
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
        heading: "The coffee test",
        body: [
          "Put a cup of hot black coffee on the swatch and leave it for a minute. If the ring stays, the fabric will disappoint you. Performance velvet and chenille both pass.",
        ],
      },
      {
        heading: "The daylight test",
        body: [
          "Hold the swatch against your window at midday. Colours shift dramatically between showroom and home light — an oat that reads warm in a shop can look grey by a bright window.",
        ],
      },
      {
        heading: "The hand test",
        body: [
          "Run your palm across it both ways. Bouclé is lovely but you will feel every crumb in it. Choose the texture you will still want to touch on a tired evening.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I get fabric samples before ordering?",
        a: "Yes. Message us on WhatsApp and we will arrange samples for the fabrics you are considering.",
      },
    ],
    relatedProducts: ["the-cloud", "the-truffle"],
  },
];

export function getPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}