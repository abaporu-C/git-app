import React from 'react';
import {CodeCard} from '../Cards/CodeCard/CodeCard.js';
import {IssueCard} from '../Cards/IssueCard/IssueCard.js';
import {RepoCard} from '../Cards/RepoCard/RepoCard.js';
import {UserCard} from '../Cards/UserCard/UserCard.js';

export const Grid = ({gridState, items, error}) => {
    return(
        <div className="grid-wrapper">
            {error?
            <p>{error}</p>
            :
            items.map(item => {
                if(gridState === 'code') return <CodeCard key={item.id} image={item.repository.owner.avatar_url} author={item.repository.owner.login} repo={item.repository.name} title={item.name} url={item.html_url}/>
                else if(gridState === 'issues') return <IssueCard key={item.id} image={item.user.avatar_url} author={item.user.login} title={item.title} state={item.state} url={item.html_url}/>
                else if(gridState === 'repositories') return <RepoCard key={item.id} image={item.owner.avatar_url} author={item.owner.login} repo={item.name} language={item.language} url={item.html_url}/>
                else return <UserCard key={item.id} image={item.avatar_url} author={item.login} type={item.type} url={item.html_url}/>
            })}
        </div>
    )
}