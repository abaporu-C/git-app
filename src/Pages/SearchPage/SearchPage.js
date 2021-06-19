import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';
import {Query} from '../../Components/Query/query';
const tableHeaders = require('../../Utils/tableHeaders');

export const SearchPage = () => {

    const [query, setQuery] = useState({
        query: '',
        searchType: 'code'
    });
    
    const [result, setResult] = useState({
        tableState: query.searchType,
        items: []
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
            setResult((prevState) => {
                return {
                    ...prevState,
                    tableState: query.searchType,
                    items: data.items 
                }
            })       
        })
    }

    return(
        <div>
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <table>
                <thead>
                    <tr>
                        <th>{tableHeaders[result.tableState]["author"]}</th>
                        <th>{tableHeaders[result.tableState]["repo"]}</th>
                        <th>{tableHeaders[result.tableState]["url"]}</th>
                    </tr>
                </thead>
                <tbody>
                    {result.items.map(item => {
                        console.log(item)
                        if(result.tableState === "code") return <Query key={item.sha} author={item.repository.owner.login} repos={item.repository.name} url={item.html_url}/>                        
                        else if (result.tableState === "issues") return <Query key={item.id} author={item.user.login} repos={item.title} url={item.html_url} />
                        else if (result.tableState === "repositories") return <Query key={item.id} author={item.owner.login} repos={item.name} url={item.html_url} />
                        else return <Query key={item.id} author={item.login} repos={item.type} url={item.html_url} />
                    })}
                </tbody>
            </table>            
        </div>
    )
}