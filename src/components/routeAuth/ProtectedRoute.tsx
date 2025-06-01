import { useAuthStore } from "../../store/auth";
import { useEffect, type ReactElement } from "react"
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    children : ReactElement;
}
const ProtectedRoute = ({children} : ProtectedRouteProps) => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuthStore();

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login');
        }
    })
    return (
        <>{children}</>
    )
}

export default ProtectedRoute