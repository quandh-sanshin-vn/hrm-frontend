"use client";

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
  const [tab, changeTab] = useState("password");
  return (
    <Tabs
      onValueChange={changeTab}
      defaultValue="password"
      className="flex flex-1 flex-col bg-white h-full w-full min-w-full"
    >
      <TabsList className="w-full justify-start ">
        <TabsTrigger value="personal" className="flex-col">
          <div className="flex items-center">
            {tab === "personal" ? (
              <Image src={PersonalActiveIcon} alt="" className="h-6 w-6 mx-1" />
            ) : (
              <Image src={PersonalIcon} alt="" className="h-6 w-6 mx-1" />
            )}
            <p
              className="text-[16px]"
              style={{
                // fontWeight: tab === "personal" ? "700" : "400",
                color: tab === "personal" ? "var(--primary)" : "black",
              }}
            >
              Personal Information
            </p>
          </div>
          {tab === "personal" && <div className="h-1 w-full bg-primary mt-1" />}
        </TabsTrigger>
        <TabsTrigger value="professional" className="flex-col">
          <div className="flex items-center">
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
                // fontWeight: tab === "professional" ? "700" : "400",
                color: tab === "professional" ? "var(--primary)" : "black",
              }}
            >
              Professional Information
            </p>
          </div>
          {tab === "professional" && (
            <div className="h-1 w-full bg-primary mt-1" />
          )}
        </TabsTrigger>

        <TabsTrigger value="password" className="flex-col">
          <div className="flex items-center">
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
                // fontWeight: tab === "password" ? "700" : "400",
                color: tab === "password" ? "var(--primary)" : "black",
              }}
            >
              Change Password
            </p>
          </div>
          {tab === "password" && <div className="h-1 w-full bg-primary mt-1" />}
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
