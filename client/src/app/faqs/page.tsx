import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function FAQS() {
  const faqData = [
    {
      question: "How long does a desert safari really take door-to-door?",
      answer: "Most websites list 6 hours, but in reality, with hotel pick-up and drop-off it can stretch closer to 7-8 hours. Guests planning evening dinner reservations or late flights should account for this extra buffer."
    },
    {
      question: "What happens if the weather changes suddenly?",
      answer: "Rain in the desert is rare but possible. On such days, dune bashing may be modified or replaced with camp-based activities for safety. Camps continue to operate, and entertainment/dining is not cancelled but the driving portion may be shorter."
    },
    {
      question: "Is alcohol available at the camps?",
      answer: "Yes, some camps serve alcohol at an additional cost. It is never included in the package price, and regulations mean service stops at a fixed time. Guests should carry cash or card for bar purchases, as not all vendors accept digital payments."
    },
    {
      question: "Do I need travel insurance for a desert safari?",
      answer: "While vehicles and camps are insured, travellers are still advised to have general travel insurance. This covers medical emergencies, especially for guests with pre-existing conditions, since camp clinics are basic and the nearest hospitals can be 30-40 minutes away."
    },
    {
      question: "Can dietary needs (vegan, gluten-free, halal) be accommodated",
      answer: "Yes, but only with advance notice. Standard buffets are halal by default and include vegetarian options, but strict vegan, gluten-free, or allergy-specific meals need to be flagged at the time of booking to be prepared separately."
    },
    {
      question: "How do refund or reschedule’s work if I miss my pick-up?",
      answer: "Pick-up times are strict due to convoy schedules. If a guest misses the transfer, the safari usually counts as a \"no-show\" with no refund. Rescheduling is possible only if arranged at least 24 hours prior. Always keep your phone handy and confirm pick-up details in advance."
    }
  ];

  return (
    <div className="bg-[#f5ebd7] min-h-screen">
      <Header />
      
      <main className="px-6 md:px-12 lg:px-20 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-[#2d2d2d] mb-20 tracking-tight">
          FAQs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {faqData.map((faq, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-[22px] font-bold leading-[1.2] text-[#2d2d2d] tracking-tight">
                {faq.question}
              </h3>
              <p className="text-[#3a3a3a] text-[16px] leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}