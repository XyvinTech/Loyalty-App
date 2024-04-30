import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const loggedIn = localStorage.getItem("token") === null ? false : true;
  return loggedIn ? props.children : <Navigate to="/login" />;
}

export default ProtectedRoute;