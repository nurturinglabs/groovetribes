import React from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Callouts from "../components/Callouts"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutUs />
      <Callouts />
      <Footer />
    </main>
  );
}
