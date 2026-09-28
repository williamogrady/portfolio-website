import "../../../lab/carousel/carousel.css";
import projects from "../../../data/projects";
import ProjectCarousel from "../ProjectCarousel";

export default function ProjectsSlide() {
  return (
    <div className="projects-carousel-slide">
      <ProjectCarousel projects={projects} />
    </div>
  );
}
