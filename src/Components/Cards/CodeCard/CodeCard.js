import React from 'react';

export const CodeCard = ({image, author, repo, title, url}) => {
    return (
        <div className="grid-element">
            <img src={image} alt="Git Repository Logo"/>
            <div className="content">
                <p><b>Author: {author}</b></p>
                <p>Repo: {repo}</p>
                <p>Name: {title}</p>
                <a href={url}>Check it out!</a>
            </div>
        </div>
    )
}