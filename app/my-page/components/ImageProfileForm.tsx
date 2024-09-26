import Image, { StaticImageData } from "next/image";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import AvatarDefault from "../../assets/images/avatar_default.png";
import IconBriefCase from "../../assets/icons/iconBriefcase.svg";
import IconEmail from "../../assets/icons/iconGmail.svg";
import React, { useEffect, useState } from "react";
import StyledOverlay from "@/components/common/StyledOverlay";
import { useUserStore } from "@/stores/staffStore";

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

  const getMyPage = async () => {
    try {
      setLoading(true);
      const res: any = await showMyPage.execute();
      setUser(res.data);
    } catch (error: any) {
      console.error("Error getting user information:", error);
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

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4 p-4">
          {/* Hình ảnh hồ sơ */}
          <div className="w-[100px] h-[100px]" onClick={handleImageClick}>
            <Image
              src={user.image ? user.image : AvatarDefault}
              alt=""
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>

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
            {/* <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800 transition duration-200 focus:outline-none rounded-full bg-gray-200 p-1"
              aria-label="Close" // Accessibility improvement
            >
              &times;
            </button> */}
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
