import React from 'react';

export const Form = ({ onFormSubmit, onFormChange, userInput }) => {

    const handleChange = (event) => {
        onFormChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userInput} onChange={handleChange}/>
                <input type="submit" />
            </form>
        </div>
    )
}