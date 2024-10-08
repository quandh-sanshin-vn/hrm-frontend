import Image from "next/image";
import React from "react";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import PositionIcon from "@/app/assets/icons/iconBriefcase.svg";
import EmailIcon from "@/app/assets/icons/iconMail.svg";

interface Props {
  fullName: string;
  positionName: string;
  email: string;
  imageUrl?: string | StaticImport;
}
export default function StyledAvatarUser(props: Props) {
  const { fullName, positionName, email, imageUrl } = props;
  console.log("-----imageUrl-----", imageUrl);
  return (
    <div className="flex items-center justify-start gap-x-4 mb-[10px]">
      <div className=" h-[100px] aspect-square ">
        <Image
          src={imageUrl ? "http://192.168.1.171:8000" + imageUrl : DefaultImage}
          alt=""
          className="object-cover w-full h-full"
          height={100}
          width={100}
        />
      </div>
      <div className=" h-[100px] flex flex-col gap-y-2 items-start ">
        <p className=" font-semibold text-[24px] ">{fullName}</p>
        <div className="flex items-center justify-center">
          <Image alt="" src={PositionIcon} />
          <p className=" font-normal text-[16px] ml-2">{positionName}</p>
        </div>
        <div className="flex items-center justify-center">
          <Image alt="" src={EmailIcon} />
          <p className=" font-normal text-[16px]  ml-2">{email}</p>
        </div>
        {/* <div className="flex items-center justify-center">
          <Image alt="" src={EmailIcon} />
          <p className=" font-normal text-[16px] ">{email}</p>
        </div> */}
      </div>
    </div>
  );
}
