import React from "react";
import Image from "next/image";
export default function BacomeStudent() {
  return (
    <section className="layout-pt-md layout-pb-md">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-xl-4 offset-xl-1 order-lg-1 col-lg-6 order-2">
            <h3 className="text-24 lh-1">Become a Student</h3>
            <p className="mt-20">
              Join millions of people from around the world learning together.
              Online learning is as easy and natural as chatting..
            </p>
            <div className="d-inline-block mt-20">
              <a href="#" className="button -md -outline-dark-2 text-dark-2">
                Apply Now
              </a>
            </div>
          </div>

          <div className="col-xl-5 offset-xl-1 col-lg-6 order-lg-2 order-1">
            <Image
              width={730}
              height={530}
              className="w-1/1"
              src="/assets/img/home-2/about/2.png"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
