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
      {/* Meta Description for SEO */}
      <meta
        name="description"
        content="Online File Convertor is a free online file converter supporting 1000+ formats—images, documents, video, audio, ebooks, and more. Fast, private, no registration required."
      />
      {/* Allow search engines to index and follow links */}
      <meta name="robots" content="index, follow" />
      <link rel="stylesheet" href={`${webroot}/generated.css`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${webroot}/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${webroot}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${webroot}/favicon-16x16.png`} />
      <link rel="manifest" href={`${webroot}/site.webmanifest`} />
      {/* Hide side ads on small screens */}
      <style>
        {`
        @media (max-width: 900px) {
          .side-ad { display: none !important; }
        }
        `}
      </style>
      {/* Load AdSense only once here */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8176277097835363"
        crossOrigin="anonymous"
      ></script>
    </head>
    <body className="min-h-screen w-full bg-neutral-900 text-neutral-200">
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}>
        {/* Left Vertical Ad (hidden on mobile) */}
        <div
          className="side-ad"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            maxWidth: "360px" // <-- only a max width, NO fixed width!
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

        {/* Right Vertical Ad (hidden on mobile) */}
        <div
          className="side-ad"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            maxWidth: "360px" // <-- only a max width, NO fixed width!
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
