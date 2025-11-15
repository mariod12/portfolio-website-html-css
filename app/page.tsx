'use client';

import { useEffect, useState } from 'react';
import './styles.css';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkModeEnabled = savedMode ? JSON.parse(savedMode) : prefersDark;
    
    setIsDarkMode(darkModeEnabled);
    if (darkModeEnabled) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Form handling for frontend-only contact form
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;

    if (contactForm) {
      contactForm.addEventListener('submit', function (e: Event) {
        e.preventDefault();

        // Get form values
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const messageInput = document.getElementById('message') as HTMLTextAreaElement;

        const name = nameInput?.value;
        const email = emailInput?.value;
        const message = messageInput?.value;

        // Simple validation
        if (!name || !email || !message) {
          alert('Please fill in all fields');
          return;
        }

        // Show success message (frontend only)
        alert(
          `Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`
        );

        // Reset form
        contactForm.reset();
      });
    }

    // Smooth scroll behavior (enhanced)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e: Event) {
        const href = (this as HTMLAnchorElement).getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });

    // Add animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'fadeInUp 0.6s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe skill cards and education items
    document.querySelectorAll('.skill-card, .skill-item, .cert-item, .education-item, .language-card').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <a href="#home" className="logo">
              Mario Villanueva
            </a>
            <div className="nav-right">
              <ul className="nav-links">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#skills">Skills</a>
                </li>
                <li>
                  <a href="#education">Education</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="profile-section">
              <img src="/avatar.jpg" alt="Mario Villanueva" className="profile-image" />
              <h1>Mario Villanueva</h1>
              <p className="subtitle">Systems Engineer</p>
              <div className="hero-buttons">
                <a href="#contact" className="btn btn-primary">
                  Get in Touch
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I&apos;m a Systems Engineering graduate from UNAH with a strong foundation in software
                development and database management. I&apos;m passionate about building scalable solutions and
                solving complex technical challenges.
              </p>
              <p>
                My approach combines responsibility, adaptability, and problem-solving skills to deliver
                high-quality work. I&apos;m always eager to learn new technologies and best practices in the
                ever-evolving tech landscape.
              </p>
            </div>
            <div className="traits">
              <h3>Key Traits</h3>
              <ul className="traits-list">
                <li>Responsible & Disciplined</li>
                <li>Problem-Solving Oriented</li>
                <li>Highly Adaptable</li>
                <li>Strong Teamwork Skills</li>
                <li>Resilient & Persistent</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2>Technical Knowledge</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Databases</h3>
              <ul>
                <li>MySQL</li>
                <li>SQL Server</li>
                <li>Database Modeling</li>
                <li>Data Management</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Programming Languages</h3>
              <ul>
                <li>Java</li>
                <li>Python</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Soft Skills</h3>
              <ul>
                <li>Problem-Solving</li>
                <li>Teamwork</li>
                <li>Communication</li>
                <li>Adaptability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="languages">
        <div className="container">
          <h2>Languages</h2>
          <div className="languages-grid">
            <div className="language-card">
              <h3>Spanish</h3>
              <p className="level">Native Speaker</p>
            </div>
            <div className="language-card">
              <h3>English</h3>
              <p className="level">B2 Level</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          
          <div className="education-content">
            <div className="education-item main">
              <div className="edu-icon">🎓</div>
              <div className="edu-details">
                <h3>BSc in Systems Engineering</h3>
                <p className="institution">UNAH - Universidad Nacional Autónoma de Honduras</p>
                <p className="description">
                  Comprehensive education in software development, database design, and IT systems
                </p>
              </div>
            </div>

            <h3 className="certs-title">Courses & Certifications</h3>
            <div className="certifications-list">
              <div className="cert-item">
                <span className="cert-name">Python Essentials</span>
                <span className="cert-provider">Cisco Academy</span>
              </div>
              <div className="cert-item">
                <span className="cert-name">Programming with Python</span>
                <span className="cert-provider">Infop</span>
              </div>
              <div className="cert-item">
                <span className="cert-name">MySQL Databases</span>
                <span className="cert-provider">Infop</span>
              </div>
              <div className="cert-item">
                <span className="cert-name">HTML Web desing</span>
                <span className="cert-provider">Infop</span>
              </div>
              <div className="cert-item">
                <span className="cert-name">Communicative English</span>
                <span className="cert-provider">UJCV</span>
              </div>
              <div className="cert-item">
                <span className="cert-name">Information Technologies</span>
                <span className="cert-provider">HP Life</span>
              </div>
              <div className="cert-item">
                <span className="cert-name">Stragic planning</span>
                <span className="cert-provider">HP Life</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Let&apos;s Connect</h2>
          <p className="contact-intro">
            I&apos;d love to hear from you. Feel free to reach out for opportunities or just to say hello!
          </p>

          <div className="contact-info certifications-list">
            <div className="info-item cert-item">
              <h4>Email</h4>
              <a href="mailto:mariobarrimb@gmail.com">mariobarrimb@gmail.com</a>
            </div>
            <div className="info-item cert-item">
              <h4>WhatsApp</h4>
              <a href="https://wa.me/50496108198" target="_blank" rel="noopener noreferrer">+504 9610-8198</a>
            </div>
            <div className="info-item cert-item">
              <h4>LinkedIn</h4>
              <a href="https://www.linkedin.com/in/mario-villanueva-026955257/" target="_blank" rel="noopener noreferrer">View Profile</a>
            </div>
            <div className="info-item cert-item">
              <h4>Location</h4>
              <p>Honduras, Tegucigalpa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mario Villanueva. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
