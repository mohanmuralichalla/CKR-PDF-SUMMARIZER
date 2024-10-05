import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="px-2 py-2 w-full h-full">
      <div className="p-4 w-full h-full justify-between">
        <div className="w-full h-full flex flex-col gap-4 px-2">
          <Skeleton className="text-4xl font-bold h-10 w-1/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="transform -translate-y-14 w-full h-14 bg-black/5 rounded-md flex"></div>
      </div>
    </div>
  );
};

export default Loading;
