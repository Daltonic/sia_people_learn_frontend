'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'
import Head from 'next/head'

const policies = [
  {
    title: 'Introduction',
    content: `PeopleLearn is a platform for creators to accept support from their audience and share exclusive content. At PeopleLearn, your privacy is important to us, and we want you to feel confident that your personal information is secure when using our products and our platform.`,
  },
  {
    title: 'Services Provider',
    content: `The services are provided by Dapp Mentors Ltd (parent company and hereinafter referred to as “PeopleLearn”), a Nigerian company with registered No of 7306493. It is PeopleLearn’s policy to respect your privacy regarding any information we may collect while operating our website.`,
  },
  {
    title: 'Website Visitors',
    content: `Like most website operators, PeopleLearn collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. PeopleLearn's purpose in collecting non-personally identifying information is to better understand how PeopleLearn's visitors use its website. From time to time, PeopleLearn may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.`,
  },
  {
    title: 'Potentially Personally-Identifying Information',
    content: `PeopleLearn may collect potentially personally-identifying information such as Internet Protocol (IP) addresses for logged in users and for users making payments on Peoplelearn.io. PeopleLearn only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below, except that payee IP addresses and email addresses are visible and disclosed to the administrators of PeopleLearn and are handled by payment processors at the time of processing the payments.`,
  },
  {
    title: 'Payments',
    content: `To make a payment to a creator on PeopleLearn, you have to provide our payment processor (Stripe) with your payment information. They provide us with a token that represents your account, your card’s expiration date, card type and the last four digits of your credit card. If you provide them with a name and email address then they also provide us with that information. We collect and process information about the creators you support, subscribe to, or purchase items from, the level at which you support them, what rewards you receive and how often you support them.`,
  },
  {
    title: 'Gathering of Personally-Identifying Information',
    content: `Certain visitors to PeopleLearn's websites choose to interact with PeopleLearn in ways that require PeopleLearn to gather personally-identifying information. The amount and type of information that PeopleLearn gathers depends on the nature of the interaction. For example, we ask visitors who sign up at Peoplelearn.io to provide a username and email address. Those who engage in transactions with PeopleLearn are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. In each case, PeopleLearn collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor's interaction with PeopleLearn. PeopleLearn does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.`,
  },
  {
    title: 'Aggregated Statistics',
    content: `PeopleLearn may collect statistics about the behavior of visitors to its websites. PeopleLearn may display this information publicly or provide it to others. However, PeopleLearn does not disclose personally-identifying information other than as described below.`,
  },
  {
    title: 'Protection of Certain Personally-Identifying Information',
    content: `PeopleLearn discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on PeopleLearn's behalf or to provide services available at PeopleLearn's websites, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using PeopleLearn's websites, you consent to the transfer of such information to them. PeopleLearn will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, PeopleLearn discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when PeopleLearn believes in good faith that disclosure is reasonably necessary to protect the property or rights of PeopleLearn, third parties or the public at large. If you are a registered user of an PeopleLearn website and have supplied your email address, PeopleLearn may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what's going on with PeopleLearn and our products. If you send us a request (for example via email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. PeopleLearn takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.`,
  },
  {
    title: 'Account Deletion',
    content: `You may stop using our Service, by contacting PeopleLearn at support@peoplelearn.io, and requesting account deletion. We may retain certain information as required by law or as necessary for our legitimate business purposes. All provisions of this agreement survive termination of an account, including our rights regarding any content you’ve already submitted to the Site. (For instance, if you’ve launched a page, deleting your account will not automatically remove the page from the Site.) If you have signed up for a membership, you can find information about your cancellation rights on our site. You will need to cancel your subscription in accordance with these cancellation rights to stop your recurring payments for the relevant subscription. Merely deleting your account without canceling your subscription will not stop these payments.`,
  },
  {
    title: 'Cookies',
    content: `A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. For more information, visit All About Cookies. PeopleLearn uses cookies to help PeopleLearn identify and track visitors, their usage of PeopleLearn website, and their website access preferences. Some cookies expire after a certain amount of time, or upon logging out (session cookies), others remain on your computer or terminal device for a longer period (persistent cookies). Our Site uses first party cookies (cookies set directly by PeopleLearn) as well as third party cookies, as described below:`,
    items: `
      <li>Strictly Necessary Cookies: Used to provide Users with the Services available through our Site and to use some of their features, such as the ability to log-in and access to secure areas. These cookies are served by PeopleLearn and are essential for using and navigating the Site. Without these cookies, basic functions of our Site would not work. Because these cookies are strictly necessary to deliver the Site and the Services, you cannot refuse them.</li>
      <li>Analytics/Performance: Used to better understand the behavior of the Users on our Site and improve our Site accordingly, for example by making sure Users are finding what they need easily. The Site uses Google Analytics, a web analytics service provided by Google Inc. (“Google”). The information collected by Google (including your IP address) will be transmitted to and stored by Google on servers in the United States (Google is certified to the Privacy Shield for data transfers). How long a Google Analytics cookie remains on your computer or device depends on what it is and what it is used for. Some Google Analytics cookies expire at the end of your browser session, whilst others can remain for up to two years. You can prevent your data from being collected by Google Analytics on our Site by downloading and installing the Google Analytics Opt-out Browser Add-on for your current web browser. For more information on Google Analytics privacy practices, read here.</li>
      <li>PeopleLearn's websites, with the drawback that certain features of PeopleLearn's websites may not function properly without the aid of cookies.</li>
    `,
  },
  {
    title: 'Business Transfers',
    content: `If PeopleLearn, or substantially all of its assets, were acquired, or in the unlikely event that PeopleLearn goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of PeopleLearn may continue to use your personal information as set forth in this policy.`,
  },
  {
    title: 'Ads',
    content: `We do not run any external advertisements on PeopleLearn. However, we use ad networks such as Twitter Ads to collect retargeting information to compile information about our users. This Privacy Policy covers the use of cookies by PeopleLearn and does not cover the use of cookies by any advertisers.`,
  },
  {
    title: 'Prohibited and Restricted Content',
    content: `We want PeopleLearn to be a safe venue for a diverse range of creators and their communities. Please respect the people and communities that are building with you on PeopleLearn. If you find any creators breaking our permitted content guidelines, you can report them to us. Alternatively, you can block them permanently, and we’ll no longer show you their profile or content posted by them.`,
    items: `
    <li>Harassment: We prohibit users from posting content that harasses other people or businesses or encourages other people to participate in harassment. This includes content that contains direct or indirect threats of physical harm against individuals or groups.</li>
    <li>Personal information: We don’t allow content that contains private or confidential information such as credit card details, medical records, or government-issued identification. This includes yours or someone else’s.</li>
    <li>Impersonation: Don’t use Buy Me a Coffee to impersonate any person, group, or organization. Please do not impersonate others or post content pretending to be a verified authoritative source.</li>
    <li>Sexually explicit content: We don't allow sexually explicit content on Buy Me a Coffee. We want everyone on our platform to feel safe and comfortable so they can share their work. This includes :

    - Pornography or the depiction of sexual acts, genitals, or fetishes intended to be sexually gratifying.
    
    - Content that includes nude genitalia.
    
    - Content that glorifies or promotes bestiality.
    
    - Content that glorifies or promotes sexually explicit content or behavior.
    
    </li>
    <li>Regulated, dangerous, & Illegal: This includes:
    
    - Dangerous content that promotes dangerous activities that could result in serious physical harm to the person committing the act, those around them, or animals.
    
    - Illegal content on dangerous or illegal acts such as rape, organ sale, human trafficking, or images or any other content that infringes on anyone else’s legal rights, including copyright. For more information or to file a DMCA request, review our copyright procedures or content produced by or on behalf of terrorist groups.
    
    - Child safety content that depicts the nudity of apparent minors.
    
    - Terrorist content that incites violence promotes terrorist acts or celebrates terrorist attacks.</li>
    `,
  },
  {
    title: 'Privacy Policy Changes',
    content: `Although most changes are likely to be minor, PeopleLearn may change its Privacy Policy from time to time, and in PeopleLearn's sole discretion. PeopleLearn encourages visitors to frequently check this page for any changes to its Privacy Policy. If you have a Peoplelearn.io account, you might also receive an alert informing you of these changes. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.`,
  },
  {
    title: 'Other Terms and Conditions',
    content: `Your access to and use of the PeopleLearn is subject to any additional terms applicable to such Services that may be posted on the Terms from time to time, including without limitation, PeopleLearn’s Terms of Use available at https://peoplelearn.io/terms.`,
  },
]

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policies | People Learn</title>
        <meta
          name="description"
          content="Explore our Privacy Policies to understand how we protect your information and use it on People Learn."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/policies" />
        <meta property="og:title" content="Privacy Policies | People Learn" />
        <meta
          property="og:description"
          content="Explore our Privacy Policies to understand how we protect your information and use it on People Learn."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Privacy Policies | People Learn" />
        <meta
          name="twitter:description"
          content="Explore our Privacy Policies to understand how we protect your information and use it on People Learn."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="flex flex-col items-center">
          <div className="px-5 mt-10 text-center">
            <h1 className="text-pink-600 text-3xl md:text-4xl font-bold">
              Privacy Policies
            </h1>
            <p className="text-slate-600 text-md mt-3 capitalize">
              This Privacy Polices for PeopleLearn was last updated on 27 Mar,
              2024.
            </p>
          </div>
          <div className="md:w-3/5 px-5 sm:px-10 md:px-0 my-10 md:my-16 space-y-10">
            {policies.map((term, i) => (
              <div key={i}>
                <h1 className="text-pink-600 font-semibold text-2xl mb-2">
                  {i + 1}. {term.title}
                </h1>
                <div className="text-lg">
                  <p className="text-[#4F547B]">{term.content}</p>
                  {term.items && (
                    <div
                      className="text-[#4F547B] space-y-1 mt-4"
                      dangerouslySetInnerHTML={{ __html: term.items }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page
