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
        this.coin=false;

        this.isMoving=false;
        this.isRotating=false;

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
            if(event.key === 'ArrowUp' && !event.repeat){
                this.rotate = true;
                // this.rotation()
            }
        })
    }

    start(){

        let main = document.createElement('div');
        main.classList.add('main');
        this.host.appendChild(main);

        let scoreAndDisplay = document.createElement('div')
        scoreAndDisplay.classList.add('score-display')
        main.appendChild(scoreAndDisplay)

        // let pipe = document.createElement('div')
        // pipe.classList.add('pipe')
        // scoreAndDisplay.appendChild(pipe)


        let scoreHolder = document.createElement('div')
        scoreHolder.classList.add('scoreHolder')
        scoreAndDisplay.appendChild(scoreHolder)

        let score = document.createElement('div')
        score.classList.add('score')
        scoreHolder.appendChild(score);

        score.innerHTML = '0'

        this.updateScore();

        this.createCanvas(scoreAndDisplay)
        this.createForm(main)
        this.draw()
        this.animate()

    }  

    createForm(host){
        let formWrapper = document.createElement('div')
        formWrapper.classList.add('form-wrapper')
        host.appendChild(formWrapper)

        const form = document.createElement('div')
        form.classList.add('form', 'for')
        formWrapper.appendChild(form)

        const form2 = document.createElement('div')
        form2.classList.add('form2', 'for')
        formWrapper.appendChild(form2)

        let label2 = document.createElement('label')
        label2.innerHTML = "YOURE MOM:"
        form2.appendChild(label2)
        
        const form3 = document.createElement('div')
        form3.classList.add('form3', 'for')
        formWrapper.appendChild(form3)
        // form3.innerHTML = "SCORE"
        let label3 = document.createElement('label')
        label3.innerHTML = "SCORE:"
        form3.appendChild(label3)

        const form4 = document.createElement('div')
        form4.classList.add('form4', 'for')
        formWrapper.appendChild(form4)

        // const form6 = document.createElement('div')
        // form6.classList.add('form6', 'for')
        // formWrapper.appendChild(form6)

        // // let leverControl = document.getElementById("leverControl");
        // // form6.appendChild(leverControl)
        
        // const glassHolder6 = document.createElement('div')
        // glassHolder6.classList.add('glassHolder6')
        // form6.appendChild(glassHolder6)

        // const glass6 = document.createElement('div')
        // glass6.classList.add('glass', 'glass6')
        // glassHolder6.appendChild(glass6)







        // const pepe1 = document.createElement('div')
        // pepe1.classList.add('pepe1', 'pep')
        // formWrapper.appendChild(pepe1)

        // const pepe2 = document.createElement('div')
        // pepe2.classList.add('pepe2', 'pep')
        // formWrapper.appendChild(pepe2)

        // const pepe3 = document.createElement('div')
        // pepe3.classList.add('pepe3', 'pep')
        // formWrapper.appendChild(pepe3)

        // const pepe4 = document.createElement('div')
        // pepe4.classList.add('pepe4', 'pep')
        // formWrapper.appendChild(pepe4)

        const pepeGlass = document.createElement('div')
        // pepeGlass.classList.add('pepe4', 'pep', 'glassPepe')
        pepeGlass.innerHTML =""
        formWrapper.appendChild(pepeGlass)


        // const pepeGlass2 = document.createElement('div')
        // pepeGlass2.classList.add('pepe4', 'pep', 'glassPepe2')
        // pepeGlass2.innerHTML =""
        // formWrapper.appendChild(pepeGlass2)

        // let pepeLabel = document.createElement('label')
        // pepeLabel.innerHTML = "1988"
        // pepeGlass2.appendChild(pepeLabel)






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
                    this.grid2[x.x][x.y].color = 'green';
                })
            }
        }else if(this.chargeCount < 15){
            console.log('usloseuelse')
            console.log(this.destroyArray.length)
            if(this.destroyArray.length!=0){
                this.score+= this.destroyArray.length;
                this.updateScore()

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
        // if(!this.isRotating){
        //     this.isRotating=true;
        // console.log("ZAPOCETA ROTACIJA")
        let obj = null;
        this.grid2.forEach(row =>{
            if(!obj){
                obj = row.find(cell => cell.center === true);
            }
        })
        if(obj.x<4){
            obj.x=4;
        }
        if(obj.x>this.cols-8){
            obj.x=this.cols-8
        }
        if(obj.y>this.rows-8){
            obj.y=this.rows-8
        }
        // let fix = false
        // for(let x = obj.y-4; x <obj.y+8; x++){
        //     for(let y = obj.x; y <obj.x+8; y++){
        //         if(this.grid2[y][x].block && !this.grid2[y][x].initial)
        //             fix = true
        //     }
        // }
        // if(fix){
        //     obj.y=80;
        //     obj.x=4;
        // }
        


        let matrix = Array.from({ length: 12 }, () => new Array(12).fill(0));

        //samo prebacimo sve okolko figure u novu matricu
        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){

                matrix[i-obj.x+4][j-obj.y+4] = {...this.grid2[i][j]};
                //console.log(matrix[11][11])
            }
        }

        //zarotiramo te vrednosti
        const rotatedMatrix = Array.from({ length: 12 }, () => new Array(12).fill(0));
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                rotatedMatrix[j][11 - i] = {...matrix[i][j]};
            }
        }

        // for(let i = 0; i < 12; i ++){
        //     for(let j=0; j< 12; j++){
        //         this.grid2[i][j] = {...rotatedMatrix[i][j]}
        //     }
        // }



        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){
                
                if(this.grid2[i][j].initial){
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

                    // this.grid2[i][j].color = 'pink'
                }
            }
        }


        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){
 
                // if(rotatedMatrix[i-obj.x+4][j-obj.y+4].initial || this.grid2[i][j].block)
                    // this.grid2[i][j] = rotatedMatrix[i-obj.x+4][j-obj.y+4];


                const rotatedValue = rotatedMatrix[i - obj.x + 4][j - obj.y + 4];


                if (rotatedValue.initial) {
                    this.grid2[i][j] = {...rotatedValue}; 
                }
                


            }
        }

        this.rotate = false;
 
    }


    draw(){

        // if(this.rotate){
        //     this.rotation()
        // }
        //console.log("backandforth?")
        //this.cells.forEach(e=>e.show())
        for(let i = 0; i < 30; i++){
            if(this.grid[i][16].block && !this.grid[i][16].initial)
                console.log('GAMELOST')
        }
        if(Math.random() > 0.5){
                document.body.classList.add('gradient2')

        }else{

        }


        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j].block == false && j!=16)
                    this.ctx.fillStyle = 'black'
                else if(j == 16 && this.grid[i][j].block == false){
                    this.ctx.fillStyle = '#246A7350'
                }
                //else if (this.grid[i][j].initial == true)
                //this.ctx.fillStyle = 'green'
                // else if(this.grid[i][j].center == true){
                    // this.ctx.fillStyle = 'orange'
                // }
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
        if(this.rotate){
            this.rotation()
        }
        if(this.moveRight || this.moveLeft){
            this.checkForMoves()
        }

        if(this.fell == true){
            this.dodajFiguru().then(()=>{
                this.fell = false
                //this.checkForMoves()
                this.swapGrids()
                this.checkHits()
            })
        }else{
            //this.checkForMoves()
            this.swapGrids()
            this.checkHits()

        }
        
 

        
    }

    checkForMoves(){
        // if(!this.rotate){
        // console.log("ZAPOCETO POMERANJE")
        
        if(this.moveRight){
                
            let val = true;
            for(let x = 0; x < this.rows; x++){
                if(this.grid2[this.cols-1][x].initial == true)
                    val = false;
            }
            
            for(let i = this.cols-2; i >= 0; i--){ 
                for(let j = 0; j < this.rows; j++){
                    
                    if(val && this.grid2[i][j].block == true && this.grid2[i][j].initial == true &&  this.grid2[i+1][j].block == false){
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
            
            let val = true;
            for(let x = 0; x < this.rows; x++){
                if(this.grid2[0][x].initial == true)
                    val = false;
            }
            
            for(let i = 1; i < this.cols; i++){  
                for(let j = 0; j < this.rows; j++){
                    if(val && this.grid2[i][j].block == true && this.grid2[i][j].initial == true && this.grid2[i-1][j].initial == false){
                        
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
        // console.log("ZAVRSENO POMERANJE")
    // }
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
        // figurines = 1
        let colors = ['red', 'blue', 'green']
        if(figurines == 0){

            let rnd = Math.floor(Math.random() * colors.length);
            // console.log(rnd);
            for(let i = 24; i < 36; i++){
                for(let j = 1; j < 13; j++){
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
                    if(i> 27 && i < 32 && j > 4 && j < 9){
                        this.grid[i][j].center = true;
                        this.grid2[i][j].center = true;
                    }

                }
            }
            
        }   
        else if(figurines == 1){

            let rnd = Math.floor(Math.random() * colors.length);
            for(let i = 24; i < 36; i++){
                for(let j = 1; j < 13; j++){
                    if(j>8 || (i>27 && i<32 && j>4)){

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
                    if(i> 27 && i < 32 && j > 4 && j < 9){
                        this.grid[i][j].center = true;
                        this.grid2[i][j].center = true;
                    }

                }
            }
            
        }
        else if(figurines == 2){

            let rnd = Math.floor(Math.random() * colors.length);
            for(let i = 24; i < 36; i++){
                for(let j = 1; j < 13; j++){
                    if(j>4 && j < 9){

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
                    if(i> 27 && i < 32 && j > 4 && j < 9){
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
                if(this.moveRight || this.moveLeft){
                    this.checkForMoves()
                }
                // if(this.rotate){
                //     this.rotation()
                // }
                
                
            }
            else{
                this.destroyAnimation();
            }

            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}
