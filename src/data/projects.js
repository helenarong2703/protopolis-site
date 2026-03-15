export const projects = [
  {
    slug: "dao-of-the-dao",
    title: "Dao of the DAO: Eastern Philosophies in Decentralized Worlds",
    authors: [
      { name: "Helena Rong", affiliation: "New York University Shanghai" },
      { name: "Zhe Sun", affiliation: "Shanghai University of Finance and Economics" },
    ],
    date: "October 28, 2025",
    venue: null,
    pillar: 1,
    abstract:
      'In chapter 62 of Daodejing, Laozi describes the Dao as "the hearth and home of the ten thousand things. Good souls treasure it, lost souls find shelter in it." Contemporary DAOs are often framed within Western discourses of decentralization, autonomy, and Web 3.0 innovation. However, emerging practices\u2014especially in Chinese-speaking communities\u2014reveal a distinctive layer of cultural imagination deeply rooted in Eastern thought. This research proposes to understand DAOs from Eastern philosophies by examining how Daoist principles inform the values and practices of DAO communities in Asia to articulate alternative visions of autonomy, community, and social organization. Concepts such as w\u00FA-w\u00E9i (non-action) and xi\u0101o-y\u00E1o (carefree wandering) are increasingly referenced in the context of blockchain governance in the East. Using SeeDAO, a prominent DAO in the Chinese-speaking Web3 space, as a focal point, this study will explore how concepts such as non-action governance, the "Dao follows nature", and "emergence" are operationalized in digital governance practices. The research seeks to make three key contributions: first, to elucidate the lived experiences and ethical visions of DAO participants in China; second, to provide a culturally grounded theory of decentralized governance rooted in Eastern philosophical paradigms; and third, to explore how ancient philosophical ideas find renewed life in emergent socio-technical forms.',
    keywords: [
      "Decentralized Autonomous Organization",
      "Daoism",
      "Governance",
      "Eastern Philosophy",
      "Community Governance",
      "Blockchains",
    ],
    externalUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5731428",
    heroImage: "/projects/dao-of-the-dao/slide-laozi2.png",
    heroImageAlt: "DAO \u2014 the triple meaning of d\u01CEo (island), d\u00E0o (the Way), and Decentralized Autonomous Organization; Laozi #62",
    podcast: {
      url: "https://open.spotify.com/episode/2DeTD7iy5yJH5sqFf0EAUj",
      image: "/projects/dao-of-the-dao/podcast-square.png",
      show: "Green Pill \u2014 Network Nations",
      title: "NN Ep:14 \u2014 Networked Diasporas: The Case of SeeDAO with Helena Rong",
      description: "A conversation on how SeeDAO operationalizes Daoist principles in decentralized governance, and what Eastern philosophies offer the Web3 movement.",
    },
    gallery: [
      {
        src: "/projects/dao-of-the-dao/fieldwork.png",
        caption: "SeeDAO Digital Nomad Week in Pingnan, Fujian \u2014 July 2025",
      },
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
