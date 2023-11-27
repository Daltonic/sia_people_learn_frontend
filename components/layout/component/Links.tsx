import { links } from '@/data/links'
import Link from 'next/link'
import React from 'react'

const Links: React.FC<{ allClasses: string }> = ({ allClasses }) => {
  return (
    <>
      {links.map((link, index) => (
        <Link
          className={`${allClasses ? allClasses : ''}`}
          key={index}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

export default Links
