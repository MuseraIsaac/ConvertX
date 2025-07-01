import { Html } from "@elysiajs/html";
import { version } from "../../package.json";

export const BaseHtml = ({
  children,
  title = "Free Conversion Tool",
  webroot = "",
}: {
  children: JSX.Element;
  title?: string;
  webroot?: string;
}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="webroot" content={webroot} />
      <title>{title}</title>
      <link rel="stylesheet" href={`${webroot}/generated.css`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${webroot}/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${webroot}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${webroot}/favicon-16x16.png`} />
      <link rel="manifest" href={`${webroot}/site.webmanifest`} />
      {/* Load AdSense only once here */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8176277097835363"
        crossOrigin="anonymous"
      ></script>
    </head>
    <body className="min-h-screen w-full bg-neutral-900 text-neutral-200">
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}>
        {/* Left Vertical Ad */}
        <div
          style={{
            width: "160px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8176277097835363"
            data-ad-slot="6976324462"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script
            dangerouslySetInnerHTML={{
              __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
            }}
          />
        </div>

        {/* Main Content (center) */}
        <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column" }}>
          {children}

          {/* Feature/Promo Section */}
          <section style={{
            maxWidth: "700px",
            margin: "40px auto 0 auto",
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

          {/* Horizontal Ad above the footer */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "24px 0 0 0" }}>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8176277097835363"
              data-ad-slot="4310968414"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
              }}
            />
          </div>

          {/* Footer */}
          <footer className="w-full">
            <div className="p-4 text-center text-sm text-neutral-500">
              <div>
                <a href="/about.html" className="text-neutral-400 hover:text-accent-500">
                  About Us
                </a>{" "}
                |{" "}
                <a href="/privacy.html" className="text-neutral-400 hover:text-accent-500">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="/contact.html" className="text-neutral-400 hover:text-accent-500">
                  Contact Us
                </a>
              </div>
              <span>Powered by ConvertX</span>
            </div>
          </footer>
        </div>

        {/* Right Vertical Ad */}
        <div
          style={{
            width: "160px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8176277097835363"
            data-ad-slot="4978401417"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script
            dangerouslySetInnerHTML={{
              __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
            }}
          />
        </div>
      </div>
    </body>
  </html>
);
