const $gameWindow = document.getElementById('gameWindow')

const borderStroke = 2
const bs = borderStroke
const gameLayout = [
    [00,bs,bs,00],[00,bs,bs,bs],[00,00,bs,bs],
    [bs,bs,bs,00],[bs,bs,bs,bs],[bs,00,bs,bs],
    [bs,bs,00,00],[bs,bs,00,bs],[bs,00,00,bs]
]
const winForms = [
    [1,4,7],[2,5,8],[3,6,9],
    [1,2,3],[4,5,6],[7,8,9]
]
const xFigure = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="blue" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
`
const cFigure = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="red" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
</svg>
`
const lBlocks = []

let currentTurn = 'x'


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
        }else if(currentTurn == 'c'){
            currentTurn = 'x'
        }

        render()
        // checkWin()
    }
}
function render(){
    lBlocks.forEach( (block,index) => {
        const el = document.getElementById(`block${index}`)
        var currentFigure

        if(block.mark == 'x'){
            currentFigure = xFigure
        }else if(block.mark == 'c'){
            currentFigure = cFigure
        }else{
            currentFigure = ''
        }

        el.innerHTML = currentFigure
    })
}