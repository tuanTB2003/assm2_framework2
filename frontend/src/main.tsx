import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import store, { persistor } from './app/store.tsx'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
)
