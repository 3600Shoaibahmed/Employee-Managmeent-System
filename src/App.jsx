import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Button } from 'react-bootstrap';
import ListEmployeeComponents from './components/ListEmployeeComponents';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';

function App() {
  

  return (
    <>
    
    <BrowserRouter>
    <HeaderComponent/>
      <Routes>
        
        <Route path="/" element={<ListEmployeeComponents />}></Route>
        <Route path="/employees" element={<ListEmployeeComponents />}></Route>
        <Route path='/add-employee' element = {<EmployeeComponent />}></Route>
        <Route path='/edit-employee/:id' element = {<EmployeeComponent />}></Route>
        

      </Routes>

      
      
    </BrowserRouter>  
    

    </>
  )
}

export default App
