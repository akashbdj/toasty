import React, { createContext, useState } from 'react'
import logo from './logo.svg';
import './App.css';

const ToastContext = createContext();
const sample_toast = [
  { id: 1, type: 'success', title: 'Success!', message: 'Data fetched successfully!' },
  { id: 2, type: 'warning', title: 'Warning!', message: 'High memory consumption!' },
  { id: 3, type: 'error', title: 'Error!', message: 'Failed to fetch data!' },
]

function ToastContextProvider(props) {
  const [toasts, setToasts] = useState(sample_toast)

  const onAdd = (toast) => setToasts(toast)
  const onDelete = (id) => console.log('delete toast with idx: ', id)

  return (
    <ToastContext.Provider value={{ toasts, onAdd, onDelete }}>
      {props.children}
    </ToastContext.Provider>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContextProvider>
          <ToastManager />
        </ToastContextProvider>
      </header>
    </div>
  );
}





function ToastManager() {
  return (
    <ToastContext.Consumer>
      {({ toasts, onAdd }) => {
        return <div className='toasts-container'>{toasts.map((toast, idx) => <Toast key={idx} {...toast} />)}</div>
      }}
    </ToastContext.Consumer>
  )
}


function Toast({ type, message, onCloseClick }) {
  return (
    <div className={`toast-box ${type}`}>
      <button className="close" onClick={onCloseClick}>&times;</button>
      <div className="toast-message">
        {message}
      </div>
    </div>
  )
}

export default App;
