export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type PestTypeSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type PestType = {
  /** Display label, e.g. "ARGENTINE ANTS" */
  name: string;
  image?: string;
  /** Detail page headline */
  headline?: string;
  /** Detail page body paragraphs */
  paragraphs?: string[];
  sections?: PestTypeSection[];
};

export type ServiceDetail = {
  title: string;
  /** Listing / card image (e.g. /pests page rows) */
  image?: string;
  /** Short blurb used on listing cards */
  paragraphs: string[];
  /** Detail page headline (pest pages) */
  detailHeadline?: string;
  /** Long detail body paragraphs (pest pages) */
  detailParagraphs?: string[];
  /** Optional guide section title */
  guideTitle?: string;
  guideIntro?: string;
  guideItems?: string[];
  /** Subtype image cards for pest detail view */
  types?: PestType[];
  offeredServices?: string[];
  stepsIntro?: string;
  steps?: ServiceStep[];
  faqs?: ServiceFaq[];
};

/** "ANT (Treatment)" → "Ant" */
export function getPestShortName(title: string): string {
  const raw = title.replace(/\s*\(Treatment\)\s*/i, "").trim().toLowerCase();
  return raw.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** "ARGENTINE ANTS" → "Argentine Ants" */
export function formatPestTypeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Subtype cards + detail copy; pass images in the same order as names */
function dummyTypes(
  pestLabel: string,
  names: string[],
  images: string[] = [],
): PestType[] {
  const label = pestLabel.toLowerCase();
  return names.map((name, index) => ({
    name,
    image: images[index] || "",
    headline: `Professional ${formatPestTypeName(name)} Control Services`,
    paragraphs: [
      `Accurate Pest Control Services LLC provides professional ${label} control services across the UAE. Our treatments are designed according to Municipality and Ministry of Climate Change & Environment guidelines. We identify the ${label} species, locate nesting areas, and apply customized treatment methods to eliminate infestations effectively and prevent ${label} from returning.`,
      `This page currently uses placeholder copy for ${formatPestTypeName(name)}. Final species details, images, and treatment notes can be replaced here later.`,
    ],
  }));
}

export function getPestTypeHeadline(type: PestType): string {
  return type.headline?.trim() || "Residential & Commercial Pest Control";
}

export function getPestTypeParagraphs(
  pest: ServiceDetail,
  type: PestType,
): string[] {
  if (type.paragraphs && type.paragraphs.length > 0) {
    return type.paragraphs;
  }

  const shortName = getPestShortName(pest.title).toLowerCase();
  return [
    `Accurate Pest Control Services LLC provides professional ${shortName} control services across the UAE. Our treatments are designed according to Municipality and Ministry of Climate Change & Environment guidelines. We identify the ${shortName} species, locate nesting areas, and apply customized treatment methods to eliminate colonies effectively and prevent ${shortName} from returning.`,
  ];
}

export const pestTreatments: ServiceDetail[] = [
  {
    title: "ANTS (Treatment)",
    image: "/pests/ants/ant.webp",
    paragraphs: [
      "Ant pest control successfully destroys hidden nests, gets rid of active colonies, and makes sure ants don't come back to infest your house or place of business.",
    ],
    detailHeadline: "Professional Ant and Pest Control Solutions",
    detailParagraphs: [
      "Facing an ant infestation? Accurate Pest Control Services LLC Dubai offers professional ant pest control to protect your home or business. Our licensed technicians use eco-safe, effective methods to eliminate ants from every corner indoors or outdoors. Whether you're dealing with red ants in the kitchen or ant trails around your garden, we act fast and efficiently. We also provide long-term prevention plans to ensure ants don’t return and disrupt your space again, giving you peace of mind and a pest free environment.",
    ],
    guideTitle: "Your Guide to Choosing the Right Ant Control Company",
    guideIntro: "Although small, ants can cause significant problems, especially in homes and food establishments.",
    guideItems: [
      "Build nests in walls, under tiles, and near electrical appliances",
      "Leave scent trails, attracting hundreds more",
      "Bite and sting, especially aggressive red ants",
      "Contaminate food and surfaces",
      "Multiply rapidly, making infestations harder to manage",
    ],
    stepsIntro: "Reliable, environmentally friendly pest removal designed for Dubai's specific conditions.",
    steps: [
      {
        title: "Ant Inspection and Identification",
        description:
          "To find nests and access locations, our knowledgeable pest team starts with a thorough inspection of your property. Understanding the species helps determine the right treatment for successful pest control for ants.",
      },
      {
        title: "Ant Control and Elimination",
        description:
          "Our team applies safe and effective ant pesticide treatments that target colonies at their source. Whether indoors or outdoors, our customized approach using gels, baits, and sprays delivers quick results without risking the safety of pets or children.",
      },
      {
        title: "Follow-Up by Ant Control Experts",
        description:
          "We keep on offering our services after the initial visit. Our team sets up follow-up inspections to ensure ants don't return. As a nearby ant control company, we also provide prevention advice to keep your area ant free in the future.",
      },
    ],
    types: [
      {
        name: "ARGENTINE ANTS",
        image:
          "/pests/ants/Argentine_Ants_Gathering_on_a_Surface_Near_Food_Remains-1C07zQUI.webp",
        headline: "About Argentine Ants",
        paragraphs: [
          "The tiny, light to dark brown Argentine ants (Linepithema humile) are famous for establishing large colonies and breaking into houses and other structures. Originating in South America, these ants have spread all over the world and are especially tenacious in hot climates like Dubai. They frequently enter through foundations, pipes, and cracks and are attracted to moist, sugary meals. Their sheer numbers and ability to relocate quickly make professional control necessary.",
        ],
        sections: [
          {
            heading: "Signs of an Argentine Ant Infestation",
            paragraphs: [
              "You may not notice them at first, but these are clear indicators of their presence:",
            ],
            items: [
              "Long trails of tiny brown ants, especially in kitchens and bathrooms",
              "Sightings of ants near pet food, trash cans, or leaky faucets",
              "Small nests outdoors near concrete, mulch, or garden beds",
              "Rapid reappearance even after cleaning or spraying",
            ],
          },
          {
            heading: "Where They Nest and How They Spread",
            paragraphs: [
              "Argentine ants are unique in their nesting behavior. Unlike other ant species, they don’t compete with neighboring colonies; instead, they join together, forming massive supercolonies.",
              "They spread indoors by following scent trails to water and food sources. Their colonies can cover large neighborhoods while they're outside.",
            ],
            items: [
              "Soil under patios or stones",
              "Cracks in walls and under tiles",
              "Electrical outlets, kitchen sinks, and wall voids",
              "Moist places like bathrooms and HVAC systems",
            ],
          },
          {
            heading: "Dangers and Property Concerns",
            paragraphs: [
              "Argentine ants cause additional issues even when they don't sting like fire ants:",
            ],
            items: [
              "When they come in big numbers, they may enter pantries and kitchens.",
              "Their presence can attract other pests like aphids due to mutualistic relationships.",
              "They may damage electrical systems by nesting inside appliances.",
              "Infestations often return without proper treatment.",
            ],
          },
          {
            heading: "Effective Ant Control Solutions",
            paragraphs: [
              "Managing Argentine ants takes more than a quick fix. A comprehensive strategy ensures long-term results:",
            ],
            items: [
              "Smart use of targeted ant traps to disrupt their movement and feeding",
              "Application of professional-grade sprays to reach hidden nesting sites",
              "Fumigation in severe cases where colonies are deeply embedded",
              "Detailed inspection to find and seal all possible entrance points",
              "Ongoing monitoring to ensure the infestation doesn't return",
            ],
          },
        ],
      },
      {
        name: "PAVEMENT ANTS",
        image:
          "/pests/ants/Pavement_Ant_Close-Up_Crawling_on_Rocky_Outdoor_Surface-xbOSSqrz.webp",
        headline: "About Pavement Ants",
        paragraphs: [
          "Small, dark brown to black ants called pavement ants (Tetramorium caespitum) frequently make their nests beneath roadways, sidewalks, and building foundations. These ants often make their way indoors through cracks and crevices, especially in search of food. While they’re not aggressive, their persistence and colony size can cause ongoing issues for both homes and businesses in Dubai.",
        ],
        sections: [
          {
            heading: "Signs of a Pavement Ant Infestation",
            paragraphs: [
              "Though tiny, pavement ants leave behind some noticeable signs:",
            ],
            items: [
              "Small dirt mounds or sand piles near pavement cracks or baseboards",
              "Ant trails that lead to food crumbs, pet foods, or garbage",
              "Increased activity during warm weather or after rain",
              "Nests around tiles, concrete edges, or basement floors",
            ],
          },
          {
            heading: "Where They Nest and How They Spread",
            paragraphs: [
              "Pavement ants prefer to nest in:",
              "In search of food, these ants travel far from their colonies. Once a trail is established, they can quickly invade your space in large numbers.",
            ],
            items: [
              "Sidewalk joints and under concrete slabs",
              "Gaps in walls, floorboards, and baseboards",
              "Kitchens, pantries, and under appliances once indoors",
            ],
          },
          {
            heading: "Health Risks and Property Concerns",
            paragraphs: [
              "While not dangerous to health, pavement ants can:",
            ],
            items: [
              "Contaminate food by foraging in kitchen areas",
              "Attract other pests like cockroaches",
              "Spread throughout multi-unit buildings or shared walls",
              "Become difficult to eliminate without professional help",
            ],
          },
          {
            heading: "Controlling Pavement Ants Effectively",
            paragraphs: [
              "Effective control requires more than surface-level sprays. It should include:",
            ],
            items: [
              "Use of ant spray products that reach into cracks and voids",
              "Methods of targeted trapping to kill colonies at their source",
              "Sealing entry points to block re-entry",
              "Expert guidance on keeping indoor ant infestations from returning",
              "Safe and thorough ant fumigation services in severe or commercial infestations",
            ],
          },
        ],
      },
      {
        name: "PHARAOH ANTS",
        image:
          "/pests/ants/Pharaoh_Ants_Moving_in_Group_Formation_on_Indoor_Surface-BF7hHqrC.webp",
        headline: "About Pharaoh Ants",
        paragraphs: [
          "The tiny, light yellow to reddish ants with darker abdomens are known as pharaoh ants (Monomorium pharaonis). Despite their small size, they are among the most troublesome indoor pests, particularly in hospitals, restaurants, and residential buildings. Known for forming multiple colonies and splitting when disturbed, they require advanced control strategies beyond standard ant treatments.",
        ],
        sections: [
          {
            heading: "Signs of a Pharaoh Ant Infestation",
            paragraphs: [
              "These ants are hard to detect early on, but look out for:",
            ],
            items: [
              "Long trails of tiny ants in kitchens, bathrooms, and utility rooms",
              "Ants emerging from wall voids, electrical outlets, or cracks",
              "Food contamination, especially in sweet or greasy items",
              "Difficulty eliminating them with DIY sprays or traps",
            ],
          },
          {
            heading: "Where They Nest and How They Spread",
            paragraphs: [
              "Pharaoh ants are especially hard to control because of their unique behavior. They build nests in:",
              "This ant species reproduces rapidly and forms satellite colonies, allowing them to spread across entire floors or buildings within weeks.",
            ],
            items: [
              "Wall voids, behind baseboards, and inside cabinets",
              "Electrical appliances and switch boxes",
              "Warm, humid areas like boiler rooms or laundries",
            ],
          },
          {
            heading: "Health Concerns and Risks",
            paragraphs: ["Pharaoh ants are known carriers of harmful pathogens. They can:"],
            items: [
              "Contaminate medical equipment, food, and sterile environments",
              "Spread bacteria such as Salmonella and Streptococcus",
              "Cause recurring infestations due to colony splitting when disturbed",
            ],
          },
          {
            heading: "Effective Pharaoh Ant Control Strategies",
            paragraphs: [
              "Because they multiply so quickly, a specialized approach is required:",
            ],
            items: [
              "Use slow-acting ant poison baits that workers transport back to the nest, ensuring colony-wide elimination",
              "Careful monitoring and expert treatment plans designed for long-term control and prevention",
              "Strategic product placement to avoid colony splitting and hidden nest formation",
              "Stay away from strong sprays and do-it-yourself techniques that could make the infestation worse",
            ],
          },
        ],
      },
      {
        name: "CARPENTER ANTS",
        image:
          "/pests/ants/Carpenter_Ant_Close-Up_on_Indoor_Surface_Floor-CAOi_tXH.webp",
        headline: "About Carpenter Ants",
        paragraphs: [
          "Carpenter ants are large ants that are known to bore tunnels into wood in order to build nests. While they don't consume wood like termites, their excavation can cause serious structural damage over time. Often black or dark brown, these ants are commonly found in wooden structures, wall voids, and damp areas. Quick identification and treatment are essential to avoid costly repairs.",
        ],
        sections: [
          {
            heading: "Signs of a Carpenter Ant Infestation",
            paragraphs: [
              "Although they are often concealed, carpenter ants leave obvious signs:",
            ],
            items: [
              "Sawdust-like shavings (frass) near wood surfaces",
              "Hollow-sounding wood or rustling noises in walls",
              "Large black ant sightings, especially at night",
              "Winged ants appearing indoors during spring or summer",
              "Multiple nests or satellite colonies",
            ],
          },
          {
            heading: "Where They Nest and How They Spread",
            paragraphs: [
              "Carpenter ants prefer damp, decaying wood and often build nests in:",
              "These ants cut through wood to build their nests rather than eating it like termites do. Termites consume wood, while carpenter ants remove it to make space.",
            ],
            items: [
              "Wooden beams, window frames, and attic spaces",
              "Under decks, sheds, or roof voids",
              "Moist areas near leaky pipes or gutters",
            ],
          },
          {
            heading: "Dangers and Structural Concerns",
            paragraphs: [
              "A group of ants might seem harmless at first, but carpenter ants can:",
            ],
            items: [
              "Compromise the integrity of wooden structures",
              "Spread to multiple parts of your home or business",
              "Go unnoticed for months while nesting deep inside walls",
              "Be mistaken for other ant species, delaying effective treatment",
            ],
          },
          {
            heading: "Effective Carpenter Ant Control",
            paragraphs: [
              "Controlling carpenter ants requires more than bait. The process often includes:",
            ],
            items: [
              "Locating and eliminating both parent and satellite nests",
              "Sealing entry points and repairing water-damaged wood",
              "Identifying the black carpenter ant queen, as colonies rebuild if she remains",
              "Using safe treatments targeted to nesting zones",
              "Adapting specialized control strategies for outdoor nests",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "COCKROACHES (Treatment)",
    image: "/pests/cockroaches/cockroch.webp",
    paragraphs: [
      "Cockroach killer services properly target concealed locations, remove infestations quickly, and stop cockroach growth in the future.",
    ],
    detailHeadline: "Experts Cockroach Pest Control",
    detailParagraphs: [
      "Not only are cockroaches hostile, but they also spread diseases, cause allergies, and compromise personal hygiene. At Accurate Pest Control Services LLC, we provide expert cockroach pest control Dubai using safe, effective, and lasting methods. Whether the infestation is overwhelming or just beginning, we approach every situation with precision and care. Our durable treatments are perfect for commercial storage units, restaurants, and residential kitchens. Choose our reliable team to protect your property and restore cleanliness with the most trusted solutions in the region.",
    ],
    guideTitle: "Why Cockroach Control is Important",
    guideIntro: "Cockroaches are solid pests that conceal themselves in difficult-to-reach locations and change quickly:",
    guideItems: [
      "They commonly infest kitchens, drains, cabinets, and appliances.",
      "Infect others with bacteria that can lead to food poisoning and respiratory issues.",
      "Grow in warm, humid conditions, frequently going unnoticed until it's too late.",
      "Increase quickly; a minor problem could turn into a major outbreak.",
      "Hard to eliminate without professional cockroach pest control.",
    ],
    stepsIntro: "Efficient and safe Cockroach removal tailored to your space.",
    steps: [
      {
        title: "Inspection and Identification",
        description:
          "Our professionals inspect the location, determine the kind of cockroach, and identify areas for nesting and breeding. This step is essential to determine the right cockroach control solution.",
      },
      {
        title: "Customized Treatment Plan",
        description:
          "Based on the infestation level, we apply targeted treatments using eco-friendly gels, baits, and sprays, including trusted cockroach killer products that ensure safety around people and pets.",
      },
      {
        title: "Prevention and Follow-Up",
        description:
          "To stop repetition, we seal entry sites, provide hygienic guidance, and carry out regular monitoring. We take a long-term, active approach.",
      },
    ],
    types: [
      {
        name: "GERMAN COCKROACH",
        image:
          "/pests/cockroaches/A_Close-Up_Image_of_a_German_Cockroach_on_Leaf-CbbxhcCv.webp",
        headline: "About German Cockroach",
        paragraphs: [
          "Among the most common and persistent indoor pests, German cockroaches thrive in warm, humid spaces like bathrooms and kitchens. Their small size and high potential for infestation make them a major problem in homes and businesses. Because they breed quickly and hide in hard-to-reach areas, prompt German cockroach pest control is essential for hygiene and safety.",
        ],
        sections: [
          {
            heading: "Identifying the German Cockroach",
            items: [
              "Color: Two dark, parallel stripes appear on its back, which ranges from light brown to tan.",
              "Size: Adults measure about 1.1 to 1.6 cm long.",
              "Shape: Flat, oval body with long antennae.",
              "Speed: Very fast movers, especially when lights are turned on.",
              "Habitat: Frequently found in appliances, cabinets, and cracks.",
            ],
          },
          {
            heading: "Damage and Health Hazards",
            paragraphs: [
              "Even in small numbers, German cockroaches can lead to major problems that require professional extermination:",
            ],
            items: [
              "Introduce bacteria and diseases to surfaces, utensils, and food",
              "Trigger asthma and allergic reactions, especially in children",
              "Leave foul odors from droppings and secretions",
              "Multiply quickly, making infestations hard to control without help",
            ],
          },
          {
            heading: "How They Enter and Thrive",
            paragraphs: [
              "German cockroaches gain access to buildings and homes through:",
            ],
            items: [
              "Grocery bags, luggage, and secondhand appliances",
              "Cracks in walls, plumbing openings, or ventilation systems",
              "Shared pipes and drains in apartment complexes",
            ],
          },
          {
            heading: "Integrated Pest Strategy",
            paragraphs: [
              "Targeting German cockroaches requires a layered approach with expert cockroach control services. Successful treatment includes:",
            ],
            items: [
              "Monitoring high-risk zones and identifying infestation levels",
              "Sealing entry points and removing food and water access",
              "Applying bait, gel, or residual insecticides in targeted areas",
              "Educating homeowners on cleanliness and preventive habits",
            ],
          },
        ],
      },
      {
        name: "BROWN-BANDED COCKROACH",
        image:
          "/pests/cockroaches/Brown-Banded_Cockroach_Close-Up_on_Indoor_Surface-BHA5Tuhf.webp",
        headline: "About Brown-Banded Cockroach",
        paragraphs: [
          "One of the most elusive cockroach species, the brown-banded cockroach prefers warm, dry environments. Unlike other cockroach species, it tends to stay above ground, often hiding behind picture frames, inside cabinets, and within electronics. Though smaller in size, its secretive behavior and fast reproduction make it a stubborn pest in homes and offices across the UAE.",
        ],
        sections: [
          {
            heading: "Identifying the Brown-Banded Cockroach",
            items: [
              "Color: Light brown, with two lighter bands across the wings and belly.",
              "Size: About 0.5 inch (10–14 mm) long.",
              "Shape: Flat and oval with long antennae.",
              "Behavior: Active at night, avoids water, and can fly.",
              "Common regions: Found worldwide, especially in warm indoor locations such as homes and offices in the UAE.",
            ],
          },
          {
            heading: "Damage and Infestation Risks",
            paragraphs: [
              "The brown-banded cockroach is not the largest, yet it can still cause harm and contamination:",
            ],
            items: [
              "Contaminates food and kitchen surfaces",
              "Leaves behind egg casings and droppings",
              "Can trigger allergies and asthma symptoms",
              "May damage electronics and paper items due to nesting",
            ],
          },
          {
            heading: "Where They Hide and Thrive",
            paragraphs: [
              "Brown-banded cockroaches avoid moisture and prefer higher, hidden spots:",
            ],
            items: [
              "Inside electrical appliances like TVs and routers",
              "Behind wall hangings and picture frames",
              "In dry storage areas, closets, and ceilings",
              "Anywhere dark, warm, and undisturbed",
            ],
          },
          {
            heading: "Effective Control and Prevention",
            paragraphs: [
              "Getting rid of this pest requires more than surface sprays. Professional cockroach treatment focuses on:",
            ],
            items: [
              "Identifying specific hiding zones",
              "Using bait stations and residual insecticides",
              "Applying dust in wall voids and appliance spaces",
              "Educating homeowners on sanitation and sealing methods",
            ],
          },
        ],
      },
      {
        name: "SMOKY BROWN COCKROACH",
        image:
          "/pests/cockroaches/Smokybrown_Cockroach_Resting_on_a_Green_Leaf_Surface-l98kKixZ.webp",
        headline: "About Smoky Brown Cockroach",
        paragraphs: [
          "Among the many types of cockroaches found in UAE homes and gardens, the smoky brown cockroach stands out for its large size, glossy dark brown body, and strong flying ability. These pests are mostly active at night and are often seen flying toward lights in humid outdoor environments.",
        ],
        sections: [
          {
            heading: "Easy Ways to Identify This Pest",
            items: [
              "Color: Uniform dark brown or mahogany.",
              "Size: Grows up to 1.5 inches in length.",
              "Wings: Long wings that extend past the abdomen.",
              "Body shape: Sleek and flat, allowing it to squeeze into tight spaces.",
              "Movement: Agile and capable of gliding short distances.",
              "Detection difficulty: Often goes unnoticed until infestation increases because it hides well.",
            ],
          },
          {
            heading: "Where They Live and Thrive",
            paragraphs: [
              "Smoky brown cockroaches prefer warm, humid areas with plenty of organic matter, such as:",
            ],
            items: [
              "Roof gutters and attics",
              "Gardens and mulch beds",
              "Outdoor garbage bins",
              "Bathrooms and basements with high humidity",
            ],
          },
          {
            heading: "The Health Hazards They Bring",
            paragraphs: [
              "These cockroaches are more than a nuisance. Their presence can:",
            ],
            items: [
              "Contaminate surfaces and food",
              "Trigger allergies and asthma",
              "Carry bacteria from outdoor waste to indoor kitchens",
            ],
          },
          {
            heading: "Get Rid of Smoky Brown Cockroaches the Right Way",
            paragraphs: [
              "Smoky brown cockroaches require specific treatments. Accurate Pest Control technicians:",
            ],
            items: [
              "Identify infestation zones",
              "Apply targeted treatment",
              "Seal entry points",
              "Offer post-treatment monitoring",
            ],
          },
        ],
      },
      {
        name: "ORIENTAL COCKROACH",
        image:
          "/pests/cockroaches/Oriental_Cockroach_Crawling_on_Damp_Surface-3y66mqtN.webp",
        headline: "About Oriental Cockroach",
        paragraphs: [
          "The Oriental cockroach is one of the more secretive and resilient cockroach species found in the UAE. Classified as the “water bug,” it is frequently found in basements, waterways, and beneath sinks, and thrives in moist, dark environments.",
        ],
        sections: [
          {
            heading: "Identifying the Oriental Cockroach",
            items: [
              "Color: Glossy black or dark brown body.",
              "Size: Ranges between 1 and 1.25 inches in length.",
              "Wings: Females are wingless; males have small wings.",
              "Flight: Both males and females can fly despite the difference in wing size.",
              "Movement: Not a fast climber; prefers crawling on flat surfaces.",
              "Distinction: Slower and darker than many other cockroach species.",
            ],
          },
          {
            heading: "Where Do They Hide?",
            paragraphs: ["Oriental cockroaches are typically found:"],
            items: [
              "Under leaking pipes or wet appliances",
              "In garbage areas and outdoor drains",
              "Beneath bathroom tiles and in sewer systems",
            ],
          },
          {
            heading: "Why Are They a Problem?",
            paragraphs: [
              "These pests are more than just unsightly. Like many insects in Dubai, they thrive in high temperatures and humidity. Due to their contact with trash and decomposing organic matter, Oriental cockroaches can:",
            ],
            items: [
              "Contaminate food and surfaces",
              "Spread bacteria and allergens",
              "Trigger asthma and other respiratory issues",
            ],
          },
          {
            heading: "Integrated Solutions for Lasting Results",
            paragraphs: [
              "Accurate Pest Control LLC Dubai uses targeted methods to remove Oriental cockroaches. The treatment addresses their damp hiding places and helps prevent further infestations.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "BED BUGS (Treatment)",
    image: "/pests/bedbugs/bedbug.webp",
    paragraphs: [
      "Bed bug treatment safely targets infected bedding, furniture and room corners to get rid of eggs, tiny insects and adults.",
    ],
    detailHeadline: "Bed Bug Pest Control Services",
    detailParagraphs: [
      "Dealing with a bedbug infestation, Accurate Pest Control Services LLC Dubai offers professional bed bug treatment to restore comfort and safety to your home or business. Our licensed technicians use safe, effective methods as part of our comprehensive pest control services to eliminate bed bugs from every corner of your property. Whether you're facing an early infestation or a severe outbreak, we’re equipped to handle it all. Our priorities are rapid response, little trouble, and satisfaction assurance. Select the team Dubai relies on to safeguard your clients, family, and visitors from the health hazards posed by bedbugs.",
    ],
    guideTitle: "Your Guide to the Best Bed Bug Control",
    guideIntro: "Despite their small size, bed bugs cause a great deal of discomfort and harm.",
    guideItems: [
      "Feed at night while hiding in wall cracks, beds, and furniture.",
      "Leave itchy bite marks and sleepless nights",
      "Lay eggs rapidly, making infestations harder to stop",
      "Travel easily between rooms, spreading throughout your home",
      "Causes allergic reactions, stress, and embarrassment",
    ],
    stepsIntro: "Effective and secure bug removal made for your area.",
    steps: [
      {
        title: "Bedbug Inspection Service",
        description:
          "Our expert team begins with a detailed inspection to locate signs of bedbug activity in your home or business. Early detection is key to effective bed bug control, ensuring we target all hiding spots before treatment.",
      },
      {
        title: "Professional bed bug exterminator",
        description:
          "We apply a customized bed bug treatment using heat, steam, and safe chemicals. Our pest control services are designed to eliminate all bed bugs, from eggs to adults, with minimal disruption to your daily life.",
      },
      {
        title: "Follow-Up by Bed Bug Experts",
        description:
          "To guarantee total eradication, our skilled bed bug extermination staff does follow-up visits. As a trusted bed bug company, we guarantee long-term protection and helpful tips to prevent future infestations.",
      },
    ],
    types: [
      {
        name: "CIMEX LECTULARIUS",
        image:
          "/pests/bedbugs/Close-Up_of_Cimex_lectularius_Bed_Bug_on_Fabric-B-2htMy2.webp",
        headline: "About Cimex lectularius (Common Bed Bug)",
        paragraphs: [
          "Cimex lectularius is the scientific name for the common bed bug found in homes, hotels, and apartments worldwide. These small, reddish-brown insects feed on human blood and are most active at night. They have flat, oval bodies and may go months without feeding. While they do not spread disease, they can cause discomfort, allergic reactions, and psychological stress, making timely bed bug control important.",
        ],
        sections: [
          {
            heading: "Signs of a Bed Bug Infestation",
            paragraphs: [
              "You may not see the bugs right away, but here are the most common signs:",
            ],
            items: [
              "Itchy red bites in a line or cluster, usually on exposed skin",
              "Tiny blood stains on sheets or mattresses",
              "Dark fecal spots near seams, corners, or wall edges",
              "Shed skins and translucent bed bug eggs in crevices or fabric folds",
              "A musty, sweet odor in heavily infested rooms",
            ],
          },
          {
            heading: "Where They Hide and How They Spread",
            paragraphs: ["Bed bugs are experts at hiding in:"],
            items: [
              "Mattress seams, box springs, and bed frames",
              "Cracks in walls, furniture, and flooring",
              "Luggage, backpacks, clothing, and secondhand furniture",
            ],
          },
          {
            heading: "Dangers and Health Effects",
            paragraphs: [
              "Though they don’t transmit diseases, the effects of bed bugs can be serious:",
            ],
            items: [
              "Constant itching and secondary skin infections from scratching",
              "Sleep disturbances and anxiety",
              "Risk of allergic reactions",
              "Infestations can quickly spread throughout homes or buildings",
            ],
          },
          {
            heading: "Effective Bed Bug Control",
            paragraphs: [
              "A successful strategy requires more than just sprays. It includes:",
            ],
            items: [
              "Deep vacuuming and steam treatment",
              "Professional treatment targeting all life stages",
              "Safe and certified insecticides for furniture and cracks",
              "Full-service treatment plans for residential or commercial spaces",
              "Continuous monitoring to prevent reinfestation",
            ],
          },
        ],
      },
      {
        name: "CIMEX HEMIPTERUS",
        image:
          "/pests/bedbugs/Close-Up_View_of_Cimex_hemipterus_on_Fabric_Surface-BnuKtd88.webp",
        headline: "About Cimex hemipterus (Tropical Bed Bug)",
        paragraphs: [
          "Cimex hemipterus is the tropical relative of the common bed bug and is commonly found in humid regions like the UAE. These reddish-brown insects are slightly longer than their temperate counterparts and are known for persistent feeding behavior. Active primarily at night, they hide in mattresses, furniture, and small cracks, feeding on human blood and causing itchy welts, disturbed sleep, and anxiety.",
          "With reports of bed bug infestations in homes, hotels, and labor accommodations, it’s important to identify and treat the problem quickly.",
        ],
        sections: [
          {
            heading: "Signs of a Cimex hemipterus Infestation",
            paragraphs: ["You might not spot the bugs directly, but here are the signs:"],
            items: [
              "Small, itchy bite marks in lines or clusters, often noticed after waking",
              "Rust-colored stains or dark spots on bed sheets and furniture",
              "Tiny, white, sticky bed bug eggs in mattress folds or wooden joints",
              "Molted skins and a sweet, musty smell in heavily infested areas",
              "Increased irritation and loss of sleep",
            ],
          },
          {
            heading: "Where They Hide and How They Travel",
            paragraphs: [
              "These pests are expert hiders and can be transported unknowingly in personal belongings. Common hiding places include:",
            ],
            items: [
              "Seams of mattresses, box springs, and sofas",
              "Behind headboards, inside wooden cracks, and curtain folds",
              "In luggage, backpacks, and secondhand electronics or furniture",
            ],
          },
          {
            heading: "Health Risks and Impact",
            paragraphs: [
              "While Cimex hemipterus doesn’t spread disease, it can cause:",
              "In high-humidity zones like the UAE, these tropical bed bugs can multiply rapidly and are harder to eliminate without professional help.",
            ],
            items: [
              "Severe itching and secondary skin infections",
              "Stress, insomnia, and reduced productivity",
              "Allergic reactions, especially in children or sensitive individuals",
            ],
          },
          {
            heading: "Our Cimex hemipterus Removal Process",
            paragraphs: [
              "We provide effective, safe, and certified bed bug treatment. Our method includes:",
              "We focus on long-term results, targeting all life stages of Cimex hemipterus from newly hatched nymphs to fully grown adults.",
            ],
            items: [
              "Deep cleaning and high-temperature steam treatment",
              "Application of bed bug treatment in cracks, crevices, and hidden nests",
              "Full-room inspection to locate breeding zones and adult hiding places",
              "Custom treatment plans for homes, hotels, and shared accommodations",
              "Follow-up visits to ensure complete eradication and prevent future outbreaks",
            ],
          },
        ],
      },
      {
        name: "BAT BUGS",
        image:
          "/pests/bedbugs/Close-Up_of_Bat_Bug_Cimex_adjunctus_on_Wood_Surface-D4vq902l.webp",
        headline: "About Bat Bugs (Cimex adjunctus)",
        paragraphs: [
          "Bat bugs look almost identical to young bed bugs, which often leads to misidentification. Though similar to Cimex lectularius, they primarily feed on bats and are usually found in attics, wall voids, or near chimneys where bats nest. When bats leave or die, bat bugs may migrate indoors and bite humans. They don’t spread disease, but can cause itching, irritation, and allergic reactions, requiring prompt action.",
        ],
        sections: [
          {
            heading: "Signs of a Bat Bug Infestation",
            paragraphs: [
              "While they resemble bed bugs, key signs of bat bugs include:",
            ],
            items: [
              "Bites similar to those of bed bugs, especially near the upper body",
              "Presence of bugs near attics, ceiling lights, or vents",
              "Discovery of bat nesting sites in the structure",
              "Evidence of bed bug-like life stages",
              "Persistent bites despite bed bug treatments, which may indicate bat bugs",
            ],
          },
          {
            heading: "Where They Hide and How They Spread",
            paragraphs: ["Bat bugs typically hide in:"],
            items: [
              "Cracks and crevices near ceilings or upper walls",
              "Attics and insulation materials",
              "Around old or inactive bat roosting sites",
              "Ducts or air vents where bats previously nested",
            ],
          },
          {
            heading: "Health Concerns and Irritation",
            paragraphs: [
              "Though bat bugs do not transmit disease, they can still cause:",
            ],
            items: [
              "Red, itchy welts and irritation",
              "Anxiety, stress, and sleep disruption",
              "Ongoing infestation if bat colonies are not removed",
              "Confusion with standard bed bugs, delaying proper pest control",
            ],
          },
          {
            heading: "Effective Bat Bug Control",
            paragraphs: [
              "Removing the bat host and any remaining bat bugs is necessary for effective treatment.",
            ],
            items: [
              "Sealing entry points to exclude bats",
              "Professional attic and wall treatment if infestation is severe",
              "Vacuuming and heat or steam treatments in affected areas",
              "Monitoring for remaining bugs even after host removal",
              "Choosing a pest control team experienced in distinguishing bat bugs from bed bugs",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "RODENTS (Treatment)",
    image: "/pests/rodents/rodents.webp",
    paragraphs: [
      "Rodent control Dubai is for the purpose of keeping rats from returning to properties. Our experts remove breeding places and block all points of entry.",
    ],
    detailHeadline: "Comprehensive Pest Control for Rats in Dubai",
    detailParagraphs: [
      "Rats not only ruin property but also pose serious health risks. Our expert team offers reliable pest solutions tailored to your property’s needs. From residential buildings to large warehouses, we identify the root cause and implement effective treatment plans. Our advanced rodent removal methods stop infestation, nesting, and re-entry. We use eco-friendly approaches that ensure safety without compromising results. Our goal is not just to eliminate visible rats, but to secure your space long-term. Choose Accurate Pest Control Services LLC for expert care, timely service, and peace of mind because rodents don’t belong in your home or business.",
    ],
    guideTitle: "Why Rodent Removal is Important",
    guideIntro: "Rats may be small, but their impact on your home or business is dangerously big.",
    guideItems: [
      "Invade kitchens, basements, ceilings, and offices",
      "Chew through wires risk of electrical fires",
      "Contaminate surfaces with disease-causing bacteria",
      "Spread illnesses like typhoid and leptospirosis",
      "Cause expensive structural damage over time",
    ],
    stepsIntro: "Reliable rodent removal designed for Dubai homes and businesses.",
    steps: [
      {
        title: "First Examination and Detection",
        description:
          "In order to identify possible entry points, nesting locations, and early indicators of rodent activity, our certified specialists thoroughly inspect the whole property. This aids in our comprehension of the problem's scope and the selection of the best control strategies.",
      },
      {
        title: "Customized Removal Method",
        description:
          "After the assessment, we develop a personalized removal strategy that may include safe trapping methods to quickly capture mice in crowded situations, carefully placed bait stations that are secure around pets and children, and sealing openings and structural cracks to stop further entry.",
      },
      {
        title: "Constant Monitoring and Prevention",
        description:
          "We keep an eye on your area to make sure rats don't come back. In order to guarantee long-term protection, our staff rechecks every possible entryway and modifies treatment plans as necessary.",
      },
    ],
    types: [
      {
        name: "HOUSE MOUSE",
        image: "/pests/rodents/Small_House_Mouse_on_Outdoor_Ground-B6KRN0JU.webp",
        headline: "About House Mouse (Mus musculus)",
        paragraphs: [
          "The house mouse is a tiny but highly destructive rodent, commonly found in urban environments, including homes, restaurants, and warehouses. Known for its adaptability and rapid reproduction, the house mouse poses serious health and hygiene risks if not properly managed. Quick pest control is essential to prevent infestation and structural damage.",
        ],
        sections: [
          {
            heading: "Identifying the House Mouse",
            items: [
              "Color: Light brown to gray with a lighter-colored belly.",
              "Legs: Four.",
              "Shape: Small, slender body with a pointed nose and large ears.",
              "Size: Body length about 2.5–4 inches; tail about the same length as the body; weight ranges from 0.5–1 ounce.",
              "Antennae: None.",
              "Region: Found globally, especially in human dwellings.",
            ],
          },
          {
            heading: "Damage and Health Hazards",
            paragraphs: [
              "House mice can cause major problems that require immediate rodent treatment:",
            ],
            items: [
              "Contaminate food and surfaces with droppings and urine",
              "Chew wires and insulation, creating electrical hazards",
              "Spread harmful bacteria like salmonella",
              "Trigger asthma and allergies, particularly in children",
            ],
          },
          {
            heading: "How They Enter and Survive",
            paragraphs: [
              "Mice can enter buildings through openings as small as 6 mm. They typically live:",
            ],
            items: [
              "Indoors: Behind appliances, in attics, basements, and cupboards",
              "Outdoors: In sheds, garages, and gardens, but often enter homes during colder months",
              "Near food and water sources: In kitchens, storage areas, and pantries",
            ],
          },
          {
            heading: "Integrated Pest Solutions",
            paragraphs: [
              "Monitoring, exclusion techniques, and traps are crucial for effective pest control. Cleaning, sealing entryways, and ongoing measures are key parts of rodent treatment.",
            ],
          },
        ],
      },
      {
        name: "ROOF RAT",
        image: "/pests/rodents/Roof_Rat_on_a_Building_Surface-DTjRpoCK.webp",
        headline: "About Roof Rat (Rattus rattus)",
        paragraphs: [
          "The roof rat, also known as the black rat or ship rat, is a sleek and agile rodent commonly found in urban areas. Unlike the Norway rat, the roof rat prefers elevated spaces and nests in roofs, attics, trees, and false ceilings. Its presence poses serious health and safety risks, and prompt rat control is essential to prevent damage and contamination.",
        ],
        sections: [
          {
            heading: "Identifying the Roof Rat",
            items: [
              "Color: Dark brown or black with a brighter underside.",
              "Body length: 6–8 inches; the tail is longer and scaly.",
              "Shape: Slim figure, big ears, sharp nose, and big eyes.",
              "Weight: Around 5–10 ounces.",
              "Habits: Excellent climbers, active mostly at night, and prefer warm, elevated nesting sites.",
            ],
          },
          {
            heading: "Damage and Health Concerns",
            paragraphs: [
              "Roof rats are dangerous rodents that are more than simply annoying. They can:",
            ],
            items: [
              "Chew through electrical wires, creating fire risks",
              "Contaminate food with droppings and urine",
              "Spread illnesses like rat-bite fever, salmonella, and leptospirosis",
              "Destroy insulation, stored materials, and structural components",
            ],
          },
          {
            heading: "Entry Points and Nesting Habits",
            paragraphs: [
              "Roof rats typically enter buildings through:",
              "Once inside, they build nests in insulation, attics, and storage boxes. Unlike ground-dwelling rats, they rarely nest in sewers or basements. Professional pest services can assess these hard-to-reach areas for signs of activity and nesting.",
            ],
            items: [
              "Gaps in roofs, vents, and eaves",
              "Tree branches or utility lines close to homes",
              "Damaged soffits and loose tiles",
            ],
          },
          {
            heading: "Effective Control and Prevention",
            paragraphs: [
              "A multi-layered method is necessary to manage a roof rat infestation:",
            ],
            items: [
              "Use baited rat traps along high ledges, attic beams, and rafters",
              "Seal entry points, prune trees, and remove roof debris",
              "Engage expert pest control for proper assessment and treatment",
              "Sanitize affected areas and monitor for new activity",
            ],
          },
        ],
      },
      {
        name: "BANDICOOT RAT",
        image: "/pests/rodents/Bandicoot_Rat_on_Ground-D6xNxCsr.webp",
        headline: "About Bandicoot Rat (Bandicota bengalensis)",
        paragraphs: [
          "The bandicoot rat is a large, aggressive rodent commonly found in agricultural zones, drains, and city outskirts. Known for its destructive burrowing and bold behavior, this rat species can cause extensive damage to property and crops. Without timely rat control, infestations can grow quickly and become hard to manage.",
        ],
        sections: [
          {
            heading: "Identifying the Bandicoot Rat",
            paragraphs: [
              "Its large size and digging ability make the bandicoot rat one of the most feared rodents in both urban and rural areas.",
            ],
            items: [
              "Color: Dark brown or grayish-black.",
              "Tail length: Nearly equivalent to body length (8–12 inches).",
              "Weight: Up to 1 kilogram.",
              "Build: Stocky body, coarse fur, blunt snout, and prominent incisors.",
              "Behavior: Primarily nocturnal, a strong burrower, and highly aggressive when cornered.",
            ],
          },
          {
            heading: "Health Risks and Structural Damage",
            paragraphs: [
              "Bandicoot rats can wreak havoc on both human health and infrastructure:",
            ],
            items: [
              "Dig complex tunnels under buildings, causing foundation damage",
              "Destroy food storage and grain supplies in bulk",
              "Carry parasites and illnesses like typhus, leptospirosis, and plague",
              "Leave greasy trails, gnaw marks, and powerful odors",
            ],
          },
          {
            heading: "Habitat and Signs of Infestation",
            paragraphs: [
              "Bandicoot rats prefer:",
              "Typical signs include large burrow holes, scattered grain, gnawed wooden surfaces, and loud squeaking sounds. Expert pest services can assess infestation levels and provide a suitable treatment plan.",
            ],
            items: [
              "Open fields, garbage dumps, drains, and abandoned buildings",
              "Wet environments like sewers and canals",
              "Underground burrows near food and water sources",
            ],
          },
          {
            heading: "Professional Control Solutions",
            paragraphs: [
              "Due to their aggressive nature and size, DIY methods are often ineffective. Proper management includes:",
            ],
            items: [
              "Heavy-duty rat traps strategically placed near burrow entrances",
              "Sealing burrow holes and eliminating food sources",
              "Thorough disinfection after removal",
              "Regular inspections and monitoring by trained pest control professionals",
            ],
          },
        ],
      },
      {
        name: "NORWAY RAT",
        image: "/pests/rodents/Norway_Rat_Sitting_Indoors-gE1YlM1e.webp",
        headline: "About Norway Rat (Rattus norvegicus)",
        paragraphs: [
          "The Norway rat, also called the brown rat or sewer rat, is a large, aggressive rodent known for its destructive habits and strong survival instincts. Commonly found in sewers, basements, and ground-level structures, this pest poses a major health and hygiene threat in urban areas. Due to its resilience, the Norway rat requires comprehensive pest solutions to eliminate it effectively.",
        ],
        sections: [
          {
            heading: "Identifying the Norway Rat",
            paragraphs: [
              "These rats are commonly associated with unsanitary environments and are often found near drains, trash areas, and poorly maintained yards.",
            ],
            items: [
              "Color: Brown to gray with a pale underside.",
              "Length: 7–10 inches, with a stout, scaly tail shorter than its body.",
              "Weight: 200–500 grams.",
              "Shape: Stocky build, small ears, and blunt nose.",
              "Behavior: Strong swimmers and burrowers, active mostly at night.",
            ],
          },
          {
            heading: "Risks to Health and Property",
            paragraphs: [
              "Norway rats are one of the most hazardous rodents to coexist with:",
            ],
            items: [
              "Spread diseases like rat-bite fever, leptospirosis, and hantavirus",
              "Contaminate surfaces and food with urine and excrement",
              "Chew through insulation, pipelines, and wires, causing water damage and fire risks",
              "Undermine structural foundations with deep burrowing systems",
            ],
          },
          {
            heading: "Infestation Signs and Nesting Sites",
            paragraphs: [
              "If you observe these signs, you may be dealing with a Norway rat issue:",
              "Norway rats prefer lower levels of buildings and often nest in garbage piles, basements, and sewer systems. Integrated pest management can help address other pests in these environments as well.",
            ],
            items: [
              "Gnaw marks on food containers or wooden surfaces",
              "Burrows along walls, under floors, or around foundations",
              "Greasy smear marks and large droppings, bigger than those of mice",
              "Nocturnal scratching, squeaking, or movement sounds",
            ],
          },
          {
            heading: "Effective Pest Management",
            paragraphs: [
              "Eliminating Norway rats requires more than just traps or repellents. Professionals may use:",
            ],
            items: [
              "Comprehensive inspection and sealing of entry points",
              "Targeted baiting stations and traps",
              "Fumigation for high-level infestations",
              "Frequent inspections by licensed pest control professionals",
              "Sustainable pest management methods for long-term control",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "FLIES (Treatment)",
    image: "/pests/flies/flies.webp",
    paragraphs: [
      "Fly control services help to keep your living space safe, clean, and fly-free by removing places of breeding sites and sanitising important locations.",
    ],
    detailHeadline: "Safe and Effective Flying Insect Protection for Homes and Businesses",
    detailParagraphs: [
      "In the warm, humid environment of Dubai, Sharjah, and Ajman, flying insects such as fruit flies and house flies are more than just a problem. These pests may enter residences, eateries, and workplaces throughout the region, including clinics in Sharjah, cafes in Ajman, and villas in Arabian Ranches. They also breed quickly. Maintaining your reputation, health, and environment requires regular flying bug pest management.",
    ],
    guideTitle: "The Importance of House Fly Control",
    guideItems: [
      "Flies breed rapidly and can turn into a serious health risk if not controlled early.",
      "Store-bought insect repellent is often ineffective against breeding sites & eggs",
      "Various types of flies, such as drain flies, cluster flies, and blowflies, may indicate hidden sanitation issues.",
      "DIY solutions mostly target adult flies and miss eggs, entry points, and nesting zones.",
      "Unchecked infestations can cause hygiene problems, customer complaints, and even closures in commercial areas.",
    ],
    stepsIntro: "We don’t just treat the surface we eliminate the root cause of infestations to ensure long-term relief.",
    steps: [
      {
        title: "Inspection",
        description:
          "Our certified team begins with a full property inspection to identify breeding spots, attractants, and active entry zones. We evaluate garbage areas, drains, kitchen vents, food storage, and windows. This step helps us classify the fly insect species whether it's common house flies, fruit flies, or drain flies and assess the infestation size.",
      },
      {
        title: "Customized Fly Control Treatment Plan",
        description:
          "We implement targeted treatment using industry-approved fly traps, insect light traps, and non-toxic bait stations. For outdoor and high-risk areas, we may also apply localized fogging or spot spraying to reduce adult fly activity. If insects are contributing to the problem, our integrated approach also includes wasp control to keep your base completely insect-free.",
      },
      {
        title: "Ongoing Monitoring",
        description:
          "Post-treatment, our team provides practical advice on waste disposal, airflow control, and sanitation improvements. We also offer monthly maintenance plans to safeguard your space from reinfestation. Our fly control solutions don’t just kill flies they keep them away using proven, proactive methods.",
      },
    ],
    types: [
      {
        name: "HOUSE FLY",
        image:
          "/pests/flies/Close-Up_View_of_a_House_Fly_Resting_on_a_Leaf-DAZ2LLmD.webp",
        headline: "About the House Fly",
        paragraphs: [
          "One of the most widespread indoor pests in Dubai, the house fly is more than a nuisance. It breeds rapidly, feeds on waste, and can spread bacteria and viruses. Flies land on food, kitchen counters, garbage bins, and even skin, contaminating the surfaces they touch. Understanding their habits and how quickly they reproduce is key to stopping an infestation early.",
        ],
        sections: [
          {
            heading: "Symptoms of a Possible House Fly Issue",
            paragraphs: [
              "Wondering if your home or workplace is dealing with a fly issue? Watch out for these signs:",
            ],
            items: [
              "Flies hovering near drains, trash bins, or uncovered food",
              "Constant buzzing or swarming around windows and lights",
              "Clusters of tiny, white eggs in moist or dirty areas",
              "Dark, sticky patches (fly droppings) next to kitchen countertops or sinks",
              "A sudden increase in fly activity in humid or hot weather",
            ],
          },
          {
            heading: "Where They Breed and Multiply",
            paragraphs: [
              "Warm, humid conditions with easy access to organic matter are ideal for house flies. Common breeding zones include:",
              "A house fly's life is short but productive. In just 7–10 days, an egg can become an adult fly, and a single female can lay hundreds of eggs in her lifetime. That’s why immediate action is so critical.",
            ],
            items: [
              "Kitchen trash cans and compost bins",
              "Uncovered food, especially fruits and meats",
              "Drain openings, especially in commercial kitchens",
              "Animal waste or litter areas",
              "Gaps around windows, vents, or doors",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats House Fly Infestations",
            paragraphs: [
              "To eliminate fly problems, our team begins with a full inspection to locate breeding areas, entry points, and contributing conditions before applying treatment.",
              "Our team also educates clients on daily hygiene habits, food storage techniques, and airflow improvements to reduce future risks.",
            ],
            items: [
              "Use of safe, approved sprays and fly bait traps",
              "Targeted treatment for drains, vents, and food zones",
              "Professional sanitation support and prevention strategies",
              "Customized indoor and outdoor fly control plans",
              "Ongoing maintenance and monitoring visits",
            ],
          },
        ],
      },
      {
        name: "CLUSTER FLY",
        image:
          "/pests/flies/Cluster_Fly_Resting_on_Bright_Green_Leaf_Surface-BxZf3aPq.webp",
        headline: "About the Cluster Fly",
        paragraphs: [
          "Often mistaken for house flies, the cluster fly is slower-moving, quieter, and known for gathering in large numbers around windows and storage areas, especially during cooler months. Unlike house flies, cluster flies do not reproduce indoors or feed on garbage; they enter homes seeking warmth and shelter. Though harmless, their large groups and tendency to reappear year after year make them a persistent nuisance for many Dubai residents.",
        ],
        sections: [
          {
            heading: "Signs You May Have a Cluster Fly Problem",
            paragraphs: [
              "Look for these common signs of cluster fly presence:",
            ],
            items: [
              "Flies gather near sunny windows, especially on upper floors",
              "Slow, lazy flying behavior, unlike typical buzzing house flies",
              "Many dead or slow-moving flies in storage spaces",
              "A musty smell that remains over time",
              "Reinfestation during cooler seasons when flies return to shelter",
            ],
          },
          {
            heading: "Where They Hide and Gather",
            paragraphs: [
              "Cluster flies usually enter through small cracks and gaps in walls, roofing, or window frames. Once inside, they hide in large groups in places such as:",
              "During warm winter days, they may become active again, flying toward sunlight and disturbing indoor spaces.",
            ],
            items: [
              "Attics and crawl spaces",
              "Window sills and behind curtains",
              "Inside wall voids or ceiling cracks",
              "Behind picture frames or electrical outlets",
              "Garages and storage sheds",
            ],
          },
          {
            heading: "How to Treat Cluster Fly Infestations",
            paragraphs: [
              "To eliminate these seasonal invaders, Accurate Pest Control Services LLC Dubai uses targeted methods beyond surface-level solutions. Treatment is customized to the size and layout of your property, beginning with a complete inspection of nesting and entry areas.",
              "If needed, our team can also address attic or outdoor entry-point infestations as part of the treatment plan.",
            ],
            items: [
              "Application of long-lasting, low-toxicity insecticides",
              "Sealing of entry points and wall cracks",
              "Vacuum removal of large fly groups and their remains",
              "Preventive outdoor treatments before fly season",
              "Full sanitation advice and support",
            ],
          },
        ],
      },
      {
        name: "FRUIT FLY",
        image:
          "/pests/flies/Fruit_Fly_Standing_on_Soft_Organic_Surface-DIicEmDv.webp",
        headline: "About the Fruit Fly",
        paragraphs: [
          "Small but persistent, the fruit fly is a common invader of kitchens, markets, and restaurants across Dubai. Ripening fruits, vegetables, and sweet leftovers attract these flies, which spread quickly and are challenging to remove. While they don’t bite, their presence is unsanitary and frustrating, especially in food preparation areas where hygiene is critical.",
        ],
        sections: [
          {
            heading: "Signs You May Have a Fruit Fly Problem",
            paragraphs: [
              "Think you might be dealing with fruit flies? Here are some clear warning signs:",
            ],
            items: [
              "Tiny flies hovering near fruit bowls, garbage bins, or sinks",
              "Sour, vinegar-like smell in areas with food residue",
              "Flies emerging from drains or wet mop heads",
              "Increased activity during warmer, humid days",
              "Small clusters of flies in pantries or near open beverages",
            ],
          },
          {
            heading: "Where They Breed and Multiply",
            paragraphs: [
              "Fruit flies lay their eggs in moist, organic matter. Their ideal breeding zones include:",
              "A single female can lay hundreds of eggs, turning a minor problem into a major infestation in a matter of days.",
            ],
            items: [
              "Overripe or fermenting fruits and vegetables",
              "Drains with food residue",
              "Empty bottles, cans, and recyclables",
              "Mops, sponges, and dishcloths left damp",
              "Cracks near food storage areas",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats Fruit Fly Infestations",
            paragraphs: [
              "Our trained fruit fly exterminator team inspects your property to locate hidden breeding grounds, then applies targeted treatment using safe, food-safe solutions.",
              "We not only eliminate visible flies; we break the breeding cycle by targeting eggs and attractants.",
            ],
            items: [
              "Drain and surface treatment with organic-safe insecticides",
              "Removal of attractants and sanitation coaching",
              "Strategic use of fruit fly traps and baits",
              "Deep-cleaning recommendations for kitchens and storage areas",
              "Ongoing prevention and monitoring plans",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "MOSQUITOES (Treatment)",
    image: "/pests/mosquitoes/mosquito.webp",
    paragraphs: [
      "Mosquito fumigation protects your area from future mosquito infestations by destroying adult mosquitoes and focusing on areas where they breed.",
    ],
    detailHeadline: "Best Mosquito Protection for Homes and Businesses",
    detailParagraphs: [
      "In the humid and fast developing environments of Dubai, Sharjah, and Ajman, mosquitoes in Dubai are not just annoying they are a genuine threat to health and comfort. These blood feeding pests thrive in shaded gardens, construction zones, water tanks, and even indoor corners. Whether you're managing a home in Downtown Dubai, a clinic in Sharjah, or an outdoor café in Ajman, mosquitoes can disrupt life and business operations if not controlled professionally.Maintaining hygiene, avoiding illnesses like dengue and malaria, and enhancing the standard of living for both locals and tourists all depend on timely medical care.",
    ],
    guideTitle: "The Importance of Professional Mosquito Treatment",
    guideIntro: "DIY sprays give quick relief but miss breeding sites, making them ineffective long-term.",
    guideItems: [
      "A mosquito fogger can reduce adult mosquitoes briefly, but they’ll return without treating breeding sources.",
      "Standing water in pots, fountains, or tanks allows mosquitoes to breed rapidly targeting larvae is crucial.",
      "Mosquitoes mature in 7–10 days in warm climates, so regular, targeted treatment is key.",
    ],
    stepsIntro: "Our process goes beyond just fogging we eliminate mosquitoes at the breeding level with a strategic, eco conscious approach.",
    steps: [
      {
        title: "Property Inspection and Risk Mapping",
        description:
          "We start by carefully inspecting your property. Our team identifies stagnant water sources, plant-based breeding zones, shady resting areas, and any existing mosquito hotspots. This helps us determine the scope of infestation and the most effective intervention points for a targeted mosquito pest control strategy.",
      },
      {
        title: "Targeted Mosquitoes Control Treatment",
        description:
          "We deploy specific treatment plans using eco-safe agents. This includes larvicides for breeding water, adult mosquito control in resting areas, and targeted fogging where needed to reduce active populations safely.",
      },
      {
        title: "Post-Treatment Monitoring and Maintenance",
        description:
          "To ensure lasting relief, we offer scheduled follow-up visits and monthly plans. These include site checks, prevention measures, and touch-ups to avoid reinfestation. You’ll also receive professional tips on selecting the best mosquito repellent for your property’s specific environment whether for children, pets, or sensitive areas.",
      },
    ],
    types: [
      {
        name: "AEDES MOSQUITO",
        image:
          "/pests/mosquitoes/Aedes_Mosquito_Feeding_on_Human_Skin_Surface-BKw65ZKU.webp",
        headline: "About the Aedes Mosquito",
        paragraphs: [
          "The Aedes mosquito is one of the most concerning mosquito species found in Dubai and across the UAE. Recognizable by its black-and-white striped body and legs, it can carry dengue, chikungunya, and Zika viruses. Unlike many other species, it bites during the day, especially in the early morning and late afternoon, and breeds in clean, stagnant water. Its eggs can survive dry conditions for months, making control challenging without professional intervention.",
        ],
        sections: [
          {
            heading: "Symptoms of a Possible Mosquito Infestation",
            paragraphs: [
              "Think you may have a mosquito problem? Look out for these signs:",
            ],
            items: [
              "Frequent daytime mosquito bites, especially on ankles and arms",
              "Sightings of small, striped mosquitoes flying indoors",
              "Clean water standing in storage tanks, water trays, or plant pots",
              "Larvae (“wrigglers”) visible in water sources",
              "Increased mosquito activity after rainfall or during humid weather",
            ],
          },
          {
            heading: "Where They Breed",
            paragraphs: [
              "Aedes mosquitoes prefer clean water in artificial containers and can breed in very small amounts. Common breeding sites include:",
              "Hundreds of eggs can be laid by a single female, and they hatch within a few days.",
            ],
            items: [
              "Flower pots and plant trays",
              "Buckets, tires, and rooftop tanks",
              "AC trays and open water containers",
              "Bathroom drains and utility areas",
              "Water collected on construction sites",
              "Unused or open containers around gardens or backyards",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats Aedes Mosquito Infestations",
            paragraphs: [
              "We provide science-backed, eco-safe mosquito control treatments. Our experts combine source reduction, adult mosquito control, and preventive strategies to stop Aedes infestations at every stage.",
              "We don’t just kill mosquitoes; we block their life cycle to help keep them from returning.",
            ],
            items: [
              "Targeted spraying with mosquito control products selected for the property",
              "Site-specific advice and installation of barriers or traps in high-risk areas",
              "Recommendations on choosing a mosquito repellent for daily use",
              "Scheduled inspections and follow-up maintenance for long-term protection",
            ],
          },
        ],
      },
      {
        name: "ANOPHELES MOSQUITO",
        image:
          "/pests/mosquitoes/Anopheles_Mosquito_Drawing_Blood_from_Human_Skin-DzK3o2Li.webp",
        headline: "About the Anopheles Mosquito",
        paragraphs: [
          "The Anopheles mosquito is a known malaria vector in many regions. With its slender body, long legs, and angled resting posture, it is sometimes mistaken for a larger mosquito. Unlike Aedes mosquitoes, Anopheles mosquitoes primarily bite at night, making evening protection important.",
          "These mosquitoes breed in still, clear water and are most active from sunset to sunrise. Because females feed on blood to develop eggs, even a small population can pose a health concern without professional help.",
        ],
        sections: [
          {
            heading: "Symptoms of a Possible Anopheles Mosquito Infestation",
            paragraphs: [
              "Watch for these signs of Anopheles mosquito activity:",
            ],
            items: [
              "Mosquito bites at night, usually on bare legs and feet",
              "A sudden increase in mosquito activity after sunset",
              "Long, thin mosquitoes resting with their bodies at an angle",
              "Mosquito eggs in sources of clean, standing water",
              "More mosquito activity after rain or near water bodies",
            ],
          },
          {
            heading: "Where They Breed",
            paragraphs: [
              "Anopheles mosquitoes seek out clean, still water to lay their eggs, especially in outdoor or semi-covered containers. Common breeding grounds include:",
              "Their life cycle can be completed in 7–10 days, and a single female can lay up to 200 eggs at once.",
            ],
            items: [
              "Rain-filled buckets or discarded containers",
              "Water in clogged roof gutters",
              "Slow-draining garden beds and irrigation trays",
              "Pools of water near construction sites",
              "Open water tanks or animal troughs",
              "Water collected in shaded garden areas",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats Anopheles Mosquito Infestations",
            paragraphs: [
              "Our tailored mosquito control strategies combine expert inspection, targeted treatments, and long-term prevention.",
              "Our mission is not just to reduce bites, but to break the breeding cycle.",
            ],
            items: [
              "Thermal fogging and ULV misting for nighttime mosquito control",
              "Treatment of high-risk breeding areas such as water tanks and drains",
              "Biological and chemical solutions selected for the property",
              "Environmental management tips for eliminating breeding grounds",
              "Scheduled visits to monitor activity and prevent resurgence",
            ],
          },
        ],
      },
      {
        name: "CULEX MOSQUITO",
        image: "/pests/mosquitoes/Mosquitos_Flying_Around_Plants_in_Outdoor_Area.webp",
        headline: "About the Culex Mosquito",
        paragraphs: [
          "The Culex mosquito is a common night-biting species found throughout Dubai and the UAE. Though smaller in size, it can pose health risks and is often noticed around homes during the evening.",
        ],
        sections: [
          {
            heading: "Why Culex Mosquitoes Are a Concern",
            paragraphs: [
              "Culex mosquitoes are quiet biters and can carry West Nile virus, encephalitis, and filariasis. Though not aggressive, their disease risk is real.",
            ],
          },
          {
            heading: "How to Identify Culex Mosquitoes",
            items: [
              "Dull-brown body",
              "Small size and low flight",
              "Rest flat on surfaces",
              "Active during dusk and nighttime",
            ],
          },
          {
            heading: "Know the Mosquito Lifecycle",
            paragraphs: [
              "The average Culex mosquito lifespan ranges from 10 days to several weeks. Females can lay hundreds of eggs at once, making infestations difficult to manage without help.",
            ],
          },
          {
            heading: "Signs of a Culex Mosquito Infestation",
            items: [
              "Itchy bites while sleeping",
              "Increased mosquito activity near drains and pipes",
              "Mosquitoes flying low indoors at night",
              "Unpleasant buzzing sounds in bedrooms",
              "Water puddles in gutters or bathrooms",
            ],
          },
          {
            heading: "Where Do Culex Mosquitoes Breed?",
            paragraphs: ["They lay eggs in:"],
            items: [
              "Storm drains and sewer lines",
              "Clogged gutters and irrigation ditches",
              "Birdbaths, pet bowls, and old tires",
              "AC overflow trays and garden puddles",
            ],
          },
          {
            heading: "How We Eliminate Culex Mosquitoes",
            paragraphs: ["Accurate Pest Control Services LLC Dubai offers:"],
            items: [
              "Mosquito fogging for fast relief",
              "Drain and gutter larvicide treatments",
              "Traps in mosquito entry zones",
              "Expert advice for mosquito-proofing your property",
              "Regular service visits to help prevent their return",
            ],
          },
          {
            heading: "Culex Prevention at Home",
            items: [
              "Keep drains clear and dry",
              "Eliminate standing water",
              "Install window and door screens",
              "Keep outdoor areas clean and clutter-free",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "SPIDERS (Treatment)",
    image: "/pests/spiders/spider.webp",
    paragraphs: [
      "Spider control services clean cobwebs, sanitise contaminated areas and maintain a safe and spider-free atmosphere all year long.",
    ],
    detailHeadline: "Safe Home and Business Pest Solutions",
    detailParagraphs: [
      "Creepy crawlies like spiders can disrupt your peace of mind and even pose health risks, especially if species like the Brown Recluse Spider are involved. At Accurate Pest Control Services LLC Dubai, we provide reliable pest control for spiders near me to detect, eliminate, and prevent infestations in both residential and commercial settings. Whether it’s your home, office, or warehouse, our licensed team delivers expert care using safe and targeted methods tailored to your environment.",
    ],
    guideTitle: "How a Pest Exterminator Helps Manage Spider Infestations",
    guideIntro: "Their presence can also indicate a deeper pest issue, like an abundance of other insects they prey on. Here’s why professional pest control matters:",
    guideItems: [
      "Spiders build webs in corners, on ceilings, behind furniture, and in basements.",
      "Infestation may suggest poor sanitation or another pest presence",
      "Venomous spiders like the Brown Recluse may be dangerous if left unchecked",
      "DIY methods rarely eliminate the eggs, leading to fast repopulation",
      "Businesses may face hygiene complaints and customer discomfort",
    ],
    stepsIntro: "We don’t just spray and go our method ensures your property stays spider free for the long term.",
    steps: [
      {
        title: "Complete Property Assessment",
        description:
          "Using advanced tools, our team inspects common spider hotspots such as ceilings, cracks, vents, basements, and storage areas. We identify the type of spider, including dangerous species like the Brown Recluse Spider, and check for related pest issues like ants, flies, or even wasps.",
      },
      {
        title: "Targeted Spider Control Treatment",
        description:
          "We deploy spider specific treatment plans using eco safe agents. This includes vacuuming web clusters, applying targeted insecticides in nesting areas, and sealing entry points. In cases where spiders coexist with other insects, our approach integrates wasp controlmethods to fully secure the premises.",
      },
      {
        title: "Follow-up Monitoring and Prevention",
        description:
          "After the initial treatment, our certified pest exterminator team schedules re-inspections and provides expert guidance on lighting, moisture, and clutter control. We also offer long-term prevention strategies and customized maintenance plans for lasting results.",
      },
    ],
    types: [
      {
        name: "HOUSE SPIDER",
        image: "/pests/spiders/Spider_on_Web_in_Dark_Environment_Close_View.webp",
        headline: "About the House Spider",
        paragraphs: [
          "House spiders are among the most common indoor arachnids found in homes across Dubai. Typically non-aggressive, they often build messy webs in corners, basements, or near ceilings to catch insects. While most are harmless, some species can cause concern because of their fast reproduction and tendency to hide in furniture or storage. Regardless of their level of threat, no one enjoys sharing their home with spiders.",
        ],
        sections: [
          {
            heading: "Signs You May Have a House Spider Problem",
            paragraphs: [
              "Do you think there might be unwanted eight-legged visitors in your space? Look out for these signs:",
            ],
            items: [
              "Cobwebs in room corners or ceiling edges",
              "Frequent spider sightings, especially at night",
              "Egg sacs tucked in undisturbed places",
              "Musty smells in dark storage areas",
              "Insects suddenly disappearing, which may indicate spiders are feeding",
            ],
          },
          {
            heading: "Where They Hide and Multiply",
            paragraphs: [
              "House spiders prefer dark, secluded spots where food sources (insects) are abundant. Common hiding zones include:",
              "Their ability to remain unseen for long periods allows them to grow in number quickly.",
            ],
            items: [
              "Behind furniture and appliances",
              "Inside wall crevices and baseboards",
              "Under staircases and shelves",
              "Near windows, especially with outdoor lighting",
              "In garages, attics, or garden sheds",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats Spider Infestations",
            paragraphs: [
              "Our expert team inspects your property to identify webbing, nesting zones, and egg sacs before beginning treatment. We also educate homeowners on minimizing clutter and reducing indoor insect populations to cut off the spider’s food supply.",
            ],
            items: [
              "Safe, eco-friendly application of professional-grade insecticides",
              "Complete web and egg removal",
              "Entry-point sealing and environmental adjustments",
              "Tailored indoor and outdoor treatment plans",
              "Long-term monitoring and control services",
            ],
          },
        ],
      },
      {
        name: "JUMPING SPIDER",
        image:
          "/pests/spiders/Jumping_Spider_Resting_Calmly_on_Green_Leaf_Surface-DcE_FSQ0.webp",
        headline: "About the Jumping Spider",
        paragraphs: [
          "Unlike web-building species, jumping spiders are active hunters known for their remarkable vision and speed. While small, their sudden leaps and curious movements often catch people off guard. Though generally harmless to humans, their unpredictable behavior and quick movement can make them difficult to manage without professional help.",
        ],
        sections: [
          {
            heading: "Signs of a Jumping Spider Infestation",
            paragraphs: [
              "You may not see webs, but here’s how to tell if jumping spiders are inside your home or workspace:",
            ],
            items: [
              "Frequent sightings of fast-moving, small, hairy spiders",
              "Tiny droppings or insect carcasses left behind",
              "Increased indoor insect activity, which provides prey",
              "Spiders seen jumping on walls, counters, or furniture",
              "Daytime spider activity, which is unusual for other spider types",
            ],
          },
          {
            heading: "Common Hiding Places and Habits",
            paragraphs: [
              "Jumping spiders are solitary creatures that rely on speed and vision to stalk prey. They are commonly found in:",
              "They chase their targets rather than building webs, making their presence difficult to detect until it becomes noticeable.",
            ],
            items: [
              "Window sills and curtain folds",
              "Bookshelves and decorative displays",
              "Under cushions or in shoe racks",
              "Near door frames or ceiling corners",
              "In indoor plants or flowerpots",
            ],
          },
          {
            heading: "Professional Spider Control in Dubai",
            paragraphs: [
              "At Accurate Pest Control Services LLC Dubai, our methods are tailored for active species like jumping spiders. We use targeted techniques to locate hidden spiders and reduce their food sources, including other insects. Whether it’s one spider or a larger infestation, our team works to keep your environment safe and clean.",
            ],
            items: [
              "Detailed property inspections and pest identification",
              "Use of precise, eco-safe pest control agents",
              "Removal of sheltering zones and food sources",
              "Entry-point sealing and long-term deterrent measures",
              "Custom maintenance plans for homes and businesses",
            ],
          },
        ],
      },
      {
        name: "BLACK WIDOW SPIDER",
        image:
          "/pests/spiders/Removing_Spider_Webs_from_Home_Corners_Safely-EAkzEu1S.webp",
        headline: "About the Black Widow Spider",
        paragraphs: [
          "The black widow spider is one of the most venomous spiders found in residential environments. Recognized by its shiny black body and red hourglass marking, it prefers dark, undisturbed areas such as garages, basements, and storage sheds. Bites are rare and usually defensive, but can pose serious health risks, especially to children and older adults, requiring prompt attention.",
        ],
        sections: [
          {
            heading: "Recognizing the Black Widow Spider and Its Web",
            paragraphs: [
              "These spiders are known for building irregular, tangled webs close to the ground or in secluded corners. Here’s how to identify them:",
            ],
            items: [
              "A sleek, glossy black body with a bright or orange abdomen that resembles an hourglass",
              "Females are larger and more dangerous than males",
              "Irregular, messy-looking webs in undisturbed areas",
              "Found in dry, warm locations like sheds, woodpiles, crawlspaces, or outdoor furniture",
            ],
          },
          {
            heading: "Risks and the Need for Prompt Removal",
            paragraphs: [
              "Black widow bites can result in severe pain, nausea, and muscle cramping. While not usually fatal, their venom can lead to medical emergencies. Stay alert, especially in spaces that are not regularly cleaned or monitored. Contact professional pest control for active spider concerns.",
              "Signs of potential infestation include:",
            ],
            items: [
              "Webs with egg sacs (white, papery spheres)",
              "Spider sightings in storage or outdoor areas",
              "Frequent insect activity that may attract web-builders",
              "Previous history of spider issues on the property",
            ],
          },
          {
            heading: "Get Expert Help with Black Widow Spider Control",
            paragraphs: [
              "At Accurate Pest Control Services LLC Dubai, we offer targeted solutions to identify, eliminate, and help prevent future infestations of dangerous species like the black widow.",
            ],
            items: [
              "Safe removal of spiders and egg sacs",
              "Careful inspection of attics, garages, and crawlspaces",
              "Application of approved control agents",
              "Tips for long-term prevention and area maintenance",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "TERMITES (Treatment)",
    image: "/pests/termites/termites.webp",
    paragraphs: [
      "Anti-termite treatments shield your foundation, remove underlying colonies, and stop homes and businesses from suffering structural damage.",
    ],
    detailHeadline: "Anti-Termite Treatment for Homes and Businesses",
    detailParagraphs: [
      "Dealing with termites in house or office? Accurate Pest Control Services LLC, Dubai, offers trusted and effective solutions to protect your property from structural damage. Our licensed professionals locate, treat, and stop termite activity using modern, environmentally safe technology. Whether it's a newly built home or an older property, our customized treatment ensures your investment stays protected.",
    ],
    guideTitle: "Effective Termite Treatment Solutions",
    guideIntro: "Termites may be small, but the destruction they cause is massive and often invisible until it's too late. Here's why timely intervention matters:",
    guideItems: [
      "Invaders that are silent and consume insulation, paper, and wood.",
      "Tunnel through beams, floors, and foundation walls",
      "Often undetected until costly damage is done",
      "Spread fast, especially in humid or poorly ventilated areas",
      "Weaken the residential and commercial buildings' foundational strength",
    ],
    stepsIntro: "Reliable, safe, and long-term solution to Dubai’s environment.",
    steps: [
      {
        title: "Property Inspection and Termite Detection",
        description:
          "Our trained team conducts a thorough inspection of your property using advanced detection tools. We identify signs of termites in home, including mud tubes, hollow sounding wood, and droppings. The secret to reducing harm is early discovery.",
      },
      {
        title: "Anti-Termite Treatment Application",
        description:
          "We apply targeted treatment using industry approved solutions that eliminate termite colonies at their root. Depending on severity, we may use termite spray, soil barriers, or baiting systems all safe for families and pets.",
      },
      {
        title: "Ongoing Protection and Follow-Up",
        description:
          "Our job doesn’t end after the first treatment. We schedule follow-ups to ensure complete extermination and monitor for signs of reinfestation. Whether you're in a villa, apartment, or commercial unit, our termite treatment Dubai services offer peace of mind with every visit.",
      },
    ],
    types: [
      {
        name: "SUBTERRANEAN TERMITES",
        image:
          "/pests/termites/Close-Up_View_of_Subterranean_Termite_on_Outdoor_Surface-MQ0u9Q5k.webp",
        headline: "About Subterranean Termites",
        paragraphs: [
          "Subterranean termites are among the most destructive species, silently invading homes through soil contact and moisture-rich entry points. Often hidden underground or within walls, they form massive colonies that feed on wooden structures around the clock. These termites thrive in dark, moist environments and frequently remain undetected until serious structural damage occurs. Prompt termite service is crucial to protect your home or business from long-term losses.",
        ],
        sections: [
          {
            heading: "Signs of a Subterranean Termite Infestation",
            paragraphs: [
              "Think you may have termites in your home? Watch for these warning signs:",
            ],
            items: [
              "Mud tubes along walls, foundations, or pipes",
              "Hollow-sounding wooden surfaces",
              "Bubbling paint or discolored drywall",
              "Dropped wings near windows or doors",
              "Swollen or distorted wood structures",
            ],
          },
          {
            heading: "Where They Live and How They Invade",
            paragraphs: [
              "As they travel in search of food, subterranean termites build colonies underground and conceal themselves with mud tunnels. Common hiding zones include:",
              "They often enter through structural cracks, plumbing lines, and expansion joints. Once inside, they feed on cellulose-based materials, from beams to books.",
            ],
            items: [
              "Beneath concrete slabs and patios",
              "Inside crawlspaces and foundation gaps",
              "Around leaking pipes or garden irrigation",
              "In poorly ventilated basements",
              "Near wooden furniture touching the floor",
            ],
          },
          {
            heading: "Prevention with Professional Termite Services",
            paragraphs: [
              "Preventing infestation is better than dealing with damage. Accurate Pest Control Services LLC Dubai provides professional inspections and preventative anti-termite treatment to help prevent termites from entering foundations. Foundation barriers and pre-construction soil treatments provide a durable line of defense.",
              "We also offer:",
            ],
            items: [
              "Detailed inspection and detection services",
              "Preventive anti-termite treatment for wood",
              "Customized barrier and baiting systems",
              "Safe, government-approved chemical application",
              "Long-term protection plans for homeowners and contractors",
            ],
          },
        ],
      },
      {
        name: "DRYWOOD TERMITES",
        image:
          "/pests/termites/Drywood_Termites_Colony_Inside_Wood_Structure-BSKy2i_d.webp",
        headline: "About Drywood Termites",
        paragraphs: [
          "Drywood termites do not need contact with soil to survive. These pests live and feed directly within wooden structures, from furniture and floorboards to wall frames and decorative pieces. In dry and warm climates like Dubai, they pose a serious threat to homes, especially where moisture levels are low but wood is abundant.",
        ],
        sections: [
          {
            heading: "Common Signs of a Drywood Termite Infestation",
            paragraphs: [
              "Timely detection can prevent costly damage. Look for:",
            ],
            items: [
              "Small piles of wood-colored droppings (frass)",
              "Hollow-sounding or cracked wooden surfaces",
              "Bubbling paint or unexplained blisters in wood",
              "Tunnels or galleries inside wooden furniture",
              "Discarded wings near windows or wooden structures",
            ],
          },
          {
            heading: "How They Live and Spread",
            paragraphs: [
              "Drywood termites build their colonies directly inside wood, without needing soil moisture. Unlike subterranean species, they don’t require large water sources or ground access. They are commonly found in:",
              "Because the infestation is usually internal, they can spread quietly from one piece of wood to another, especially if furniture is moved or shared.",
            ],
            items: [
              "Antique wooden furniture",
              "Roof timbers and attic beams",
              "Doors, cabinets, and wooden frames",
              "Hardwood floors and decorative trims",
            ],
          },
          {
            heading: "Effective Solutions for Long-Term Protection",
            paragraphs: [
              "Accurate Pest Control Services LLC Dubai provides termite treatments designed specifically for drywood infestations. Our integrated approach includes both prevention and removal:",
            ],
            items: [
              "Precision injection treatments targeting wood cavities",
              "Fumigation for severe, widespread infestations",
              "Surface treatments that penetrate deep into timber",
              "Preventive coatings for new wooden installations",
              "Follow-up inspections to ensure there is no recurrence",
            ],
          },
        ],
      },
      {
        name: "FORMOSAN TERMITES",
        image:
          "/pests/termites/Formosan_Termites_Active_on_Wooden_Surface_Texture-DiarcTnP.webp",
        headline: "About Formosan Termites",
        paragraphs: [
          "Formosan termites are among the most aggressive and damaging types of termites. Originating in Asia, they have spread to warm regions and can quickly cause structural damage in places like Dubai. Formosan colonies are massive and feed around the clock, attacking everything from support beams and flooring to books and insulation.",
          "They can chew through concrete cracks, expand quickly, and remain hidden while doing extensive damage.",
        ],
        sections: [
          {
            heading: "Signs of a Formosan Termite Infestation",
            paragraphs: [
              "Formosan termites frequently go unnoticed until significant harm has been done. Watch out for:",
            ],
            items: [
              "Mud tubes along foundations and walls",
              "Swarmers (winged termites) near lights or windows",
              "Hollowed-out wood with a honeycomb interior",
              "Blistered or sagging wood structures",
              "Damp or mildew smells in wood-rich areas",
            ],
          },
          {
            heading: "Nesting Habits and Spread Patterns",
            paragraphs: [
              "Formosan termites require moisture and typically construct nests underground. However, they can also build aerial nests inside buildings, particularly if there is a nearby water source. They typically invade:",
              "Termites feeding on wood may be a sign of an active infestation.",
            ],
            items: [
              "Foundations and basement walls",
              "Wood near leaking pipes or roofs",
              "Wooden fences, decks, and garden beds",
              "Stored cardboard boxes and paper products",
            ],
          },
          {
            heading: "Control Measures by Expert Termite Exterminators",
            paragraphs: [
              "Due to their colony size and hidden nesting, Formosan termites require a strategic removal plan. Accurate Pest Control Services LLC uses detection and elimination strategies designed to target the colony. Our termite exterminator services include:",
            ],
            items: [
              "Deep-soil and foundation barrier treatments",
              "Baiting systems that target and eliminate colonies",
              "Safe and targeted liquid treatments",
              "High-penetration foam applications for wall voids",
              "Follow-up inspections to ensure eradication",
            ],
          },
        ],
      },
      {
        name: "DAMPWOOD TERMITES",
        image:
          "/pests/termites/Close-Up_View_of_Dampwood_Termite_on_Wood_Surface-C9AOd3Z1.webp",
        headline: "About Dampwood Termites",
        paragraphs: [
          "Dampwood termites prefer wet, decomposing wood and are larger than many termite species. Unlike subterranean termites, they don’t need soil contact, making them a concern in high-humidity environments or homes with plumbing issues. These pests can quietly damage structural beams, door frames, carpets, and furniture.",
        ],
        sections: [
          {
            heading: "How to Spot a Dampwood Termite Infestation",
            paragraphs: [
              "Unlike drywood or Formosan termites, dampwood termites don’t create mud tubes. Watch for these warning signs:",
            ],
            items: [
              "Wood that feels soft or crumbly",
              "Walls or floors that sound hollow",
              "Swarms of large, winged termites near lights",
              "Faint clicking noises from inside walls",
              "Termites inside house structures or damp areas",
            ],
          },
          {
            heading: "Where Dampwood Termites Thrive",
            paragraphs: [
              "They typically nest in:",
              "These termites need moisture, and their presence often points to plumbing leaks, poor ventilation, or water damage. They frequently infest:",
              "They rarely infest dry wood or well-ventilated structures.",
            ],
            items: [
              "Leaky roof wood",
              "Rotten window sills and door frames",
              "Damaged flooring or baseboards",
              "Moist areas around bathrooms or kitchens",
              "Wooden furniture left in moist environments",
              "Carpets exposed to damp conditions",
              "Wood near leaking pipes or roof eaves",
              "Basements with poor drainage",
            ],
          },
          {
            heading: "Effective Treatments and Prevention",
            paragraphs: [
              "Accurate Pest Control Services LLC Dubai uses targeted treatments to neutralize dampwood termite colonies. Our team identifies the moisture source, treats infected wood, and helps prevent recurrence through long-term strategies:",
            ],
            items: [
              "Application of anti-termite treatments in moisture-prone zones",
              "Drying and sealing damaged wood",
              "Replacing damaged wood if its structural integrity is affected",
              "Inspecting and treating the surrounding environment to prevent reinfestation",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "VENOMOUS (Treatment)",
    image: "/pests/venomous/venomous.webp",
    paragraphs: [
      "Venomous pest is aimed at finding and eliminating snakes found around residential areas in a safe manner to avoid bites, concealment, and re-entering.",
    ],
    detailHeadline: "Certified Snake Control for Residential and Commercial Properties",
    detailParagraphs: [
      "Dubai's mix of urban expansion and green areas creates the perfect environment for unexpected snake intrusions, particularly near gardens, construction zones, and storage spaces. Whether you're running a warehouse or living near desert fringes in Arabian Ranches, a surprise encounter with a snake can spark immediate fear and risk. For such reasons, Accurate Pest Control Services LLC Dubai offers quick and dependable snake control treatment services that are tailored to your property's structure and environmental risks. Snakes often slither into properties through foundation cracks, garden gaps, or drainage openings. Some are harmless, but others may be venomous, making fast, professional action crucial for safety.",
    ],
    guideTitle: "Why Snake Control Is Essential",
    guideIntro: "Snake sightings, even non-venomous ones, can cause fear, stress, and hygiene concerns in any home. These reptiles often hide in basements, shaded areas, gardens, or outdoor storage spaces, making them hard to detect. Their droppings and shed skin can lead to sanitation problems and even damage property. Snakes may enter through open vents, cracks, or door gaps. DIY methods are risky and usually ineffective. For safe and reliable removal, it’s best to call professional snake control services.",
    stepsIntro: "Professional and safe snake removal tailored to your property.",
    steps: [
      {
        title: "Site Assessment and Risk Analysis",
        description:
          "We begin with a detailed inspection to identify snake species, habitats, and entry points like gardens, crawlspaces, and storage areas. Understanding these hotspots helps us develop a targeted plan to safely and effectively control snakes on your property.",
      },
      {
        title: "Professional Removal and Targeted Measures",
        description:
          "Once the snake is located and identified, we apply humane removal techniques using approved methods. We prevent re-entry with traps, eliminate food sources like rodents, and apply eco-safe repellents along property perimeters to ensure long-lasting snake control.",
      },
      {
        title: "Ongoing Prevention and Monitoring",
        description:
          "We offer expert advice on sealing openings and enhancing yard hygiene, installing natural deterrents and barriers, and providing follow-up visits. Our snake control services also include optional monthly or quarterly monitoring, perfect for properties near farmlands or green belts.",
      },
    ],
    types: [
      {
        name: "ARABIAN COBRA",
        image:
          "/pests/venomous/Arabian_Cobra_Displaying_Hood_in_Natural_Habitat-DJel6wTG.webp",
        headline: "About the Arabian Cobra",
        paragraphs: [
          "The Arabian cobra is one of the most dangerous venomous snakes found in the Arabian Peninsula, including some outskirts of Dubai. Easily identified by its hooded neck and hissing posture, this snake prefers dry, rocky environments but can occasionally enter human settlements, especially villas near desert landscapes, construction sites, or neglected storage areas.",
          "A cobra on or near your property presents significant health risks, even if sightings are uncommon in central urban areas. Immediate identification and professional handling are critical to avoid bites or panic.",
        ],
        sections: [
          {
            heading: "Signs of an Arabian Cobra Presence",
            paragraphs: [
              "The following indicators may point to a cobra in the area:",
              "A cobra may enter through cracked tiles, drainpipes, or open ventilation holes, especially during warmer months or after rain when it seeks dry refuge.",
            ],
            items: [
              "Shed snake skin in dark corners, basements, or storage sheds",
              "Unusual hissing or rustling noises near outdoor bushes or vents",
              "Snake marks in dust or sand, especially near entrances",
              "Sudden disappearance of rodents, a common prey",
              "Visible droppings in hidden, humid areas",
              "Pets showing distress or barking at specific outdoor spots",
            ],
          },
          {
            heading: "Where They Hide",
            paragraphs: [
              "The Arabian cobra prefers shady, undisturbed areas that provide warmth and protection. In residential or commercial areas, these may include:",
              "Its territorial behavior means repeated sightings in the same area may suggest a nesting site or frequent return.",
            ],
            items: [
              "Under garden decking or stone slabs",
              "Abandoned construction material or wooden planks",
              "Inside broken AC units or pipe openings",
              "Gaps in brickwork, especially around external boundary walls",
              "Piles of dry leaves or lawn clippings",
              "Poorly sealed doorways or basement crawlspaces",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Arabian Cobra Removal",
            paragraphs: [
              "Accurate Pest Control Services LLC Dubai takes reports of cobra sightings seriously. Our specialists use trained snake-management and emergency-response procedures to protect families and pets.",
              "For added protection, we may assess outdoor pest conditions, as prey can attract snakes.",
            ],
            items: [
              "Rapid site inspection and identification of the cobra",
              "Safe, humane capture using professional snake-handling tools",
              "Sealing potential re-entry points and risk areas",
              "Cleaning and surface treatment to remove scent trails",
              "Recommendations for long-term snake deterrence, including habitat changes",
              "Follow-up services in high-risk areas, especially near natural terrain",
            ],
          },
          {
            heading: "Safety First",
            paragraphs: [
              "Never try to trap or irritate a cobra if you think it may be nearby. Keep pets and children indoors and contact a professional emergency pest service.",
            ],
          },
        ],
      },
      {
        name: "SAND BOA",
        image:
          "/pests/venomous/Spotted_Sand_Boa_Resting_on_Desert_Sand_Surface-CFfwCfWn.webp",
        headline: "About the Sand Boa",
        paragraphs: [
          "The sand boa is a non-venomous, burrowing snake commonly found in arid regions like the outskirts of Dubai. Recognized by its short, thick body and blunt tail, this species prefers loose, sandy soil where it can remain hidden beneath the surface. While not dangerous to humans, its sudden appearance in gardens, garages, or desert-facing villas can alarm residents unfamiliar with its behavior.",
          "Because of its discreet, underground lifestyle, sand boa sightings often go unnoticed until the snake surfaces for food or warmth. Early identification and humane removal can help prevent recurring visits or property disturbances.",
        ],
        sections: [
          {
            heading: "Signs of a Sand Boa Infestation",
            paragraphs: ["Though generally shy, sand boas can leave subtle clues:"],
            items: [
              "Shallow tracks in soft soil or garden beds",
              "Small, rounded holes near foundations or pathways",
              "Occasional sightings during early morning or evening",
              "Disrupted landscaping or potted plants",
              "Pet agitation near soil areas or fencing",
              "Dry, scale-like skin sheds in shaded corners",
            ],
          },
          {
            heading: "Where Sand Boas Nest",
            paragraphs: [
              "Sand boas favor warm, dry, and quiet environments. Common nesting sites close to homes or buildings include:",
              "Although they do not pose the same risk as venomous snakes, finding a sand boa indoors can still be a concern, especially in homes with pets or young children.",
            ],
            items: [
              "Sandy garden edges or under decorative stones",
              "Beneath wooden decks or planter boxes",
              "Unused garden sheds or items stored beneath",
              "Dry crawlspaces with loose soil access",
              "Near HVAC foundations or backyard drains",
              "Piles of dried mulch or compost",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Sand Boa Removal",
            paragraphs: [
              "Accurate Pest Control Services LLC Dubai provides humane removal solutions. Our staff use specialized equipment and techniques suited to the snake’s nesting behavior.",
            ],
            items: [
              "On-site inspection to locate and confirm the snake",
              "Safe, live capture using appropriate equipment",
              "Relocation away from residential zones",
              "Identification and sealing of soil entry points or gaps",
              "Tips for maintaining gardens and outdoor spaces to discourage nesting",
              "Optional follow-up visits for properties in sandy or rural zones",
            ],
          },
          {
            heading: "Did You Spot a Snake?",
            paragraphs: [
              "If you suspect a sand boa or another snake around your home, don’t attempt removal yourself. Contact trained experts for secure, professional support.",
            ],
          },
        ],
      },
      {
        name: "ARABIAN HORNED VIPER",
        image:
          "/pests/venomous/Arabian_Horned_Viper_Resting_on_Desert_Sand_Surface-DyKunnkr.webp",
        headline: "About the Arabian Horned Viper",
        paragraphs: [
          "The Arabian horned viper is a venomous, desert-dwelling snake known for the distinctive horn-like scales above its eyes and its ability to move quickly across sandy terrain. Native to arid regions of the Arabian Peninsula, it can occasionally be found near the outskirts of Dubai, especially in desert-adjacent communities, construction zones, or farms.",
          "Because of its hunting technique and natural camouflage, the Arabian horned viper blends into its surroundings. Although it typically avoids human contact, accidental encounters can occur, especially at night or early morning. Due to its venom, an immediate professional response is critical.",
        ],
        sections: [
          {
            heading: "Signs of an Arabian Horned Viper Encounter",
            paragraphs: [
              "Spotting one of these elusive snakes can be challenging. Watch for these signs:",
              "Even a single sighting should be treated with urgency, as this viper’s bite can be medically significant.",
            ],
            items: [
              "Unique winding or sidewinding tracks in soft sand",
              "Burrowed sand pits or indentations near walls and garden edges",
              "Sudden snake sightings near rocks, storage piles, or AC units",
              "Night-time pet distress or barking at shadowed areas",
              "Remains of small prey, such as lizards or rodents, near outdoor corners",
              "Shedding skin or droppings in shaded, rarely visited areas",
            ],
          },
          {
            heading: "Where Arabian Horned Vipers Hide",
            paragraphs: [
              "These snakes prefer hot, dry environments and stay hidden during the day. Common hiding spots include:",
              "Their ability to burrow or remain motionless makes them hard to detect.",
            ],
            items: [
              "Sandy garden borders and landscaping features",
              "Gaps beneath rocks, outdoor steps, or paving slabs",
              "Unsealed perimeter walls or foundation cracks",
              "Unused storerooms or garages with dusty corners",
              "Beneath outdoor furniture, wood piles, or planter boxes",
              "Construction rubble near the property’s edge",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Arabian Horned Viper Cases",
            paragraphs: [
              "Accurate Pest Control Services LLC Dubai follows strict safety procedures for dangerous snake reports, focusing on containment, removal, and preventing future access.",
              "We also educate residents on desert snake behavior and provide seasonal alerts during peak movement months.",
            ],
            items: [
              "Emergency inspection to confirm the species and identify habitat risks",
              "Specialized snake-handling and live-removal equipment",
              "Habitat changes to discourage re-nesting",
              "Targeted pest treatment to reduce prey and attraction",
              "Sealing ground-level entry points and ventilation gaps",
              "Optional long-term monitoring for properties near sandy or desert terrain",
            ],
          },
          {
            heading: "Don’t Risk a Bite. Act Fast.",
            paragraphs: [
              "If you spot a snake with horn-like scales above its eyes or sidewinding tracks, call a professional immediately. Do not try to remove it yourself.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "BIRDS (Treatment)",
    image: "/pests/birds/bird.webp",
    paragraphs: [
      "Bird control handles nests, droppings, and roosting areas safely with humane deterrents to guard rooftops, vents, and rooftop property areas.",
    ],
    detailHeadline: "Managing a Bird's Life Cycle with Expert Bird Control",
    detailParagraphs: [
      "From city balconies in Dubai to villa rooftops in Sharjah, birds can quickly turn into a major nuisance. Whether it’s pest pigeons roosting on ledges or sparrows nesting in air ducts, the resulting droppings, noise, and property damage require immediate professional intervention. At Accurate Pest Control, we offer reliable bird control in Dubai that safeguards your home, garden, or commercial premises. Bird infestations are common across the UAE, especially in high-rise structures, warehouses, and heritage sites. Nesting materials and acidic droppings not only spoil building exteriors but can also transmit bacteria and parasites. Our goal is not only to remove but to humanely deter and prevent re-entry using science-backed strategies.",
    ],
    guideTitle: "Why Bird Pest Control Dubai Services Matter",
    guideIntro: "Bird problems in urban areas are more than a nuisance and they pose serious health and property risks if not handled properly.",
    guideItems: [
      "Pigeons, crows, and other birds nest year-round and adapt quickly",
      "Droppings damage buildings and carry harmful bacteria",
      "DIY methods often fail and may break local wildlife laws",
      "Noise, feathers, and nests add to the mess and stress",
    ],
    stepsIntro: "Safe and reliable bird control designed for your space.",
    steps: [
      {
        title: "Bird Activity Assessment",
        description:
          "We start with a detailed survey to identify bird species, nesting zones, and entry points like rooftops, chimneys, and balconies. This allows us to create a tailored bird control plan designed specifically for effective protection across Dubai properties.",
      },
      {
        title: "Tailored Bird Deterrent Solutions",
        description:
          "We use eco-friendly, approved bird deterrents like spikes, netting, and motion-activated systems tailored to your infestation. Safe for pets and wildlife, our solutions also include cleanup services to remove droppings and sanitize all affected areas thoroughly.",
      },
      {
        title: "Monitoring and Long-Term Prevention",
        description:
          "Our bird control team in Dubai offers more than treatment, and we provide ongoing monitoring, seasonal inspections, and education. We help reduce attractants through waste control, block nesting sites, and install lasting deterrents, protecting families from health risks and bird aggression.",
      },
    ],
    types: [
      {
        name: "COMMON MYNA",
        image:
          "/pests/birds/Close-Up_of_a_Common_Myna_Bird_on_Park_Bench-DlnJQH0G.webp",
        headline: "About the Common Myna",
        paragraphs: [
          "One of the most common birds in Dubai, the Common Myna can be identified by its brown body, black head, and bright yellow legs and eye patches. Though these birds may seem harmless at first, they can create problems in urban and suburban environments. Aggressive nesters, mynas may compete with local bird species for nesting locations and food.",
          "In commercial areas, especially food establishments and residential balconies, their droppings can damage surfaces, transmit disease, and create health code concerns. Their loud, harsh calls can also become a persistent nuisance for homeowners and businesses.",
        ],
        sections: [
          {
            heading: "Signs of a Myna Bird Infestation",
            paragraphs: [
              "Their presence can lead to sanitation concerns, especially near HVAC units, food-preparation areas, or balconies where droppings can corrode surfaces or invite parasites.",
            ],
            items: [
              "Nesting materials in gutters, rooftops, or signboards",
              "Droppings on pavements, window sills, or air conditioners",
              "Aggressive bird behavior around food waste or pet bowls",
              "Damaged outdoor wiring or blocked drainage systems",
            ],
          },
          {
            heading: "Where Common Mynas Nest",
            paragraphs: [
              "Because of their adaptability, mynas often thrive in environments changed by humans. Typical nesting or perching areas include:",
              "Their nests are built from twigs, paper, and plastic, which can lead to clogs or fire hazards.",
            ],
            items: [
              "Rooftop air-conditioning units and vents",
              "Billboards, signboards, and building ledges",
              "Cracks in walls or under eaves",
              "Electric poles, balconies, and garden trees",
              "Open garages or warehouse structures",
              "Parking lots and open trash bins",
            ],
          },
          {
            heading: "How Accurate Pest Control Treats Myna Bird Infestations",
            paragraphs: [
              "Accurate Pest Control Services LLC Dubai uses responsible bird-control techniques designed for urban birds. Gentle deterrent methods help discourage future nesting as well as address current activity.",
              "Methods are selected to follow applicable Dubai Municipality wildlife protection guidelines.",
            ],
            items: [
              "Installation of anti-roosting spikes and shock tracks",
              "Bird netting for rooftops, vents, and balconies",
              "Motion-activated bird repellents and sonic deterrents",
              "Cleaning and disinfecting affected surfaces",
              "Nest removal and sealing of entry points",
              "Long-term monitoring and maintenance contracts",
            ],
          },
        ],
      },
      {
        name: "HOUSE SPARROW",
        image:
          "/pests/birds/House_Sparrow_Resting_on_a_Branch_in_Natural_Habitat-Cd4R0ley.webp",
        headline: "About the House Sparrow",
        paragraphs: [
          "The house sparrow is one of the most widespread bird species found in urban Dubai. Small, brown-grey, and highly adaptable, these birds commonly nest around rooftops, windows, AC units, and inside wall cavities. While seemingly harmless, sparrow infestations can lead to hygiene problems, property damage, and excessive noise, especially in commercial buildings.",
          "Beyond the chirping and clutter, they may attract parasites and cause blockages in drains or vents, making proper management important for a clean and safe environment.",
        ],
        sections: [
          {
            heading: "Symptoms of a House Sparrow Infestation",
            paragraphs: [
              "These signs may indicate an ongoing or developing issue requiring expert bird-removal services:",
            ],
            items: [
              "Droppings on window frames or under nesting areas",
              "Straw, feathers, or paper in vents or eaves",
              "Persistent chirping, especially at dawn or dusk",
              "Bird-mite bites indoors",
              "Damage to insulation or wires in walls and ceilings",
              "Foul odor from decaying nesting material",
              "An increase in pest insects attracted to droppings",
            ],
          },
          {
            heading: "Where House Sparrows Nest",
            paragraphs: [
              "Sparrows prefer enclosed, elevated spots with warmth and access to food. Common nesting locations include:",
              "They are persistent and can return unless effectively deterred.",
            ],
            items: [
              "Rooftop gutters or rainwater pipes",
              "Holes in walls or broken air vents",
              "Behind signage or AC compressor units",
              "Ceiling panels in warehouses",
              "Garage rafters or open attic spaces",
              "Outdoor lighting fixtures",
              "Eaves and balconies of residential buildings",
            ],
          },
          {
            heading: "How Accurate Pest Control Removes House Sparrows",
            paragraphs: [
              "Effective bird control involves humane practices, legal compliance, and long-term prevention. Our experts aim to minimize disruption while delivering lasting results.",
            ],
            items: [
              "Professional bird-repeller device installation, using physical deterrents where appropriate",
              "Cleaning and removing nests to reduce germs and insects",
              "Structural sealing to block future nesting spots",
              "Reflective deterrents or spike strips on ledges and sills",
              "Removal strategies tailored to location and infestation level",
              "Education and awareness for homeowners or building managers",
            ],
          },
        ],
      },
      {
        name: "PIGEONS",
        image:
          "/pests/birds/Pigeon_Standing_on_Ledge_in_an_Urban_Outdoor_Area-DCjSuWtl.webp",
        headline: "About Pigeons",
        paragraphs: [
          "Pigeons are among the most common nuisance birds found across Dubai. They thrive in residential and commercial environments, often nesting on building ledges, rooftops, and air-conditioning units. Their droppings, feathers, and nesting debris can pose health risks.",
          "Pigeons are persistent and territorial, returning to the same nesting sites repeatedly unless effective deterrents are installed.",
        ],
        sections: [
          {
            heading: "Signs of a Pigeon Infestation",
            paragraphs: [
              "Left untreated, pigeons can carry mites, fungi, and bacteria into living or working spaces.",
            ],
            items: [
              "White droppings on ledges, windows, or driveways",
              "Nests made of sticks, feathers, and debris under roofs or balconies",
              "Foul odor from accumulated waste",
              "Frequent cooing sounds, especially in the early morning",
              "Damaged ventilation systems or clogged drains",
              "Visible pigeon egg clusters in hidden areas",
            ],
          },
          {
            heading: "Pigeon Lifespan and Reproduction",
            paragraphs: [
              "A typical pigeon lifespan is 3 to 5 years in the wild, but it can reach 15 years in protected urban environments. Pigeons reproduce year-round in Dubai’s climate, with each female laying 1–3 eggs per clutch. Their reproduction rate and longevity mean infestations can grow quickly if not professionally managed.",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Pigeon Problems",
            paragraphs: [
              "Our bird-control technicians use a systematic approach to deal with pigeons safely and humanely. Each treatment is tailored to the property and infestation level.",
            ],
            items: [
              "Site inspection to assess nesting zones and damage",
              "Nest and egg removal in compliance with UAE guidelines",
              "Installation of physical deterrents like spikes and nets",
              "Eco-safe pigeon-repellent systems",
              "Sanitization and disinfection of contaminated areas",
              "Long-term exclusion strategies to prevent return",
            ],
          },
          {
            heading: "The Importance of Pigeon Control",
            paragraphs: [
              "In densely populated areas like Dubai, pigeons can quickly become a major problem. Their acidic droppings can destroy metal fittings, damage paint, and stain windows, eventually requiring expensive maintenance and repairs.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "LIZARDS (Treatment)",
    image: "/pests/lizards/lizard.webp",
    paragraphs: [
      "Lizard eradication involves the use of safe repelling to clear walls, ceilings, and rooms of lizards by means of their approved repelling agents.",
    ],
    detailHeadline: "Safe, Targeted, and Eco-Friendly Solutions for Homes and Businesses",
    detailParagraphs: [
      "Homes, villas, and commercial buildings in Dubai are ideal for lizard activity due to the city's warm climate and numerous hiding places. Whether you're managing a restaurant in JLT or living in a high-rise apartment in Downtown Dubai, the unexpected appearance of a lizard on your wall or near your pantry can be unsettling. That’s why Accurate Pest Control Services LLC Dubai offers comprehensive lizard pest control Dubai services tailored to your property’s needs. Lizards frequently get into small openings to find food and water. They can nest behind furniture, in ceiling gaps, or near kitchen sinks, creating hygiene concerns, especially in food handling areas.",
    ],
    guideTitle: "Why Lizard Control Is Important",
    guideIntro: "Lizard infestations may seem harmless, but they can lead to hygiene concerns and discomfort in your living space.",
    guideItems: [
      "Feed on insects, especially in warm, humid areas",
      "Droppings can stain walls and contaminate kitchen surfaces",
      "DIY sprays give short-term relief but may harm pets or kids",
      "Frequent sightings may reveal gaps, open windows, or vents",
    ],
    stepsIntro: "Safe and effective lizard removal customized for your property.",
    steps: [
      {
        title: "Inspection and Site Mapping",
        description:
          "We assess infestation severity and locate lizard entry points, like cabinets, AC ducts, and outdoor cracks. Identifying these common hiding spots helps us create a customized lizard control plan that effectively removes them and prevents future invasions on your property.",
      },
      {
        title: "Strategic Removal and Eco Treatment",
        description:
          "We use safe, non-toxic repellents, sticky traps, and outdoor sealing based on your property layout and infestation level. Our lizard control ensures minimal disruption while targeting both the root cause and visible activity for lasting, effective, and safe protection.",
      },
      {
        title: "Follow-Up and Prevention",
        description:
          "Beyond eliminating lizards, we prevent their return through follow-up visits, pest-proofing advice, and tips to reduce insect populations, their main food source. Our post-treatment approach ensures long-term protection and a consistently pest-free environment for your comfort and safety.",
      },
    ],
    types: [
      {
        name: "HOUSE GECKO",
        image:
          "/pests/lizards/House_Gecko_on_Wall_Surface_with_Distinct_Orange_Spots.webp",
        headline: "About the House Gecko",
        paragraphs: [
          "The house gecko is a common reptilian intruder in Dubai homes and buildings, easily recognized by its small, agile body, sticky feet, and nocturnal activity. These creatures also help reduce insect populations. However, their sudden appearance indoors, especially in kitchens or bedrooms, often raises concerns about hygiene, odor, and cleanliness.",
          "House gecko sightings usually increase during warmer months, when open windows or cracks invite them inside. While they don’t pose direct harm to humans, their droppings, shed skin, and eggs can cause concern, especially in food-related or hospitality environments.",
        ],
        sections: [
          {
            heading: "Signs of a House Gecko Infestation",
            paragraphs: [
              "House geckos are not deadly, but their presence can indicate easy access to insect food or structural entry points:",
            ],
            items: [
              "Frequent chirping or clicking sounds at night",
              "Small black droppings with white tips near windows or walls",
              "Eggs hidden in corners, behind appliances, or under furniture",
              "Shed skin flakes near warm lights or air vents",
              "Rapid movement along ceilings or wall corners when lights turn on",
              "Stains or smudges where geckos have been nesting or crawling",
            ],
          },
          {
            heading: "Where They Nest",
            paragraphs: [
              "House geckos prefer warm, sheltered environments that provide safety and a steady insect food source. Common nesting spots include:",
              "These creatures are mostly active at night and can enter through small openings, so proper sealing is important.",
            ],
            items: [
              "Inside light fixtures and lamp covers",
              "Behind photo frames or wall décor",
              "Air-conditioning units or ceiling corners",
              "Cracks in tiles or wooden flooring",
              "Cardboard storage boxes or under appliances",
              "Outdoor light sources that attract prey insects",
            ],
          },
          {
            heading: "How Accurate Pest Control LLC Treats House Gecko Infestations",
            paragraphs: [
              "At Accurate Pest Control Services LLC Dubai, we combine habitat disruption and humane exclusion techniques to help keep homes lizard-free. Treatments are selected to be safe for children and pets while driving geckos out without harming them.",
            ],
            items: [
              "Thorough examination of the property to identify nesting and egg-laying areas",
              "Safe chemical and natural deterrents applied to entry points",
              "Sealing cracks and gaps in walls, windows, and air vents",
              "Installing non-invasive lizard-repelling devices where appropriate",
              "Cleaning droppings and using deodorizers to remove scent paths",
              "Long-term follow-up service for persistent locations",
            ],
          },
        ],
      },
      {
        name: "MEDITERRANEAN GECKO",
        image:
          "/pests/lizards/Mediterranean_Gecko_Resting_on_Indoor_Wall_Surface-CzmUYJQ3.webp",
        headline: "About the Mediterranean Gecko",
        paragraphs: [
          "The Mediterranean gecko is widespread in Dubai and commonly seen clinging to walls, ceilings, and windows during warm nights. Known for its translucent skin, sticky toe pads, and fast movements, it can become a concern in homes or offices if not managed.",
          "While geckos help reduce insect populations, their presence indoors can be alarming. Like other geckos, the Mediterranean variety hides during the day and becomes active at night, often drawn to artificial lights where prey insects gather.",
        ],
        sections: [
          {
            heading: "Signs of a Mediterranean Gecko Problem",
            paragraphs: [
              "If you notice these signs, they may indicate a growing gecko population in or around your property:",
            ],
            items: [
              "Regular sightings of pale, spotted lizards on walls or windows",
              "Chirping or squeaky sounds during the night",
              "Droppings that resemble small dark pellets with white tips",
              "Shedding skin flakes in corners or near lighting fixtures",
              "Stains or tail marks on paint, curtains, or wallpaper",
              "Nesting behind picture frames, AC vents, or electrical boxes",
            ],
          },
          {
            heading: "Where Mediterranean Geckos Hide",
            paragraphs: [
              "Mediterranean geckos are resilient and adaptive. They prefer dry, warm, and dim places that offer easy access to insects. Common hiding spots include:",
            ],
            items: [
              "Outdoor light fixtures that attract insects",
              "Small gaps in walls or window frames",
              "Behind electrical appliances or AC ducts",
              "Under furniture or inside cardboard storage boxes",
              "Inside cracks in ceilings or tiled walls",
              "Near garden areas where other insects are present",
            ],
          },
          {
            heading: "How We Control Mediterranean Gecko Infestations",
            paragraphs: [
              "At Accurate Pest Control Services LLC Dubai, we offer solutions to manage gecko infestations efficiently while minimizing environmental impact. We may combine this service with other pest-control solutions to address additional food sources.",
            ],
            items: [
              "Full inspection of the property structure and exterior",
              "Application of eco-safe deterrent sprays and gels",
              "Closing off entry points, cracks, and wall gaps",
              "Humidity and light-source management to reduce attraction",
              "Use of humane traps and gecko-repelling technology",
            ],
          },
        ],
      },
      {
        name: "YELLOW-BELLIED HOUSE GECKO",
        image:
          "/pests/lizards/Yellow-bellied_House_Gecko_on_Dark_Background-BLY8swcg.webp",
        headline: "About the Yellow-Bellied House Gecko",
        paragraphs: [
          "The yellow-bellied house gecko is a small, agile lizard that commonly enters Dubai homes, especially at night. Its pale yellow underside, sticky toes, and quick movement across walls and ceilings are characteristic features. Though not harmful to humans, its presence can be unsettling and may indicate a larger insect population nearby.",
        ],
        sections: [
          {
            heading: "Why You Might Be Seeing Geckos Indoors",
            paragraphs: [
              "Geckos usually enter homes to find insects, warmth, and secure hiding places. Outdoor lights, open vents, or cracked windows may attract both insects and geckos. Like the house gecko, the yellow-bellied variety follows insects such as moths, ants, and small roaches, and may nest in dark crevices or behind furniture.",
            ],
          },
          {
            heading: "Key Signs of a Yellow-Bellied Gecko Infestation",
            paragraphs: [
              "These signs may indicate gecko activity around your property:",
            ],
            items: [
              "Multiple sightings of pale or yellow-bellied lizards indoors",
              "Small droppings near walls and windowsills",
              "Chirping or clicking sounds at night",
              "Shed skin flakes around baseboards or light fixtures",
              "Footprints or smudges near ceiling lights or wall corners",
            ],
          },
          {
            heading: "Where They Hide and Thrive",
            paragraphs: [
              "Yellow-bellied geckos prefer warm, sheltered, insect-rich environments. Common hiding places include:",
              "Similar behaviors can occur in other small tropical lizards, though the yellow-bellied gecko is prevalent in UAE homes.",
            ],
            items: [
              "Behind wall clocks, paintings, or loose wallpaper",
              "Inside cabinets, under appliances, and around electrical outlets",
              "Around indoor gardens or potted plants",
              "In ceiling cracks, attic spaces, or AC ducting",
            ],
          },
          {
            heading: "Our Professional Gecko Control Approach",
            paragraphs: [
              "At Accurate Pest Control LLC, our lizard-control specialists follow a process to safely and effectively remove geckos. Customized plans help keep homes lizard-free.",
            ],
            items: [
              "Detailed examination of the interior and exterior to identify hiding places",
              "Sealing entry points to eliminate access routes",
              "Non-toxic repellents designed for geckos and other lizards",
              "Insect-source elimination to cut off their food supply",
              "Ongoing monitoring and prevention strategies",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "TICKS (Treatment)",
    image: "/pests/ticks/tick.webp",
    paragraphs: [
      "Tick treatment is a safe method used to treat lawns, pet areas, and the inside of houses to kill eggs and adult ticks before they infect humans.",
    ],
    detailHeadline: "Certified Tick Control for Residential and Commercial Properties",
    detailParagraphs: [
      "Dubai’s warm climate and expanding greenery create an ideal environment for ticks to thrive, especially in shaded gardens, pet zones, and landscaped villas. Whether you're managing a veterinary clinic or living in a family home, encountering a tick insect on your pet or skin can be a serious concern. That’s why Accurate Pest Control Services LLC Dubai offers swift, professional tick pest control services tailored to your property's layout, exposure, and risk level.Ticks may cling to pet fur, clothing, or outdoor furniture and make their way into indoor spaces. Because they feed on blood, their bites can lead to skin irritation or even disease transmission, making fast and expert removal crucial for safety.",
    ],
    guideTitle: "Why Tick Control Is Essential",
    guideIntro: "Ticks may be tiny, but they pose serious risks to your family and pets. Quick action is key to avoid infestation and health concerns.",
    guideItems: [
      "Hide in tall grass, gardens, and outdoor seating areas",
      "Feed for hours without being noticed",
      "Carry diseases that affect both humans and pets",
      "Insect repellents offer limited protection",
      "DIY sprays don’t stop the breeding cycle",
      "Professional tick control ensures safe, long-term results",
    ],
    stepsIntro: "Safe and targeted tick removal, perfect for any space.",
    steps: [
      {
        title: "Site Assessment and Risk Analysis",
        description:
          "We begin with a detailed inspection to find tick breeding grounds, like pet areas, garden edges, and under furniture. This helps us design a customized tick removal plan tailored to your property’s specific exposure risks and infestation conditions.",
      },
      {
        title: "Targeted Treatment and Eco-Friendly Application",
        description:
          "Following assessment, we use professional tick repellents and surface treatments around fences, patios, and pet zones. We eliminate tick habitats by clearing tall grass and mulch. Certified treatments target both adult ticks and eggs for lasting, safe protection.",
      },
      {
        title: "Monitoring, Advice, and Prevention",
        description:
          "Post-treatment, we emphasize prevention with expert landscaping tips, pet care advice, and seasonal follow-ups. We recommend tick collars or vet-approved solutions, while also educating homeowners on early detection and year-round strategies to keep their homes tick-free and safe.",
      },
    ],
    types: [
      {
        name: "DEER TICK",
        image: "/pests/ticks/Tick_Insect_Crawling_on_Leaf_Surface_in_Dubai.webp",
        headline: "About the Deer Tick",
        paragraphs: [
          "The deer tick, also known as the black-legged tick, is a small parasitic arachnid known to spread diseases such as Lyme disease. In Dubai’s green areas, villa gardens, and pet-friendly communities, these ticks can pose a hidden threat, especially in landscaped properties, parks, and animal shelters.",
          "Despite their small size, deer ticks can be dangerous because they move silently and may go unnoticed. A tick bite can cause irritation, infection, or illness if not identified early. Prompt inspection and targeted control are important to protect your health and home.",
        ],
        sections: [
          {
            heading: "Signs of a Deer Tick Infestation",
            paragraphs: [
              "These ticks are often active during cooler parts of the day or in shady areas. Signs may include:",
              "Ticks can cling to clothing, fur, or skin and remain attached for long periods.",
            ],
            items: [
              "Itchy or inflamed bite marks, particularly on ankles or behind knees",
              "Ticks attached to pet fur or bedding",
              "Unusual scratching or discomfort in animals",
              "Small reddish-brown insects on curtains, walls, or carpets",
              "Tick clusters in tall grass or garden soil",
            ],
          },
          {
            heading: "Where They Hide",
            paragraphs: [
              "Deer ticks prefer shaded, humid environments and areas frequented by animals or people. Common hiding spots include:",
              "Even a clean home can have ticks brought in by pets or outdoor visitors.",
            ],
            items: [
              "Dense garden vegetation or long grass",
              "Pet bedding, kennels, and shaded corners of yards",
              "Under wooden decks, logs, or garden furniture",
              "Cracks in flooring or carpets in pet-accessible areas",
              "Piles of leaves, compost, or overgrown shrubs",
              "Around water hoses, fountains, or pet drinking areas",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Deer Tick Removal",
            paragraphs: [
              "Our expert team uses eco-safe treatments and long-term tick elimination strategies. Control plans are designed to break the tick life cycle and help stop repeat infestations while protecting children, pets, and the environment.",
            ],
            items: [
              "Full-property inspection to identify tick habitats and hosts",
              "Safe application of approved pesticides and repellents in tick zones",
              "Treatment of pet-accessible areas using suitable solutions",
              "Environmental changes such as trimming overgrowth and removing debris",
              "Sealing potential re-entry zones and nesting gaps",
              "Scheduled follow-up visits during peak tick season",
            ],
          },
          {
            heading: "Safety First",
            paragraphs: [
              "If you suspect a deer tick infestation, avoid scratching the affected area and seek professional help. Don’t attempt to remove an embedded tick without proper tools or technique, as improper removal may lead to infection.",
            ],
          },
        ],
      },
      {
        name: "LONE STAR TICK",
        image:
          "/pests/ticks/Lone_Star_Tick_Crawling_on_Yellow_Surface-VEZTrnUF.webp",
        headline: "About the Lone Star Tick",
        paragraphs: [
          "The Lone Star tick is an increasingly common parasite in outdoor green spaces, including grassy gardens, wooded areas, and animal shelters in Dubai. It is easily recognized by the distinctive white dot on the female’s back and is known for its painful bite and potential to spread diseases such as ehrlichiosis and Southern tick-associated rash illness (STARI).",
          "Although more common around pets and livestock, people who work in landscaping, gardening, or animal handling can also be at risk. Infestations may go unnoticed until symptoms such as rashes or fatigue appear, making early inspection important.",
        ],
        sections: [
          {
            heading: "Signs of a Lone Star Tick Infestation",
            paragraphs: [
              "Ticks are small and often hidden. These signs may point to their presence:",
              "Ticks may attach to people and pets unnoticed and prefer moist, shady areas. Their bites can spread germs and trigger allergic reactions.",
            ],
            items: [
              "Pets constantly scratching or biting their skin",
              "Round bite marks or reddish bumps on exposed skin",
              "Tiny dark-colored insects in pet fur or on furniture",
              "Wildlife, such as stray cats or rodents, that may carry ticks",
              "Engorged ticks near pet beds, garden tools, or shoes",
              "Itchy skin irritation, especially after outdoor activity",
            ],
          },
          {
            heading: "Where Lone Star Ticks Hide",
            paragraphs: [
              "These pests are skilled at staying out of sight, usually nesting in:",
              "Tick control can be a useful preventive service, particularly for homes with outdoor pets or backyard activity zones.",
            ],
            items: [
              "Tall grasses and overgrown lawns",
              "Dog kennels, barns, and sheds",
              "Cracks in patios or garden retaining walls",
              "Leaf litter, compost heaps, or mulch beds",
              "Under outdoor furniture cushions or mats",
              "Wildlife trails or pet pathways",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Lone Star Tick Removal",
            paragraphs: [
              "At Accurate Pest Control Services LLC Dubai, we treat ticks and their breeding grounds with targeted methods and pet-safe technology. Habitat changes, such as trimming vegetation and fencing pet zones, can also reduce future tick activity.",
            ],
            items: [
              "Inspection of the entire property to find risk factors and tick nests",
              "Application of eco-conscious acaricides (tick-specific treatments)",
              "Targeted yard and perimeter treatment, especially around pet areas",
              "Sealing entryways where ticks may hitchhike inside",
              "Treatment targeting tick eggs and larvae to interrupt their life cycle",
              "Follow-up guidance and monitoring for recurrence",
            ],
          },
          {
            heading: "Safety First",
            paragraphs: [
              "Ticks may seem small, but their health impact can be serious. Avoid home remedies or over-the-counter chemicals that may harm pets or fail to kill eggs. Consult licensed tick-control experts for complete protection.",
            ],
          },
        ],
      },
      {
        name: "BROWN DOG TICK",
        image: "/pests/ticks/tick.webp",
        headline: "About the Brown Dog Tick",
        paragraphs: [
          "The brown dog tick is one of the most persistent tick species in urban environments, particularly in homes, kennels, and pet-care facilities throughout Dubai. Since this species can live its whole life cycle indoors, it can be particularly difficult to eliminate once an infestation has started. Its reddish-brown, flat body becomes engorged after feeding on a dog’s blood, often going unnoticed until the infestation grows.",
          "This tick primarily targets dogs but may occasionally bite humans. Left untreated, it can transmit infections such as canine ehrlichiosis and babesiosis.",
        ],
        sections: [
          {
            heading: "Signs of a Brown Dog Tick Infestation",
            paragraphs: [
              "These ticks are stealthy but not invisible. Watch for the following signs:",
              "Ticks may cling to people and pets unnoticed. If bites are not addressed, they can spread germs and trigger allergic reactions.",
            ],
            items: [
              "Pets constantly scratching or biting their skin",
              "Round bite marks or reddish bumps on exposed skin",
              "Tiny dark-colored insects in pet fur or on furniture",
              "Ticks around pet resting areas or bedding",
              "Engorged ticks near pet beds, garden tools, or shoes",
              "Itchy skin irritation, especially after outdoor activity",
            ],
          },
          {
            heading: "Where Brown Dog Ticks Hide",
            paragraphs: [
              "Unlike many tick species, brown dog ticks can complete their life cycle indoors. They may hide in:",
            ],
            items: [
              "Dog bedding, kennels, and pet resting areas",
              "Cracks and crevices near floors and baseboards",
              "Furniture and carpets in areas pets frequent",
              "Outdoor shelters and shaded areas around the home",
            ],
          },
          {
            heading: "How Accurate Pest Control Handles Brown Dog Tick Removal",
            paragraphs: [
              "At Accurate Pest Control Services LLC Dubai, we combine property inspection, targeted treatment, and pet-safe practices to remove ticks and reduce the chance of recurrence.",
            ],
            items: [
              "Inspection of the property to find tick habitats and risk factors",
              "Application of appropriate tick-specific treatments",
              "Targeted treatment of pet-accessible areas and indoor hiding places",
              "Cleaning and treatment of pet bedding and surrounding areas",
              "Follow-up monitoring and habitat-modification advice",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "EARWIG (Treatment)",
    image: "/pests/earwig/earwig.webp",
    paragraphs: [
      "Earwig removal in the homes is in the wet and dark places through specific treatments that kill nest sites, access points, and clear the bugs effectively indoors.",
    ],
    detailHeadline: "Protect Your Garden, Home, and Business from Earwig",
    detailParagraphs: [
      "In the shaded gardens, lush landscapes, and moisture-prone areas of Dubai, Sharjah, and Ajman, the earwig is more than just an unsettling presence it can become a persistent nuisance. These small, nocturnal insects are known for their distinctive pincers and rapid movements. Whether you're maintaining a garden in Jumeirah, managing a cafe in Ajman, or protecting an indoor greenhouse in Sharjah, earwig bugs can disrupt comfort and hygiene if not treated professionally. Earwigs are especially drawn to damp and dark environments such as under flower pots, mulch, woodpiles, and bathroom tiles. In some cases, they sneak indoors through open doors, drains, or cracks in the foundation.",
    ],
    guideTitle: "The Importance of Professional Earwig Treatment",
    guideIntro: "Earwigs may not harm humans directly, but they can damage gardens and often point to hidden moisture problems in your home.",
    guideItems: [
      "Hide in damp, dark areas like under rocks, leaves, or mulch",
      "Feed on decaying plants, moist soil, and small insects",
      "Attracted to leaky pipes, clogged gutters, and wet gardens",
      "Reproduce quickly and spread fast in moist environments",
    ],
    stepsIntro: "Our targeted approach removes earwigs and tackles the root cause for lasting results.",
    steps: [
      {
        title: "Inspection and Site Analysis",
        description:
          "We start by locating key entry points, moisture zones, and hiding areas like garden beds, basements, and wall cracks. This thorough inspection helps us develop a tailored, site-specific plan to eliminate earwigs and prevent future infestations effectively.",
      },
      {
        title: "Custom Earwig Removal Strategy",
        description:
          "We customize an earwig control plan based on your property and infestation level, using eco-friendly sprays, physical traps, and outdoor treatments. We seal entry points, improve drainage, and guide you on clutter reduction, dryness, and safe repellent use.",
      },
      {
        title: "Follow-Up Monitoring and Prevention",
        description:
          "Our service includes follow-up inspections and maintenance plans for lasting control. We offer tips for dryness, natural garden solutions, and moisture fixes. Trust Accurate Pest Control Dubai for licensed, eco-friendly, and discreet earwig removal tailored to your peace of mind.",
      },
    ],
    types: [
      {
        name: "EUROPEAN EARWIG",
        image:
          "/pests/earwig/European_Earwig_Close-Up_on_Smooth_Surface-Cmcpv9TJ.webp",
        headline: "About the European Earwig",
        paragraphs: [
          "The European earwig is a common household pest in Dubai, often recognized by its slender, reddish-brown body and distinctive pincers. Despite its alarming appearance, it is mostly a scavenger, feeding on dead matter, plants, and small insects. However, its sudden presence indoors can raise concern, especially when infestations grow unnoticed.",
          "Earwigs in homes are typically drawn to cool, moist spaces like bathrooms, basements, kitchens, and laundry rooms. While they don’t spread diseases, large infestations can damage plants and create an unsanitary impression, especially in commercial or hospitality settings.",
        ],
        sections: [
          {
            heading: "Symptoms of a Possible Earwig Infestation",
            paragraphs: [
              "These signs may indicate earwig activity:",
              "While not venomous, earwigs may pinch if handled. Their presence can also signal underlying humidity or drainage issues.",
            ],
            items: [
              "Increased sightings of fast-moving insects with pincers, especially near sinks or drains",
              "Small damage marks on indoor plants or produce",
              "Dead insects or organic debris that may attract earwigs",
              "Musty odor near humid corners or wall cracks",
              "Crinkling or holes in stored paper or cardboard items",
              "Unusual night-time insect activity around baseboards or moist crevices",
            ],
          },
          {
            heading: "Where They Nest",
            paragraphs: [
              "European earwigs prefer dark, damp locations and can move indoors when outdoor conditions become dry or overly hot. Common nesting or hiding places include:",
              "They are nocturnal and prefer quiet, undisturbed places, making regular inspections useful.",
            ],
            items: [
              "Mulch beds or garden soil near foundations",
              "Under potted plants and trays",
              "Cracks in walls, window sills, or floorboards",
              "Damp cardboard boxes in storage rooms",
              "Beneath bathroom or kitchen sinks",
              "Around leaking pipes or shower areas",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats European Earwig Infestations",
            paragraphs: [
              "Our strategies target both adult insects and hidden nests. Treatment plans can be customized for residences or businesses.",
            ],
            items: [
              "Residual sprays and insect growth regulators in harboring zones",
              "Earwig treatment dust in cracks and surrounding locations",
              "Moisture management and structural sealing to reduce re-entry",
              "Eco-safe products suitable for homes with children and pets",
              "Regular examinations of high-risk areas, such as kitchens and basements",
            ],
          },
        ],
      },
      {
        name: "DESERT EARWIG",
        image:
          "/pests/earwig/Earwig_Hiding_Between_Garden_Leaves_Close-Up_View-Bb_ShWAo.webp",
        headline: "About the Desert Earwig",
        paragraphs: [
          "The desert earwig is adapted to dry environments like Dubai and across the UAE. Known for its dark coloration and curved pincers, it is more robust than its European counterpart and often hides in outdoor debris, plant roots, or under stones. Its black appearance can make it easy to mistake for beetles or cockroaches.",
          "Despite the myth, earwigs do not crawl into ears. They are still an unwelcome sight, especially when they move indoors in search of moisture. In homes and gardens, they can damage plants and disturb residents with sudden, fast movements.",
        ],
        sections: [
          {
            heading: "Symptoms of a Possible Desert Earwig Infestation",
            paragraphs: [
              "Though not aggressive, their sudden appearance and tendency to pinch when threatened can be alarming.",
            ],
            items: [
              "Frequent sightings of earwigs in kitchens, under sinks, or near windows",
              "Pincered insects hiding under doormats, flowerpots, or mulch",
              "Damage to soft stems, leaves, or petals in garden beds",
              "Increased insect activity at dusk and after irrigation",
              "Earwigs seen near floors or drains at night",
              "Insects that appear to fly during warm evenings (they have wings but rarely fly)",
            ],
          },
          {
            heading: "Where They Nest",
            paragraphs: [
              "Desert earwigs prefer dry but shaded areas. When temperatures rise, they seek cooler hiding places, sometimes inside homes or shaded gardens. Common nesting spots include:",
              "Because they are mostly nocturnal, many infestations go unnoticed until numbers increase.",
            ],
            items: [
              "Under flat stones, garden tiles, or dry mulch",
              "Cracks along pavements and building foundations",
              "Beneath outdoor furniture, hoses, or stored items",
              "Inside cardboard boxes, old rags, or pet bedding",
              "Around irrigation equipment or leaky outdoor taps",
              "Behind wall panels or insulation materials in garages",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats Desert Earwig Infestations",
            paragraphs: [
              "Our eco-friendly treatments address active infestations and potential nesting zones to help remove desert earwigs and prevent re-entry.",
            ],
            items: [
              "Perimeter barrier treatments with long-lasting insecticides",
              "Treatment of cracks, gaps, and holes in walls",
              "Targeted baiting for difficult-to-reach outdoor locations",
              "Moisture-control and habitat-modification advice",
              "Products selected with household safety in mind",
              "Regular maintenance visits to monitor high-risk zones",
            ],
          },
        ],
      },
      {
        name: "PERISSIA EARWIG",
        image:
          "/pests/earwig/Perrisia_Earwig_Resting_on_Leaf_Surface_Close-Up-i4_xTwSI.webp",
        headline: "About the Perissia Earwig",
        paragraphs: [
          "The Perissia earwig is a lesser-known but increasingly common species in arid and semi-arid regions like Dubai. Known for its slender body, quick movements, and distinctive pincers, it often nests in moist cracks and shaded corners near homes and gardens.",
          "This species is elusive and may go unnoticed until populations increase. A sudden earwig infestation may indicate hidden moisture problems or neglected outdoor areas.",
        ],
        sections: [
          {
            heading: "Signs and Symptoms of Perissia Earwig Activity",
            paragraphs: [
              "Perissia earwigs are typically active at night. Homeowners should watch for:",
              "A professional inspection is advisable if several symptoms occur together.",
            ],
            items: [
              "Sightings of dark, pincered insects at night near sinks or drains",
              "Chewed plant leaves or soft-stemmed flowers in garden beds",
              "Activity near compost bins, garbage cans, or damp storage boxes",
              "Foul, musty smell in areas with wood mulch or leaf buildup",
              "Small droppings or exoskeletons near baseboards and vents",
            ],
          },
          {
            heading: "The Perissia Earwig Life Cycle",
            paragraphs: [
              "Like other species, the Perissia earwig develops through egg, nymph, and adult stages. Females deposit eggs in moist soil or cracks and protect them until they hatch. Nymphs go through several molts before reaching adulthood, then search for organic debris and smaller insects. Because development is hidden and breeding can increase during warm months, small populations can become larger infestations within weeks.",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Dubai Treats Perissia Earwig Issues",
            paragraphs: [
              "Our treatment addresses hidden eggs and nesting areas in addition to visible pests. Every plan is tailored to the property and its conditions.",
            ],
            items: [
              "Deep inspection of high-risk indoor and outdoor spaces",
              "Application of moisture-resistant insecticide dusts and sprays",
              "Barrier treatments around foundations, patios, and plant beds",
              "Crack and crevice sealing for long-term control",
              "Drainage and sanitation recommendations to prevent recurrence",
              "Child-safe and pet-friendly solutions",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "WASPS (Treatment)",
    image: "/pests/wasps/wasp.webp",
    paragraphs: [
      "Wasp control is applied in nests, openings and active sites to eradicate larvae and adults to keep the people and outdoor environments safe.",
    ],
    detailHeadline: "Safe and Certified Wasp and Hornet Control for Homes and Businesses",
    detailParagraphs: [
      "Wasps can turn a peaceful garden into a dangerous space, particularly during the warmer months in Dubai. They can pose a major health risk, regardless of whether you've noticed flying insects close to your Business Bay office. Because of this, Accurate Pest Control Services LLC Dubai offers quick and environmentally friendly professional wasp control services. Hidden places like garages, Roof edges, and even trees are common places for these flying pests to build their nests. Without professional help, the situation could quickly get worse, especially if the nest has large colonies or aggressive wasp species.",
    ],
    guideTitle: "Why Wasp Control Is Essential",
    guideIntro: "Wasp control is essential, which keep the home environment safe and comfortable. More so, effective wasp control eliminates discomfort and health hazards associated with their painful and dangerous stings.",
    guideItems: [
      "Reduces the chances of severe allergic reactions among persons allergic to stings",
      "Safe for kids and pets around aggressive wasps",
      "Eliminates nests to prevent property damage caused by wasps",
      "Uses proactive measures to keep your home secure and your loved ones safe",
    ],
    stepsIntro: "Targeted wasp solutions built around your needs.",
    steps: [
      {
        title: "Nest Detection",
        description:
          "Our experts start with a detailed inspection to locate wasp nests and identify species. We check roofs, balconies, fixtures, and vents to assess risk levels, enabling us to design a precise and property-specific wasp nest removal and control strategy.",
      },
      {
        title: "Professional Removal",
        description:
          "We apply targeted wasp control using safe nest-killer foam, manual nest removal with protective gear, and entry-point sealing. For aggressive infestations, advanced treatments ensure effective elimination of stubborn wasp or hornet colonies in high-risk areas around your property.",
      },
      {
        title: "Post-Removal Monitoring",
        description:
          "After nest removal, we monitor the area, seal likely nesting spots, and share prevention tips so wasps are less likely to rebuild nearby. Follow-up checks help keep outdoor spaces safer for family, staff, and visitors.",
      },
    ],
    types: [
      {
        name: "PAPER WASP NEST",
        image:
          "/pests/wasps/Paper_Wasp_Nest_Built_Under_Roof_Eaves_Area-D1Xniwpp.webp",
        headline: "About the Paper Wasp Nest",
        paragraphs: [
          "Paper wasps are slender, long-legged stinging insects that build umbrella-shaped nests from chewed wood fibers and saliva. These nests are commonly found under eaves, balconies, sheds, or garden furniture around Dubai homes and commercial properties. While paper wasps help control garden pests, their nests pose a serious risk, especially to children, pets, and people allergic to stings.",
          "Paper wasp stings are painful and can be life-threatening for sensitive individuals. If disturbed, even a single nest can provoke aggressive swarming. Fast, professional action is important for safety.",
        ],
        sections: [
          {
            heading: "Signs of a Paper Wasp Nest Infestation",
            paragraphs: [
              "Paper wasp activity normally increases during warmer months. Look for these early signs:",
              "Never attempt to destroy a nest during daylight, as this increases the risk of a wasp attack.",
            ],
            items: [
              "Visible nests under roof edges, decks, or window frames",
              "Increased wasp activity around gardens or outdoor seating",
              "Persistent buzzing near light fixtures or shaded areas",
              "Wasps hovering near food, trash bins, or compost",
              "Pets behaving unusually around eaves or open sheds",
            ],
          },
          {
            heading: "Where Paper Wasps Build Their Nests",
            paragraphs: [
              "Paper wasps prefer quiet, undisturbed areas with access to wood and water. Common nest sites include:",
              "Their nests can grow rapidly and may go unnoticed until the colony is fully established.",
            ],
            items: [
              "Roof overhangs, soffits, and gables",
              "Attics and areas under balconies or staircases",
              "Garden sheds, garages, and barns",
              "Inside light fixtures or outdoor electrical boxes",
              "Beneath patio furniture and playground equipment",
              "Tree branches and thick garden shrubs",
            ],
          },
          {
            heading: "How Accurate Pest Control Services LLC Handles Paper Wasp Removal",
            paragraphs: [
              "Our staff safely remove paper wasps across different types of properties. Treatments are selected with safety in mind, especially in family- and pet-friendly areas.",
            ],
            items: [
              "Site assessment to locate nests and entry zones",
              "Protective gear during removal",
              "Eco-safe spraying or dusting methods to neutralize nests",
              "Nest removal and disposal to prevent reinfestation",
              "Sealing and exclusion to block future nesting spots",
              "Optional maintenance visits to prevent seasonal return",
            ],
          },
        ],
      },
      {
        name: "YELLOW JACKET WASP",
        image:
          "/pests/wasps/Close-Up_View_of_a_Yellowjacket_Wasp_on_a_Surface--b6HLRSG.webp",
        headline: "About the Yellow Jacket Wasp",
        paragraphs: [
          "Often mistaken for bees, yellow jackets are aggressive stinging wasps with distinctive black and yellow bodies. Unlike more docile paper wasps, they are territorial and can sting multiple times, posing risks to people, pets, and outdoor gatherings. Their nests, often hidden underground or inside walls, can grow into large colonies without obvious warning.",
          "If you’ve noticed sudden wasp swarms near your property, prompt yellow jacket removal is important for safety.",
        ],
        sections: [
          {
            heading: "Signs of Yellow Jacket Infestation",
            paragraphs: [
              "Yellow jackets are fast and can become aggressive, particularly when colonies are large in late summer. Warning signs include:",
              "Because yellow jackets defend their nests, seek professional help rather than approaching them.",
            ],
            items: [
              "High wasp activity near shrubs, garbage bins, or compost",
              "Wasps entering wall voids, cracks, or underground holes",
              "Nests visible in basements, ceilings, or exterior wall spaces",
              "Buzzing sounds behind drywall or in ceiling tiles",
              "Multiple stings or aggressive behavior near food sources",
            ],
          },
          {
            heading: "Where Yellow Jacket Wasps Hide",
            paragraphs: [
              "Unlike yellow paper wasps, which prefer exposed nests, yellow jackets often nest in concealed or underground spaces. Common hiding spots include:",
              "Their hidden nesting habits can make detection difficult.",
            ],
            items: [
              "Underground burrows and soil cracks",
              "Inside wall voids and ceiling gaps",
              "Beneath decks or staircases",
              "Garden sheds, garages, or old pipes",
              "Air-conditioning units or outdoor equipment",
              "Attics and crawlspaces",
            ],
          },
          {
            heading: "Accurate Pest Control’s Yellow Jacket Removal Process",
            paragraphs: [
              "Our specialists provide yellow jacket removal using a multi-step, safety-first approach designed to protect your property and the surrounding environment.",
            ],
            items: [
              "Complete site inspection to locate hidden nests",
              "Protective suits and regulated application tools",
              "Non-invasive treatments to neutralize the colony",
              "Nest removal and disposal using safety protocols",
              "Exclusion sealing to prevent future infestations",
              "Optional maintenance plans during peak wasp season",
            ],
          },
        ],
      },
      {
        name: "HORNETS WASP",
        image:
          "/pests/wasps/Hornets_Wasp_Resting_on_Leaf_Branch_in_Natural_Light-D8Ee2DZS.webp",
        headline: "About the Hornets Wasp",
        paragraphs: [
          "Hornets are among the more hostile wasps in Dubai. Larger than yellow jackets or paper wasps, they have a powerful sting and may fiercely defend their colony when disturbed. Their nests can grow rapidly and often go unnoticed until the threat becomes serious. Some build large aerial hives, while others form underground nests.",
          "A rising number of large, buzzing wasps may indicate a hornet nest on or near your property. Accurate Pest Control offers professional hornet control to remove the danger safely.",
        ],
        sections: [
          {
            heading: "Signs of Hornet Infestation",
            paragraphs: [
              "Early detection can help prevent a full-scale infestation. Look for:",
              "Hornets defend their nests aggressively; do not approach them.",
            ],
            items: [
              "Increased activity of large wasps near bushes, sheds, or wall crevices",
              "Buzzing near the ground or trees, which may indicate an underground nest",
              "Papery nests on tree branches, gutters, or roofs",
              "Aggressive behavior when approaching a certain area",
              "Nighttime movement near porch lights",
            ],
          },
          {
            heading: "Where Hornets Hide",
            paragraphs: [
              "Hornets build nests in both exposed and hidden locations, often choosing quiet, undisturbed places. Common nesting sites include:",
              "Underground nests are often discovered only after someone is stung.",
            ],
            items: [
              "Trees, bushes, and roof overhangs",
              "Inside attics, barns, or wall cavities",
              "Garden sheds and garages",
              "Ground holes or abandoned rodent burrows",
              "Under decking and staircases",
              "Shaded corners protected from wind or rain",
            ],
          },
          {
            heading: "Our Hornet Control Process",
            paragraphs: [
              "Accurate Pest Control LLC Dubai provides specialized hornet treatments designed to remove nests safely and swiftly. We prioritize family safety and follow eco-conscious methods approved in the UAE.",
            ],
            items: [
              "Examination of the property to find visible and hidden nests",
              "Identification of the nest type: aerial or underground",
              "Protective gear and regulated products for safe application",
              "Nest neutralization and removal at safer hours, typically dawn or dusk",
              "Post-removal cleanup and sealing of nest entry points",
              "Guidance on hornet-proofing your property",
            ],
          },
        ],
      },
      {
        name: "ARABIAN PAPER WASP",
        image:
          "/pests/wasps/Arabian_Paper_Wasp_Displaying_Bright_Yellow_Body-Dm8oR56E.webp",
        headline: "About the Arabian Paper Wasp",
        paragraphs: [
          "The Arabian paper wasp is a slender-bodied stinging insect commonly found across Dubai and surrounding desert regions. Identified by its long legs and yellow-black stripes, it builds umbrella-shaped nests beneath building roofs, tree branches, and protected corners. While not as aggressive as hornets, Arabian paper wasps will defend their nest if disturbed, especially during warmer months.",
          "Accurate Pest Control Services LLC Dubai provides wasp removal services focused on prevention, speed, and safety for villas, gardens, and business properties.",
        ],
        sections: [
          {
            heading: "Signs of Arabian Paper Wasp Infestation",
            paragraphs: [
              "Look out for these early warning signs. Nests may be easy to miss until the colony grows.",
            ],
            items: [
              "Small umbrella-like nests attached to shaded surfaces",
              "Repeated buzzing near the same spot on roofs or outdoor walls",
              "Wasps entering through wall cracks or roof joints",
              "Increased sting risk around children, pets, or allergic individuals",
              "Group activity around flowering plants or trash bins",
            ],
          },
          {
            heading: "Common Hiding Spots",
            paragraphs: [
              "Arabian paper wasps prefer dry, shaded areas that offer cover and minimal disturbance. You may find them in:",
              "Spotting a single wasp may indicate that a nearby nest is forming.",
            ],
            items: [
              "Under roof eaves or window awnings",
              "Inside garden sheds and pergolas",
              "Corners of balconies and patios",
              "Tree trunks and leafy branches",
              "Air vents or cracks in concrete",
              "Around outdoor lighting fixtures",
            ],
          },
          {
            heading: "How We Remove Wasp Nests",
            paragraphs: [
              "Our wasp-control service includes safe nest removal and future prevention. Treatments follow applicable safety regulations.",
            ],
            items: [
              "Full property survey to locate active wasp nests",
              "Identification of the Arabian paper wasp",
              "Safe pesticide application by trained technicians",
              "Taking apart and removing the nest during low-activity hours, such as dawn or dusk",
              "Sealing the nesting site and providing prevention guidance",
              "Optional follow-up for recurring infestations",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "FUMIGATION (Treatment)",
    image: "/pests/fumigation/fumigation.webp",
    paragraphs: [
      "Fumigation fully penetrates furniture, walls, and enclosed spaces to eradicate concealed pests such as termites, beetles, and others in closed environments.",
    ],
    detailHeadline: "Professional Fumigation Services in UAE",
    detailParagraphs: [
      "Upon the invasion of the home or workplace by the pests, it can be tempting to get stressed out about extermination. That's why many residents and businesses choose fumigation experts in Dubai, Sharjah and Ajman who apply advanced techniques to target termites, flies, mosquitoes, and even hidden eggs inside walls and furniture. Fumigating agents are used in a measured manner, and the highly specialised procedure must be practised. The structure must be sealed off by specialists and can be opened only after ensuring that the precisely shaped technique of the chemical agents exterminates those whom they seek to kill. This not only clears current infestations, but it also stops re-infestations. With a professional fumigation company in UAE, families and workplaces across the UAE can enjoy long-term protection, a hygienic environment, and the peace of mind that comes with reliable pest control.",
    ],
    guideTitle: "Common Fumigants",
    guideIntro: "The most commonly used fumigant gases in the world market include:",
    guideItems: [
      "Phosphine (PH3)",
      "Methyl Bromide (CH3Br)",
      "Sulfur fluoride (SO2F2)",
      "Carbon dioxide (CO2)",
      "Hydrogen Cyanide (HCN)",
      "Ethylene Oxide C2H4O",
    ],
    stepsIntro: "Fumigation service in Dubai ensures safe pest elimination by certified experts with complete protection.",
    steps: [
      {
        title: "Inspection & Assessment",
        description:
          "Our professionals begin with a thorough inspection to determine pest activity and infested locations. They use high-tech fumigation equipment to identify infestations more precisely and administer the best form of treatment to each area with speed.",
      },
      {
        title: "Chemical Application Certified",
        description:
          "Safe, efficient and approved fumigation agents are used on the whole premises, which will tackle both visible and hidden pests, ensuring long-term safety to families, pets and stored products. As far as products are concerned, the property becomes pest-free and ensures its safety effectively.",
      },
      {
        title: "Post-Fumigation Guidance",
        description:
          "Once a fumigation has been done, our staff takes care of a thorough cleaning, ventilation, and precaution guidelines. This guarantees a safe, healthy, hygienic, and pest-free environment that ensures long-term safety and protection of families, pets, and property is maintained well.",
      },
    ],
    types: dummyTypes(
      "fumigation",
      [
        "RESIDENTIAL FUMIGATION",
        "COMMERCIAL FUMIGATION",
        "WAREHOUSE FUMIGATION",
        "CONTAINER FUMIGATION",
      ],
      [
        "/pests/fumigation/Professional_House_Fumigation_Service_in_Dubai-CfMbryIB.webp",
        "/pests/fumigation/Professional_Fumigation_Spray_Services_in_Dubai-zmYFgde6.webp",
        "/pests/fumigation/Professional_Fumigation_Service_in_Action.webp",
        "/pests/fumigation/fumigation.webp",
      ],
    ),
  },
];

export const serviceOptions: ServiceDetail[] = [
  {
    title: "Residential & Commercial Pest Control",
    paragraphs: [
      "When it comes to the various pests that have to be controlled at homes, Accurate Pest Control Services LLC provides comprehensive services in terms of residential pest control across UAE to cater to the varied needs of homeowners. We apply approved pesticides by the Municipality and Ministry of Climate Change & Environment only, and guarantee your safety, health, and peace of mind with our licensed professionals.",
      "At home or your business, we resolve any pest problem with accuracy, including bed bugs, cockroaches, ants and rodents, flies, spiders or others. Our service plans are also flexible and all of them include a one-time treatment, an annual contract with free call-back service. We are safety-first-minded in residential pest control near me. We inspect, diagnose, track and treat your premises at minimal use of chemicals. In case you are looking for a solution with real results, we are your better bet.",
      "Being one of the principal commercial pest control business firms, we offer tailored services and reports in line with the regulatory needs. Searching high high-quality commercial pest control nearby? Our professionals provide on-site inspections and well-organised treatment plans according to the needs of your business.",
    ],
    offeredServices: [
      "Contract Annual Pest Control.",
      "Immediately Pest Destroying Services.",
      "Non-governmental pesticides are not used, and only those approved by the government are.",
    ],
    stepsIntro: "We reduce the amount of chemicals by following these important steps:",
    steps: [
      {
        title: "Identification",
        description: "leader in identifying the type of infestation and how it was caused.",
      },
      {
        title: "Monitoring",
        description: "keeping a check on the pest activity to affect control",
      },
      {
        title: "Sanitation",
        description: "Removal of pest-attracting factors",
      },
      {
        title: "Blocking",
        description: "Prevention of entry points of the pests",
      },
      {
        title: "Targeted Treatment",
        description: "The use of eco-friendly solutions, which are selective according to necessity only.",
      },
      {
        title: "Documentation",
        description: "Giving full accounts of service details and records",
      },
    ],
    faqs: [
      {
        question: "What pests can be treated with residential pest control?",
        answer:
          "We provide treatments for common household pests, including cockroaches, ants, termites, bed bugs, rodents, and other unwanted pests.",
      },
      {
        question: "Is residential pest control safe for families and pets?",
        answer:
          "Our team follows appropriate safety procedures and provides instructions to help protect family members and pets during treatment.",
      },
      {
        question: "How often should I schedule residential pest control?",
        answer:
          "Treatment frequency depends on the type of pests, infestation level, and your property's requirements.",
      },
      {
        question: "Do I need to prepare my home before treatment?",
        answer:
          "Yes, some treatments may require basic preparation. Our team will guide you through the necessary steps.",
      },
      {
        question: "How can I prevent pests from returning to my home?",
        answer:
          "Keep your home clean, store food properly, manage waste, and seal potential pest entry points.",
      },
    ],
  },
  {
    title: "General Pest Control",
    paragraphs: [
      "It could be your house, apartment, place of work, or warehouse, and pests never care. Our experts are familiar with all of it: everyday insects as well as more complex infestations. We base your property on a thorough examination of your property before beginning anything. This is to understand what kind of pest is involved, the scope of the infestation and its root cause. It may include cockroaches hiding behind your kitchen cabinets, ants nesting in your walls; in all situations, our assessments are thorough and are vital in the effective treatment process.",
      "We are a proud organization to provide the best services within UAE in pest control. The kind of pesticides used by our team is municipality-approved and is safe to both families and pets, but is effective in making sure the pests are completely eradicated. Protecting for the long term will begin with working and professional care.",
      "We also offer pest services with specific treatments, non-toxic application procedures, follow Ups and useful prevention advice. Regardless of whether you are a tenant, homeowner or a property manager, we will customize our services to your specific needs.",
      "Whether it is at home or the workplace, Accurate Pest Control Services LLC is your best bet to keep all ASPEs at bay and on a permanent basis.",
    ],
    offeredServices: [
      "Holistic general pest services for all kinds of properties",
      "Proper pest control inspection with a professional report",
      "Certified & environment friendliness all around UAE",
    ],
    stepsIntro: "These are the main measures of our environmentally safe method of pest control, which promotes high efficiency and low quantities of chemicals:",
    steps: [
      {
        title: "Site Assessment",
        description: "",
      },
      {
        title: "The monitoring of Pest Activity",
        description: "",
      },
      {
        title: "Sanitation & Hygiene",
        description: "",
      },
      {
        title: "Entry Point Sealing(Exclusion)",
        description: "",
      },
      {
        title: "Pest Selective Treatment",
        description: "",
      },
      {
        title: "Documentation",
        description: "",
      },
    ],
    faqs: [
      {
        question: "What does general pest control cover?",
        answer:
          "General pest control covers common household and workplace pests such as cockroaches, ants, and other everyday infestations found in homes, apartments, offices, and warehouses.",
      },
      {
        question: "Is general pest control safe for families and pets?",
        answer:
          "Yes. Our team uses municipality-approved products and methods that are designed to be effective against pests while remaining suitable for family and pet environments when used as directed.",
      },
      {
        question: "Do you inspect the property before treatment?",
        answer:
          "Yes. We begin with a thorough site assessment to identify the pest type, infestation level, and root cause so the treatment plan matches your property.",
      },
      {
        question: "Will I receive a report after the service?",
        answer:
          "Yes. Our general pest control service includes a professional inspection with clear documentation of findings and recommended next steps.",
      },
      {
        question: "Can the service be customized for tenants or property managers?",
        answer:
          "Absolutely. Whether you are a tenant, homeowner, or property manager, we tailor treatments, follow-ups, and prevention advice to your specific needs.",
      },
    ],
  },
  {
    title: "Emergency Pest Control",
    paragraphs: [
      "Accurate Pest Control Services LLC is a comparatively quick professional pest control company providing professional emergency pest control services in the areas of UAE in the region of MENA. Be it a crisis at home or a rush at the business, we would get the situation tackled within 24 hours of business days a week and solve the issue with utmost care. The pesticides we use are not those that the Dubai Municipality does not approve of, hence we are always safely within the standards required.",
      "When you need emergency pest control near me, we answer swiftly with inspections and treatments carried out diligently and carefully. Our cockroach, bed bug, ants, rodent and fly management services use environmentally friendly approaches.",
      "Your safety and comfort are the priority of our process. Our starting point is to seek out the pest problem, keep an eye on them and ensure that conditions that lure them in cannot occur. Entry points are capped, and treatment is adopted when essential to prevent high amounts of use of the chemicals. The municipalities of UAE register all of the technicians.",
      "Accurate Pest Control Services LLC provides instant services, free call back, and full service documentation to both residential and commercial clients. No matter whether it is a single emergency and/or an annual plan, we bring solutions to work. When it comes to an emergency situation, Accurate Pest Control Services LLC may be relied on to provide fast and certified Dubai Municipality pest control services.",
    ],
    offeredServices: [
      "Contracts on Pest Control Yearly",
      "24hrs, Pest Control Emergency",
      "On-the-Spot Residential & Commercial Pest Treatments",
    ],
    stepsIntro: "These steps reduce the usage of chemicals, and any long-term outcomes are attained:",
    steps: [
      {
        title: "Identification",
        description: "",
      },
      {
        title: "Monitoring",
        description: "",
      },
      {
        title: "Sanitation",
        description: "",
      },
      {
        title: "Exclusion",
        description: "",
      },
      {
        title: "Targeted Treatment",
        description: "",
      },
      {
        title: "Documentation",
        description: "",
      },
    ],
    faqs: [
      {
        question: "How fast can you respond to an emergency pest issue?",
        answer:
          "We provide rapid emergency pest control support across the UAE and aim to handle urgent residential and commercial cases quickly, including same-day response within business hours whenever possible.",
      },
      {
        question: "Which pests are covered under emergency pest control?",
        answer:
          "Emergency services commonly cover urgent cockroach, bed bug, ant, rodent, and fly problems that need immediate inspection and treatment.",
      },
      {
        question: "Are emergency treatments municipality approved?",
        answer:
          "Yes. Our technicians use Dubai Municipality–approved pesticides and follow UAE municipal standards for safe, certified emergency pest control.",
      },
      {
        question: "Do you offer emergency service for both homes and businesses?",
        answer:
          "Yes. We provide on-the-spot emergency treatments for residential and commercial properties, plus optional yearly contracts for ongoing protection.",
      },
      {
        question: "What happens after the emergency visit?",
        answer:
          "After treatment, we provide service documentation, free callback support where applicable, and guidance to help reduce the chance of pests returning.",
      },
    ],
  },
  {
    title: "Specialized in Pest Extermination",
    paragraphs: [
      "In the aspect of removal of hard-to-reach pests, Accurate Pest Control Services LLC provides very focused services of exterminator services in highly risky areas. Some of the settings where we know that there is a specialised treatment that has to be conciliated with knowledge, precision and confidentiality include restaurants, warehouses and clinics.",
      "Our accredited pest removers are engaged in high-level pest elimination in UAE. We operate pest-free within such sensitive areas as well as achieve municipal compliance through safe removal of the pests using industry-accepted tools and treatments.",
      "Do you need to hire a reliable exterminator around me? The nature of our rapid response teams is to be trained to deal with cockroach nests, rodents, and infestations. The services are tailor-made in terms of pest and the level of infestation, as well as the design of the building, to ensure effective services.",
      "Our competence as an exterminator, which businesses in Dubai rely on, brings lasting change whilst implementing environmentally friendly practices. Bed bugs or ants, to mention but a few, will be completely removed without compromising the indoor air quality and safety. When choosing a commercial exterminator to get the pests out swiftly and efficiently, go with a professional company such as Accurate Pest Control that will serve you at the most needed time and place.",
    ],
    offeredServices: [
      "Approved safe methods to be used by the certified team",
      "Bed bugs and cockroaches, and rodent control, among others",
      "Customised services in offered for offices, warehouses, restaurants, and villas",
      "Special treatment of massive infestation",
      "Eco-friendly operations with minimum interference",
      "The high level of detailed reporting and future customer care",
    ],
    stepsIntro: "Our process minimises the use of chemicals and provides a long-term outcome in the following steps:",
    steps: [
      {
        title: "Identification",
        description: "",
      },
      {
        title: "Monitoring",
        description: "",
      },
      {
        title: "Sanitation",
        description: "",
      },
      {
        title: "Exclusion",
        description: "",
      },
      {
        title: "Targeted Treatment",
        description: "",
      },
      {
        title: "Documentation",
        description: "",
      },
    ],
    faqs: [
      {
        question: "What is specialized pest extermination used for?",
        answer:
          "Specialized extermination focuses on hard-to-reach or high-risk infestations in sensitive locations such as restaurants, warehouses, clinics, offices, and villas.",
      },
      {
        question: "Which pests can specialized treatments remove?",
        answer:
          "Our specialized services cover challenging infestations including bed bugs, cockroaches, rodents, ants, and other pests that need precise, targeted removal.",
      },
      {
        question: "Is specialized extermination suitable for commercial sites?",
        answer:
          "Yes. We customize treatment plans for commercial environments and follow municipal compliance requirements while keeping disruption to operations as low as possible.",
      },
      {
        question: "Do you handle severe infestations?",
        answer:
          "Yes. Our certified team is equipped for heavy infestations and uses approved tools and methods tailored to the pest type, infestation level, and building layout.",
      },
      {
        question: "Will I get reporting after specialized treatment?",
        answer:
          "Yes. We provide detailed reporting and follow-up customer care so you can track results and maintain long-term pest-free conditions.",
      },
    ],
  },
  {
    title: "Fumigation Services",
    paragraphs: [
      "Fumigation is one of the surest methods of killing deeply rooted pests within residential and commercial premises. No matter what critters they are, termites, cockroaches, bed bugs, or other little something or others, Accurate Pest Control Services LLC can recure your place ensuring it is processed by a certified fumigation.",
      "Practical technicians of our company start the whole process of work by a full site inspection and determine the type of pests, access ways and the level of infestation. In case anyone is looking for house fumigation near me, we have special treatment packages that serve villas, apartments, and townhouses. It aims at complete eradication without disturbing the routine of your days.",
      "We are employing repellents as well as approved chemicals and specialized equipment to make their way into closed spaces, with the help of which we are doing efficient treatment. Be they residential, commercial or warehousing, our procedure is planned around adopting the Dubai Municipality requirement in ensuring the safeguarding of health and property.",
      "Since its inception, our professional fumigation services in Sharjah have assisted many families as well as businesses to regain peace of mind in Sharjah. Every treatment is followed by the support of the ventilation, post-service inspection, and the practical recommendation on the prevention of reinfestation. Whether it is a one-off task or an ongoing yearly contract, Accurate Pest Control Services LLC offers quality pest management in the UAE.",
    ],
    offeredServices: [
      "Structural fumigation of buildings/homes",
      "Stored product pest fumigation (gas, chemical)",
      "Pre/post construction pest control",
      "Tailored schemes for homes, restaurants, offices, storage facilities",
    ],
    stepsIntro: "These steps guarantee us long-term results in the following manner:",
    steps: [
      {
        title: "Identification",
        description: "",
      },
      {
        title: "Monitoring",
        description: "",
      },
      {
        title: "Sanitation",
        description: "",
      },
      {
        title: "Exclusion",
        description: "",
      },
      {
        title: "Targeted Treatment",
        description: "",
      },
      {
        title: "Documentation",
        description: "",
      },
    ],
    faqs: [
      {
        question: "When is fumigation recommended?",
        answer:
          "Fumigation is recommended for deep or hidden infestations—such as termites, cockroaches, bed bugs, or stored-product pests—where standard surface treatments may not reach every nesting area.",
      },
      {
        question: "Do you fumigate homes as well as commercial spaces?",
        answer:
          "Yes. We offer structural fumigation packages for villas, apartments, and townhouses, as well as tailored plans for restaurants, offices, warehouses, and storage facilities.",
      },
      {
        question: "Is fumigation aligned with Dubai Municipality requirements?",
        answer:
          "Yes. Our fumigation procedures use approved chemicals and specialized equipment, planned around Dubai Municipality standards to protect health and property.",
      },
      {
        question: "What happens after fumigation is completed?",
        answer:
          "After treatment we support ventilation, carry out a post-service inspection, and share practical prevention tips to help stop reinfestation.",
      },
      {
        question: "Can fumigation be arranged as a one-time job or annual plan?",
        answer:
          "Yes. Accurate Pest Control offers both one-off fumigation services and ongoing yearly contracts based on your property’s needs.",
      },
    ],
  },
  {
    title: "Wasp Control",
    paragraphs: [
      "Wasps may pose a severe problem in case they nest around the home, office or outdoor fields. Their stings are agonizing and, in certain instances, harmful to an individual with allergies. Accurate Pest Control Services LLC provides safe and effective wasp control services all over UAE to eliminate the threat of wasps to your property and comfort.",
      "We have been trained to recognize and eradicate all the common uses present in the UAE, such as the yellow wasp, the , Arabian paper wasp, among others. The possibilities of nesting are mostly in corners of the roof, underneath the balcony, garden shed or inside the wall cavity, which normally lie unnoticed until infestation becomes heavy.",
      "We will start by carefully searching to find the wasp nest, estimate activity and determine the type of wasp. When it is found, we apply specific and environmentally friendly treatment that kills off the colony and does not allow it to come back. Our procedures will make you safe and keep your surroundings untouched. Our home remedies take care of paper wasps with a fast and varied solution.",
      "To businesses, we provide bespoke solutions, in terms of being safety compliant as well as being as minimal as possible in terms of disruption. We hope it keeps prevention not only in the short term but on an expedient basis as well. Be it a residential house or a big commercial establishment, Accurate Pest Control Services LLC can provide dependable and professional wasp extermination services of any magnitude.",
    ],
    offeredServices: [
      "Nests of flying insects are detected and destroyed",
      "Secure services to any place of business and home.",
      "Experienced treatment of general and local stinging-insect nests",
    ],
    stepsIntro: "Safe, Long-Term Pest Control is our Proven Process",
    steps: [
      {
        title: "Inspection & Identification",
        description: "",
      },
      {
        title: "Monitoring",
        description: "",
      },
      {
        title: "Sanitation",
        description: "",
      },
      {
        title: "Exclusion",
        description: "",
      },
      {
        title: "Targeted Treatment",
        description: "",
      },
      {
        title: "Reporting & Documentation",
        description: "",
      },
    ],
    faqs: [
      {
        question: "Why should wasp nests be removed professionally?",
        answer:
          "Wasp stings can be painful and dangerous for people with allergies. Professional removal safely eliminates nests around homes, offices, and outdoor areas without putting you at risk.",
      },
      {
        question: "Where do wasps usually nest in the UAE?",
        answer:
          "Wasps commonly nest in roof corners, under balconies, garden sheds, and wall cavities—often unnoticed until the colony becomes active and heavy.",
      },
      {
        question: "How does your wasp control process work?",
        answer:
          "We inspect the area, identify the wasp type and nest location, then apply targeted eco-friendly treatment to eliminate the colony and help prevent it from returning.",
      },
      {
        question: "Is wasp control available for both homes and businesses?",
        answer:
          "Yes. We provide secure wasp nest detection and removal for residential properties and commercial sites, with minimal disruption to daily operations.",
      },
      {
        question: "Will wasps come back after treatment?",
        answer:
          "Our treatment focuses on removing the active colony and reducing re-nesting risk. We also share prevention guidance so outdoor and property areas stay safer long term.",
      },
    ],
  },
];
