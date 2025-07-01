// ...other imports
// Your usual ConvertX imports here
import { Html } from "@elysiajs/html";
export default function RootPage(props) {
  // ...your code

  return (
    <>
      <Header ... />
      <main className="w-full flex-1 px-2 sm:px-4">
        {/* ...ConvertX upload UI and other elements... */}

        {/* Convert button */}
        <form method="post" action={`${WEBROOT}/convert`} className="relative mx-auto mb-[35vh] w-full max-w-4xl">
          {/* ...other fields... */}
          <input
            className="w-full btn-primary opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            value="Convert"
            disabled={false /* or your logic */}
          />
        </form>

        {/* PROMO SECTION: Put immediately after the Convert button/form */}
        <section style={{
          maxWidth: "700px",
          margin: "24px auto 0 auto",
          background: "#172133",
          borderRadius: "18px",
          padding: "2.5rem 2rem",
          boxShadow: "0 2px 16px rgba(20,30,40,0.13)",
          color: "#eef1f7"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "2.1rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#a4d037"
          }}>
            Free Online Converter
          </h2>
          <p style={{
            fontSize: "1.2rem",
            textAlign: "center",
            marginBottom: "1.4rem"
          }}>
            Instantly convert files between 1000+ formats—images, documents, audio, video, ebooks, and more. Our secure, privacy-first tool works right in your browser—no registration required!
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem"
          }}>
            <div style={{ flex: 1, minWidth: "170px" }}>
              <strong style={{ color: "#77e6b6" }}>✨ Easy to Use:</strong>
              <span> Just upload or drag and drop your files, choose a format, and convert with a single click.</span>
            </div>
            <div style={{ flex: 1, minWidth: "170px" }}>
              <strong style={{ color: "#fdc06f" }}>🔒 Private &amp; Secure:</strong>
              <span> Your files never leave our servers. All conversions are processed instantly and automatically deleted.</span>
            </div>
            <div style={{ flex: 1, minWidth: "170px" }}>
              <strong style={{ color: "#79b5fe" }}>🚀 Lightning Fast:</strong>
              <span> Enjoy quick, hassle-free conversions—even with large images, PDFs, audio, or videos.</span>
            </div>
            <div style={{ flex: 1, minWidth: "170px" }}>
              <strong style={{ color: "#ffa3b0" }}>🆓 100% Free:</strong>
              <span> No limits, no hidden costs, and no signup required for basic conversions.</span>
            </div>
          </div>
          <p style={{ fontSize: "1.05rem", textAlign: "center" }}>
            Whether you need to change an image from PNG to JPG, convert a DOCX to PDF, extract audio from a video, or batch convert e-books—our Free Online Converter is here for you.
          </p>
          <div style={{ marginTop: "1.4rem", textAlign: "center" }}>
            <a href="#dropzone" style={{
              background: "#a4d037",
              color: "#111",
              padding: "0.8em 2.2em",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "1.2rem",
              textDecoration: "none",
              transition: "background 0.15s"
            }}>Try it now!</a>
          </div>
        </section>

        {/* ...rest of your content (history, etc.) */}
      </main>
    </>
  );
}
