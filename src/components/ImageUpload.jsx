import { IoImage } from "react-icons/io5";

const ImageUpload = ({ images, setImages, setChecked }) => {

	const handleImageUpload = (event) => {
		const newImages = [...images];
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.onloadend = () => {
				newImages.push(reader.result);
				setImages(newImages);
				setChecked((prev) => [...prev, false]);
			};
			if (file) {
				reader.readAsDataURL(file);
			}
		}
	};
    return (
        <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear">

            <input
              type="file"
              multiple 
              accept=".png, .webp, .jpg" 
              name="images"
              id="images"
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
              title="Try to upload photos" 
              onChange={handleImageUpload} 
            />

             <div className="h-full w-full flex flex-col justify-center items-center xs:gap-y-4 gap-y-2 xxs:py-5 py-3">

                <IoImage className="text-xl"/> 
                <span className="whitespace-nowrap xxs:text-base text-sm">Add Images</span>

            </div>
        </div>
    );
};

export default ImageUpload;