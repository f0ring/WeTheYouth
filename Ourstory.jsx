import React from "react";

export default function OurStory() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f9fafb", color: "#1e293b" }}>
      {/* Hero Section */}
      <header style={{ padding: "50px 20px", textAlign: "center", background: "#2563eb", color: "white" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Our Story: We The Youth</h1>
        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          A youth-led community empowering students through education, technology, and social action.
        </p>
      </header>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "30px 20px" }}>
        {/* Mission & Vision */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>🌍 Mission & Vision</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={cardStyle}>
              <h3>Our Mission</h3>
              <p>To empower youth through education, technology, and social action.</p>
            </div>
            <div style={cardStyle}>
              <h3>Our Vision</h3>
              <p>A generation of changemakers who lead with empathy, knowledge, and courage.</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>💡 Our Values</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li><b>Integrity</b> – আমরা সত্য ও ন্যায়ের পক্ষে।</li>
            <li><b>Collaboration</b> – একসাথে কাজ করলে বড় কিছু করা যায়।</li>
            <li><b>Innovation</b> – নতুন নতুন আইডিয়া ও টেকনোলজি ব্যবহার।</li>
            <li><b>Compassion</b> – সমাজের দুর্বল মানুষের পাশে দাঁড়ানো।</li>
            <li><b>Sustainability</b> – প্রকৃতি ও পরিবেশ রক্ষা।</li>
          </ul>
        </section>

        {/* Achievements */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>🏆 Achievements</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={cardStyle}>🎓 200+ শিক্ষার্থী আমাদের coding bootcamp শেষ করেছে।</div>
            <div style={cardStyle}>📚 500+ বই গ্রামে গ্রামে বিতরণ করা হয়েছে।</div>
            <div style={cardStyle}>🏥 5টি health camp আয়োজন করা হয়েছে।</div>
            <div style={cardStyle}>🌱 1000+ গাছ রোপণ করা হয়েছে।</div>
          </div>
        </section>

        {/* Upcoming Projects */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>🚀 Upcoming Projects</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li>Youth Leadership Camp 2025 – শিক্ষার্থীদের soft skills উন্নয়ন।</li>
            <li>Tech for Good Hackathon – সমাজের সমস্যার সমাধান কোড দিয়ে।</li>
            <li>Clean Dhaka Campaign – পরিবেশ রক্ষা ও সচেতনতা তৈরি।</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>🌟 Testimonials</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <blockquote style={cardStyle}>
              "We The Youth gave me the confidence to start my own coding journey."
              <br />– Ayesha, Student
            </blockquote>
            <blockquote style={cardStyle}>
              "The health camp saved my father’s life with an early checkup."
              <br />– Rahim, Villager
            </blockquote>
            <blockquote style={cardStyle}>
              "I never thought learning could be this fun until I joined their program."
              <br />– Tanvir, Volunteer
            </blockquote>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>🙌 Join Us</h2>
          <p>Become a volunteer, sponsor a project, or follow us on social media.</p>
          <button style={btnStyle}>Become a Volunteer</button>
          <button style={{ ...btnStyle, background: "#16a34a" }}>Donate</button>
          <button style={{ ...btnStyle, background: "#f97316" }}>Partner With Us</button>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: "#1e293b", color: "white", textAlign: "center", padding: "20px" }}>
        <p>📍 Dhaka, Bangladesh • 📧 hello@wetheyouth.org</p>
        <p>© {new Date().getFullYear()} We The Youth • Built with React</p>
      </footer>
    </div>
  );
}

/* Reusable Styles */
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const btnStyle = {
  padding: "12px 20px",
  margin: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
};
