import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import ListClients from './pages/clients/clients';
import Layout from './componentes/layout';

function App() {
  return (

    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/login" element={ <Login /> } />
        <Route path="/clients" element={ <ListClients /> } />
      </Route>
    </Routes>

  );
}

export default App;
