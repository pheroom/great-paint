import './styles/main.scss'
import {Link, Route, Routes, useLocation} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import {RouteNames} from "./routes";
import CanvasPage from "./pages/CanvasPage";
import CreateCanvasPage from "./pages/CreateCanvasPage";
import ChangeUsernameModal from "./components/ChangeUsernameModal";
import CanvasInfoModal from "./components/CanvasInfoModal.tsx";

function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path={RouteNames.MAIN} element={<CreateCanvasPage/>}/>
                <Route path={RouteNames.CANVAS} element={<CanvasPage/>}>
                    <Route path={RouteNames.CANVAS_PARAMS} element={<CanvasPage/>}/>
                </Route>
                <Route path={'*'} element={<PageNotFound path={RouteNames.MAIN}/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route path={RouteNames.CHANGE_NAME} element={<ChangeUsernameModal/>}/>
                    <Route path={`${RouteNames.CANVAS_INFO}/:id`} element={<CanvasInfoModal/>}/>
                </Routes>
            )}
        </>
    )
}

export default App
