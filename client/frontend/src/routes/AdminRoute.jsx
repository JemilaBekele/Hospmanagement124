import { Navigate } from "react-router-dom"
import { authService } from "../services/authService"
import PropTypes from 'prop-types'; 
export const AdminPrivateRoute = ({children}) => {

   return (authService.getUserRole() === 'admin') ? children  : <Navigate to="/" />
}
AdminPrivateRoute.propTypes = {
   children: PropTypes.node.isRequired,
 };
 