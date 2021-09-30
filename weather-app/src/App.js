import React from 'react'
import Searchbar from './components/Searchbar';
import MainInfo from './components/MainInfo';
import FtrForecast from './components/FtrForecast';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    // Temporary State to populate component before inputting information of Weather API
    this.state = {
      SearchWeatherStatus: false,
      SearchOnChange: '',
      CurrentForecast: 
        {name: 'New York, US', wthr: "Sunny", temp: '26°C'},
      FtrForecast: [
        {day: 'MON', wthr: 'Sunny', temp: '24°C'},
        {day: 'TUE', wthr: 'Sunny', temp: '32°C'},
        {day: 'WED', wthr: 'Sunny', temp: '12°C'},
        {day: 'THU', wthr: 'Sunny', temp: '45°C'},
        {day: 'FRI', wthr: 'Sunny', temp: '88°C'}
      ]
    }
  }
  render() {
    // console.log(api.openweathermap.org/data/2.5/weather?q=London&appid=f0caa45808a9789d4f46776484b799e2);
    let object;
    let ftrWthrObject;
    
    const transferData = (a, b, c, d, e, f, g) => {
      object = {
        name: `${a}, ${d}`,
        wthr: b,
        temp: `${Math.round(c)}°C`,
        long: e,
        lat: f,
        icon: g
      }
    }

    const transferFtrWthrData = (a, b, c, d, e) => {
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
      const dayDate = new Date(wthrDay * 1000).toString();
      console.log(dayDate)
      const firstWord = dayDate.split(" ")[0];
      return firstWord.toUpperCase();
    }
    
    const dailyWeather = async (cityName) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f0caa45808a9789d4f46776484b799e2&units=metric`;
      let a = [];

      await axios.get(url).then(data => a.push(data.data))
      transferData(a[0].name, a[0].weather[0].main, a[0].main.temp, a[0].sys.country, a[0].coord.lon, a[0].coord.lat, a[0].weather[0].icon)
      // .then(resp => resp.json()).then(data => transferData(data)).catch(err => console.log(err));
    } 

    const weatherArray = (object) => {
      const array = {dt: object.dt, temp: `${Math.round(object.temp.day)}°C`, weather: object.weather[0].main, icon: object.weather[0].icon}
      return array;
    }

    const futureWeather = async (lon, lat) => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=4439be80c1f0ade164109e2399a51173
      `;
      // 4439be80c1f0ade164109e2399a51173
      let a = [];
    
      await axios.get(url).then(data => a.push(data.data));
      transferFtrWthrData(weatherArray(a[0].daily[1]), weatherArray(a[0].daily[2]), weatherArray(a[0].daily[3]), weatherArray(a[0].daily[4]), weatherArray(a[0].daily[5]));
    }

    const onChange = (e) => {
      console.log(e.target.value);
      if (e.target.className === 'searchbar') {
        this.setState({
          SearchOnChange: e.target.value
        })
      }
    }
    
    const onClick = async (e) => {
      console.log(e.target)
      if (e.target.className === 'submitBtn') {
        
        console.log(this.state.SearchOnChange);
        await dailyWeather(this.state.SearchOnChange);
        await futureWeather(object.long, object.lat);
        // chgMainState(object)
        this.setState({CurrentForecast: object})
        this.setState({FtrForecast: ftrWthrObject});
        console.log(object)
        console.log(ftrWthrObject);
        console.log('SPACER')
        console.log(this.state.FtrForecast)
        this.setState({SearchWeatherStatus: true});
        
        // document.body.style.background = color; == Use something like this in the future to change the background according to the weather type of the region.
      }
    }

    return (
      <div className="App">
        <div className='container'>

          <div className='searchContainer'>
            <Searchbar onChange={onChange} />
            <li className='submitBtn' onClick={onClick}>Search</li>
          </div>
          
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