import React from 'react';

export const Query = ({url, repos, author}) => {
    return(
        <tr>
            <td>{author}</td>
            <td>{repos}</td>
            <td><a href={url}>{url}</a></td>
        </tr>
    )
}