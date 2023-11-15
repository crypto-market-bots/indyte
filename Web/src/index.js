import ReactDOM from 'react-dom/client';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './store';
import CustomErrorBoundary from './ErrorBoundary';
import { configureStore } from '@reduxjs/toolkit';
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: rootReducer,
});
root.render(
  <CustomErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </CustomErrorBoundary>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
