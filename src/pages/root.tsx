import { randomInt } from "node:crypto";
import { Html } from "@elysiajs/html";
import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { Header } from "../components/header";
import { getAllTargets } from "../converters/main";
import db from "../db/db";
import { User } from "../db/types";
import {
  ACCOUNT_REGISTRATION,
  ALLOW_UNAUTHENTICATED,
  HIDE_HISTORY,
  HTTP_ALLOWED,
  WEBROOT,
} from "../helpers/env";
import { FIRST_RUN, userService } from "./user";

export const root = new Elysia()
  .use(userService)
  .get("/", async ({ jwt, redirect, cookie: { auth, jobId } }) => {
    // --- AUTH BLOCK: allow unauth or redirect to login ---
    let user: ({ id: string } & JWTPayloadSpec) | false = false;
    if (!ALLOW_UNAUTHENTICATED) {
      if (FIRST_RUN) return redirect(`${WEBROOT}/setup`, 302);
      if (!auth?.value) return redirect(`${WEBROOT}/login`, 302);
    }

    if (ALLOW_UNAUTHENTICATED) {
      const newUserId = String(
        randomInt(2 ** 24, Math.min(2 ** 48 + 2 ** 24 - 1, Number.MAX_SAFE_INTEGER)),
      );
      const accessToken = await jwt.sign({ id: newUserId });
      user = { id: newUserId };
      if (!auth) {
        return { message: "No auth cookie, perhaps your browser is blocking cookies." };
      }
      auth.set({
        value: accessToken,
        httpOnly: true,
        secure: !HTTP_ALLOWED,
        maxAge: 24 * 60 * 60,
        sameSite: "strict",
      });
    } else if (auth?.value) {
      user = await jwt.verify(auth.value);
      if (
        user !== false &&
        user.id &&
        (Number.parseInt(user.id) < 2 ** 24 || !ALLOW_UNAUTHENTICATED)
      ) {
        const existingUser = db.query("SELECT * FROM users WHERE id = ?").as(User).get(user.id);
        if (!existingUser) {
          if (auth?.value) auth.remove();
          return redirect(`${WEBROOT}/login`, 302);
        }
      }
    }
    if (!user) return redirect(`${WEBROOT}/login`, 302);

    // --- Create a new job as before ---
    db.query("INSERT INTO jobs (user_id, date_created) VALUES (?, ?)").run(
      user.id,
      new Date().toISOString(),
    );
    const { id } = db
      .query("SELECT id FROM jobs WHERE user_id = ? ORDER BY id DESC")
      .get(user.id) as { id: number };
    if (!jobId) return { message: "Cookies should be enabled to use this app." };
    jobId.set({
      value: id,
      httpOnly: true,
      secure: !HTTP_ALLOWED,
      maxAge: 24 * 60 * 60,
      sameSite: "strict",
    });

    // --- Render the UI ---
    return (
      <BaseHtml webroot={WEBROOT}>
        <>
          <Header
            webroot={WEBROOT}
            accountRegistration={ACCOUNT_REGISTRATION}
            allowUnauthenticated={ALLOW_UNAUTHENTICATED}
            hideHistory={HIDE_HISTORY}
            loggedIn
          />
          <main
            class={`
              w-full flex-1 px-2
              sm:px-4
            `}
          >
            {/* MAIN UI */}
            <article class="article">
              <h1 class="mb-4 text-xl">Convert</h1>
              <div class="mb-4 scrollbar-thin max-h-[50vh] overflow-y-auto">
                <table
                  id="file-list"
                  class={`
                    w-full table-auto rounded bg-neutral-900
                    [&_td]:p-4 [&_td]:first:max-w-[30vw] [&_td]:first:truncate
                    [&_tr]:rounded-sm [&_tr]:border-b [&_tr]:border-neutral-800
                  `}
                />
              </div>
              <div
                id="dropzone"
                class={`
                  relative flex h-48 w-full items-center justify-center rounded border border-dashed
                  border-neutral-700 transition-all
                  hover:border-neutral-600
                  [&.dragover]:border-4 [&.dragover]:border-neutral-500
                `}
              >
                <span>
                  <b>Choose a file</b> or drag it here
                </span>
                <input
                  type="file"
                  name="file"
                  multiple
                  class="absolute inset-0 size-full cursor-pointer opacity-0"
                />
              </div>
            </article>
            <form
              method="post"
              action={`${WEBROOT}/convert`}
              class="relative mx-auto mb-[35vh] w-full max-w-4xl"
            >
              <input type="hidden" name="file_names" id="file_names" />
              <article class="article w-full">
                <input
                  type="search"
                  name="convert_to_search"
                  placeholder="Search for conversions"
                  autocomplete="off"
                  class="w-full rounded-sm bg-neutral-800 p-4"
                />
                <div class="select_container relative">
                  <article
                    class={`
                      convert_to_popup absolute z-2 m-0 hidden h-[30vh] max-h-[50vh] w-full flex-col
                      overflow-x-hidden overflow-y-auto rounded bg-neutral-800
                      sm:h-[30vh]
                    `}
                  >
                    {Object.entries(getAllTargets()).map(([converter, targets]) => (
                      <article
                        class={`
                          convert_to_group flex w-full flex-col border-b border-neutral-700 p-4
                        `}
                        data-converter={converter}
                      >
                        <header class="mb-2 w-full text-xl font-bold" safe>
                          {converter}
                        </header>
                        <ul class="convert_to_target flex flex-row flex-wrap gap-1">
                          {targets.map((target) => (
                            <button
                              tabindex={0}
                              class={`
                                target rounded bg-neutral-700 p-1 text-base
                                hover:bg-neutral-600
                              `}
                              data-value={`${target},${converter}`}
                              data-target={target}
                              data-converter={converter}
                              type="button"
                              safe
                            >
                              {target}
                            </button>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </article>
                  <select name="convert_to" aria-label="Convert to" required hidden>
                    <option selected disabled value="">
                      Convert to
                    </option>
                    {Object.entries(getAllTargets()).map(([converter, targets]) => (
                      <optgroup label={converter}>
                        {targets.map((target) => (
                          <option value={`${target},${converter}`} safe>
                            {target}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </article>
              <input
                class={`
                  w-full btn-primary opacity-100
                  disabled:cursor-not-allowed disabled:opacity-50
                `}
                type="submit"
                value="Convert"
                disabled
              />

              {/* === PROMO SECTION: Free Online Converter (with live counter) === */}
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
                {/* Responsive/mobile styles */}
                <style>
                  {`
                    @media (max-width: 600px) {
                      .promo-mobile {
                        padding: 1.2rem 0.7rem !important;
                        border-radius: 10px !important;
                      }
                      .promo-features {
                        flex-direction: column !important;
                        gap: 1.1rem !important;
                      }
                    }
                  `}
                </style>
                <div className="promo-mobile">
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
                    <div style={{ flex: 1, minWidth: "170px" }}>
                      <span role="img" aria-label="Easy to Use" style={{ fontWeight: 700, color: "#77e6b6" }}>
                        ✨ Easy to Use:
                      </span>
                      <span>
                        {" "}
                        Just upload or drag and drop your files, choose a format, and convert with a single click.
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: "170px" }}>
                      <span role="img" aria-label="Private & Secure" style={{ fontWeight: 700, color: "#fdc06f" }}>
                        🔒 Private &amp; Secure:
                      </span>
                      <span>
                        {" "}
                        Your files never leave our servers. All conversions are processed instantly and automatically deleted.
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: "170px" }}>
                      <span role="img" aria-label="Lightning Fast" style={{ fontWeight: 700, color: "#79b5fe" }}>
                        🚀 Lightning Fast:
                      </span>
                      <span>
                        {" "}
                        Enjoy quick, hassle-free conversions—even with large images, PDFs, audio, or videos.
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: "170px" }}>
                      <span role="img" aria-label="Free" style={{ fontWeight: 700, color: "#ffa3b0" }}>
                        🆓 100% Free:
                      </span>
                      <span>
                        {" "}
                        No limits, no hidden costs, and no signup required for basic conversions.
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: "1.05rem", textAlign: "center" }}>
                    Whether you need to change an image from PNG to JPG, convert a DOCX to PDF, extract audio from a video, or batch convert e-books—our Free Online Converter is here for you.
                  </p>
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
                </div>
                {/* === LIVE COUNTER JS === */}
                <script dangerouslySetInnerHTML={{
                  __html: `
                    (function(){
                      // Use window.WEBROOT if defined for subpaths
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
              {/* === END PROMO SECTION === */}
            </form>
          </main>
          <script src="script.js" defer />
        </>
      </BaseHtml>
    );
  });
