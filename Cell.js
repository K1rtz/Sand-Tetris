export class Cell{
    constructor(x,y,w,ctx, grid){
        this.x = x
        this.y = y
        this.w = w
        this.ctx = ctx
        this.grid = grid
        this.color = 'red'
        this.empty = true;
    }

    show(){
        if(this.grid[this.x][this.y] == 1){
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.y*5, this.x*5, this.w, this.w)
        }
    }
    setColor(color){
        this.color = color;
    }
    getColor(){
        return this.color;
    }
    empty(){
        this.empty = true;
    }
    dropDown(){

    }


}