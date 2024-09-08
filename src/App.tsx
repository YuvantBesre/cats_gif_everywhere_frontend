import './App.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import Toast from './providers/Toast';
import { useState } from 'react';
import SnackBar from './components/general/SnackBar';


export interface toastProps {
  show : boolean,
  message : string,
  type : string
}
function App() {
  const [toastData, setToastData] = useState<toastProps>({show : false, message : '', type : 'error'});

  return (
    <>
      <Layout>
        {
          toastData.show &&
          <SnackBar data = {toastData} onChange = {setToastData} />
        }
        <Toast.Provider value={{toastData, setToastData}}>
          <HomePage />
        </Toast.Provider>
      </Layout>
    </>
  )
}

export default App
