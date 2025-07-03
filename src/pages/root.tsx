import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { Header } from "../components/header";
import { getAllTargets } from "../converters/main";
import {
  ACCOUNT_REGISTRATION,
  ALLOW_UNAUTHENTICATED,
  HIDE_HISTORY,
  WEBROOT,
} from "../helpers/env";

export const root = new Elysia()
  .get("/", () => (
    <BaseHtml webroot={WEBROOT}>
      <>
        <Header
          webroot={WEBROOT}
          accountRegistration={ACCOUNT_REGISTRATION}
          allowUnauthenticated={ALLOW_UNAUTHENTICATED}
          hideHistory={HIDE_HISTORY}
          loggedIn={false} // or use session to set this flag if you want
        />
        <main class={`w-full flex-1 px-2 sm:px-4`}>
          {/* ==== PROMO SECTION: LIVE COUNTER ALWAYS SHOWN ==== */}
          <section
            style={{
              maxWidth: "700px",
              margin: "24px auto 0 auto",
              background: "#172133",
              borderRadius: "18px",
              padding: "2.5rem 2rem",
              boxShadow: "0 2px 16px rgba(20,30,40,0.13)",
              color: "#eef1f7"
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "2.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#a4d037"
              }}
            >
              Free Online Converter
            </h2>
            <div
              id="live-counter"
              style={{
                textAlign: "center",
                marginBottom: "1.2rem",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#a4d037"
              }}
            >
              <span id="conversion-count">0</span> files converted!
            </div>
            <p
              style={{
                fontSize: "1.2rem",
                textAlign: "center",
                marginBottom: "1.4rem"
              }}
            >
              Instantly convert files between 1000+ formats—images, documents, audio, video, ebooks, and more. Our secure, privacy-first tool works right in your browser—no registration required!
            </p>
            <div
              className="promo-features"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1.5rem",
                marginBottom: "1.5rem"
              }}
            >
              {/* ... Features ... */}
            </div>
            <div style={{ marginTop: "1.4rem", textAlign: "center" }}>
              <a
                href="#dropzone"
                style={{
                  background: "#a4d037",
                  color: "#111",
                  padding: "0.8em 2.2em",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  textDecoration: "none",
                  transition: "background 0.15s"
                }}
              >
                Try it now!
              </a>
            </div>
            {/* === LIVE COUNTER JS === */}
            <script dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  var base = (window.WEBROOT && window.WEBROOT !== '/') ? window.WEBROOT : '';
                  async function updateConversionCount() {
                    try {
                      const res = await fetch(base + '/api/conversion-count');
                      const data = await res.json();
                      document.getElementById('conversion-count').innerText = data.count.toLocaleString();
                    } catch(e) {}
                  }
                  updateConversionCount();
                  setInterval(updateConversionCount, 10000);
                })();
              `
            }} />
          </section>
          {/* ==== END PROMO SECTION ==== */}
        </main>
        <script src="script.js" defer />
      </>
    </BaseHtml>
  ));
