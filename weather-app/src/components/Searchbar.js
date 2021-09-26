import React from 'react';

const Searchbar = (props) => {
    return (
        <input className='searchbar' type='text' placeholder='Search City ...' onChange={props.onChange}></input>
    )
}

export default Searchbar