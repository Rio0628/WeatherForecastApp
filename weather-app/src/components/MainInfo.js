import React from 'react';

class MainInfo extends React.Component {
    render () {
        return (
            <div className='mainInfoContainer'>
                <h3 className='regionName'>New York, US</h3>
                <p className='weatherIconDesc'>ThunderStorm</p>
                <div className='regionWeatherIcon'></div>
                <p className='regionTemperature'>22°C / 77°C</p>
            </div>
        )
    }
}

export default MainInfo