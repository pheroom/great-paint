import './App.css'
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";

function App() {
    return (
        <div>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    )
}

export default App
