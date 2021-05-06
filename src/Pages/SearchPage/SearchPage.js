import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';

export const SearchPage = () => {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([])

    const handleFormChange = (input) => {
        setQuery(input);
    }

    const handleFormSubmit = () => {
        fetch('https://api.github.com')
    }

    return(
        <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
    )
}