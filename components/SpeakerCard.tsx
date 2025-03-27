import { FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

interface SpeakerProps {
  name: string;
  role: string;
  company: string;
  image?: string;
  twitter?: string;
  linkedin?: string;
}

const SpeakerCard = ({
  name,
  role,
  company,
  image,
  twitter,
  linkedin,
}: SpeakerProps) => {
  // Generate a unique fallback image using the speaker's name
  const fallbackImage = `https://i.pravatar.cc/300?u=${encodeURIComponent(
    name
  )}`;

  return (
    <div className="w-60 md:w-64 lg:w-72 p-6 rounded-lg shadow-lg flex flex-col items-center text-center h-full">
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden">
        <Image
          src={image || fallbackImage}
          alt={name}
          fill
          style={{ objectFit: "cover" }} // Updated to use style prop
          className="rounded-lg"
        />
      </div>
      <div className="mt-4 space-y-1 flex-grow mb-4">
        <h3 className="font-semibold text-lg break-words">{name}</h3>
        <p className="text-sm text-gray-500 break-words">{role}</p>
        <p className="text-sm text-gray-700 font-semibold break-words">
          {company}
        </p>
      </div>
      <div className="mt-auto flex space-x-3 justify-center">
        <a
          href={twitter ? `https://twitter.com/${twitter}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 hover:text-gray-700 transition ${
            !twitter ? "opacity-50 cursor-default" : ""
          }`}
          aria-label={
            twitter
              ? `Twitter profile of ${name}`
              : "Twitter link not available"
          }
        >
          <FaTwitter className="h-6 w-6" />
        </a>
        <a
          href={linkedin ? `https://www.linkedin.com/in/${linkedin}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 hover:text-gray-700 transition ${
            !linkedin ? "opacity-50 cursor-default" : ""
          }`}
          aria-label={
            linkedin
              ? `LinkedIn profile of ${name}`
              : "LinkedIn link not available"
          }
        >
          <FaLinkedin className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};

export default SpeakerCard;
