"use client";

import { useCallback, useEffect, useRef } from "react";

type ResizeAxis = "horizontal" | "vertical";

export function usePanelResize(
  axis: ResizeAxis,
  onResize: (delta: number) => void,
  onResizeEnd?: () => void
) {
  const dragging = useRef(false);
  const startPos = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    startPos.current = axis === "horizontal" ? e.clientX : e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = axis === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  }, [axis]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const pos = axis === "horizontal" ? e.clientX : e.clientY;
      const delta = pos - startPos.current;
      startPos.current = pos;
      onResize(delta);
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      onResizeEnd?.();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [axis, onResize, onResizeEnd]);

  return { onPointerDown };
}
