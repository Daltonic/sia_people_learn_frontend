import React from 'react'
import { footerLinks } from '@/data/footerLinks'
import Link from 'next/link'

interface ComponentProps {
  allClasses: string
  parentClass?: string
}

const FooterLinks: React.FC<ComponentProps> = ({ allClasses, parentClass }) => {
  return (
    <>
      {footerLinks.slice(0, 3).map((elm, i) => (
        <div key={i} className={parentClass || 'col-xl-4 col-lg-4 col-md-6 '}>
          <div className={`${allClasses ? allClasses : ''}`}>{elm.title}</div>
          <div className="d-flex y-gap-10 flex-column text-black">
            {elm.links.map((itm, index) => (
              <Link key={index} href={itm.href}>
                {itm.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default FooterLinks
