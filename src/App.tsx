import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { TLLogo } from "./components/Logo";
import {
  faqs,
  maintenancePlans,
  pricingFactors,
  pricingNote,
  pricingTiers,
  projects,
  services,
  testimonials,
  type ProjectCategory,
} from "./utils/data";
import { PAGE_META, SITE_CONFIG } from "./utils/config";

type MainRoute = "home" | "services" | "portfolio" | "about" | "contact";
type Route = MainRoute | "privacy" | "terms" | "not-found";

const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

const navigation: { label: string; route: MainRoute; path: string; scrollTo?: string }[] = [
  { label: "Home", route: "home", path: "/" },
  { label: "Services", route: "services", path: "/services" },
  { label: "Pricing", route: "services", path: "/services", scrollTo: "pricing" },
  { label: "Portfolio", route: "portfolio", path: "/portfolio" },
  { label: "About", route: "about", path: "/about" },
  { label: "Contact", route: "contact", path: "/contact" },
];

const pathToRoute: Record<string, Route> = {
  "/": "home",
  "/services": "services",
  "/portfolio": "portfolio",
  "/about": "about",
  "/contact": "contact",
  "/privacy": "privacy",
  "/terms": "terms",
};

const routeToPath: Record<Route, string> = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  "not-found": "/404",
};

function getInitialRoute(): Route {
  return pathToRoute[window.location.pathname.replace(/\/$/, "") || "/"] ?? "not-found";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getInitialRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState("");
  const [cookieChoice, setCookieChoice] = useState(() => localStorage.getItem("tl_cookie_choice") ?? "");

  const navigate = (nextRoute: Route, scrollTarget?: string) => {
    const nextPath = routeToPath[nextRoute];
    const sameRoute = nextRoute === route;
    window.history.pushState({}, "", nextPath);
    setRoute(nextRoute);
    setMenuOpen(false);

    if (scrollTarget) {
      const scrollToTarget = () => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };
      // Wait for the target route to render when switching pages.
      window.setTimeout(scrollToTarget, sameRoute ? 0 : 120);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 4200);
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const onPopState = () => setRoute(getInitialRoute());
    const onScroll = () => setShowScrollTop(window.scrollY > 700);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const meta = route in PAGE_META ? PAGE_META[route as MainRoute] : PAGE_META.home;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${SITE_CONFIG.domain}${routeToPath[route]}`);

    if (cookieChoice === "accepted") {
      trackPageView(routeToPath[route], meta.title);
    }

    const frame = requestAnimationFrame(() => {
      const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealElements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    });
    return () => cancelAnimationFrame(frame);
  }, [route, cookieChoice]);

  useEffect(() => {
    if (cookieChoice !== "accepted") return;
    initialiseAnalytics();
  }, [cookieChoice]);

  const setCookies = (choice: "accepted" | "necessary") => {
    localStorage.setItem("tl_cookie_choice", choice);
    setCookieChoice(choice);
    notify(choice === "accepted" ? "Cookie preferences saved." : "Only necessary storage will be used.");
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 selection:bg-sky-400 selection:text-slate-950">
      <Header route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} />

      <main key={route} className="page-enter">
        {route === "home" && <HomePage navigate={navigate} />}
        {route === "services" && <ServicesPage navigate={navigate} />}
        {route === "portfolio" && <PortfolioPage navigate={navigate} />}
        {route === "about" && <AboutPage navigate={navigate} />}
        {route === "contact" && <ContactPage notify={notify} />}
        {route === "privacy" && <LegalPage type="privacy" navigate={navigate} />}
        {route === "terms" && <LegalPage type="terms" navigate={navigate} />}
        {route === "not-found" && <NotFoundPage navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-sky-400/30 bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/40">
          <Check className="h-4 w-4 text-sky-400" />
          {toast}
        </div>
      )}

      {showScrollTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-slate-700 bg-slate-900 text-white shadow-xl transition hover:border-sky-400 hover:text-sky-400"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <FloatingWhatsApp />

      {!cookieChoice && <CookieBanner onChoice={setCookies} navigate={navigate} />}
    </div>
  );
}

function Header({
  route,
  menuOpen,
  setMenuOpen,
  navigate,
}: {
  route: Route;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navigate: (route: Route, scrollTarget?: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070B14]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button type="button" onClick={() => navigate("home")} aria-label="TL Web Solutions home">
          <TLLogo iconSize={38} />
        </button>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = route === item.route && !item.scrollTo;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.route, item.scrollTo)}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}
              >
                {item.label}
                {isActive && <span className="absolute inset-x-4 -bottom-[17px] h-0.5 rounded-full bg-sky-400" />}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <PrimaryButton onClick={() => navigate("contact")}>Get a quote</PrimaryButton>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-800 text-white md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-white/8 bg-[#070B14] px-5 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => {
              const isActive = route === item.route && !item.scrollTo;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.route, item.scrollTo)}
                  className={`border-b border-white/6 py-3 text-left text-base font-semibold ${isActive ? "text-sky-400" : "text-slate-300"}`}
                >
                  {item.label}
                </button>
              );
            })}
            <PrimaryButton className="mt-5 w-full" onClick={() => navigate("contact")}>
              Get a quote
            </PrimaryButton>
          </div>
        </nav>
      )}
    </header>
  );
}

function HomePage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6803520/pexels-photo-6803520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800"
          alt="Creative professionals planning a digital project in a modern office"
          className="hero-image absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070B14_0%,rgba(7,11,20,.92)_40%,rgba(7,11,20,.48)_75%,rgba(7,11,20,.62)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,#070B14_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl items-center px-5 py-20 sm:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-sky-400 sm:text-base">TL Web Solutions</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl">
              Websites designed to move your business forward.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Premium web design and digital solutions for South African small businesses, startups, local services, and growing companies.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={() => navigate("contact")}>
                Start a project <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton onClick={() => navigate("portfolio")}>View our work</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div data-reveal className="reveal grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionIntro eyebrow="Built with purpose" title="Clear design. Strong performance. No unnecessary complexity." />
          <div className="grid gap-8 sm:grid-cols-3">
            <Value title="Professional" text="A considered visual system that reflects the quality and credibility of your business." />
            <Value title="Responsive" text="A consistent experience across mobile phones, tablets, laptops, and desktops." />
            <Value title="Focused" text="Clear page structure and calls-to-action that help visitors understand what to do next." />
          </div>
        </div>
      </Section>

      <Section className="border-y border-white/7 bg-[#0A101C]">
        <div data-reveal className="reveal">
          <SectionIntro eyebrow="Services" title="The essentials your website needs to work well." text="From a new business website to a thoughtful redesign, every service is shaped around a clear objective." />
          <div className="mt-12 divide-y divide-white/8 border-y border-white/8">
            {services.slice(0, 4).map((service, index) => (
              <ServiceRow key={service.title} service={service} index={index} />
            ))}
          </div>
          <button type="button" onClick={() => navigate("services")} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300">
            Explore all services <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Section>

      <Section>
        <div data-reveal className="reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionIntro eyebrow="Example projects" title="Concept designs for the businesses we love to build for." text="A selection of original concept designs that show our style and quality. These are examples, not real client projects." />
          <button type="button" onClick={() => navigate("portfolio")} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-sky-400">
            View all examples <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </Section>

      <ScopeNote navigate={navigate} />

      <Section>
        <div data-reveal className="reveal mx-auto max-w-4xl">
          <SectionIntro eyebrow="Questions" title="Straightforward answers before you get started." centered />
          <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
            {faqs.map((faq) => <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />)}
          </div>
        </div>
      </Section>

      <FinalCta navigate={navigate} />
    </>
  );
}

function ServicesPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <>
      <PageHero eyebrow="Services" title="Digital solutions built around clear business needs." text="Focused design, development, and ongoing website support for businesses that value quality, clarity, and reliability." />
      <Section className="pt-8 sm:pt-12">
        <div className="divide-y divide-white/8 border-y border-white/8">
          {services.map((service, index) => <ServiceRow key={service.title} service={service} index={index} large />)}
        </div>
      </Section>
      <PricingGuide navigate={navigate} />
      <FinalCta navigate={navigate} title="Tell us what your website needs to achieve." />
    </>
  );
}

function PortfolioPage({ navigate }: { navigate: (route: Route) => void }) {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [comparison, setComparison] = useState<"before" | "after">("after");
  const categories: ProjectCategory[] = [
    "All",
    "Local Business",
    "Restaurant",
    "Car Wash",
    "Service Business",
    "Landing Page",
  ];
  const visibleProjects = useMemo(
    () => category === "All" ? projects : projects.filter((project) => project.category === category),
    [category],
  );

  return (
    <>
      <PageHero
        eyebrow="Example projects"
        title="Concept designs that show the quality we build."
        text="The projects below are original concept designs created to demonstrate our style and capabilities. They are examples only — not real clients or completed client work."
      />
      <Section className="pt-8 sm:pt-12">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-sky-300">
          <Sparkles className="h-3.5 w-3.5" />
          Concept designs · Example work
        </div>
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter example projects">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${category === item ? "border-sky-400 bg-sky-400 text-slate-950" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </Section>

      <Section className="border-y border-white/7 bg-[#0A101C]">
        <div data-reveal className="reveal grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro eyebrow="Website redesign" title="From an unclear website to a focused customer journey." text="A redesign should improve hierarchy, readability, mobile usability, and the path from first impression to enquiry." />
            <div className="mt-7 inline-flex rounded-xl border border-slate-700 bg-slate-950 p-1">
              <button type="button" onClick={() => setComparison("before")} className={`rounded-lg px-4 py-2 text-sm font-bold ${comparison === "before" ? "bg-slate-700 text-white" : "text-slate-400"}`}>Before</button>
              <button type="button" onClick={() => setComparison("after")} className={`rounded-lg px-4 py-2 text-sm font-bold ${comparison === "after" ? "bg-sky-400 text-slate-950" : "text-slate-400"}`}>After</button>
            </div>
          </div>
          <BrowserComparison mode={comparison} />
        </div>
      </Section>

      <TestimonialsSection />

      <FinalCta navigate={navigate} title="Ready to improve your current website?" />
    </>
  );
}

function TestimonialsSection() {
  return (
    <Section>
      <div data-reveal className="reveal">
        <SectionIntro
          eyebrow="Demo reviews"
          title="The kind of feedback great work earns."
          text="These are sample testimonials created to illustrate tone and quality. They are demo reviews for presentation purposes and do not represent real customers."
          centered
        />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <figure
            key={index}
            data-reveal
            className="reveal flex flex-col justify-between rounded-2xl border border-white/8 bg-[#0A101C] p-7"
          >
            <div>
              <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-4 w-4 ${starIndex < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                  />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-7 text-slate-300">“{testimonial.quote}”</blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-sm font-black text-white">
                {testimonial.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-black text-white">{testimonial.name}</span>
                <span className="block text-xs text-slate-500">{testimonial.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function AboutPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <>
      <PageHero eyebrow="About" title="A South African web partner focused on useful, high-quality work." text="TL Web Solutions helps small businesses, entrepreneurs, local services, and growing companies build a clearer and more professional online presence." />
      <Section className="pt-8 sm:pt-12">
        <div data-reveal className="reveal grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ImageWithSkeleton
            src="https://images.pexels.com/photos/5324987/pexels-photo-5324987.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
            alt="Creative professionals collaborating around a laptop"
            className="aspect-[4/3] rounded-2xl"
          />
          <div>
            <SectionIntro eyebrow="Our approach" title="Understand the business first. Design the website second." />
            <div className="mt-7 space-y-5 text-base leading-7 text-slate-400">
              <p>We begin with the business, its audience, and the action the website needs to support. That context guides the structure, content hierarchy, and visual direction.</p>
              <p>The goal is not to add more. It is to make the right information easier to find, the experience easier to use, and the business easier to trust.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-y border-white/7 bg-[#0A101C]">
        <div className="grid gap-12 md:grid-cols-2">
          <div data-reveal className="reveal">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-400">Mission</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">Make professional web design more useful and accessible to growing businesses.</h2>
          </div>
          <div data-reveal className="reveal">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-400">Vision</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">Build lasting digital foundations that help good businesses present themselves with confidence.</h2>
          </div>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Core values" title="The principles behind every project." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Value title="Clarity" text="Clear recommendations, clear structure, and clear communication throughout the project." />
          <Value title="Quality" text="Careful design decisions, consistent details, and reliable implementation." />
          <Value title="Responsibility" text="Honest scope, realistic expectations, and respect for the client's business." />
          <Value title="Accessibility" text="Readable, responsive experiences designed for a broad range of users and devices." />
        </div>
      </Section>

      <Section className="border-y border-white/7 bg-[#0A101C]">
        <div data-reveal className="reveal grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro eyebrow="Why work with us" title="A focused partner, not a complicated process." />
          <div className="grid gap-5 sm:grid-cols-2">
            {["Scope shaped around your actual needs", "Responsive design included from the start", "Performance and SEO considered throughout", "Support available after launch"].map((item) => (
              <div key={item} className="flex items-start gap-3 border-t border-white/10 pt-4 text-sm font-semibold text-slate-300">
                <ShieldCheck className="h-5 w-5 shrink-0 text-sky-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <FinalCta navigate={navigate} />
    </>
  );
}

function ContactPage({ notify }: { notify: (message: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", business: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (!form.service) nextErrors.service = "Please select a service.";
    if (form.message.trim().length < 20) nextErrors.message = "Please share a little more about the project.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      notify("Please review the highlighted fields.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(SITE_CONFIG.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: (() => {
          const data = new FormData();
          data.append("name", form.name);
          data.append("email", form.email);
          data.append("business", form.business || "Not provided");
          data.append("service", form.service);
          data.append("message", form.message);
          data.append("_subject", `Website enquiry from ${form.name}`);
          return data;
        })(),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", business: "", service: "", message: "" });
        notify("Thanks — your message has been sent.");
      } else {
        setStatus("error");
        notify("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      notify("Network error. Please try again or email us directly.");
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you need your website to do." text="Share your business, required features, and project goals. We will use that information to recommend an appropriate scope." />
      <Section className="pt-8 sm:pt-12">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div data-reveal className="reveal">
            <h2 className="text-2xl font-black text-white">Start the conversation</h2>
            <p className="mt-4 max-w-md leading-7 text-slate-400">Send your project details using the form and we will get back to you by email. You can also contact us directly at any time.</p>
            <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 py-5 text-sm font-bold text-white hover:text-sky-400">
                <Mail className="h-5 w-5 text-sky-400" />
                {SITE_CONFIG.email}
              </a>
              <a href={`tel:${SITE_CONFIG.phoneTel}`} className="flex items-center gap-3 py-5 text-sm font-bold text-white hover:text-sky-400">
                <Phone className="h-5 w-5 text-sky-400" />
                {SITE_CONFIG.phoneDisplay}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-5 text-sm font-bold text-white hover:text-[#25D366]"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-black text-white transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message us on WhatsApp
            </a>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-[#0A101C] p-8">
              <div className="relative grid min-h-52 place-items-center overflow-hidden rounded-xl border border-white/8 bg-[radial-gradient(circle_at_center,rgba(56,189,248,.13),transparent_55%)]">
                <div className="map-grid absolute inset-0 opacity-30" />
                <div className="relative text-center">
                  <MapPin className="mx-auto h-8 w-8 text-sky-400" />
                  <p className="mt-3 font-bold text-white">Based in South Africa</p>
                  <p className="mt-1 text-sm text-slate-400">Working with businesses nationwide</p>
                </div>
              </div>
            </div>
          </div>

          {status === "success" ? (
            <div data-reveal className="reveal flex flex-col items-start justify-center rounded-2xl border border-sky-400/25 bg-[#0A101C] p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-white">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-2xl font-black text-white">Message sent</h2>
              <p className="mt-3 max-w-md leading-7 text-slate-400">Thank you for reaching out. We have received your enquiry and will reply to your email address shortly.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-400"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate data-reveal className="reveal rounded-2xl border border-white/8 bg-[#0A101C] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input name="name" value={form.name} onChange={(event) => update("name", event.target.value)} className="input" autoComplete="name" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input name="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="input" autoComplete="email" />
                </Field>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Business name" optional>
                  <input name="business" value={form.business} onChange={(event) => update("business", event.target.value)} className="input" autoComplete="organization" />
                </Field>
                <Field label="Service" error={errors.service}>
                  <select name="service" value={form.service} onChange={(event) => update("service", event.target.value)} className="input">
                    <option value="">Select a service</option>
                    {services.map((service) => <option key={service.title}>{service.title}</option>)}
                  </select>
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Project details" error={errors.message}>
                  <textarea name="message" rows={6} value={form.message} onChange={(event) => update("message", event.target.value)} className="input resize-y" placeholder="What does your business do, what features do you need, and what should the website help you achieve?" />
                </Field>
              </div>
              <div className="mt-6 flex flex-col items-start justify-between gap-5 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
                <p className="max-w-sm text-xs leading-5 text-slate-500">Your information is used only to respond to this enquiry.</p>
                <PrimaryButton type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Send message"}
                  {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
                </PrimaryButton>
              </div>
              {status === "error" && (
                <p role="alert" className="mt-5 text-sm font-semibold text-rose-400">
                  We couldn’t send your message. Please try again, or email us directly at {SITE_CONFIG.email}.
                </p>
              )}
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article data-reveal className="reveal group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0A101C] transition-colors hover:border-white/15">
      <div className="relative">
        <ImageWithSkeleton src={project.image} alt={project.alt} className="aspect-[16/10]" />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-sky-300 backdrop-blur">
          Concept design
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-400">{project.category}</p>
        </div>
        <h3 className="mt-3 text-xl font-black text-white sm:text-2xl">{project.title}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-300">{project.websiteType}</p>
        <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
        <div className="mt-5 border-t border-white/8 pt-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Key features</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.focus.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-[#070B14] px-2.5 py-1 text-xs font-semibold text-slate-300">
                <Check className="h-3 w-3 text-sky-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function BrowserComparison({ mode }: { mode: "before" | "after" }) {
  const after = mode === "after";
  return (
    <div className="comparison-enter overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/40">
      <div className="flex h-11 items-center gap-2 border-b border-white/8 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="ml-3 h-5 flex-1 rounded bg-slate-900" />
      </div>
      <div className={`min-h-80 p-6 transition-colors duration-500 ${after ? "bg-gradient-to-br from-blue-700 to-sky-500" : "bg-slate-200"}`}>
        {after ? (
          <div className="max-w-md pt-8 text-white">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-100">Clear service promise</span>
            <div className="mt-5 h-5 w-3/4 rounded bg-white" />
            <div className="mt-3 h-5 w-1/2 rounded bg-white/80" />
            <div className="mt-6 h-2 w-full rounded bg-white/35" />
            <div className="mt-2 h-2 w-4/5 rounded bg-white/35" />
            <div className="mt-8 h-10 w-32 rounded-lg bg-slate-950" />
          </div>
        ) : (
          <div className="grid gap-3 pt-4 text-slate-500">
            <div className="flex justify-between border-b border-slate-400 pb-2 text-xs"><span>Logo</span><span>Home | About | Products | News | Links | Contact</span></div>
            <div className="mt-4 h-6 w-2/3 bg-slate-400" />
            <div className="h-2 w-full bg-slate-300" />
            <div className="h-2 w-11/12 bg-slate-300" />
            <div className="h-2 w-4/5 bg-slate-300" />
            <div className="mt-4 grid grid-cols-3 gap-2"><div className="h-24 bg-slate-300" /><div className="h-24 bg-slate-300" /><div className="h-24 bg-slate-300" /></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScopeNote({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <section className="border-y border-white/7 bg-[#0A101C] px-5 py-16 sm:px-8 sm:py-20">
      <div data-reveal className="reveal mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-400">Project quotes</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">Every project is scoped individually.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">The quote depends on the type of website, the features required, the amount of content, and the overall project scope. Share what you need and we will prepare an appropriate recommendation.</p>
        </div>
        <PrimaryButton className="shrink-0" onClick={() => navigate("contact")}>
          Request a quote <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </section>
  );
}

function PricingGuide({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <section id="pricing" className="border-y border-white/7 bg-[#0A101C] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="reveal max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-400">Pricing guide</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            A starting guide, not fixed packages.
          </h2>
          <p className="mt-5 leading-7 text-slate-400">
            Prices can vary depending on your specific needs. The plans below are starting points to help you estimate
            a project. Your final price depends on factors such as:
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {pricingFactors.map((factor) => (
              <li key={factor} className="flex items-start gap-3 text-sm font-semibold text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.name}
              data-reveal
              className={`reveal flex flex-col rounded-2xl border p-7 ${
                tier.highlighted
                  ? "border-sky-400/40 bg-[radial-gradient(circle_at_top,rgba(56,189,248,.12),transparent_55%),#0B1424]"
                  : "border-white/8 bg-[#070B14]"
              }`}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-sky-400/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-sky-300">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-black text-white">{tier.name}</h3>
              <p className="mt-2 text-2xl font-black tracking-tight text-sky-400">{tier.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{tier.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-white/8 pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate("contact")}
                className={`mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-950/40 hover:-translate-y-0.5"
                    : "border border-slate-600 text-white hover:border-sky-400 hover:text-sky-400"
                }`}
              >
                Get a custom quote <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>

        <div data-reveal className="reveal mt-12 rounded-2xl border border-white/8 bg-[#070B14] p-7 sm:p-9">
          <h3 className="text-xl font-black text-white">Maintenance &amp; Support</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Optional monthly care to keep your website updated, secure, and running smoothly.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {maintenancePlans.map((plan) => (
              <div key={plan.name} className="rounded-xl border border-white/8 bg-[#0A101C] p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-lg font-black text-white">{plan.name}</span>
                  <span className="text-lg font-black text-sky-400">{plan.price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="reveal mt-10 flex flex-col justify-between gap-6 rounded-2xl border border-sky-400/20 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,.14),transparent_45%),#0B1424] p-7 sm:p-9 lg:flex-row lg:items-center"
        >
          <p className="max-w-3xl text-sm leading-7 text-slate-300">{pricingNote}</p>
          <PrimaryButton className="shrink-0" onClick={() => navigate("contact")}>
            Contact us for a custom quote <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ navigate, title = "Ready to build a stronger online presence?" }: { navigate: (route: Route) => void; title?: string }) {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div data-reveal className="reveal mx-auto max-w-7xl overflow-hidden rounded-3xl border border-sky-400/20 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,.18),transparent_38%),linear-gradient(135deg,#0D1A32,#09111F)] px-6 py-14 text-center sm:px-12 sm:py-20">
        <Sparkles className="mx-auto h-6 w-6 text-sky-400" />
        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">Tell us about your business, your goals, and the features you have in mind.</p>
        <PrimaryButton className="mt-8" onClick={() => navigate("contact")}>Start a project <ArrowRight className="h-4 w-4" /></PrimaryButton>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden border-b border-white/7 px-5 py-20 sm:px-8 sm:py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-400">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

function ServiceRow({ service, index, large = false }: { service: (typeof services)[number]; index: number; large?: boolean }) {
  const Icon = service.icon;
  return (
    <article data-reveal className={`reveal grid items-start gap-5 py-7 sm:grid-cols-[64px_1fr] ${large ? "sm:py-10 lg:grid-cols-[100px_0.8fr_1.2fr]" : ""}`}>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-600">{String(index + 1).padStart(2, "0")}</span>
        <Icon className="h-5 w-5 text-sky-400" />
      </div>
      <h3 className={`${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"} font-black tracking-tight text-white`}>{service.title}</h3>
      <p className={`max-w-2xl leading-7 text-slate-400 ${large ? "lg:justify-self-end" : "mt-2 sm:col-start-2"}`}>{service.description}</p>
    </article>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group py-2">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-bold text-white marker:hidden sm:text-lg">
        {question}
        <ChevronDown className="h-5 w-5 shrink-0 text-sky-400 transition-transform group-open:rotate-180" />
      </summary>
      <p className="max-w-3xl pb-6 pr-10 leading-7 text-slate-400">{answer}</p>
    </details>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`px-5 py-20 sm:px-8 sm:py-28 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>;
}

function SectionIntro({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-400">{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl ${centered ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>{title}</h2>
      {text && <p className={`mt-5 max-w-2xl leading-7 text-slate-400 ${centered ? "mx-auto" : ""}`}>{text}</p>}
    </div>
  );
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <div data-reveal className="reveal border-t border-white/12 pt-5">
      <h3 className="text-lg font-black text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function ImageWithSkeleton({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {!loaded && <div className="skeleton absolute inset-0" />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.025] ${loaded ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button", disabled = false }: { children: ReactNode; onClick?: () => void; className?: string; type?: "button" | "submit"; disabled?: boolean }) {
  return <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-400 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-0.5 hover:shadow-sky-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${className}`}>{children}</button>;
}

function SecondaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-600 bg-slate-950/40 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:border-sky-400 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">{children}</button>;
}

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-bold text-slate-200">{label}{optional && <span className="text-xs font-normal text-slate-500">Optional</span>}</span>
      {children}
      {error && <span className="mt-2 block text-xs font-semibold text-rose-400">{error}</span>}
    </label>
  );
}

function Footer({ navigate }: { navigate: (route: Route, scrollTarget?: string) => void }) {
  return (
    <footer className="border-t border-white/8 bg-[#050810] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div className="max-w-sm">
            <TLLogo iconSize={40} />
            <p className="mt-5 text-sm leading-6 text-slate-500">Professional website design and digital solutions for South African businesses.</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Navigate</p>
            <div className="mt-4 grid gap-3">
              {navigation.map((item) => <button key={item.label} type="button" onClick={() => navigate(item.route, item.scrollTo)} className="text-left text-sm font-semibold text-slate-300 hover:text-sky-400">{item.label}</button>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <a href={`mailto:${SITE_CONFIG.email}`} className="mt-4 block text-sm font-semibold text-white hover:text-sky-400">{SITE_CONFIG.email}</a>
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="mt-3 block text-sm font-semibold text-white hover:text-sky-400">{SITE_CONFIG.phoneDisplay}</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:brightness-110">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/8 pt-7 text-xs text-slate-600 sm:flex-row sm:items-center">
          <p>Copyright {new Date().getFullYear()} TL Web Solutions. All rights reserved.</p>
          <div className="flex gap-5">
            <button type="button" onClick={() => navigate("privacy")} className="hover:text-slate-300">Privacy Policy</button>
            <button type="button" onClick={() => navigate("terms")} className="hover:text-slate-300">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CookieBanner({ onChoice, navigate }: { onChoice: (choice: "accepted" | "necessary") => void; navigate: (route: Route) => void }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-white">Cookie preferences</p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">We use optional analytics to understand website performance. You can accept analytics or continue with necessary storage only. <button type="button" onClick={() => navigate("privacy")} className="text-sky-400 underline">Privacy Policy</button></p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => onChoice("necessary")} className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 hover:border-slate-500">Necessary only</button>
          <button type="button" onClick={() => onChoice("accepted")} className="rounded-lg bg-sky-400 px-4 py-2 text-xs font-black text-slate-950">Accept</button>
        </div>
      </div>
    </div>
  );
}

function LegalPage({ type, navigate }: { type: "privacy" | "terms"; navigate: (route: Route) => void }) {
  const privacy = type === "privacy";
  return (
    <>
      <PageHero eyebrow="Legal" title={privacy ? "Privacy Policy" : "Terms of Service"} text={privacy ? "How TL Web Solutions handles information submitted through this website." : "General terms that apply when using the TL Web Solutions website."} />
      <Section className="pt-8 sm:pt-12">
        <div className="prose-dark mx-auto max-w-3xl space-y-8 text-sm leading-7 text-slate-400">
          {privacy ? (
            <>
              <LegalBlock title="Information you provide">Contact details and project information are used only to respond to your enquiry and discuss requested services.</LegalBlock>
              <LegalBlock title="Analytics">Optional analytics load only after consent and only when valid analytics identifiers are configured.</LegalBlock>
              <LegalBlock title="Data choices">You may request access, correction, or deletion of information you have shared by emailing {SITE_CONFIG.email}.</LegalBlock>
            </>
          ) : (
            <>
              <LegalBlock title="Website information">Website content is provided for general information and does not constitute a formal project proposal.</LegalBlock>
              <LegalBlock title="Project agreements">Project scope, responsibilities, timelines, deliverables, and payment terms are confirmed in a separate written agreement before work begins.</LegalBlock>
              <LegalBlock title="Intellectual property">The TL Web Solutions name, logo, and original website content may not be reproduced without permission.</LegalBlock>
            </>
          )}
          <p>For questions, contact <a className="text-sky-400" href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.</p>
          <PrimaryButton onClick={() => navigate("contact")}>Contact us</PrimaryButton>
        </div>
      </Section>
    </>
  );
}

function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-2">{children}</p></section>;
}

function NotFoundPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <section className="grid min-h-[70svh] place-items-center px-5 text-center">
      <div>
        <TLLogo variant="icon" iconSize={62} />
        <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-sky-400">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">Page not found.</h1>
        <p className="mt-4 text-slate-400">The page you requested does not exist or has moved.</p>
        <PrimaryButton className="mt-8" onClick={() => navigate("home")}>Return home</PrimaryButton>
      </div>
    </section>
  );
}



function isConfigured(value: string) {
  return value.length > 0 && !value.includes("MEASUREMENT_ID") && !value.includes("PROJECT_ID");
}

function initialiseAnalytics() {
  const { googleAnalyticsId, microsoftClarityId } = SITE_CONFIG.analytics;

  if (isConfigured(googleAnalyticsId) && !document.getElementById("tl-ga4")) {
    const script = document.createElement("script");
    script.id = "tl-ga4";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);
    const inline = document.createElement("script");
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`;
    document.head.appendChild(inline);
  }

  if (isConfigured(microsoftClarityId) && !document.getElementById("tl-clarity")) {
    const script = document.createElement("script");
    script.id = "tl-clarity";
    script.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${microsoftClarityId}');`;
    document.head.appendChild(script);
  }
}

function trackPageView(path: string, title: string) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: `${SITE_CONFIG.domain}${path}`,
    });
  }
}