import React from 'react';

export const Form = ({ onFormSubmit, onFormChange, userInput }) => {

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        onFormChange({name: name, value: value});        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Search For
                    <select value={userInput.searchType} onChange={handleChange} name={"searchType"}>
                        <option value={"code"}>Code</option>
                        <option value={"issues"}>Issues</option>
                        <option value={"repositories"}>Repos</option>
                        <option value={"users"}>Users</option>
                    </select>
                </label>
                <input type="text" name={"query"} value={userInput.query} onChange={handleChange} size="30"/>                
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}