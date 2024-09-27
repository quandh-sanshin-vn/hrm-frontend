import StyledOverlay from "@/components/common/StyledOverlay";
import { Button } from "@/components/ui/button";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import { useEditingStore, useFileStore } from "@/stores/commonStore";
import { useUserStore } from "@/stores/userStore";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import IconBriefCase from "../../assets/icons/iconBriefcase.svg";
import IconCamera from "../../assets/icons/iconCamera.svg";
import IconEmail from "../../assets/icons/iconGmail.svg";
import AvatarDefault from "../../assets/images/avatar_default.png";

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

const ImageProfileForm: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore((state) => state);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State to control modal visibility
  const [previewImage, setPreviewImage] = useState<
    string | StaticImageData | null
  >(null); // State for the image URL to preview
  const { isEditing, setIsEditing } = useEditingStore((state) => state);
  const { setImage } = useFileStore();
  const [selectedImage, setSelectedImage] = useState<string | StaticImport>("");

  const getMyPage = async () => {
    try {
      setLoading(true);
      const res: any = await showMyPage.execute();
      setUser(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Unable to get user information",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPage();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setSelectedImage("");
    }
  }, [isEditing]);

  const handleImageClick = () => {
    setPreviewImage(user?.image ? user.image : AvatarDefault);
    setIsPreviewOpen(true);
  };

  const handleCloseModal = () => {
    setIsPreviewOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
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
      {user ? (
        <div className="flex flex-row justify-between items-center ml-3">
          <div className="flex items-center gap-4 p-4">
            <div
              className="relative w-[100px] h-[100px]"
              onClick={isEditing ? undefined : handleImageClick}
            >
              <Image
                src={selectedImage || user?.image || AvatarDefault}
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
                      <Image src={IconCamera} alt="" className="shadow-lg" />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChooseImage}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="absolute inset-0 cursor-pointer"
                  />
                </>
              )}
            </div>
            {!isEditing && (
              <div className="flex flex-col justify-between gap-2">
                <p className="text-2xl font-semibold">{user.fullname}</p>
                <div className="flex flex-row gap-2">
                  <Image src={IconBriefCase} alt="" />
                  <p className="text-base">{user.position_name}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <Image src={IconEmail} alt="" />
                  <p className="text-base">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          {!isEditing && (
            <Button
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg mr-11"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </div>
      ) : (
        <StyledOverlay isVisible={loading} />
      )}

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
                src={previewImage || ""}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageProfileForm;
