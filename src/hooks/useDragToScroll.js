import { useEffect, useRef } from "react";

export default function useDragToScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      setupDragToScroll();
    });

    const setupDragToScroll = () => {
      // Select all direct children of the element
      const children = el.querySelectorAll(":scope > *");

      const preventDragstart = (e) => e.preventDefault();

      children.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.setAttribute("draggable", "false");
          child.style.userSelect = "none";
          child.style.webkitUserSelect = "none";
          child.addEventListener("dragstart", preventDragstart);
        }
      });
    };

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
      el.style.cursor = "grabbing";
    };

    const onMouseUpOrLeave = () => {
      if (moved) {
        el.addEventListener("click", preventClick, true);
      }
      isDown = false;
      el.style.cursor = "grab";
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

    // Initial setup
    setupDragToScroll();
    el.style.cursor = "grab";

    // Start observing
    observer.observe(el, { childList: true, subtree: true });

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUpOrLeave);
    el.addEventListener("mouseleave", onMouseUpOrLeave);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      observer.disconnect();

      const children = el.querySelectorAll(":scope > *");
      children.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.removeEventListener("dragstart", (e) => e.preventDefault());
          child.removeAttribute("draggable");
          child.style.userSelect = "";
          child.style.webkitUserSelect = "";
        }
      });

      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUpOrLeave);
      el.removeEventListener("mouseleave", onMouseUpOrLeave);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("click", preventClick, true);
      el.style.cursor = "";
    };
  }, []);

  return ref;
}
