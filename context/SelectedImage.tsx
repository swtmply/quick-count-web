import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SelectedImage = {
  selectedImage: any;
  setSelectedImage: Dispatch<SetStateAction<any>>;
};

const SelectedImageContext = createContext<SelectedImage>({} as SelectedImage);

export const SelectedImageProvider: FC = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<any>();

  return (
    <SelectedImageContext.Provider
      value={{
        selectedImage: selectedImage,
        setSelectedImage: setSelectedImage,
      }}
    >
      {children}
    </SelectedImageContext.Provider>
  );
};

export const useSelectedImage = () => {
  const { selectedImage, setSelectedImage } = useContext(SelectedImageContext);
  return { selectedImage, setSelectedImage };
};
