import { useState } from 'react'
import './Welcome.css';

function Welcome() {
    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <h1>Willkommen im Online-Supermarkt!</h1>
                <p>Frische Lebensmittel direkt zu Ihnen nach Hause.</p>
                <div className="welcome-info">
                    <p>🛒 Große Auswahl an Produkten</p>
                    <p>🚚 Schnelle Lieferung</p>
                    <p>💳 Sicheres Einkaufen</p>
                </div>
                <p className="login-prompt">Bitte loggen Sie sich ein, um einzukaufen.</p>
            </div>
        </div>
    )
}

export default Welcome