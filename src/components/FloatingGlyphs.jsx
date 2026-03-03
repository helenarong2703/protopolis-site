import { useMemo } from "react";
import "./FloatingGlyphs.css";

const PROTOCOL_CHARS = "\u27E8\u27E9{}[]|/\\\u2192\u2190\u2191\u2193\u25CA\u25C7\u25CB\u25CF\u25B3\u25BD\u221E\u2248\u2260\u00B1\u2202\u222B\u2211\u220F\u221A\u2207";

export default function FloatingGlyphs() {
  const glyphs = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        char: PROTOCOL_CHARS[Math.floor(Math.random() * PROTOCOL_CHARS.length)],
        delay: Math.random() * 10,
        x: Math.random() * 100,
        duration: 8 + Math.random() * 12,
      })),
    []
  );

  return (
    <div className="floating-glyphs">
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="floating-glyph"
          style={{
            left: `${g.x}%`,
            animationDuration: `${g.duration}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.char}
        </span>
      ))}
    </div>
  );
}
