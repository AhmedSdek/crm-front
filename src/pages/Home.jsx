import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    useEffect(() => {
        if (!token) {
            navigate('/login')
        };
        if (user && user.role === 'sales') {
            navigate('/sales')
        }
        if (user && user.role === 'admin') {
            navigate('/admin-dashboard')
        }
        if (user && user.role === 'hr') {
            navigate('/hr')
        }
    }, [navigate]);
    return (
        <div>Home</div>
    )
}

export default Home