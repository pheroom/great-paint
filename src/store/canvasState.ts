import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement
    socket: WebSocket
    sessionId: number
    undoList: string[]
    redoList: string[]
    username: string

    constructor() {
        makeAutoObservable(this)
        this.undoList = []
        this.redoList = []
    }

    setSessionId(id) {
        this.sessionId = id
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