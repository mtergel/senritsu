import { useState, useRef, useEffect } from "react";

function usePlaying(initPlaying) {
  const [isPlaying, setIsPlaying] = useState(initPlaying);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isPlaying, setIsPlaying };
}

export default usePlaying;
