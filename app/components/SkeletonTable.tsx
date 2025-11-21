import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = () => {
    return (
        <div className="flex flex-col  items-center space-y-2">
            {Array.from({ length: 30 }).map((_, idx) => (
                <Skeleton
                    key={idx}
                    className="h-10 w-[900px] bg-gray-200"
                />
            ))}
        </div>
    );
};
