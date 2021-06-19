import React from 'react';

export const Query = ({author, repos, url}) => {
    return(
        <tr>
            <td>{author}</td>
            <td>{repos}</td>
            <td><a href={url}>{url}</a></td>
        </tr>
    )
}