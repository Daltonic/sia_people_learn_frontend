'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ComponentProps {
  data: any
  index?: number
}

const CourceCardSlider: React.FC<ComponentProps> = ({ data, index }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill('star');
    setRating(newRating);
  }, [data.rating]);

  return (
    <div
      className="swiper-slide -type-1 px-10 py-10 border-light bg-white rounded-8"
      style={{ height: 'fit-content' }}
    >
      <div>
        <div className="coursesCard -type-1 h-80 ">
          <div className="relative">
            <div className="coursesCard__image overflow-hidden rounded-8">
              <Image
                width={500}
                height={500}
                style={{ height: '100%', width: '100%' }}
                className="w-1/1"
                src={data.imageSrc}
                alt="image"
              />
              <div className="coursesCard__image_overlay rounded-8"></div>
            </div>
            <div className="flex justify-between py-10 px-10 absolute-full-center z-3"></div>
          </div>

          <div className="h-100 pt-15">
            <div className="flex items-center">
              <div className="text-sm lh-1 text-yellow-1 mr-10">
                {data.rating}
              </div>
              <div className="flex x-gap-5 items-center">
                {rating.map((itm, i) => (
                  <div key={i} className="icon-star text-9 text-yellow-1"></div>
                ))}
              </div>
              <div className="text-sm lh-1 ml-10">({data.ratingCount})</div>
            </div>

            <div className="text-sm lh-15 fw-500 text-dark-1 mt-10">
              <Link className="linkCustom" href={`/courses/${data.id}`}>
                {data.title}
              </Link>
            </div>

            <div className="flex justify-between items-center pt-10">
              <div className="flex items-center">
                <div className="mr-1">
                  <Image
                    width={10}
                    height={10}
                    src="assets/img/coursesCards/icons/1.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-xs">{data.lessonCount} lesson</div>
              </div>

              <div className="flex items-center">
                <div className="mr-1">
                  <Image
                    width={10}
                    height={10}
                    src="assets/img/coursesCards/icons/2.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-xs ">{`${Math.floor(
                  data.duration / 60
                )}h ${Math.floor(data.duration % 60)}m`}</div>
              </div>

              <div className="flex items-center">
                <div className="mr-1">
                  <Image
                    width={10}
                    height={10}
                    src="assets/img/coursesCards/icons/3.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-xs lh-1">{data.level}</div>
              </div>
            </div>

            <div className="coursesCard-footer">
              <div className="coursesCard-footer__author gap-2">
                <Image
                  width={25}
                  height={25}
                  src={data.authorImageSrc}
                  alt="image"
                  className='object-cover'
                />
                <p className='text-xs text-[#4F547B]'>{data.authorName}</p>
              </div>

              <div className="coursesCard-footer__price">
                {data.paid ? (
                  <div className='flex items-center gap-2'>
                    <p className='text-xs text-[#4F547B]'>${data.originalPrice}</p>
                    <p className='text-md  text-[#321463]'>${data.discountedPrice}</p>
                  </div>
                ) : (
                  <>
                    <div></div>
                    <div>Free</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourceCardSlider
