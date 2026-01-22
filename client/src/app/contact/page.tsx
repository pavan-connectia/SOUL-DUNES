import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";

export default function CONTACT() {
  return (
    <div className="bg-[#f5ebd7] min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <Image
            src="/contact.jpg"
            alt="Contact Image"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter font-headline">
              Contact us.
            </h1>
          </div>
        </div>

        {/* --- START OF NEW PART --- */}
        <section className="w-full py-20 px-6 flex flex-col items-center bg-[#A5C89E]">
          <div className="max-w-4xl w-full text-center space-y-8 mb-16">
            {/* Address */}
            <p className="text-gray-800 text-lg md:text-xl font-medium">
              307, 3rd Floor, Opal Tower, Business Bay, Dubai - UAE
            </p>

            {/* Hours */}
            <div className="space-y-1">
              <h3 className="text-gray-900 font-bold text-xl uppercase tracking-widest">Hours</h3>
              <p className="text-gray-700 font-medium">Monday to Sunday</p>
              <p className="text-gray-700 font-medium">10 am to 10 pm</p>
            </div>

            {/* Phone and Email */}
            <div className="space-y-2">
              <p className="text-gray-900 font-bold text-lg">
                <a href="tel:+971543997992" className="hover:text-[#c21b23] transition-colors">
                  +971 54 399 7992
                </a>
              </p>
              <p className="text-gray-900 font-bold text-lg">
                <a href="mailto:info@thesoldunes.com" className="hover:text-[#c21b23] transition-colors">
                  info@thesoldunes.com
                </a>
              </p>
            </div>
          </div>

          <div className="w-full max-w-225 h-80 md:h-90 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786520110377!2d55.271348!3d25.186641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f68347895f32b%3A0x608e0689b2767098!2sOpal%20Tower!5e0!3m2!1sen!2sae!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125"
            ></iframe>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}