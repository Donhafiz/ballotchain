"use client";

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-white/[0.04] mb-4" />
      <div className="h-4 w-24 bg-white/[0.04] rounded mb-2" />
      <div className="h-8 w-16 bg-white/[0.04] rounded" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 animate-pulse">
      <div className="h-4 w-48 bg-white/[0.04] rounded mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-white/[0.02]">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04]" />
          <div className="flex-1"><div className="h-3 w-32 bg-white/[0.04] rounded mb-1" /><div className="h-3 w-24 bg-white/[0.03] rounded" /></div>
          <div className="h-3 w-16 bg-white/[0.04] rounded" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 animate-pulse">
      <div className="h-4 w-32 bg-white/[0.04] rounded mb-6" />
      <div className="h-[240px] bg-white/[0.02] rounded-xl" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04]" />
        <div><div className="h-6 w-48 bg-white/[0.04] rounded mb-2" /><div className="h-4 w-72 bg-white/[0.03] rounded" /></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2"><ChartSkeleton /></div>
        <CardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
