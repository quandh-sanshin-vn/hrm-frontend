import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import ChangePasswordIcon from "../../assets/icons/iconLock.svg";
import ChangePasswordActiveIcon from "../../assets/icons/iconLockActive.svg";
import PersonalIcon from "../../assets/icons/iconUser.svg";
import PersonalActiveIcon from "../../assets/icons/iconUserActive.svg";
import ProfessionalIcon from "../../assets/icons/iconBriefcase.svg";
import ProfessionalActiveIcon from "../../assets/icons/iconBriefcaseActive.svg";
import ChangePasswordForm from "./ChangePasswordForm";

export default function MyPageTab() {
  const [tab, changeTab] = useState("");
  return (
    <Tabs
      onValueChange={changeTab}
      defaultValue="password"
      className="flex flex-1 flex-col bg-white h-full"
    >
      <TabsList className="w-full justify-start ">
        <TabsTrigger value="personal">
          {tab === "personal" ? (
            <Image src={PersonalActiveIcon} alt="" className="h-6 w-6 mx-1" />
          ) : (
            <Image src={PersonalIcon} alt="" className="h-6 w-6 mx-1" />
          )}
          <p
            className="text-[16px]"
            style={{
              fontWeight: tab === "personal" ? "700" : "400",
            }}
          >
            Personal Information
          </p>
        </TabsTrigger>
        <TabsTrigger value="professional">
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
            className="text-[16px]"
            style={{
              fontWeight: tab === "professional" ? "700" : "400",
            }}
          >
            Professional Information
          </p>
        </TabsTrigger>
        <TabsTrigger value="password">
          {tab === "password" ? (
            <Image
              src={ChangePasswordActiveIcon}
              alt=""
              className="h-6 w-6 mx-1"
            />
          ) : (
            <Image src={ChangePasswordIcon} alt="" className="h-6 w-6 mx-1" />
          )}
          <p
            className="text-[16px]"
            style={{
              fontWeight: tab === "password" ? "700" : "400",
            }}
          >
            Change Password
          </p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="personal">Personal Information form</TabsContent>
      <TabsContent value="professional">
        Professional Information form
      </TabsContent>
      <TabsContent value="password" className="flex flex-1 w-full">
        <ChangePasswordForm />
      </TabsContent>
    </Tabs>
  );
}
