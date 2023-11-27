import React from "react";
import { footerLinks } from "../../../data/footerLinks";
import Link from "next/link";
export default function FooterLinksFour({ allClasses }) {
  return (
    <>
      {footerLinks.map((elm, i) => (
        <div key={i} className="col-xl-2 col-lg-4 col-md-6">
          <div className={`${allClasses ? allClasses : ""}`}>{elm.title}</div>
          <div className="d-flex y-gap-10 flex-column text-white">
            {elm.links.map((itm, index) => (
              <Link key={index} href={itm.href}>
                {itm.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
