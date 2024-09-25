import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React, { useState } from "react";

import ChangePasswordIcon from "../../assets/icons/iconLock.svg";
import ChangePasswordActiveIcon from "../../assets/icons/iconLockActive.svg";
import PersonalIcon from "../../assets/icons/iconUser.svg";
import PersonalActiveIcon from "../../assets/icons/iconUserActive.svg";
import ProfessionalIcon from "../../assets/icons/iconBriefcase.svg";
import ProfessionalActiveIcon from "../../assets/icons/iconBriefcaseActive.svg";
import PersonalInfoTab from "./PersonalInfoTab";
import ProfessionalInfoTab from "./ProfessionalInfoTab";

export default function StyledUserInfoTab() {
  const [tab, changeTab] = useState("personal");
  return (
    <Tabs
      value={tab}
      onValueChange={changeTab}
      defaultValue="personal"
      className="flex flex-1 flex-col h-full w-full min-w-full rounded-md"
    >
      <TabsList className="w-full justify-start border-b border-border rounded-none py-0">
        <TabsTrigger value="personal" className="flex-col ">
          <div className="flex items-center h-9">
            {tab === "personal" ? (
              <Image src={PersonalActiveIcon} alt="" className="h-6 w-6 mx-1" />
            ) : (
              <Image src={PersonalIcon} alt="" className="h-6 w-6 mx-1" />
            )}
            <p
              className="text-[16px] font-normal"
              style={{
                // fontWeight: tab === "personal" ? "700" : "400",
                color: tab === "personal" ? "var(--primary)" : "black",
              }}
            >
              Personal Information
            </p>
          </div>
          <div
            className="h-[2px] w-full  mt-1"
            style={{
              backgroundColor:
                tab === "personal" ? "var(--primary)" : "transparent",
            }}
          />
        </TabsTrigger>
        <TabsTrigger value="professional" className="flex-col">
          <div className="flex items-center h-9">
            {tab === "professional" ? (
              <Image
                src={ProfessionalActiveIcon}
                alt=""
                className="h-6 w-6 mx-1"
              />
            ) : (
              <Image src={ProfessionalIcon} alt="" className="h-6 w-6 mx-1" />
            )}
            <p
              className="text-[16px] font-normal"
              style={{
                // fontWeight: tab === "professional" ? "700" : "400",
                color: tab === "professional" ? "var(--primary)" : "black",
              }}
            >
              Professional Information
            </p>
          </div>

          <div
            className="h-[2px] w-full  mt-1"
            style={{
              backgroundColor:
                tab === "professional" ? "var(--primary)" : "transparent",
            }}
          />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <PersonalInfoTab changeTab={changeTab} />
      </TabsContent>
      <TabsContent value="professional">
        <ProfessionalInfoTab changeTab={changeTab} />
      </TabsContent>
    </Tabs>
  );
}
