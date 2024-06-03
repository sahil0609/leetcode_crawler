import LoginPage from '../loginPage';
import Navbar from '../navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='wrapper'>
        <LoginPage />
      </div>
    </div>
  );
}

export default App;
