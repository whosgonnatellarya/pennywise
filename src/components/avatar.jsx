import React from "react";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 60% 40%)`;
}

export default function Avatar({ name, size = 48 }) {
  const initials = name ? name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase() : "?";
  const bg = stringToColor(name || initials);

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-medium"
      style={{
        width: size,
        height: size,
        background: bg,
        minWidth: size,
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
