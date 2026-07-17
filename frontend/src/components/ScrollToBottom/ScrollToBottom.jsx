import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import "./ScrollToBottom.css";

function ScrollToBottom() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Only show the button if there is scrollable content below the viewport
      // and we are not already close to the bottom (within 200px of the footer)
      const isScrollable = totalHeight > viewportHeight + 100;
      const isNearBottom = totalHeight - (scrollPosition + viewportHeight) < 200;

      if (isScrollable && !isNearBottom) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run initial check after rendering
    handleScroll();

    // Check again after page load and image updates
    const timer = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToFooter = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-to-bottom-btn ${visible ? "show" : ""}`}
      onClick={scrollToFooter}
      title="Scroll to Footer"
      aria-label="Scroll to Footer"
    >
      <FaArrowDown size={18} />
    </button>
  );
}

export default ScrollToBottom;
