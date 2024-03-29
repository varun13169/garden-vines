import React from "react";

export function PlaylistSVG(props) {
  return (
    <svg
      className=""
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="var(--dui-primary-color-p2)"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 3V1H2v2h15zm0 4V5H2v2h15zM6 11V9H2v2h4zm2-2h9c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm3 7l3.33-2L11 12v4zm-5-1v-2H2v2h4zm0 4v-2H2v2h4z"></path>
    </svg>
  );
}
