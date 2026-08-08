import Image from "next/image";

/**
 * Reusable card component for displaying content blocks.
 *
 * @param {Object} props
 * @param {string} props.title - Card heading
 * @param {string} props.description - Card body text
 * @param {string} [props.image] - Optional image URL
 * @param {string} [props.imageAlt] - Alt text for the image
 */
const isOptimizedDomain = (src) => {
  if (!src) return false;
  if (src.startsWith("/") || src.startsWith(".")) return true;
  try {
    const url = new URL(src);
    return url.hostname === "images.unsplash.com";
  } catch (err) {
    return false;
  }
};

/**
 * Reusable card component for displaying content blocks.
 *
 * @param {Object} props
 * @param {string} props.title - Card heading
 * @param {string} props.description - Card body text
 * @param {string} [props.image] - Optional image URL
 * @param {string} [props.imageAlt] - Alt text for the image
 */
export default function Card({ title, description, image, imageAlt = "Card image", children }) {
  const useNextImage = isOptimizedDomain(image);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-150 bg-white shadow-sm hover:shadow-md hover:border-gray-300/80 dark:border-gray-850 dark:bg-gray-900/60 transition-all duration-300">
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {useNextImage ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
        {children && <div className="mt-4 pt-1 border-t border-gray-100/80 dark:border-gray-800/80">{children}</div>}
      </div>
    </article>
  );
}