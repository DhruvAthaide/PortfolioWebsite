import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import SEO from "../components/utils/SEO";
import ProjectCard from "../components/ui/ProjectCard";
import ResumeMenu from "../components/ui/ResumeMenu";
import { projects } from "../data/projects";
import { publication } from "../data/skills";
import { homeSEO } from "../data/seoMeta";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/DhruvAthaide", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvathaide", external: true },
  { label: "Email", href: "mailto:athaidedhruv@gmail.com", external: false },
];

const Home: React.FC = () => (
  <div>
    <SEO title={homeSEO.title} description={homeSEO.description} keywords={homeSEO.keywords} />

    <section className="container-custom pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl tracking-tight">Dhruv Athaide</h1>
          <p className="mt-4 font-display text-xl sm:text-2xl font-semibold text-primary-600 dark:text-secondary-900">
            Mobile and application security engineer, Mumbai
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed">
            <p>
              At DeepCytes Cyber Labs UK I build Android apps that protect people&apos;s privacy, and I
              review and attack them before each release. Five of them are live on Google Play. Most of
              my code is Kotlin and C++ on the NDK, and most of my testing happens in Frida and Burp Suite.
            </p>
            {/* Hidden for now. To restore, add this sentence to the paragraph above:
                "I'm also doing an M.S. in Computer Science & Data Analytics at IIT Patna." */}
            <p>
              I also co-wrote a{" "}
              <a href={publication.href} target="_blank" rel="noopener noreferrer" className="link">
                peer-reviewed book chapter
              </a>{" "}
              on Android vulnerability assessment, published by IGI Global in 2026.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn btn-primary">
              See my projects <ArrowRight size={18} />
            </Link>
            <ResumeMenu buttonClassName="btn btn-outline" align="left">
              <Download size={18} />
              Download CV
            </ResumeMenu>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img
          src="/images/home-DhruvAthaide.webp"
          alt="Dhruv Athaide"
          width={288}
          height={288}
          className="w-48 sm:w-60 md:w-72 aspect-square object-cover rounded-xl border border-gray-200 bg-gray-100 dark:border-dark-600 dark:bg-dark-700"
        />
      </div>
    </section>

    <section className="container-custom">
      <div className="flex items-baseline justify-between gap-4 mb-8 border-t border-gray-200 dark:border-dark-600 pt-10">
        <h2 className="text-2xl sm:text-3xl">Selected work</h2>
        <Link to="/projects" className="link text-sm whitespace-nowrap">
          All projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects
          .filter((p) => p.featured)
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </section>
  </div>
);

export default Home;
