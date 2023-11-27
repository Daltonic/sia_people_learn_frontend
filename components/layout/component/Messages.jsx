"use client";
import Image from "next/image";
import React, { useState } from "react";
import { accordionItems } from "@/data/message";
export default function Messages({ setMessageOpen, messageOpen }) {
  const [currentTab, setCurrentTab] = useState("message");
  const [openMessage, setOpenMessage] = useState(0);
  const [contactTabOpen, setContactTabOpen] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <aside
      className={`sidebar-menu toggle-element js-msg-toggle js-dsbh-sidebar-menu ${
        messageOpen ? "-is-el-visible" : ""
      }`}
    >
      <div className="sidebar-menu__bg"></div>

      <div className="sidebar-menu__content scroll-bar-1 py-30 px-40 sm:py-25 sm:px-20 bg-white -dark-bg-dark-1">
        <div className="row items-center justify-between mb-30">
          <div className="col-auto">
            <div className="-sidebar-buttons">
              <button
                data-sidebar-menu-button="messages"
                onClick={() => setCurrentTab("messages")}
                className={`text-17 text-dark-1 fw-500 ${
                  currentTab == "message" ? "-is-button-active" : ""
                } `}
              >
                Messages
              </button>

              <button
                data-sidebar-menu-button="messages-2"
                onClick={() => setCurrentTab("message")}
                data-sidebar-menu-target="messages"
                className={`d-flex items-center text-17 text-dark-1 fw-500 ${
                  currentTab == "messageTwo" ? "-is-button-active" : ""
                }`}
              >
                <i className="icon-chevron-left text-11 text-purple-1 mr-10"></i>
                Messages
              </button>

              <button
                data-sidebar-menu-button="settings"
                onClick={() => setCurrentTab("message")}
                data-sidebar-menu-target="messages"
                className={`d-flex items-center text-17 text-dark-1 fw-500 ${
                  currentTab == "settings" ? "-is-button-active" : ""
                }`}
              >
                <i className="icon-chevron-left text-11 text-purple-1 mr-10"></i>
                Settings
              </button>

              <button
                data-sidebar-menu-button="contacts"
                onClick={() => setCurrentTab("message")}
                data-sidebar-menu-target="messages"
                className={`d-flex items-center text-17 text-dark-1 fw-500 ${
                  currentTab == "contacts" ? "-is-button-active" : ""
                }`}
              >
                <i className="icon-chevron-left text-11 text-purple-1 mr-10"></i>
                Contacts
              </button>
            </div>
          </div>

          <div className="col-auto">
            <div className="row x-gap-10">
              <div className="col-auto">
                <button
                  data-sidebar-menu-target="settings"
                  onClick={() => setCurrentTab("settings")}
                  className="button -purple-3 text-purple-1 size-40 d-flex items-center justify-center rounded-full"
                >
                  <i className="icon-setting text-16"></i>
                </button>
              </div>
              <div className="col-auto">
                <button
                  data-sidebar-menu-target="contacts"
                  onClick={() => setCurrentTab("contacts")}
                  className="button -purple-3 text-purple-1 size-40 d-flex items-center justify-center rounded-full"
                >
                  <i className="icon-friend text-16"></i>
                </button>
              </div>
              <div className="col-auto">
                <button
                  data-el-toggle=".js-msg-toggle"
                  onClick={() => setMessageOpen(false)}
                  className="button -purple-3 text-purple-1 size-40 d-flex items-center justify-center rounded-full"
                >
                  <i className="icon-close text-14"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative js-menu-switch">
          <div
            data-sidebar-menu-open="messages"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "message" ? "-sidebar-menu-opened" : ""
            } `}
          >
            <form
              onSubmit={handleSubmit}
              className="search-field rounded-8 h-50"
            >
              <input
                required
                className="bg-light-3 pr-50"
                type="text"
                placeholder="Search Courses"
              />
              <button className="" type="submit">
                <i className="icon-search text-light-1 text-20"></i>
              </button>
            </form>

            <div className="accordion -block text-left pt-20 js-accordion">
              {accordionItems.map((item, ind) => (
                <div
                  key={ind}
                  onClick={() =>
                    setOpenMessage((prev) => (prev === item.id ? 0 : item.id))
                  }
                  className={`accordion__item border-light rounded-16 ${
                    openMessage === item.id ? "is-active" : ""
                  }`}
                >
                  <div className="accordion__button">
                    <div className="accordion__icon size-30 -dark-bg-dark-2 mr-10">
                      <div className="icon d-flex items-center justify-center">
                        <span className="lh-1 fw-500">
                          {item.content.length}
                        </span>
                      </div>
                      <div className="icon d-flex items-center justify-center">
                        <span className="lh-1 fw-500">
                          {item.content.length}
                        </span>
                      </div>
                    </div>
                    <span className="text-17 fw-500 text-dark-1 pt-3">
                      {item.title}
                    </span>
                  </div>

                  <div
                    className="accordion__content"
                    style={
                      openMessage === item.id ? { maxHeight: "340px" } : {}
                    }
                  >
                    <div className="accordion__content__inner pl-20 pr-20 pb-20">
                      {item.content.map((contentItem, ind) => (
                        <div
                          key={ind}
                          data-sidebar-menu-target="messages-2"
                          onClick={() => setCurrentTab("messageTwo")}
                          className="row x-gap-10 y-gap-10 pointer"
                        >
                          <div className="col-auto">
                            <Image
                              width={50}
                              height={50}
                              src={contentItem.imageSrc}
                              alt="image"
                            />
                          </div>
                          <div className="col">
                            <div className="text-15 lh-12 fw-500 text-dark-1 pt-8">
                              {contentItem.name}
                            </div>
                            <div className="text-14 lh-1 mt-5">
                              <span className="text-dark-1">You:</span>
                              {contentItem.message}
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-13 lh-12 pt-8">
                              {contentItem.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-sidebar-menu-open="messages-2"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "messageTwo" ? "-sidebar-menu-opened" : ""
            }`}
          >
            <div className="row x-gap-10 y-gap-10">
              <div className="col-auto">
                <Image
                  width={50}
                  height={50}
                  src="/assets/img/dashboard/right-sidebar/messages-2/1.png"
                  alt="image"
                />
              </div>
              <div className="col">
                <div className="text-15 lh-12 fw-500 text-dark-1 pt-8">
                  Arlene McCoy
                </div>
                <div className="text-14 lh-1 mt-5">Active</div>
              </div>
            </div>

            <div className="mt-20 pt-30 border-top-light">
              <div className="row y-gap-20">
                <div className="col-12">
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      <Image
                        width={50}
                        height={50}
                        src="/assets/img/dashboard/right-sidebar/messages-2/2.png"
                        alt="image"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        Albert Flores
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 lh-1 ml-3">35 mins</div>
                    </div>
                  </div>
                  <div className="bg-light-3 rounded-8 px-30 py-20 mt-15">
                    How likely are you to recommend our company to your friends
                    and family?
                  </div>
                </div>

                <div className="col-12">
                  <div className="row x-gap-10 y-gap-10 items-center justify-end">
                    <div className="col-auto">
                      <div className="text-14 lh-1 mr-3">35 mins</div>
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        You
                      </div>
                    </div>
                    <div className="col-auto">
                      <Image
                        width={50}
                        height={50}
                        src="/assets/img/dashboard/right-sidebar/messages-2/3.png"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="text-right bg-light-7 -dark-bg-dark-2 text-purple-1 rounded-8 px-30 py-20 mt-15">
                    How likely are you to recommend our company to your friends
                    and family?
                  </div>
                </div>

                <div className="col-12">
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      <Image
                        width={50}
                        height={50}
                        src="/assets/img/dashboard/right-sidebar/messages-2/3.png"
                        alt="image"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        Cameron Williamson
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 lh-1 ml-3">35 mins</div>
                    </div>
                  </div>
                  <div className="bg-light-3 rounded-8 px-30 py-20 mt-15">
                    Ok, Understood!
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-30 pb-20">
              <form
                onSubmit={handleSubmit}
                className="contact-form row y-gap-20"
                action="post"
              >
                <div className="col-12">
                  <textarea
                    required
                    placeholder="Write a message"
                    rows="7"
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -purple-1 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            data-sidebar-menu-open="contacts"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "contacts" ? "-sidebar-menu-opened" : ""
            }`}
          >
            <div className="tabs -pills js-tabs">
              <div className="tabs__controls d-flex js-tabs-controls">
                <button
                  onClick={() => setContactTabOpen(1)}
                  className={`tabs__button px-15 py-8 rounded-8 text-dark-1 js-tabs-button ${
                    contactTabOpen == 1 ? "is-active" : ""
                  } `}
                  data-tab-target=".-tab-item-1"
                  type="button"
                >
                  Contacts
                </button>

                <button
                  onClick={() => setContactTabOpen(2)}
                  className={`tabs__button px-15 py-8 rounded-8 text-dark-1 js-tabs-button ${
                    contactTabOpen == 2 ? "is-active" : ""
                  } `}
                  data-tab-target=".-tab-item-2"
                  type="button"
                >
                  Request
                </button>
              </div>

              <div className="tabs__content pt-30 js-tabs-content">
                <div
                  className={`tabs__pane -tab-item-1  ${
                    contactTabOpen == 1 ? "is-active" : ""
                  } `}
                >
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      <Image
                        width={50}
                        height={50}
                        src="/assets/img/dashboard/right-sidebar/contacts/1.png"
                        alt="image"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        Darlene Robertson
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tabs__pane -tab-item-2 ${
                    contactTabOpen == 2 ? "is-active" : ""
                  } `}
                >
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      <Image
                        width={50}
                        height={50}
                        src="/assets/img/dashboard/right-sidebar/contacts/1.png"
                        alt="image"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        Darlene Robertson
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sidebar-menu-open="settings"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "settings" ? "-sidebar-menu-opened" : ""
            }`}
          >
            <div className="text-17 text-dark-1 fw-500">Privacy</div>
            <div className="text-15 mt-5">
              You can restrict who can message you
            </div>
            <div className="mt-30">
              <div className="form-radio d-flex items-center ">
                <div className="radio">
                  <input type="radio" />
                  <div className="radio__mark">
                    <div className="radio__icon"></div>
                  </div>
                </div>
                <div className="lh-1 text-13 text-dark-1 ml-12">
                  My contacts only
                </div>
              </div>

              <div className="form-radio d-flex items-center mt-15">
                <div className="radio">
                  <input type="radio" />
                  <div className="radio__mark">
                    <div className="radio__icon"></div>
                  </div>
                </div>
                <div className="lh-1 text-13 text-dark-1 ml-12">
                  My contacts and anyone in my courses
                </div>
              </div>

              <div className="form-radio d-flex items-center mt-15">
                <div className="radio">
                  <input type="radio" />
                  <div className="radio__mark">
                    <div className="radio__icon"></div>
                  </div>
                </div>
                <div className="lh-1 text-13 text-dark-1 ml-12">
                  Anyone on the site
                </div>
              </div>
            </div>

            <div className="text-17 text-dark-1 fw-500 mt-30 mb-30">
              Notification preferences
            </div>
            <div className="form-switch d-flex items-center">
              <div className="switch">
                <input type="checkbox" />
                <span className="switch__slider"></span>
              </div>
              <div className="text-13 lh-1 text-dark-1 ml-10">Email</div>
            </div>

            <div className="text-17 text-dark-1 fw-500 mt-30 mb-30">
              General
            </div>
            <div className="form-switch d-flex items-center">
              <div className="switch">
                <input type="checkbox" />
                <span className="switch__slider"></span>
              </div>
              <div className="text-13 lh-1 text-dark-1 ml-10">
                Use enter to send
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
