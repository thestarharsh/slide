"use client";

import { Webhook, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";

const PaymentButton = () => {
  const { isProcessing, onSubscribe } = useSubscription();

  return (
    <Button
      className="bg-gradient-to-br
        text-white 
        rounded-full 
        from-[#6d60a3] 
        via-[#9434E6] 
        font-bold 
        to-[#CC3BD4]"
      disabled={isProcessing}
      onClick={onSubscribe}
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <Webhook /> }
      Upgrade
    </Button>
  );
};

export default PaymentButton;
