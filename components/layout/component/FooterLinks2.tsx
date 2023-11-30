import React from 'react'
import { footerLinks } from '@/data/footerLinks'
import Link from 'next/link'

interface ComponentProps {
  allClasses: string
  parentClass?: string
}

const FooterLinks: React.FC<ComponentProps> = ({ allClasses, parentClass }) => {
  return (
    <div className='flex flex-1'>
      {footerLinks.slice(0, 4).map((elm, i) => (
        <div key={i} className="">
          <div className={`${allClasses ? allClasses : 'border-2'}`}>{elm.title}</div>
          <div className="flex flex-column border text-black">
            {elm.links.map((itm, index) => (
              <Link key={index} href={itm.href}>
                {itm.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FooterLinks
