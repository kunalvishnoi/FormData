import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignupForm from './Components/SignupForm';
import Main from './Components/Main';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


const Root = () =>
<Router>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/signup" component={ SignupForm } />
    <Route exact path="/Main" component= { Main } />
  </div>
</Router>

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
