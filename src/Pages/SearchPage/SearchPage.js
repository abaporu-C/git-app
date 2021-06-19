import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';
import {Query} from '../../Components/Query/query';
const tableHeaders = require('../../Utils/tableHeaders');

export const SearchPage = () => {

    const [query, setQuery] = useState({
        query: '',
        searchType: 'code'
    });
    const [result, setResult] = useState([])

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
            console.log(data)
            setResult(data.items)
        })
    }

    return(
        <div>
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <table>
                <thead>
                    <tr>
                        <th>{query.searchType? tableHeaders[query.searchType]["author"] : "Author"}</th>
                        <th>{query.searchType? tableHeaders[query.searchType]["repo"] : "Repository"}</th>
                        <th>{query.searchType? tableHeaders[query.searchType]["url"] : "Url"}</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map(result => {
                        if(query.searchType === "code") return <Query key={result.sha} author={result.repository.owner.login} repos={result.repository.name} url={result.html_url}/>                        
                        else if (query.searchType === "issues") return <Query key={result.id} author={result.user.login} repos={result.title} url={result.html_url} />
                        else if (query.searchType === "labels") return <Query key={result.id} author={result.name} repos={result.description} url={result.url}/>
                        else if (query.searchType === "repositories") return <Query key={result.id} author={result.owner.login} repos={result.name} url={result.html_url} />
                        else return <Query key={result.id} author={result.login} repos={result.name} url={result.html_url} />
                    })}
                </tbody>
            </table>            
        </div>
    )
}