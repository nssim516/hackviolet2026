Project: AI Medical Visit Companion

Overview

This project is an iOS mobile application that acts as an AI-powered companion for medical appointments, supporting users before, during, and after doctor visits.

The app is designed as a personal health journal and visit memory system, helping users:
	•	prepare thoughtful questions
	•	capture and understand what happens during appointments
	•	receive clear summaries and next steps
	•	reflect on communication quality and clarity

The UI intentionally avoids chat-style interfaces and instead uses structured cards, journaling patterns, and minimal, calming layouts.

Core Goals
	•	Reduce confusion and information loss during medical appointments
	•	Help users feel prepared and confident before visits
	•	Support real-time self-advocacy with suggested follow-up questions
	•	Translate medical jargon into plain language
	•	Create a persistent, private medical visit record
	•	Encourage reflection on communication and clarity

Design Principles
	•	Journal-based, warm, and personal tone
	•	Minimal, low-distraction during appointments
	•	Structured cards instead of chat UIs
	•	Accessibility-first typography and spacing
	•	Calm gradient accents (violet → pink)
	•	Trustworthy, healthcare-appropriate aesthetics

User Flow Summary
```text
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

⸻

Screens & Functional Requirements

⸻

1. Authentication

Purpose
	•	Secure user access
	•	Establish trust and privacy

Features
	•	Email + password login
	•	Optional biometric sign-in (Face ID)
	•	Privacy indicator (“Encrypted & Private”)

⸻

2. Home Screen — Health Journal Timeline

Purpose
	•	Act as the emotional and functional center of the app
	•	Combine journaling with medical history

Features
	•	Journal-style timeline of past appointments
	•	Date
	•	Doctor name
	•	Specialty
	•	Short AI-generated visit summary preview
	•	Daily journaling prompt:
	•	“How are you feeling today?”
	•	Free-form text input
	•	Quick mood/symptom tags
	•	Primary CTA:
	•	“Prepare for Appointment”

⸻

3. Prepare for Appointment

Purpose
	•	Help users organize thoughts and goals before the visit

Features
	•	Appointment metadata (doctor, date, time)
	•	Private notes section:
	•	Symptoms & observations
	•	Appointment goals
	•	Optional voice input for notes
	•	AI-generated Suggested Questions
	•	Displayed as horizontal cards
	•	Categorized (medication, lifestyle, monitoring, etc.)
	•	Ability to star or add to prepared list

⸻

4. During Appointment — Appointment Assistant

Purpose
	•	Support the user without distracting them

Features
	•	Large, clear Record Appointment control
	•	Subtle recording indicator and timer
	•	Ambient audio visualization
	•	Prepared questions carousel:
	•	Mark questions as “addressed” or “pending”
	•	AI-suggested follow-up questions:
	•	Updated periodically (near real-time)
	•	Displayed as short, actionable prompts
	•	Minimal UI; no typing required

⸻

5. Visit Summary & Insights

Purpose
	•	Turn raw conversation into understandable, actionable information

Features
	•	Visit metadata (doctor, date, clinic)
	•	AI-generated visit summary
	•	Optional audio playback of AI summary
	•	Next Steps checklist:
	•	Medications
	•	Tests
	•	Follow-ups
	•	Appointments
	•	Medical Terms Explained
	•	Plain-language definitions
	•	Displayed as cards
	•	CTA to ask follow-up questions or share summary

⸻

6. Reflection & Communication Review

Purpose
	•	Encourage self-reflection and improve future visits

Features
	•	Sliders for:
	•	“Did you feel heard?”
	•	“Clarity of next steps”
	•	Communication concerns (multi-select):
	•	Felt rushed
	•	Confused by jargon
	•	Forgot questions
	•	Interrupted
	•	Hard to hear
	•	Optional AI assistant note summarizing patterns
	•	All reflection data is private and user-controlled

⸻

AI Capabilities (High-Level)
	•	Speech-to-text transcription of appointment audio
	•	Near real-time or batched analysis during visits
	•	Follow-up question generation using:
	•	Pre-appointment notes
	•	Ongoing transcript
	•	Already-addressed questions
	•	Post-visit summarization
	•	Medical jargon explanation
	•	Pattern recognition for reflection support

⸻

Technical Expectations (Abstract)

This document intentionally avoids locking into a specific stack, but the system should support:
	•	iOS native UI (declarative framework preferred)
	•	Local audio recording with reliable fallback
	•	Backend-based AI processing
	•	Session-based appointment data
	•	Secure storage of audio, transcripts, and summaries
	•	Expandability toward healthcare compliance standards

⸻

Non-Goals (For MVP / Hackathon Scope)
	•	No direct clinical diagnosis
	•	No medical decision-making
	•	No emotion or mental-state detection claims
	•	No real-time clinical alerts
	•	No provider-facing features

⸻

Intended Outcome

A polished, believable prototype that demonstrates:
	•	thoughtful product design
	•	responsible AI usage
	•	clear healthcare value
	•	emotional intelligence
	•	strong UX decisions

The app should feel like a trusted companion, not a chatbot.
