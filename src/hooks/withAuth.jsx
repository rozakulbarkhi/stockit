import { redirect } from "react-router-dom";
import cookie from "js-cookie";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    useEffect(() => {
      const token = cookie.get("token");

      if (!token) {
        localStorage.removeItem("user");
        return redirect("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
