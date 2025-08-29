import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const { baseurl } = useAuthStore();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${baseurl}/api/auth/verify/${token}`);
        setStatus(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setStatus(error.response?.data?.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="bg-base-100 p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
