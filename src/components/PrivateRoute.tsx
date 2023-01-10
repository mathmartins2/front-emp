import { RouteProps, Navigate } from "react-router-dom";
import { keycloak } from "../utils/auth";
export function PrivateRoute({ children }: RouteProps): JSX.Element {
  return (
    <>
      {keycloak.authenticated ? (
        children
      ) : (
        <Navigate to="/login"/>
      )}
    </>
  )
};