"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginUseCase } from "@/core/application/usecases/auth/signIn.usecase";
import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthRepositoryImpl } from "@/core/infrastructure/repositories/auth.repo";
import { EMAIL_REGEX } from "@/utilities/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import iconEyeOn from "../assets/icons/iconEye.png";
import iconEyeOff from "../assets/icons/iconEyeOff.png";
import profilePic from "../assets/images/bgLogin.png";
import loginLogo from "../assets/logo/loginLogo.png";
import { getCookie, setCookie } from "cookies-next";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utilities/static-value";
import { toast } from "@/hooks/use-toast";
import StyledOverlay from "@/components/common/StyledOverlay";

const authRepo = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepo);

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Chưa nhập email" })
    .regex(EMAIL_REGEX, "Email không đúng định dạng "),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .trim()
    .min(1, { message: "Chưa nhập mật khẩu" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Mật khẩu không đúng định dạng"
    ),
});

const LoginPage = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI --> use cases -> repositories -> API
    // API response -> isLogin: true||false
    try {
      setLoading(true);
      const params: AuthCredentials = {
        email: data.username,
        password: data.password,
      };
      const response = await loginUseCase.execute(params);
      if (response.code === 1) {
        toast({
          duration: 2000,
          description: response.message,
          color: "bg-red-100",
        });
      } else {
        setCookie(ACCESS_TOKEN_KEY, response.token);
        setCookie(REFRESH_TOKEN_KEY, response.refreshToken);
        router.push("/dashboard");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const token = useMemo(() => getCookie(ACCESS_TOKEN_KEY), []);

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [router, token]);

  return (
    <div className="max-h-screen w-screen bg-background flex flex-1 overscroll-none overflow-hidden ">
      <StyledOverlay isVisible={loading} />
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
                      type={hidePassword ? "password" : "text"}
                      placeholder="Enter your password"
                      {...field}
                      className="border-border focus:border-primary"
                      endIcon={hidePassword ? iconEyeOff : iconEyeOn}
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
