import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
    return (
        <>
            <ul>
                <li>
                    <a onClick={() => navigate("/")}>Home</a>
                </li>
                <li>
                    <a onClick={() => navigate("/profile")}>Profile</a>
                </li>
            </ul>
        </>
    )
}

