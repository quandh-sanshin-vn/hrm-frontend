"use client";
import { UserProfileParams } from "@/apis/modules/auth";
import { AlertDialogCancelButton } from "@/components/common/AlertDialogCancelButton";
import { StyledDatePicker_v1 } from "@/components/common/StyledDatePicker_v1";
import StyledOverlay from "@/components/common/StyledOverlay";
import { Button } from "@/components/ui/button";
import IconCamera from "../../assets/icons/iconCamera.svg";
import AvatarDefault from "../../assets/images/avatar_default.png";
import Image, { StaticImageData } from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditMyPageUseCase } from "@/core/application/usecases/my-page/editMyPage.usecase";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { AuthRepositoryImpl } from "@/core/infrastructure/repositories/auth.repo";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/use-dimession";
import useFocus from "@/hooks/use-focus";
import { useToast } from "@/hooks/use-toast";
import { useEditingStore, useFileStore } from "@/stores/commonStore";
import { useUserStore } from "@/stores/userStore";
import { DATE, formatStringToDate } from "@/utilities/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const formSchema = z.object({
  fullname: z.string().trim(),
  phone: z.string().trim(),
  birth_day: z
    .union([z.string(), z.date()])
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        return date < today;
      },
      {
        message: "Date of birth must be in the past",
      }
    )
    .transform((value) => new Date(value)),
  address: z.string().trim(),
  country: z.string().trim(),
  image: z.string().trim(),
});

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

const authRepo = new AuthRepositoryImpl();
const editMyPage = new EditMyPageUseCase(authRepo);

export default function PersonalInformationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const useDimession = useWindowSize();
  const { user, setUser } = useUserStore((state) => state);
  const { isEditing, setIsEditing } = useEditingStore((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  const { image, setImage, clearImage } = useFileStore();
  const [selectedImage, setSelectedImage] = useState<string | StaticImport>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State to control modal visibility
  const [previewImage, setPreviewImage] = useState<
    string | StaticImageData | null
  >(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user?.phone,
      birth_day: formatStringToDate(user?.birth_day || ""),
      address: user?.address,
      country: user?.country,
      image: user?.image,
    },
  });

  const isReserveForm = form.watch("fullname");
  const isFocus = useFocus();

  useEffect(() => {
    if (isFocus) {
      form.setValue("fullname", user?.fullname || "");
      form.setValue("address", user?.address || "");
      form.setValue("phone", user?.phone || "");
      form.setValue("country", user?.country || "");
      form.setValue("image", user?.image || "");
      form.setValue("birth_day", formatStringToDate(user?.birth_day || ""));
    }
  }, [isReserveForm, isFocus]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> use cases -> repositories -> API
    try {
      setLoading(true);
      const params: UserProfileParams = {
        phone: data.phone,
        birth_day: format(data.birth_day, DATE).toString(),
        address: data.address,
        country: data.country,
        image: image,
        updated_at: user?.updated_at || "",
      };

      const res = await editMyPage.execute(params);
      if (res?.code === 0) {
        setUser(res.data);
        toast({
          description: "Edit profile success",
          color: "bg-blue-200",
        });
      } else {
        toast({
          description: "Edit profile failed",
          color: "bg-red-500",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (!isEditing) {
      setSelectedImage("");
    }
  }, [isEditing]);

  const handleCloseModal = () => {
    setIsPreviewOpen(false);
  };

  const handleImageClick = () => {
    setPreviewImage(
      user?.image ? "http://192.168.1.171:8000" + user.image : AvatarDefault
    );
    setIsPreviewOpen(true);
  };

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div
        className="bg-white flex flex-1 p-4 flex-col w-full max-h-screen overflow-y-auto"
        style={{
          maxHeight: useDimession.height - 100 - 100 - 120,
          minHeight: useDimession.height - 100 - 100 - 120,
          scrollbarWidth: "none",
        }}
      >
        <StyledOverlay isVisible={loading} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            {user ? (
              <div className="grid grid-cols-1 laptop:grid-cols-2 gap-5 w-full">
                <div
                  className="laptop:hidden relative w-[100px] h-[100px]"
                  onClick={isEditing ? undefined : handleImageClick}
                >
                  <Image
                    src={
                      selectedImage ||
                      (user?.image
                        ? `http://192.168.1.171:8000${user.image}`
                        : AvatarDefault)
                    }
                    alt=""
                    width={100}
                    height={100}
                    className={`w-full h-full object-cover cursor-pointer rounded-md ${
                      isEditing ? "opacity-60" : ""
                    }`}
                  />
                  {isEditing && (
                    <>
                      <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
                        <div className="p-1 rounded-full bg-white">
                          <Image
                            src={IconCamera}
                            alt=""
                            className="shadow-lg"
                          />
                        </div>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleChooseImage}
                        className="hidden"
                        id="fileInput1"
                      />
                      <label
                        htmlFor="fileInput1"
                        className="absolute inset-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
                <div className="flex flex-col pb-2 col-span-1 gap-5">
                  <div className={`flex flex-col border-b`}>
                    <FormField
                      control={form.control}
                      name={"fullname"}
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem className={`w-full`}>
                            <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                              Fullname
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                tabIndex={2}
                                disabled
                                className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full ${
                                  isEditing ? "hover:cursor-not-allowed" : ""
                                }`}
                                style={{ color: "#16151", opacity: 1 }}
                              />
                            </FormControl>
                            {isEditing && fieldState.error?.message && (
                              <p className={"text-red-500 text-[10px]"}>
                                {fieldState.error?.message}
                              </p>
                            )}
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div
                    className={`flex flex-col border-b ${
                      isEditing ? "" : "hover:cursor-not-allowed"
                    }`}
                  >
                    <FormField
                      control={form.control}
                      name={"birth_day"}
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Date of Birth
                          </FormLabel>
                          <FormControl>
                            <StyledDatePicker_v1
                              title=""
                              field={field}
                              tabIndex={3}
                            />
                          </FormControl>
                          {isEditing && fieldState.error?.message && (
                            <p className={"text-red-500 text-[10px]"}>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className={`flex flex-col border-b`}>
                    <FormField
                      control={form.control}
                      name={"address"}
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                              Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                tabIndex={4}
                                disabled={!isEditing}
                                className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full`}
                                style={{ color: "#16151", opacity: 1 }}
                              />
                            </FormControl>
                            {isEditing && fieldState.error?.message && (
                              <p className={"text-red-500 text-[10px]"}>
                                {fieldState.error?.message}
                              </p>
                            )}
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className={`flex flex-col border-b`}>
                    <FormField
                      control={form.control}
                      name={"country"}
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Nationality
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={5}
                              disabled={!isEditing}
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                          {isEditing && fieldState.error?.message && (
                            <p className={"text-red-500 text-[10px]"}>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col pb-2 col-span-1 gap-5">
                  <div className={`flex flex-col border-b`}>
                    <FormField
                      control={form.control}
                      name={"phone"}
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Mobile Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={6}
                              disabled={!isEditing}
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                          {isEditing && fieldState.error?.message && (
                            <p className={"text-red-500 text-[10px]"}>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {!isEditing && (
                  <Button
                    tabIndex={7}
                    className="laptop:hidden h-[50px] mx-4 fixed bottom-[14px] right-0 left-0 font-normal text-white text-[16px] hover:bg-primary-hover rounded-lg"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                <div className="fixed flex-col-reverse laptop:flex-row bottom-[26px] right-0 mobile:left-0 laptop:right-[27px]">
                  {isEditing && (
                    <div className="flex gap-2 laptop:gap-4 w-full flex-col-reverse laptop:flex-row justify-end">
                      <AlertDialogCancelButton isOpen={isOpen} tabIndex={7} />
                      <Button
                        tabIndex={8}
                        className="laptop:w-[152px] mx-4 laptop:mx-0 h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                        type="submit"
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <StyledOverlay isVisible={loading} />
            )}
          </form>
        </Form>
      </div>
      {/* Modal for image preview */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleCloseModal} // Close modal on background click
        >
          <div
            className="bg-white rounded shadow-lg relative w-[500px] h-[400px] overflow-hidden first-letter:flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex items-center justify-center bg-black w-full h-full">
              <Image
                src={previewImage || AvatarDefault}
                alt="Preview"
                width={500}
                height={500}
                className="max-w-full max-h-full  object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
