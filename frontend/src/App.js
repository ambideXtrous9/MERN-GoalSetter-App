
// we'll going to have 3 pages - 1.dashboard 2.login 3.register
// for that we create a folder inside src - 'src/pages' and and create
// 3 .jsx files 

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// will add 3 pages routes here 
// use those .jsx here so import those first 


function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
