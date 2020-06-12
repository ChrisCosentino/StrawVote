import React, { useState, Fragment } from 'react'

import axios from 'axios';

import { GrAdd, GrSubtract } from 'react-icons/gr';
import { Redirect } from 'react-router-dom';

const CreatePoll = () => {

    const [formData, setFormData] = useState({
        question: '',
        options: [
            {option: ''},
            {option: ''}
        ]
    });

    // const [isCreated, setIsCreated] = useState(false);
    const [uniqueId, setUniqueId] = useState('');
    const {
        options
    } = formData;

    const addOption = e => {
        e.preventDefault();
        const newOptions = [...options];
        newOptions.push({ option: '' });

        setFormData({ ...formData, options: newOptions });
    }

    const removeOption = e => {
        e.preventDefault();

        const newOptions = [...options];
        newOptions.pop();
        setFormData({ ...formData, options: newOptions });
    }

    const handleQuestionChange = e => {
        setFormData({
          ...formData,
          question: e.target.value,
        });
    };

    const handleOptionChange = (e, index) => {
        const newOptions = [...options];
        newOptions[index].option = e.target.value;
      
        setFormData({
          ...formData,
          options: newOptions,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        axios.post('api/poll', formData)
            .then(res => {
                setUniqueId(res.data.pollId);
            })
            .catch(err => console.log(err.message));
    }
    
    if(uniqueId !== ''){
        return (
            <Redirect to={uniqueId} push />
        )
    }else{    
        return (
            <form onSubmit={handleSubmit} className="create-container">
                <input 
                    placeholder="Enter your question..."
                    id="question" 
                    type="text" 
                    onChange={handleQuestionChange}
                    name="question" 
                    required />
                <div className="options-container">
                {options.map((opt, index) => {
                    return (
                        <div className="option-container" key={`option_${index}`}>
                            <label htmlFor={opt}>Option:</label>
                            <div className="option-input-container">
                            <input 
                                
                                placeholder="..." 
                                id="option"
                                type="text" 
                                value={opt.option}
                                onChange={e => handleOptionChange(e, index)}
                                name={opt} 
                                required />
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className="add-remove-container">
                    {options.length > 2 ? 
                    <button className="btn" id="sub-btn" type="button" onClick={removeOption}><GrSubtract /></button>
                    : <button className="btn" id="sub-btn" type="button" onClick={removeOption} disabled><GrSubtract /></button>}
                    
                    <button className="btn" id="add-btn" type="button" onClick={addOption}><GrAdd /></button>
                </div>
                <input className="btn" id="submit" type="submit" value="Submit" />
            </form>
        )
    }
}

export default CreatePoll
