import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = cookie.get("token");

      if (!token) {
        localStorage.removeItem("user");
        navigate("/");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
