import { Html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { Header } from "../components/header";
import db from "../db/db";
import { Filename, Jobs } from "../db/types";
import { ALLOW_UNAUTHENTICATED, WEBROOT } from "../helpers/env";
import { userService } from "./user";

function ResultsArticle({
  job,
  files,
  outputPath,
}: {
  job: Jobs;
  files: Filename[];
  outputPath: string;
}) {
  return (
    <article class="article flex flex-row w-full">
      {/* Left Vertical Ad (hidden on mobile) */}
      <div
        class="side-ad hidden md:flex"
        style={{
          width: "160px",
          minHeight: "100vh",
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

      {/* Main Content */}
      <div class="flex-1 flex flex-col">
        {/* Horizontal Ad */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "24px 0",
          }}
        >
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
        <div class="mb-4 flex items-center justify-between">
          <h1 class="text-xl">Results</h1>
          <div>
            <button
              type="button"
              class="float-right w-40 btn-primary"
              onclick="downloadAll()"
              {...(files.length !== job.num_files
                ? { disabled: true, "aria-busy": "true" }
                : "")}
            >
              {files.length === job.num_files
                ? "Download All"
                : "Converting..."}
            </button>
          </div>
        </div>
        <progress
          max={job.num_files}
          value={files.length}
          class={`
            mb-4 inline-block h-2 w-full appearance-none overflow-hidden rounded-full border-0
            bg-neutral-700 bg-none text-accent-500 accent-accent-500
            [&::-moz-progress-bar]:bg-accent-500 [&::-webkit-progress-value]:rounded-full
            [&::-webkit-progress-value]:[background:none]
            [&[value]::-webkit-progress-value]:bg-accent-500
            [&[value]::-webkit-progress-value]:transition-[inline-size]
          `}
        />
        <table
          class={`
            w-full table-auto rounded bg-neutral-900 text-left
            [&_td]:p-4
            [&_tr]:rounded-sm [&_tr]:border-b [&_tr]:border-neutral-800
          `}
        >
          <thead>
            <tr>
              <th class={`px-2 py-2 sm:px-4`}>Converted File Name</th>
              <th class={`px-2 py-2 sm:px-4`}>Status</th>
              <th class={`px-2 py-2 sm:px-4`}>View</th>
              <th class={`px-2 py-2 sm:px-4`}>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr>
                <td safe class="max-w-[20vw] truncate">
                  {file.output_file_name}
                </td>
                <td safe>{file.status}</td>
                <td>
                  <a
                    class={`
                      text-accent-500 underline
                      hover:text-accent-400
                    `}
                    href={`${WEBROOT}/download/${outputPath}${file.output_file_name}`}
                  >
                    View
                  </a>
                </td>
                <td>
                  <a
                    class={`
                      text-accent-500 underline
                      hover:text-accent-400
                    `}
                    href={`${WEBROOT}/download/${outputPath}${file.output_file_name}`}
                    download={file.output_file_name}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Vertical Ad (hidden on mobile) */}
      <div
        class="side-ad hidden md:flex"
        style={{
          width: "160px",
          minHeight: "100vh",
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
    </article>
  );
}

export const results = new Elysia()
  .use(userService)
  .get("/results/:jobId", async ({ params, jwt, set, redirect, cookie: { auth, job_id } }) => {
    if (!auth?.value) {
      return redirect(`${WEBROOT}/login`, 302);
    }

    if (job_id?.value) {
      job_id.remove();
    }

    const user = await jwt.verify(auth.value);
    if (!user) {
      return redirect(`${WEBROOT}/login`, 302);
    }

    const job = db
      .query("SELECT * FROM jobs WHERE user_id = ? AND id = ?")
      .as(Jobs)
      .get(user.id, params.jobId);

    if (!job) {
      set.status = 404;
      return {
        message: "Job not found.",
      };
    }

    const outputPath = `${user.id}/${params.jobId}/`;

    const files = db
      .query("SELECT * FROM file_names WHERE job_id = ?")
      .as(Filename)
      .all(params.jobId);

    return (
      <BaseHtml webroot={WEBROOT} title="ConvertX | Result">
        <>
          <Header webroot={WEBROOT} allowUnauthenticated={ALLOW_UNAUTHENTICATED} loggedIn />
          <main class={`w-full flex-1 px-2 sm:px-4`}>
            <ResultsArticle job={job} files={files} outputPath={outputPath} />
          </main>
          <script src={`${WEBROOT}/results.js`} defer />
        </>
      </BaseHtml>
    );
  })
  .post("/progress/:jobId", async ({ jwt, set, params, redirect, cookie: { auth, job_id } }) => {
    if (!auth?.value) {
      return redirect(`${WEBROOT}/login`, 302);
    }

    if (job_id?.value) {
      job_id.remove();
    }

    const user = await jwt.verify(auth.value);
    if (!user) {
      return redirect(`${WEBROOT}/login`, 302);
    }

    const job = db
      .query("SELECT * FROM jobs WHERE user_id = ? AND id = ?")
      .as(Jobs)
      .get(user.id, params.jobId);

    if (!job) {
      set.status = 404;
      return {
        message: "Job not found.",
      };
    }

    const outputPath = `${user.id}/${params.jobId}/`;

    const files = db
      .query("SELECT * FROM file_names WHERE job_id = ?")
      .as(Filename)
      .all(params.jobId);

    return <ResultsArticle job={job} files={files} outputPath={outputPath} />;
  });
