Asset structure

- documents: shared PDFs, including the resume.
- icons: reusable UI/social icons.
- images/about: about-page portraits and supporting images.
- projects: project-specific assets.

Recommended project folders:

public/assets/projects/project-slug/
- cover.jpg
- gallery-01.png
- gallery-02.png
- report.pdf

In data/projects.js:

images can use color placeholders or real files:
{ src: projectAssetPath("project-slug/cover.jpg"), alt: "Project cover" }

links are for external URLs such as GitHub repositories and Figma prototypes.
documents are for PDFs stored in this assets folder.
