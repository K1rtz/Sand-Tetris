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

        this.frameDelay = 20;

        this.fell = false;
        this.moveRight = false;
        this.moveLeft = false;


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

    draw(){

        //this.cells.forEach(e=>e.show())
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j].block == false)
                    this.ctx.fillStyle = 'black'
                
                else if (this.grid[i][j].initial == true)
                    this.ctx.fillStyle = 'green'
                else
                this.ctx.fillStyle = 'white'

                this.ctx.fillRect(i*this.w,j*this.w,this.w, this.w);
                this.grid2[i][j] = {
                                        x: i,
                    y: j,
                    color: 'background',
                    block: false,
                    initial: false
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


                        }
                        //PROVERA DOLE LEVO
                        else if(dLeft != undefined && dLeft.block === false){
                            this.grid[i][j].block  = false
                            // this.grid[i][j].initial  = false

                            this.grid[i-1][j+1].block  = true
                            this.grid[i-1][j+1].initial  = true

                            this.grid2[i-1][j+1].block  = true
                            this.grid2[i-1][j+1].initial  = this.grid[i][j].initial

                        }
                        else{
                            this.grid2[i][j].block = true;
                            this.grid2[i][j].initial = this.grid[i][j].initial
                            if(this.grid2[i][j].initial){
                                this.fell = true;
                            }

                        }
                    }
                    else{
                        this.grid2[i][j].block = true;
                        this.grid2[i][j].initial = this.grid[i][j].initial;
                        
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


        if(this.fell == true){
            this.dodajFiguru()
        }

        this.checkForMoves()

        //console.log(this.grid[this.cols-1][this.rows])
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
                    }
                }
                console.log(this.cols)
            }



            this.moveLeft = false
        }

    }

    dodajFiguru(){
        this.fell = false;
        //grid 2 vise nema initial true kockice

        for(let i = 20; i < 30; i++){
            for(let j = 10; j < 20; j++){
                this.grid2[i][j].color = 'white';
                this.grid2[i][j].block = true;
                this.grid2[i][j].initial = true;
            }
        }

        console.log('pozvano je dodaj figuru')
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
                    block: false,
                    initial: false
                }
                this.grid2[i][j] = {
                    x: i,
                    y: j,
                    color: 'background',
                    block: false,
                    initial: false
                };
            }
        }


        for(let i = 10; i<26; i++){
            for(let j = 70; j<87;j++){
                this.grid[i][j].color = 'white';
                this.grid[i][j].block = true;
                this.grid[i][j].initial = true;
            }
        }

        this.host.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
    }

    animate(){
        //const frameDelay = 200;
        const currentTime = performance.now()
        if (currentTime - this.lastFrameTime >= this.frameDelay) {
            this.ctx.resetTransform()
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.draw()
            
            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}

