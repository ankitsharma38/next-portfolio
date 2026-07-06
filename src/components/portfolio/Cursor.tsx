"use client";

import React, { forwardRef, useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CursorProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  magnetic?: boolean;
}

const Cursor = forwardRef<HTMLDivElement, CursorProps>(({ children, magnetic = false, ...props }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const setRefs = (node: HTMLDivElement) => {
    innerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic || !innerRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = innerRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block relative"
      {...props}
    >
      {children}
    </motion.div>
  );
});

Cursor.displayName = "Cursor";
export default Cursor;
