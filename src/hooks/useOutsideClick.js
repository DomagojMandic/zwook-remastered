import { useEffect, useRef } from "react";

/* True for event capturing */
function useOutsideClick(handler, capturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, capturing);

    return () => {
      document.removeEventListener("click", handleClick, capturing);
    };
  }, [handler, capturing]);

  return ref;
}

export default useOutsideClick;
