import { getCarouselProjectId, getLabPath, navigateLab } from "./labNavigation";
import ProjectCarousel from "./ProjectCarousel";
import ProjectSubpage from "./ProjectSubpage";
import "./carousel.css";

export default function CarouselLab({ pathname }) {
  const projectId = getCarouselProjectId(pathname);

  return (
    <div className="carousel-lab">
      <p className="carousel-lab__banner">
        <span>Carousel lab</span>
        <a
          href={getLabPath("/home/")}
          onClick={event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
              return;
            }

            event.preventDefault();
            navigateLab("/home/");
          }}
        >
          Back to deck
        </a>
      </p>
      {projectId ? <ProjectSubpage projectId={projectId} /> : <ProjectCarousel />}
    </div>
  );
}
