import {makeAutoObservable} from "mobx";
import Tool from "../tools/Tool";
import CanvasState from "./canvasState";

class ToolState {
    tool: Tool

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

    setFillColor(color) {
        if(!this.tool) return
        this.tool.fillColor = color
    }

    setStrokeColor(color) {
        if(!this.tool) return
        this.tool.strokeColor = color

    }

    setLineWidth(width) {
        if(!this.tool) return
        this.tool.lineWidth = width
    }
}

export default new ToolState()