import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';
import {Table} from '../../Components/Table/table';

export const SearchPage = () => {

    const [query, setQuery] = useState({
        query: '',
        searchType: 'code'
    });
    
    const [result, setResult] = useState({
        tableState: query.searchType,
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
        .then(res => res.json())
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
                    tableState: query.searchType,
                    items: data.items,
                    error: ''
                }
            })       
        })
    }

    return(
        <div>
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <Table tableState={result.tableState} items={result.items} error={result.error} />         
        </div>
    )
}