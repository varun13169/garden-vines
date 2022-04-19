import React from "react";

export default function SearchSVG(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="dui-inp-txt__icon-content dui-inp-txt__icon-content--search icon icon-tabler icon-tabler-search"
      width="56"
      height="56"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#059669"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="15" y2="15" />
    </svg>
  );
}
