"use client";

export function CardSkeleton() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] mb-4" />
      <div className="h-4 w-24 bg-[rgba(255,255,255,0.04)] rounded mb-2" />
      <div className="h-8 w-16 bg-[rgba(255,255,255,0.04)] rounded" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 animate-pulse">
      <div className="h-4 w-48 bg-[rgba(255,255,255,0.04)] rounded mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-[rgba(255,255,255,0.03)]">
          <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)]" />
          <div className="flex-1">
            <div className="h-3 w-32 bg-[rgba(255,255,255,0.04)] rounded mb-1" />
            <div className="h-3 w-24 bg-[rgba(255,255,255,0.03)] rounded" />
          </div>
          <div className="h-3 w-16 bg-[rgba(255,255,255,0.04)] rounded" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 animate-pulse">
      <div className="h-4 w-32 bg-[rgba(255,255,255,0.04)] rounded mb-6" />
      <div className="h-[240px] bg-[rgba(255,255,255,0.02)] rounded-xl" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-[rgba(255,255,255,0.04)] rounded mb-2" />
          <div className="h-4 w-72 bg-[rgba(255,255,255,0.03)] rounded" />
        </div>
        <div className="h-10 w-36 bg-[rgba(255,255,255,0.04)] rounded-xl" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2"><ChartSkeleton /></div>
        <CardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
