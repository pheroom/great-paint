import Tool from "./Tool";

export default class Eraser extends Tool {
    mouseDown: boolean
    points: [number, number][]
    lastStrokeStyle: string | CanvasGradient | CanvasPattern

    constructor(canvas, socket, id, username) {
        super(canvas, socket, id, username);
        this.listen()
        this.points = []
        this.lastStrokeStyle = canvas.strokeStyle
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        document.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        if(!this.mouseDown) return
        this.mouseDown = false
        this.ctx.closePath()
        this.ctx.strokeStyle = this.lastStrokeStyle
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            username: this.username,
            figure: {
                type: 'eraser',
                points: this.points,
                lineWidth: this.ctx.lineWidth
            }
        }))
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.points = []
        this.ctx.beginPath()
        this.lastStrokeStyle = this.ctx.strokeStyle
        this.ctx.strokeStyle = 'white'
        this.mouseMoveHandler(e)
    }
    mouseMoveHandler(e) {
        if (!this.mouseDown) return
        const x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop
        this.draw(x, y)
        this.points.push([x, y])
    }

    draw(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    static draw(ctx, points, lineWidth) {
        const {strokeStyle: lastStroke, lineWidth: lastWidth} = ctx
        ctx.strokeStyle = 'white'
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        for (const [x, y] of points) {
            ctx.lineTo(x, y)
            ctx.stroke()
        }
        ctx.closePath()
        ctx.strokeStyle = lastStroke
        ctx.lineWidth = lastWidth
    }
}