import React from "react";

const partners = [
  {
    name: "Prothom Alo",
    logo: "https://mir-s3-cdn-cf.behance.net/projects/404/5b13b875505561.Y3JvcCwzNTE0LDI3NDgsMCwxNw.jpg",
    url: "https://www.prothomalo.com/",
  },
  {
    name: "The Daily Star",
    logo: "https://play-lh.googleusercontent.com/BTl8BuHW9GW6M3-LliMb5RASiephVLM1yMjhWQrO2c9yUPrC3a2Z1XWFCVM1wjBLRw",
    url: "https://www.thedailystar.net/",
  },
  {
    name: "Channel i",
    logo: "https://images.seeklogo.com/logo-png/42/1/channel-i-logo-png_seeklogo-427745.png",
    url: "https://www.channelionline.com/",
  },
  {
    name: "Kaler Kantho",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaq2KNU1eRbpsxOKPSexHwy42Lvalr_IWdxg&s",
    url: "https://www.kalerkantho.com/",
  },
  {
    name: "Bangla Tribune",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTaRRVZDewfnO2RI47nzv1GwB-yAHBWcTNQ&s",
    url: "https://www.banglatribune.com/",
  },
  {
    name: "Somoy TV",
    logo: "https://www.dainiktarget.com/wp-content/uploads/2024/08/Somoy-TV-Logo.png",
    url: "https://www.somoynews.tv/",
  },
  {
    name: "NTV",
    logo: "https://images.seeklogo.com/logo-png/39/1/ntv-channel-logo-png_seeklogo-396286.png",
    url: "https://www.ntvbd.com/",
  },
  {
    name: "Bdnews24",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMrzPYaZ3V-uKCCuRngZC35nwAH4hhwLW2w&s",
    url: "https://bdnews24.com/",
  },
  {
    name: "ATN News",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZ7hPVm7sMFIklaQdj0UVxhQI4MWD9pc_rQ&s",
    url: "https://www.atnnewstv.com/",
  },
];

const PartnersMediaSection = () => (
  <div className="relative w-full max-w-5xl mx-auto py-10 flex flex-col items-center my-8 roboto">
    {/* Blurred background */}
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/40 via-white/60 to-green-200/40 dark:from-slate-800/60 dark:via-slate-900/80 dark:to-slate-800/60 blur-xl rounded-3xl"
      style={{ filter: "blur(32px)" }}
    ></div>

    {/* Glassmorphism card */}
    <div className="w-full bg-white/40 dark:bg-slate-950/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700 px-4 py-12 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6 tracking-tight">
        Our Partners & Media Mentions
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-center text-lg md:text-xl mb-8">
        Matrify is trusted and featured by leading media and partners.
      </p>

      {/* Scrolling row */}
      <div className="overflow-hidden w-full">
        <div className="flex items-center gap-8 animate-scroll-logos">
          {[...partners, ...partners].map((partner, idx) => (
            <a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group min-w-[120px]"
              title={partner.name}
              style={{ flex: "0 0 auto" }}
            >
              <div className="bg-white/70 dark:bg-slate-800 rounded-xl shadow-lg p-3 flex items-center justify-center w-24 h-24 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-[80px] object-contain"
                />
              </div>
              <span className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-semibold text-center">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style>
        {`
          @keyframes scroll-logos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-logos {
            width: max-content;
            animation: scroll-logos 30s linear infinite;
          }
          @media (max-width: 640px) {
            .animate-scroll-logos {
              gap: 2rem;
            }
          }
        `}
      </style>
    </div>
  </div>
);

export default PartnersMediaSection;
