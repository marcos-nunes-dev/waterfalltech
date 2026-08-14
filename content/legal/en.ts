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
        id: "cookies",
        heading: "Cookies and similar technologies",
        body: [
          "The site sets **one cookie**, `waterfall_locale`, which remembers the language you picked in the switcher. It is strictly functional: without it, every visit would revert to the browser-detected language and ignore your choice. It does not identify you and is shared with no one.",
          "**We use no advertising cookies, tracking pixels, heatmaps or third-party behavioural analytics.** That is why this site has no cookie banner — there is nothing to consent to.",
          "Inside Zenda, your session token lives in the browser's local storage to keep you signed in. Signing out clears it.",
        ],
      },
      {
        id: "legal-basis",
        heading: "On what legal basis",
        body: [
          "For health data the basis is **protection of health, in a procedure carried out by health professionals and health services** (art. 11, II, “f”) — not consent. That is deliberate: consent can be withdrawn at any moment, and a record that vanishes mid-treatment is a risk to the patient.",
          "For platform users and client account data, the basis is **performance of a contract** (art. 7, V).",
          "For security and fraud prevention, the basis is **legitimate interest** (art. 7, IX), with a documented impact assessment.",
          "For retaining application access logs, the basis is **compliance with a legal obligation** (art. 7, II): Brazil's Internet Civil Framework (Law 12.965/2014, art. 15) requires an application provider incorporated as a legal entity to keep those logs for six months, under confidentiality and in a controlled environment.",
        ],
      },
      {
        id: "children",
        heading: "Children and adolescents",
        body: [
          "Underage patients exist — paediatrics, orthodontics and many other specialties see children every day. That raises the standard of care, which is why this has a section of its own.",
          "Data about children and adolescents is processed **always in their best interest** (LGPD art. 14). The legal basis remains protection of health (art. 11, II, “f”), exercised by the treating professional — not a blanket consent collected by us.",
          "**A minor patient's rights are exercised by a parent or legal guardian**, with the doctor or clinic treating them.",
          "Zenda **is not intended for use by anyone under 18**: no account may be created by a minor. Nor do we collect children's data directly — what reaches us comes from the conversation the guardian or the professional starts.",
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
          "**Conversations and records:** for as long as the professional–patient relationship lasts. Where the controller considers a record part of the patient's medical file, the professional council's rule applies — CFM Resolution 1.821/2007 sets a minimum of 20 years from the last entry, and permanent retention for anything archived electronically.",
          "**Application access logs:** six months, as required by the Internet Civil Framework (art. 15). This period cannot be shortened on request — it is a legal requirement, not our choice.",
          "**Audit logs** (who opened which conversation, and when): five years, to support the accountability duty in LGPD art. 37.",
          "**Platform user account data:** up to 90 days after the account is closed.",
          "**Backups:** data erased from the live system may persist in backups for up to 30 further days, unused, until normal rotation.",
        ],
      },
      {
        id: "rights",
        heading: "Data subject rights",
        body: [
          "The LGPD (art. 18) grants confirmation of processing, access, correction, anonymisation, portability, information about sharing, and erasure.",
          "**If you are a patient:** contact the doctor or clinic that treats you. They are the controller of your data. If you write to us, we will forward it and tell you where it went.",
          "**If you use Zenda or are a Waterfall client:** write to hello@waterfalltech.xyz. We respond within the statutory period, free of charge.",
          "**You may also petition the ANPD directly** — Brazil's National Data Protection Authority — if you believe your rights have not been met (art. 18, §1). You do not have to come to us first.",
        ],
      },
      {
        id: "deletion",
        heading: "How to request deletion of your data",
        body: [
          "This has its own section because it is the most common question — and because the answer depends on who is asking. A page with the full step-by-step lives at **/legal/data-deletion**.",
          "**If you are a patient:** the request goes to the doctor or clinic treating you, who is the controller of your data. Ask them by any means, including the WhatsApp conversation itself. They carry out the deletion inside Zenda. If you write to us by mistake, we forward it to the controller and tell you where it went.",
          "**If you use Zenda:** ask from within the account, or email hello@waterfalltech.xyz from your registered address. The account and associated data are erased within 15 days.",
          "**If you are a doctor or clinic and want to leave:** whoever administers the account can export everything and request erasure. We carry it out within 30 days.",
          "In every case deletion is **free of charge**. What survives it is only what the law requires us to keep — access logs for the statutory period, and the minimum needed to evidence that the request was fulfilled.",
        ],
      },
      {
        id: "automated",
        heading: "Automated decisions",
        body: [
          "Zenda **makes no automated decisions affecting a patient's interests**. There is no algorithmic triage, no clinical risk scoring and no automatic prioritisation of care.",
          "What is automatic is operational and visible: the return date computed from the interval the professional set, and lists ordered by who has waited longest. Every message sent to a patient originates with a person, or with an automation the professional configured and can switch off.",
          "If that changes, this section changes first — and the right to review under LGPD art. 20 will be exercisable with the controller.",
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
          "**Data protection officer** (LGPD art. 41): Marcos Nunes — hello@waterfalltech.xyz. This is the channel for questions about this policy and for rights exercised by anyone with a direct relationship with us.",
          "**Patients should contact the doctor or clinic treating them**, who is the controller and appoints their own officer.",
          "**National Data Protection Authority (ANPD):** gov.br/anpd",
        ],
      },
    ],
  },

  deletion: {
    slug: "data-deletion",
    title: "Data Deletion",
    updatedAt: UPDATED,
    lede: "How to request deletion of data from Zenda, who should ask whom, and how long it takes. A separate page on purpose: whoever lands here already knows what they want.",
    sections: [
      {
        id: "who-asks",
        heading: "First: who should ask whom",
        body: [
          "The answer depends on who is asking, and sending it to the wrong place only delays things.",
          "**Patient** → ask the doctor or clinic treating you. They are the controller of your data: they decided to collect it and they can erase it. Waterfall only operates the system on their behalf and cannot erase patient data on its own initiative.",
          "**Zenda user** (assistant, secretary) → ask us.",
          "**Doctor or clinic** wanting to leave and take the data → ask us, through whoever administers the account.",
          LANGUAGE_NOTE,
        ],
      },
      {
        id: "patient",
        heading: "If you are a patient",
        body: [
          "Contact the practice that treats you. Any channel works — including replying in the WhatsApp conversation itself: “please delete my data”.",
          "The professional carries out the deletion inside Zenda, covering the messages, the record and the treatment history held by that practice.",
          "If you write to **hello@waterfalltech.xyz** by mistake, we forward it to the controller and tell you where it went. We do not decide about data that is not ours — but we do not let the request die either.",
          "If you do not know who to contact, or the practice does not reply, write to us anyway. We will help identify the controller.",
        ],
      },
      {
        id: "user",
        heading: "If you use Zenda",
        body: [
          "Email **hello@waterfalltech.xyz** from the address registered on the account — that is how we confirm the request is yours.",
        ],
        list: [
          "Subject: “Data deletion”.",
          "Say whether you want to erase **your user account** or **the whole operation**, with its clients and conversations.",
          "We acknowledge within 2 business days.",
          "**We execute within 15 days**, and confirm in writing when it is done.",
        ],
      },
      {
        id: "client",
        heading: "If you are a doctor or clinic",
        body: [
          "You are the controller of your patients' data. At any time, free of charge, you may request:",
        ],
        list: [
          "**Export** of everything Zenda holds about your practice — conversations, records, appointments — in a machine-readable format.",
          "**Erasure** of that data, carried out within 30 days.",
          "**Export followed by erasure**, which is the normal path when a relationship ends: you take the history and we delete our copy.",
          "The request may come from you or from whoever administers your Zenda account. Write to hello@waterfalltech.xyz.",
        ],
      },
      {
        id: "meta",
        heading: "Data held by Meta",
        body: [
          "Messages travel through WhatsApp, so part of the data sits in Meta's infrastructure — and that part **is not under our control**. Deleting from Zenda does not delete from WhatsApp.",
          "For data Meta processes on its own account, the request goes to Meta through its own channels. If you disconnect the number from Zenda we stop sending and receiving on it immediately, but what has already passed through Meta follows Meta's rules.",
          "The doctor's phone also keeps its own copy of the conversations in the WhatsApp Business app. That copy is theirs, on their device, and is deleted there.",
        ],
      },
      {
        id: "exceptions",
        heading: "What is not deleted, and why",
        body: [
          "Deletion is broad but not absolute — the LGPD itself (art. 16) preserves what the law requires to be kept. The following remain:",
        ],
        list: [
          "**Application access logs**, for six months, under the Internet Civil Framework (art. 15). A legal obligation that cannot be waived on request.",
          "**Evidence that the request was fulfilled** — date, type of request and confirmation — without the deleted content. It is what lets us demonstrate we complied.",
          "**Data the controller is required to keep** under professional council rules, such as medical record retention where applicable.",
          "**Backups** may hold the data for up to 30 further days, unused, until normal rotation. They are not consulted for any other purpose.",
        ],
      },
      {
        id: "contact",
        heading: "Contact",
        body: [
          "**hello@waterfalltech.xyz** — Waterfall, CNPJ 42.804.319/0001-10, Rio de Janeiro, Brazil.",
          "Data protection officer: Marcos Nunes.",
          "You may also petition Brazil's data protection authority, the **ANPD** (gov.br/anpd), directly — you do not have to come to us first.",
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
