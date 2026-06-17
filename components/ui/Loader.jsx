/**
 * Loading spinner component.
 *
 * @param {Object} props
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Spinner size
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.label="Loading..."] - Accessible label
 */
export function Loader({ size = "md", className = "", label = "Loading..." }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-[3px]",
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label={label}>
      <div
        className={`animate-spin rounded-full border-primary-200 border-t-primary-600 dark:border-gray-700 dark:border-t-primary-400 ${sizes[size]}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * Skeleton placeholder for loading states.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {"text" | "circle" | "rect"} [props.variant="rect"] - Skeleton shape
 */
export function Skeleton({ className = "", variant = "rect" }) {
  const variants = {
    text: "h-4 rounded",
    circle: "rounded-full",
    rect: "rounded-lg",
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${variants[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export default Loader;
