import { useState, useEffect } from 'react'

function Login() {
    const [user, setUser] = useState(null);
    const [toggleRegister, setToggleRegister] = useState(false)

    //login variables
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState(''); 

    //register variables
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState(''); 

    //get the logged in user on load
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const response = await fetch('http://localhost:3001/api/auth/check', {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (data.loggedIn) {
            setUser(data.user);
        }
    };

    function toggleForm() {
        setToggleRegister((prev) => !prev);
    }
    
    //login function
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        });

        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
            console.log('Login successful!');
        } else {
            console.error('Login failed:', data.error);
        }
    };

    //register function
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Registration successful!');
            // Switch to login form after successful registration
            setToggleRegister(false);
            // Clear register fields
            setRegisterEmail('');
            setRegisterPassword('');
        } else {
            console.error('Registration failed:', data.error);
        }
    };

    const handleLogout = async () => {
        await fetch('http://localhost:3001/api/logout', {
          method: 'POST',
          credentials: 'include'
        });
        setUser(null);
    };
    
    return (
        <>
        <h1>Einloggen</h1>
        {/*if user exist (logged in) show:*/}
        {user ? (
            <div>
                <p>Hallo, {user.email}!</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            
            <div className="auth-container">
                {/*if toggle register (register button clicked previously) show register mask*/}
                <div className="auth-card">
                    {toggleRegister ? (
                        <>
                            <h2>Registrieren</h2>
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label htmlFor="register-email">E-Mail</label>
                                    <input 
                                        type="email" 
                                        id="register-email" 
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-password">Passwort</label>
                                    <input 
                                        type="password" 
                                        id="register-password" 
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                <button type="submit">Registrieren</button>
                            </form>

                            <p className="switch-text">
                                Schon registriert?{" "}
                                <span onClick={toggleForm} className="link">Einloggen</span>
                            </p>
                        </>
                    ) : (
                        <>
                            {/*if not toggle register (default behavior when not logged in) show login mask*/}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={loginEmail} 
                                        onChange={(e) => setLoginEmail(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        value={loginPassword} 
                                        onChange={(e) => setLoginPassword(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <button type="submit">Einloggen</button>
                            </form>

                            <p className="switch-text">
                                Noch nicht registriert?{" "}
                                <span onClick={toggleForm} className="link">Registrieren</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        )}
        </>
    )
}

export default Login