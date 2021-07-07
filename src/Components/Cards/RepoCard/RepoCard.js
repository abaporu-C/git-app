import React from 'react';

export const RepoCard = ({image, author, repo, language, url}) => {
    return (
        <div className="grid-element">
            <img src={image} alt="Git Repository Logo"/>
            <div className="content">
                <p><b>Author: {author}</b></p>
                <p>Repo: {repo}</p>
                <p>Language(s): {language}</p>
                <a href={url}>Check it out!</a>
            </div>
        </div>
    )
}