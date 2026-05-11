const publicPath = path => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const slides = {
  home: {
    greetings: [
      {
        id: "en",
        language: "English",
        flag: {
          src: publicPath("/images/flags/ireland.svg"),
          alt: "Ireland flag",
        },
        intro: "Hi, my name is",
        name: "William O'Grady",
        welcome: "...Welcome to my portfolio!",
      },
      {
        id: "sv",
        language: "Swedish",
        flag: {
          src: publicPath("/images/flags/sweden.svg"),
          alt: "Sweden flag",
        },
        intro: "Hej, jag heter",
        name: "William O'Grady",
        welcome: "...V\u00e4lkommen till min portfolio!",
      },
      {
        id: "de",
        language: "German",
        flag: {
          src: publicPath("/images/flags/germany.svg"),
          alt: "Germany flag",
        },
        intro: "Hallo, ich heiße",
        name: "William O'Grady",
        welcome: "...Willkommen in meinem Portfolio!",
      },
    ],
  },
  about: {
    title: "About Me",
    image: {
      src: publicPath("/images/about/profileimg-placeholder.png"),
      alt: "William O'Grady",
    },
    description: [
      "I'm a newly graduated engineer in Media Technology from KTH in Stockholm, where I specialised in data visualization and interaction design.",
      "My passion lies in working in teams, translating complex technical ideas into intuitive, usable solutions. Whether the solution is a website, an app, an interface, or a presentation, it's the people around me that bring purpose.",
      "Beyond engineering, you'll find me at the cinema, reading old Russian novels in a cozy corner of a cafe, playing the piano, or writing short film scripts with my best friend Linus.",
    ],
    actions: [
      {
        label: "Resume",
        href: publicPath("/resume.pdf"),
      },
      {
        label: "Email",
        href: "mailto:billy.ogrady2001@gmail.com",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/william-ogrady",
        external: true,
      },
    ],
  },
};

export default slides;
