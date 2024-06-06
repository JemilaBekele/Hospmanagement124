
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes

import { authService } from "../services/authService";

export const PrivateRoute = ({ children }) => {
  return authService.isLoggedIn() ? children : <Navigate to="/" />;
};

// Add PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
