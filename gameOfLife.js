'use strict'
const LIFE = '&#128151';
var gRowLength = +prompt('Insert row size?')
var gColLength = +prompt('Insert col size?')
var gBord = []
for (var i = 0; i < gColLength; i++) {
    gBord[i] = []
    for (var j = 0; j < gRowLength; j++) {
        gBord[i][j] = ''
    }
}

var boardGame = randomLife(gBord, gRowLength, gColLength)

function init(){
    printMat(boardGame, ".board")
}

function randomLife(board, rowLength, colLength) {
    for (var i = 0; i < colLength; i++) {
        for (var j = 0; j < rowLength; j++) {
            var isLife = Math.random()
            if (isLife > 0.5)
                board[i][j] = LIFE
        }
    }
    return board
}

function checkNeighbors(board, colIdx, rowIdx, MaxRowLength, MaxColLength) {
    var count = 0
    for (var i = colIdx - 1; i <= colIdx + 1; i++) {
        if (i < 0 || i > MaxColLength - 1) continue // not outside board
        for (var j = rowIdx - 1; j <= rowIdx + 1; j++) {
            if (j < 0 || j > MaxRowLength - 1) continue // not outside board           
            if (i === colIdx && j === rowIdx) continue // not on currCel
            if (board[i][j] === LIFE) count++
        }
    }
    return count
}

function gameOfLife(board, rowLength, colLength) {
    var newBoard = []
    for (var i = 0; i < colLength; i++) {
        newBoard[i] = []
        for (var j = 0; j < rowLength; j++) {
            newBoard[i][j] = board[i][j]
        }
    }
    for (var i = 0; i < colLength; i++) {
        for (var j = 0; j < rowLength; j++) {
            var countNeighbors = checkNeighbors(board, i, j, rowLength, colLength)
            if (countNeighbors >= 3 && countNeighbors <= 5) {
                newBoard[i][j] = LIFE                
            }
            else {
                newBoard[i][j] = ''
            }
        }        
    }
    printMat(newBoard, ".board")
    for (var i = 0; i < colLength; i++) {  //Check life
        for (var j = 0; j < rowLength; j++) {
            if (newBoard[i][j] === LIFE)
                gameOfLife(newBoard, rowLength, colLength)
        }
    }
    
    return true
}

function start() {
    console.log('start')
    var intervalId = setInterval(function () {
        var isLifeEnd = gameOfLife(boardGame, gRowLength, gColLength)        
        if (isLifeEnd)
            clearInterval(intervalId)
    }, 2000)
}