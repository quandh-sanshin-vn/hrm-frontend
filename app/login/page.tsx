"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import iconEyeOn from "../assets/icons/iconEye.png";
import iconEyeOff from "../assets/icons/iconEyeOff.png";
import loginLogo from "../assets/logo/loginLogo.png";
import profilePic from "../assets/images/bgLogin.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EMAIL_REGEX } from "@/utilities/validate";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Chưa nhập email" })
    .regex(EMAIL_REGEX, "Email không đúng định dạng "),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .trim()
    .min(1, { message: "Chưa nhập mật khẩu" }),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //   "Mật khẩu không đúng định dạng"
  // ),
});

const LoginPage = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "quansang@gmail.com",
      password: "Admin123",
    },
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> next-auth -> use cases -> repositories -> API
    // API response -> next-auth: save to session. UI use "useSession" -> isLogin: true||false
    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
    });
    setLoading(false);
  };

  useEffect(() => {
    console.log("-----session---login----", session);
    if (status === "loading") return;
    if (session?.sessionToken) router.push("/dashboard");
  }, [session, status, router]);

  if (status === "loading") return <></>;
  return (
    <div className="bg-background flex flex-1 overscroll-none overflow-hidden ">
      <div className="flex flex-1 mobile:w-0 laptop:w-2/3 py-[52px] px-5 ">
        <Image
          src={profilePic}
          alt="Sanshin ITS member"
          className=" rounded-md"
          objectFit="fit"
          style={{
            height: "100%",
            width: "auto",
          }}
        />
      </div>
      <div className="h-screen bg-background laptop:w-1/3 mobile:w-full py-[52px] pr-5 ">
        <div className="flex w-full items-center justify-center py-8 mt-10 ">
          <Image src={loginLogo} alt="Logo" objectFit="contain" />
        </div>
        <p className="text-[32px] font-semibold">Welcome 👋 </p>
        <p className="text-[16px] text-gray-300 font-light ">
          Please login here
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-1"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-primary font-light text-[12px]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Enter your email"
                      {...field}
                      className="border-border focus:border-primary"
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-primary font-light text-[12px]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      tabIndex={2}
                      placeholder="Enter your password"
                      {...field}
                      className="border-border focus:border-primary"
                      endIcon={() => (
                        <Image
                          src={hidePassword ? iconEyeOff : iconEyeOn}
                          alt=""
                          className="h-4 w-4"
                        />
                      )}
                      endIconOnClick={toggleHidePassword}
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              tabIndex={3}
              className="w-full h-12 text-white text-[16px] hover:bg-primary-hover"
              type="submit"
            >
              {loading ? "Loading" : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
