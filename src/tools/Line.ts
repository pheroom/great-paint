import Tool from "./Tool";

export default class Line extends Tool {
    mouseDown: boolean
    currentX: number
    currentY: number
    saved: string
    width: number
    height: number

    constructor(canvas, socket, id, username) {
        super(canvas, socket, id, username);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        document.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        if(!this.mouseDown) return
        this.mouseDown = false
        const width = e.target.tagName === 'CANVAS' ? e.pageX-e.target.offsetLeft : this.width
        const height = e.target.tagName === 'CANVAS' ? e.pageY-e.target.offsetTop : this.height
        if(width === this.currentX && height === this.currentY) return
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            username: this.username,
            figure: {
                type: 'line',
                x: this.currentX,
                y: this.currentY,
                w: width,
                h: height,
                stroke: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth,
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.height = 0
        this.width = 0
        this.ctx.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const x = e.pageX-e.target.offsetLeft
            const y = e.pageY-e.target.offsetTop
            this.height = y
            this.width = x
            this.draw(x, y)
        }
    }

    draw(x, y) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY )
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static draw(ctx, figure) {
        const {x, y, w, h, stroke, lineWidth} = figure
        const {strokeStyle: lastStroke, lineWidth: lastWidth} = ctx
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(w, h)
        ctx.stroke()
        ctx.strokeStyle = lastStroke
        ctx.lineWidth = lastWidth
    }
}