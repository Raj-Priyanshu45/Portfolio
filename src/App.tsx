import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, Code2, Copy, Github, Linkedin, Menu, Moon, ShieldCheck, Sun, X, Layers, Radio, GitBranch } from "lucide-react";
import { Button } from "./components/ui/button";
import { RequestFlow } from "./components/request-flow";
import { CONTENT } from "./lib/content";

const navigation = ["projects", "stack", "about", "contact"] as const;

type Theme = "light" | "dark";

type CopyState = "idle" | "copied" | "error";

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const project = CONTENT.projects[selected] ?? CONTENT.projects[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pr-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      // Theme remains usable when storage is unavailable.
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navigation.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("pr-theme", next);
    } catch {
      // Optional preference persistence.
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTENT.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 3000);
  };

  return (
    <div className="portfolio">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#main" className="wordmark" aria-label="Priyanshu Raj, back to top">
            pr<span className="brand-dot">.</span><span className="wordmark-name">PRIYANSHU RAJ</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a key={item} href={`#${item}`} className={activeSection === item ? "active" : ""}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>)}
          </nav>
          <div className="nav-actions">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
            <Button variant="outline" asChild className="nav-contact"><a href={`mailto:${CONTENT.email}`}>Let’s talk <ArrowUpRight /></a></Button>
            <Button variant="ghost" size="icon" className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map((item) => <a href={`#${item}`} key={item} onClick={() => setMenuOpen(false)}>{item}<ArrowUpRight size={18} /></a>)}</nav>}
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> BACKEND ENGINEERING · PORTFOLIO</span><span className="hero-location mono">TUMKUR, INDIA <span>/</span> CLASS OF {CONTENT.education.graduation}</span></div>
          <div className="hero-grid">
            <div className="hero-copy"><p className="hero-name">Hi, I’m {CONTENT.name}.</p><h1 id="hero-title">Java &amp;<br /><span>Spring Boot</span><br />Developer<span className="heading-period">.</span></h1><p className="hero-description">I build the systems behind the interface.<br className="desktop-break" /> Real-time conversations, secure commerce,<br className="desktop-break" /> and resilient request flows.</p><div className="hero-ctas"><Button asChild size="lg"><a href="#projects">Explore my work <ArrowDownRight /></a></Button><Button asChild variant="outline" size="lg"><a href={CONTENT.links.github} target="_blank" rel="noopener noreferrer"><Github /> GitHub <ArrowUpRight /></a></Button></div></div>
            <div className="hero-system" aria-label="Illustrative backend request path: client, gateway, Spring Boot service, and data layer">
              <div className="system-title mono"><span><span className="status-dot" /> THE REQUEST PATH</span><span>01—04</span></div>
              <div className="system-path">
                <div className="system-stage"><span className="stage-num">01</span><Code2 /><div><strong>Client</strong><small>Every interaction starts here</small></div><span className="stage-tag">REQUEST</span></div>
                <div className="system-wire"><span className="wire-packet" /><span>HTTP / WebSocket</span><ArrowDown size={14} /></div>
                <div className="system-stage"><span className="stage-num">02</span><ShieldCheck /><div><strong>Gateway &amp; identity</strong><small>Authenticate. Authorize. Route.</small></div><span className="stage-tag">VERIFY</span></div>
                <div className="system-wire"><span className="wire-packet" /><span>JWT · rate limits · resilience</span><ArrowDown size={14} /></div>
                <div className="system-stage core-stage"><span className="stage-num">03</span><Layers /><div><strong>Spring Boot</strong><small>Where the business logic lives</small></div><span className="stage-tag">PROCESS</span></div>
                <div className="system-wire"><span className="wire-packet" /><span>Queries · events · persistence</span><ArrowDown size={14} /></div>
                <div className="system-data"><span>04</span><strong>MySQL</strong><i /><strong>MongoDB</strong><i /><strong>Redis</strong></div>
              </div>
              <div className="system-footer"><span className="mono">DESIGNED AROUND THE REQUEST.</span><GitBranch size={16} /></div>
            </div>
          </div>
          <div className="hero-bottom"><span><span className="mono">FOCUS</span> Java ecosystem &amp; backend systems</span><a href="#projects">A closer look at the work <ArrowDown size={16} /></a></div>
        </section>

        <section id="projects" className="projects-section section-band" aria-labelledby="projects-heading"><div className="container"><SectionHeading number="01" label="SELECTED WORK" title="Built beyond the happy path." id="projects-heading" aside="THREE PROJECTS. REAL ENGINEERING." /><div className="project-explorer">
          <div className="project-list" role="tablist" aria-label="Select a project">
            {CONTENT.projects.map((item, index) => <Button key={item.id} variant="project" role="tab" id={`tab-${item.id}`} aria-selected={selected === index} aria-controls="project-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
              if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? CONTENT.projects.length - 1 : (index + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + CONTENT.projects.length) % CONTENT.projects.length; setSelected(next); document.getElementById(`tab-${CONTENT.projects[next]?.id}`)?.focus(); }
            }} className={selected === index ? "project-tab selected" : "project-tab"}><span className="project-number">{item.number}</span><span className="project-tab-copy"><small>{item.category}</small><strong>{item.name}</strong></span><ArrowUpRight size={18} /></Button>)}
            <div className="project-list-note"><GitBranch size={17} /><p>Different domains.<br />The same attention to boundaries.</p></div>
          </div>
          <div className="project-panel" id="project-panel" role="tabpanel" aria-labelledby={`tab-${project.id}`} tabIndex={0}><div className="project-content" key={project.id}>
            <div className="project-panel-top"><span className="eyebrow">{project.category}</span><span className="mono">PROJECT / {project.number}</span></div><h3>{project.name}</h3><p className="project-summary">{project.summary}</p><p className="project-description">{project.description}</p><RequestFlow project={project} />
            <div className="engineering-details">{project.details.map((detail, index) => <div key={detail.title}><span className="detail-number mono">0{index + 1}</span><h4>{detail.title}</h4><p>{detail.text}</p></div>)}</div>
            <div className="project-panel-bottom"><div className="tech-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Button variant="link" asChild><a href={project.url} target="_blank" rel="noopener noreferrer">{project.linkLabel}<ArrowUpRight /></a></Button></div>
          </div></div>
        </div></div></section>

        <section className="signal-strip" aria-label="Engineering focus"><div className="container signal-grid"><div><ShieldCheck /><span><strong>Security at the boundary</strong><small>JWT · RBAC · room authorization</small></span></div><div><Radio /><span><strong>State that stays in sync</strong><small>Real-time events · reconnect catch-up</small></span></div><div><GitBranch /><span><strong>Failure is part of the flow</strong><small>Rate limits · circuit breakers · tracing</small></span></div></div></section>

        <section id="stack" className="container stack-section" aria-labelledby="stack-heading"><SectionHeading number="02" label="THE TOOLKIT" title="A focused stack. Connected thinking." id="stack-heading" /><div className="stack-grid">{CONTENT.stack.map((group, index) => <div className="stack-group" key={group.label}><div className="stack-group-heading"><span className="mono">{group.label}</span><span className="stack-index">0{index + 1}</span></div><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></section>

        <section id="about" className="section-band about-section" aria-labelledby="about-heading"><div className="container about-grid"><div><span className="section-label"><span>03 /</span> THE ENGINEER</span><h2 id="about-heading">Curious about how<br />systems hold together.</h2><p className="about-text">I’m {CONTENT.name}, an Information Science and Engineering student focused on Java and the Spring ecosystem.</p><p className="about-text">My projects explore what happens behind a working interface: who can access a resource, how state is synchronized, and what a request does when a dependency fails.</p><a className="inline-link" href={CONTENT.links.leetcode} target="_blank" rel="noopener noreferrer">Find me on LeetCode <ArrowUpRight size={16} /></a></div><div className="education"><div className="education-top"><span className="mono">EDUCATION</span><span className="education-year">’28</span></div><h3>{CONTENT.education.institute}</h3><p>{CONTENT.education.degree}</p><div className="education-bottom"><span>{CONTENT.education.location}, India</span><span>{CONTENT.education.semester}<span className="status-dot" /></span></div><div className="education-graduation mono">EXPECTED GRADUATION / {CONTENT.education.graduation}</div></div></div></section>

        <section id="contact" className="container contact-section" aria-labelledby="contact-heading"><span className="section-label"><span>04 /</span> START A CONVERSATION</span><div className="contact-heading-row"><h2 id="contact-heading">Let’s build<br />something solid<span className="heading-period">.</span></h2><ArrowUpRight className="contact-arrow" strokeWidth={1} /></div><div className="contact-bottom"><div><p>Have a backend role or an engineering opportunity in mind?</p><div className="email-row"><a href={`mailto:${CONTENT.email}`}>{CONTENT.email}</a><Button variant="ghost" size="icon" onClick={copyEmail} aria-label="Copy email address" title="Copy email address">{copyState === "copied" ? <Check /> : <Copy />}</Button></div><span role="status" className="copy-status">{copyState === "copied" ? "Email copied to clipboard." : copyState === "error" ? "Couldn’t copy. Select the email, or open it to get in touch." : ""}</span></div><div className="social-links"><a href={CONTENT.links.github} target="_blank" rel="noopener noreferrer"><Github size={17} />GitHub<ArrowUpRight size={16} /></a><a href={CONTENT.links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} />LinkedIn<ArrowUpRight size={16} /></a><a href={CONTENT.links.leetcode} target="_blank" rel="noopener noreferrer"><Code2 size={17} />LeetCode<ArrowUpRight size={16} /></a></div></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><a href="#main" className="wordmark" aria-label="Back to top">pr<span className="brand-dot">.</span></a><span>© {new Date().getFullYear()} {CONTENT.name}</span><span className="mono footer-note">THOUGHTFUL CODE. CLEAR INTENT.</span><a href="#main">Back to top <ArrowUpRight size={15} /></a></div></footer>
    </div>
  );
}

function SectionHeading({ number, label, title, id, aside }: { number: string; label: string; title: string; id: string; aside?: string }) {
  return <div className="section-heading"><div><span className="section-label"><span>{number} /</span> {label}</span><h2 id={id}>{title}</h2></div>{aside && <span className="section-aside mono">{aside}</span>}</div>;
}
