import React, { useState } from 'react';
import './Upload.css';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [annotatedImage, setAnnotatedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    setLoading(true);
    setPrediction('');
    setAnnotatedImage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setPrediction(result.prediction);

      // Decode the base64 image
      const annotatedImageData = result.annotated_image;
      const imageBuffer = new Uint8Array(
        annotatedImageData.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
      );
      const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setAnnotatedImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error occurred while making prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h1 className="upload-title">Image Upload for Cancer Detection</h1>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="upload-input"
          />
          {preview && (
            <img
              src={preview}
              alt="Selected file preview"
              className="upload-preview"
            />
          )}
          <button type="submit" className="upload-button">Submit</button>
        </form>
        {loading && (
          <div className="loading">Loading...</div>
        )}
        {!loading && prediction && (
          <div className="result-container">
            <h2>Prediction Result</h2>
            <p>{prediction}</p>
            <div className="images-container">
              {preview && (
                <div className="image-box">
                  <h3>Original Image</h3>
                  <img src={preview} alt="Original" className="result-image" />
                </div>
              )}
              {annotatedImage && (
                <div className="image-box">
                  <h3>Annotated Image</h3>
                  <img src={annotatedImage} alt="Annotated" className="result-image" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
