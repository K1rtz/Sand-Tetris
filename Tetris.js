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

        this.frameDelay = 40;

        this.fell = false;
        this.moveRight = false;
        this.moveLeft = false;

        this.play = true;
        this.chargeCount = 0;

        this.destroyArray = []
        this.registerKeyListeners()


        this.pronadjen = false
        this.rotate = false


        this.score = 0.0;



    }

    registerKeyListeners(){
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft'){
                this.moveLeft = true;
            } else if(event.key === 'ArrowRight'){
                this.moveRight = true;
            }
        })
    
        window.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowLeft') {
                this.moveLeft = false;
                // this.stopMoving();
            } else if (event.key === 'ArrowRight') {
                this.moveRight = false;
                // this.stopMoving();
            }
        }); 

        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowUp'){
                this.rotate = true;
            }
        })
    }

    start(){

        let main = document.createElement('div');
        main.classList.add('main');
        this.host.appendChild(main);

        let scoreHolder = document.createElement('div')
        scoreHolder.classList.add('scoreHolder')
        main.appendChild(scoreHolder)

        let score = document.createElement('div')
        score.classList.add('score')
        scoreHolder.appendChild(score);

        score.innerHTML = '0'

        this.updateScore();

        this.createCanvas(main)
        this.draw()
        this.animate()
    }  

    updateScore(){
        let score = document.body.querySelector('.score');
        score.innerHTML = this.score;
    }


    destroyAnimation(){

        console.log("INSIDE DESTROY ANIMATION")
        console.log("LENGTH OF ARRAY IS: " + this.destroyArray.length)

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
                this.score+= this.destroyArray.length;
                this.updateScore()
            // this.destroyArray.forEach(x=>{
            // this.grid2[x.x][x.y].visited = false;
            // this.grid2[x.x][x.y].block = false;
            //  })
            this.unisti().then(()=>{
                this.play = true
                this.swapGrids()
                this.chargeCount = 0
                this.destroyArray.length = 0;
                this.pronadjen = false;
            }
            );

            }

            
            // this.fell = true
        }
        else{        
        }    
            // this.swapGrids()
            //this.play = true;
            // this.chargeCount=0;
            // this.destroyArray.length = 0;

        // }
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
    async unisti(){
    this.destroyArray.forEach(x=>{
        this.grid2[x.x][x.y].visited = false;
        this.grid2[x.x][x.y].block = false;
            })
    }


    rotation(){

        let obj = null;
        this.grid.forEach(row =>{
            if(!obj){
                obj = row.find(cell => cell.center === true);
            }
        })

        let matrix = Array.from({ length: 12 }, () => new Array(12).fill(0));

        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){

                matrix[i-obj.x+4][j-obj.y+4] = this.grid[i][j];
            }
        }
        for(let i = 0; i < 12; i++){
            for(let j = 0; j< 12; j++){
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
            }
        }
        // for (let i = 0; i < 12; i++) {
        //     matrix[i].reverse();
        // }

        const rotatedMatrix = Array.from({ length: 12 }, () => new Array(12).fill(0));
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                rotatedMatrix[j][11 - i] = matrix[i][j];
            }
        }

        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){
                this.grid[i][j] = rotatedMatrix[i-obj.x+4][j-obj.y+4];
            }
        }

        console.log(obj);
        this.rotate = false;

    }


    draw(){

        if(this.rotate){
            this.rotation()
        }
        console.log("backandforth?")
        //this.cells.forEach(e=>e.show())
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j].block == false)
                    this.ctx.fillStyle = 'black'
                
                //else if (this.grid[i][j].initial == true)
                //this.ctx.fillStyle = 'green'
                else if(this.grid[i][j].center == true){
                    this.ctx.fillStyle = 'orange'
                }
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
                visited: false,
                center: false
            }
        }
        }

        //updejtovanje druge
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
                        this.grid2[i][j+1].center = this.grid[i][j].center
                        this.grid[i][j+1].center = false;

                    }
                    //AKO IMA NESTO ISPOD BLOKA PROVERAVA DOLE LEVO I DOLE DESNO
                    else if(below != undefined && below.block == true){
                        let dRight;
                        let dLeft;
                        if(this.grid[i][j].initial){
                            this.fell = true;
                        }
                        let z = Math.random();
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
                            // let x = Math.random()
                            // if(x>0.3){

                                this.grid[i][j].block  = false
                                // this.grid[i][j].initial = false;
                                
                                this.grid[i+1][j+1].block  = true
                                this.grid[i+1][j+1].initial = true;
                                
                                this.grid2[i+1][j+1].block  = true
                                this.grid2[i+1][j+1].initial  = this.grid[i][j].initial
                                this.grid2[i+1][j+1].color  = this.grid[i][j].color
                                this.grid2[i+1][j+1].blockColor  = this.grid[i][j].blockColor
                            // }


                        }
                        //PROVERA DOLE LEVO
                        else if(dLeft != undefined && dLeft.block === false && z>0.4){
                            // let x = Math.random();
                            // if(x>0.5){
                                
                                this.grid[i][j].block  = false
                                // this.grid[i][j].initial  = false
                                
                                this.grid[i-1][j+1].block  = true
                                this.grid[i-1][j+1].initial  = true
                                
                                this.grid2[i-1][j+1].block  = true
                                this.grid2[i-1][j+1].initial  = this.grid[i][j].initial
                                this.grid2[i-1][j+1].color  = this.grid[i][j].color
                                this.grid2[i-1][j+1].blockColor  = this.grid[i][j].blockColor
                            // }

                        }
                        //OSTANE TU GDE JESTE JER NEMA GDE DA PADNE?
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
                    //AKO JE NA DNU KANVASA
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

        
        if(this.fell == true){
            this.dodajFiguru().then(()=>{
                this.fell = false
                this.checkForMoves()
                this.swapGrids()
                this.checkHits()
            })
        }else{
            this.checkForMoves()
            this.swapGrids()
            this.checkHits()

        }
        


        
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
                        this.grid2[i+1][j].center = this.grid2[i][j].center
                    }
                }
            }



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
                        this.grid2[i-1][j].center = this.grid2[i][j].center
                    }
                }
            }
        }
    }

    checkHits(){

        let lastColor = null
        for(let j = this.rows-1; j >= 0; j--){                    //od 99 do 0
            let currentColor = this.grid2[0][j].blockColor;       //boja poslednjeg elementa u prvoj koloni
            
            if(this.grid2[0][j].block == true){                   //ako postoji kockica koja je pala na to polje

                if(currentColor != lastColor && this.pronadjen == false){   //ovde greska jer nastavlja dalje                 //ako je njena boja razlicita od prethodne
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
            //LEVODESNOGOREDOLE
            if(y > -1 && y < this.rows){
                //dole
                if(y < 99){
                    if(this.grid2[x][y+1].block == true && this.grid2[x][y+1].blockColor == color && this.grid2[x][y+1].visited == false && this.grid2[x][y+1].initial==false){
                        niz.push({x: x, y: y+1})
                    }
                }
                if(y > 0){

                    if(this.grid2[x][y-1].block == true && this.grid2[x][y-1].blockColor == color && this.grid2[x][y-1].visited == false && this.grid2[x][y-1].initial==false){
                        niz.push({x: x, y: y-1})
                    }
                }
            }
            if(x > -1 && x < this.cols){
                if(x < 59){
                    if(this.grid2[x+1][y].block == true && this.grid2[x+1][y].blockColor == color && this.grid2[x+1][y].visited == false&& this.grid2[x+1][y].initial==false ){
                        niz.push({x: x+1, y: y})
                    }
                }
                if(x>0){
                    if(this.grid2[x-1][y].block == true && this.grid2[x-1][y].blockColor == color && this.grid2[x-1][y].visited == false&& this.grid2[x-1][y].initial==false){
                        niz.push({x: x-1, y: y})
                    }
                }
            }
            //UKOSO
            if (y<this.rows-1 && x < this.cols-1){
                if(this.grid2[x+1][y+1].block == true && this.grid2[x+1][y+1].blockColor == color && this.grid2[x+1][y+1].visited == false && this.grid2[x+1][y+1].initial==false){
                    niz.push({x: x+1, y: y+1})
                } 
            }
            if(y< this.rows-1 && x>0){
                if(this.grid2[x-1][y+1].block == true && this.grid2[x-1][y+1].blockColor == color && this.grid2[x-1][y+1].visited == false && this.grid2[x-1][y+1].initial==false){
                    niz.push({x: x-1, y: y+1})
                } 
            }
            if(y>0 && x > 0){
                if(this.grid2[x-1][y-1].block == true && this.grid2[x-1][y-1].blockColor == color && this.grid2[x-1][y-1].visited == false && this.grid2[x-1][y-1].initial==false){
                    niz.push({x: x-1, y: y-1})
                } 
            }
            if(y>0 && x<this.cols-1){
                if(this.grid2[x+1][y-1].block == true && this.grid2[x+1][y-1].blockColor == color && this.grid2[x+1][y-1].visited == false && this.grid2[x+1][y-1].initial==false){
                    niz.push({x: x+1, y: y-1})
                } 
            }


        }
        if(rightSideReach && this.destroyArray.length !=0){

            console.log("POGODAKPOGUSCEMP");
            console.log(this.destroyArray.length)
            this.play=false;
            this.pronadjen = true;
        }else{
            this.destroyArray.forEach(x=>{
                this.grid2[x.x][x.y].visited = false;
            })
            this.destroyArray.length = 0;

        }

            
        
            
    }

    dfs(){

    }


    async dodajFiguru(){
        
        let figurines = Math.floor(Math.random() * 3)

        let colors = ['red', 'blue', 'green']
        if(figurines == 0){

            let rnd = Math.floor(Math.random() * colors.length);
            // console.log(rnd);
            for(let i = 24; i < 36; i++){
                for(let j = 5; j < 17; j++){
                    this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
                    rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
                    rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
                    this.grid2[i][j].blockColor = colors[rnd];
                    this.grid2[i][j].block = true;
                    this.grid2[i][j].initial = true;
                    this.grid2[i][j].visited = false;
                    this.grid[i][j].blockColor = colors[rnd];
                    this.grid[i][j].block = true;
                    this.grid[i][j].initial = true;
                    this.grid[i][j].visited = false;
                    if(i> 27 && i < 32 && j > 8 && j < 13){
                        this.grid[i][j].center = true;
                        this.grid2[i][j].center = true;
                    }

                }
            }
            
        }   
        else if(figurines == 1){

            let rnd = Math.floor(Math.random() * colors.length);
            for(let i = 24; i < 36; i++){
                for(let j = 5; j < 17; j++){
                    if(j>12 || (i>27 && i<32 && j>8)){

                        this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
                        rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
                        rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
                        this.grid2[i][j].blockColor = colors[rnd];
                        this.grid2[i][j].block = true;
                        this.grid2[i][j].initial = true;
                        this.grid2[i][j].visited = false;
                        this.grid[i][j].blockColor = colors[rnd];
                        this.grid[i][j].block = true;
                        this.grid[i][j].initial = true;
                        this.grid[i][j].visited = false;
                    }
                    if(i> 27 && i < 32 && j > 8 && j < 13){
                        this.grid[i][j].center = true;
                        this.grid2[i][j].center = true;
                    }

                }
            }
            
        }
        else if(figurines == 2){

            let rnd = Math.floor(Math.random() * colors.length);
            for(let i = 24; i < 36; i++){
                for(let j = 5; j < 17; j++){
                    if(j>8 && j < 13){

                        this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
                        rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
                        rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
                        this.grid2[i][j].blockColor = colors[rnd];
                        this.grid2[i][j].block = true;
                        this.grid2[i][j].initial = true;
                        this.grid2[i][j].visited = false;
                        this.grid[i][j].blockColor = colors[rnd];
                        this.grid[i][j].block = true;
                        this.grid[i][j].initial = true;
                        this.grid[i][j].visited = false;
                    }
                    if(i> 27 && i < 32 && j > 8 && j < 13){
                        this.grid[i][j].center = true;
                        this.grid2[i][j].center = true;
                    }
                }
            }
            
        }   


        this.fell = false;

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

    createCanvas(host){
        const canvas = document.createElement('canvas');
        canvas.classList.add('canva')
        canvas.width = this.width;
        canvas.height = this.height;
        this.cols = this.width/this.w;
        this.rows = this.height/this.w;

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

        host.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
    }

    animate(){
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
