const $gameWindow = document.getElementById('gameWindow')
const $circleScore = document.getElementById('circlePoints')
const $xScore = document.getElementById('xPoints')
const $canBlur = document.getElementById('canBlur')
const $empty = document.getElementById('empty')

$empty.style.display = 'none'

const borderStroke = 2
const bs = borderStroke
const gameLayout = [
    [00,bs,bs,00],[00,bs,bs,bs],[00,00,bs,bs],
    [bs,bs,bs,00],[bs,bs,bs,bs],[bs,00,bs,bs],
    [bs,bs,00,00],[bs,bs,00,bs],[bs,00,00,bs]
]
const winForms = [
    [1,4,7],[2,5,8],[3,6,9],
    [1,2,3],[4,5,6],[7,8,9],
    [1,5,9],[3,5,7]
]
const xFigure = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" id="x">
    <line x1="15" y1="15" x2="49" y2="49"/>
    <line x1="15" y1="49" x2="49" y2="15"/>
</svg>
`
const cFigure = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" id="c">
    <path d="M16,32a16,16 0 1,0 32,0a16,16 0 1,0 -32,0"/>
</svg>
`
const lBlocks = []

let currentTurn = 'x'
$xScore.style.backgroundColor = '#AFA'
let circlePoints = 0
let xPoints = 0

updatePlacar()

for(var i=0; i < 9; i++){
    const gameBlock = document.createElement('div')
    gameBlock.setAttribute('id',`block${i}`)
    gameBlock.setAttribute('name',`${i}`)
    gameBlock.classList.add('gameBlock')
    gameBlock.style.borderTop = `${gameLayout[i][0]}px solid black`
    gameBlock.style.borderRight = `${gameLayout[i][1]}px solid black`
    gameBlock.style.borderBottom = `${gameLayout[i][2]}px solid black`
    gameBlock.style.borderLeft = `${gameLayout[i][3]}px solid black`
    gameBlock.addEventListener('mousedown', () => {
        click(parseInt(gameBlock.getAttribute('name')))
    })
    lBlocks.push({
        checked: false,
        mark: ''
    })
    $gameWindow.appendChild(gameBlock)
}

function click(blockID){
    if(lBlocks[blockID].checked == false){
        lBlocks[blockID].mark = currentTurn
        lBlocks[blockID].checked = true

        if(currentTurn == 'x'){
            currentTurn = 'c'
            $xScore.style.backgroundColor = '#EEE'
            $circleScore.style.backgroundColor = '#AFA'
        }else if(currentTurn == 'c'){
            currentTurn = 'x'
            $xScore.style.backgroundColor = '#AFA'
            $circleScore.style.backgroundColor = '#EEE'
        }

        render(blockID)
        var winner = checkWin(['x','c'])
        if(winner != undefined){
            if(winner == 'c'){
                circlePoints++
            }else if(winner == 'x'){
                xPoints++
            }
            updatePlacar()
            restartGame(winner)
            return 1
        }
    }
    return 0
}
function render(blockID){
        const el = document.getElementById(`block${blockID}`)
        var currentFigure

        if(lBlocks[blockID].mark == 'x'){
            currentFigure = xFigure
        }else if(lBlocks[blockID].mark == 'c'){
            currentFigure = cFigure
        }else{
            currentFigure = ''
        }

        el.innerHTML = currentFigure
}
function checkWin(player){
    var winner
    var markCounter = 0
    player.forEach( (play) => {
        var counter = 0
        var win = false
        winForms.forEach( (form) => {
            if(lBlocks[form[0] - 1].mark == play){ counter++}
            if(lBlocks[form[1] - 1].mark == play){ counter++}
            if(lBlocks[form[2] - 1].mark == play){ counter++}
            if(counter == 3){
                win = true
            }else{
                counter = 0
            }
        })
        if(win == true){
            winner = play
        }
    })
    lBlocks.forEach( (block) => {
        if(block.mark != ''){
            markCounter++
        }
    })
    if(markCounter == 9){
        restartGame('x')
        $canBlur.classList.add('canBlur')
        $empty.style.display = 'block'
        $empty.classList.add('empty')
        setTimeout( () => {
            $canBlur.classList.remove('canBlur')
            $empty.classList.remove('empty')
            $empty.classList.add('showOut')
            setTimeout( () => {
                $empty.classList.remove('showOut')
                $empty.style.display = 'none'
            },1000)
        },2000)
    }
    return winner
}
function updatePlacar(){
    $circleScore.innerHTML = ''
    $xScore.innerHTML = ''
    $circleScore.innerHTML = cFigure + `<h4>${circlePoints}</h4>`
    $xScore.innerHTML = xFigure + `<h4>${xPoints}</h4>`
}
function restartGame(winner){
    currentTurn == winner
    if(currentTurn == 'x'){
        $xScore.style.backgroundColor = '#AFA'
        $circleScore.style.backgroundColor = '#EEE'
    }else if(currentTurn == 'c'){
        $xScore.style.backgroundColor = '#EEE'
        $circleScore.style.backgroundColor = '#AFA'
    }
    lBlocks.forEach( (block) => {
        block.checked = false
        block.mark = ''
    })
    lBlocks.forEach( (block,index) => {
        render(index)
    })
}

//INTELIGÊNCIA ARTIFICIAL

class IA{
    //1 = null
    //2 = me
    //3 = ct
    constructor(player,ranger){
        this.play = player
        this.range = ranger
    }
    b = []
    f = new Array(9)
    v = []

    n1 = 0; n2 = 0; n3 = 0;
    n4 = 0; n5 = 0; n6 = 0;
    n7 = 0; n8 = 0; n9 = 0;

    weights = []
    setWeights() {
        this.weights = []
        for(var i=1; i <= 162; i++){
            this.weights.push(getRandomIntInclusive(this.range * -1,this.range))
        }
    }
    getPositions(){
        for(var i = 0; i < 9; i++){
            if(lBlocks[i].mark != ''){
                this.b[i] = lBlocks[i].mark == this.play ? 2 : 3
            }else{
                this.b[i] = 1
            }
        }
    }
    think(){
        this.v = []
        this.f = [0,0,0,0,0,0,0,0,0]
        this.b = []
        for(var i = 1; i <= 9; i++){
            this.n1 += this.b[i-1] * this.weights[i*9 -9]
            this.n2 += this.b[i-1] * this.weights[i*9 -8]
            this.n3 += this.b[i-1] * this.weights[i*9 -7]
            this.n4 += this.b[i-1] * this.weights[i*9 -6]
            this.n5 += this.b[i-1] * this.weights[i*9 -5]
            this.n6 += this.b[i-1] * this.weights[i*9 -4]
            this.n7 += this.b[i-1] * this.weights[i*9 -3]
            this.n8 += this.b[i-1] * this.weights[i*9 -2]
            this.n9 += this.b[i-1] * this.weights[i*9 -1]
        }
        this.n1 = this.n1 < 0 ? 0 : this.n1
        this.n2 = this.n2 < 0 ? 0 : this.n2
        this.n3 = this.n3 < 0 ? 0 : this.n3
        this.n4 = this.n4 < 0 ? 0 : this.n4
        this.n5 = this.n5 < 0 ? 0 : this.n5
        this.n6 = this.n6 < 0 ? 0 : this.n6
        this.n7 = this.n7 < 0 ? 0 : this.n7
        this.n8 = this.n8 < 0 ? 0 : this.n8
        this.n9 = this.n9 < 0 ? 0 : this.n9
        this.f.fill(0)
        for(var i = 1; i <= 9; i++){
            this.f[i - 1] +=  this.n1 * this.weights[i*9 -9 + 81]
            this.f[i - 1] +=  this.n2 * this.weights[i*9 -8 + 81]
            this.f[i - 1] +=  this.n3 * this.weights[i*9 -7 + 81]
            this.f[i - 1] +=  this.n4 * this.weights[i*9 -6 + 81]
            this.f[i - 1] +=  this.n5 * this.weights[i*9 -5 + 81]
            this.f[i - 1] +=  this.n6 * this.weights[i*9 -4 + 81]
            this.f[i - 1] +=  this.n7 * this.weights[i*9 -3 + 81]
            this.f[i - 1] +=  this.n8 * this.weights[i*9 -2 + 81]
            this.f[i - 1] +=  this.n9 * this.weights[i*9 -1 + 81]
        }
        for(var i=0; i < 9; i++){
            this.f[i] = this.f[i] < 0 ? 0 : this.f[i]
            if(lBlocks[i].mark != ''){
                this.f[i] = 0
            }
            if(this.f[i] != 0){
                this.v.push(i)
            }
        } 
        return this.v[getRandomIntInclusive(0,this.v.length - 1)]
    }
}

var bestPlayerPoints = 0
var bestPlayerWeights = []
const bestPlayerHistory = []

function startTrain(times,range){
    var step = 0.2/times
    const player1 = new IA('x',range)
    const player2 = new IA('c',range)

    player1.setWeights()
    player2.setWeights()

    for(var n = 0; n < times; n++){
        console.log(`Teste ${n} de ${times}, melhor jogador: ${bestPlayerPoints}`)
        for(var i=0; i<200; i++){
    
            var inGame = true
    
            while(inGame == true){
                player1.getPositions()
                if(click(player1.think()) == 1){
                    inGame = false
                }
                player2.getPositions()
                if(click(player2.think()) == 1){
                    inGame = false
                }
            }     
        }
    
        if(circlePoints > xPoints){
            player2.weights.forEach( (weight,index) => {
                weight = getRandomIntInclusive(bestPlayerWeights[index] * 0.8, bestPlayerWeights[index] * 1.2)
            }) 
            player1.setWeights()
        }else{
            player1.weights.forEach( (weight,index) => {
                weight = getRandomIntInclusive(bestPlayerWeights[index] * 0.8, bestPlayerWeights[index] * 1.2)
            }) 
            player2.setWeights()
        }
        if(circlePoints > bestPlayerPoints){
            bestPlayerPoints = circlePoints
            bestPlayerWeights = player2.weights
        }else if(xPoints > bestPlayerPoints){
            bestPlayerPoints = xPoints
            bestPlayerWeights = player1.weights 
        }
    
        circlePoints = 0
        xPoints = 0
    }
    return 0
}


function generateAPerfectIA(times,intraTimes,range){
    for(var o = 0; o < times; o++){
        console.clear()
        console.log(`IA${o}`)
        startTrain(intraTimes,range)

        bestPlayerHistory.push({
            GEN: o,
            Points: bestPlayerPoints,
            Weights: bestPlayerWeights
        })

        bestPlayerPoints = 0
        bestPlayerWeights = []

        console.log(bestPlayerHistory)
    }
    document.write(JSON.stringify(bestPlayerHistory))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}