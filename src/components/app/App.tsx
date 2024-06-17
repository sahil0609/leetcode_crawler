import { AuthContextProvider } from '../../contexts/AuthContext/AuthContextProvider';
import LoginPage from '../loginPage';
import SyncPage from '../sync';
import Navbar from '../navbar';
import './App.css';


const isLogin =  (): boolean => {
  // will check if the user is logined with the crawler server
  // TODO for now returning true
  return true

}


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <div className='wrapper'>
          {isLogin() ? <SyncPage/> : < LoginPage/>}
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
