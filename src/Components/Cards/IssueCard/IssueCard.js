import React from 'react';

export const IssueCard = ({image, author, title, state, url}) => {
    return (
        <div className="grid-element">
            <img src={image} alt="Git Repository Logo"/>
            <div className="content">
                <p><b>User: {author}</b></p>
                <p>Issue: {title}</p>
                <p>State: {state}</p>
                <a href={url}>Check it out!</a>
            </div>
        </div>
    )
}