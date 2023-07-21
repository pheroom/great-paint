import Tool from "./Tool";

export default class Rect extends Tool {
    mouseDown: boolean
    startX: number
    startY: number
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
        if(!this.width || !this.height) return
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            username: this.username,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                fill: this.ctx.fillStyle,
                stroke: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.width = 0
        this.height = 0
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const currentX = e.pageX - e.target.offsetLeft;
            const currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x, y, w, h) {
        const {fillStyle: lastFill, strokeStyle: lastStroke, lineWidth: lastWidth} = this.ctx
        console.log(lastFill, lastStroke)
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.stroke()
        }
    }

    static draw(ctx, figure) {
        const {x, y, width: w, height: h, stroke, fill, lineWidth} = figure
        const {fillStyle: lastFill, strokeStyle: lastStroke, lineWidth: lastWidth} = ctx
        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.fillStyle = lastFill
        ctx.strokeStyle = lastStroke
        ctx.lineWidth = lastWidth

    }
}