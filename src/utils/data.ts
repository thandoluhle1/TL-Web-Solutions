import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Gauge,
  Globe2,
  LayoutTemplate,
  RefreshCw,
  Search,
  Settings2,
  Smartphone,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Professional Website Design",
    description: "Custom website design with a clear structure, refined visual system, and a polished experience across every page.",
    icon: Globe2,
  },
  {
    title: "Business Websites",
    description: "Credible, practical websites that communicate your services clearly and make it easy for customers to get in touch.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Landing Pages",
    description: "Focused pages for campaigns, new offers, lead generation, or product launches with one clear conversion goal.",
    icon: LayoutTemplate,
  },
  {
    title: "Website Redesign",
    description: "A considered redesign for websites that feel dated, unclear, slow, or no longer reflect the quality of the business.",
    icon: RefreshCw,
  },
  {
    title: "Website Maintenance",
    description: "Ongoing content updates, technical checks, security care, and dependable support after launch.",
    icon: Settings2,
  },
  {
    title: "SEO Optimisation",
    description: "A strong technical and on-page foundation that helps search engines understand and surface your website.",
    icon: Search,
  },
  {
    title: "Performance Optimisation",
    description: "Improvements to loading speed, image delivery, code weight, and Core Web Vitals for a smoother experience.",
    icon: Gauge,
  },
  {
    title: "Mobile Responsive Design",
    description: "Layouts designed to remain clear, accessible, and easy to use on phones, tablets, laptops, and large screens.",
    icon: Smartphone,
  },
];

export type ProjectCategory =
  | "All"
  | "Local Business"
  | "Restaurant"
  | "Car Wash"
  | "Service Business"
  | "Landing Page";

export type Project = {
  title: string;
  category: Exclude<ProjectCategory, "All">;
  websiteType: string;
  description: string;
  image: string;
  alt: string;
  focus: string[];
};

// Concept designs only. These are example projects to demonstrate style and
// quality — they are not real clients or completed client work.
export const projects: Project[] = [
  {
    title: "Bella Cucina",
    category: "Restaurant",
    websiteType: "Restaurant website",
    description: "A warm, appetite-driven concept for a family-owned Italian restaurant, built around the menu and easy table reservations.",
    image: "https://images.pexels.com/photos/32667186/pexels-photo-32667186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Warm restaurant interior with wooden furniture and natural light",
    focus: ["Digital menu", "Online reservations", "Gallery", "Google Maps"],
  },
  {
    title: "SparkleWash Auto Spa",
    category: "Car Wash",
    websiteType: "Car wash & detailing website",
    description: "A bold, high-energy concept for a car wash and detailing business focused on packages, pricing, and quick bookings.",
    image: "https://images.pexels.com/photos/4870737/pexels-photo-4870737.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Close-up of a car covered in soap suds during a wash",
    focus: ["Service packages", "Booking form", "Pricing tables", "WhatsApp"],
  },
  {
    title: "Bright Spark Electrical",
    category: "Service Business",
    websiteType: "Service-based business website",
    description: "A trustworthy, mobile-first concept for an electrical contractor that highlights service areas and fast quote requests.",
    image: "https://images.pexels.com/photos/7647233/pexels-photo-7647233.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Professional electrician installing an electrical outlet",
    focus: ["Service areas", "Quote requests", "Trust signals", "Click-to-call"],
  },
  {
    title: "The Corner Cup",
    category: "Local Business",
    websiteType: "Local business website",
    description: "A cosy, community-focused concept for a neighbourhood coffee shop featuring the menu, story, and opening hours.",
    image: "https://images.pexels.com/photos/14490407/pexels-photo-14490407.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Cosy urban coffee shop with an espresso machine and warm lighting",
    focus: ["Menu highlights", "Opening hours", "Location", "Instagram feed"],
  },
  {
    title: "Peak Form Studio",
    category: "Service Business",
    websiteType: "Fitness studio website",
    description: "A modern, motivating concept for a boutique fitness studio built around classes, trainers, and membership enquiries.",
    image: "https://images.pexels.com/photos/35341600/pexels-photo-35341600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "People talking together in a bright modern gym",
    focus: ["Class timetable", "Trainer profiles", "Sign-up form", "Testimonials"],
  },
  {
    title: "Nimbus App Launch",
    category: "Landing Page",
    websiteType: "Modern landing page",
    description: "A sleek, conversion-focused single-page concept for a product launch with a clear call-to-action and feature highlights.",
    image: "https://images.pexels.com/photos/12605419/pexels-photo-12605419.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Close-up of a smartphone displaying a modern app interface",
    focus: ["Hero call-to-action", "Feature sections", "Email capture", "FAQ"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

// Demo reviews for illustration only. These are sample testimonials that reflect
// the kind of feedback great work earns — they are not from real customers.
export const testimonials: Testimonial[] = [
  {
    quote:
      "The concept captured our brand perfectly. The layout is clean, the site feels premium, and everything is easy to find on a phone.",
    name: "Sample Client",
    role: "Restaurant owner (demo review)",
    rating: 5,
  },
  {
    quote:
      "Exactly the modern, professional look we imagined. The booking flow is simple and the whole design feels fast and polished.",
    name: "Sample Client",
    role: "Car wash business (demo review)",
    rating: 5,
  },
  {
    quote:
      "Clear structure, strong calls-to-action, and a design that builds instant trust. This is the standard every small business needs.",
    name: "Sample Client",
    role: "Service business (demo review)",
    rating: 5,
  },
];

export type PricingTier = {
  name: string;
  price: string;
  summary: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter Website",
    price: "From R3,000",
    summary: "A clean, professional presence for a new or small business.",
    features: [
      "Professional 1–5 page website",
      "Modern custom design",
      "Mobile-friendly layout",
      "Contact forms",
      "Basic SEO setup",
      "Domain and hosting guidance",
    ],
  },
  {
    name: "Professional Website",
    price: "From R7,500",
    summary: "A more capable website built to present and convert.",
    highlighted: true,
    features: [
      "Everything in Starter",
      "More advanced layouts and animations",
      "Additional pages",
      "Google Analytics setup",
      "WhatsApp integration",
      "Better optimisation for conversions",
    ],
  },
  {
    name: "Premium Website",
    price: "From R12,000+",
    summary: "A larger, custom-built website for growing needs.",
    features: [
      "Larger custom website",
      "Advanced design features",
      "More complex page structures",
      "Extra integrations where needed",
      "Priority revisions and support",
    ],
  },
];

export type MaintenancePlan = {
  name: string;
  price: string;
  description: string;
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "Basic",
    price: "R500/month",
    description: "Updates, small changes, and website checks.",
  },
  {
    name: "Business",
    price: "R1,000/month",
    description: "Ongoing improvements, content updates, and support.",
  },
];

export const pricingFactors = [
  "The type of website required",
  "Number of pages",
  "Design complexity",
  "Features and functionality requested",
  "Additional integrations or tools needed",
  "Custom changes and project requirements",
];

export const pricingNote =
  "These plans are starting points to help estimate your project. Every website is different, and pricing will be adjusted based on the features, design, and functionality you choose. Contact us for a custom quote based on your exact requirements.";

export const faqs = [
  {
    question: "How long does a website project take?",
    answer: "The timeline depends on the number of pages, the content available, the required features, and the review process. A realistic schedule is confirmed after the project scope is understood.",
  },
  {
    question: "Will the website work well on mobile?",
    answer: "Yes. Every website is designed and tested for phones, tablets, laptops, and desktop screens, with careful attention to readability and touch-friendly interactions.",
  },
  {
    question: "Can you redesign an existing website?",
    answer: "Yes. We can review the current website, identify issues with structure, design, speed, and usability, then recommend an appropriate redesign approach.",
  },
  {
    question: "Can you help after the website launches?",
    answer: "Yes. Website maintenance is available for content changes, technical checks, performance care, and ongoing support based on what your website needs.",
  },
];