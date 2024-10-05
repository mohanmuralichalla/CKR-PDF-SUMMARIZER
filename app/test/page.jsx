"use client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
const Page = () => {
  const { toast } = useToast();
  return (
    <div>
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
          console.log("Toast");
        }}
      >
        Show Toast
      </Button>
    </div>
  );
};

export default Page;
