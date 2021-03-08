import { useState } from 'react';

import Error from './Error';

const Form = ({ setSearchText }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);

    const submitHandle = (e) => {
        e.preventDefault();

        if (searchTerm.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        setSearchText(searchTerm);
    };

    return (
        <form onSubmit={submitHandle}>
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='f.i. Coffee, Football'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Search'
                    />
                </div>
            </div>
            {error && <Error message='You have to set a search term' />}
        </form>
    );
};

export default Form;
