"use client";
import { canvas } from 'framer-motion/client'; // optional import, not used
import React, { useEffect, useRef } from 'react';

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let isClicked = false;
      let startX = 0;
      let startY = 0;

      canvas.addEventListener("mousedown", (e) => {
        isClicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });

      canvas.addEventListener("mouseup", (e) => {
        isClicked = false;
        console.log(e.clientX);
        console.log(e.clientY);
      });

      canvas.addEventListener("mousemove", (e) => {
        if (isClicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.strokeRect(startX, startY, width, height);
        }
      });
    }
  }, [canvasRef]); 

  return (
    <div>
      <canvas ref={canvasRef} width={1500} height={766}></canvas>
    </div>
  );
};

export default page;
