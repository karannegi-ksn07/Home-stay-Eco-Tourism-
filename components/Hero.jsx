import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
            Sustainable Rural Tourism
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            Discover Authentic Homestays in Nature
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl dark:text-gray-300">
            Connect with rural hosts, experience eco-friendly travel, and support local communities
            through meaningful homestay stays across India.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              Explore Homestays
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-800/20" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-800/20" />
    </section>
  );
}
