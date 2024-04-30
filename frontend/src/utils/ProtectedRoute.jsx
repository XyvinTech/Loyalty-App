import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const loggedIn = localStorage.getItem("4ZbQwXtY8uVrN5mP7kL3JhF6") === null ? false : true;
  return loggedIn ? props.children : <Navigate to="/login" />;
}

export default ProtectedRoute;