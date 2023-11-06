import { useRef, useState } from "react";
import '../App.css'
import img1 from '../assets/images/images (1).jpeg'
import img2 from '../assets/images/images (2).jpeg'
import img3 from '../assets/images/images (3).jpeg'
import img4 from '../assets/images/images (4).jpeg'
import img5 from '../assets/images/images (5).jpeg'
import img6 from '../assets/images/images (6).jpeg'
import img7 from '../assets/images/images (7).jpeg'
import img8 from '../assets/images/images (8).jpeg'
import img9 from '../assets/images/images (9).jpeg'
import img10 from '../assets/images/images (10).jpeg'
import img11 from '../assets/images/images (11).jpeg'
import ImageUpload from "./ImageUpload";

const imagesData = [
  {
    id: 1,
    src: img1,
    isFeature: true,
  },
  {
    id: 2,
    src: img2,
    isFeature: false,
  },
  {
    id: 3,
    src: img3,
    isFeature: false,
  },
  {
    id: 4,
    src: img4,
    isFeature: false,
  },
  {
    id: 5,
    src: img5,
    isFeature: false,
  },
  {
    id: 6,
    src: img6,
    isFeature: false,
  },
  {
    id: 7,
    src: img7,
    isFeature: false,
  },
  {
    id: 8,
    src: img8,
    isFeature: false,
  },
  {
    id: 9,
    src: img9,
    isFeature: false,
  },
  {
    id: 10,
    src: img10,
    isFeature: false,
  },
  {
    id: 11,
    src: img11,
    isFeature: false,
  },
];

function DragDrop() {
  const [list, setList] = useState(imagesData);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleSelectImage = (imageId) => {
    const updatedImages = list.map((image) => {
      if (image.id === imageId) {
        return { ...image, isSelected: !image.isSelected };
      }
      return image;
    });
    setList(updatedImages);

    const hasSelectedImages = updatedImages.some((image) => image.isSelected);
    setShowDeleteButton(hasSelectedImages);

    // Update the selected image count
    const count = updatedImages.filter((image) => image.isSelected).length;
    setSelectedImageCount(count);
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = list.filter((image) => !image.isSelected);
    setList(updatedImages);
    setShowDeleteButton(false);
    setSelectedImageCount(0); // Reset the selected image count
  };

  const [newPos, setNewPos] = useState(1);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const [selectedImage, setSelectedImage] = useState(imagesData[0].src);

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const onDragOver = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    setSelectedImage(dragItemContent.src);
  };

  return (
    <div>
      {showDeleteButton && (
        <div className="navbar flex justify-between items-center">
          <div className="counter text-xl font-semibold">{selectedImageCount} Files Selected</div>
          <button
            className="delete-button text-red-500 text-xl font-semibold mt-4 mb-4"
            onClick={handleDeleteSelectedImages}
          >
            Delete Files
          </button>
        </div>
      )}
      <hr className="hr1"/>
      <div className="lg:flex gap-4 mt-4">
        <div className="inline-block overflow-hidden">
          <img
            key={newPos}
            src={selectedImage}
            alt={`Image`}
            onDragOver={(event) => onDragOver(event)}
            className="gallery-img bg-opacity-60 lg:w-[800px] rounded-lg lg:h-[600px] transform transition-all duration-300 hover:scale-105 hover:brightness-75 hover:rounded-lg"
          />

        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4  gap-4">
          {list &&
            list.map((image, index) => (
              <div
                className={`relative overflow-hidden rounded-lg`}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                key={index}
                draggable
                onClick={() => handleSelectImage(image.id)}
              >
                <div>
                  <img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className="gallery-img lg:w-[24rem] rounded-lg lg:h-72 object-cover transform transition-all duration-300 hover:scale-105 hover:brightness-75"
                  />
                  
                  {image.isSelected && (
                    <div className="absolute top-3 left-3 px-1 rounded bg-black text-white">
                      ✓
                    </div>
                  )}
                  
                </div>
              </div>
              
            ))}
            <ImageUpload
                    ></ImageUpload>
        </div>
      </div>
    </div>
  );
}

export default DragDrop;