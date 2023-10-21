import './App.css';
import Header from './components/Header/Header.tsx';
// import Home from "./pages/Home/Home.tsx";
import Mobile from './pages/Mobile/Mobile.tsx';
import {Route, Router, Routes} from '@solidjs/router';
import Home from './pages/Home/Home.tsx';
import Pc from './pages/Pc/Pc.tsx';
import Tools from './pages/Tools/Tools.tsx';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/pc" component={Pc}/>
                <Route path="/mobile" component={Mobile} />
                <Route path="/tools" component={Tools} />
            </Routes>
        </Router>
    );
}

export default App;
