import './LandingPage.css';
import { useState } from 'react';



function MainArea()
{
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [text, setText] = useState('')


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
          .then(data => { setAnswer(data.choices[0].message.content); console.log(data.choices[0].message.content)})
          .catch(error => { console.error('Error:', error) })
    }

    function handleEnterKeyPress(e)
    {
        if((e.key).toLowerCase() === 'enter')
        {
            e.preventDefault();
            setQuestion(text); 
            setText('');
            apiCall();
        }
    }

    return(
        
        <section className="main-area">
            <div className='main-area-div'>
                <h3 style={{textAlign: 'center'}}>Enter your Question:</h3>
                <div className="question">{question}</div>
                <div className="answer">{answer}</div>
            </div>

            <div className="inputarea">
                <div className="inputspace">
                    <textarea className="textarea" 
                    placeholder="Message ScopeGPT..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleEnterKeyPress}>
                    </textarea>
                    <button onClick={() => {setQuestion(text); setText(''); apiCall()}} className="sendbtn"><img src='https://webst-images.s3.eu-north-1.amazonaws.com/icons8-send-30.png' alt='send button' className=''/></button>
                </div>
            </div>

            <div className='info'>Developed by SCOPE</div>
        </section>
    )
}


function LandingPage()
{
    return(
        <div className="main">
            <MainArea/>
        </div>
    )
}

export default LandingPage