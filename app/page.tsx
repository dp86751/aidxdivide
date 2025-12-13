import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: "3rem 1.5rem",
        maxWidth: 960,
        margin: "0 auto",
        color: "#0f172a",
      }}
    >
      {/* Header Section */}
      <section style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>
          Bridging the AI & Digital Divide
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.6, color: "#334155" }}>
          This website was created to help people who feel left behind by
          technology. Many communities unfortunately don’t have easy access to AI tools
           or clear explanations of how modern technology
          actually works.  
          <br /><br />
          Our mission is to provide simple, trustworthy, and easy to use
          learning materials so anyone, regardless of background or culture,can understand
          and benefit from artificial intelligence and basic digital skills.
        </p>
      </section>

      {/* Button Section */}
      <section
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <Link
          href="/signup"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 10,
            border: "1px solid white",
          }}
        >
          Create an Account
        </Link>

        <Link
          href="/login"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 10,
            border: "1px solid gray",
          }}
        >
          Log In
        </Link>

        <Link
          href="/resources"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 10,
            border: "1px solid gray",
          }}
        >
          Browse Resources
        </Link>
      </section>

      {/* What's Here */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>What You’ll Find Here</h2>

        <ul style={{ lineHeight: 1.8, color: "#334155" }}>
          <li>Beginner-friendly explanations of artificial intelligence.</li>
          <li>Links to trustworthy free or low-cost courses and tutorials.</li>
          <li>Hands-on tools to help users understand AI safely.</li>
          <li>
            Resources about digital skills, internet access, and tech basics.
          </li>
          <li>
            Guides made for students, adults, parents, and first-time computer
            users.
          </li>
        </ul>
      </section>

      {/* Who It's For */}
      <section>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>Who This Website Helps</h2>
        <p style={{ lineHeight: 1.6, color: "#334155" }}>
          This site is designed for anyone who feels overwhelmed by technology
          or unsure where to start. Whether you’re a student trying to learn new
          skills, an adult catching up with modern tools, or someone who wants
          to understand AI without complicated language—this platform makes the
          journey simple and stress-free.
        </p>
      </section>
    </main>
  );
}
