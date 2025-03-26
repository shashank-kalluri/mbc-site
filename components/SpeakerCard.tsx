import Image from "next/image";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

interface SpeakerProps {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}
const defaultImage = "https://picsum.photos/200";

const SpeakerCard = ({
  name,
  role,
  image,
  twitter,
  linkedin,
}: SpeakerProps) => {
  return (
    <div className="w-48 md:w-52 lg:w-56 p-4 rounded-lg shadow-lg flex flex-col items-center text-center">
      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden">
        <Image
          src={defaultImage}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="font-semibold text-lg mt-3">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
      <div className="mt-2 flex space-x-3">
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
              : `Twitter link not available`
          }
        >
          <FaTwitter className="h-5 w-5" />
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
              : `LinkedIn link not available`
          }
        >
          <FaLinkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default SpeakerCard;
