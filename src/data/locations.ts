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
      "https://maps.google.com/maps?ll=25.293945,55.396995&z=12&t=m&hl=en&gl=US&mapclient=embed&cid=2752184997120416155",
    mapLink:
      "https://www.google.com/maps?ll=25.293945,55.396995&z=12&t=m&hl=en&gl=US&mapclient=embed&cid=2752184997120416155",
  },
  {
    name: "Abu Dhabi",
    address:
      "Office No. 139, Ahmed Mubarak Abdullah Al Kendi Building, Plot No. M2, Sector No. 2, Musaffah, Abu Dhabi - UAE",
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
  },
  {
    name: "Umm Al Quwain",
    address:
      "Shop No. 1, Leatain 1, Al Nouf Building, Al Muktaa Street, Umm Al Quwain - UAE",
  },
  {
    name: "Ras Al Khaima",
    address: "Shop No. 13, Al Fulaya Plaza, Ras Al Khaimah - UAE",
  },
  {
    name: "Fujairah",
    address: "Shop No. 6628, Block E, Madhab, Fujairah - UAE",
  },
];
