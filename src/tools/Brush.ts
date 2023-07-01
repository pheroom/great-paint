import Tool from "./Tool";

export default class Brush extends Tool {
    mouseDown: boolean

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        // this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        document.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        if(!this.mouseDown) return
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.mouseMoveHandler(e)
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'brush',
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
                lineWidth: this.ctx.lineWidth,
                stroke: this.ctx.strokeStyle
            }
        }))
    }

    static draw(ctx, x, y, stroke, lineWidth) {
        const {strokeStyle: lastStroke, lineWidth: lastWidth} = ctx
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.strokeStyle = lastStroke
        ctx.lineWidth = lastWidth
    }
}