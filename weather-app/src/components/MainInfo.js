import React from 'react';
import ClearDay from '../images/ClearDay.png';
import ClearNight from '../images/ClearNight.png';
import Cloudy from '../images/Cloudy.png';
import Drizzle from '../images/Drizzle.png';
import PartlyCloudyDay from '../images/PartlyCloudy-Day.png';
import PartlyCloudyNight from '../images/PartlyCloudy-Night.png';
import Snow from '../images/Snow.png';
import ThunderStorm from '../images/Thunderstorm.png';
import Showers from '../images/Rain-Showers.png';


class MainInfo extends React.Component {
    render () {
        const WeatherIcon = (weather) => {
            if (weather === 'Clear') {
                if (this.props.icon === '01n') {return ClearNight}
                else return ClearDay
            }
            if (weather === 'Clouds' || this.props.icon === '50d') { 
                if (this.props.icon === '02n') { return PartlyCloudyNight}
                if (this.props.icon === '02d') { return PartlyCloudyDay}
                else return Cloudy
            }
            if (weather === 'Drizzle') { return Drizzle }
            if (weather === 'Thunderstorm') { return ThunderStorm }
            if (weather === 'Rain') { return Showers }
            if (weather === 'Snow') { return Snow}
        }        

        return (
            <div className='mainInfoContainer'>
                <h3 className='regionName'>{this.props.name}</h3>
                <p className='weatherIconDesc'>{this.props.weather}</p>
                <div className='regionWeatherIcon'><img className='weatherIcon' src={WeatherIcon(this.props.weather)} alt={this.props.weather} height='100px' width='100px'></img></div>
                <p className='regionTemperature'>{this.props.temp}</p>
            </div>
        )
    }
}

export default MainInfo