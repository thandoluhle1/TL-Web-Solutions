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
    description: "Custom website design with thoughtful structure, refined visuals, and consistent polish across all pages.",
    icon: Globe2,
  },
  {
    title: "Business Websites",
    description: "Clear, credible websites that showcase your services and make it simple for customers to understand what you offer.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Landing Pages",
    description: "Single-focus pages designed for specific campaigns, product launches, or lead capture with a clear conversion path.",
    icon: LayoutTemplate,
  },
  {
    title: "Website Redesign",
    description: "Modernise outdated websites with improved structure, faster performance, better usability, and updated design.",
    icon: RefreshCw,
  },
  {
    title: "Website Maintenance & Support",
    description: "Ongoing updates, security monitoring, performance checks, and technical support after your site launches.",
    icon: Settings2,
  },
  {
    title: "SEO Foundation",
    description: "Technical and on-page optimisation that helps search engines understand your content and improves discoverability.",
    icon: Search,
  },
  {
    title: "Performance Optimisation",
    description: "Faster load times, optimised images, efficient code, and improved Core Web Vitals for a smoother user experience.",
    icon: Gauge,
  },
  {
    title: "Mobile-First Responsive Design",
    description: "Websites that work perfectly on phones, tablets, and desktops with careful attention to usability on every device.",
    icon: Smartphone,
  },
];

export type ProjectCategory =
  | "All"
  | "Restaurant"
  | "Service Business"
  | "E-commerce"
  | "Landing Page"
  | "Local Business";

export type Project = {
  title: string;
  category: Exclude<ProjectCategory, "All">;
  websiteType: string;
  description: string;
  image: string;
  alt: string;
  focus: string[];
};

// Concept designs created to demonstrate our design approach and capabilities.
// These showcase how we structure and present different types of websites.
export const projects: Project[] = [
  {
    title: "Bella Cucina",
    category: "Restaurant",
    websiteType: "Restaurant website concept",
    description: "Demonstrates how a restaurant website balances visual appeal with practical features like menus, reservations, and location details in a cohesive design.",
    image: "https://images.pexels.com/photos/32667186/pexels-photo-32667186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Warm restaurant interior with wooden furniture and natural light",
    focus: ["Digital menu system", "Online reservations", "Photo gallery", "Location integration"],
  },
  {
    title: "Bright Spark Electrical",
    category: "Service Business",
    websiteType: "Service business website concept",
    description: "Shows how a service business can build trust through clear service descriptions, service area coverage, and straightforward contact options.",
    image: "https://images.pexels.com/photos/7647233/pexels-photo-7647233.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Professional electrician installing an electrical outlet",
    focus: ["Service area mapping", "Request quote form", "Trust elements", "Direct contact"],
  },
  {
    title: "The Corner Cup",
    category: "Local Business",
    websiteType: "Local business website concept",
    description: "Illustrates how a small neighbourhood business can build community connection online with accessible information and a welcoming design.",
    image: "https://images.pexels.com/photos/14490407/pexels-photo-14490407.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Cosy urban coffee shop with an espresso machine and warm lighting",
    focus: ["Menu highlights", "Operating hours", "Location details", "Local presence"],
  },
  {
    title: "Peak Performance Studio",
    category: "Service Business",
    websiteType: "Fitness business website concept",
    description: "Demonstrates how a service business can present offerings clearly, build credibility, and make it easy for potential customers to take the next step.",
    image: "https://images.pexels.com/photos/35341600/pexels-photo-35341600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "People talking together in a bright modern gym",
    focus: ["Service offerings", "Instructor information", "Inquiry form", "Call-to-action"],
  },
  {
    title: "AutoHub E-Commerce",
    category: "E-commerce",
    websiteType: "E-commerce product site concept",
    description: "Shows how product pages can be structured for clarity, with visual presentation, detailed descriptions, and a frictionless purchase flow.",
    image: "https://images.pexels.com/photos/4870737/pexels-photo-4870737.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Close-up of a car covered in soap suds during a wash",
    focus: ["Product presentation", "Clear pricing", "Service options", "Simple checkout"],
  },
  {
    title: "SaaS Product Launch",
    category: "Landing Page",
    websiteType: "Product launch landing page concept",
    description: "Illustrates how a landing page guides visitors through the value proposition with clear sections, benefits, and a focused conversion action.",
    image: "https://images.pexels.com/photos/12605419/pexels-photo-12605419.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1200",
    alt: "Close-up of a smartphone displaying a modern app interface",
    focus: ["Value proposition", "Feature highlights", "Email capture", "FAQ section"],
  },
];

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery & Strategy",
    description: "We start by understanding your business, target audience, and goals. We discuss your current challenges, what success looks like, and any specific requirements.",
  },
  {
    number: 2,
    title: "Planning & Structure",
    description: "Based on the discovery, we plan the website structure, define page hierarchy, and outline the content needed. This ensures the design serves your business goals.",
  },
  {
    number: 3,
    title: "Design & Development",
    description: "We create a custom design tailored to your brand, then build it using modern technologies. We focus on clean code, performance, and mobile responsiveness.",
  },
  {
    number: 4,
    title: "Testing & Optimisation",
    description: "We test across devices and browsers, optimise page speed, ensure accessibility standards, and make any refinements based on your feedback.",
  },
  {
    number: 5,
    title: "Launch & Support",
    description: "We handle deployment, domain setup, and ensure everything runs smoothly. We're available for ongoing support, updates, and maintenance.",
  },
];

export type Commitment = {
  title: string;
  description: string;
};

export const ourCommitments: Commitment[] = [
  {
    title: "Quality First",
    description: "Every website is built to high standards with clean code, optimised performance, and attention to detail. We don't rush work.",
  },
  {
    title: "Clear Communication",
    description: "You'll know what to expect, understand project progress, and have transparent conversations about timeline and cost.",
  },
  {
    title: "Responsive on Every Device",
    description: "Your website works beautifully on mobile phones, tablets, and desktops. We test thoroughly before launch.",
  },
  {
    title: "Performance Matters",
    description: "We optimise for fast load times because slow websites lose customers. Speed is part of our standard approach.",
  },
  {
    title: "Technical Foundation",
    description: "We build with SEO, accessibility, and security in mind from the start, not as an afterthought.",
  },
  {
    title: "Ongoing Support",
    description: "Launch isn't the end. We're available for updates, maintenance, and support to keep your website running smoothly.",
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
    summary: "Professional foundation for small businesses and startups.",
    features: [
      "1–5 custom-designed pages",
      "Mobile-responsive layout",
      "Modern, professional design",
      "Contact form",
      "Basic SEO setup",
      "Domain and hosting guidance",
    ],
  },
  {
    name: "Professional Website",
    price: "From R7,500",
    summary: "Scalable site built for customer engagement and growth.",
    highlighted: true,
    features: [
      "All Starter features",
      "Advanced layouts and animations",
      "5–10 custom pages",
      "Google Analytics integration",
      "WhatsApp or chat integration",
      "Optimised for conversions",
      "Enhanced SEO",
    ],
  },
  {
    name: "Premium Website",
    price: "From R12,000+",
    summary: "Custom-built site for complex needs and growing businesses.",
    features: [
      "All Professional features",
      "10+ pages or more",
      "Advanced custom functionality",
      "E-commerce or booking system",
      "Additional integrations",
      "Priority support",
      "Performance optimisation",
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
    description: "Monthly content updates, minor changes, and security monitoring.",
  },
  {
    name: "Business",
    price: "R1,000/month",
    description: "Content updates, feature improvements, performance monitoring, and priority support.",
  },
];

export const pricingFactors = [
  "Number of pages",
  "Design complexity and customisation",
  "Required features and functionality",
  "Third-party integrations",
  "E-commerce or booking systems",
  "Content preparation and strategy",
];

export const pricingNote =
  "These pricing tiers are starting points. Every project is unique, and your final investment depends on your specific needs, design requirements, and functionality. We'll provide a detailed quote after discussing your project scope. No surprises—just honest pricing.";

export const faqs = [
  {
    question: "What's included in the web design process?",
    answer: "We start with discovery to understand your goals, create a plan for site structure and content, design and build your website, test thoroughly, and launch it. After launch, we provide support and can help with ongoing updates.",
  },
  {
    question: "How long does a website project take?",
    answer: "Timeline depends on the number of pages, content availability, and complexity. A typical project takes 4–8 weeks. We'll confirm a realistic schedule once we understand your requirements.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer: "Yes. Every website we build is designed and tested to work perfectly on phones, tablets, and desktops. Mobile usability is built in from the start, not added later.",
  },
  {
    question: "Do you handle SEO?",
    answer: "Yes. We build SEO fundamentals into every website—clean structure, fast load times, proper heading hierarchy, and mobile optimisation. We can also discuss additional SEO strategies during your project.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Absolutely. We can audit your current site, identify issues with design, speed, or structure, and create a modern redesign that improves performance and user experience.",
  },
  {
    question: "What happens after the website launches?",
    answer: "We provide initial support during launch and are available for ongoing maintenance plans. You can choose to handle updates yourself or have us manage them. We're here to help however you need.",
  },
  {
    question: "Can you help with integrations like payment systems or booking tools?",
    answer: "Yes. We can integrate WhatsApp, email forms, Google Analytics, payment gateways, booking systems, and other tools depending on your needs.",
  },
  {
    question: "What if I need changes after launch?",
    answer: "That's normal. Small updates are straightforward and quick. We offer maintenance plans for regular updates, or you can request changes as needed. We keep communication clear and simple.",
  },
];
