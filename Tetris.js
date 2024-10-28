import { Cell } from "./Cell.js";
export class Tetris{


    constructor(host){
        this.host = host
        this.lastFrameTime = 0
        this.width = 300;
        this.height = 500;
        this.w = 5;
        this.rows
        this.cols
        this.grid
        this.grid2
        this.cells = []

        this.ctx

        this.frameDelay = 30;

        this.fell = false;
        this.moveRight = false;
        this.moveLeft = false;

        this.play = true;
        this.chargeCount = 0;

        this.destroyArray = []
        this.registerKeyListeners()
    }

    registerKeyListeners(){
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft'){
                this.moveLeft = true;
                // console.log('levo')
            } else if(event.key === 'ArrowRight'){
                this.moveRight = true;
                // console.log('desno')
            }
        })
    }

    start(){
        this.createCanvas()
        this.draw()
        this.animate()
    }  

    destroyAnimation(){



        // console.log(this.chargeCount);
        if(this.chargeCount < 10){
            if(this.chargeCount%2==0){
                console.log('levo')
                console.log(this.destroyArray.length)
                this.destroyArray.forEach(x=>{
                //this.grid2[x.x][x.y].visited = false;
                this.grid2[x.x][x.y].color = 'white';
                })
            }else{
                console.log('desno')
                console.log(this.destroyArray.length)

                this.destroyArray.forEach(x=>{
                    //this.grid2[x.x][x.y].visited = false;
                    this.grid2[x.x][x.y].color = 'green';
                })
            }
        }else if(this.chargeCount < 15){
            console.log('usloseuelse')
            console.log(this.destroyArray.length)
            if(this.destroyArray.length!=0){
            this.destroyArray.forEach(x=>{
            this.grid2[x.x][x.y].visited = false;
            this.grid2[x.x][x.y].block = false;
             })
            }

            
            // this.fell = true
        }
        else{            
            this.swapGrids()
            this.play = true;
            this.chargeCount=0;
            this.destroyArray.length = 0;

        }
        this.chargeCount++;
    


        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid2[i][j].block == false)
                    this.ctx.fillStyle = 'black'
                else
                    this.ctx.fillStyle = this.grid2[i][j].color//this.grid[i][j].blockColor//color
            
                this.ctx.fillRect(i*this.w,j*this.w,this.w, this.w);
                // this.grid2[i][j] = {
                //     x: i,
                //     y: j,
                //     color: 'background',
                //     blockColor: 'background',
                //     block: false,
                //     initial: false,
                //     visited: false
                // }
            }
        }


    }


    draw(){

        console.log("backandforth?")
        //this.cells.forEach(e=>e.show())
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j].block == false)
                    this.ctx.fillStyle = 'black'
                
                //else if (this.grid[i][j].initial == true)
                //this.ctx.fillStyle = 'green'
                else
                this.ctx.fillStyle = this.grid[i][j].color//this.grid[i][j].blockColor//color
            
            this.ctx.fillRect(i*this.w,j*this.w,this.w, this.w);
            this.grid2[i][j] = {
                x: i,
                y: j,
                color: 'background',
                blockColor: 'background',
                block: false,
                initial: false,
                visited: false
            }
        }
        }
    
        for(let j = this.rows-1; j >= 0; j--){
            for(let i = this.cols-1; i >= 0; i--){  

                let state = this.grid[i][j]
                if(state.block == true){
                    let below = this.grid[i][j+1]
                    
                    //AKO NEMA NISTA ISPOD BLOKA ON IDE JEDNO DOLE
                    if(below != undefined && below.block == false){
                        // console.log('x')

                        this.grid[i][j].block = false;
                        // this.grid[i][j].initial = false;

                        this.grid[i][j+1].block = true;
                        // this.grid[i][j+1].initial = true;

                        this.grid2[i][j+1].block = true;
                        this.grid2[i][j+1].initial = this.grid[i][j].initial
                        this.grid2[i][j+1].color = this.grid[i][j].color
                        this.grid2[i][j+1].blockColor = this.grid[i][j].blockColor
                    }
                    //AKO IMA NESTO ISPOD BLOKA PROVERAVA DOLE LEVO I DOLE DESNO
                    else if(below != undefined && below.block == true){
                        let dRight;
                        let dLeft;
                        if(this.grid[i][j].initial){
                            this.fell = true;
                        }

                        if(i<59){
                            dRight = this.grid[i+1][j+1]
                        }else{
                            dRight=undefined;
                        }
                        if(i>0){
                            dLeft = this.grid[i-1][j+1]
                        }else{
                            dLeft = undefined;
                        }
                        //PROVERA DOLE DESNO
                        if(dRight != undefined && dRight.block === false){
                            this.grid[i][j].block  = false
                            // this.grid[i][j].initial = false;

                            this.grid[i+1][j+1].block  = true
                            this.grid[i+1][j+1].initial = true;

                            this.grid2[i+1][j+1].block  = true
                            this.grid2[i+1][j+1].initial  = this.grid[i][j].initial
                            this.grid2[i+1][j+1].color  = this.grid[i][j].color
                            this.grid2[i+1][j+1].blockColor  = this.grid[i][j].blockColor


                        }
                        //PROVERA DOLE LEVO
                        else if(dLeft != undefined && dLeft.block === false){
                            this.grid[i][j].block  = false
                            // this.grid[i][j].initial  = false

                            this.grid[i-1][j+1].block  = true
                            this.grid[i-1][j+1].initial  = true

                            this.grid2[i-1][j+1].block  = true
                            this.grid2[i-1][j+1].initial  = this.grid[i][j].initial
                            this.grid2[i-1][j+1].color  = this.grid[i][j].color
                            this.grid2[i-1][j+1].blockColor  = this.grid[i][j].blockColor

                        }
                        else{
                            this.grid2[i][j].block = true;
                            this.grid2[i][j].initial = this.grid[i][j].initial
                            this.grid2[i][j].color = this.grid[i][j].color
                            this.grid2[i][j].blockColor = this.grid[i][j].blockColor
                            if(this.grid2[i][j].initial){
                                this.fell = true;
                            }

                        }
                    }
                    else{
                        this.grid2[i][j].block = true;
                        this.grid2[i][j].initial = this.grid[i][j].initial;
                        this.grid2[i][j].color = this.grid[i][j].color;
                        this.grid2[i][j].blockColor = this.grid[i][j].blockColor;
                        
                        if(this.grid2[i][j].initial){
                            this.fell = true;
                        }
                    }

                }

                    if(i==0 && j==0 && this.fell == true){
                        this.grid2.forEach(e=>{
                            e.forEach(e2 =>{
                                if(e2.initial)
                                e2.initial = false;
                            })
                        })
                        this.grid.forEach(e=>{
                            e.forEach(e2 =>{
                                if(e2.initial)
                                e2.initial = false;
                            })
                        }) 
                    }
            }
        }

        this.checkHits()

        if(this.fell == true){
            this.dodajFiguru()
        }
        
        this.checkForMoves()
        this.swapGrids()


        
    }
    checkForMoves(){
        if(this.moveRight){

            for(let i = this.cols-2; i >= 0; i--){ 
                for(let j = 0; j < this.rows; j++){

                    if(this.grid2[i][j].block == true && this.grid2[i][j].initial == true &&  this.grid2[i+1][j].block == false){
                        this.grid2[i][j].block = false
                        this.grid2[i][j].initial = false

                        this.grid2[i+1][j].block = true
                        this.grid2[i+1][j].initial = true
                        this.grid2[i+1][j].color = this.grid2[i][j].color
                        this.grid2[i+1][j].blockColor = this.grid2[i][j].blockColor
                    }
                }
            }



            this.moveRight = false
        }
        if(this.moveLeft){
            
            for(let i = 1; i < this.cols; i++){  
                for(let j = 0; j < this.rows; j++){
                    if(this.grid2[i][j].block == true && this.grid2[i][j].initial == true && this.grid2[i-1][j].initial == false){
                        this.grid2[i][j].block = false
                        this.grid2[i][j].initial = false

                        this.grid2[i-1][j].block = true
                        this.grid2[i-1][j].initial = true
                        this.grid2[i-1][j].color =  this.grid2[i][j].color
                        this.grid2[i-1][j].blockColor =  this.grid2[i][j].blockColor
                    }
                }
                // console.log(this.cols)
            }


            this.moveLeft = false
        }

    }

    checkHits(){

        let lastColor = null
        // let x = 1;
        for(let j = this.rows-1; j >= 0; j--){                    //od 99 do 0
            let currentColor = this.grid2[0][j].blockColor;       //boja poslednjeg elementa u prvoj koloni
            
            if(this.grid2[0][j].block == true){                   //ako postoji kockica koja je pala na to polje

                if(currentColor != lastColor){                    //ako je njena boja razlicita od prethodne
                    // x++;
                    // this.grid[0][j].blockColor = 'purple'         //oboji tu kockicu ljubicasto
                    this.checkDepleto(j)
                    // console.log(x)
                }
                lastColor = currentColor;                         //prethodna boja postaje trenutna
            }
            else{
                break;                                            //ako nije zauzeta dole levo kockica onda nisu ni one iznad nje
            }
        }    
    }

checkDepleto(j){
    let current = {
        x: 0,
        y: j
    }
    let color = this.grid2[0][j].blockColor;
    let niz = []
    niz.push(this.grid2[0][j]);
    this.destroyArray = []
    let rightSideReach = false;


    while(niz.length!=0){
        let current = niz.pop();
        let x = current.x
        let y = current.y
        this.grid2[x][y].visited = true;
        this.destroyArray.push(current);

        if(current.x == 59){
            rightSideReach = true;
        }

        if(y > -1 && y < this.rows){
            //dole
            if(y < 99){
                if(this.grid2[x][y+1].block == true && this.grid2[x][y+1].blockColor == color && this.grid2[x][y+1].visited == false){
                    niz.push({x: x, y: y+1})
                }
            }
            if(y > 0){

                if(this.grid2[x][y-1].block == true && this.grid2[x][y-1].blockColor == color && this.grid2[x][y-1].visited == false){
                    niz.push({x: x, y: y-1})
                }
            }
        }
        if(x > -1 && x < this.cols){
            if(x < 59){
                if(this.grid2[x+1][y].block == true && this.grid2[x+1][y].blockColor == color && this.grid2[x+1][y].visited == false){
                    niz.push({x: x+1, y: y})
                }
            }
            if(x>0){
                if(this.grid2[x-1][y].block == true && this.grid2[x-1][y].blockColor == color && this.grid2[x-1][y].visited == false){
                    niz.push({x: x-1, y: y})
                }
            }
        }
    }
    if(rightSideReach){
        console.log("POGODAKPOGUSCEMP");
        this.play=false;
        //this.destroyAnimation();
    }else{
        this.destroyArray.forEach(x=>{
            this.grid2[x.x][x.y].visited = false;
            // this.grid2[x.x][x.y].block = false;
        })
        this.destroyArray.length = 0;

    }

        
    
        
}

dfs(){

}



// this.grid[0][j].block = true
// this.grid[0][j].blockColor= 'green'

    dodajFiguru(){
        //grid 2 vise nema initial true kockice
        
        let colors = ['red', 'blue', 'green']
        
        
        let rnd = Math.floor(Math.random() * colors.length);
        // console.log(rnd);
        for(let i = 20; i < 30; i++){
            for(let j = 10; j < 20; j++){
                this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
                rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
                rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
                this.grid2[i][j].blockColor = colors[rnd];
                this.grid2[i][j].block = true;
                this.grid2[i][j].initial = true;
                this.grid2[i][j].visited = false;
            }
        }
        this.fell = false;
        // console.log( rnd + "dddddddddddddddddddd")
        // console.log('pozvano je dodaj figuru')

    }

    generateRandomShade(baseColor) {
        // Nasumično generiši faktor između 0 i 1
        const factor = Math.random();
    
        var r = Math.round(baseColor.r * factor);
        var g = Math.round(baseColor.g * factor);
        var b = Math.round(baseColor.b * factor);
        if(baseColor.r == 255 && r < 60){
            r = 150;
        }
        if(baseColor.g == 255 && g < 60){
            g = 150;
        }
        if(baseColor.b == 255 && b < 60){
            b = 150;
        }

        return `rgb(${r}, ${g}, ${b})`;
    }

    swapGrids(){
        this.grid = this.grid2.map(row => row.slice());
    }

    createCanvas(){
        const canvas = document.createElement('canvas');
        canvas.classList.add('canva')
        canvas.width = this.width;
        canvas.height = this.height;
        this.cols = this.width/this.w;
        this.rows = this.height/this.w;
        // this.grid = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
        // this.grid2 = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));

        this.grid = []
        this.grid2 = []
        for(let i = 0; i< this.cols; i++){
            this.grid[i] = []
            this.grid2[i] = []
            for(let j = 0; j <this.rows; j++){
                this.grid[i][j] = {
                    x: i,
                    y: j,
                    color: 'background',
                    blockColor: 'background',
                    block: false,
                    initial: false,
                    visisted: false
                    
                }
                this.grid2[i][j] = {
                    x: i,
                    y: j,
                    color: 'background',
                    blockColor: 'background',
                    block: false,
                    initial: false,
                    visisted: false
                };
            }
        }


        this.dodajFiguru()
        this.swapGrids()

        this.host.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
    }

    animate(){
        //const frameDelay = 200;
        const currentTime = performance.now()
        if (currentTime - this.lastFrameTime >= this.frameDelay) {
            if(this.play){
                this.ctx.resetTransform()
                this.ctx.clearRect(0, 0, this.width, this.height)
                this.draw()
                this.checkForMoves()
            }
            else{
                this.destroyAnimation();
            }


            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}
