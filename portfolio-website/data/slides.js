const publicPath = path => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const iconPath = iconName => publicPath(`/assets/icons/${iconName}.svg`);

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
      src: publicPath("/assets/images/about/profile-image.JPG"),
      alt: "William O'Grady",
    },
    description: [
      "I'm a newly graduated engineer in Media Technology from KTH in Stockholm, where I specialised in data visualization and interaction design.",
      "My passion lies in working in teams, translating complex technical ideas into intuitive, usable solutions. Whether the solution is a website, an app, an interface, or a presentation, it's the people around me that bring purpose.",
      "Beyond engineering, you'll find me at the cinema, reading old Russian novels in a cozy corner of a cafe, playing the piano, or writing short film scripts with my best friend Linus.",
    ],
    contactMethods: [
      {
        label: "+46 (0)72 031 53 17",
        value: "+46 (0)72 031 53 17",
        icon: "phone",
        iconSrc: iconPath("phone"),
      },
      {
        label: "billy.ogrady2001@gmail.com",
        value: "billy.ogrady2001@gmail.com",
        icon: "email",
        iconSrc: iconPath("email"),
      },
    ],
    actions: [
      {
        label: "Resume",
        href: publicPath("/assets/documents/resume.pdf"),
        icon: "resume",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/williamjogrady",
        icon: "linkedin",
        iconSrc: iconPath("linkedin"),
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/williamogrady",
        icon: "github",
        iconSrc: iconPath("github"),
        external: true,
      },
    ],
    copyIcon: iconPath("copy"),
    checkIcon: iconPath("check"),
  },
};

export default slides;
