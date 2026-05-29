interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
}

const baseClasses =
  "animate-[shimmer_1.8s_ease-in-out_infinite] bg-[length:200%_100%]";

const variantClasses = {
  text: "h-4 w-full rounded-[6px]",
  card: "h-32 w-full rounded-[16px]",
  circle: "rounded-full",
  rect: "rounded-[10px]",
};

function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const gradient =
    "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)";

  const style: React.CSSProperties = {
    background: gradient,
    backgroundSize: "200% 100%",
    width: width ?? (variant === "circle" ? "40px" : "100%"),
    height: height ?? undefined,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export { Skeleton };
