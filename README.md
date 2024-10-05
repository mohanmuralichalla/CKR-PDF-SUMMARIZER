## Introduction

Takes in PDF and gives out a UI for User to ask questions and get answers from the PDF.

https://github.com/TejasBhovad/pdf-summary/assets/107751658/a266f1be-2673-45da-b41f-a521f441db6f

> The project is live at [https://pdf-crunch.vercel.app/](https://pdf-crunch.vercel.app/) but because it uses Ollama which is run locally, only frontend is live.

## Tech used

- NextJS (Meta Framework for React)
- TailwindCSS (Utility First CSS Framework)
- Database: Appwrite
- PDF Parser: PyPDF2
- AI Model: llama2 (using Ollama) using langchain
- File storage: Uploadthing(wrapper for S3)
- Backend: FastAPI (Python)
- ShadCN UI (for toasts and dialogs)

## How to run

- Install Ollama
- Clone the repo
- Run `npm install`
- Run `npm run dev`
- add API KEYS in `.env.local` files

## API Endpoints




- ` api/pdf_text` : Takes in a PDF and returns the text in the PDF
- `api/ask_ollama` : Takes in a question and returns the answer from the PDF
- Abstracted endpoints for Uploadthing and NextAuth
  Here's how you can represent the schema as tables:

## Database Schema

**Users Table**

| Column   | Type     |
| -------- | -------- |
| name     | string   |
| email    | string   |
| image    | url      |
| sessions | relation |

**Sessions Table**

| Column  | Type     |
| ------- | -------- |
| users   | relation |
| title   | string   |
| pdf_url | url      |
