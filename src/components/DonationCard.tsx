import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DonationProgress } from "./DonationProgress";

export const DonationCard = () => {
  const handleDonate = () => {
    // Implement payment integration here
    window.open("tel:07111111");
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-white/80 backdrop-blur-sm animate-fadeIn">
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
          Medical Support
        </span>
        <h2 className="text-2xl font-semibold text-gray-900">
          Support Moses's Recovery
        </h2>
        <DonationProgress current={1600000} goal={2600000} />
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={handleDonate}
          className="w-full py-6 text-lg font-semibold transition-all hover:scale-[1.02]"
        >
          Donate Now
        </Button>
        <p className="text-sm text-center text-gray-500">
          Contact our treasurer: 07111111
        </p>
      </div>
    </Card>
  );
};