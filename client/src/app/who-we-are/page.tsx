import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { TextMarquee } from "@/components/layout/TextMarquee";
import Image from "next/image";

export default function Who() {
  return (
    <div className="bg-[#f5ebd7] min-h-screen flex flex-col">
      <Header />

      <main className="grow pt-24 md:pt-40 pb-20 px-6 md:px-12 lg:px-20">

        <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

          <div className="flex justify-center w-full order-1 md:order-2">
            <div className="relative w-full md:w-[85%] aspect-4/5 md:h-[85vh] md:aspect-auto overflow-hidden rounded-sm">
              <Image
                src="/who.webp"
                alt="Dune landscape"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center order-2 md:order-1">
            <div className="w-full max-w-xl ml-0 md:ml-20">
              
              <h1 className="text-4xl lg:text-[60px] font-bold tracking-tighter text-[#1a1a1a] leading-[1.1] md:leading-[0.9] mb-8 md:mb-20">
                The Sol Dunes
              </h1>

              <div className="space-y-6 md:space-y-12">
                <p className="text-base lg:text-[18px] leading-relaxed text-[#2d2d2d] font-medium">
                  Sol Dunes is held together by a quiet league of thinkers, dreamers,
                  and doers. Each grounded in their own field, yet drawn to a shared
                  way of working. Our team blends background in design, terrain-based
                  hospitality, and soulful storytelling, yet it isn't credentials that define
                  us. It's a way of noticing.
                </p>

                <p className="text-base lg:text-[18px] leading-relaxed text-[#2d2d2d] font-medium">
                  A way of listening to the land before shaping it. Whether orchestrating
                  guest experiences or refining the smallest visual details, the people
                  behind Sol Dunes approach each task with restraint, rigour, and
                  reverence. We believe that magic lies not in what is added, but in what
                  is sensed. And the team exists to ensure that every experience, no
                  matter how fleeting, feels entirely unrepeatable.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <div className="py-10 md:py-16">
        <TextMarquee />
      </div>

      <Footer />
    </div>
  );
}