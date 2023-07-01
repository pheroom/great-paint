import Tool from "./Tool";

export default class Circle extends Tool {
    mouseDown: boolean
    canvasData: string
    saved: string
    startX: number
    startY: number

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        const canvasData = this.canvas.toDataURL()
        this.ctx.beginPath()
        this.startX = e.pageX-e.target.offsetLeft
        this.startY = e.pageY-e.target.offsetTop
        this.saved = canvasData
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        const currentX = e.pageX-e.target.offsetLeft
        const currentY = e.pageY-e.target.offsetTop
        const width = currentX-this.startX
        const height = currentY-this.startY
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                r: Math.sqrt(width**2 + height**2),
                stroke: this.ctx.strokeStyle,
                fill: this.ctx.fillStyle,
                lineWidth: this.ctx.lineWidth,
            }
        }))
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            const currentX = e.pageX-e.target.offsetLeft
            const currentY = e.pageY-e.target.offsetTop
            const width = currentX-this.startX
            const height = currentY-this.startY
            const r = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x,y,r) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }.bind(this)
    }

    static draw(ctx,x,y,r,stroke,fill,lineWidth) {
        const {fillStyle: lastFill, strokeStyle: lastStroke, lineWidth: lastWidth} = ctx
        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = lastFill
        ctx.strokeStyle = lastStroke
        ctx.lineWidth = lastWidth
    }
}