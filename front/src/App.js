import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import LogIn from './components/LogIn';
import ConstAuth from './components/ContextAuth';
import RegisterUsers from './components/RegisterUsers';
import UserData from './components/UserData';

const App = () =>  (
    <ConstAuth>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/register' element={<RegisterUsers/>}/>
          <Route path='/user_data' element={<UserData/>}/> 
        </Routes>
      </Router>
    </ConstAuth>
    
  );

  
export default App;
