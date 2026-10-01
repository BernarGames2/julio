export function FloatingCard({ children, className = "", n }: { children: React.ReactNode; className?: string; n?: string }) {
  return (
    <div
      className={`flex max-w-[15rem] items-center gap-3 rounded-[20px] border border-mel/40 bg-creme/95 px-4 py-3 text-cacau shadow-[var(--shadow-soft)] ${className}`}
    >
      {n && (
        <span className="serif grid h-9 w-9 shrink-0 place-items-center rounded-full bg-areia text-sm text-cobre">{n}</span>
      )}
      <span className="text-sm font-medium leading-snug">{children}</span>
    </div>
  );
}
