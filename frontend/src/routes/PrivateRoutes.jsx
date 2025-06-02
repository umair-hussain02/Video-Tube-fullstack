import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.user);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
