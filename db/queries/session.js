import { databases } from "../appwrite";
import { Query } from "appwrite";
import { ID } from "appwrite";
const createSession = async (userId, title, pdfUrl, page_id) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_ID,
      ID.unique(),
      {
        users: userId,
        title: title,
        pdf_url: pdfUrl,
        page_id: page_id,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getSessionsByUserId = async (userId) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_ID,
      [Query.equal("users", userId)]
    );
    return response.documents;
  } catch (error) {
    console.log(error);
  }
};

const getSessionByPageId = async (page_id) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_ID,
      [Query.equal("page_id", page_id)]
    );
    return response.documents[0];
  } catch (error) {
    console.log(error);
  }
};

const deleteSession = async (sessionId) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_ID,
      sessionId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  createSession,
  getSessionsByUserId,
  deleteSession,
  getSessionByPageId,
};
