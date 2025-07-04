import './App.css'
import React, { useEffect, useState } from 'react';
import AppRoutes from './routes';

function DynamicRouter({ children }: { children: React.ReactNode }) {
  const [Router, setRouter] = useState<React.ElementType | null>(null);

  useEffect(() => {
    const loadRouter = async () => {
      const mod = await import("react-router-dom");
      setRouter(() =>
        import.meta.env.MODE === "development"
          ? mod.BrowserRouter
          : mod.HashRouter
      );
    };
    loadRouter();
  }, []);

  if (!Router) return <div>Loading router...</div>;

  return <Router>{children}</Router>;
}

function App() {
  return (
   <DynamicRouter>
      <div className="App">
        <main>
          <AppRoutes />
        </main>
      </div>
    </DynamicRouter>
  )
}

export default App
