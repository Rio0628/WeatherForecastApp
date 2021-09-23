import React from 'react'
import Searchbar from './components/Searchbar';
import MainInfo from './components/MainInfo';
import FtrForecast from './components/FtrForecast';


class App extends React.Component {
  constructor(props) {
    super(props)
    // Temporary State to populate component before inputting information of Weather API
    this.state = {
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
    return (
      <div className="App">
        <div className='container'>
          <Searchbar />

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
