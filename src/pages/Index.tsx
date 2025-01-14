import { DonationCard } from "@/components/DonationCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80"
          alt="Support Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Section */}
      <div className="container px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Message Section */}
            <div className="flex-1 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm animate-fadeIn">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Support Moses in His Recovery Journey
              </h1>
              <div className="prose prose-gray">
                <p className="text-gray-600 leading-relaxed">
                  On December 28, 2024, our brother Moses was involved in a tragic road accident at Gitaru. 
                  He underwent abdominal surgery at PCEA Kikuyu Hospital and was later transferred to Aga Khan Hospital, 
                  where he successfully had two leg surgeries. His medical expenses have reached Ksh 2.6 million, 
                  with Ksh 1.6 million already settled.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We kindly request your financial and moral support to help cover the remaining balance and ongoing costs. 
                  Contributions can be sent to our group treasurer, Mrs. Caroline Maina, at <strong>07111111</strong>.
                </p>
                <p className="text-gray-600 italic mt-4">
                  Your generosity will make a difference. God bless you for your kindness and support.
                </p>
              </div>
            </div>

            {/* Donation Card */}
            <div className="w-full md:w-auto md:sticky md:top-8">
              <DonationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;