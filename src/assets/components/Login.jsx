import { useState } from 'react'

function Login() {

    const [toggleRegister, setToggleRegister] = useState(false)

    //login variables
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    //register variables
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState(''); 

    function toggleForm() {
        setToggleRegister((prev) => !prev);
      }
    
      const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:loginEmail,
                password:loginPassword
            })
        });

        const data = await response.json();
        console.log(data);
      };
    
    return (
        <>
        <h1>Benutzer</h1>

        {/*Einloggen Maske wenn toggleRegister == false
            Registrieren Maske wenn true + Registrieren Button*/}

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
                        <h2>Einloggen</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}required />
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
        </>
    )
}

export default Login