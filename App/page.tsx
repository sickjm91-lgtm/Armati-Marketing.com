export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Armati<span className="text-blue-400">Marketing</span>
          </a>

          <nav className="flex gap-5 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#marketplace" className="hover:text-white">
              Marketplace
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Your Business. Your Brand. Your Future.
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
          Build and Launch Websites With the Power of AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Create professional websites, customize designs, and build your
          online presence with Armati Marketing.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#features"
            className="rounded-lg bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Explore the Platform
          </a>

          <a
            href="#marketplace"
            className="rounded-lg border border-slate-600 px-7 py-3 font-semibold transition hover:bg-slate-800"
          >
            Explore Templates
          </a>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-slate-800 bg-slate-900/50 px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold">
            Everything You Need to Build Online
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature
              title="AI Website Creation"
              description="Build the foundation of a professional website using AI-powered tools."
            />

            <Feature
              title="Website Templates"
              description="Explore designs that can serve as starting points for your next project."
            />

            <Feature
              title="Business Marketplace"
              description="Create a foundation for discovering website products and digital business tools."
            />
          </div>
        </div>
      </section>

      <section id="marketplace" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold">The Armati Marketplace</h2>

        <p className="mt-4 max-w-2xl text-slate-300">
          A future home for website templates, AI-powered website tools, and
          digital products. Marketplace purchasing must be connected to a
          working backend before real transactions can take place.
        </p>
      </section>

      <section
        id="pricing"
        className="border-t border-slate-800 px-6 py-16 text-center"
      >
        <h2 className="text-3xl font-bold">Ready to Build?</h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Armati Marketing is being developed into a platform for creating
          and managing online businesses.
        </p>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ArmatiMarketing.Com. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-7">
      <h3 className="text-xl font-bold text-blue-400">{title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{description}</p>
    </article>
  );
}
