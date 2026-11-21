import Image from "next/image";

const certificates = [
  {
    src: "/home/client%201.png",
    alt: "NPMA — National Pest Management Association",
  },
  {
    src: "/home/client%202.png",
    alt: "DineSecure",
  },
  {
    src: "/home/client%203.png",
    alt: "BPCA — British Pest Control Association Observer",
  },
  {
    src: "/home/client%204.png",
    alt: "ISO 9001:2015 Certified Company",
  },
  {
    src: "/home/client%205.png",
    alt: "HACCP Certified",
  },
];

export default function Certifications() {
  return (
    <section className="w-full px-5 py-12 sm:px-16 sm:py-16">
      <h2
        className="text-center text-[32px] leading-none font-semibold text-[#222222]"
        data-gsap-split
      >
        Recognized, Certified & Approved by UAE Authorities
      </h2>

      <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:justify-between">
        {certificates.map((cert) => (
          <div
            key={cert.src}
            className="flex h-[110px] w-full max-w-[260px] items-center justify-center rounded-[15px] border border-[#E7E7E7] bg-[#F2F2F2] px-5 py-4"
            data-gsap-card
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={182}
              height={70}
              unoptimized
              className="h-[70px] w-[182px] object-contain opacity-100"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
