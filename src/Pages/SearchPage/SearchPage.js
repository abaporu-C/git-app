import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';
import {Query} from '../../Components/Query/query';

export const SearchPage = () => {

    const [query, setQuery] = useState({
        query: '',
        searchType: ''
    });
    const [result, setResult] = useState([])

    const handleFormChange = (input) => {
        setQuery((prevalue) => {
            return{
                ...prevalue,
                [input[1]] : input[0]
            }
        });
    }

    const handleFormSubmit = () => {
        fetch(`https://api.github.com/search/${query.searchType}?q=${query.query}`)
        .then(res => res.json())
        .then(data => {setResult(data.items)
        console.log(result)})
    }

    return(
        <div>
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Repositorie</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map(result => <Query key={result.id} url={result.html_url} author={result.login} repos={result.name}/>)}
                </tbody>
            </table>            
        </div>
    )
}