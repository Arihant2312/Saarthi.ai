import React from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqsData = [
    {
      question: '🧠 How does the AI generate articles and blogs?',
      answer: 'Our AI uses advanced natural language models trained on diverse datasets to generate high-quality, SEO-optimized articles and blog content instantly based on your topic and tone preferences.',
    },
    {
      question: '📄 Can I create professional resumes using your AI?',
      answer: 'Absolutely! Our Resume Generator crafts modern, ATS-friendly resumes in seconds — you just fill in your skills and experience, and the AI formats and writes it for you.',
    },
    {
      question: '🎨 How does the AI image generator work?',
      answer: 'Simply describe what you want to see — our AI model interprets your text and creates stunning, unique visuals perfect for marketing, blogs, and creative projects.',
    },
    {
      question: '⚙️ What is the AI Workflow tool?',
      answer: 'The Workflow Builder helps you automate repetitive creative tasks, combining multiple AI tools like text, images, and summarization into one seamless pipeline.',
    },
    {
      question: '💾 Is my generated data private and secure?',
      answer: 'Yes, all your data and generated content are encrypted and stored securely. We never share or reuse your data without consent.',
    },
    {
      question: '💸 Is there a free plan available?',
      answer: 'Yes! You can start for free with limited credits. When you’re ready for more features and higher limits, you can upgrade anytime with flexible pricing.',
    },
    {
      question: '🌙 Does it support dark mode and customization?',
      answer: 'Yes — our interface fully supports dark mode, and you can customize the look and feel to match your creative vibe.',
    },
  ];

  return (
    <div className="flex flex-col items-center text-center font-semibold text-gray-200 px-4 py-2 bg-transparent relative">
      {/* Section Header */}
      <p className="text-base font-medium text-cyan-400">FAQ</p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(147,51,234,0.4)]">
        Frequently Asked Questions
      </h1>
      <p className="text-sm text-gray-400 mt-4 max-w-2xl text-center">
        Find quick answers about how our AI tools help you create, design, and automate — faster than ever.
      </p>

      {/* FAQ Cards */}
      <div className="max-w-2xl w-full mt-10 flex flex-col gap-4 items-start text-left">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col items-start w-full bg-gradient-to-r from-[#1e1e1e] to-[#151515] rounded-xl border border-gray-700 hover:border-fuchsia-500/40 transition-all duration-300 shadow-[0_0_12px_rgba(147,51,234,0.1)]"
          >
            {/* Question Header */}
            <div
              className="flex items-center justify-between w-full cursor-pointer px-5 py-4"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h2 className="text-lg font-medium text-gray-100 hover:text-fuchsia-400 transition-colors duration-300">
                {faq.question}
              </h2>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-500 ease-in-out ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="#f9fafb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Answer Section */}
            <p
              className={`text-sm text-gray-400 px-5 pb-4 transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? 'opacity-100 max-h-[300px] translate-y-0'
                  : 'opacity-0 max-h-0 -translate-y-2'
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
