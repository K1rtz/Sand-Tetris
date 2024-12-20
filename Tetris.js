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
        this.music = new Audio('./audio/music.mp3')
        this.music.volume = .2;   
        this.music.loop = true;
        
        this.ctx
        this.frameDelay = 30;
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
        this.active = false;

        this.isMoving=false;
        this.isRotating=false;
    }

    //Listening for keys for moving block left/right or rotating block
    registerKeyListeners(){
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft' || event.key === 'a'){
                this.moveLeft = true;
            } else if(event.key === 'ArrowRight' || event.key === 'd'){
                this.moveRight = true;
            }
        })
    
        window.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowLeft'|| event.key === 'a') {
                this.moveLeft = false;
                // this.stopMoving();
            } else if (event.key === 'ArrowRight' || event.key === 'd') {
                this.moveRight = false;
                // this.stopMoving();
            }
        }); 

        window.addEventListener('keydown', (event)=>{
            if((event.key === 'ArrowUp' || event.key === 'w') && !event.repeat){
                this.rotate = true;
                // this.rotation()
            }
        })
    }

    //START
    start(){

        //MAIN
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        this.host.appendChild(gameContainer);


        //HEADER
        const gameTitle = document.createElement('div')
        gameTitle.classList.add('game-title')
        gameContainer.appendChild(gameTitle)

        const titleText = document.createElement('span')
        titleText.classList.add('title-text')
        titleText.innerHTML = "SAND TETRIS"
        gameTitle.appendChild(titleText)

        //GAME BODY
        const gameBody  = document.createElement('div')
        gameBody.classList.add('game-body')
        gameContainer.appendChild(gameBody)


        //LEFT PART - GAME DISPLAY
        const gameDisplay = document.createElement('div')
        gameDisplay.classList.add('game-display')
        gameBody.appendChild(gameDisplay)

        //POP-UPS on game display
        //STARTING SCREEN
        const startScreen = document.createElement('div')
        startScreen.classList.add('start-screen')
        gameDisplay.appendChild(startScreen)

        //WELCOME
        const ssDivWelcome = document.createElement('div')
        ssDivWelcome.classList.add('ss-div-welcome')
        startScreen.appendChild(ssDivWelcome);

        const ssTextWelcome = document.createElement('span')
        ssTextWelcome.innerHTML = "WELCOME"
        ssTextWelcome.classList.add('ss-text-welcome')
        ssDivWelcome.appendChild(ssTextWelcome)

        //START BUTTON 
        const ssButtonStart = document.createElement('button')
        ssButtonStart.classList.add('ss-button-start')
        startScreen.appendChild(ssButtonStart);

        const textStart = document.createElement('span')
        textStart.innerHTML = "START"
        textStart.classList.add('textStart')
        ssButtonStart.appendChild(textStart)

        ssButtonStart.onclick = (ev) =>{
            this.active = true;
            startScreen.style.display='none'
            divLine.style.display='flex'
            this.music.play();
            this.dodajFiguru()
            this.swapGrids()
        }

        //ABOUT BUTTON
        const ssDivAbout = document.createElement('div')
        ssDivAbout.classList.add('ss-div-about')
        startScreen.appendChild(ssDivAbout);

        const ssTextAbout = document.createElement('span')
        ssTextAbout.innerHTML = "ABOUT"
        ssTextAbout.classList.add('ss-text-about')
        ssDivAbout.appendChild(ssTextAbout)



        //PAUSE
        const divPause = document.createElement('div')
        divPause.classList.add('div-pause')
        gameDisplay.appendChild(divPause)

        const textPause = document.createElement('span')
        textPause.classList.add('text-pause')
        textPause.innerHTML = "PAUSE"
        divPause.appendChild(textPause)


        //END SCREEN
        const endScreen = document.createElement('div')
        endScreen.classList.add('end-screen')
        gameDisplay.appendChild(endScreen)


        const esDivGameOver = document.createElement('div')
        esDivGameOver.classList.add('es-div-game-over')
        endScreen.appendChild(esDivGameOver);

        const textGameOver = document.createElement('span')
        textGameOver.innerHTML = "GAME OVER"
        textGameOver.classList.add('es-text-game-over')
        esDivGameOver.appendChild(textGameOver)


        //LOSE-LINE
        const divLine = document.createElement('div')
        divLine.classList.add('lose-line')
        gameDisplay.appendChild(divLine)

        //REPLAY BUTTON
        const esReplay = document.createElement('button')
        esReplay.classList.add('es-replay')
        endScreen.appendChild(esReplay);

        const esTextReplay = document.createElement('span')
        esTextReplay.innerHTML = "REPLAY"
        esTextReplay.classList.add('es-text-replay')
        esReplay.appendChild(esTextReplay)

        esReplay.onclick = (ev) =>{
            // popStartScreen.style.display='flex'
            endScreen.style.display='none'
            divLine.style.display = 'flex'
            this.resetGame()
            
            this.active = true;
            this.dodajFiguru()
            this.swapGrids()
        }

        //OPTIONS 

        const soundDiv = document.createElement('div')
        soundDiv.classList.add('settings-div')
        gameContainer.appendChild(soundDiv)

        const sound = document.createElement('div')
        sound.classList.add('settings-volume')
        soundDiv.appendChild(sound)
        sound.on = true;

        sound.onclick = (ev) =>{
            if(this.active){

                if(sound.on == true){
                    sound.on = false;
                    sound.style.backgroundImage = 'url(./images/volume-off.png)'
                    this.music.volume = 0;
                }
                else{
                    sound.on = true;
                    sound.style.backgroundImage = 'url(./images/volume-on.png)'
                    this.music.volume = 0.2;   
                }
            }

        }
        
        const pause = document.createElement('div')
        pause.classList.add('settings-pause')
        soundDiv.appendChild(pause)
        pause.on = '1'

        pause.onclick = (ev) =>{
            if(this.active){
                if(pause.on == '1'){
                    this.music.pause()
                    pause.on = '2';
                    pause.style.backgroundImage = 'url(./images/play.png)'
                    textPause.style.display = 'flex'
                    // divLine.style.display = 'none'
                    this.active = false;
                }
            }
            else if(pause.on == 2){
                this.music.play()
                pause.on = '1';
                pause.style.backgroundImage = 'url(./images/pause.png)'
                textPause.style.display = 'none'
                this.active = true;
            }

        }


        this.createForm(gameBody)
        this.updateScore();
        this.updateBlocks();
        this.updateLevel();
        this.createCanvasNext()
        this.createCanvas(gameDisplay)
        this.draw()
        this.animate()

    }  

    //CREATES FORM
    createForm(host){

        let formWrapper = document.createElement('div')
        formWrapper.classList.add('form-wrapper')
        host.appendChild(formWrapper)

        //Next
        let fNextText = document.createElement('label')
        fNextText.innerHTML = "NEXT"
        formWrapper.appendChild(fNextText)
        
        const fNextDisplay = document.createElement('div')
        fNextDisplay.classList.add('f-next-display', 'for')
        formWrapper.appendChild(fNextDisplay)

        //Score
        let fScoreText = document.createElement('label')
        fScoreText.innerHTML = "SCORE"
        formWrapper.appendChild(fScoreText)

        const fScoreDisplay = document.createElement('div')
        fScoreDisplay.classList.add('f-score-display', 'for')
        formWrapper.appendChild(fScoreDisplay)

        let fScoreInnerText = document.createElement('span')
        fScoreInnerText.classList.add('inner-text', 'scoreText')
        fScoreDisplay.appendChild(fScoreInnerText)


        //Level
        let fLevelText = document.createElement('label')
        fLevelText.innerHTML = "LEVEL"
        formWrapper.appendChild(fLevelText)

        const fLevelDisplay = document.createElement('div')
        fLevelDisplay.classList.add('form3', 'for')
        formWrapper.appendChild(fLevelDisplay)

        let fLevelInnerText = document.createElement('span')
        fLevelInnerText.classList.add('inner-text', 'levelText')
        fLevelDisplay.appendChild(fLevelInnerText)


        //Blocks
        let fBlocksText = document.createElement('label')
        fBlocksText.innerHTML = "BLOCKS"
        formWrapper.appendChild(fBlocksText)

        const fBlocksDisplay = document.createElement('div')
        fBlocksDisplay.classList.add('form4', 'for')
        formWrapper.appendChild(fBlocksDisplay)

        let fBlocksInnerText = document.createElement('span')
        fBlocksInnerText.classList.add('inner-text', 'blocksText')
        fBlocksDisplay.appendChild(fBlocksInnerText)
    }

    //UPDATE FORM
    updateScore(){
        let score = document.body.querySelector('.scoreText');
        score.innerHTML = this.score;
    }
    updateLevel(){
        let levels = document.body.querySelector('.levelText');
        if(this.score > 3200 * this.level){
            if(this.frameDelay>5){
                this.frameDelay-=4;
            }
            this.level++
        }

        levels.innerHTML = this.level;
    }
    updateBlocks(){
        let blocks = document.body.querySelector('.blocksText');
        blocks.innerHTML = this.blocks;
    }

    //UPDATING CURRENT GRID AND CALCULATING NEXT BASED ON CURRENT
    draw(){
        //IF BLOCK TOUCHES THE LINE GAME IS OVER
        for(let i = 0; i < 30; i++){
            if(this.grid[i][16].block && !this.grid[i][16].initial){
                let eS = document.querySelector('.end-screen')                
                eS.style.display = 'flex'
                this.music.pause()
                this.active = false;
                //RESET LINE
                let divLine = document.querySelector('.lose-line')
                divLine.style.display = 'none'
                //RESET NEXT-GRID
                this.ctx2.fillStyle = 'black'
                this.ctx2.fillRect(0, 0, 120, 120)
                break;
            }
        }
        //FILLING CURRENT GRID
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid[i][j].block == false) //&& j!=16)
                    this.ctx.fillStyle = 'black'
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
    
        //CALCULATING GRID 2
        for(let j = this.rows-1; j >= 0; j--){
            for(let i = this.cols-1; i >= 0; i--){  
                let state = this.grid[i][j]
                if(state.block == true){
                    let below = this.grid[i][j+1]
                    if(below != undefined && below.block == false){
                        this.grid[i][j].block = false;
                        this.grid[i][j+1].block = true;
                        this.grid2[i][j+1].block = true;
                        this.grid2[i][j+1].initial = this.grid[i][j].initial
                        this.grid2[i][j+1].color = this.grid[i][j].color
                        this.grid2[i][j+1].blockColor = this.grid[i][j].blockColor
                        this.grid2[i][j+1].center = this.grid[i][j].center
                        this.grid[i][j+1].center = false;

                    }
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
                                this.grid[i][j].block  = false                                
                                this.grid[i+1][j+1].block  = true
                                this.grid[i+1][j+1].initial = true;
                                this.grid2[i+1][j+1].block  = true
                                this.grid2[i+1][j+1].initial  = this.grid[i][j].initial
                                this.grid2[i+1][j+1].color  = this.grid[i][j].color
                                this.grid2[i+1][j+1].blockColor  = this.grid[i][j].blockColor
                        }
                        //PROVERA DOLE LEVO
                        else if(dLeft != undefined && dLeft.block === false && z>0.4){                                
                                this.grid[i][j].block  = false                                
                                this.grid[i-1][j+1].block  = true
                                this.grid[i-1][j+1].initial  = true
                                this.grid2[i-1][j+1].block  = true
                                this.grid2[i-1][j+1].initial  = this.grid[i][j].initial
                                this.grid2[i-1][j+1].color  = this.grid[i][j].color
                                this.grid2[i-1][j+1].blockColor  = this.grid[i][j].blockColor
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
                this.swapGrids()
                this.checkHits()
            })
        }else{
            this.swapGrids()
            this.checkHits()
        }
    }

    checkForMoves(){
        // if(!this.rotate){
        
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
    }
    
    checkHits(){
        let lastColor = null
        for(let j = this.rows-1; j >= 0; j--){                    //od 99 do 0
            let currentColor = this.grid2[0][j].blockColor;       //boja poslednjeg elementa u prvoj koloni
            if(this.grid2[0][j].block == true){                   //ako postoji kockica koja je pala na to polje
                if(currentColor != lastColor && this.pronadjen == false){   //ovde greska jer nastavlja dalje                 //ako je njena boja razlicita od prethodne
                    this.checkDepleto(j)
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
            this.play=false;
            this.pronadjen = true;
        }else{
            this.destroyArray.forEach(x=>{
                this.grid2[x.x][x.y].visited = false;
            })
            this.destroyArray.length = 0;

        }

            
        
            
    }

    destroyAnimation(){

        // console.log(this.chargeCount);
        if(this.chargeCount < 10){
            if(this.chargeCount%2==0){
                this.destroyArray.forEach(x=>{
                //this.grid2[x.x][x.y].visited = false;
                this.grid2[x.x][x.y].color = 'white';
                })
            }else{
                this.destroyArray.forEach(x=>{
                    this.grid2[x.x][x.y].color = 'green';
                })
            }
        }else if(this.chargeCount < 15){
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
                });
            }        
        }
        this.chargeCount++;
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.grid2[i][j].block == false)
                    this.ctx.fillStyle = 'black'
                else
                    this.ctx.fillStyle = this.grid2[i][j].color//this.grid[i][j].blockColor//color
            
                this.ctx.fillRect(i*this.w,j*this.w,this.w, this.w);
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
        
        let matrix = Array.from({ length: 12 }, () => new Array(12).fill(0));

        //samo prebacimo sve okolko figure u novu matricu
        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){
                matrix[i-obj.x+4][j-obj.y+4] = {...this.grid2[i][j]};
            }
        }

        //zarotiramo te vrednosti
        const rotatedMatrix = Array.from({ length: 12 }, () => new Array(12).fill(0));
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                rotatedMatrix[j][11 - i] = {...matrix[i][j]};
            }
        }
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
                }
            }
        }


        for(let i = obj.x-4; i< obj.x+8;i++){
            for(let j = obj.y-4; j< obj.y+8;j++){

                const rotatedValue = rotatedMatrix[i - obj.x + 4][j - obj.y + 4];

                if (rotatedValue.initial) {
                    this.grid2[i][j] = {...rotatedValue}; 
                }
            }
        }

        this.rotate = false;
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
        for(let i = 0; i < 12; i++){
            for(let j = 0; j< 12; j++){
                if((t==0 && i > 1 && i < 10 && j > 1 && j < 10)
                || (t==1 && i > -1 && i < 12 && j > 2 && j < 8)
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

        if(this.nextGrid[0][0].color == 'initial'){
            this.fillNextFigure()
        }
            
        for(let i = 24; i < 36; i++){
            for(let j = 0; j < 12; j++){
                this.grid2[i][j] = {...this.nextGrid[i-24][j]}
            }
        }
            
        this.fillNextFigure()
        this.updateNextRect()

        this.fell = false;
    }

    generateRandomShade(baseColor) {
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

        if(baseColor.r == 255) {
            let rnd = Math.floor(Math.random() * 3);
            if(rnd == 1) {
                r = 180;
                g = 20;
                b = 20;
            } else if(rnd == 0) {
                r = 221;
                g = 25;
                b = 25;
            } else if(rnd == 2) {
                r = 153;
                g = 17;
                b = 17;
            }
        }

        if(baseColor.g == 255) {
            let rnd = Math.floor(Math.random() * 3);
            if(rnd == 1) {
                r = 15
                g = 189
                b = 15
            } else if(rnd == 0) {
                r = 17;
                g = 215;
                b = 17;
            } else if(rnd == 2) {
                r = 12;
                g = 150;
                b = 12;
            }
        }
        if(baseColor.b == 255) {
            let rnd = Math.floor(Math.random() * 3);
            if(rnd == 1) {
                r = 47;
                g = 120;
                b = 238;
            } else if(rnd == 0) {
                r = 33;
                g = 104;
                b = 237;
            } else if(rnd == 2) {
                r = 19;
                g = 90;
                b = 231;
            }
        }

        //
        if(baseColor.r == 254) {
            let rnd = Math.floor(Math.random() * 3);
            if(rnd == 1) {
                r = 240;
                g = 200;
                b = 50;
            } else if(rnd == 0) {
                r = 230;
                g = 180;
                b = 50;
            } else if(rnd == 2) {
                r = 220;
                g = 170;
                b = 50;
            }
        }
        // if(baseColor.r == 254) {
        //     let rnd = Math.floor(Math.random() * 3);
        //     if(rnd == 1) {
        //         r = 238;
        //         g = 199;
        //         b = 51;
        //     } else if(rnd == 0) {
        //         r = 238;
        //         g = 183;
        //         b = 42;
        //     } else if(rnd == 2) {
        //         r = 237;
        //         g = 177;
        //         b = 33;
        //     }
        // }



        return `rgb(${r}, ${g}, ${b})`;
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

        let form = document.body.querySelector('.f-next-display')
        form.appendChild(canvas)

        this.ctx2 = canvas.getContext('2d');
        this.ctx2.fillStyle = 'red'
    }

    updateNextRect(){
        for(let i = 0; i < 12; i++){
            for(let j = 0; j< 12; j++){
                this.ctx2.fillStyle = this.nextGrid[i][j].color
                this.ctx2.fillRect(i*5,j*5,5,5)
            }
        }
    }

    resetGame(){

        this.fell = false;
        this.moveRight = false;
        this.moveLeft = false;
        this.play = true;
        this.chargeCount = 0;
        this.pronadjen = false
        this.rotate = false
        this.score = 0.0;
        this.level = 1;
        this.blocks = 0;
        this.active = false;
        this.isMoving=false;
        this.isRotating=false;


        this.updateLevel()
        this.updateBlocks()
        this.updateScore()


        //RESET NEXT-GRID
        for(let i = 0; i < 12; i++){
            for(let j = 0; j < 12; j++){
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

        this.nextGrid[0][0].color == 'initial'



        //RESETING BOTH GRIDS
        for(let i = 0; i< this.cols; i++){
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

            }
            else if(this.active){
                this.destroyAnimation();
            }
            this.lastFrameTime = currentTime
        }
        requestAnimationFrame(()=>this.animate())
    }
}
