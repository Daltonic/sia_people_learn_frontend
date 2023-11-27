import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function BecomeInstactor() {
  return (
    <section className="layout-pt-lg layout-pb-md">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-xl-5 offset-xl-1 col-lg-6">
            <Image
              width={730}
              height={530}
              className="w-1/1"
              src="/assets/img/home-2/about/1.png"
              alt="image"
            />
          </div>

          <div className="col-xl-4 offset-xl-1 col-lg-6">
            <h3 className="text-24 lh-1">Become an Instructor</h3>
            <p className="mt-20">
              Join millions of people from around the world learning together.
              Online learning is as easy and natural as chatting.
            </p>
            <div className="d-inline-block mt-20">
              <Link
                href="/instructor-become"
                className="button -md -outline-purple-1 text-purple-1"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
