import React, { useState } from 'react';
import { DB_URL } from '../Constants/Constants';

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch(`${DB_URL}image.php`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        // Handle success, e.g., show a success message
      } else {
        console.error('Failed to upload image');
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;