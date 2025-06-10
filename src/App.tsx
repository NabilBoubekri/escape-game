import './App.css'
import Footer from './components/Footer/Footer'
import HomePage from './components/Home/HomePage'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}

export default App
