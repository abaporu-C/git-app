import React from 'react';

export const UserCard = ({image, author, type, url}) => {
    return (
        <div className="grid-element">
            <img src={image} alt="Git Repository Logo"/>
            <div className="content">
                <p><b>User: {author}</b></p>
                <p>Type: {type}</p>
                <a href={url}>Check it out!</a>
            </div>
        </div>
    )
}