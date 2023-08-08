import {makeAutoObservable} from "mobx";
import Tool from "../tools/Tool";

class ToolState {
    tool: Tool
    fillColor: string

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
        if(this.fillColor){
            this.tool.fillColor = this.fillColor
            this.fillColor = undefined
        }
    }

    setFillColor(color) {
        if(!this.tool) {
            this.fillColor = color
            return
        }
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