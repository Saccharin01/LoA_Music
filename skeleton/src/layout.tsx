import {createRoot} from "react-dom/client"
import DragableContainer from "./DragableContainer"
const container = document.getElementById("root")
const root = createRoot(container!)

root.render(
        <DragableContainer/>
)
