import type { Legal } from "@/content/types";

/* ============================================================================
 *  LEGAL DOCUMENTS — English
 * ----------------------------------------------------------------------------
 *  A translation of the Brazilian originals, not a separate policy. The law
 *  that governs is Brazilian (LGPD) and the service is operated from Brazil —
 *  this version exists so a non-Portuguese reader can understand what they are
 *  agreeing to, and the pt-BR text is the one that controls in a dispute.
 *
 *  That is stated inside the documents themselves rather than left implicit.
 * ========================================================================= */

const UPDATED = "2026-08-14";

const LANGUAGE_NOTE =
  "This is a translation provided for convenience. The service is operated from Brazil under Brazilian law; in case of any conflict, the Portuguese version prevails.";

export const legalEn: Legal = {
  label: "Legal",
  updatedLabel: "Last updated",
  tocLabel: "On this page",

  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updatedAt: UPDATED,
    lede: "How Waterfall handles personal data in Zenda — including health data, which carries stricter rules and a legal basis of its own.",
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        body: [
          "Waterfall is a Brazilian technology consultancy, registered under CNPJ 42.804.319/0001-10, and the developer of **Zenda** — a platform for handling patient conversations over WhatsApp, used by people who run the schedule for doctors and clinics.",
          "This policy covers waterfalltech.xyz, the product page at zenda.waterfalltech.xyz, and use of Zenda itself.",
          LANGUAGE_NOTE,
        ],
      },
      {
        id: "roles",
        heading: "Who is responsible for which data",
        body: [
          "This is the most important section here, and the one that tells you where to send a request.",
          "**The doctor or clinic is the controller** of their own patients' data (LGPD art. 5, VI). They decide what the data is used for, they collect the patient's number, and they set how long it is kept.",
          "**Waterfall is a processor** (art. 5, VII). We handle patient data solely to run the service, on the controller's instructions, never for our own purposes. We do not sell data, do not use it for advertising, and do not train AI models on patient message content.",
          "**The person using Zenda** — the assistant or secretary — handles the data on the controller's behalf. Professional confidentiality extends to assistants (CFM Resolution 2.217/2018, art. 73).",
          "In practice: **a patient who wants to access or erase their data must contact the doctor or clinic**, not Waterfall. If such a request reaches us, we forward it to the controller — we cannot decide about data that is not ours.",
        ],
      },
      {
        id: "data",
        heading: "What data is processed",
        body: [
          "**From Zenda users:** name, email, password (stored only as a hash, never in plain text), and access records.",
          "**From the account's clients:** the doctor's or clinic's name, specialty, medical licence number, contact phone, and the commercial details the user records — agreed fee and billing day.",
          "**From patients:** WhatsApp number, display name, the content of messages exchanged, appointment dates and times, and whatever the assistant records — procedures performed, return interval and notes.",
        ],
        list: [
          "Message content and clinical notes are treated as **sensitive health data** (art. 5, II).",
          "We collect no patient payment data. Zenda processes no payments.",
          "We use no advertising cookies and no third-party trackers on the site.",
        ],
      },
      {
        id: "legal-basis",
        heading: "On what legal basis",
        body: [
          "For health data the basis is **protection of health, in a procedure carried out by health professionals and health services** (art. 11, II, “f”) — not consent. That is deliberate: consent can be withdrawn at any moment, and a record that vanishes mid-treatment is a risk to the patient.",
          "For platform users and client account data, the basis is **performance of a contract** (art. 7, V).",
          "For security, fraud prevention and access logs, the basis is **legitimate interest** (art. 7, IX), with a documented impact assessment.",
        ],
      },
      {
        id: "health",
        heading: "The specific handling of health data",
        body: [
          "These are not intentions — they are verifiable properties of the system.",
        ],
        list: [
          "**Message content never reaches logs, monitoring or error reports.** The telemetry filter works by allow-list — a new field is emitted only if explicitly permitted — and an automated test fails if anything leaks.",
          "**The patient record is separated per client.** The same person seen by two doctors has two independent records, and a note written for one never appears on the other's screen.",
          "**No cross-client aggregation of health data**, not even for internal statistics (art. 11, §4).",
          "**Database-level isolation.** Each account sees only its own rows, enforced by the database itself and not only by the application, with an additional per-doctor scope.",
          "**Read access to a conversation is logged** — who opened it, when, and from where. Improper read access is the typical incident in a system like this, and without a log it leaves no trace.",
          "**Automated messages carry no specialty, procedure or diagnosis**, because they travel through Meta's infrastructure. A validation blocks the send if that is attempted.",
        ],
      },
      {
        id: "meta",
        heading: "Meta and WhatsApp",
        body: [
          "Zenda uses exclusively the **official WhatsApp Business API (Cloud API)** from Meta. We do not use unofficial libraries: besides breaching Meta's terms, they expose the practice's number to being banned.",
          "**Meta Platforms** is a sub-processor for message content, which necessarily passes through its infrastructure to reach the patient. For the delivery metadata Meta generates and keeps on its own account — delivery status, phone number, quality signals — Meta acts as an independent controller under its own terms.",
          "The WhatsApp billing account belongs to the doctor or clinic. Waterfall has no access to that account's payment details.",
        ],
      },
      {
        id: "sub-processors",
        heading: "Who we share with",
        body: [
          "Only those necessary to run the service, and always under a data processing agreement:",
        ],
        list: [
          "**Meta Platforms** — sending and receiving WhatsApp messages.",
          "**Amazon Web Services** — hosting, in the São Paulo region (sa-east-1); data at rest is encrypted.",
          "**An error monitoring tool** — receives only technical identifiers and stack traces, with message content discarded before it is sent.",
          "Authorities, where there is a legal obligation or court order.",
        ],
      },
      {
        id: "international",
        heading: "International transfers",
        body: [
          "Some of the sub-processors above operate outside Brazil. Those transfers rely on standard contractual clauses under ANPD Resolution 19/2024.",
          "Product data is hosted in Brazil. What leaves are the messages — which must leave, because that is how WhatsApp works — and technical monitoring data.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        body: [
          "Retention is set by the controller, within the limits of the law and professional regulation. Absent specific instruction:",
        ],
        list: [
          "**Conversations and records:** for as long as the professional–patient relationship lasts, subject to the applicable medical record retention period.",
          "**Access and audit logs:** as required by the law applicable to each type of record.",
          "**Platform user account data:** up to 90 days after the account is closed.",
          "**When a client relationship ends**, that doctor's or clinic's data can be exported and then erased at the controller's request.",
        ],
      },
      {
        id: "rights",
        heading: "Data subject rights",
        body: [
          "The LGPD (art. 18) grants confirmation of processing, access, correction, anonymisation, portability, information about sharing, and erasure.",
          "**If you are a patient:** contact the doctor or clinic that treats you. They are the controller of your data. If you write to us, we will forward it and tell you where it went.",
          "**If you use Zenda or are a Waterfall client:** write to hello@waterfalltech.xyz. We respond within the statutory period, free of charge.",
        ],
      },
      {
        id: "security",
        heading: "Security and incidents",
        body: [
          "Encryption in transit and at rest, two-factor authentication, least-privilege access, and logging of access to sensitive data.",
          "In a security incident carrying relevant risk, we notify the controller within 24 hours of becoming aware, so they can meet their duty to notify the ANPD and the data subjects (art. 48).",
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        body: [
          "Material changes are emailed to active account holders at least 30 days in advance. The date at the top of this page is always that of the version in force.",
        ],
      },
      {
        id: "contact",
        heading: "Contact",
        body: [
          "Waterfall — CNPJ 42.804.319/0001-10 — Rio de Janeiro, Brazil.",
          "Data protection officer: hello@waterfalltech.xyz",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    updatedAt: UPDATED,
    lede: "The rules for using Zenda. The WhatsApp section is worth reading — those rules are Meta's, not ours, and breaking them costs your client their number.",
    sections: [
      {
        id: "acceptance",
        heading: "Acceptance",
        body: [
          "By creating an account or using Zenda you agree to these terms. If you accept on behalf of a company, you represent that you have authority to do so.",
          "Zenda is operated by Waterfall, CNPJ 42.804.319/0001-10.",
          LANGUAGE_NOTE,
        ],
      },
      {
        id: "service",
        heading: "What Zenda is",
        body: [
          "A platform for handling patient conversations over WhatsApp on behalf of doctors and clinics, keeping those conversations in one place, and recording follow-up information — procedures performed and return dates.",
          "**What Zenda is not:** it is not an electronic medical record, it issues no medical documents, it provides no healthcare and it does not replace clinical judgement. It also issues no invoices and processes no payments between you and your clients — the billing view is a reminder for you, nothing more.",
        ],
      },
      {
        id: "account",
        heading: "Your account",
        body: [
          "You are responsible for your credentials and for what is done with them. Tell us immediately if you suspect unauthorised access.",
          "You must be 18 or older and have legal capacity.",
          "By connecting a client's WhatsApp you represent that you are authorised by them to handle their patients on their behalf.",
        ],
      },
      {
        id: "whatsapp",
        heading: "WhatsApp rules that are not ours",
        body: [
          "Zenda runs on Meta's WhatsApp Business Platform. Some rules come from them and we cannot relax them:",
        ],
        list: [
          "**The WhatsApp billing account belongs to the owner of the number** — the doctor or clinic. Meta bills them directly. Without a valid payment method the number connects and does not send.",
          "**Outside the 24-hour window** since the patient's last message, only message templates pre-approved by Meta can be sent.",
          "**Unsolicited bulk messaging leads to blocking.** Meta rates the number's quality, and patient blocks lower the sending limit — in severe cases the number is suspended.",
          "**The number remains your client's.** If your relationship ends, they leave with it.",
          "Meta's content rules and commercial policies apply in full and may change without notice from us.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "Acceptable use",
        body: ["You may not use Zenda to:"],
        list: [
          "Message anyone who has not asked for contact and has no relationship with the professional being served.",
          "Disclose a diagnosis, procedure or any health information to anyone other than the patient.",
          "Circumvent technical limits, test security without written authorisation, or access another account's data.",
          "Any unlawful purpose, or one that breaches the Brazilian Code of Medical Ethics and CFM resolutions.",
          "Resell access to the platform as if it were your own product.",
        ],
      },
      {
        id: "data",
        heading: "Data and privacy",
        body: [
          "Personal data handling is governed by our Privacy Policy. In short: the doctor or clinic is the controller, and Waterfall is the processor.",
          "You undertake to hold, with each client, the legal basis we need in order to process their patients' data — and to keep professional confidentiality over everything you access.",
          "You can export your account's data at any time.",
        ],
      },
      {
        id: "availability",
        heading: "Availability",
        body: [
          "Zenda is in **private beta**. That means features may change, instability can happen, and there is no formal uptime guarantee at this stage.",
          "We depend on third-party services — Meta above all. An outage on their side is an outage on ours, and it is outside our control.",
          "We give reasonable notice before discontinuing a significant feature.",
        ],
      },
      {
        id: "liability",
        heading: "Limitation of liability",
        body: [
          "The service is provided as is. We are not liable for lost revenue, lost opportunity or data loss arising from misuse, third-party failure or force majeure.",
          "Nothing here excludes liability that the law does not permit to be excluded — including under the Brazilian Consumer Code and the LGPD, where applicable.",
          "**You remain responsible for the service you provide.** Zenda is a tool; the relationship with the patient is yours and the professional's.",
        ],
      },
      {
        id: "termination",
        heading: "Termination",
        body: [
          "You may close your account at any time. We may suspend or close accounts that breach these terms, with prior notice wherever possible — and without notice where there is immediate risk to others or a legal requirement.",
          "After closure you have 30 days to export your data before it is erased.",
        ],
      },
      {
        id: "general",
        heading: "General",
        body: [
          "Material changes to these terms are notified 30 days in advance to active account holders.",
          "These terms are governed by Brazilian law, with the courts of Rio de Janeiro as the agreed forum, except where the law grants a consumer the forum of their own domicile.",
          "Questions: hello@waterfalltech.xyz",
        ],
      },
    ],
  },
};
