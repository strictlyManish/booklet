import Navbar from './components/Navbar'
import MainRoutes from './routes/MainRoutes'

function App() {
  return (
    <div className='bg-gray-900 h-screen w-screen text-white '>
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App