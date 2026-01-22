import Experiences from "@/components/home/Experiences";
import Hero from "@/components/home/hero";
import Horizon from "@/components/home/horizon";
import Services from "@/components/home/Services";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#f5ebd7] min-h-screen">

      <Header />
      <Hero />
      <Experiences />
      <Services />
      <Horizon />
      <Footer />
    </div>
  );
}