import React from "react";

function Divider({ color = "#f97316" }) {
  return (
    <div className="relative my-10">
      <div
        className="h-[1px] w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          opacity: 0.4,
        }}
      />
      <div
        className="absolute inset-0 h-[1px] blur-md"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          opacity: 0.2,
        }}
      />
    </div>
  );
}


export default Divider;
