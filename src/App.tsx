import './App.css'
import AppRoutes from './routes';
import { BrowserRouter  } from 'react-router-dom';

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
  return (
   <BrowserRouter>
      <div className="App">
        <main>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
