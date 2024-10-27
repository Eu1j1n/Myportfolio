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
        <div className="project-content">
          <div className="project-description">
            <h1>프로젝트 설명</h1>
            <p>이곳에 프로젝트에 대한 설명을 넣을 수 있습니다.</p>
          </div>
          <div className="project-image">
            <img src="/path/to/your/image.jpg" alt="프로젝트 이미지" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
