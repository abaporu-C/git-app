import React, {useState} from 'react';
import {Form} from '../../Components/Form/form';
import {Query} from '../../Components/Query/query';

export const SearchPage = () => {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([])

    const handleFormChange = (input) => {
        setQuery(input);
    }

    const handleFormSubmit = () => {
        fetch(`https://api.github.com/users/${query}/repos`)
        .then(res => res.json())
        .then(data => setResult(data))
    }

    return(
        <div>
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Repositorie</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map(result => <Query key={result.id} url={result.url} author={result.owner.login} repos={result.name}/>)}
                </tbody>
            </table>            
        </div>
    )
}