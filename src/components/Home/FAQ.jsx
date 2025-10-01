import { useState } from "react";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaNewspaper,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I subscribe to PrimeNews?",
      answer:
        "Subscribing is easy! Click on the 'Subscribe' button, choose your plan, and enter your payment details. You’ll get instant access to all premium articles and newsletters.",
      icon: <FaNewspaper className="text-blue-500" />,
    },
    {
      question: "Can I access PrimeNews for free?",
      answer:
        "Yes! We offer free access to selected articles daily. For full access to all premium content and ad-free experience, you can subscribe to one of our paid plans.",
      icon: <FaDollarSign className="text-green-500" />,
    },
    {
      question: "How do I contribute as a citizen journalist?",
      answer:
        "You can register as a contributor, submit your news stories, and our editorial team will review them. Accepted articles will be published on PrimeNews with proper credit.",
      icon: <FaUsers className="text-purple-500" />,
    },
    {
      question: "How do I report an issue or provide feedback?",
      answer:
        "We value your feedback! Use the 'Contact Us' page to report any issues or suggestions. Our support team typically responds within 24–48 hours.",
      icon: <FaQuestionCircle className="text-yellow-500" />,
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-15 rounded-2xl max-w-9/12 mx-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 p-3 bg-green-200 rounded-full">
            <FaQuestionCircle className="text-3xl text-4" />
          </div>
          <h2 className="text-4xl mb-4 text-[38px] leading-12 lg:text-[40px] font-extrabold">
            Frequently Asked
            <span className="text-3"> Questions</span>
          </h2>
          <p className="text-gray-700 max-w-[600px] mx-auto">
            Everything you need to know about PrimeNews. Can't find an answer?
            Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <div
                onClick={() => toggleFAQ(index)}
                className={`cursor-pointer p-6 rounded-xl shadow-md transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white border border-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{faq.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`text-gray-500 transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <FaChevronDown />
                  </div>
                </div>

                {activeIndex === index && (
                  <div className="pt-4 pl-12">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
