import {useState, useEffect, useRef} from "react";

function useHover() {
  const [hovered, setHovered] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const itemRefCurr = itemRef.current;
    itemRefCurr.addEventListener('mouseenter', enter);
    itemRefCurr.addEventListener('mouseleave', leave);
    return () => {
      itemRefCurr.removeEventListener('mouseenter', enter);
      itemRefCurr.removeEventListener('mouseleave', leave);
    }
  }, [itemRef])

  function enter() {
    setHovered(true);
  }

  function leave() {
    setHovered(false);
  }

  return [hovered, itemRef];
}

export default useHover;