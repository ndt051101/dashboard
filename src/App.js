import {Switch, Route, Redirect} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Posts from "./pages/Posts";
import Stories from "./pages/Stories";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <div className="App">
      <Switch>

          {
              isLoggedIn ? <Main>
                  <Route  path="/posts" component={Posts}/>
                  <Route path="/stories" component={Stories}/>

              </Main> : <Route path="*" component={SignIn}/>
          }
          <Redirect from="*" component={SignIn}/>
      </Switch>
    </div>
  );
}

export default App;
