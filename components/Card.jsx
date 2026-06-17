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
export default function Card({ title, description, image, imageAlt = "Card image" }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
          {description}
        </p>
      </div>
    </article>
  );
}
