const episodes = [
  {
    id: "1z_6TWy7XkDduf01sDFmiif_dZk8OfV3g",
    episode: "Episode 01",
    title: "",
    comingSoon: false,
  },
  {
    id: "1siqIWd3b1k1IpyEEK6AzQpWzXZ9-1-P6",
    episode: "Episode 02",
    title: "",
    comingSoon: false,
  },
  {
    id: null,
    episode: "Episode 03",
    title: "Coming Soon",
    comingSoon: true,
  },
];

export default function Videos() {
  return (
    <section className="bg-[#F4F3EF] py-16 sm:py-20">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-6 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            Original Series
          </span>
        </div>
        <div className="flex items-end justify-between mb-10 gap-6">
          <h2
            className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            The UBC Sitcom
          </h2>
          <p className="text-[#9CADB7] text-sm hidden sm:block pb-1">
            A student-produced original series
          </p>
        </div>

        {/* Episodes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {episodes.map(({ id, episode, title, comingSoon }) => (
            <div key={episode} className="flex flex-col gap-3">
              {comingSoon ? (
                <div
                  className="relative w-full rounded-2xl overflow-hidden bg-[#293C4B]/8 border border-[#293C4B]/10"
                  style={{ paddingTop: "68%" }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#293C4B]/15 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#293C4B]/25"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                      </svg>
                    </div>
                    <span className="text-[#293C4B]/30 text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-black/40"
                  style={{ paddingTop: "68%" }}
                >
                  <iframe
                    src={`https://drive.google.com/file/d/${id}/preview`}
                    className="absolute w-full"
                    style={{ top: "-18%", height: "118%" }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={title}
                  />
                </div>
              )}
              <div>
                <p className="text-[#EC8644] text-xs font-medium uppercase tracking-widest">
                  {episode}
                </p>
                <p className="text-[#293C4B] text-sm font-medium mt-0.5">
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
