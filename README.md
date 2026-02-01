# HealthiHer 
**AI Medical Visit Companion**

HealthiHer is a responsive web application that helps users feel more prepared and supported through the full medical appointment lifecycle — **before, during, and after** a doctor visit.

Instead of a chatbot UI, HealthiHer uses a **journal-based interface** with structured cards, checklists, and visit timelines to reduce cognitive load and make medical information easier to understand and revisit later.

---

## Core Features

### Pre-Appointment Planning
- Visit metadata (doctor name, reason, date/time)
- Symptom + goals notes
- AI-generated **Suggested Questions**
- Save/star questions + add custom questions

### During Appointment Mode
- In-browser recording (Start/Stop)
- Recording timer + active indicator
- Quick access to prepared questions (tap to mark as asked)

### Post-Visit Summary & Insights
- Plain-language visit summary (bullet points)
- Follow-up & next steps checklist
- Medical terms explained (jargon -> simple language)
- Suggested follow-up questions for future visits
- **Bias detection score** (flags dismissive language patterns)

### Reflection & Communication Review
- Quick slider/rating prompts (heard, clarity, comfort)
- Optional checklist + reflection notes
- Saved to the visit record

---

## Why HealthiHer?

Doctor visits can be stressful, rushed, and easy to forget and patients often leave with unanswered questions or unclear next steps. HealthiHer is designed as a **visit memory system + private health journal**, helping users advocate for themselves with more clarity and confidence.

---

## Tech Stack

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**

### AI
- **OpenAI Whisper** (speech-to-text transcription)
- **OpenAI GPT-4.1-mini** (question generation, summaries, next steps, jargon)

### Data / Storage
- **localStorage**

### API Layer
- **Vite Dev Server Middleware**

---

## System Design

![HealthiHer System Design](https://i.imgur.com/Yna7p1O.png)

**High-level flow:**
1. User records audio in the browser
2. Audio is sent to Whisper for transcription
3. Transcript + visit context is analyzed by GPT-4.1-mini
4. App renders structured outputs (summary bullets, next steps, questions, terms)
5. Results are saved to localStorage as a visit record

---

## Project Structure

This repo is organized around **screens/pages** that match the user flow:

- Authentication
- Journal timeline (home)
- Prepare for appointment
- Appointment assistant (recording mode)
- Visit summary & insights
- Reflection

---

## Getting Started

### 1) Clone the repo
```bash
git clone https://github.com/nssim516/hackviolet2026.git
cd hackviolet2026
```
### 2) Install dependencies
```bash
npm install
```
### 3) Add environment variables
Create a .env file in the project root:
```bash
VITE_OPENAI_API_KEY=your_key_here
```
Note: This project uses OpenAI via middleware routes. Do not commit your key.

### 4) Run the dev server
```bash
npm run dev
```
### 5) Open:
```bash
http://localhost:3000/
```

## What’s Next
- Secure authentication + database-backed visit history
- Improved real-time follow-up question batching during appointment mode
- Export/share formats (PDF, share link)
- Interactive symptom map / body diagram input
- More personalization by age, specialty, and medical context

---
