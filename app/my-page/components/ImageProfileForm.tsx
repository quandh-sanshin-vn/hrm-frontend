import Image, { StaticImageData } from "next/image";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import AvatarDefault from "../../assets/images/avatar_default.png";
import IconBriefCase from "../../assets/icons/iconBriefcase.svg";
import IconEmail from "../../assets/icons/iconGmail.svg";
import IconCamera from "../../assets/icons/iconCamera.svg";
import React, { useEffect, useState } from "react";
import StyledOverlay from "@/components/common/StyledOverlay";
import { Button } from "@/components/ui/button";
import { useEditingStore } from "@/stores/commonStore";
import { useUserStore } from "@/stores/userStore";

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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
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
                src={
                  isEditing
                    ? imagePreview || user?.image || AvatarDefault
                    : user?.image || AvatarDefault
                }
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover cursor-pointer rounded-md"
              />
              {isEditing && (
                <>
                  <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
                    <Image src={IconCamera} alt="" />
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
