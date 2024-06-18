import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Erro from "./pages/erro";
import Achievement from "./pages/achievement";
// CONFIG ROTAS
function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/>}></Route>
                <Route path="/erro" element={ <Erro/> }></Route>
                <Route path="/achievement" element={ <Achievement/> }></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;