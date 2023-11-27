import { links } from "../../../data/links";
import Link from "next/link";
import React from "react";

export default function Links({ allClasses }) {
  return (
    <>
      {links.map((link, index) => (
        <Link
          className={`${allClasses ? allClasses : ""}`}
          key={index}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
