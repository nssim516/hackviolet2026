🩺 Project: AI Medical Visit Companion (Web App)

Overview

This project is a responsive web application that acts as an AI-powered companion for medical appointments, supporting users before, during, and after doctor visits.

The app is designed as a personal health journal + visit memory system, helping users:
	•	prepare thoughtful questions
	•	capture and understand what happens during appointments
	•	receive clear summaries and next steps
	•	reflect on communication quality and clarity

The UI intentionally avoids chat-style interfaces and instead uses structured cards, journaling patterns, and minimal, calming layouts.

⸻

Core Goals
	•	Reduce confusion and information loss during medical appointments
	•	Help users feel prepared and confident before visits
	•	Support self-advocacy with suggested follow-up questions
	•	Translate medical jargon into plain language
	•	Create a persistent, private medical visit record
	•	Encourage reflection on communication and clarity

⸻

Design Principles
	•	Journal-based, warm, and personal tone
	•	Minimal, low-distraction during appointments (especially on mobile)
	•	Structured cards instead of chat UIs
	•	Accessibility-first typography and spacing
	•	Violet → pink gradient accents for CTAs and headers (used sparingly)
	•	Trustworthy, healthcare-appropriate aesthetics

⸻

User Flow Summary
```
Authentication
   ↓
Journal Home (Past Visits + Daily Notes)
   ↓
Prepare for Appointment
   ↓
During Appointment (Recording + Live Assistance)
   ↓
Visit Summary & Insights
   ↓
Reflection & Communication Review
```

Web App Requirements

Responsiveness
	•	Works on desktop, tablet, and mobile
	•	Desktop layout may show multiple panels; mobile uses stacked sections
	•	During-appointment screen should be optimized for one-handed mobile use

Browser Audio Support
	•	Must support in-browser audio recording using Web APIs
	•	Handle permission prompts gracefully
	•	Provide fallback messaging if the browser blocks recording

Privacy/Trust UX
	•	Clear indicators when recording is active
	•	User control over saving/deleting recordings
	•	Transparent disclaimers about AI-generated content

⸻

Screens & Functional Requirements

⸻

1. Authentication

Purpose
	•	Secure user access
	•	Establish trust and privacy

Features
	•	Email + password sign up / login
	•	Optional OAuth (Google/Apple) if time allows
	•	Simple privacy callout (e.g., “Your data is private and under your control”)

⸻

2. Home Screen — Health Journal Timeline (Web)

Purpose
	•	Emotional + functional hub of the app
	•	Combine journaling with appointment history

Layout
	•	Desktop: left sidebar + main journal feed
	•	Mobile: top navigation + vertical feed

Features
	•	Journal-style timeline of past appointments
	•	Date
	•	Doctor name
	•	Specialty / visit reason
	•	Short AI summary preview
	•	Daily journaling prompt:
	•	“How are you feeling today?”
	•	Free-form text input
	•	Quick symptom tags (optional)
	•	Primary CTA:
	•	“Prepare for Appointment” / “Start New Visit”

⸻

3. Prepare for Appointment

Purpose
	•	Organize symptoms/concerns/goals before the visit
	•	Generate an initial question list

Features
	•	Appointment metadata form:
	•	Doctor name (text)
	•	Date/time
	•	Visit reason (dropdown or free text)
	•	Notes section:
	•	Symptoms & observations
	•	Goals for the visit
	•	AI-generated Suggested Questions
	•	Displayed as cards / checklist
	•	Categories (clarifying, medication, tests, next steps)
	•	Save/star questions
	•	Ability to add custom questions manually
	•	CTA:
	•	“Begin Appointment Mode”

⸻

4. During Appointment — Appointment Assistant (Minimal UI)

Purpose
	•	Support the user without distraction
	•	Capture audio and optionally show live transcription

Design Requirement
	•	This page should feel calm, focused, and low-clutter.
	•	On mobile, prioritize a single primary action.

Features
	•	Primary control:
	•	Start/Stop Recording
	•	Active recording indicator:
	•	Timer
	•	Subtle pulsing dot
	•	Optional live transcript panel (secondary visual weight)
	•	Collapsible on mobile
	•	Prepared questions:
	•	Small, tappable list
	•	Toggle: “Asked / Unanswered”
	•	AI Suggested Follow-Up Questions
	•	Updates periodically (near real-time batching acceptable)
	•	Show only 1–3 questions at a time
	•	Allow user to tap “Asked” or “Save for later”

Important
	•	Avoid chat UI patterns and message bubbles.
	•	Present suggestions as “cards” and “checklists.”

⸻

5. Visit Summary & Insights

Purpose
	•	Convert the conversation into actionable and understandable outputs

Features (card-based sections)
	•	Visit Summary (plain language)
	•	Next Steps checklist:
	•	Medications
	•	Tests
	•	Follow-ups
	•	Lifestyle guidance
	•	Medical Terms Explained:
	•	Jargon → simple definitions
	•	Unanswered / Future Questions:
	•	Suggested follow-ups still pending
	•	Export/share options (hackathon-friendly versions):
	•	“Copy summary”
	•	“Download as PDF” (optional)
	•	“Share link” (optional)

⸻

6. Reflection & Communication Review

Purpose
	•	Help users reflect on clarity and communication without judgment

Features
	•	Sliders or rating prompts:
	•	“Did you feel heard?”
	•	“Was the plan clear?”
	•	“Did you feel comfortable asking questions?”
	•	“Communication concerns” checklist (optional):
	•	Felt rushed
	•	Confused by jargon
	•	Forgot questions
	•	Interrupted
	•	Hard to follow
	•	Optional free-form note field:
	•	“Anything you want to remember about how the conversation felt?”
	•	Save reflections to the appointment record

⸻

AI Capabilities (High-Level)
	•	Speech-to-text transcription of appointment audio
	•	Near real-time or batched analysis during visits
	•	Follow-up question generation using:
	•	Pre-appointment notes
	•	Transcript so far
	•	Previously “asked/answered” question states
	•	Post-visit summarization
	•	Medical jargon explanation

⸻

Technical Intent (Web)

Frontend
	•	Responsive UI with:
	•	journal feed/timeline
	•	card-based summaries
	•	lightweight during-appointment recording UI
	•	In-browser audio recording:
	•	Record locally first for reliability
	•	Upload chunks or full recording depending on implementation

Backend
	•	Session-based processing for each appointment
	•	Handles:
	•	audio uploads
	•	transcription calls
	•	summary generation
	•	follow-up question generation
	•	saving structured outputs
	•	Returns structured JSON (not chat responses)

Data Storage (Conceptual)
	•	User accounts
	•	Appointments
	•	Notes (pre + during + after)
	•	Transcripts and summaries
	•	Optional: audio file storage link (object storage)

⸻

Non-Goals (For MVP / Hackathon Scope)
	•	No medical diagnosis or clinical decision-making
	•	No “emotion detection” claims
	•	No provider-facing features
	•	No EHR integration
	•	No automated emergency alerts

⸻

Intended Outcome

A polished, believable web prototype that demonstrates:
	•	thoughtful product design
	•	responsible AI usage
	•	clear healthcare value
	•	emotionally intelligent UX
	•	strong “before/during/after” workflow

The app should feel like a trusted companion and memory system, not a chatbot.
