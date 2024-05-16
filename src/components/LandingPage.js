import './LandingPage.css';
import { useState, useRef, useEffect } from 'react';

function LandingPage()
{
    const [qaPair, setQAPair] = useState([])
    const [text, setText] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


    async function apiCall()
    {
        await fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            body:JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages:[{
                    role: 'user',
                    content: text
                }]
            })
        }).then(response => response.json())
          .then(data => { setAnswer(data.choices[0].message.content)})
          .catch(error => { console.error('Error:', error) })
    }

    function handleEnterKeyPress(e)
    {
        if((e.key).toLowerCase() === 'enter')
        {
            e.preventDefault();
            setQuestion(text); 
            apiCall();
            addQAPairs(question, answer); 
            setAnswer('');
            setText('');
        }
    }

    const bottomContainer = useRef(null)

    function scrollBottom()
    {
        if (bottomContainer.current) {
          bottomContainer.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    useEffect(() => {
        scrollBottom();
    }, [question, answer])

    function addQAPairs(question, answer)
    {
        setQAPair([...qaPair, {question, answer}])
    }

    const qandA = qaPair.map((pair, index) => 
        <div className='qa-container' key={index}>  
            <div className="question">{pair.question}</div>
            <div className="answer">{pair.answer}</div>
        </div>
    )


    return(
        
        <section className="main-area">
            <div className='main-area-div'>
                <h3 style={{textAlign: 'center'}}>Enter your Question:</h3>
                {qandA}
                <div className="question">{question}</div>
                <div className="answer">{answer}</div>
                <div ref={bottomContainer} style={{marginTop: '70px', width: '100%'}}></div>
            </div>

            <div className="inputarea">
                <div className="inputspace">
                    <textarea className="textarea" 
                    placeholder="Message ScopeGPT..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleEnterKeyPress}>
                    </textarea>
                    <button disabled={text === ''} onClick={() => {setQuestion(text); apiCall(); addQAPairs(question, answer); setAnswer(''); setText('')}} className="sendbtn"><img src='https://webst-images.s3.eu-north-1.amazonaws.com/icons8-send-30.png' alt='send button' className=''/></button>
                </div>
            </div>
            <div className='info'>Developed by Richard</div>
        </section>
    )
}

export default LandingPage