import { Client, Databases } from "appwrite";

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
export { databases };

// SCHEMA

// Users
// - name: string
// - email: string
// - image: url
// - sessions: relation

// Sessions
// - users: relation
// - title: string
// - pdf_url: url
