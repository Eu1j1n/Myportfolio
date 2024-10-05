import { useEffect, useRef, useState } from "react";
import "../Style/Main.css";
import { gsap } from "gsap";

import smileGif from "../Assets/smile.gif";
import fireGif from "../Assets/fire.gif";

function Main() {
  const textRefs = useRef([]);
  const followerRef = useRef(null);

  const texts = ["EUIJIN", "PORTFOLIO!!"];
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState([false, false]);
  const [showFireGif, setShowFireGif] = useState(false);
  const [showSmileGif, setShowSmileGif] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);

  const thirdSectionRef = useRef(null);

  const secondSectionRef = useRef(null);
  const scrollToSecondSection = () => {
    console.log("SVG clicked!"); // 로그 추가
    if (secondSectionRef.current) {
      console.log("Second Section Ref:", secondSectionRef.current);
      const sectionPosition =
        secondSectionRef.current.getBoundingClientRect().top + window.scrollY;
      console.log("Section Position:", sectionPosition);
      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
    } else {
      console.log("Second section reference is null.");
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      document.querySelectorAll(".eye").forEach((eye) => {
        console.log("Cursor Y Position:", event.clientY);
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

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
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
    const overviewText = ["Overview"];
    overviewText.forEach((text, index) => {
      const ref = textRefs.current[index + texts.length];
      const letters = text.split("");

      ref.innerHTML = "";

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible([true, true]);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const secondSection = document.querySelector(".second-section");
    if (secondSection) {
      observer.observe(secondSection);
    }

    const resetVisibility = () => {
      setIsVisible([false, false]);
      if (secondSection) {
        observer.observe(secondSection);
      }
    };

    window.addEventListener("scroll", resetVisibility);

    return () => {
      if (secondSection) {
        observer.unobserve(secondSection);
      }
      window.removeEventListener("scroll", resetVisibility);
    };
  }, []);

  const handleMouseEnterFire = () => {
    setShowFireGif(true);
    setIsOverviewVisible(false);
  };

  const handleMouseLeaveFire = () => {
    setShowFireGif(false);
    setIsOverviewVisible(true);
  };

  const handleMouseEnterSmile = () => {
    setShowSmileGif(true);
    setIsOverviewVisible(false);
  };

  const handleMouseLeaveSmile = () => {
    setShowSmileGif(false);
    setIsOverviewVisible(true);
  };

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

        <div className="svg-container" onClick={scrollToSecondSection}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "100%",
              height: "100%",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <defs>
              <clipPath id="__lottie_element_157">
                <rect width="200" height="200" x="0" y="0"></rect>
              </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_157)">
              <g
                transform="matrix(0.2658953368663788,0,0,0.2658953368663788,24.618675231933594,55.587215423583984)"
                opacity="0.8"
                style={{ display: "block" }}
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d=" M283.4639892578125,274.375 C273.343994140625,274.375 263.2250061035156,272.17498779296875 253.79800415039062,267.7760009765625 C253.79800415039062,267.7760009765625 16.750999450683594,157.16299438476562 16.750999450683594,157.16299438476562 C4.238999843597412,151.32400512695312 -1.1710000038146973,136.447998046875 4.668000221252441,123.93599700927734 C10.505999565124512,111.42400360107422 25.381999969482422,106.01499938964844 37.89400100708008,111.85399627685547 C37.89400100708008,111.85399627685547 274.9410095214844,222.46600341796875 274.9410095214844,222.46600341796875 C280.3580017089844,224.9929962158203 286.5710144042969,224.99200439453125 291.98699951171875,222.46600341796875 C291.98699951171875,222.46600341796875 529.0349731445312,111.85399627685547 529.0349731445312,111.85399627685547 C541.5469970703125,106.01399993896484 556.4219970703125,111.42400360107422 562.260986328125,123.93599700927734 C568.0989990234375,136.447998046875 562.6890258789062,151.32400512695312 550.177001953125,157.16299438476562 C550.177001953125,157.16299438476562 313.1300048828125,267.7760009765625 313.1300048828125,267.7760009765625 C303.7040100097656,272.17498779296875 293.5840148925781,274.375 283.4639892578125,274.375z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="mouse-follower" ref={followerRef}></div>
      {/* 두 번째 섹션 */}
      <div className="second-section" ref={secondSectionRef}>
        <div className="overview-section">
          <h1
            ref={(el) => (textRefs.current[2] = el)}
            style={{
              opacity: isOverviewVisible && isVisible[0] ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            Overview
          </h1>
          {showFireGif && (
            <div className="gif-container">
              <img src={fireGif} alt="Fire Animation" />
            </div>
          )}
        </div>
        <div className="about-section">
          <p
            ref={(el) => (textRefs.current[3] = el)}
            style={{
              opacity: isVisible[1] ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            안녕하세요! 저는&nbsp;
            <span className="highlight">프론트엔드 개발자</span>{" "}
            {/* 클래스 이름으로 변경 */}
            로서 다양한 프로젝트에 도전하며&nbsp;
            <span
              className="highlight"
              onMouseEnter={handleMouseEnterFire}
              onMouseLeave={handleMouseLeaveFire}
            >
              열정
            </span>
            을 가지고 공부하고 있습니다
            <br />
            항상 활발하게 소통하며 팀과 협력하는 것을 중요하게 생각하고,
            변화하는 기술 트렌드에 발맞춰 나가려고 노력합니다. 사용자 경험을
            최우선으로 고려하며, 창의적인 해결책을 찾는 데{" "}
            <span
              className="highlight"
              onMouseEnter={handleMouseEnterSmile}
              onMouseLeave={handleMouseLeaveSmile}
            >
              기쁨
            </span>
            을 느낍니다.
            <br />제 포트폴리오는 이러한 가치들이 담겨 있습니다. 함께 더 나은
            결과물을 만들어 나가고 싶습니다!
          </p>
          {showSmileGif && (
            <div className="gif-container">
              <img src={smileGif} alt="Smile Animation" />
            </div>
          )}
        </div>
      </div>

      <div className="third-section" ref={thirdSectionRef}>
        <h1>저에 대해 더 알고 </h1>
        <div className="circle-container">
          <span className="circle-text">싶으신가요?</span>
          <svg
            className="circle_point"
            viewBox="0 0 416 178"
            width="422"
            height="180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="circle_point_path active_dash"
              d="M410.253 113.699c-111.805 25.438-395.886 73.056-407.44-21.27-9.3-75.975 173.292-85.082 189.343-87.243 16.05-2.16 214.059-18.105 221.119 39.5C423.872 131.172 189.5 163.5 137.5 176"
              stroke="#121111"
              strokeWidth="3"
              strokeMiterlimit="10"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Main;
