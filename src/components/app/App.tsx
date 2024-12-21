import {useAuthContext } from '../../contexts/AuthContext/AuthContextProvider';
import LoginPage from '../loginPage';
import SyncPage from '../sync';
import Navbar from '../navbar';
import './App.css';


function App() {

  const {isLogin} = useAuthContext()

  return (
    <div className="App">
      <Navbar />
      <div className='wrapper'>
        {isLogin ? <SyncPage/> : < LoginPage/>}
      </div>
    </div>
  );
}

export default App;
