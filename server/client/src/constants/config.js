export const API_NOTIFICATION_MESSEGES = {
  loading: {
    title: "Loading...",
    messege: "Data is being loading, please wait!",
  },
  success: {
    title: "success",
    messege: "Data successfully loaded",
  },
  responseFailureServer: {
    title: "Error",
    messege:
      "An error occured while fetching respose from the server. please try again",
  },
  responseFailure: {
    title: "Error",
    messege: "An error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    messege:
      "Unable to connect with the server. Please check internet connectivity and try again later",
  },
};

// API SERVICE URL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE" }
export const SERVICE_URLS = {
  userSignUp: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  getRefreshToken: { url: "/token", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "/post", method: "GET", query: true },
  updatePost: { url: "/update", method: "PUT", query: true },
  deletePost: { url: "/delete", method: "DELETE", query: true },
  newComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "/comments", method: "GET", query: true },
  deleteComment: { url: "/comment/delete", method: "DELETE", query: true },
};
