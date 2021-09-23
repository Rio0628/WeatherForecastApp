import React from 'react';
import ClearDay from '../images/ClearDay.png';

class MainInfo extends React.Component {
    render () {
        return (
            <div className='mainInfoContainer'>
                <h3 className='regionName'>{this.props.name}</h3>
                <p className='weatherIconDesc'>{this.props.weather}</p>
                <div className='regionWeatherIcon'><img className='weatherIcon' src={ClearDay} alt={this.props.weather}></img></div>
                <p className='regionTemperature'>{this.props.temp}</p>
            </div>
        )
    }
}

export default MainInfo