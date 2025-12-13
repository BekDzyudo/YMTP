import React from "react";

function Dvider() {
  return (
    <div class="relative my-10">
      <div class="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      <div class="absolute inset-0 h-[1px] blur-md bg-gradient-to-r from-transparent via-blue-700/20 to-transparent"></div>
    </div>
  );
}

export default Dvider;
