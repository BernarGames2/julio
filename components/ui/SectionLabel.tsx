export function SectionLabel({
  n,
  children,
  className = "",
  tone = "dark",
}: {
  n?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      data-reveal="fade"
      className={`micro flex items-center gap-3 ${tone === "light" ? "text-mel" : "text-muted"} ${className}`}
    >
      {n && <span className={tone === "light" ? "text-creme" : "text-cobre"}>{n}</span>}
      <span aria-hidden className={`h-px w-10 ${tone === "light" ? "bg-mel/60" : "bg-cacau/30"}`} />
      <span>{children}</span>
    </p>
  );
}
