import { SubscriptionButton } from "@/components/subscription-button";
import Heading from "@/components/ui/heading";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage Account Setting"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a Pro Plan."
            : "You are currently on free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingPage;
