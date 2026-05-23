import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("userInfo");

  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;