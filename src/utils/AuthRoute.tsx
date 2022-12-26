import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

interface PropType {
  component: React.FC;
}

const AuthRoute: FC<PropType> = ({ component: Component }) => {
  const { auth } = useContext(AuthContext);

  if (auth) return <Component />;
  return <Navigate to="/" />;
};

export default AuthRoute;
