import React from "react";
import { learningJourney } from "../../data/learningPaths";
import Image from "next/image";
export default function LearningJourney() {
  return (
    <section className="section-bg layout-pt-lg layout-pb-md">
      <div className="section-bg__item -full -height-half bg-dark-5"></div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title text-white">
                Start your Learning Journey Today!
              </h2>

              <p className="sectionTitle__text text-white">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 lg:pt-50">
          {learningJourney.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div
                className="coursesCard -type-2 text-center pt-50 pb-40 px-30 rounded-8 bg-white shadow-2"
                data-aos="fade-right"
                data-aos-duration={(i + 1) * 250}
              >
                <div className="coursesCard__image">
                  <Image
                    width={60}
                    height={60}
                    src={elm.imageSrc}
                    alt="image"
                  />
                </div>
                <div className="coursesCard__content mt-30">
                  <h5 className="coursesCard__title text-18 lh-1 fw-500">
                    {elm.title}
                  </h5>
                  <p className="coursesCard__text text-14 mt-10">{elm.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
