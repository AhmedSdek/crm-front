import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');
    const nav = useNavigate()
    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                console.log(decodedUser)
                setUser(decodedUser);
                if (decodedUser.role === "sales") {
                    nav('/allleads')
                }
                if (decodedUser.role === "admin") {
                    nav('/admin-dashboard')
                }
            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        }
    }, [token]);
    // useEffect(() => {

    // }, []);
    return (
        <div>Home</div>
    )
}

export default Home