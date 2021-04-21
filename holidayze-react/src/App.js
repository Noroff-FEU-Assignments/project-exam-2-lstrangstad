import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Stays from "./pages/Stays";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/stays" exact component={Stays} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
