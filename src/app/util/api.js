import axios from "axios";
import { getToken, saveToken } from "./authUtil";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Environment-based URL

// Utility function to make API calls
export async function makeApiCall(endpoint, method = "GET", body = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add authorization token if available
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers,
    };

    if (body) {
      config.data = body;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);

    if (error.response) {
      const errorMessage = error.response.data.message || "API error occurred.";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error(error.message || "An unknown error occurred.");
    }
  }
}

// Fetch users
export function getUsers() {
  return makeApiCall("/users/list", "GET");
}

// Delete a user
export async function deleteUser(id) {
  return await makeApiCall(`/users/delete/${id}`, "DELETE");
}

// Fetch books issued to a user
export function getUserBooks(userId) {
  return makeApiCall(`/bookissue/user/${userId}`, "GET");
}

// Other existing functions
export async function login(data) {
  console.log("Login Request Data:", data);

  const response = await makeApiCall("/auth/login", "POST", data);
  console.log("API Raw Response:", response);

  if (!response.token || !response.id) {
    throw new Error("Login failed: Missing token or user ID");
  }

  saveToken(response.token);

  return {
    token: response.token,
    userRole: response.userRole,
    id: response.id, // Ensure the ID is returned
  };
}


export async function add(data) {
  return await makeApiCall("/users/add", "POST", data);
}

export function getBooks() {
  return makeApiCall("/books/list", "GET");
}

export async function deleteBook(id) {
  return await makeApiCall(`/books/delete/${id}`, "DELETE");
}

export async function addBook(data) {
  return await makeApiCall("/books/add", "POST", data);
}

export async function createBookIssue(bookIssueData) {
  return await makeApiCall("/bookissue/issue", "POST", bookIssueData);
}

export async function getBookIssues() {
  return await makeApiCall("/bookissue/list", "GET");
}

export function updateBook(id, updatedData) {
  return makeApiCall(`/books/update/${id}`, "PUT", updatedData);
}

export function updateUser(id, updatedUser){
    return makeApiCall(`/users/update/${id}`,"PUT", updatedUser);
};

export async function deleteBookIssue(id) {
  try {
    const response = await makeApiCall(`/bookissue/delete/${id}`, "DELETE");
    if (!response.ok) {
      // If the response is not successful, return an error message instead of throwing
      const errorResponse = await response.json();
      throw new Error(`Failed to delete the book issue with id ${id}: ${errorResponse.message || "Unknown error"}`);
    }
    return await response.json(); // Assuming the backend returns a JSON response
  } catch (error) {
    console.error("API error in deleteBookIssue:", error);
    throw error; // This will be caught by the frontend catch block
  }
}
export async function listById(id) {
  console.log("Making API call");
  return await makeApiCall(`/users/list/${id}`, "GET");
}
