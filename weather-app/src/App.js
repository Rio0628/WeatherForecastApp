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
      SearchOnChange: '',
      ExampleForecast: [],
      CurrentForecast: 
        {name: 'New York, US', wthr: "Sunny", temp: '24°C'},
      FtrForecast: [
        {day: 'MON', wthr: 'Sunny', temp: '24°C'},
        {day: 'TUE', wthr: 'Sunny', temp: '32°C'},
        {day: 'WED', wthr: 'Sunny', temp: '12°C'},
        {day: 'THU', wthr: 'Sunny', temp: '45°C'},
        {day: 'FRI', wthr: 'Sunny', temp: '56°C'}
      ]
    }
  }
  render() {
    // console.log(api.openweathermap.org/data/2.5/weather?q=London&appid=f0caa45808a9789d4f46776484b799e2);
    let object;
    let ftrWthrObject;
    function transferData(a, b, c, d, e, f) {
      object = {
        name: `${a}, ${d}`,
        wthr: b,
        temp: `${c}°C`,
        long: e,
        lat: f
      }
    }
    
    const dailyWeather = async (cityName) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f0caa45808a9789d4f46776484b799e2&units=metric`;
      let a = [];

      await axios.get(url).then(data => a.push(data.data))
      
      transferData(a[0].name, a[0].weather[0].main, a[0].main.temp, a[0].sys.country, a[0].coord.lon, a[0].coord.lat)
      // .then(resp => resp.json()).then(data => transferData(data)).catch(err => console.log(err));
    } 

    const futureWeather = async (cityName) => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=25.7743&lon=-80.1937&exclude=current,minutely,hourly,alerts&units=metric&appid=4439be80c1f0ade164109e2399a51173
      `;
      // 4439be80c1f0ade164109e2399a51173
      let a = [];
    
      await axios.get(url).then(data => a.push(data.data))
      console.log(a)
    }

    futureWeather('miami');

    const onChange = (e) => {
      console.log(e.target.value);
      if (e.target.className === 'searchbar') {
        this.setState({
          SearchOnChange: e.target.value
        })
      }
    }

    const chgMainState = (a) => this.setState({CurrentForecast: a});
    
    const onClick = async (e) => {
      console.log(e.target)
      if (e.target.className === 'submitBtn') {
        // console.log(this.state.SearchOnChange);
        await dailyWeather(this.state.SearchOnChange);
        chgMainState(object)
        console.log(object)
        // document.body.style.background = color; == Use something like this in the future to change the background according to the weather type of the region.
      }
    }

    // Try to implement a Window.onload function or find a way to have the UI set up to be empty until it is populated
    // Use a boolean state to make the components appear 
    
    return (
      <div className="App">
        <div className='container'>

          <div className='searchContainer'>
            <Searchbar onChange={onChange} />
            <li className='submitBtn' onClick={onClick}>Search</li>
          </div>
          

          <MainInfo 
            name={this.state.CurrentForecast.name} 
            weather={this.state.CurrentForecast.wthr} 
            temp={this.state.CurrentForecast.temp}
          />
          
          <div className='ftrFrctCntr'>
            <FtrForecast day={this.state.FtrForecast[0].day} temp={this.state.FtrForecast[0].temp}/>
            <FtrForecast day={this.state.FtrForecast[1].day} temp={this.state.FtrForecast[1].temp}/>
            <FtrForecast day={this.state.FtrForecast[2].day} temp={this.state.FtrForecast[2].temp}/>
            <FtrForecast day={this.state.FtrForecast[3].day} temp={this.state.FtrForecast[3].temp}/>
            <FtrForecast day={this.state.FtrForecast[4].day} temp={this.state.FtrForecast[4].temp}/>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
