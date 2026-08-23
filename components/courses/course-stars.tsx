// components/courses/course-stars.tsx

import { Star } from "lucide-react";

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={"flex gap-0.5 " + className} dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            "size-4 " + (i < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")
          }
        />
      ))}
    </div>
  );
}