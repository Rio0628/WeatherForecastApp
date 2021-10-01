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

const FtrForecast = (props) => { 
    console.log(props.dt)

    const WeatherIcon = (weather) => {
        if (weather === 'Clear') {
            if (props.info.icon === '01n') {return ClearNight }
            else return ClearDay
        }
        if (weather === 'Clouds' || props.info.icon === '50d') { 
            if (props.info.icon === '02n') { return PartlyCloudyNight }
            if (props.info.icon === '02d') { return PartlyCloudyDay }
            else return Cloudy
        }
        if (weather === 'Drizzle') { return Drizzle }
        if (weather === 'Thunderstorm') { return ThunderStorm }
        if (weather === 'Rain') { return Showers }
        if (weather === 'Snow') { return Snow}
    }
    
    return (
        <div className='ftrForecast'>
            <p className='ftrFrct'>{props.info.dt}</p>
            <div className='ftrFrctIcon'><img className='ftrWthrIcon' alt={props.info.weather} src={WeatherIcon(props.info.weather)} height='40px' width='40px'></img></div>
            <p className='ftrFrctTemp'>{props.info.temp}</p>
        </div>
    )
}

export default FtrForecast