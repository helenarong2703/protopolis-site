import { useEffect, useRef } from "react";
import "./NoiseCanvas.css";

export default function NoiseCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const draw = () => {
      const d = ctx.createImageData(c.width, c.height);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = v;
        d.data[i + 1] = v;
        d.data[i + 2] = v;
        d.data[i + 3] = 8;
      }
      ctx.putImageData(d, 0, 0);
    };
    const iv = setInterval(draw, 100);
    return () => clearInterval(iv);
  }, []);

  return <canvas ref={ref} className="noise-canvas" />;
}
