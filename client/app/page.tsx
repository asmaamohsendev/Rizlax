import Hero from "@/components/landing/Hero";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Categories from "@/components/landing/Categories";
import HowItWorks from "@/components/landing/Howitworks";
import WhyChoose from "@/components/landing/Whychoose";
import Workconnect from "@/components/landing/Workconnect";
import Testimonials from "@/components/landing/Testimonils";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <WhyChoose />
      <Workconnect />
      <Testimonials />
      <Footer />
    </>
  );
};

export default page;
