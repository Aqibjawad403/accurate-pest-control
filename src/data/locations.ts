export type Location = {
  name: string;
  address: string;
  mapUrl?: string;
  mapLink?: string;
};

export const locations: Location[] = [
  {
    name: "Dubai (Head Office)",
    address:
      "Warehouse No. 1, Plot No. 247-289, Al Qusais Industrial Area 4, Dubai - UAE",
    mapUrl:
      "https://maps.google.com/maps?cid=2752184997120416155&ll=25.293945,55.396995&z=14&output=embed",
    mapLink:
      "https://www.google.com/maps?cid=2752184997120416155&ll=25.293945,55.396995&z=14",
  },
  {
    name: "Abu Dhabi",
    address:
      "Office No. 139, Ahmed Mubarak Abdullah Al Kendi Building, Plot No. M2, Sector No. 2, Musaffah, Abu Dhabi - UAE",
    mapUrl:
      "https://maps.google.com/maps?q=24.3740219,54.5164243&z=15&output=embed",
    mapLink: "https://maps.app.goo.gl/kbXz9uKgiPNMGyks5",
  },
  {
    name: "Sharjah",
    address:
      "Shop No. 3 & 4, Building No. 3702, Muwailah Commercial Area, Sharjah - UAE",
    mapUrl:
      "https://maps.google.com/maps?cid=11659020051632157987&z=15&output=embed",
    mapLink:
      "https://www.google.com/maps/place/Accurate+Pest+Control+Services+llc+(Branch+1)/@25.292226,55.447729,15z/data=!4m6!3m5!1s0x3e5f5ffd1af07fef:0xa1cd28f6feb0f523!8m2!3d25.2922259!4d55.447729!16s%2Fg%2F11xp0173ws?hl=en&entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Ajman",
    address:
      "Shop No. 1, Plot No. 3074, Eastern Sector, Al Zahya 1, Ajman - UAE",
    mapUrl:
      "https://maps.google.com/maps?q=25.4042161,55.5964444&z=15&output=embed",
    mapLink:
      "https://www.google.com/maps/@25.4042161,55.5964444,33a,75y,136.79h,90t/data=!3m7!1e1!3m5!1s7ZGECHRXC6ijGqln8gkgPg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3D7ZGECHRXC6ijGqln8gkgPg%26yaw%3D136.7893322169311!7i16384!8i8192?entry=ttu",
  },
  {
    name: "Umm Al Quwain",
    address:
      "Shop No. 1, Leatain 1, Al Nouf Building, Al Muktaa Street, Umm Al Quwain - UAE",
    mapUrl:
      "https://maps.google.com/maps?q=25.5196938,55.5453438&z=15&output=embed",
    mapLink: "https://maps.app.goo.gl/oRk8b3aAYAfqretC9",
  },
  {
    name: "Ras Al Khaima",
    address: "Shop No. 13, Al Fulaya Plaza, Ras Al Khaimah - UAE",
    mapUrl:
      "https://maps.google.com/maps?q=25.7390761,55.9787801&z=15&output=embed",
    mapLink: "https://maps.app.goo.gl/Yw8AbcRS23uGdj2F6",
  },
  {
    name: "Fujairah",
    address: "Shop No. 6628, Block E, Madhab, Fujairah - UAE",
    mapUrl:
      "https://maps.google.com/maps?q=25.1322531,56.3291062&z=15&output=embed",
    mapLink: "https://maps.app.goo.gl/H1F5j8SP9zfvPAfS9",
  },
];
