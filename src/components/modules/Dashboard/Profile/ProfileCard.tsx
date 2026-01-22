import { CirclePlus, Copy, Link, Share2 } from "lucide-react";
import Image from "next/image";
import AddSocial from "./AddSocial";
import { Button } from "../../../ui/button";
import { ReusableDialog } from "../../../shared/ReusableDialog";

const socialLinks = [
  { src: "/google.png", alt: "Google" },
  { src: "/facebook.png", alt: "Facebook" },
  { src: "/x.png", alt: "Twitter" },
];

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <div className="flex justify-between">
        <h2 className="font-bold opacity-80 text-lg">Profile </h2>
        <Share2 className="opacity-60 " />
      </div>
      <div className="relative h-24 w-24 mx-auto rounded-full border overflow-hidden">
        <Image
          src="/default-profile.png"
          // src={imageUrl || "/default-profile.png"}
          alt="Profile"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h2 className="text-lg font-semibold mt-4 opacity-90">Wade Warren</h2>
      <p className=" text-sm flex gap-3 justify-center opacity-60">
        wade.warren@example.com
        <Copy />
      </p>
      <p className="text-sm  mt-6 opacity-75">Linked with Social media</p>
      <div className="flex justify-center gap-4 mt-4">
        {socialLinks.map(({ src, alt }) => (
          <div key={alt} className="flex items-center gap-2">
            <Image src={src} width={20} height={20} alt={alt} />
            <span className="text-[8px] flex items-center text-[#6467F2] gap-[2px]">
              <Link size={10} /> Linked
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ReusableDialog
          title="Social Media Manage"
          trigger={
            <Button variant="outline" className="opacity-60">
              <CirclePlus /> Social media
            </Button>
          }
          contentClassName="w-11/12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
        >
          <AddSocial />
        </ReusableDialog>
      </div>
    </div>
  );
}
