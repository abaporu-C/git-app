import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';
import {Grid} from '../../Components/Grid/Grid.js';
import {Header} from '../../Components/Header/header';

export const SearchPage = () => {

    const [query, setQuery] = useState({
        query: '',
        searchType: 'code'
    });
    
    const [result, setResult] = useState({
        gridState: query.searchType,
        items: [],
        error: ''
    })

    const handleFormChange = (input) => {
        setQuery((prevalue) => {
            return{
                ...prevalue,
                [input.name] : input.value
            }
        });
    }

    const handleFormSubmit = () => {
        fetch(`https://api.github.com/search/${query.searchType}?q=${encodeURIComponent(query.query)}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if(data.errors){
                return setResult(prevState => {
                    return {
                        ...prevState,
                        error: data.errors[0].message
                    }
                })                
            }
            setResult((prevState) => {
                return {
                    ...prevState,
                    gridState: query.searchType,
                    items: data.items,
                    error: ''
                }
            })       
        })
    }

    return(
        <div>
            <Header />
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <Grid gridState={result.gridState} items={result.items} error={result.error} />         
        </div>
    )
}