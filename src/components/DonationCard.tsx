import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DonationProgress } from "./DonationProgress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const PRESET_AMOUNTS = [200, 500, 1000, 5000, 10000, 20000];

export const DonationCard = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value !== "custom") {
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    setAmount("custom");
  };

  const finalAmount = amount === "custom" ? customAmount : amount;

  const handleDonate = () => {
    // For now, we'll keep the phone number as a fallback
    if (!finalAmount || Number(finalAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
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

      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="w-full py-6 text-lg font-semibold transition-all hover:scale-[1.02]"
          >
            Donate Now
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Choose Donation Amount</SheetTitle>
            <SheetDescription>
              Select a preset amount or enter your own
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <RadioGroup
              value={amount}
              onValueChange={handleAmountChange}
              className="grid grid-cols-2 gap-4"
            >
              {PRESET_AMOUNTS.map((preset) => (
                <div key={preset} className="flex items-center space-x-2">
                  <RadioGroupItem value={preset.toString()} id={`amount-${preset}`} />
                  <Label htmlFor={`amount-${preset}`}>KSH {preset.toLocaleString()}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="amount-custom" />
                <Label htmlFor="amount-custom">Custom</Label>
              </div>
            </RadioGroup>

            {amount === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Enter amount (KSH)</Label>
                <Input
                  id="custom-amount"
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>
            )}

            <Button 
              onClick={handleDonate}
              className="w-full py-6 text-lg font-semibold"
              disabled={!finalAmount || Number(finalAmount) <= 0}
            >
              Donate KSH {Number(finalAmount).toLocaleString() || '0'}
            </Button>

            <p className="text-sm text-center text-gray-500">
              Contact our treasurer: 07111111
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
};
