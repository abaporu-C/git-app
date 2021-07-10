import React, {useState, useEffect} from 'react';
import {Form} from '../../Components/Form/form';
import {Grid} from '../../Components/Grid/Grid.js';
import {Header} from '../../Components/Header/header';
import {Pagination} from '../../Components/Pagination/Pagination.js';

export const SearchPage = () => {

    //States

    const [query, setQuery] = useState({
        query: '',
        searchType: 'code'
    });
    
    const [result, setResult] = useState({
        gridState: query.searchType,
        items: [],
        error: ''
    })

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(1);

    //Effects
    useEffect(() => {
        const screenWidth = parseInt(window.screen.width);
        if(screenWidth >= 425 && screenWidth < 1024) setCardsPerPage(4);
        else if(screenWidth >= 1024 && screenWidth < 1336) setCardsPerPage(6);
        else if(parseInt(window.screen.width) >= 1336) setCardsPerPage(8);

        fetch('/api')
        .then(res => res.json())
        .then(data => {
            data.sort((a,b) => b.search_count - a.search_count)
            console.log(data)            
        })
    }, [])

    //Event Handlers

    const handleFormChange = (input) => {
        setQuery((prevalue) => {
            return{
                ...prevalue,
                [input.name] : input.value
            }
        });
    }

    const handleFormSubmit = () => {
        fetch(`https://api.github.com/search/${query.searchType}?q=${encodeURIComponent(query.query)}`)
        .then(res => {
            setLoading(true)
            return res.json()
        })
        .then(data => {
            setLoading(false)
            if(data.errors){
                return setResult(prevState => {
                    return {
                        ...prevState,
                        error: data.errors[0].message
                    }
                })                
            }
            setCurrentPage(1);
            setResult((prevState) => {
                return {
                    ...prevState,
                    gridState: query.searchType,
                    items: data.items,
                    error: ''
                }
            })       
        })

        fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content": query.query,
                "search_type": query.searchType
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error('Error', err))
    }

    const Paginate = (page) => {
        if(page >= 1 && page <= (Math.ceil(result.items.length / cardsPerPage))) setCurrentPage(page)        
    }

    //Pagination Variables
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = result.items.slice(firstCardIndex, lastCardIndex);

    return(
        <div>
            <Header />
            <Form userInput={query} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <Grid gridState={result.gridState} items={currentCards} error={result.error} loading={loading}/>
            <Pagination currentPage={currentPage} cardsPerPage={cardsPerPage} totalCards={result.items.length} paginate={Paginate}/>                  
        </div>
    )
}