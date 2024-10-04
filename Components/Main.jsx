import { useEffect, useRef } from "react";
import "../Style/Main.css";
import { gsap } from "gsap";

function Main() {
  const textRefs = useRef([]);
  const sectionRef = useRef(null);
  const texts = ["Hello", "I'm Front-end Developer", "Euijin Kim!!"];

  useEffect(() => {
    const handleMouseMove = (event) => {
      document.querySelectorAll(".eye").forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(
          event.clientY - centerY,
          event.clientX - centerX
        );
        const rotateDeg = angle * (180 / Math.PI) + 270;
        eye.style.transform = `rotate(${rotateDeg}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateText = () => {
      texts.forEach((text, index) => {
        const ref = textRefs.current[index];
        const letters = text.split("");

        ref.innerHTML = "";

        letters.forEach((letter, letterIndex) => {
          const span = document.createElement("span");
          span.textContent = letter;
          ref.appendChild(span);
          gsap.fromTo(
            span,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.5 + letterIndex * 0.1,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(span, {
                  color: "#39ff14",
                  scale: 1.2,
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                });
              },
            }
          );
        });
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateText();
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="left-section" ref={sectionRef}>
        <div className="eyes">
          <span className="eye"></span>
          <span className="eye"></span>
        </div>
      </div>
      <div className="right-section">
        {texts.map((text, index) => (
          <h1 key={index} ref={(el) => (textRefs.current[index] = el)}></h1>
        ))}
      </div>
    </div>
  );
}

export default Main;
