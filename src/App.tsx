import { HashRouter as Router } from "react-router-dom";
import './App.css'
import AppRoutes from './routes';

function App() {
  return (
   <Router>
      <div className="App">
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App
