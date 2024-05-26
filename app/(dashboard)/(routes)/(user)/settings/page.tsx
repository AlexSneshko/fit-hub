import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "./_components/subscription-button";

const SettingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="px-4 space-y-2">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="flex flex-col items-center gap-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "Your currently using trainer account."
            : "Your are currently using user account."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingPage;
