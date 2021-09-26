import React from 'react'
import Searchbar from './components/Searchbar';
import MainInfo from './components/MainInfo';
import FtrForecast from './components/FtrForecast';


class App extends React.Component {
  constructor(props) {
    super(props)
    // Temporary State to populate component before inputting information of Weather API
    this.state = {
      SearchOnChange: '',
      ExampleForecast: [],
      CurrentForecast: [
        {name: 'New York, US', wthr: "Sunny", temp: '24°C / 56°F'}
      ],
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
    let obj;
    const dailyWeather = (cityName) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f0caa45808a9789d4f46776484b799e2&units=metric`;
      fetch(url).then(resp => resp.json()).then(data => obj = data).then(data => console.log(data)).catch(err => console.log(err));

      return obj;
    }
    console.log(dailyWeather("New York"));

    const onChange = (e) => {
      console.log(e.target.value);
      if (e.target.className === 'searchbar') {
        this.setState({
          SearchOnChange: e.target.value
        })
      }
    }

    const onClick = (e) => {
      console.log(e.target)
      if (e.target.className === 'submitBtn') {
        // console.log(this.state.SearchOnChange);
        let a = dailyWeather('New York');
        console.log(a)
        this.setState({ExampleForecast: a})
        console.log("SPACER")
        console.log(this.state.ExampleForecast)
      }
    }


    return (
      <div className="App">
        <div className='container'>

          <div className='searchContainer'>
            <Searchbar onChange={onChange} />
            <li className='submitBtn' onClick={onClick}>Search</li>
          </div>
          

          <MainInfo 
            name={this.state.CurrentForecast[0].name} 
            weather={this.state.CurrentForecast[0].wthr} 
            temp={this.state.CurrentForecast[0].temp}
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
