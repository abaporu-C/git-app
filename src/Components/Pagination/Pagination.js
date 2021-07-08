import React from 'react'

export const Pagination = ({currentPage, cardsPerPage, totalCards, paginate}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++){
        pageNumbers.push(i);
    }

    if(cardsPerPage === 1){
        return(
            <nav>
                <ul>
                    <li key={1}><a href="#" onClick={() => paginate(currentPage - 1)}>{"<"}</a></li>
                    <li key={2}><a href="#" onClick={() => paginate(currentPage)}>{currentPage}</a></li>
                    <li key={3}><a href="#" onClick={() => paginate(currentPage + 1)}>{">"}</a></li>
                </ul>
            </nav>
        )
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(page => <li key={page} className="page-item"><a href="#" onClick={() => paginate(page)} className="page-link">{page}</a></li>)}
            </ul>
        </nav>
    )
}
