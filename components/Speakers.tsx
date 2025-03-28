import { speakers } from "@/data/speakers";
import SpeakerCard from "@/components/SpeakerCard";

const Speakers = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl font-bold font-mono text-center text-maize mb-10">
          Past Speakers
        </h2>

        {/* Scrollable Row on Small Screens */}
        <div className="sm:hidden overflow-x-auto scroll-smooth -ml-6 -mr-6 px-6">
          <div className="flex space-x-8 w-max">
            {speakers.map((speaker) => (
              <div key={speaker.name} className="flex-shrink-0 w-60">
                <SpeakerCard {...speaker} />
              </div>
            ))}
          </div>
        </div>

        {/* Grid Layout on Medium+ Screens */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-8">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} {...speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
