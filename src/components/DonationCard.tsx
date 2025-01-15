import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DonationProgress } from "./DonationProgress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";
import { initiateMpesaPayment } from "@/utils/mpesa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PRESET_AMOUNTS = [200, 500, 1000, 5000, 10000, 20000];

export const DonationCard = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { toast } = useToast();

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

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(value);
  };

  const finalAmount = amount === "custom" ? customAmount : amount;
  const finalAmountUSD = Number(finalAmount) / 150; // Approximate KES to USD conversion

  const handleMpesaPayment = async () => {
    if (!finalAmount || Number(finalAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-PESA phone number (10 digits)",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await initiateMpesaPayment(phoneNumber, Number(finalAmount));
      toast({
        title: "Payment Initiated",
        description: "Please check your phone for the STK push",
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Failed to initiate M-PESA payment. Please try again.",
        variant: "destructive",
      });
    }
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
            Support Now
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
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

            {finalAmount && Number(finalAmount) > 0 && (
              <Tabs defaultValue="mpesa" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mpesa">M-PESA</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="mpesa" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">M-PESA Phone Number</Label>
                    <Input
                      id="phone-number"
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="e.g., 0712345678"
                      maxLength={10}
                      className="text-lg"
                    />
                  </div>
                  <Button 
                    onClick={handleMpesaPayment}
                    className="w-full py-6 text-lg font-semibold"
                  >
                    Pay with M-PESA
                  </Button>
                </TabsContent>
                <TabsContent value="paypal">
                  <PayPalScriptProvider options={{ 
                    clientId: "BAA9NI-M9-_R2nbXJr42mmOeUYdSbmQ7zbzluHlrfgnUHQE5dV_r1Ks0TC85ZeMiei_giiboY3wVcEoo3o",
                    currency: "USD",
                    intent: "capture"
                  }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                value: finalAmountUSD.toFixed(2),
                                currency_code: "USD"
                              },
                              description: "Donation for Moses's Recovery"
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          toast({
                            title: "Thank you for your donation!",
                            description: `Transaction completed by ${details.payer.name?.given_name}`,
                          });
                        });
                      }}
                      onError={() => {
                        toast({
                          title: "Payment Error",
                          description: "There was an error processing your payment. Please try again.",
                          variant: "destructive",
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </TabsContent>
              </Tabs>
            )}

            <div className="text-sm text-center text-gray-500 space-y-2">
              <p>Amount in USD: ${finalAmountUSD.toFixed(2)}</p>
              <p>Alternative payment: Contact our treasurer at 0711405117</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
};
