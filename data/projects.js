export const projectAssetPath = path => {
  const normalizedPath = path.replace(/^\/+/, "");
  const encodedPath = normalizedPath
    .split("/")
    .map(segment => encodeURIComponent(segment))
    .join("/");

  return `${import.meta.env.BASE_URL}assets/projects/portfolio-assets/${encodedPath}`;
};

const projects = [
  {
    id: "power-grid-interface-usability-study",
    title: "Power Grid Interface Usability Study",
    year: 2026,
    tags: ["school", "code", "design", "user research"],
    skills: [
      "JavaScript",
      "HTML",
      "CSS",
      "D3.js",
      "Figma",
      "Full-Stack Development",
      "Data Visualization",
      "Prototyping",
      "A/B Testing",
      "Semi-Structured Interviews",
      "Thematic Analysis",
    ],
    color: "#9fb8b1",
    tagline: "Applying interaction design and usability testing to power grid data visualizations.",
    details: [
      "With this project, my Master's Thesis, I delved into the domain of power grid systems to investigate how power grid data is visualized, interpreted, and manipulated through interfaces by grid operators, and how UX and interaction design can improve those systems.",
      "I spent a year researching conventional methods, writing a literature review, and developing a full-stack prototype simulation of a power grid system. I developed two interfaces with opposing data interaction methods and structured the user evaluation process around comparing their usability.",
      "Through this process, I discovered how the design and layout of interfaces can affect cognitive load during decision-making and data exploration. The project also helped me refine my skills in web development, data visualization, and prototyping while entering a completely new technical domain.",
    ],
    images: [
      projectAssetPath("msc project/mapview-4.png"),
      projectAssetPath("msc project/ListView-2.png"),
      projectAssetPath("msc project/msc1.JPG"),
      projectAssetPath("msc project/msc2.JPG"),
      projectAssetPath("msc project/msc3.JPG"),
      projectAssetPath("msc project/msc4.JPG"),
      projectAssetPath("msc project/earlymapview1.JPG"),
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/williamogrady/portfolio-website",
      },
    ],
  },
  {
    id: "user-perception-study-video-frame-rates",
    title: "User Perception Study of Video Frame Rates",
    year: 2023,
    tags: ["school", "code", "user research"],
    skills: ["HandBrake", "Prototyping", "A/B Testing", "Thematic Analysis"],
    color: "#a7a4b8",
    tagline: "Investigating viewers' response to frame rate in different video formats.",
    details: [
      "My Bachelor's Thesis responded to the ongoing debate around how video frame rate affects the viewing experience. High frame rate cinema has often been discussed as either the future of the medium, an unfamiliar distraction, or something that devalues the content itself.",
      "My friend Emil and I designed an experiment where participants compared sets of the same clips without knowing frame rate was the only difference. We also tested whether the response varied across nature documentaries, theatrical films, and sports footage.",
      "The project required us to manipulate video clips using RIFE and HandBrake. Our conclusion, while based on a small sample, was to view frame rate as a creative tool: it can shape feeling, expectation, and perceived intention.",
    ],
    images: [
      projectAssetPath("bsc project/bsc-frame-rate-1.png"),
      projectAssetPath("bsc project/bsc-frame-rate-2.png"),
      projectAssetPath("bsc project/bsc-frame-rate-3.png")
    ],
    links: [
      {
        label: "Video example",
        href: "https://www.youtube.com/watch?v=AoBLx4ctoX0&t=4s",
      },
    ],
  },
  {
    id: "pricepal-running-rewards-app",
    title: "PricePal Running & Rewards App",
    year: 2024,
    tags: ["school", "code", "design", "user research", "business"],
    skills: [
      "Figma",
      "User-Centered Design",
      "Semi-Structured Interviews",
      "Affinity Diagramming",
      "React",
      "TypeScript",
      "Market Research",
    ],
    color: "#9fb0a3",
    tagline: "Merging app development with business management.",
    details: [
      "PricePal is a mobile application prototype created for the course Cooperative IT-Design, where Media Technology and Industrial Management students collaborated on a cross-functional project.",
      "We began with market research, surveys, competitor analysis, and stakeholder input to identify gaps in the fitness and rewards space. This led to a running app where users can join brand-sponsored challenges to earn discounts and rewards.",
      "Our team moved from paper prototypes into a pre-study phase and two rounds of user testing, refining a high-fidelity Figma prototype through an iterative design process.",
    ],
    images: [
      projectAssetPath("pricepal/pricepal1.png"),
      projectAssetPath("pricepal/PricePal_Home.png"),
      projectAssetPath("pricepal/PricePal_Challenge.png"),
      projectAssetPath("pricepal/PricePal_Tracker.png"),
      projectAssetPath("pricepal/PricePal_Timeline.png"),
      projectAssetPath("pricepal/PricePal_Rewards.png"),
      projectAssetPath("pricepal/PricePal_Profile.png"),
    ],
    links: [
      {
        label: "Figma prototype",
        href: "https://www.figma.com/proto/xCqT2aGAGepzMFrBeIRUFs/KID%2FDEL-Prototype?page-id=0%3A1&node-id=581-3422&node-type=canvas&viewport=-13902%2C-506%2C0.65&t=5HKEXEYtRniK5z8A-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=581%3A",
      },
    ],
  },
  {
    id: "publishing-company-brand-identity",
    title: "Publishing Company Brand Identity",
    year: 2025,
    tags: ["freelance", "design"],
    skills: ["Adobe Illustrator", "Graphic Design", "Brand Identity", "Remote Collaboration"],
    color: "#b8ad9f",
    tagline: "Contributing to my favourite podcast's new project.",
    details: [
      "In early 2025 I reached out to a favourite podcast of mine and ended up working on a new brand identity for a publishing company they were starting.",
      "My involvement focused on creating logos and mock-ups for the brand presentation while working remotely. It helped refine my ability to communicate concepts, interpret a desired goal and feeling, and turn those ideas into professional visuals.",
    ],
    images: [
      projectAssetPath("historyoflit/holpress1.png"),
      projectAssetPath("historyoflit/holpress2.png"),
    ],
  },
  {
    id: "sign-alphabet-learning-app",
    title: "Sign Alphabet Learning App",
    year: 2023,
    tags: ["school", "code", "design", "user research"],
    skills: [
      "Python",
      "Tkinter",
      "MediaPipe",
      "OpenCV",
      "Computer Vision",
      "Iterative Prototyping",
    ],
    color: "#a1b4b6",
    tagline: "A gesture recognition system creating new ways to learn.",
    details: [
      "Sign Alphabet is a gesture recognition system designed to help users learn the American Sign Language alphabet. It uses MediaPipe Hands for image processing and a Random Forest machine learning model that achieved 99.6% accuracy in classifying ASL letters.",
      "The program features real-time gesture recognition, a Tkinter-based GUI, and OpenCV camera display. A usability test with four participants used think-aloud sessions and interviews to guide refinements.",
      "This was a team collaboration of four people. I was responsible for the interface and game mechanics, moving from early sketches to a Figma prototype and then to a locally running Tkinter GUI.",
    ],
    images: [
      projectAssetPath("signalphabet/signalpha.png"),
      projectAssetPath("signalphabet/signalpha2.JPG"),
      projectAssetPath("signalphabet/signalpha3.JPG"),
    ],
  },
  {
    id: "spotify-design-challenge",
    title: "Spotify Design Challenge",
    year: 2024,
    tags: ["school", "design", "user research"],
    skills: ["Figma", "Rapid Design", "Mockups", "Storyboards", "Mapping", "User Flows"],
    color: "#8fb39c",
    tagline: "A new way to interact with the music of your environment.",
    details: [
      "This two-week UX and product design challenge explored how Spotify could use AI to enhance music discovery through explicit user preferences and implicit listening behaviors.",
      "Using user mapping and behavioral analysis, I identified how users currently discover music and where AI-powered recommendations could add value. Storyboarding helped explore real-world discovery scenarios throughout a user's day.",
      "Rapid prototyping in Figma translated these ideas into mid-fidelity product concepts, reinforcing the value of user research, concept development, and fast iteration in shaping AI-assisted product experiences.",
    ],
    images: [
      projectAssetPath("designchallenge/spotify1.png"),
      projectAssetPath("designchallenge/spotify-project-DSsolgIN.png"),
      projectAssetPath("designchallenge/spotify-mapping-DbUNhqnS.png"),
      projectAssetPath("designchallenge/spotify-feature-1-BoTIKxlu.png"),
      projectAssetPath("designchallenge/spotify-feature-2-8ek3l07_.png"),
      projectAssetPath("designchallenge/spotify-screen-1-s0KnOBuJ.png"),
      projectAssetPath("designchallenge/spotify-screen-2-BkFAA7h3.png"),
      projectAssetPath("designchallenge/spotify-screen-3-BeCdeFN5.png"),
      projectAssetPath("designchallenge/spotify-screen-4-DW6KrOa3.png"),
      projectAssetPath("designchallenge/spotify-screen-5-sajHC4fM.png"),
    ],
  },
  {
    id: "cultural-integration-social-app",
    title: "Cultural Integration Social App",
    year: 2023,
    tags: ["school", "design", "user research"],
    skills: [
      "Figma",
      "Rapid Design",
      "Mockups",
      "Storyboards",
      "Mapping",
      "User Flows",
      "Affinity Diagramming",
      "User Research",
      "Market Research",
    ],
    color: "#b8a6a0",
    tagline: "Taking on fun challenges in all-new places.",
    details: [
      "This was the first project of my Master's degree and the first where I worked with a team of international students. We developed a service for foreigners to connect with and integrate into a new culture and place.",
      "The app prototype, nicknamed Postcardly, was my first substantial Figma project. We aimed to create a new version of the prototype every week, gradually moving from basic wireframes to an interactive showcase of user flows.",
      "The project was also a new way of approaching design from user needs directly, gathering data from 14 real-world users and creating personas to guide the resulting prototype.",
    ],
    images: [
      projectAssetPath("postcardly/postcardly1.png"),
      projectAssetPath("postcardly/postcardly2.png"),
      projectAssetPath("postcardly/postcardly3.png"),
    ],
  },
];

export default projects;
