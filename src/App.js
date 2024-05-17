import React, {useState, useEffect} from 'react'
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import './App.css'



function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    function themeToggler()
    {
        setTheme((curr) => (curr === 'dark' ? 'light':'dark'))
    }
    return (
        <div className="App" id={theme}>
            <Header handleTheme={themeToggler}/>
            <LandingPage/>
        </div>
    );
}

export default App;
