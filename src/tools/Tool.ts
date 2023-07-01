export default class Tool {
    canvas: HTMLCanvasElement
    socket: WebSocket
    id: string
    ctx: CanvasRenderingContext2D

    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color) {
        if(!this.ctx) return
        this.ctx.fillStyle = color
    }

    set strokeColor(color) {
        if(!this.ctx) return
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        if(!this.ctx) return
        this.ctx.lineWidth = width
    }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}