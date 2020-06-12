import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { RadioButton, RadioGroup } from 'react-radio-buttons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationManager } from 'react-notifications';
 
const Poll = (props) => {

    const [poll, setPoll] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [voteId, setVoteId] = useState({optionId: ''});
    const [submitted, setSubmitted] = useState(false);
    const [pickedVote, setPickedVote] = useState(false);
    
    useEffect(() => {
        axios.get(`api/poll/${props.match.params.id}`)
            .then(res => {
                
                setPoll(res.data);
                
            })
            .catch(err => {
               
                setHasError(true);
            })
    }, []);


    const handleVote = (id) => {
        setVoteId({optionId: id});
    }

    const submitVote = (e) => {
        e.preventDefault();
        console.log(voteId)
        axios.put('api/poll/vote', voteId)
            .then(res => {
                console.log(res.data);
                setPoll(res.data);
                setSubmitted(true);
            })
            .catch(err => {
                console.log(err)
            })
    
        console.log('submitted');
    }

    const voteChange = (value) => {
        console.log(value);
        setVoteId({optionId: value});
        setPickedVote(true)
    }

    const createNotification = () => {
        NotificationManager.success('Share this link to others!', 'Copied!');
    }


    //Data still loading
    if(!poll) {
        console.log('data is still loading')

        if(hasError){
            console.log('error when fetching data');

            return (
                <Redirect to="/404" />
            )
        }
        return(
            <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            style={{
                display: 'flex',
                flexDirection: 'column',
                verticalAlign: 'middle',
                alignItems: 'center'
            }} />
        )
    }
    
    // //Error is found
    if (hasError) {
        
     
        return (
            <Redirect to="/404" />
        )
    }
     
    if(submitted){
        

        return (
            <Redirect to={`${props.match.params.id}/results`} />
        )
    }
    
    // No errors and run content
    return (
        <div className="poll-container">
            <div className="poll-features">
                <CopyToClipboard text={window.location.toString()}>
                    <button id="copy-link-btn" className="btn" onClick={createNotification}>Copy Link</button>
                </CopyToClipboard>
            </div>
            <div className="question-container">
                <h1>{poll.question}</h1>
            </div>
            {/* <form onSubmit={submitVote} className="vote-options-container">
                {poll.options.map(item => (
                    <label>
                        {item.option}
                        <input 
                            name={item.option}
                            type="radio"
                            onChange={() => handleVote(item.uid)} 
                            name="poll"
                            />
                        <span className="checkmark"></span>
                    </label>

                ))}
                <input type="submit" value="submit" />
            </form> */}
            <form onSubmit={submitVote}>

                <RadioGroup onChange={voteChange}>
                    {poll.options.map(item => (
                        <RadioButton 
                            key={item.uid}
                            value={item.uid}
                            pointColor="#5cb85c" >
                            {item.option}
                        </RadioButton>
                    ))}
                    
                </RadioGroup>
                {pickedVote 
                ? 
                <input type="submit" className="btn" id="submit-vote-btn" value="Submit" />
                :
                <input type="submit" className="btn" id="submit-vote-btn" value="Submit" disabled/>
                }   
                
            </form>
            <Link to={props.match.params.id+'/results'} className="btn" id="results-btn">See Results</Link>
        </div>
    )
}

export default Poll
