import { useState, useEffect } from 'react';

import Form from './components/Form';
import ImagesList from './components/ImagesList';

function App() {
    const [images, setImages] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [actualPage, setActualPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const APISearch = async () => {
            if (searchText.trim() === '') return;
            const API_TOKEN = '20585926-ea9e9b8cea59d9e599b6cf878';
            const imagesPerPage = 30;
            const uri = 'https://pixabay.com/api/';
            const url = `${uri}?key=${API_TOKEN}&q=${searchText}&per_page=${imagesPerPage}&page=${actualPage}`;

            const answer = await fetch(url);
            const data = await answer.json();
            setImages(data.hits);

            setTotalPages(Math.ceil(data.totalHits / imagesPerPage));

            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({ behavior: 'smooth' });
        };
        APISearch();
    }, [searchText, actualPage]);

    const changePage = (action) => {
        switch (action) {
            case 'prev':
                if (actualPage === 1) break;
                setActualPage(actualPage - 1);
                break;
            case 'next':
                if (actualPage === totalPages) break;
                setActualPage(actualPage + 1);
                break;
            default:
                break;
        }
    };

    return (
        <div className='container'>
            <div className='jumbotron'>
                <p className='lead text-center'>Image Scanner</p>
                <Form setSearchText={setSearchText} />
            </div>
            <div className='row justify-content-center'>
                <ImagesList images={images} />
                {actualPage !== 1 && (
                    <button
                        type='button'
                        className='btn btn-info mr-1 mb-4'
                        onClick={() => changePage('prev')}
                    >
                        &laquo; previous
                    </button>
                )}

                {actualPage < totalPages && (
                    <button
                        type='button'
                        className='btn btn-info mb-4'
                        onClick={() => changePage('next')}
                    >
                        next &raquo;
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
