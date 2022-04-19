import React from "react";

export default function ShoppingCartSVG(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="btn__icon icon icon-tabler icon-tabler-shopping-cart"
      width="56"
      height="56"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#9A9A9A"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l14 1l-1 7h-13" />
    </svg>
  );
}
