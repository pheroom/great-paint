import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement
    socket: WebSocket
    name: string
    id: string
    isPainter: boolean
    undoList: string[]
    redoList: string[]
    drawingList: any[]
    username: string
    confines: {spectatorCode: boolean, painterCode: boolean, name: string}
    userId: string

    constructor() {
        makeAutoObservable(this)
        this.undoList = []
        this.redoList = []
        this.drawingList = []
    }

    pushToDrawingList(draw){
        this.drawingList.push(draw)
    }

    resetDrawingList(){
        this.drawingList = []
    }

    setConfines(obj){
        this.confines = obj
    }

    setName(value) {
        this.name = value
    }

    setIsPainter(value) {
        this.isPainter = value
    }

    setId(id) {
        this.id = id
    }

    setSocket(socket) {
        this.socket = socket
    }

    setUsername(username) {
        this.username = username
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setUserId(id){
        this.userId = id
    }

    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() {
        const ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            const dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        const ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            const dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }

}

export default new CanvasState()