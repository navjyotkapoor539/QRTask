import { jwtDecode } from "jwt-decode";

const GetAdminFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
  
    try {
      return jwtDecode(token); // Decode the JWT payload to extract user info
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
}

export default GetAdminFromToken;