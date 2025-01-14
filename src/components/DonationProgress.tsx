import { Progress } from "@/components/ui/progress";

interface DonationProgressProps {
  current: number;
  goal: number;
}

export const DonationProgress = ({ current, goal }: DonationProgressProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Raised: KSh {current.toLocaleString()}</span>
        <span>Goal: KSh {goal.toLocaleString()}</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-center text-sm text-gray-500">
        {percentage.toFixed(1)}% of goal reached
      </p>
    </div>
  );
};