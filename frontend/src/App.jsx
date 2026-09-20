import { Routes, Route, Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Brain,
  MapPin,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-nav">
        <Link to="/" className="home-logo">
          <div className="logo-box">C</div>
          <span>CivicAI</span>
        </Link>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>

          <Link to="/dashboard" className="nav-dashboard">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Zap size={15} />
            AI-powered civic intelligence
          </div>

          <h1>
            Turn community problems
            <span> into action.</span>
          </h1>

          <p>
            CivicAI uses artificial intelligence to identify civic and
            environmental problems from images, assess their severity,
            and help communities report them faster.
          </p>

          <div className="hero-buttons">

            <Link to="/report" className="primary-button">
              Report an Issue
              <ArrowRight size={18} />
            </Link>

            <Link to="/dashboard" className="secondary-button">
              Explore Dashboard
            </Link>

          </div>

          <div className="hero-trust">
            <ShieldCheck size={17} />
            Built for smarter, cleaner and safer communities
          </div>

        </div>

        {/* HERO VISUAL */}
        <div className="hero-visual">

          <div className="visual-card">

            <div className="visual-top">
              <span>LIVE AI ANALYSIS</span>
              <span className="live-dot">●</span>
            </div>

            <div
            className="visual-image"
            style={{
              backgroundImage:
                "linear-gradient(145deg, rgba(40,65,54,0.2), rgba(10,30,20,0.55)), url('/civic-issue.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
>              <div className="scan-line"></div>

              <div className="issue-label">
                <span></span>
                Waste accumulation detected
              </div>
            </div>

            <div className="visual-result">

              <div>
                <small>AI DETECTION</small>
                <strong>Overflowing Garbage</strong>
              </div>

              <div className="severity-high">
                HIGH
              </div>

            </div>

            <div className="visual-confidence">
              <span>Confidence</span>
              <strong>98%</strong>
            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats-section">

        <div>
          <strong>AI</strong>
          <span>Powered Analysis</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Community Reporting</span>
        </div>

        <div>
          <strong>3+</strong>
          <span>Issue Categories</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Unified Dashboard</span>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            From a photo to a
            <br />
            meaningful action.
          </h2>

          <p>
            CivicAI simplifies the process of identifying and reporting
            community problems.
          </p>
        </div>

        <div className="steps">

          <div className="step-card">

            <div className="step-number">01</div>

            <div className="step-icon">
              <Camera size={24} />
            </div>

            <h3>Capture</h3>

            <p>
              Upload a photo of a civic or environmental issue.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">02</div>

            <div className="step-icon">
              <Brain size={24} />
            </div>

            <h3>Analyze</h3>

            <p>
              AI identifies the problem, category and severity.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">03</div>

            <div className="step-icon">
              <MapPin size={24} />
            </div>

            <h3>Locate</h3>

            <p>
              Add the location so the issue can be mapped.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">04</div>

            <div className="step-icon">
              <BarChart3 size={24} />
            </div>

            <h3>Track</h3>

            <p>
              Monitor reported issues through the dashboard.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">

        <div className="section-heading">
          <span>WHY CIVICAI</span>

          <h2>
            Technology that helps
            <br />
            communities act.
          </h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card large">

            <div className="feature-icon">
              <Brain size={24} />
            </div>

            <h3>AI-powered detection</h3>

            <p>
              Analyze real-world images and automatically identify
              common civic and environmental problems.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <MapPin size={24} />
            </div>

            <h3>Location-aware reports</h3>

            <p>
              Connect problems with their geographic location.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>

            <h3>Actionable dashboard</h3>

            <p>
              Understand issue trends and severity at a glance.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <div>

          <span>MAKE YOUR COMMUNITY HEARD</span>

          <h2>
            See a problem?
            <br />
            Help solve it.
          </h2>

          <p>
            Report a civic issue in seconds using CivicAI.
          </p>

          <Link to="/report" className="primary-button">
            Report an Issue
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="home-logo">
          <div className="logo-box">C</div>
          CivicAI
        </div>

        <p>
          AI-powered community problem solving.
        </p>

        <span>
          HACKDAY 1.0 • Tech for a Better Tomorrow
        </span>

      </footer>

    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;