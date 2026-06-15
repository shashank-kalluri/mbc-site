import ImageSlider from "./ImageSlider";

const stats = [
  { value: "1000+", label: "Students" },
  { value: "100+", label: "Universities" },
  { value: "50+", label: "Companies" },
  { value: "2", label: "Days" },
];

const photos = [
  { src: "/G724YpvWcAEVHXb.jpeg", alt: "UBC 2025" },
  { src: "/G8EWzYPWAAMYuWb.jpeg", alt: "UBC 2025" },
  { src: "/G8VBLXpaUAAVJOe.jpeg", alt: "UBC 2025" },
  { src: "/HIFVvbZXQAAq6Q1.jpeg", alt: "UBC 2025" },
  { src: "/HIFVwUtWsAAx6RQ.jpeg", alt: "UBC 2025" },
  { src: "/images/hackathon.jpg", alt: "UBC hackathon" },
];

export default function SocialProof() {
  return (
    <section className="bg-[#1A2A36] py-16 sm:py-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-6 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            By The Numbers
          </span>
        </div>

        {/* Asymmetric split: slider left, title + stats right */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-stretch">
          {/* Left: slider */}
          <div className="min-h-[420px]">
            <ImageSlider photos={photos} />
          </div>

          {/* Right: title + body + stats */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2
                className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.92] mb-6"
                style={{ fontSize: "clamp(44px, 6vw, 88px)" }}
              >
                Built by students
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                UBC started as a bet — that students could put on a conference
                serious enough for the industry to show up. Two years later,
                we've hosted over 1,000 attendees from 100+ universities, brought
                in speakers from the top protocols, VCs, and research labs, and
                built a community that extends well past the two days.
              </p>
              <p className="text-white/35 text-sm leading-relaxed">
                UBC 2026 returns to Austin this November. Bigger stage, better
                lineup, same energy.
              </p>
            </div>

            <div className="flex flex-col gap-0">
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex items-baseline justify-between py-4 ${
                    i < stats.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <span className="text-white/40 text-sm font-medium uppercase tracking-widest">
                    {label}
                  </span>
                  <span
                    className="font-[var(--font-zuume)] font-black text-[#EC8644] leading-none"
                    style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
