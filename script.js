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
        }
    }
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