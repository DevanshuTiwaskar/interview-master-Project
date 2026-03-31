import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true ///Browser cookies ko backend ke saath send karna allow karo
})

/**
 * Register a new user.
 *
 * Sends a POST request to the backend authentication API
 * to create a new user account.
 *
 * @async
 * @function register
 * @param {Object} params - User registration details
 * @param {string} params.email - User email address
 * @param {string} params.username - Username chosen by the user
 * @param {string} params.password - User account password
 *
 * @returns {Promise<Object|undefined>} Returns response data from the server if successful.
 *
 * @example
 * register({
 *   email: "devanshu@gmail.com",
 *   username: "devanshu",
 *   password: "123456"
 * })
 */
export async  function register({email, username, password }){

try {
    const response = await api.post("/api/auth/register",{
      email,username, password  ///Ye data backend ko bheja ja raha hai.
    })
  
    return response.data
    
} catch (error) {

    console.log(error)
}
}



/**
 * Login an existing user.
 *
 * Sends a POST request to the backend authentication API
 * to verify user credentials and log the user into the system.
 *
 * @async
 * @function login
 * @param {Object} params - User login credentials
 * @param {string} params.email - Registered user email
 * @param {string} params.password - User password
 *
 * @returns {Promise<Object|undefined>} Returns response data from the server if login is successful.
 *
 * @example
 * login({
 *   email: "devanshu@gmail.com",
 *   password: "123456"
 * })
 */
export async function login({ email, password }) {
  try {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password // Credentials sent to backend
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Logout the currently authenticated user.
 *
 * Sends a request to the backend to clear the user's
 * authentication session or cookie.
 *
 * @async
 * @function logout
 * @returns {Promise<Object|undefined>} Returns response data from the server after logout.
 *
 * @example
 * await logout()
 */
export async function logout() {
  try {

    const response = await api.get("/api/auth/login");
    return response.data;

  } catch (error) {
    console.log(error);
  }
}



/**
 * Fetch the currently logged-in user's details.
 *
 * Sends a request to the backend to retrieve
 * the authenticated user's information using cookies/session.
 *
 * @async
 * @function getMe
 * @returns {Promise<Object|undefined>} Returns the logged-in user's data.
 *
 * @example
 * const user = await getMe()
 * console.log(user)
 */
export async function getMe() {
  try {

    const response = await api.get("/api/auth/get-me");
    return response.data;

  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    console.log(error);
  }
}