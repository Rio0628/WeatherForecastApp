import React from 'react'
import Searchbar from './components/Searchbar';
import MainInfo from './components/MainInfo';
import FtrForecast from './components/FtrForecast';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SearchWeatherStatus: false,
      SearchOnChange: '',
      CurrentForecast: {},
      FtrForecast: []
    }
  }
  render() {
    let object;
    let ftrWthrObject;
    
    const transferData = (name, weather, temp, country, long, lat, icon) => {
      // Set information from the API fetch into an array
      object = {
        name: `${name}, ${country}`,
        wthr: weather,
        temp: `${Math.round(temp)}°C`,
        long: long,
        lat: lat,
        icon: icon
      }
    }

    const transferFtrWthrData = (a, b, c, d, e) => {
      // Set the individual information from each day into an array 
      // Each letter acts as a different weather day
      ftrWthrObject = {
        Day1: a,
        Day2: b,
        Day3: c,
        Day4: d,
        Day5: e,
      }
      
      ftrWthrObject.Day1.dt = getFirstWordDate(ftrWthrObject.Day1.dt);
      ftrWthrObject.Day2.dt = getFirstWordDate(ftrWthrObject.Day2.dt);
      ftrWthrObject.Day3.dt = getFirstWordDate(ftrWthrObject.Day3.dt);
      ftrWthrObject.Day4.dt = getFirstWordDate(ftrWthrObject.Day4.dt);
      ftrWthrObject.Day5.dt = getFirstWordDate(ftrWthrObject.Day5.dt);   
    }

    const getFirstWordDate = (wthrDay) => {
      // Change the dt variable from a numeral into the specified date
      const dayDate = new Date(wthrDay * 1000).toString();
    
      // Split the date to just the first word of the date variable
      const firstWord = dayDate.split(" ")[0];
      return firstWord.toUpperCase();
    }
    
    const dailyWeather = async (cityName) => {
      // Call the information from first API fetch and input it into the function to transfer it into an obejct
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f0caa45808a9789d4f46776484b799e2&units=metric`;
      let a = [];

      await axios.get(url).then(data => a.push(data.data))
      transferData(a[0].name, a[0].weather[0].main, a[0].main.temp, a[0].sys.country, a[0].coord.lon, a[0].coord.lat, a[0].weather[0].icon)
    } 

    const weatherArray = (object) => {
      // Input the necessary individual information from the daily API fetch call into an array to be put into another array
      const array = {dt: object.dt, temp: `${Math.round(object.temp.day)}°C`, weather: object.weather[0].main, icon: object.weather[0].icon}
      return array;
    }

    const futureWeather = async (lon, lat) => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=4439be80c1f0ade164109e2399a51173
      `;
      let a = [];
    
      await axios.get(url).then(data => a.push(data.data));
      transferFtrWthrData(weatherArray(a[0].daily[1]), weatherArray(a[0].daily[2]), weatherArray(a[0].daily[3]), weatherArray(a[0].daily[4]), weatherArray(a[0].daily[5]));
    }

    const onChange = (e) => {
      // Store the input of search bar into state to be used later on
      if (e.target.className === 'searchbar') {
        this.setState({
          SearchOnChange: e.target.value
        })
      }
    }
    
    const onClick = async (e) => {
      if (e.target.className === 'submitBtn') {
        // Get the information from the API before inputting it into state 
        await dailyWeather(this.state.SearchOnChange);
        await futureWeather(object.long, object.lat);

        // Set the information fetched into state and after change the boolean state to true to display the different components  
        this.setState({CurrentForecast: object})
        this.setState({FtrForecast: ftrWthrObject});
        this.setState({SearchWeatherStatus: true});
      }
    }

    const changeBackground = (weather) => {
      // Function to change background of application according to the weather type
      if (weather === 'Clear') {
        if (this.state.CurrentForecast.icon === '01n') { return "linear-gradient(to bottom left, #F4E285, #222A68, #222A68, #222A68)" }
        else return "linear-gradient(to bottom left,#F9D423, #1D84B5, #1D84B5)"
      }
      if (weather === 'Clouds' || this.state.CurrentForecast.icon === '50d') {
        if (this.state.CurrentForecast.icon === '02n') { return "linear-gradient(to top right,#DAE2F8, #0A2239, #0A2239, #DAE2F8)" }
        if (this.state.CurrentForecast.icon === '02d') { return "linear-gradient(to top right,#1D84B5, #DAE2F8, #FEEA00)" }
        else return "linear-gradient(to bottom left,#DAE2F8, #B0B5B3, #DAE2F8)"
      }
      if (weather === 'Drizzle') { return "linear-gradient(to bottom,#D7DDE8, #757F9A, #D7DDE8, #757F9A)"}
      if (weather === 'Thunderstorm') { return "linear-gradient(to bottom,#0A2239, #222A68, #0A2239, #DAE2F8)"}
      if (weather === 'Rain') { return "linear-gradient(to bottom,#D7DDE8, #757F9A, #757F9A, #757F9A)" }
      if (weather === 'Snow') { return "linear-gradient(to bottom left,#DAE2F8, #B0B5B3, #DAE2F8)"}
    }

    return (
      <div className="App">
        <div className='container' style={{ background: changeBackground(this.state.CurrentForecast.wthr)}}>

          <div className='searchContainer'>
            <Searchbar onChange={onChange} />
            <li className='submitBtn' onClick={onClick}>Search</li>
          </div>
          
          {/* Conditional functions to change between the preview of the application and the forecast view */}
          {this.state.SearchWeatherStatus ? 
            <MainInfo name={this.state.CurrentForecast.name} weather={this.state.CurrentForecast.wthr} temp={this.state.CurrentForecast.temp} icon={this.state.CurrentForecast.icon}/> : <h1 className='startupMessage'>Enter A City Name to View Weather</h1>
          }
          
          {this.state.SearchWeatherStatus ? <div className='ftrFrctCntr'> 
              <FtrForecast info={this.state.FtrForecast.Day1}/>
              <FtrForecast info={this.state.FtrForecast.Day2}/>
              <FtrForecast info={this.state.FtrForecast.Day3}/>
              <FtrForecast info={this.state.FtrForecast.Day4}/>
              <FtrForecast info={this.state.FtrForecast.Day5}/>
            </div> : null
          }
        </div>
      </div>
    );
  }
}

export default App;