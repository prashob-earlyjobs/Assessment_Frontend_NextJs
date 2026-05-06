import { useState } from 'react'
import { CalendlyEmbed } from './CalendlyEmbed'
import './App.css'
import './index.css'

/** Full event URL from Calendly (Share → Add to Website). Example: https://calendly.com/your-org/30-minute-intro */
const CALENDLY_EVENT_URL ="https://calendly.com/earlyjobs-info/30min";

function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How does EarlyJobs find candidates?",
      answer: "We continuously scan millions of public profiles across LinkedIn, GitHub, and other developer platforms to find candidates that exactly match your role requirements."
    },
    {
      question: "Can I customize the outreach messages?",
      answer: "Absolutely. You can review, edit, and approve all outreach templates before they are sent. Our AI agent, Nina, will then personalize them for each candidate."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most hiring teams start receiving positive replies and interview requests from interested candidates within 24 to 48 hours of activating a search."
    },
    {
      question: "Do I need to pay per hire?",
      answer: "No, we charge a flat subscription fee based on your chosen tier. There are no hidden placement fees or surprise costs when you make a hire."
    }
  ];
  return (
    <div className="app-container">
      <nav className="navbar" aria-label="Primary">
        <div className="layout-contained navbar-inner">
          <a href="#hero" className="navbar-left" aria-label="Huntlo — Home">
            <span className="brand-text">Huntlo</span>
          </a>
          <ul className="navbar-nav">
            <li><a href="#hero">Home</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
      </nav>

      <main id="hero" className="main-content split-layout layout-contained">
        <div className="content-left">
          <h1>
            <span className="headline-line">Stop posting jobs and waiting.</span>
            <br />
            <span className="headline-line headline-line--accent">Start getting candidates who actually reply.</span>
          </h1>
          <p>EarlyJobs finds, reaches out, and brings you interview-ready candidates—within days, not weeks.</p>
          <div className="process-pill">
            JD <span className="arrow">→</span> AI Match <span className="arrow">→</span> Candidates <span className="arrow">→</span> Outreach <span className="arrow">→</span> Interview
          </div>
        </div>
        <div className="right-column-wrapper">
          <div className="content-right">
            <div className="live-status">
              <span className="live-dot"></span> Live
            </div>
            <h2>Don’t wait for candidates. Start outreach immediately</h2>
            <p>Instead of static lists, EarlyJobs runs a real-time hiring pipeline where candidates move from sourcing → interest → interview.</p>

            <div className="search-box">
              <textarea
                placeholder="Tell me who you want to hire — backend engineer in Berlin with 3+ years of experience."
                rows={3}
              ></textarea>
              <div className="search-actions">
                <button className="icon-btn mic-btn" aria-label="Voice input">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                </button>
                <button className="icon-btn submit-btn" aria-label="Submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>
            </div>
          </div>
          {/* <p className="hero-cta-text">Don’t wait for candidates. Start outreach immediately</p> */}
        </div>
      </main>

      <section id="how-it-works" className="features-section layout-contained">
        <div className="features-header">
          <div className="badge">
            <span className="dot"></span> HIGHLIGHTS
          </div>
          <div className="features-title-row">
            <h2>Next-gen features for<br />world-class hiring teams</h2>
            <a
              className="features-cta"
              href={CALENDLY_EVENT_URL || '#book-a-meeting'}
              target={CALENDLY_EVENT_URL ? '_blank' : undefined}
              rel={CALENDLY_EVENT_URL ? 'noopener noreferrer' : undefined}
            >
              Book demo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-graphic graphic-1">
              <div className="mock-card">
                <div className="mock-avatar"></div>
                <div className="mock-info">
                  <strong>Scarlett Blue</strong>
                  <span>Senior Python Developer, Google</span>
                  <div className="mock-meta">
                    <span className="mock-meta-item">
                      <svg className="mock-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12h12" /><path d="M6 16h12" /><path d="M10 6h4" /></svg>
                      10 years
                    </span>
                    <span className="mock-meta-item">
                      <svg className="mock-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      New York, US
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h3>Candidate sourcing that never sleeps</h3>
            <p>EarlyJobs searches every major source in real time, 24/7. You get fresh candidates around the clock.</p>
          </div>

          <div className="feature-card">
            <div className="feature-graphic graphic-2">
              <div className="mock-search">
                <span className="mock-search-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" /></svg>
                </span>
                Make a job description for Python Developer
              </div>
              <div className="mock-subtitle">
                <span className="mock-subtitle-inner">
                  <svg className="mock-subtitle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                  Understanding role requirements
                </span>
              </div>
            </div>
            <h3>Crystal-clear role understanding</h3>
            <p>EarlyJobs understands what you truly need, going beyond keywords to the real requirements.</p>
          </div>

          <div className="feature-card">
            <div className="feature-graphic graphic-3">
              <div className="mock-list-header">
                <svg className="mock-list-header-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                14 candidates showed interest
              </div>
              <div className="mock-list">
                <div className="mock-list-item">
                  <span className="mock-checkbox"></span>
                  <strong>Nancy Smith</strong>
                  <span className="mock-status">I'm interested to know more, po...</span>
                </div>
                <div className="mock-list-item">
                  <span className="mock-checkbox"></span>
                  <strong>David Lee</strong>
                  <span className="mock-status">Interested for the job role.</span>
                </div>
                <div className="mock-list-item">
                  <span className="mock-checkbox"></span>
                  <strong>Christopher</strong>
                  <span className="mock-status">Request to schedule interview</span>
                </div>
                <div className="mock-list-item">
                  <span className="mock-checkbox"></span>
                  <strong>Margaret</strong>
                  <span className="mock-status">I'm interested to know more, po...</span>
                </div>
              </div>
            </div>
            <h3>Outreach that actually gets replies</h3>
            <p>EarlyJobs handles outreach, chats with candidates, follows up, and introduces them to you.</p>
          </div>
        </div>
      </section>

      <section className="narrative-section layout-contained" aria-labelledby="narrative-problem-title">
        <div className="narrative-row">
          <div className="narrative-copy">
            <h2 id="narrative-problem-title" className="narrative-title">Hiring is slowing your team down.</h2>
            <p className="narrative-body">
              Whether you are a hiring manager without a dedicated recruiter or a recruiter juggling too many roles, sourcing still eats hours every week — and every open role slows delivery, execution, and results.
            </p>
          </div>
          <div className="narrative-visual" aria-hidden>
            <div className="nv-panel nv-panel--search">
              <div className="nv-search-head">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                <span>Search for candidates</span>
              </div>
              <div className="nv-metrics-grid">
                <div className="nv-metric">
                  <span className="nv-metric-label">Preliminary screening</span>
                  <span className="nv-metric-value">88</span>
                </div>
                <div className="nv-metric nv-metric--highlight">
                  <span className="nv-metric-glow" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" /></svg>
                  </span>
                  <span className="nv-metric-label">Detailed analysis</span>
                  <span className="nv-metric-value">64</span>
                </div>
                <div className="nv-metric">
                  <span className="nv-metric-label">Good match</span>
                  <span className="nv-metric-value">22</span>
                </div>
                <div className="nv-metric">
                  <span className="nv-metric-label">Perfect match</span>
                  <span className="nv-metric-value">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="narrative-section layout-contained" aria-labelledby="narrative-solution-title">
        <div className="narrative-row narrative-row--reverse">
          <div className="narrative-copy">
            <h2 id="narrative-solution-title" className="narrative-title">Hire smarter, not harder.</h2>
            <p className="narrative-body">
              EarlyJobs and Nina, your AI hiring agent, remove sourcing friction so you spend time on candidates who actually move the needle — from first match to first interview.
            </p>
          </div>
          <div className="narrative-visual" aria-hidden>
            <div className="nv-panel nv-panel--matches">
              <div className="nv-match-card">
                <span className="nv-match-tag">Career</span>
                <span className="nv-match-label">Professional background match</span>
                <div className="nv-match-ring nv-match-ring--95">
                  <span>95%</span>
                </div>
              </div>
              <div className="nv-match-card">
                <span className="nv-match-tag">Skills</span>
                <span className="nv-match-label">Core skills alignment</span>
                <div className="nv-match-ring nv-match-ring--88">
                  <span>88%</span>
                </div>
              </div>
              <div className="nv-match-card">
                <span className="nv-match-tag">Education</span>
                <span className="nv-match-label">Educational fit</span>
                <div className="nv-match-ring nv-match-ring--49">
                  <span>49%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="narrative-section layout-contained" aria-labelledby="narrative-results-title">
        <div className="narrative-row">
          <div className="narrative-copy">
            <h2 id="narrative-results-title" className="narrative-title">What teams see with EarlyJobs</h2>
            <ul className="narrative-bullets">
              <li>Most teams schedule first interviews within 24–48 hours of going live</li>
              <li>Replies start landing within hours, not weeks, after outreach begins</li>
              <li>Faster pipeline than manual sourcing across LinkedIn, GitHub, and the web</li>
              <li>Higher response rates when Nina personalizes every touchpoint</li>
            </ul>
          </div>
          <div className="narrative-visual" aria-hidden>
            <div className="nv-panel nv-panel--dash">
              <div className="nv-chart">
                <svg viewBox="0 0 200 56" className="nv-chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="nvLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--orange-400)" />
                      <stop offset="100%" stopColor="var(--orange-600)" />
                    </linearGradient>
                  </defs>
                  <path
                    className="nv-chart-line"
                    d="M4 42 C 36 8, 72 52, 104 28 S 168 12, 196 6"
                    fill="none"
                    stroke="url(#nvLineGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="nv-chart-axis">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                </div>
              </div>
              <div className="nv-dash-stats">
                <div className="nv-dash-stats-title">Aggregate sequence stats</div>
                <div className="nv-dash-kpis">
                  <div><em>42</em><span>Total / week</span></div>
                  <div><em>28</em><span>Active</span></div>
                  <div><em>14</em><span>Finished</span></div>
                </div>
                <div className="nv-dash-rates">
                  <div><span>Open rate</span><strong>76%</strong></div>
                  <div><span>Reply rate</span><strong>38%</strong></div>
                  <div><span>Click rate</span><strong>45%</strong></div>
                </div>
              </div>
              <div className="nv-dash-list">
                <div className="nv-dash-list-title">Email sequences</div>
                <div className="nv-dash-list-row">
                  <span className="nv-dash-dot" />
                  Account manager — outbound v2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="booking-section layout-contained" id="book-a-meeting" aria-labelledby="booking-heading">
        <div className="booking-card">
          <div className="booking-copy">
            <div className="badge">
              <span className="dot"></span> Book a call
            </div>
            <h2 id="booking-heading">See EarlyJobs on a quick walkthrough</h2>
            <p className="booking-lede">
              Pick a time that works for you. We will walk through sourcing, Nina outreach, and how your team gets to interviews faster — no pitch deck required.
            </p>
            <ul className="booking-perks">
              <li>
                <span className="booking-perk-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                30-minute live demo, tailored to your roles
              </li>
              <li>
                <span className="booking-perk-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                Same calendar tool we use for customers — instant confirmation
              </li>
              <li>
                <span className="booking-perk-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                Video or phone — your choice when you book
              </li>
            </ul>
            <div className="booking-actions">
              {CALENDLY_EVENT_URL ? (
                <p className="booking-note">
                  <span className="booking-note-wide">Use the calendar on the right to pick a time. </span>
                  <span className="booking-note-narrow">Pick a time in the Calendly calendar below. </span>
                  <a
                    className="booking-calendly-external"
                    href={CALENDLY_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Calendly in a new tab
                  </a>{' '}
                  if the embed is blocked.
                </p>
              ) : (
                <p className="booking-note">Set <code className="booking-calendly-code">VITE_CALENDLY_EVENT_URL</code> to show the live calendar.</p>
              )}
            </div>
          </div>

          <div className="booking-calendly-wrap">
            <div className="booking-calendly-chrome">
              <span className="booking-calendly-badge">Calendly</span>
            </div>
            <CalendlyEmbed eventUrl={CALENDLY_EVENT_URL} />
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section layout-contained">
        <div className="features-header">
          <div className="badge">
            <span className="dot"></span> PRICING
          </div>
          <h2>Flexible pricing for<br />every team</h2>
        </div>

        <div className="pricing-grid">
          {/* Card 1: Free */}
          <div className="pricing-card highlighted">
            <div className="pricing-tier">Free</div>
            <div className="pricing-price">
              <span className="price-value">$0</span>
              <span className="price-period">annually</span>
            </div>
            <p className="pricing-desc">Get started with Nina at no cost</p>
            <ul className="pricing-features">
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                1 active role
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </span>
                100 candidates sourcing details
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                Sourcing available
              </li>
            </ul>
            <button className="pricing-btn">Basic Plan</button>
          </div>

          {/* Card 2: Starter */}
          <div className="pricing-card">
            <div className="pricing-tier">Starter</div>
            <div className="pricing-price">
              <span className="price-value">$99</span>
              <span className="price-period">per seat / month</span>
            </div>
            <p className="pricing-desc">Perfect for individuals and small teams.</p>
            <ul className="pricing-features">
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                2 active roles
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                200 outreach emails
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </span>
                200 candidates sourcing details
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                Sourcing available
              </li>
            </ul>
            <button className="pricing-btn">Premium Plan</button>
          </div>

          {/* Card 3: Growth */}
          <div className="pricing-card">
            <div className="popular-badge">Popular</div>
            <div className="pricing-tier">Growth</div>
            <div className="pricing-price">
              <span className="price-value">$149</span>
              <span className="price-period">per seat / month</span>
            </div>
            <p className="pricing-desc">Best for growing teams and projects.</p>
            <ul className="pricing-features">
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                10 active roles
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                1000 outreach emails
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </span>
                1000 candidates sourcing details
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </span>
                Nina chats with candidate for you
              </li>
              <li>
                <span className="icon-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                Sourcing available
              </li>
            </ul>
            <button className="pricing-btn">Gold Plan</button>
          </div>
        </div>
      </section>

      <section className="enterprise-section layout-contained">
        <div className="enterprise-container">
          <div className="enterprise-content">
            <h2>For enterprise plan</h2>
            <p>In search of a custom offer? Custom pricing, custom emails and dedicated support for your organisation.</p>
          </div>
          <button className="enterprise-btn">Contact for pricing</button>
        </div>
      </section>

      <section className="faq-section layout-contained">
        <div className="faq-container">
          <div className="faq-left">
            <div className="badge">
              <span className="dot"></span> FAQ
            </div>
            <h2>Common <span className="text-highlight">questions</span></h2>
            <p className="faq-subtitle">Everything you need to know about how EarlyJobs works and how it helps you hire faster.</p>
          </div>

          <div className="faq-right">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faq-accordion-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <div className="faq-question-content">
                    <span className="faq-number">0{index + 1}</span>
                    <h3>{item.question}</h3>
                  </div>
                  <span className="faq-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App


