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
    
    //login funktion
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:loginEmail,
                password:loginPassword
            })
        });

        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
            console.log('Login successful!');
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

        {user ? (
            <div>
                <p>Hallo, {user.email}!</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div className="auth-container">
                <div className="auth-card">
                    {toggleRegister ? (
                        <>
                            <h2>Registrieren</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="register-email">E-Mail</label>
                                    <input type="text" id="register-email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-password">Passwort</label>
                                    <input type="password" id="register-password" required />
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
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