import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import ListClients from './pages/clients/clients';
import Layout from './componentes/layout';
import ClientDetails from './pages/clientDetails/clientDetails';

function App() {
  return (

    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/clients/:id" element={ <ClientDetails /> } />
      <Route element={ <Layout /> }>
        <Route path="/clients" element={ <ListClients /> } />
      </Route>
    </Routes>
  );
}

export default App;
