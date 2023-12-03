"use client";

import React from "react";
import { blogs, tags } from "@/data/blogs";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import { ImQuotesLeft } from "react-icons/im";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

type Blog = {
  id: number;
  imageSrc: string;
  category: string;
  title: string;
  date: string;
  desc: string;
};

type BlogDetailsProps = {
  id: number;
};

export default function BlogDetails({ id }: BlogDetailsProps) {
  const data =
    blogs.filter((elm: Blog) => elm.id === Number(id))[0] || blogs[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // const data = blogs.filter((elm) => elm.id == id)[0] || blogs[0];
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  // };
  return (
    <Layout>
      <section className="pt-10">
        <div className="">
          <div className="">
            <div className="text-center">
              <div>
                <div className="text-[#C5165D] sm uppercase">
                  {data.category.toUpperCase()}
                </div>

                <h1 className="text-violet-950 text-center text-4xl font-medium leading-[55px] capitalize w-full mt-3 max-md:max-w-full">
                  {data.title.split(" ").slice(0, 4).join(" ")}
                  <br />
                  {data.title.split(" ").slice(4, -1).join(" ")}
                </h1>

                <p className="text-xs text-[#4F547B] mt-3">{data.date}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-class">
        <div className="">
          <div
            className="border"
            style={{
              backgroundImage: `url(${data.imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100vh",
            }}
            data-bg="/assets/img/coursesCards/1.png"
          ></div>
        </div>
      </section>

      <section className="flex justify-center ">
        <div className="w-3/5">
          <div className="">
            <div className="">
              <div className="flex justify-center">
                <div>
                  <div>
                    <h4 className="font-medium text-[#321463]">{data.title}</h4>
                    <p className="mt-10">{data.desc}</p>

                    <ul className="list-disc pl-5">
                      <li>
                        Sed viverra ipsum nunc aliquet bibendum enim facilisis
                        gravida.
                      </li>
                      <li>
                        At urna condimentum mattis pellentesque id nibh. Laoreet
                        non curabitur
                      </li>
                      <li>Magna etiam tempor orci eu lobortis elementum.</li>
                      <li>
                        Bibendum est ultricies integer quis. Semper eget duis at
                        tellus.
                      </li>
                    </ul>

                    <div className="flex items-stretch gap-5 px-5 my-10 max-md:flex-wrap max-md:justify-center">
                      <div className="bg-pink-700 flex w-[5px] shrink-0 h-[127px] flex-col" />
                      <ImQuotesLeft className="text-6xl text-[#F9F9F9]" />
                      <div className="text-violet-950 text-lg font-bold leading-8 capitalize self-center grow shrink basis-auto my-auto max-md:max-w-full">
                        Smart contracts, self-executing code deployed on
                        blockchains, automate and enforce agreements without the
                        need for intermediaries.
                      </div>
                    </div>

                    <p className="mt-10">
                      Donec purus posuere nullam lacus aliquam egestas arcu. A
                      egestas a, tellus massa, ornare vulputate. Erat enim eget
                      laoreet ullamcorper lectus aliquet nullam tempus id.
                      Dignissim convallis quam aliquam rhoncus, lectus nullam
                      viverra. Bibendum dignissim tortor, phasellus pellentesque
                      commodo, turpis vel eu. Donec consectetur ipsum nibh
                      lobortis elementum mus velit tincidunt elementum.
                      Ridiculus eu convallis eu mattis iaculis et, in dolor. Sem
                      libero, tortor suspendisse et, purus euismod posuere sit.
                      Risus dui ut viverra venenatis ipsum tincidunt non, proin.
                      Euismod pharetra sit ac nisi. Erat lacus, amet quisque
                      urna faucibus. Rhoncus praesent faucibus rhoncus nec
                      adipiscing tristique sed facilisis velit.
                      <br />
                      <br />
                      Neque nulla porta ut urna rutrum. Aliquam cursus arcu
                      tincidunt mus dictum sit euismod cum id. Dictum integer
                      ultricies arcu fermentum fermentum sem consectetur.
                      Consectetur eleifend aenean eu neque euismod amet
                      parturient turpis vitae. Faucibus ipsum felis et duis
                      fames.
                    </p>
                  </div>

                  <div className="flex justify-between mt-5">
                    <div className="w-[48%]">
                      <Image
                        width={530}
                        height={450}
                        src="/assets/img/coursesCards/1.png"
                        alt="image"
                        className=" rounded-md"
                      />
                    </div>
                    <div className="w-[48%]">
                      <Image
                        width={530}
                        height={450}
                        src="/assets/img/coursesCards/2.png"
                        alt="image"
                        className=" rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p>
                      Donec purus posuere nullam lacus aliquam egestas arcu. A
                      egestas a, tellus massa, ornare vulputate. Erat enim eget
                      laoreet ullamcorper lectus aliquet nullam tempus id.
                      Dignissim convallis quam aliquam rhoncus, lectus nullam
                      viverra. Bibendum dignissim tortor, phasellus pellentesque
                      commodo, turpis vel eu. Donec consectetur ipsum nibh
                      lobortis elementum mus velit tincidunt elementum.
                      Ridiculus eu convallis eu mattis iaculis et, in dolor. Sem
                      libero, tortor suspendisse et, purus euismod posuere sit.
                      Risus dui ut viverra venenatis ipsum tincidunt non, proin.
                      Euismod pharetra sit ac nisi. Erat lacus, amet quisque
                      urna faucibus. Rhoncus praesent faucibus rhoncus nec
                      adipiscing tristique sed facilisis velit.
                      <br />
                      <br />
                      Neque nulla porta ut urna rutrum. Aliquam cursus arcu
                      tincidunt mus dictum sit euismod cum id. Dictum integer
                      ultricies arcu fermentum fermentum sem consectetur.
                      Consectetur eleifend aenean eu neque euismod amet
                      parturient turpis vitae. Faucibus ipsum felis et duis
                      fames.
                    </p>
                  </div>
                </div>
              </div>
            </div>

                <div className="flex justify-between items-center mt-5 border-b border-[#EEEEEE] pb-10">
                    <div className="flex gap-5 items-center">
                      <div className="">Share</div>

                      <div className="flex gap-2 items-center">
                      <FaFacebookF />
                      <FaTwitter />
                      <FaInstagram />
                      <FaLinkedinIn />
                      </div>
                    </div>

                    <div className="flex gap-5 ">
                      {tags.slice(0, 4).map((elm, i) => (
                        <div className="">
                          <a
                            href={elm.href}
                            className="text-violet-950 text-xs font-medium whitespace-nowrap items-stretch bg-stone-50 aspect-[2.1] justify-center px-4 py-2 rounded-[60px]"
                          >
                            {elm.name}
                          </a>
                        </div>
                      ))}
                    </div>
                </div>

            <div className="row justify-center pt-30">
              <div className="col-xl-8 col-lg-9 col-md-11">
                <div className="d-flex border-bottom-light border-top-light py-30">
                  <div className="">
                    <div
                      className="bg-image size-70 rounded-full js-lazy"
                      data-bg="img/blog/blog-single/author.png"
                    ></div>
                  </div>

                  <div className="ml-30 md:ml-20">
                    <h4 className="text-17 lh-15 fw-500">Brooklyn Simmons</h4>
                    <div className="mt-5">Medical Assistant</div>
                    <p className="mt-25">
                      Etiam vitae leo et diam pellentesque porta. Sed eleifend
                      ultricies risus, vel rutrum erat commodo ut. Praesent
                      finibus congue euismod. Nullam scelerisque massa vel augue
                      placerat, a tempor sem egestas. Curabitur placerat finibus
                      lacus.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-center">
              <div className="col-xl-8 col-lg-9 col-md-11">
                <div className="border-bottom-light py-30">
                  <div className="row x-gap-50 justify-between items-center">
                    <div className="col-md-4 col-6">
                      <a
                        href="blog-single"
                        className="related-nav__item -prev decoration-none"
                      >
                        <div className="related-nav__arrow">
                          <i
                            className="icon size-20 pt-5"
                            data-feather="arrow-left"
                          ></i>
                        </div>
                        <div className="related-nav__content">
                          <div className="text-17 text-dark-1 fw-500">Prev</div>
                          <p className="text-dark-1 mt-8">
                            5 awesome steps to get rid of stress and routine
                          </p>
                        </div>
                      </a>
                    </div>

                    <div className="col-auto lg:d-none">
                      <div className="related-nav__icon row">
                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>

                        <div className="col-4">
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-6 d-flex justify-end">
                      <a
                        href="blog-single"
                        className="related-nav__item -next text-right decoration-none"
                      >
                        <div className="related-nav__content">
                          <div className="text-17 text-dark-1 fw-500">Next</div>
                          <p className="text-dark-1 mt-8">
                            Happy clients leave positive feedback less often
                          </p>
                        </div>
                        <div className="related-nav__arrow">
                          <i
                            className="icon size-20 pt-5"
                            data-feather="arrow-right"
                          ></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-center pt-30">
              <div className="col-xl-8 col-lg-9 col-md-11">
                <div className="blogPost -comments">
                  <div className="blogPost__content">
                    <h2 className="text-20 fw-500">Reviews</h2>

                    <ul className="comments__list mt-30">
                      <li className="comments__item">
                        <div className="comments__item-inner md:direction-column">
                          <div className="comments__img mr-20">
                            <div
                              className="bg-image rounded-full js-lazy"
                              style={{
                                backgroundImage:
                                  "url(/assets/img/avatars/1.png)",
                              }}
                            ></div>
                          </div>

                          <div className="comments__body md:mt-15">
                            <div className="comments__header">
                              <h4 className="text-17 fw-500 lh-15">
                                Ali Tufan
                                <span className="text-13 text-light-1 fw-400">
                                  3 Days ago
                                </span>
                              </h4>

                              <div className="stars"></div>
                            </div>

                            <h5 className="text-15 fw-500 mt-15">
                              The best LMS Design
                            </h5>
                            <div className="comments__text mt-10">
                              <p>
                                This course is a very applicable. Professor Ng
                                explains precisely each algorithm and even tries
                                to give an intuition for mathematical and
                                statistic concepts behind each algorithm. Thank
                                you very much.
                              </p>
                            </div>

                            <div className="comments__helpful mt-20">
                              <span className="text-13 text-purple-1">
                                Was this review helpful?
                              </span>
                              <button className="button text-13 -sm -purple-1 text-white">
                                Yes
                              </button>
                              <button className="button text-13 -sm -light-7 text-purple-1">
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="comments__item">
                        <div className="comments__item-inner md:direction-column">
                          <div className="comments__img mr-20">
                            <div
                              className="bg-image rounded-full js-lazy"
                              style={{
                                backgroundImage:
                                  "url(/assets/img/avatars/1.png)",
                              }}
                            ></div>
                          </div>

                          <div className="comments__body md:mt-15">
                            <div className="comments__header">
                              <h4 className="text-17 fw-500 lh-15">
                                Ali Tufan
                                <span className="text-13 text-light-1 fw-400">
                                  3 Days ago
                                </span>
                              </h4>

                              <div className="stars"></div>
                            </div>

                            <h5 className="text-15 fw-500 mt-15">
                              The best LMS Design
                            </h5>
                            <div className="comments__text mt-10">
                              <p>
                                This course is a very applicable. Professor Ng
                                explains precisely each algorithm and even tries
                                to give an intuition for mathematical and
                                statistic concepts behind each algorithm. Thank
                                you very much.
                              </p>
                            </div>

                            <div className="comments__helpful mt-20">
                              <span className="text-13 text-purple-1">
                                Was this review helpful?
                              </span>
                              <button className="button text-13 -sm -purple-1 text-white">
                                Yes
                              </button>
                              <button className="button text-13 -sm -light-7 text-purple-1">
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="respondForm pt-30">
                  <h3 className="text-20 fw-500">Write a Review</h3>

                  <div className="mt-30">
                    <h4 className="text-16 fw-500">
                      What is it like to Course?
                    </h4>
                    <div className="d-flex x-gap-10 pt-10">
                      <div className="icon-star text-14 text-yellow-1"></div>
                      <div className="icon-star text-14 text-yellow-1"></div>
                      <div className="icon-star text-14 text-yellow-1"></div>
                      <div className="icon-star text-14 text-yellow-1"></div>
                      <div className="icon-star text-14 text-yellow-1"></div>
                    </div>
                  </div>

                  <form
                    className="contact-form respondForm__form row y-gap-30 pt-30"
                    onSubmit={handleSubmit}
                  >
                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Review Title
                      </label>
                      <input
                        required
                        type="text"
                        name="title"
                        placeholder="Great Courses"
                      />
                    </div>
                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Review Content
                      </label>
                      <textarea
                        required
                        name="comment"
                        placeholder="Message"
                        rows={8}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        name="submit"
                        id="submit"
                        className="button -md -purple-1 text-white"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
