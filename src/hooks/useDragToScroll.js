import { useEffect, useRef } from "react";

export default function useDragToScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Select all direct children of the element
    const children = el.querySelectorAll(":scope > *");

    const preventDragstart = (e) => e.preventDefault();

    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        child.setAttribute("draggable", "false");
        child.addEventListener("dragstart", preventDragstart);
      }
    });

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let moved = false;

    const preventClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      el.removeEventListener("click", preventClick, true);
    };

    const onMouseDown = (e) => {
      isDown = true;
      startX = e.clientX;
      scrollLeft = el.scrollLeft;
      moved = false;
    };

    const onMouseUpOrLeave = () => {
      if (moved) {
        el.addEventListener("click", preventClick, true);
      }
      isDown = false;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;

      const walk = e.clientX - startX;

      if (Math.abs(walk) > 3) {
        moved = true;
        e.preventDefault();
        el.scrollLeft = scrollLeft - walk;
      }
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUpOrLeave);
    el.addEventListener("mouseleave", onMouseUpOrLeave);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      children.forEach((child) => {
        child.removeEventListener("dragstart", preventDragstart);
        child.removeAttribute("draggable");
      });

      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUpOrLeave);
      el.removeEventListener("mouseleave", onMouseUpOrLeave);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("click", preventClick, true);
    };
  }, []);

  return ref;
}
