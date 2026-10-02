"use client";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`relative inline-block pr-3 overflow-visible ${
        disabled
          ? ""
          : "bg-clip-text text-transparent bg-[linear-gradient(110deg,#FFFFFF,35%,#79FC32,65%,#FFFFFF)] bg-[length:200%_100%] animate-shine"
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
