import './App.css'
import DragDrop from './components/dragDrop'

function App() {

  return (
    <div className='bg-slate-100 bg-opacity-25 max-w-screen-2xl p-4 mx-auto'>
      <h3 className='text-2xl font-semibold text-center'>Gallery</h3>
      <DragDrop />
    </div>
  )
}

export default App
