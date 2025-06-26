import React from "react";

export default function SvgIcon({ name, size = 20, className = "" }) {
  return (
    <svg
      className={`fill-current ${className}`}
      width={size + "px"}
      height={size + "px"}
    >
      <use xlinkHref={`/icons/solid.svg#${name}`} />
    </svg>
  );
}
