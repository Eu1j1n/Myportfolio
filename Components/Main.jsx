import { useEffect, useRef, useState } from "react";
import "../Style/Main.css";
import { gsap } from "gsap";

function Main() {
  const textRefs = useRef([]);
  const followerRef = useRef(null);
  const texts = ["EUIJIN", "PORTFOLIO!!"];
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState([false, false]); // Overview와 About 텍스트 가시성을 위한 상태

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

      if (followerRef.current) {
        followerRef.current.style.top = `${event.clientY}px`;
        followerRef.current.style.left = `${event.clientX}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove); // 여기에서 document에 추가
    return () => {
      document.removeEventListener("mousemove", handleMouseMove); // 제거 시에도 document에서 제거
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
            }
          );
        });
      });
    };

    animateText();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight * 0.75 && !isTyping) {
        setIsTyping(true);
        typeText();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTyping]);

  const typeText = () => {
    const overviewText = ["Overview", "Write about yourself here..."];
    overviewText.forEach((text, index) => {
      const ref = textRefs.current[index + texts.length]; // Adjust index to target overview texts
      const letters = text.split("");

      ref.innerHTML = ""; // Clear previous content

      letters.forEach((letter, letterIndex) => {
        const span = document.createElement("span");
        span.textContent = letter;
        ref.appendChild(span);
        gsap.fromTo(
          span,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.1,
            delay: index * 0.5 + letterIndex * 0.1,
            ease: "power2.out",
          }
        );
      });
    });
  };

  // Intersection Observer API 사용하여 두 번째 섹션의 가시성 감지
  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% 이상 보일 때 트리거
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible([true, true]); // 두 번째 섹션의 텍스트를 보이게 설정
          observer.unobserve(entry.target); // 한 번만 실행
        }
      });
    }, options);

    const secondSection = document.querySelector(".second-section");
    if (secondSection) {
      observer.observe(secondSection);
    }

    const resetVisibility = () => {
      setIsVisible([false, false]); // 가시성 상태를 초기화
      if (secondSection) {
        observer.observe(secondSection); // 다시 관찰
      }
    };

    window.addEventListener("scroll", resetVisibility); // 스크롤할 때마다 가시성 초기화

    return () => {
      if (secondSection) {
        observer.unobserve(secondSection);
      }
      window.removeEventListener("scroll", resetVisibility); // 이벤트 리스너 제거
    };
  }, []);

  return (
    <div className="container">
      {/* 첫 번째 섹션 */}
      <div className="first-section">
        <div className="left-section">
          <div className="eyes">
            <span className="eye"></span>
            <span className="eye"></span>
          </div>
        </div>
        <div className="right-section">
          {texts.map((text, index) => (
            <h1
              key={index}
              ref={(el) => (textRefs.current[index] = el)}
              className="portfolio-title"
            ></h1>
          ))}
        </div>
      </div>
      <div className="mouse-follower" ref={followerRef}></div>
      {/* 두 번째 섹션 */}
      <div className="second-section">
        <div className="overview-section">
          <h1
            ref={(el) => (textRefs.current[2] = el)}
            style={{
              opacity: isVisible[0] ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            Overview
          </h1>
        </div>
        <div className="about-section">
          <p
            ref={(el) => (textRefs.current[3] = el)}
            style={{
              opacity: isVisible[1] ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            안녕하세요! 저는 프론트엔드 개발자로서 다양한 프로젝트에 도전하며
            열정을 가지고 일하고 있습니다<br></br> 항상 활발하게 소통하며 팀과
            협력하는 것을 중요하게 생각하고, 변화하는 기술 트렌드에 발맞춰
            나가려고 노력합니다. 사용자 경험을 최우선으로 고려하며, 창의적인
            해결책을 찾는 데 기쁨을 느낍니다. <br></br>제 포트폴리오는 이러한
            가치들이 담겨 있습니다. 함께 더 나은 결과물을 만들어 나가고
            싶습니다!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
