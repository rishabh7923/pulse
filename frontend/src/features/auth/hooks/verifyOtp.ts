import { verifyOtpApi } from "@/api/auth";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

function useVerifyOtp() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (otp: string) => verifyOtpApi(otp),
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: () => {
            toast.success("Verification done successfully");
            navigate("/");
        }

    })
}

export default useVerifyOtp