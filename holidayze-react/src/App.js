import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Stays from "./pages/Stays";
import Login from "./pages/Login";
import Nav from "./components/nav/Nav";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Add from "./pages/Add";
import Details from "./pages/Details";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/stays" component={Stays} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/add" component={Add} />
          <Route path="/details/:id" component={Details} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
