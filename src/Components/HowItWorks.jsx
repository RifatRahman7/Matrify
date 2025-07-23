const steps = [
  {
    title: "1. Create Your Profile",
    description:
      "Sign up and build your personal profile with essential details and preferences to help others understand you better.",
    icon: "https://cdn-icons-png.flaticon.com/512/747/747376.png"
  },
  {
    title: "2. Browse & Match",
    description:
      "Explore biodatas of other members based on your preferences. Shortlist profiles you’re interested in.",
    icon: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
  },
  {
    title: "3. Connect & Chat",
    description:
      "Reach out, send interest, and start chatting to get to know each other before taking the next step.",
    icon: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png"
  },
  {
    title: "4. Fix a Meeting",
    description:
      "Plan a meeting with mutual interest. Our support team can help facilitate a safe and respectful first meeting.",
    icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
  },
  {
    title: "5. Matrify the Bond",
    description:
      "When hearts align, take the leap towards marriage. We celebrate every successful connection made here!",
    icon: "https://cdn-icons-png.flaticon.com/512/3048/3048392.png"
  },
  {
    title: "6. Celebrate Your Union",
    description:
      "Let us be part of your joyous journey. Share your success story and inspire others to find their soulmates.",
    icon: "https://cdn-icons-png.flaticon.com/512/4825/4825065.png"
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 px-4 md:px-8 roboto">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
          How Matrify Works
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          A step-by-step guide to finding your perfect match on our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden 
              bg-white/40 backdrop-blur-md border border-white/30 shadow-xl 
              hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Gradient highlight on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-100/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

            <div className="relative z-10 p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 mb-5 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                <img
                  src={step.icon}
                  alt={`Step ${index + 1} Icon`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-base">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;