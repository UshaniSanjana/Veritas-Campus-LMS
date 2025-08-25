// api/user.js
import axios from "axios";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  const endpointMap = {
    student: "https://veritas-campus-lms-production.up.railway.app/api/me",
    // instructor: "/api/instructors/me", // placeholder for future
    // admin: "/api/admins/me",          // placeholder for future
  };

  const response = await axios.get(endpointMap[role], {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
