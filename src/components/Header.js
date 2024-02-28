import './header.css'

export default function Header({handleTheme})
{
    return(
        <section className='header-section'>
                <header className="header">
                    <div className='logocontainer'>
                        <img src='https://webst-images.s3.eu-north-1.amazonaws.com/ScopeImg.jpg' alt='Scopegpt logo' className='logo'/>         
                    </div>
                    <h1 className="scopegpt">ScopeGPT</h1>
                    <div className="theme" onClick={handleTheme}></div>
                </header>
            </section>
    )
}