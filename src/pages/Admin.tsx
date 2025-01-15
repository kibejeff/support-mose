import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [newAmount, setNewAmount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdateAmount = async () => {
    try {
      setIsUpdating(true);
      
      if (!newAmount || isNaN(Number(newAmount))) {
        throw new Error("Please enter a valid number");
      }

      // In a real application, this would make an API call to update the amount
      // Simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success message
      toast({
        title: "Amount Updated",
        description: `The raised amount has been updated to KSh ${Number(newAmount).toLocaleString()}`,
      });

      // Clear the input
      setNewAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while updating the amount",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
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
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setNewAmount(value);
              }}
              placeholder="Enter amount in KSh"
              disabled={isUpdating}
            />
          </div>
          
          <Button 
            onClick={handleUpdateAmount}
            className="w-full"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Amount"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Admin;