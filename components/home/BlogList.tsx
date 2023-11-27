import React from 'react'
import { blogs } from '@/data/blog'
import Image from 'next/image'
import Link from 'next/link'

const BlogList: React.FC = () => {
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Blog</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>

          <div className="col-auto">
            <Link
              href="/blog-list-1"
              className="button -icon -purple-3 text-purple-1"
            >
              Browse Blog
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 pt-60">
          {blogs.slice(0, 4).map((elm, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-6"
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 500}
            >
              <div
                className="blogCard -type-1"
                data-aos="fade-left"
                data-aos-duration={(i + 1) * 400}
              >
                <div className="blogCard__image">
                  <Image
                    width={550}
                    height={465}
                    src={elm.imageSrc}
                    alt="image"
                  />
                </div>
                <div className="blogCard__content mt-20">
                  <div className="blogCard__category">{elm.category}</div>
                  <h4 className="blogCard__title text-17 lh-15 mt-5">
                    <Link className="linkCustom" href={`/blogs/${elm.id}`}>
                      {elm.title}{' '}
                    </Link>
                  </h4>
                  <div className="blogCard__date text-14 mt-5">{elm.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogList
