// src/OurStory.jsx
import React, { useState } from "react";

export default function OurStory() {
  const [theme, setTheme] = useState("light");

  const ui = {
    light: {
      bg: "#f8fafc",
      card: "#ffffff",
      text: "#0f172a",
      sub: "#334155",
      accent: "#2563eb",
      border: "#e2e8f0",
      chip: "#eff6ff",
    },
    dark: {
      bg: "#0b1220",
      card: "#0f172a",
      text: "#e2e8f0",
      sub: "#94a3b8",
      accent: "#60a5fa",
      border: "#1f2937",
      chip: "#111827",
    },
  }[theme];

  const timeline = [
    { year: "2022", title: "শুরু", desc: "We The Youth—কয়েকজন বন্ধুর ছোট্ট উদ্যোগ।" },
    { year: "2023", title: "কমিউনিটি", desc: "৫০+ স্বেচ্ছাসেবী, ১,০০০+ শিক্ষার্থী পৌঁছানো।" },
    { year: "2024", title: "প্রকল্প", desc: "স্বাস্থ্য ক্যাম্প, কোডিং বুটক্যাম্প, বুক ড্রাইভ।" },
    { year: "2025", title: "প্রভাব", desc: "স্থানীয় অংশীদার ও ওপেন-সোর্স রিসোর্স লাইব্রেরি।" },
  ];

  const actions = [
    { label: "Volunteer", href: "#volunteer" },
    { label: "Donate", href: "#donate" },
    { label: "Partner with us", href: "#partner" },
  ];

  const chip = (text) => (
    <span
      key={text}
      style={{
        display: "inline-block",
        padding: "6px 10px",
        background: ui.chip,
        border: `1px solid ${ui.border}`,
        borderRadius: 999,
        fontSize: 12,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      {text}
    </span>
  );

  return (
    <div style={{ background: ui.bg, minHeight: "100vh", color: ui.text }}>
      {/* Top bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: ui.card,
          borderBottom: `1px solid ${ui.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo color={ui.accent} />
            <strong style={{ fontSize: 18 }}>We The Youth</strong>
          </div>

          <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
            <a href="#story" style={{ color: ui.sub, textDecoration: "none" }}>
              Our Story
            </a>
            <a href="#projects" style={{ color: ui.sub, textDecoration: "none" }}>
              Projects
            </a>
            <a href="#team" style={{ color: ui.sub, textDecoration: "none" }}>
              Team
            </a>
            <a href="#contact" style={{ color: ui.sub, textDecoration: "none" }}>
              Contact
            </a>
          </nav>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{
              padding: "8px 12px",
              background: ui.accent,
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "64px 20px 24px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 28,
        }}
      >
        <div>
          <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: 0 }}>
            Our Story: <span style={{ color: ui.accent }}>We The Youth</span>
          </h1>
          <p style={{ color: ui.sub, marginTop: 12, fontSize: 16 }}>
            We’re a youth-led community empowering students with skills, service,
            and solidarity. From coding clubs to clean-ups—we build, we learn, we give back.
          </p>

          <div style={{ marginTop: 18 }}>
            {["Education", "Health", "Environment", "Open Source", "Community"].map(chip)}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: `1px solid ${ui.border}`,
                  background: ui.card,
                  color: ui.text,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {a.label} →
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            background: ui.card,
            border: `1px solid ${ui.border}`,
            borderRadius: 16,
            padding: 18,
          }}
        >
          <img
            alt="Youth working together"
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop"
            style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 12 }}
          />
          <p style={{ color: ui.sub, marginTop: 10, fontSize: 13 }}>
            “When youth lead, communities thrive.”
          </p>
        </div>
      </section>

      {/* Story / Timeline */}
      <section id="story" style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 20px 40px" }}>
        <div
          style={{
            background: ui.card,
            border: `1px solid ${ui.border}`,
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 24 }}>How it started → where we are</h2>
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 16,
            }}
          >
            {timeline.map((t) => (
              <div
                key={t.year}
                style={{
                  border: `1px solid ${ui.border}`,
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 12, color: ui.sub }}>{t.year}</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{t.title}</div>
                <div style={{ color: ui.sub, fontSize: 14, marginTop: 6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 40px" }}>
        <h2 style={{ fontSize: 24, marginBottom: 14 }}>Projects</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 16,
          }}
        >
          {[
            {
              title: "Coding Bootcamp",
              desc: "Intro to web & Flutter for college students.",
              img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
            },
            {
              title: "Health Camp",
              desc: "Basic checkups & awareness with local clinics.",
              img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
            },
            {
              title: "Book Drive",
              desc: "Collect, catalog, and donate to rural schools.",
              img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
            },
          ].map((p) => (
            <article
              key={p.title}
              style={{
                background: ui.card,
                border: `1px solid ${ui.border}`,
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
              <div style={{ padding: 14 }}>
                <h3 style={{ margin: "0 0 6px 0" }}>{p.title}</h3>
                <p style={{ color: ui.sub, margin: 0 }}>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 40px" }}>
        <h2 style={{ fontSize: 24, marginBottom: 14 }}>Team</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 16,
          }}
        >
          {[
            { name: "Nushrat Yeasmin Nahin", role: "Coordinator", img: "https://i.pravatar.cc/150?img=12" },
            { name: "Ayaan", role: "Programs Lead", img: "https://i.pravatar.cc/150?img=5" },
            { name: "Mahi", role: "Tech Lead", img: "https://i.pravatar.cc/150?img=16" },
            { name: "Rafi", role: "Ops", img: "https://i.pravatar.cc/150?img=22" },
          ].map((m) => (
            <div
              key={m.name}
              style={{
                background: ui.card,
                border: `1px solid ${ui.border}`,
                borderRadius: 16,
                padding: 14,
                textAlign: "center",
              }}
            >
              <img
                src={m.img}
                alt={m.name}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 10,
                }}
              />
              <div style={{ fontWeight: 700 }}>{m.name}</div>
              <div style={{ color: ui.sub, fontSize: 13 }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section
        id="volunteer"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px 40px",
        }}
      >
        <div
          style={{
            background: ui.card,
            border: `1px solid ${ui.border}`,
            borderRadius: 16,
            padding: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div>
            <h2 style={{ marginTop: 0 }}>Join as a Volunteer</h2>
            <p style={{ color: ui.sub, marginTop: 8 }}>
              Mentor a student, host a workshop, or lead a community event.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for volunteering! We’ll reach out soon.");
              }}
            >
              <input
                required
                placeholder="Your name"
                style={inputStyle(ui)}
                name="name"
              />
              <input
                required
                placeholder="Email"
                type="email"
                style={inputStyle(ui)}
                name="email"
              />
              <button type="submit" style={primaryBtn(ui)}>
                Sign up
              </button>
            </form>
          </div>
          <div id="donate">
            <h2 style={{ marginTop: 0 }}>Support with a Donation</h2>
            <p style={{ color: ui.sub, marginTop: 8 }}>
              Your gift funds supplies, scholarships, and community drives.
            </p>
            <button
              onClick={() => alert("Donation link coming soon!")}
              style={secondaryBtn(ui)}
            >
              Donate now
            </button>
            <div id="partner" style={{ marginTop: 16 }}>
              <h3 style={{ margin: "18px 0 8px" }}>Partner With Us</h3>
              <p style={{ color: ui.sub, marginTop: 0 }}>
                Schools, NGOs, and companies can co-host programs & internships.
              </p>
              <button
                onClick={() => alert("Partner proposal sent!")}
                style={primaryBtn(ui)}
              >
                Send proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px 60px",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>Contact</h2>
        <div
          style={{
            background: ui.card,
            border: `1px solid ${ui.border}`,
            borderRadius: 16,
            padding: 20,
          }}
        >
          <p style={{ color: ui.sub, marginTop: 0 }}>
            Dhaka, Bangladesh • hello@wetheyouth.org
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#" style={linkBtn(ui)}>Facebook</a>
            <a href="#" style={linkBtn(ui)}>Instagram</a>
            <a href="#" style={linkBtn(ui)}>GitHub</a>
          </div>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          color: ui.sub,
          padding: "24px 16px 40px",
          borderTop: `1px solid ${ui.border}`,
        }}
      >
        © {new Date().getFullYear()} We The Youth • Built with React
      </footer>
    </div>
  );
}

/* -------- helpers -------- */
function inputStyle(ui) {
  return {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${ui.border}`,
    background: "transparent",
    color: ui.text,
    marginBottom: 10,
    outline: "none",
  };
}

function primaryBtn(ui) {
  return {
    padding: "10px 14px",
    background: ui.accent,
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  };
}

function secondaryBtn(ui) {
  return {
    padding: "10px 14px",
    background: "transparent",
    color: ui.text,
    border: `1px solid ${ui.accent}`,
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  };
}

function linkBtn(ui) {
  return {
    display: "inline-block",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 10,
    border: `1px solid ${ui.border}`,
    background: ui.card,
    color: ui.text,
    fontWeight: 600,
  };
}

function Logo({ color = "#2563eb", size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="We The Youth logo"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" stroke={color} strokeWidth="2" />
      <path d="M7 8l2.5 8L12 8l2.5 8L17 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
