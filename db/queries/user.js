import { databases } from "../appwrite";
import { ID } from "appwrite";
import { Query } from "appwrite";

const getUserByEmail = async (email) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
      [Query.equal("email", email)]
    );
    return response.documents[0];
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (name, email, image) => {
  try {
    console.log(email);
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
      ID.unique(),
      {
        Name: name,
        email: email,
        image: image,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUserByEmail, createUser };
