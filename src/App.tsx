import './App.css';
import Header from './components/Header/Header.tsx';
// import Home from "./pages/Home/Home.tsx";
import Mobile from './pages/Mobile/Mobile.tsx';
import {Route, Router, Routes} from '@solidjs/router';
import Home from './pages/Home/Home.tsx';
import Pc from './pages/Pc/Pc.tsx';
import Tools from './pages/Tools/Tools.tsx';
import Footer from "./components/Footer/Footer";
import FitBackground from "./components/FitBackground/FitBackground.tsx";
import backgroundImage from "./assets/background.jpg";

function App() {
    return (
        <Router>
            <FitBackground imageUrl={backgroundImage} beforeLoadImage="linear-gradient(to right, #ffcdb9, #ffb9b9, #FFC0CB)"></FitBackground>
            <Header />
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/pc" component={Pc}/>
                <Route path="/mobile" component={Mobile} />
                <Route path="/tools" component={Tools} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
