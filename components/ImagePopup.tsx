import { Dialog } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { useSelectedImage } from "../context/SelectedImage";

interface ImagePopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ isOpen, setIsOpen }) => {
  const { selectedImage } = useSelectedImage();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm min-h-screen rounded relative">
          <Image
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="Incident image"
            layout="fill"
            objectFit="contain"
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ImagePopup;
