import React, { useEffect, useState } from 'react';

const pages = [
  { key: 'home', label: 'Home' },
  { key: 'builds', label: 'Our Builds' },
  { key: 'approach', label: 'Our Approach' },
  { key: 'story', label: 'Our Story' },
  { key: 'contact', label: 'Contact Us' }
];

const buildProjects = [
  { title: 'Modern Farmhouse', image: '/images/house1.png', description: 'Crisp lines, warm natural textures, and welcoming family-first layouts for Indianapolis-area living.' },
  { title: 'Modern Custom', image: '/images/house2.png', description: 'Clean architecture, expansive glass, and bold contemporary detailing tailored to urban and infill lots.' },
  { title: 'Classic Farmhouse', image: '/images/house1.png', description: 'Timeless farmhouse character with updated finishes, functional flow, and durable everyday comfort.' },
  { title: 'Barndominium-Inspired', image: '/images/barndominium-inspired.png', description: 'Open-plan living, strong rooflines, and practical luxury shaped for clients who want something distinctive.' }
];

const testimonials = [
  {
    quote: 'Blankenship made the process feel calm from day one. We always knew what came next, and the craftsmanship speaks for itself.',
    name: 'The Holland Family'
  },
  {
    quote: 'They listened closely, protected the design, and delivered a home that feels deeply personal to us.',
    name: 'Megan + Chris R.'
  },
  {
    quote: 'Every detail feels intentional. It is rare to find a builder who communicates this clearly and finishes this strong.',
    name: 'The Walker Family'
  }
];

function getPageFromHash() {
  const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
  return pages.some((page) => page.key === rawHash) ? rawHash : 'home';
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(() => getPageFromHash());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach((el) => observer.observe(el));

    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-content, .hero-badge, .hero-stats').forEach((node) => {
        node.classList.add('visible');
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activePage]);

  const navigateTo = (pageKey) => {
    window.location.hash = pageKey === 'home' ? '' : pageKey;
  };

  const handleNavClick = (event, pageKey) => {
    event.preventDefault();
    navigateTo(pageKey);
  };

  const renderPage = () => {
    if (activePage === 'builds') {
      return (
        <section className="page-shell section-padding inner-page-shell">
          <div className="container fade-in-up">
            <div className="page-intro">
              <p className="eyebrow">Our Builds</p>
              <h2>Modern homes designed for downtown Indianapolis and the surrounding areas.</h2>
              <p>We build modern, modern farmhouse, barndominium-inspired, and farmhouse homes with layouts shaped around your lot, your routine, and the way your family wants to live.</p>
            </div>
            <div className="projects-grid">
              {buildProjects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className="project-img-wrapper">
                    <img src={project.image} alt={`${project.title} custom home`} loading="lazy" />
                  </div>
                  <div className="project-info project-info-stacked">
                    <span className="project-number">{index + 1}</span>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'approach') {
      return (
        <section className="page-shell section-padding inner-page-shell approach-page-shell">
          <div className="container approach-page fade-in-up">
            <section className="approach-hero-panel">
              <div className="approach-hero-copy">
                <p className="eyebrow">Our Approach</p>
                <h2>Designed to feel personal. Run to feel steady.</h2>
                <p className="approach-lead">We guide custom homes with a calm, design-led process that keeps decisions clear, communication consistent, and the finished home aligned with how you actually want to live.</p>
                <p className="approach-kicker">Clear communication. Strong design direction. A process that feels composed from the first meeting to the final detail.</p>
              </div>
              <div className="approach-hero-image">
                <img src="/images/house1.png" alt="Modern farmhouse exterior in warm light" loading="lazy" className="parallax-img" />
              </div>
            </section>

            <section className="approach-editorial-grid">
              <div className="approach-editorial-copy">
                <p className="eyebrow">How We Work</p>
                <h3>Less noise. Better decisions.</h3>
                <p>From the first conversation to the last finish selection, we keep the process moving with clarity. You get thoughtful guidance, honest communication, and a home that stays rooted in your priorities instead of drifting into generic builder choices.</p>
              </div>
              <div className="approach-editorial-quote">
                <p>"The goal is not just a beautiful finished home. It is a build experience that feels clear, grounded, and genuinely well led."</p>
              </div>
            </section>

            <section className="approach-timeline">
              <article className="approach-timeline-item">
                <div className="approach-timeline-number">01</div>
                <div className="approach-timeline-content">
                  <h3>Discovery</h3>
                  <p>We start with your lot, lifestyle, design preferences, and investment goals so the project begins with real clarity.</p>
                </div>
              </article>
              <article className="approach-timeline-item">
                <div className="approach-timeline-number">02</div>
                <div className="approach-timeline-content">
                  <h3>Refinement</h3>
                  <p>We shape the home through material direction, layout decisions, and practical tradeoffs that protect both feel and function.</p>
                </div>
              </article>
              <article className="approach-timeline-item">
                <div className="approach-timeline-number">03</div>
                <div className="approach-timeline-content">
                  <h3>Build</h3>
                  <p>During construction, we stay communicative and organized so progress feels visible, manageable, and well led.</p>
                </div>
              </article>
            </section>

            <section className="approach-values-row editorial-values">
              <div className="approach-value-panel">
                <h3>Homes With Point Of View</h3>
                <p>We build modern, modern farmhouse, farmhouse, and barndominium-inspired homes that feel tailored instead of templated.</p>
              </div>
              <div className="approach-value-panel">
                <h3>Guidance Without Pressure</h3>
                <p>You get experienced direction on selections and details without the process feeling overwhelming or overcomplicated.</p>
              </div>
              <div className="approach-value-panel">
                <h3>Craftsmanship That Lasts</h3>
                <p>We care about proportion, material quality, and finish decisions that still feel right long after move-in day.</p>
              </div>
            </section>
          </div>
        </section>
      );
    }

    if (activePage === 'story') {
      return (
        <section className="page-shell section-padding inner-page-shell">
          <div className="container story-layout fade-in-up">
            <div className="story-card">
              <p className="eyebrow">Our Story</p>
              <h2>More than 25 years of building homes with staying power.</h2>
              <p>Blankenship Custom Homes is based in Indianapolis, Indiana, and built on the idea that luxury should feel personal, not performative. We care about proportion, materials, livability, and the trust it takes to guide a family through a custom build.</p>
              <p>That perspective shows up in the details: practical layouts, enduring finishes, transparent communication, and homes that fit downtown Indianapolis and the surrounding areas just as well as they fit the families living in them.</p>
            </div>
            <div className="story-values">
              <div className="value-panel">
                <h3>Design-Led</h3>
                <p>We protect the feel of the home while keeping decisions grounded in real life.</p>
              </div>
              <div className="value-panel">
                <h3>Relationship-Driven</h3>
                <p>You work with a team that is present, responsive, and invested in the outcome.</p>
              </div>
              <div className="value-panel">
                <h3>Built To Last</h3>
                <p>We focus on craftsmanship and materials that age beautifully over time.</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === 'contact') {
      return (
        <section className="page-shell section-padding inner-page-shell">
          <div className="container contact-layout fade-in-up">
            <div className="contact-panel">
              <p className="eyebrow">Contact Us</p>
              <h2>Let's start with your ideas, your lot, and the way you want to live.</h2>
              <p>Whether you already have plans or are just starting to imagine what home could look like in Indianapolis or the surrounding areas, we'd love to talk through the next step.</p>
            </div>
            <div className="contact-card">
              <p><strong>Phone</strong><br /><a href="tel:+15555555555" className="link-animate">(555) 555-5555</a></p>
              <p><strong>Email</strong><br /><a href="mailto:info@blankenshiphomes.com" className="link-animate">info@blankenshiphomes.com</a></p>
              <p><strong>Hours</strong><br />8:00 AM to 4:00 PM, Monday through Friday</p>
              <a href="tel:+15555555555" className="btn btn-primary mt-4">Call Our Team</a>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
        <section className="hero hero-animated">
          <div className="hero-bg" style={{ backgroundImage: "url('/images/hero1.png')" }}></div>
          <div className="hero-orb hero-orb-one"></div>
          <div className="hero-orb hero-orb-two"></div>
          <div className="hero-grid-lines"></div>
          <div className="hero-content fade-in-up">
            <p className="hero-badge fade-in-up">Indianapolis Custom Homes</p>
            <h2 className="h1-style">Building More Than<br />Your Dream Home</h2>
            <p className="hero-copy">Modern, modern farmhouse, barndominium-inspired, and farmhouse homes built in downtown Indianapolis and the surrounding areas with elevated craftsmanship and a steady, well-led process.</p>
            <div className="hero-actions">
              <a href="#builds" className="btn btn-primary" onClick={(event) => handleNavClick(event, 'builds')}>Explore Our Builds</a>
              <a href="#contact" className="btn btn-secondary" onClick={(event) => handleNavClick(event, 'contact')}>Start The Conversation</a>
            </div>
          </div>
          <div className="hero-stats fade-in-up">
            <div><strong>25+</strong><span>years of custom home experience</span></div>
            <div><strong>Indianapolis Based</strong><span>building in the city core and surrounding communities</span></div>
          </div>
        </section>

        <section className="testimonials-section section-padding">
          <div className="container fade-in-up">
            <div className="page-intro testimonials-intro">
              <p className="eyebrow">Testimonials</p>
              <h2>What clients remember most is how the whole experience felt.</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <p className="testimonial-name">{testimonial.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div className="header-container">
          <a href="#" className="logo" onClick={(event) => handleNavClick(event, 'home')}>
            <h1>BLANKENSHIP</h1>
            <span>CUSTOM HOMES</span>
          </a>

          <nav className={`desktop-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li><a href="#builds" className={activePage === 'builds' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'builds')}>Our Builds</a></li>
              <li><a href="#approach" className={activePage === 'approach' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'approach')}>Our Approach</a></li>
              <li><a href="#story" className={activePage === 'story' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'story')}>Our Story</a></li>
              <li><a href="#contact" className={activePage === 'contact' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'contact')}>Contact Us</a></li>
            </ul>
          </nav>

          <div className="header-contact">
            <a href="tel:+15555555555" className="btn btn-outline">(555) 555-5555</a>
          </div>

          <button
            className="mobile-menu-btn"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main className={activePage === 'home' ? '' : 'inner-page-main'}>
        {renderPage()}
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <h2>BLANKENSHIP</h2>
              <span>CUSTOM HOMES</span>
            </div>
            <p className="mt-4">
              Phone: <a href="tel:+15555555555" className="link-animate">(555) 555-5555</a><br />
              Email: <a href="mailto:info@blankenshiphomes.com" className="link-animate">info@blankenshiphomes.com</a><br />
              Hours: 8-4p Monday - Friday
            </p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              {pages.map((page) => (
                <li key={page.key}>
                  <a
                    href={page.key === 'home' ? '#' : `#${page.key}`}
                    className="link-animate"
                    onClick={(event) => handleNavClick(event, page.key)}
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-locations">
            <h4>Build Locations</h4>
            <ul className="locations-list">
              <li>Downtown Indianapolis</li>
              <li>Carmel</li>
              <li>Fishers</li>
              <li>Westfield</li>
              <li>Zionsville</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>&copy; 2026 Blankenship Custom Homes. All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default App;
