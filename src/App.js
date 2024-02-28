import {useState} from 'react'
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import './App.css'



function App() {
    const [theme, setTheme] = useState('dark')

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
