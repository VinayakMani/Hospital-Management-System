import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
        <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          Welcome to Medi-Care, where healthcare meets innovation. Founded on excellence and compassion, we redefine healthcare management through technology and patient-centered care. Our vision is a future where healthcare is seamless, accessible, and personalized. With a dedicated team of professionals, including skilled physicians and technologists, we strive for excellence in clinical outcomes and patient experience. Choose [Hospital Name] for advanced medical treatments, personalized care, and innovative solutions.
          </p>
          <p>Our Vision</p>
          <h3>Our Vision</h3>
          <p>
          At Medi-Care, we envision a future where healthcare is seamless, accessible, and personalized. By leveraging advanced technology and a dedicated team of healthcare professionals, we aim to set new standards in patient care and operational efficiency.</p>
          <h3>Our Mission</h3>
          <p>
          Our mission is to provide superior healthcare services through continuous innovation and compassionate care. We are dedicated to improving the health and well-being of our community by integrating cutting-edge technology with the expertise of our medical staff.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
