import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
      <Footer />
    </>
  );
};

export default AboutUs;
