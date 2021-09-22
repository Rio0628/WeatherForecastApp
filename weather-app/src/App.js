import Searchbar from './components/Searchbar';
import MainInfo from './components/MainInfo';
import FtrForecast from './components/FtrForecast';


function App() {
  return (
    <div className="App">
      <div className='container'>
        <Searchbar />

        <MainInfo />
        
        <div className='ftrFrctCntr'>
          <FtrForecast />
          <FtrForecast />
          <FtrForecast />
          <FtrForecast />
          <FtrForecast />
        </div>
      </div>
    </div>
  );
}

export default App;
