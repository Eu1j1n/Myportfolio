import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../Style/Project.css";

function Project() {
  const projectRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      curtainLeftRef.current,
      { x: "0%" },
      { x: "-100%", duration: 1.2, ease: "power2.inOut" }
    )
      .fromTo(
        curtainRightRef.current,
        { x: "0%" },
        { x: "100%", duration: 1.2, ease: "power2.inOut" },
        "-=1.2"
      )

      .fromTo(
        projectRef.current,
        { opacity: 0, y: "100%" },
        { opacity: 1, y: "0%", duration: 1.5, ease: "power3.out" }
      );
  }, []);

  return (
    <div className="project-wrapper">
      <div className="curtain curtain-left" ref={curtainLeftRef}></div>
      <div className="curtain curtain-right" ref={curtainRightRef}></div>

      <div ref={projectRef} className="project-container">
        <h1>프로젝트 단입니다</h1>
      </div>
    </div>
  );
}

export default Project;
