import React from 'react';

const FtrForecast = (props) => { 
    return (
        <div className='ftrForecast'>
            <p className='ftrFrct'>{props.day}</p>
            <div className='ftrFrctIcon'></div>
            <p className='ftrFrctTemp'>{props.temp}</p>
        </div>
    )
}

export default FtrForecast