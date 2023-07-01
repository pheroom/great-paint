// import './App.css'
import './styles/main.scss'
import {Link, Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import {RouteNames} from "./routes";
import CanvasPage from "./pages/CanvasPage";
import CreateCanvasPage from "./pages/CreateCanvasPage";

function App() {
    return (
        <Routes>
            <Route path={RouteNames.MAIN} element={<CreateCanvasPage/>}/>
            <Route path={RouteNames.CANVAS} element={<CanvasPage/>}>
                <Route path={RouteNames.CANVAS_PARAMS} element={<CanvasPage/>}/>
            </Route>
            <Route path={'*'} element={<PageNotFound path={RouteNames.MAIN}/>}/>
        </Routes>
    )
}

export default App
