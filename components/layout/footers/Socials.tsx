import { socialMediaLinks } from '@/data/socialLinks'
import React from 'react'

interface ComponentProps {
  componentsClass: string
  textSize?: string
}

const Socials: React.FC<ComponentProps> = ({ componentsClass, textSize }) => {
  return (
    <>
      {socialMediaLinks.map((link, i: number) => (
        <a
          key={i}
          className={componentsClass ? componentsClass : ''}
          href={link.href}
        >
          <i className={`${link.iconClassName} ${textSize}`}></i>
        </a>
      ))}
    </>
  )
}

export default Socials
