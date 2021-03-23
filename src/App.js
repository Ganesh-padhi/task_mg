import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CRoute from "./Component/CRoute/CRoute";
import Register from "./Pages/Register";
import Email from "./Pages/Email_verify";
import * as actions from "./Store/Actions/index";
import DetailTask from "./Pages/Detail_task"



function App(props) {
  return (
    <Router>
      <div className="page-wrapper">
        <Switch>
          <CRoute path="/login" component={Login} />
          <CRoute path="/register" component={Register} />
          <CRoute path="/email_verify" component={Email} />
          <CRoute path="/detail_task" component={DetailTask} />
          <CRoute path="/" component={Home} />
          <ToastContainer />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
