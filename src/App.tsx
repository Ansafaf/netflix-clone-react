import {BrowserRouter} from "react-router-dom";
import AppRoutes from './routes/Approutes';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <>
    
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App;