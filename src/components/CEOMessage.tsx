import Image from "next/image";

const emiratesApprovals = [
  "Dubai Municipality (Dubai)",
  "Sharjah Municipality (Sharjah)",
  "Ajman Municipality (Ajman)",
  "Ras Al Khaimah Municipality (Ras Al Khaimah)",
  "Umm Al Quwain Municipality (Umm Al Quwain)",
  "Fujairah Municipality (Fujairah)",
  "Abu Dhabi Quality & Conformity Council (ADQCC) / Abu Dhabi Public Health Centre (Abu Dhabi)",
];

export default function CEOMessage() {
  return (
    <section className="w-full bg-[#F2F2F2]" data-gsap-section="ceo-message">
      <div className="relative mx-auto min-h-[955px] w-full max-w-[1144px] px-0 py-20 max-lg:px-8 max-sm:min-h-0 max-sm:px-5 max-sm:py-12">
        <Image
          src="/coma 1.svg"
          alt=""
          width={100}
          height={72}
          className="pointer-events-none absolute top-20 left-0 h-[72px] w-[100px] max-lg:left-8 max-sm:top-12 max-sm:left-6 max-sm:h-[50px] max-sm:w-[69px]"
          aria-hidden
        />
        <Image
          src="/coma 2.svg"
          alt=""
          width={100}
          height={72}
          className="pointer-events-none absolute right-8 bottom-20 h-[72px] w-[100px] max-sm:right-6 max-sm:bottom-8 max-sm:h-[50px] max-sm:w-[69px]"
          aria-hidden
        />

        <div className="ml-[138px] max-w-[880px] max-lg:ml-[110px] max-lg:max-w-none max-sm:ml-0 max-sm:pt-12">
          <h2
            className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[45px] leading-none font-bold text-black max-sm:text-[32px]"
            data-gsap-split
          >
            CEO&apos;s Message
          </h2>

          <div
            className="mt-6 space-y-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.3] font-normal text-[#666666] max-sm:text-[16px]"
            data-gsap-copy
          >
            <p>
              At Accurate Pest Control Services, our mission extends beyond
              eradicating pests in the UAE; it also includes creating awareness
              of the dangers they pose. Pests and the diseases they carry can
              severely affect human and animal health, as well as valuable
              assets and property. Infestations may result in irrecoverable
              losses. Effective pest control is essential to ensure a healthy,
              safe, and stable life for everyone.
            </p>
            <p>
              Pest control is a highly specialized field, and Accurate Pest
              Control Services L.L.C. has the latest technology and expertise
              to meet these challenges. We remain committed to maintaining our
              workforce and technology to stay ahead of emerging pests and
              evolving threats, safeguarding people, animals, property, and
              infrastructure. However, we cannot create a healthier and safer
              society through our efforts alone. Active community participation
              is essential. Everyone must understand the importance of routine
              pest management and ensure regular pest control on their premises
              for a healthier and safer future.
            </p>
          </div>

          <div
            className="mt-7 font-['Inter',var(--font-plus-jakarta),sans-serif]"
            data-gsap-copy
          >
            <h3 className="text-[22px] leading-none font-bold text-[#32A849] uppercase">
              Shahzada Hasnain Khalid
            </h3>
            <p className="mt-2 text-[18px] leading-none font-normal text-[#666666] capitalize">
              Chief Executive Officer (CEO)
            </p>
          </div>

          <div
            className="mt-4 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[16px] leading-[1.3] text-[#666666] max-sm:text-[14px]"
            data-gsap-copy
          >
            <p className="font-bold text-[#222222]">
              B.Sc. (Hons.) Agriculture
            </p>
            <p className="mt-1">
              University of Agriculture, Faisalabad, Pakistan.
            </p>
          </div>

          <p
            className="mt-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[16px] leading-[1.3] text-[#666666] max-sm:text-[14px]"
            data-gsap-copy
          >
            Approved Pest Control Supervisor by the relevant Municipalities
            and Regulatory Authorities across all seven Emirates of the United
            Arab Emirates, including:
          </p>
          <ul
            className="mt-2 list-disc space-y-0.5 pl-6 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[16px] leading-[1.25] text-[#666666] marker:text-[#32A849] max-sm:text-[14px]"
            data-gsap-copy
          >
            {emiratesApprovals.map((approval) => (
              <li key={approval}>{approval}</li>
            ))}
          </ul>

          <p
            className="mt-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[16px] leading-[1.3] text-[#666666] max-sm:text-[14px]"
            data-gsap-copy
          >
            Certified &amp; Licensed Pest Control Professional with regulatory
            approvals for Public Health Pest Control and Integrated Pest
            Management (IPM) operations throughout the United Arab Emirates.
          </p>
        </div>
      </div>
    </section>
  );
}
