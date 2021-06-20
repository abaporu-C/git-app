import React from 'react';
const {Query} = require('../Query/query');
const tableHeaders = require('../../Utils/tableHeaders.js');

export const Table = ({tableState, items, error}) => {
    return(
        <div>
            {error?
            <p>{error}</p>
            :
            <table>
                <thead>
                    <tr>
                        <th>{tableHeaders[tableState]["author"]}</th>
                        <th>{tableHeaders[tableState]["repo"]}</th>
                        <th>{tableHeaders[tableState]["url"]}</th>
                    </tr>
                </thead>
                <tbody>                    
                    {items.map(item => {
                        if(tableState === "code") return <Query key={item.sha} author={item.repository.owner.login} repos={item.repository.name} url={item.html_url}/>                        
                        else if (tableState === "issues") return <Query key={item.id} author={item.user.login} repos={item.title} url={item.html_url} />
                        else if (tableState === "repositories") return <Query key={item.id} author={item.owner.login} repos={item.name} url={item.html_url} />
                        else return <Query key={item.id} author={item.login} repos={item.type} url={item.html_url} />
                    })}
                </tbody>
            </table>}
        </div>
    )
}