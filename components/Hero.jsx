import Image from "next/image";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-br from-primary-50/70 via-white to-emerald-50/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-b border-gray-150/50 dark:border-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300 shadow-sm">
              <span className="text-emerald-600 dark:text-emerald-400">🌿</span> Authentic & Sustainable
            </span>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white leading-tight">
              Experience the Soul of <span className="bg-gradient-to-r from-primary-700 to-emerald-600 bg-clip-text text-transparent dark:from-primary-450 dark:to-emerald-450">Uttarakhand</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-xl">
              Stay with local families in handpicked, sustainable homestays across Devbhoomi. Connect with rural hosts, experience authentic cuisine, and support local mountain communities.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="shadow-sm shadow-primary-500/10 hover:shadow-md hover:shadow-primary-500/20 active:scale-[0.98] transition-all"
                onClick={() => {
                  const el = document.getElementById("featured-homestays");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Homestays
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="active:scale-[0.98] transition-all"
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200/50 shadow-md dark:border-gray-800 dark:shadow-none sm:aspect-[16/10] lg:aspect-square">
            <Image
              src="/images/hero_uttarakhand.png"
              alt="Cozy Uttarakhand cottage in the lush green hills"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}