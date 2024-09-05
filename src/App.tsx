import './App.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';

function App() {

  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
    </>
  )
}

export default App
