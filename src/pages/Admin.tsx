import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [newAmount, setNewAmount] = useState("");
  const { toast } = useToast();

  const handleUpdateAmount = () => {
    // In a real application, this would make an API call to update the amount
    // For now, we'll just show a success message
    if (!newAmount || isNaN(Number(newAmount))) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Amount Updated",
      description: `The raised amount has been updated to KSh ${Number(newAmount).toLocaleString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white p-8">
      <Card className="max-w-md mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Update the raised amount</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              New Raised Amount (KSh)
            </label>
            <Input
              id="amount"
              type="text"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Enter amount in KSh"
            />
          </div>
          
          <Button 
            onClick={handleUpdateAmount}
            className="w-full"
          >
            Update Amount
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Admin;