'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'

const termsData = [
  {
    title: 'Introduction',
    content: `Welcome to PeopleLearn, an online learning platform powered by blockchain technology. These Terms of Service ("ToS") govern your use of the PeopleLearn platform and its services. By accessing or using PeopleLearn, you agree to comply with these ToS.`,
  },
  {
    title: 'Acceptance of Terms',
    content: `By using PeopleLearn, you acknowledge that you have read, understood, and agree to be bound by these ToS. If you do not agree with these ToS, you must not use PeopleLearn.`,
  },
  {
    title: 'Eligibility',
    content: `You must be at least 18 years old to use PeopleLearn. We reserve the right to refuse service to anyone for any reason at any time.`,
  },
  {
    title: 'Account Creation and Responsibilities',
    content: `To sign up for a PeopleLearn account, you need to be 18 or over. You are responsible for your account and all the activity on it. You can browse PeopleLearn without registering for an account. But to use some of our features, you will need to register, choose a username, and set a password. When you do that, the information you provide must be accurate and complete. Do not impersonate anyone else or choose names that are offensive or that violate anyone’s rights. If you do not follow these rules, we may cancel your account.`,
  },
  {
    title: 'Security',
    content: `You are responsible for all the activity on your account, and for keeping your password confidential. If you find out that someone has used your account without your permission, you should report it to support@peoplelearn.io.`,
  },
  {
    title: 'Age Requirement',
    content: `To sign up for an account, you need to be at least 18 years old, or old enough to form a binding contract where you live. If necessary, we may ask you for proof of age.`,
  },
  {
    title: 'Prohibited Actions',
    content: `Thousands of people use PeopleLearn. We expect all of you to behave responsibly and help keep this a nice place. If you want to be a part of this, do not do any of these things on our site:`,
    items: `
     <li>Do not break the law. Do not take any action that infringes or violates other peoples rights, violates the law, or breaches any contract or legal duty you have toward anyone.</li>
     <li>Do not lie to people. Do not post information you know is false, misleading, or inaccurate. Do not do anything deceptive or fraudulent.</li>
     <li>Do not offer prohibited items. Do not offer any rewards that are illegal, violate any of PeopleLearn's policies, rules, or guidelines, or violate any applicable law, statute, ordinance, or regulation.</li>
     <li>Do not victimize anyone. Do not do anything threatening, abusive, harassing, defamatory, libelous, tortious, obscene, profane, or invasive of another persons privacy.</li>
     <li>Do not spam. Do not distribute unsolicited or unauthorized advertising or promotional material, or any junk mail, spam, or chain letters. Do not run mail lists, listservs, or any kind of auto-responder or spam on or through the Site.</li>,
     <li>Do not abuse other users personal information. When you use PeopleLearn — and especially if you create a successful page — you may receive information about other users, including things like their names, email addresses, and postal addresses. This information is provided for the purpose of participating in PeopleLearn: do not use it for other purposes, and do not abuse it.</li>
    <li>Don't post anything that is - is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of anothers privacy, tortious, obscene, vulgar, pornographic, offensive, profane, contains or depicts nudity, contains or depicts sexual activity, or is otherwise inappropriate as determined by us in our sole discretion.</li>
    `,
  },
  {
    title: 'Limitations and Disclaimers',
    content: `PeopleLearn provides the platform on an "as is" and "as available" basis. PeopleLearn disclaims all warranties, express or implied, including but not limited to, the implied warranties of merchantability and fitness for a particular purpose. We do not become involved in disputes between users, or between users and any third party relating to the use of the Services. We do not oversee the performance or punctuality of pages and contents, and we do not endorse any content users submit to the Site. When you use the Services, you release PeopleLearn from claims, damages, and demands of every kind — known or unknown, suspected or unsuspected, disclosed or undisclosed — arising out of or in any way related to such disputes and the Services. All content you access through the Services is at your own risk. You are solely responsible for any resulting damage or loss to any party.`,
  },
  {
    title: 'Fees',
    content: `Creating an account on PeopleLearn is free. If you create a page that is successfully supported, we (and our payment partners) collect fees. Our partners’ fees may vary slightly based on your location. Each payment provider is its own company, and PeopleLearn is not responsible for its performance. You are responsible for paying any additional fees or taxes associated with your use of PeopleLearn.`,
  },
  {
    title: 'Other Websites and Links',
    content: `PeopleLearn may contain links to other websites. (For instance, user websites pages, user profiles, and comments that may link to other sites.) When you access third-party websites, you do so at your own risk. We do not control or endorse those sites.`,
  },
  {
    title: 'Intellectual Property',
    content: `PeopleLearn services, content and Marks, are legally protected in a number of ways, including pursuant to copyright, trademark, service marks, patent, trade secrets, and international intellectual-property laws. You agree to respect all copyright and other legal notices, information, and restrictions contained in any PeopleLearn Content, Services, or Marks accessed through the Site or the Services. You agree not to change, translate, or otherwise create derivative works of the Services. PeopleLearn grants you a limited license (that is temporary, non-exclusive, non-sub-licensable, and non-Transferable) to access and use User Content and PeopleLearn Contents solely for use of the Services in accordance with these Terms. You may not reproduce, redistribute, transmit, assign, sell, broadcast, rent, share, lend, modify, adapt, edit, create derivative works of, license, or otherwise transfer or use any User Content or PeopleLearn Content unless We give you express written permission to do so. We reserve the right to revoke this limited license to access and use User Content and PeopleLearn Content at any time and in our sole discretion.`,
  },
  {
    title: 'Your Intellectual Property',
    content: `Any royalties or licensing on your Content are your responsibility. You will pay all royalties and other amounts owed to any person or entity based on your Content, or on PeopleLearn’s hosting of that Content. You’re responsible for the stuff you post. All information submitted to the Site, whether publicly posted or privately transmitted, is the sole responsibility of the person from whom that content originated. We’re not responsible for mistakes in your content. PeopleLearn will not be liable for any errors or omissions in any content.`,
  },
  {
    title: 'Account Deletion',
    content: `You may stop using our Service, by contacting PeopleLearn at support@peoplelearn.io, and requesting account deletion. We may retain certain information as required by law or as necessary for our legitimate business purposes. All provisions of this agreement survive termination of an account, including our rights regarding any content you’ve already submitted to the Site. (For instance, if you’ve launched a page, deleting your account will not automatically remove the page from the Site.) If you have signed up for a membership, you can find information about your cancellation rights on our site. You will need to cancel your subscription in accordance with these cancellation rights to stop your recurring payments for the relevant subscription. Merely deleting your account without canceling your subscription will not stop these payments.`,
  },
  {
    title: 'Indemnity',
    content: `You agree to defend, indemnify and hold harmless PeopleLearn, Our subsidiaries and affiliated companies, and Our officers, directors, employees, partners, contractors, representatives, agents, and third party providers from and against any and all claims, causes of action, damages, obligations, losses, liabilities, costs or debt, and expenses (including reasonable attorneys' fees and costs) and all amounts paid in settlement arising from or relating to, breach of these Terms or violation of any applicable laws. We reserve the right, in Our sole discretion and at Our own expense, to assume the exclusive defense and control of any matter for which you have agreed to indemnify us and you agree to assist and cooperate with us as reasonably required in the defense or settlement of any such matters.`,
  },
  {
    title: 'Dispute Resolution',
    content: `We at PeopleLearn encourage you to contact us if you’re having an issue, before resorting to the courts. In the unfortunate situation where legal action does arise, these Terms (and all other rules, policies, or guidelines incorporated by reference) will be governed by and construed in accordance with the laws of Nigeria, without giving effect to any principles of conflicts of law, and without application of the Uniform Computer Information Transaction Act or the United Nations Convention of Controls for International Sale of Goods.`,
  },
  {
    title: 'Copyright',
    content: `The Digital Millennium Copyright Act lays out a system of legal requirements for dealing with allegations of copyright infringement. PeopleLearn complies with the DMCA, and we respond to notices of alleged infringement if they comply with the law and the requirements set forth in our Copyright Policy. We reserve the right to delete or disable content alleged to be infringing, and to terminate accounts for repeat infringers. (We do this when appropriate and at our sole discretion.)`,
  },
  {
    title: 'Agreement Between You and Us',
    content: `These Terms are the entire agreement between You and PeopleLearn with respect to the Services. They supersede all other communications and proposals (whether oral, written, or electronic) between you and PeopleLearn with respect to the Services and govern our relationship. If any provision of these Terms are deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of this Agreement, which shall remain in full force and effect. PeopleLearn's failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision.`,
  },
  {
    title: 'Miscellaneous',
    content: `We may modify or discontinue the Services at any time, in our sole discretion. You agree that, except as otherwise expressly provided in these Terms, there shall be no third-party beneficiaries to these Terms. No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such term or any other term, and PeopleLearn’s failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision. You agree that regardless of any statute or law to the contrary, any claim arising out of or related to the Services must commence within one (1) year after the cause of action accrues. Otherwise, such cause of action is permanently barred.`,
  },
]

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="px-5 mt-10 text-center">
          <h1 className="text-pink-600 text-3xl md:text-4xl font-bold">
            Terms of Service
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            This ToS for PeopleLearn was last updated on 25 Mar, 2024.
          </p>
        </div>
        <div className="md:w-3/5 px-5 sm:px-10 md:px-0 my-10 md:my-16 space-y-10">
          {termsData.map((term, i) => (
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
  )
}

export default Page
