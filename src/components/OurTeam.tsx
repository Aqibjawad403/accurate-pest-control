import Image from "next/image";

const team = [
  {
    name: "Catherine Li",
    role: "Customer Service Executive/ Admin",
    image: "/team/team%201.png",
  },
  {
    name: "Team Member",
    role: "Role / Position",
    image: "/team/team%202.png",
  },
  {
    name: "Team Member",
    role: "Role / Position",
    image: "/team/team%203.png",
  },
];

type OurTeamProps = {
  background?: "white" | "gray";
  description?: string;
};

export default function OurTeam({
  background = "gray",
  description,
}: OurTeamProps = {}) {
  return (
    <section
      className={`w-full px-16 py-16 max-lg:px-10 max-sm:px-5 max-sm:py-12 ${
        background === "white" ? "bg-white" : "bg-[#F2F2F2]"
      }`}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex h-[41px] items-center justify-center gap-2.5 rounded-[30px] border-[0.5px] border-[#B6B6B6] bg-[#EDEDED] px-[18px] py-[9px] opacity-100"
          data-gsap-badge
        >
          <span className="text-[18px] leading-none font-normal text-[#444444]">
            OUR TEAM
          </span>
        </div>

        <h2
          className="mt-6 max-w-[900px] text-center text-[45px] leading-none font-bold text-[#222222] max-sm:text-[28px]"
          data-gsap-split
        >
          Complete Pest Control Solutions for Every Environment
        </h2>
        {description && (
          <p
            className="mt-4 max-w-[700px] text-center text-[18px] leading-[1.4] text-[#666666] max-sm:text-[16px]"
            data-gsap-copy
          >
            {description}
          </p>
        )}
      </div>

      <div className="mt-14 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3 xl:justify-items-stretch">
        {team.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="relative flex h-[400px] w-full max-w-[420px] flex-col justify-end gap-2 overflow-hidden rounded-[20px] bg-[#D9D9D9] px-6 pb-6 opacity-100 max-sm:h-[340px] xl:max-w-none"
            data-gsap-card
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-top"
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 28.37%, rgba(0, 0, 0, 0.28) 66.35%, #000000 100%)",
              }}
              aria-hidden
            />

            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="align-bottom text-[32px] leading-none font-semibold tracking-[0.2px] text-white max-sm:text-[24px]">
                {member.name}
              </h3>
              <p className="align-bottom text-[16px] leading-none font-normal tracking-[0.2px] text-white">
                {member.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
