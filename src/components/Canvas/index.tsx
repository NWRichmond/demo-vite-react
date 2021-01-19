import React, { useRef, useState, useEffect } from "react";

export default function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastCoords, setLastCoords] = useState([0, 0]);
  const [hue, setHue] = useState(0);

  // event handlers
  const enableDrawing = () => setIsDrawing(true);
  const disableDrawing = () => setIsDrawing(false);
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setLastCoords([offsetX, offsetY]);

    if (isDrawing && event.nativeEvent) {
      const ctx = canvas!.current ? canvas.current.getContext("2d") : null;

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastCoords[0], lastCoords[1]);
        ctx.lineTo(offsetX, offsetY);
        ctx.lineWidth = Math.abs(50 - (hue % 100));
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.stroke();
        setHue(hue + 1);
      }
    }
  };

  useEffect(() => {
    if (canvas!.current) {
      const ctx = canvas.current.getContext("2d");
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      if (ctx !== null) {
        ctx.strokeStyle = "#BADA55";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
      }
    }
  }, [canvas]);
  return (
    <canvas
      ref={canvas}
      width="800"
      height="800"
      onMouseMove={draw}
      onMouseDown={enableDrawing}
      onMouseUp={disableDrawing}
      onMouseOut={disableDrawing}
    />
  );
}
