import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';

// function DynamicRouter({ children }: { children: React.ReactNode }) {
//   const [Router, setRouter] = useState<React.ComponentType<{ basename: string, children: React.ReactNode }> | null>(null);

//   useEffect(() => {
//     const loadRouter = async () => {
//       const mod = await import("react-router-dom");
//       setRouter(() =>
//         import.meta.env.MODE === "development"
//           ? mod.BrowserRouter
//           : mod.HashRouter
//       );
//     };
//     loadRouter();
//   }, []);

//   if (!Router) return <div>Loading router...</div>;

//   return <Router basename={import.meta.env.BASE_URL}>{children}</Router>;
// }

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <>
      <button onClick={toggleDarkMode} className='rounded-pill' style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
        {isDarkMode ? 'Mode clair' : 'Mode sombre'}
      </button>
      <BrowserRouter basename='/escape-game'>
        <div className="App">
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
