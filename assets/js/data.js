/* Streamscape - shared data for the public site and the partner console.
 * MOCK SITE FOR TRAINING. Every title, studio, person, number, key, and address is invented.
 * Domains end in .example; any IPs use the documentation ranges (192.0.2.x / 198.51.100.x / 203.0.113.x). */

window.SS = window.SS || {};

SS.DATA = {

  /* ---------- Public catalog (what any visitor is meant to see) ---------- */
  catalog: [
    { id: "tt-01", kind: "movie", title: "Kona Skies",            year: 2025, genre: "Drama",       art: "#3a6ea5", rating: "PG-13", status: "released", partner: "Lehua Pictures",   blurb: "A pilot returns to the island she left behind." },
    { id: "tt-02", kind: "movie", title: "The Long Reef",         year: 2024, genre: "Thriller",    art: "#8a3ea5", rating: "R",     status: "released", partner: "Lehua Pictures",   blurb: "A dive goes wrong off a shuttered resort." },
    { id: "tt-03", kind: "tv",    title: "Night Market",          year: 2025, genre: "Comedy",      art: "#a5623a", rating: "TV-14", status: "released", partner: "Palila Media",     blurb: "Two cousins run a food stall and a feud." },
    { id: "tt-04", kind: "tv",    title: "Signal Hill",           year: 2023, genre: "Sci-Fi",      art: "#3aa58a", rating: "TV-MA", status: "released", partner: "Palila Media",     blurb: "A radio tower picks up tomorrow's news." },
    { id: "tt-05", kind: "music", title: "Tradewind Sessions",    year: 2025, genre: "Music",       art: "#35c8e8", rating: "NR",    status: "released", partner: "Reef Records",     blurb: "Live acoustic set, one take, one room." },
    { id: "tt-06", kind: "music", title: "Paniolo, Vol. 2",       year: 2024, genre: "Music",       art: "#c8a935", rating: "NR",    status: "released", partner: "Reef Records",     blurb: "Modern slack-key from six young players." },
    { id: "tt-07", kind: "movie", title: "Harbor Lights",         year: 2025, genre: "Romance",     art: "#a53a5f", rating: "PG",    status: "released", partner: "Lehua Pictures",   blurb: "A ferry captain and a lighthouse keeper." },
    { id: "tt-08", kind: "tv",    title: "The Understudy",        year: 2025, genre: "Drama",       art: "#5f3aa5", rating: "TV-14", status: "released", partner: "Palila Media",     blurb: "A stagehand gets one impossible night." },
    { id: "tt-09", kind: "movie", title: "Cold Front",            year: 2022, genre: "Action",      art: "#3a80a5", rating: "PG-13", status: "released", partner: "Summit North",     blurb: "A storm traps a crew on a research base." },
    { id: "tt-10", kind: "tv",    title: "Made in Waiʻalle", year: 2024, genre: "Documentary", art: "#3aa55f", rating: "TV-PG", status: "released", partner: "Palila Media",     blurb: "Six makers, six trades, one town." },
    /* The next three are NOT released. They should never appear on the public site or in a partner's feed that
       isn't theirs. They are embargoed. flag{embargo-should-mean-embargo} */
    { id: "tt-11", kind: "movie", title: "Kona Skies 2",          year: 2026, genre: "Drama",       art: "#243b57", rating: "NR", status: "embargoed", partner: "Lehua Pictures", release: "2026-12-11", blurb: "UNRELEASED. Sequel. Announcement embargoed until Dec." },
    { id: "tt-12", kind: "tv",    title: "Signal Hill S3",        year: 2026, genre: "Sci-Fi",      art: "#0f2a3a", rating: "NR", status: "embargoed", partner: "Palila Media",   release: "2026-10-30", blurb: "UNRELEASED. Season 3. Cast not yet announced." },
    { id: "tt-13", kind: "music", title: "Reef Records — Untitled 2026", year: 2026, genre: "Music", art: "#0f2a2a", rating: "NR", status: "embargoed", partner: "Reef Records", release: "2026-11-20", blurb: "UNRELEASED. Compilation. Track list confidential." }
  ],

  /* ---------- Partner accounts (console sign-in is simulated in the browser) ---------- */
  partners: [
    { code: "lehua",  name: "Lehua Pictures", user: "lehua",  pass: "Preview2026", plan: "Studio",     titles: ["tt-01","tt-02","tt-07","tt-11"] },
    { code: "palila", name: "Palila Media",   user: "palila", pass: "Preview2026", plan: "Studio",     titles: ["tt-03","tt-04","tt-08","tt-10","tt-12"] },
    { code: "reef",   name: "Reef Records",   user: "reef",   pass: "Preview2026", plan: "Label",      titles: ["tt-05","tt-06","tt-13"] },
    { code: "summit", name: "Summit North",   user: "summit", pass: "Preview2026", plan: "Studio",     titles: ["tt-09"] }
  ],
  sharedNote: "All partner logins use the same starter password 'Preview2026' from the welcome email. Partners are asked to change it; none have. flag{one-password-for-everyone}",

  /* ---------- Performance rows (per title). This is the payload the console shows and the feed copies. ---------- */
  performance: [
    { id: "tt-01", views30: 412000, hoursWatched: 690000, completion: 0.71, subsAttributed: 5100 },
    { id: "tt-02", views30: 288000, hoursWatched: 402000, completion: 0.64, subsAttributed: 2600 },
    { id: "tt-03", views30: 356000, hoursWatched: 190000, completion: 0.80, subsAttributed: 3300 },
    { id: "tt-04", views30: 501000, hoursWatched: 880000, completion: 0.77, subsAttributed: 7400 },
    { id: "tt-05", views30: 145000, hoursWatched: 61000,  completion: 0.88, subsAttributed: 1200 },
    { id: "tt-06", views30: 98000,  hoursWatched: 41000,  completion: 0.90, subsAttributed: 780  },
    { id: "tt-07", views30: 233000, hoursWatched: 300000, completion: 0.69, subsAttributed: 2100 },
    { id: "tt-08", views30: 178000, hoursWatched: 150000, completion: 0.74, subsAttributed: 1600 },
    { id: "tt-09", views30: 120000, hoursWatched: 165000, completion: 0.58, subsAttributed: 900  },
    { id: "tt-10", views30: 64000,  hoursWatched: 38000,  completion: 0.83, subsAttributed: 500  },
    { id: "tt-11", views30: 0,      hoursWatched: 0,       completion: 0,    subsAttributed: 0,   note: "Embargoed title. Pre-release screener metrics only." },
    { id: "tt-12", views30: 0,      hoursWatched: 0,       completion: 0,    subsAttributed: 0,   note: "Embargoed title. Internal test-audience only." },
    { id: "tt-13", views30: 0,      hoursWatched: 0,       completion: 0,    subsAttributed: 0,   note: "Embargoed title." }
  ],

  /* ---------- Audience sample. This should be aggregate-only and scoped to the signed-in partner.
       Instead the console ships the whole thing to every partner, including a sample of individual
       viewer records. That is the core exposure. flag{aggregate-not-individuals} ---------- */
  audienceSample: [
    { viewer: "SS-88213", region: "Oahu",        plan: "Premium",  device: "TV",     title: "tt-04", note: "" },
    { viewer: "SS-90551", region: "Maui",        plan: "Standard", device: "Mobile", title: "tt-03", note: "" },
    { viewer: "SS-14002", region: "Hawaii Is.",  plan: "Premium",  device: "Web",    title: "tt-01", note: "" },
    { viewer: "SS-77310", region: "Kauai",       plan: "Standard", device: "TV",     title: "tt-08", note: "" },
    { viewer: "SS-45188", region: "Mainland US", plan: "Premium",  device: "Tablet", title: "tt-02", note: "" },
    { viewer: "SS-60927", region: "Oahu",        plan: "Standard", device: "Mobile", title: "tt-05", note: "" },
    { viewer: "SS-33471", region: "Oahu",        plan: "Premium",  device: "TV",     title: "tt-12", note: "Watched an EMBARGOED screener." },
    { viewer: "SS-51840", region: "Maui",        plan: "Standard", device: "Web",    title: "tt-07", note: "" }
  ],
  audienceNote: "Sample of 8 of 512,000 viewer rows. Full rows include a Streamscape viewer id, region, plan, and device. Names and emails are NOT in this feed, but the viewer id joins to the billing system.",

  /* ---------- Payouts (money per partner) ---------- */
  payouts: [
    { code: "lehua",  q: "2026-Q2", amount: 184500, method: "ACH", ref: "PO-2026-Q2-LEH" },
    { code: "palila", q: "2026-Q2", amount: 226300, method: "ACH", ref: "PO-2026-Q2-PAL" },
    { code: "reef",   q: "2026-Q2", amount: 51200,  method: "ACH", ref: "PO-2026-Q2-REE" },
    { code: "summit", q: "2026-Q2", amount: 42800,  method: "ACH", ref: "PO-2026-Q2-SUM" }
  ],

  /* ---------- The nightly data feed ("CatalogPull"). This is a DESCRIPTION of an internal job,
       left readable in the console. It is not a running program; the page never contacts a network.
       It documents WHAT the job copies and WHERE, which is the thing the assessment reconstructs.
       flag{the-config-is-the-blueprint} ---------- */
  feed: {
    name: "CatalogPull nightly sync",
    schedule: "Daily 03:15 HST",
    source: "Partner console dataset (this same data)",
    destination: "sftp://203.0.113.44/streamscape/partner-analytics/  (third-party analytics vendor)",
    auth: "Static token in the config below. Same token for every partner's export. flag{one-token-fits-all}",
    token: "ss_feed_FAKE-TOKEN-DO-NOT-USE-0000",
    scope: "ALL partners, ALL titles (including embargoed), plus the audience viewer sample.",
    format: "One JSON file per night: catalog + performance + audienceSample + payouts.",
    lastRun: "2026-09-20 03:15",
    lastResult: "OK. 1 file, 512,013 audience rows, 13 titles, 4 partners.",
    intendedScope: "Per the partner agreement, a partner may see only THEIR titles' aggregate numbers. The job ignores that.",
    fields: [
      "catalog: id, title, kind, status (released/embargoed), release date, owning partner",
      "performance: id, 30-day views, hours watched, completion rate, subscribers attributed",
      "audienceSample: viewer id, region, plan, device, title watched",
      "payouts: partner code, quarter, amount, bank method, reference"
    ]
  }
};
