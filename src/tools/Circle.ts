import Tool from "./Tool";

export default class Circle extends Tool {
    mouseDown: boolean
    r: number
    saved: string
    startX: number
    startY: number

    constructor(canvas, socket, id, username) {
        super(canvas, socket, id, username);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        document.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        const canvasData = this.canvas.toDataURL()
        this.ctx.beginPath()
        this.r = 0
        this.startX = e.pageX-e.target.offsetLeft
        this.startY = e.pageY-e.target.offsetTop
        this.saved = canvasData
    }

    mouseUpHandler(e) {
        if(!this.mouseDown) return
        this.mouseDown = false
        const currentX = e.pageX-e.target.offsetLeft
        const currentY = e.pageY-e.target.offsetTop
        const width = currentX-this.startX
        const height = currentY-this.startY
        const r = e.target.tagName === 'CANVAS' ? Math.sqrt(width**2 + height**2) : this.r
        if(!height && !height) return
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            username: this.username,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                r,
                stroke: this.ctx.strokeStyle,
                fill: this.ctx.fillStyle,
                lineWidth: this.ctx.lineWidth,
            }
        }))
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            const currentX = e.pageX-e.target.offsetLeft
            const currentY = e.pageY-e.target.offsetTop
            const width = currentX-this.startX
            const height = currentY-this.startY
            this.r = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, this.r)
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
            this.ctx.stroke()
        }.bind(this)
    }

    static draw(ctx, figure) {
        const {x,y,r,stroke,fill,lineWidth} = figure
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