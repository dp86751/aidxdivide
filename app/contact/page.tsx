export default function ContactPage() {
  return (
    <main
      style={{
        padding: "3rem 1.5rem",
        maxWidth: 800,
        margin: "0 auto",
        color: "#0f172a",
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Contact</h1>

      <p style={{ lineHeight: 1.7, color: "#334155", marginBottom: "1.5rem" }}>
        Have questions, feedback, or need support?  
        Feel free to reach out directly. I’m always open to helping others learn 
        more about artificial intelligence, digital skills, or any topic 
        covered on this website.
      </p>

      <div
        style={{
          border: "1px solid #444",
          borderRadius: 12,
          padding: "1.5rem",
          background: "#1f1f1f",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ marginBottom: 10, fontSize: 22, color: "#0f172a" }}>Contact Information</h2>

        <p style={{ margin: "6px 0", color: "#d0d0d0" }}>
          <strong>Name:</strong> Daniel Pierre
        </p>

        <p style={{ margin: "6px 0", color: "#d0d0d0" }}>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:dp86751@gmail.com"
            style={{ color: "#87cefa", textDecoration: "underline" }}
          >
            dp86751@gmail.com
          </a>
        </p>
      </div>

      <section>
        <h2 style={{ fontSize: 22, marginBottom: 10 }}>What You Can Contact Me About</h2>
        <ul style={{ lineHeight: 1.8, color: "#334155" }}>
          <li>Questions about AI or digital literacy</li>
          <li>Help understanding resources on the site</li>
          <li>Suggestions for new tools or learning materials</li>
          <li>General feedback or improvements</li>
        </ul>
      </section>
    </main>
  );
}

