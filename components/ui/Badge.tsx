export function Badge({ children, tone = "light", className = "" }: { children: React.ReactNode; tone?: "light" | "dark" | "mel"; className?: string }) {
  const tones = {
    light: "bg-areia text-cacau",
    dark: "bg-cacau/80 text-creme ring-1 ring-mel/40",
    mel: "bg-mel text-cacau",
  } as const;
  return (
    <span className={`micro inline-flex items-center gap-2 rounded-full px-4 py-2 !text-[0.68rem] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
