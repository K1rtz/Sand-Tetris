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
        this.nextGrid
        this.cells = []

        this.ctx

        this.frameDelay = 1;

        this.fell = false;
        this.moveRight = false;
        this.moveLeft = false;

        this.play = true;
        this.chargeCount = 0;

        this.destroyArray = []
        this.registerKeyListeners()


        this.pronadjen = false
        this.rotate = false


        this.ctx2



        this.score = 0.0;
        this.level = 1;
        this.blocks = 0;

        this.active = true;

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

        let headerHolder = document.createElement('div')
        headerHolder.classList.add('header-holder')
        main.appendChild(headerHolder)

        let headerText = document.createElement('span')
        headerText.classList.add('header-text')
        headerText.innerHTML = "SAND TETRIS"
        headerHolder.appendChild(headerText)



        let contentHolder  = document.createElement('div')
        contentHolder.classList.add('content-holder')
        main.appendChild(contentHolder)






        let scoreAndDisplay = document.createElement('div')
        scoreAndDisplay.classList.add('score-display')
        contentHolder.appendChild(scoreAndDisplay)

        const popPause = document.createElement('div')
        popPause.classList.add('popPause')
        scoreAndDisplay.appendChild(popPause)

        let textPause = document.createElement('span')
        textPause.classList.add('textPause')
        textPause.innerHTML = "PAUSE"
        popPause.appendChild(textPause)



        
        this.createForm(contentHolder)
        this.updateScore();
        this.updateBlocks();
        this.updateLevel();
        this.createCanvasNext()
        this.createCanvas(scoreAndDisplay)
        this.draw()
        this.animate()

    }  

    createForm(host){
        let formWrapper = document.createElement('div')
        formWrapper.classList.add('form-wrapper')
        host.appendChild(formWrapper)

        let label1 = document.createElement('label')
        formWrapper.appendChild(label1)
        label1.innerHTML = "NEXT"
        const form = document.createElement('div')
        form.classList.add('form', 'for')
        formWrapper.appendChild(form)

        
        let label2 = document.createElement('label')
        label2.innerHTML = "SCORE"
        formWrapper.appendChild(label2)
        const form2 = document.createElement('div')
        form2.classList.add('form2', 'for')
        formWrapper.appendChild(form2)
        let spen2 = document.createElement('span')
        spen2.classList.add('innerText', 'scoreText')
        form2.appendChild(spen2)

        
        let label3 = document.createElement('label')
        label3.innerHTML = "LEVEL"
        formWrapper.appendChild(label3)
        const form3 = document.createElement('div')
        form3.classList.add('form3', 'for')
        formWrapper.appendChild(form3)
        // form3.innerHTML = "SCORE"

        let spen3 = document.createElement('span')
        spen3.classList.add('innerText', 'levelText')
        form3.appendChild(spen3)


        let label4 = document.createElement('label')
        label4.innerHTML = "BLOCKS"
        formWrapper.appendChild(label4)
        const form4 = document.createElement('div')
        form4.classList.add('form4', 'for')
        formWrapper.appendChild(form4)

        let spen4 = document.createElement('span')
        spen4.classList.add('innerText', 'blocksText')
        form4.appendChild(spen4)


        const form6 = document.createElement('div')
        form6.classList.add('form6', 'for')
        // formWrapper.appendChild(form6)
        let label5 = document.createElement('label')
        label5.innerHTML = "MUSIC:"
        form6.appendChild(label5)

        let buttonDiv = document.createElement('div')
        buttonDiv.classList.add('buttonDiv')
        form6.appendChild(buttonDiv)

        let lab = document.createElement('label')
        lab.classList.add('switch')
        buttonDiv.appendChild(lab)
        
        let input = document.createElement('input')
        input.type = 'checkbox'
        lab.appendChild(input)

        let spa = document.createElement('span')
        spa.classList.add('slider')
        lab.appendChild(spa)

        



        const pepeGlass = document.createElement('div')
        // pepeGlass.classList.add('pepe4', 'pep', 'glassPepe')
        pepeGlass.innerHTML =""
        formWrapper.appendChild(pepeGlass)








    }

    updateScore(){
        let score = document.body.querySelector('.scoreText');
        console.log(score)
        score.innerHTML = this.score;
    }
    updateLevel(){
        let levels = document.body.querySelector('.levelText');
        console.log(levels)
        if(this.score > 3200 * this.level){
            this.level++
        }

        levels.innerHTML = this.level;
    }
    updateBlocks(){
        let blocks = document.body.querySelector('.blocksText');
        console.log(blocks)
        blocks.innerHTML = this.blocks;
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
                this.score+= this.destroyArray.length + Math.floor(this.destroyArray.length*0.5);
                this.updateScore()
                this.updateLevel()
                this.blocks+= this.destroyArray.length
                this.updateBlocks()


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

    greyOut(){

        
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j].block == false && j!=16 || this.grid[i][j].initial)
                    this.ctx.fillStyle = 'black'
                else
                    this.ctx.fillStyle = 'grey'
                if(j == 16 && this.grid[i][j].block == false)
                    this.ctx.fillStyle = '#246A7350'
                
                

            this.ctx.fillRect(i*this.w,j*this.w,this.w, this.w);
            }
        }
    }

    draw(){
        for(let i = 0; i < 30; i++){
            if(this.grid[i][16].block && !this.grid[i][16].initial){
                console.log('GAMELOST')
                this.active = false;
            }
        }
        if(1){//this.active){

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
                    //DODATO KASNIJE ZA ONE RUPE U SREDINI
                    // if(this.grid[i][j].center && j<99 &&!this.grid2[i][j+1].block ){
                    //     this.grid[i][j].center = false;
                    //     this.grid2[i][j+1].center = true;
                    // }
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
        if(!this.active)
            this.greyOut()
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
                        // this.grid2[i][j].center = false
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


    fillNextFigure(){

        let figurines = Math.floor(Math.random() * 3)
        figurines  = 0;
        let colors = ['red', 'blue', 'green', 'yellow']
        let rnd = Math.floor(Math.random() * colors.length);

        // i>1.  i<2.   j>3.  j<4.
        //0 -> SQUARE
        //1 -> LINE
        //2 -> T SHAPE
        //3 -> Z
        //4 -> L
        let restrictions = [[1 , 10, 1, 10],
                            [-1 , 12,  2,  8],
                            [],//[-1 , 12, 7, 12],
                            [],
                            []]
        let t = Math.floor(Math.random() * restrictions.length)
        // console.log(t)
        // t = 3
        // rnd = 3;
        console.log(restrictions[0][0])

        for(let i = 0; i < 12; i++){
            for(let j = 0; j< 12; j++){
                if(i > restrictions[t][0] && i < restrictions[t][1] && j > restrictions[t][2] && j < restrictions[t][3] 
                || (t==2 && j > 3 && j < 8 || t==2 && i > 3 && i < 8 && j < 4) 
                || (t==3 && (i<8  && j < 4 || i < 4 && j < 4 || i > 3 && j < 8 && j > 3))
                || (t==4 && (i>3 && i<8 || i > 4 && j > 7))){
                                        //54 31 97
                    this.nextGrid[i][j].block = true;
                    this.nextGrid[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
                    rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
                    rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) :
                    // rnd == '3' ? this.generateRandomShade({r:164, g:20, b: 215}) : 0
                    // rnd == '3' ? this.generateRandomShade({r:254, g:238, b: 125}) : 0
                    rnd == '3' ? this.generateRandomShade({r:254, g:160, b: 21}) : 0
                    this.nextGrid[i][j].block = true;
                    this.nextGrid[i][j].initial = true;
                    this.nextGrid[i][j].visited = false;
                    this.nextGrid[i][j].blockColor = colors[rnd];

                }else{
                    this.nextGrid[i][j].block = false;
                    this.nextGrid[i][j].color = 'black';
                }


                if(i > 3 && i < 8 && j > 3 && j < 8){
                    this.nextGrid[i][j].center = true
                }
            }
        }
    }



    async dodajFiguru(){
        
        // let figurines = Math.floor(Math.random() * 3)
        // figurines = 1
        // figurines  = 1;
        // let colors = ['red', 'blue', 'green']



        // if(figurines == 0){

            // let rnd = Math.floor(Math.random() * colors.length);

            // for(let i = 24; i < 36; i++){
            //     for(let j = 1; j < 13; j++){
            //         this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
            //         rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
            //         rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
            //         this.grid2[i][j].blockColor = colors[rnd];
            //         this.grid2[i][j].block = true;
            //         this.grid2[i][j].initial = true;
            //         this.grid2[i][j].visited = false;
            //         this.grid[i][j].blockColor = colors[rnd];
            //         this.grid[i][j].block = true;
            //         this.grid[i][j].initial = true;
            //         this.grid[i][j].visited = false;

            //         let x =  this.grid2[i][j].color
            //         this.nextGrid[i-24][j-1].color = x

            //         if(i> 27 && i < 32 && j > 4 && j < 9){
            //             this.grid[i][j].center = true;
            //             this.grid2[i][j].center = true;
            //         }

            //         // this.updateNextRect()
            //     }
            // }
            
            if(this.nextGrid[0][0].color == 'initial'){
                console.log('initialje')
                console.log(this.grid2)
                this.fillNextFigure()
            }
            
            for(let i = 24; i < 36; i++){
                for(let j = 0; j < 12; j++){
                    this.grid2[i][j] = {...this.nextGrid[i-24][j]}
                }
            }
            
            this.fillNextFigure()
            this.updateNextRect()


        // }   
        // else if(figurines == 1){

        //     let rnd = Math.floor(Math.random() * colors.length);
        //     for(let i = 24; i < 36; i++){
        //         for(let j = 1; j < 13; j++){
        //             if(j>8 || (i>27 && i<32 && j>4)){

        //                 this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
        //                 rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
        //                 rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
        //                 this.grid2[i][j].blockColor = colors[rnd];
        //                 this.grid2[i][j].block = true;
        //                 this.grid2[i][j].initial = true;
        //                 this.grid2[i][j].visited = false;
        //                 this.grid[i][j].blockColor = colors[rnd];
        //                 this.grid[i][j].block = true;
        //                 this.grid[i][j].initial = true;
        //                 this.grid[i][j].visited = false;
        //             }
        //             if(i> 27 && i < 32 && j > 4 && j < 9){
        //                 this.grid[i][j].center = true;
        //                 this.grid2[i][j].center = true;
        //             }

        //         }
        //     }
            
        // }
        // else if(figurines == 2){

        //     let rnd = Math.floor(Math.random() * colors.length);
        //     for(let i = 24; i < 36; i++){
        //         for(let j = 1; j < 13; j++){
        //             if(j>4 && j < 9){

        //                 this.grid2[i][j].color = rnd == '0' ? this.generateRandomShade({r:255, g:0, b:0}) :
        //                 rnd == '1' ? this.generateRandomShade({r:0, g:0, b: 255}) : 
        //                 rnd == '2' ? this.generateRandomShade({r:0, g:255, b: 0}) : 0
        //                 this.grid2[i][j].blockColor = colors[rnd];
        //                 this.grid2[i][j].block = true;
        //                 this.grid2[i][j].initial = true;
        //                 this.grid2[i][j].visited = false;
        //                 this.grid[i][j].blockColor = colors[rnd];
        //                 this.grid[i][j].block = true;
        //                 this.grid[i][j].initial = true;
        //                 this.grid[i][j].visited = false;
        //             }
        //             if(i> 27 && i < 32 && j > 4 && j < 9){
        //                 this.grid[i][j].center = true;
        //                 this.grid2[i][j].center = true;
        //             }
        //         }
        //     }
            
        // }   


        this.fell = false;

    }

    generateRandomShade(baseColor) {
        // Nasumično generiši faktor između 0 i 1
        var factor = Math.random() * 1 ;
    
        if(factor < .4){
            factor = .65
        }

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

        // //ORANGE?
        // if(baseColor.r == 255){
        //     console.log('red')
        //     let rnd = Math.floor(Math.random() *3) ;
        //     console.log(rnd)
        //     if(rnd == 1){
        //         console.log('s')
        //         r = 200;
        //         g = 50
        //         b = 50
        //     }
        //     else if(rnd == 0){
        //         console.log('nula')
        //         r = 220
        //         g = 80
        //         b = 80
        //     }
        //     else if(rnd == 2){
        //         r = 170
        //         g = 40
        //         b = 40
        //     }
        // }
        if(baseColor.r == 255) {
            console.log('red');
            let rnd = Math.floor(Math.random() * 3);
            console.log(rnd);
            if(rnd == 1) {
                console.log('s');
                r = 160;
                g = 40;
                b = 40;
            } else if(rnd == 0) {
                console.log('nula');
                r = 180;
                g = 65;
                b = 65;
            } else if(rnd == 2) {
                r = 140;
                g = 30;
                b = 30;
            }
        }
        // //GREEN
        // if(baseColor.g == 255){
        //     console.log('green')
        //     let rnd = Math.floor(Math.random() *3) ;
        //     console.log(rnd)
        //     if(rnd == 1){
        //         console.log('s')
        //         r = 85;
        //         g = 170
        //         b = 85
        //     }
        //     else if(rnd == 0){
        //         console.log('nula')
        //         r = 102
        //         g = 187
        //         b = 102
        //     }
        //     else if(rnd == 2){
        //         r = 68
        //         g = 136
        //         b = 68
        //     }
        // }
        if(baseColor.g == 255) {
            console.log('green');
            let rnd = Math.floor(Math.random() * 3);
            console.log(rnd);
            if(rnd == 1) {
                console.log('s');
                r = 68;
                g = 136;
                b = 68;
            } else if(rnd == 0) {
                console.log('nula');
                r = 82;
                g = 150;
                b = 82;
            } else if(rnd == 2) {
                r = 54;
                g = 108;
                b = 54;
            }
        }
        //BLUE
        if(baseColor.b == 255) {
            console.log('blue');
            let rnd = Math.floor(Math.random() * 3);
            console.log(rnd);
            if(rnd == 1) {
                console.log('s');
                r = 90;
                g = 130;
                b = 195;
            } else if(rnd == 0) {
                console.log('nula');
                r = 85;
                g = 120;
                b = 185;
            } else if(rnd == 2) {
                r = 80;
                g = 110;
                b = 170;
            }
        }
        //ZUTA

        // if(baseColor.r == 254){
        //     console.log('blue')
        //     let rnd = Math.floor(Math.random() *3) ;
        //     console.log(rnd)
        //     if(rnd == 1){
        //         console.log('s')
        //         r = 245;
        //         g = 215
        //         b = 0
        //     }
        //     else if(rnd == 0){
        //         console.log('nula')
        //         r = 215;
        //         g = 235
        //         b = 153
        //     }
        //     else if(rnd == 2){
        //         r = 225;
        //         g = 179
        //         b = 71
        //     }
        // }
        if(baseColor.r == 254) {
            console.log('yellow');
            let rnd = Math.floor(Math.random() * 3);
            console.log(rnd);
            if(rnd == 1) {
                console.log('s');
                r = 240;
                g = 200;
                b = 50;
            } else if(rnd == 0) {
                console.log('nula');
                r = 230;
                g = 180;
                b = 50;
            } else if(rnd == 2) {
                r = 220;
                g = 170;
                b = 50;
            }
        }

        let clrs = this.rgbToHsl(r, g, b)
        // clrs[0] = 1
        clrs[1] = .9;
        // clrs[2] = .45
        let slrs = this.hslToRgb(clrs[0], clrs[1], clrs[2])
        r = slrs[0]
        g = slrs[1]
        b = slrs[2]


        return `rgb(${r}, ${g}, ${b})`;
    }

     rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0; // Grayscale
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h * 360, s, l];
    }
    
     hslToRgb(h, s, l) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // Grayscale
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            h /= 360;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    swapGrids(){
        this.grid = this.grid2.map(row => row.slice());
    }
    createCanvasNext(){
        const canvas = document.createElement('canvas')
        canvas.classList.add('canva-next')
        canvas.width = 60
        canvas.height = 60
        this.nextGrid = []
        for(let i = 0; i < 12; i++){
            this.nextGrid[i] = []
            for(let j = 0; j< 12; j++){
                this.nextGrid[i][j] = {
                    x: i,
                    y: j,
                    color: 'initial',
                    blockColor: 'red',
                    block: true,
                    initial: true,
                    visited: false,
                    center: false
                }
            }
        }

        let form = document.body.querySelector('.form')
        // form.style.backgroundColor='red'
        form.appendChild(canvas)
        // console.log(form)

        this.ctx2 = canvas.getContext('2d');
        this.ctx2.fillStyle = 'red'
        // this.updateNextRect()
    }

    updateNextRect(){
        for(let i = 0; i < 12; i++){
            for(let j = 0; j< 12; j++){
                // if(this.nextGrid[i][j].color == 'black'){
                    // this.ctx2.fillStyle = 'white'
                    // console.log('grej')
                // }else{
                    this.ctx2.fillStyle = this.nextGrid[i][j].color
                // }
                this.ctx2.fillRect(i*5,j*5,5,5)
            }
        }
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
            if(this.play && this.active){
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
            else if(this.active){
                this.destroyAnimation();
            }

            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}
