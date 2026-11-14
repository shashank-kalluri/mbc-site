import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the University Blockchain Conference collects, uses and protects information on universityblockchain.org and the UBC 2026 attendee guide.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "November 13, 2026";
const CONTACT_EMAIL = "uniblockchainconferences@gmail.com";

type Section = { heading: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    heading: "Who we are",
    body: (
      <>
        <p>
          The University Blockchain Conference (UBC) is run by College XYZ Inc. This policy covers
          universityblockchain.org and its subdomains, including the attendee guide at
          guide.universityblockchain.org. When we say &ldquo;we&rdquo; or &ldquo;us&rdquo;, we mean
          the UBC organizing team at College XYZ Inc.
        </p>
      </>
    ),
  },
  {
    heading: "Information we collect on this website",
    body: (
      <>
        <p>
          If you apply to speak, we collect what you enter in the form, including your name, email
          address and organization. We send your application to the UBC team by email and send you a
          confirmation email.
        </p>
        <p>
          We use Vercel Web Analytics to count page views and see which pages are popular. It does
          not use cookies and does not identify you personally.
        </p>
        <p>
          Tickets are sold through Luma, and some programs use Google Forms. Information you give on
          those sites is handled under Luma&rsquo;s and Google&rsquo;s privacy policies, and is
          shared with us as the event organizer.
        </p>
      </>
    ),
  },
  {
    heading: "Information we collect in the attendee guide",
    body: (
      <>
        <p>
          You can use the guide without signing in. In that case, everything you save, such as your
          schedule, notes and contacts, stays in your browser on your device and is not sent to us.
        </p>
        <p>
          If you sign in with Google, Google shares your name, email address and profile photo with
          us. If you sign in with your email instead, we collect your email address and the name you
          enter, and we email you a one-time code to finish signing in. We use this information to
          create your guide account and show who is signed in. While you are
          signed in, the things you save in the guide are stored in your account so they appear on
          any device you sign in on. This can include your schedule, notes, goals, check-ins, your
          profile, and contact details you add for people you meet.
        </p>
        <p>
          When you sign in, we check your email address against the UBC 2026 registrations in Luma,
          our ticketing service. We also check it against the university email address you gave when
          you registered. If we find your registration, the guide fills in your profile from your
          registration answers (your name, school, graduation year, major, LinkedIn, X and goals),
          which you can change. Your ticket type and check-in QR code are also saved in the guide on
          your device so you can show them at the door. If we don&rsquo;t find a registration, the
          guide tells you so. To match university email addresses, we keep a private copy of
          registered attendees&rsquo; Luma guest IDs and email addresses that only our server can
          read.
        </p>
        <p>
          When you sign in and your profile has your email address and school, your name and school
          are listed in the guide&rsquo;s Students tab so other attendees can find you. Anything else
          you add to your profile, such as your year, major, and LinkedIn, Instagram and X links,
          shows on that listing too. Your email address and phone
          number are never listed. You can take yourself off the list at any time by turning off
          &ldquo;List me in the Students tab&rdquo; on your profile.
        </p>
        <p>
          Coffee chat matching is off unless you turn it on, and you need to be signed in to use it. If
          you do, we keep your answers and phone number privately with your account, use them to match
          you with another attendee, share your name, school, phone number and LinkedIn with your match,
          and email you both about the match.
        </p>
      </>
    ),
  },
  {
    heading: "How we use Google user data",
    body: (
      <>
        <p>
          We only use the information Google shares with us to sign you in, keep your saved items in
          sync, and run the features you turn on in the guide. We do not sell it, use it for
          advertising, or use it to train AI models. We do not share it with anyone except the
          service providers listed below that run the guide for us.
        </p>
        <p>
          Our use of information received from Google APIs follows the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements.
        </p>
      </>
    ),
  },
  {
    heading: "Service providers",
    body: (
      <>
        <p>We use these companies to run the website and the guide:</p>
        <ul>
          <li>Vercel hosts the website and the guide, and provides page-view analytics.</li>
          <li>Supabase handles guide sign-in and stores guide accounts and saved items.</li>
          <li>Google provides sign-in with Google.</li>
          <li>Resend sends our emails, such as sign-in codes, speaker confirmations and coffee chat matches.</li>
          <li>Luma handles ticketing and registration, and tells the guide whether a signed-in account is registered.</li>
        </ul>
        <p>They process information on our behalf and only as needed to provide their service.</p>
      </>
    ),
  },
  {
    heading: "How long we keep information",
    body: (
      <>
        <p>
          We keep speaker applications for as long as we need them to plan the conference. We keep
          guide accounts and the items saved in them until you ask us to delete them or until we
          retire the guide, at which point we delete them.
        </p>
      </>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <>
        <p>
          You can use the guide without an account, in which case you are not listed. If you sign in,
          you can turn off the Students tab listing and coffee chat matching at any time from your
          profile, and you can sign out at any time. &ldquo;Reset my guide&rdquo; on your profile erases
          everything you saved, on your phone and in your account.
        </p>
        <p>
          To see, correct or delete the information we hold about you, or to delete your guide
          account, email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20request`}>{CONTACT_EMAIL}</a>. You can
          also remove the guide&rsquo;s access to your Google account at{" "}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
            myaccount.google.com/permissions
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "Security",
    body: (
      <>
        <p>
          All traffic to the website and the guide is encrypted. Each guide account can only read and
          change its own saved items. No system is perfectly secure, so please don&rsquo;t store
          anything in the guide that you would not want others to see.
        </p>
      </>
    ),
  },
  {
    heading: "Children",
    body: (
      <>
        <p>
          The conference is for university students and industry professionals. The website and the
          guide are not meant for children under 13, and we do not knowingly collect their
          information.
        </p>
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        <p>
          If we change this policy, we will update it on this page and change the effective date
          below.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#F4F3EF] min-h-screen">
      <section className="bg-[#1A2A36] pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-[2px] bg-[#EC8644]" />
            <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
              Legal
            </span>
          </div>
          <h1
            className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(44px, 7vw, 88px)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm mt-5">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-14 sm:py-20">
        <div className="space-y-12 text-[#293C4B]">
          {SECTIONS.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">{heading}</h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#293C4B]/80 [&_a]:text-[#293C4B] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#EC8644] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
                {body}
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="text-[15px] leading-relaxed text-[#293C4B]/80">
              Questions about this policy go to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20question`}
                className="text-[#293C4B] font-medium underline underline-offset-2 hover:text-[#EC8644]"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
