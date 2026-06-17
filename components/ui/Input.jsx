/**
 * Reusable input component with label and error state support.
 *
 * @param {Object} props
 * @param {string} [props.label] - Input label text
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.type="text"] - HTML input type
 * @param {string} [props.error] - Error message (shows error UI when provided)
 * @param {string} [props.className] - Additional CSS classes for the input
 * @param {string} [props.id] - Input id (auto-generated from label if omitted)
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props.rest - Native input props
 */
export default function Input({
  label,
  placeholder,
  type = "text",
  error,
  className = "",
  id,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-950 ${
          error
            ? "border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-950/30 dark:text-red-200"
            : "border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        } ${className}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
