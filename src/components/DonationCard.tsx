import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DonationProgress } from "@/components/DonationProgress";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export function DonationCard() {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  // Hardcoded values for demonstration - in production these should come from your backend
  const currentAmount = 1000000; // 1M KSh raised
  const goalAmount = 2600000;    // 2.6M KSh goal

  const handleMpesaPayment = async () => {
    try {
      // Mpesa payment logic here
      toast({
        title: "Processing Payment",
        description: "Please check your phone for the M-PESA prompt",
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "There was an error processing your M-PESA payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full md:w-[300px] p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Support Moses</h2>
        <DonationProgress current={currentAmount} goal={goalAmount} />
        
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount (KSh)
          </label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setAmount(value);
            }}
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Button onClick={handleMpesaPayment} className="w-full bg-green-600 hover:bg-green-700">
            Pay with M-PESA
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full">
                Support Now
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Choose Donation Amount</SheetTitle>
                <SheetDescription>
                  Select or enter the amount you wish to donate
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6">
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    try {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            amount: {
                              value: (Number(amount) / 150).toFixed(2), // Convert KSH to USD
                              currency_code: "USD"
                            },
                          },
                        ],
                      });
                    } catch (error) {
                      toast({
                        title: "Error",
                        description: "There was an error creating your PayPal order. Please try again.",
                        variant: "destructive",
                      });
                      throw error;
                    }
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      if (actions.order) {
                        await actions.order.capture();
                        toast({
                          title: "Payment Successful",
                          description: "Thank you for your donation!",
                        });
                      }
                    } catch (error) {
                      toast({
                        title: "Payment Error",
                        description: "There was an error processing your payment. Please try again.",
                        variant: "destructive",
                      });
                      throw error;
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    toast({
                      title: "Payment Error",
                      description: "There was an error with PayPal. Please try again.",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Card>
  );
}