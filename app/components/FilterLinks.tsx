import React from "react";
const { flag } = require("country-emoji");

function cuteText(text: String): String {
  const f = flag(text);
  if (f) return `${f} ${text}`;
  if (text === "medieval") return `🏰 ${text}`;
  return text;
}

export const LinkItem = ({ value, handleClick }) => (
  <button
    className="outline-none hover:text-pink-500 hover:underline"
    onClick={() => handleClick(value)}
  >
    {cuteText(value)}
  </button>
);

export default function FilterLinks({ values, handleClick }) {
  return values.map((v, i) => [
    i > 0 && ", ",
    <LinkItem key={i} handleClick={handleClick} value={v} />,
  ]);
}
