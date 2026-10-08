/* Field Notebook catalog - MOCK SITE FOR TRAINING. Generated.
 * Flags are XOR-encrypted under each challenge's answer; nothing here is a plain flag. */
window.KAPU_CHALLENGES = {
 "meta": {
  "accent": "#35c8e8",
  "panelBg": "#0d0f16",
  "panelCard": "#1a1f2e",
  "panelLine": "#2c3350",
  "panelInk": "#eef1f8",
  "panelMuted": "#9aa3bd",
  "title": "Streamscape",
  "slug": "streamscape-partner-portal"
 },
 "items": [
  {
   "id": "disallow-is-a-directory",
   "code": "SS-01",
   "title": "Read the crawler policy",
   "diff": "Easy",
   "objective": "Read the crawler policy. Enter the console directory it hides.",
   "learned": "A disallow list is a directory map of what you wanted hidden.",
   "h": "2727173a",
   "f": "693c20350f0a0c011243431f165f1d1d48135e4b460204110001170b0e"
  },
  {
   "id": "sitemaps-name-the-back-rooms",
   "code": "SS-02",
   "title": "Read the generated sitemap",
   "diff": "Easy",
   "objective": "Read the sitemap. Enter the unlinked page it names for new partners.",
   "learned": "A sitemap lists pages nothing links to: the back rooms a crawler is still told about.",
   "h": "7fa1997f",
   "f": "292223281a010d1d0b0a4f180740020e030742151a01440c064d03591f0300031112"
  },
  {
   "id": "onboarding-hands-out-the-password",
   "code": "SS-03",
   "title": "The onboarding hand-out",
   "diff": "Medium",
   "objective": "Open the onboarding page. Enter the starter password it hands every partner.",
   "learned": "A shared starter password handed to all partners is one credential, not many; obscurity on an unlinked page is not access control.",
   "h": "9e596751",
   "f": "363e2431120a19505f5344141b0b11440d165c54411b1f07115b1d0d121f40534503050a040d18"
  },
  {
   "id": "one-password-for-everyone",
   "code": "SS-04",
   "title": "The shared starter credential",
   "diff": "Medium",
   "objective": "Read the console data script. Enter the field name that admits every partner shares a password.",
   "learned": "The console's own data documents the shared-password practice: read the code, not just the UI.",
   "h": "40c5bd20",
   "f": "352420351e0b000a5915121b12050a160a42120a01450404001617001a000e"
  },
  {
   "id": "embargo-should-mean-embargo",
   "code": "SS-05",
   "title": "Catalog scope versus authorization",
   "diff": "Medium",
   "objective": "Open the Catalog. Enter the id of one embargoed title you should not be able to see.",
   "learned": "Signed-in is not authorized. The console shows other partners' and unreleased titles because responses are not scoped.",
   "h": "cb52d5be",
   "f": "32386c764a11194f5043131b0042591b0141551c19114c5f1c11194f5043131b50"
  },
  {
   "id": "aggregate-not-individuals",
   "code": "SS-06",
   "title": "Aggregate that is not aggregate",
   "diff": "Medium",
   "objective": "Read the console data script. Enter the field name that holds individual viewer rows.",
   "learned": "Audience data shipped as individual rows instead of aggregates is the core privacy exposure.",
   "h": "af437f39",
   "f": "2739252e1e0f040201040a1118004c1b0b1d48070d011a17041419040d0619"
  },
  {
   "id": "the-config-is-the-blueprint",
   "code": "SS-07",
   "title": "Decode the CatalogPull configuration",
   "diff": "Medium",
   "objective": "Base64-decode the CatalogPull _k config and enter its SFTP destination host.",
   "learned": "An encoded config is not a secret config. Decoding _k reveals the whole job: destination, scope, and token.",
   "h": "c9963f57",
   "f": "747c72694b5a59541e4d5b5a54595403595d1c455b4b19565e45565e42475f454e"
  },
  {
   "id": "one-token-fits-all",
   "code": "SS-08",
   "title": "The single static export token",
   "diff": "Medium",
   "objective": "From the decoded CatalogPull config, enter the static export token.",
   "learned": "One static token guards every partner's export. If it leaks, the whole feed is exposed. Credentials must be per-partner and rotatable.",
   "h": "c3aa75e3",
   "f": "353f1e211e0a0a3a4b15040e481a420d0c1a5e490e410212"
  },
  {
   "id": "scope-every-response-server-side",
   "code": "SS-09",
   "title": "Reverse the console build for the scope rule",
   "diff": "Hard",
   "objective": "Convert the decimal char-code array on the Catalog page and enter the decoded value.",
   "learned": "Only the Dashboard scopes to the signed-in partner. Every response must be filtered server-side to the caller.",
   "h": "93df4fe0",
   "f": "222d322f191c021d144844165b111a1c001d0b1f09421d100a5d16015f060415481708170d1f"
  },
  {
   "id": "money-data-needs-tighter-scope",
   "code": "SS-10",
   "title": "Reverse the obfuscated telemetry stub",
   "diff": "Hard",
   "objective": "Reverse the telemetry stub (hex XORed with key 0x2a) and enter the decoded value.",
   "learned": "Payment references plus partner names are routing data. Financial data needs tighter scoping than catalog listings.",
   "h": "1fbbdf72",
   "f": "362d38280e191c4315184a014c18044c051648161c580000090f04040b4206171c5d151c"
  },
  {
   "id": "data-leaves-the-building-nightly",
   "code": "SS-11",
   "title": "Decode the export destination",
   "diff": "Hard",
   "objective": "Hex-decode the destination-owner value on the Data export page and enter the decoded value.",
   "learned": "A nightly full copy to an outside host widens the blast radius of any single failure.",
   "h": "58042f53",
   "f": "322428351f491115135915480018041f540001065e4f030c0200061c1345071b0345040d0b09"
  },
  {
   "id": "embargo-plus-identity-is-worse",
   "code": "SS-12",
   "title": "Recover the embargo exposure marker",
   "diff": "Hard",
   "objective": "Find the audience row tied to an embargoed title. Enter that viewer id.",
   "learned": "An unreleased title tied to an individual viewer is a worse exposure than either alone.",
   "h": "34833968",
   "f": "353f6c7448515a5312014a5c1e445b44005e4457565a4358070a005a4019405e0100484e"
  }
 ]
};
