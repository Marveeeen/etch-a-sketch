const canvas = document.getElementById('canvas');
const clearGridBtn = document.getElementById("clearGrid");
const choseGridSize = document.getElementById("choseGridSize");
const randomColorsBtn = document.getElementById('randomColors');
const shadeBtn = document.getElementById('shade');
let cellArr = document.getElementsByClassName('cell');

clearGridBtn.addEventListener('click', (e) => {
    clearGrid()
});

choseGridSize.addEventListener('click', (e) => {
    let size = prompt("Select a grid size. Must be no greater than 100", "16")
    if (size > 100) {
        return null;
    }

    createGrid(size,size);
    clearGrid();
})

randomColorsBtn.addEventListener('click', (e) => {
    clearGrid();
    shade = false;
    randomColors ? randomColors = false : randomColors = true;
})

shadeBtn.addEventListener('click', (e) => {
    clearGrid();
    randomColors = false;
    shade ? shade = false : shade = true;
})

// Make Grid with Dynamic size

let randomColors = false;
let shade = false;

function createGrid(rows, cols ) {
    // Overwrite the CSS style
    canvas.style['grid-template-columns'] = `repeat(${cols}, 1fr)`
    canvas.style['grid-template-rows'] = `repeat(${rows}, 1fr)`

    //for each cell 

    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement('div');
        // add event listener to the cel
        cell.addEventListener("mouseenter", colorCell);
        cell.addEventListener("touchstart", colorCell);
        canvas.appendChild(cell).className ='cell';
    }

}

function colorCell(e) {

    if(randomColors) {
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()* 256)},
        ${Math.floor(Math.random()* 256)},
        ${Math.floor(Math.random()* 256)})`
    }else if (shade) {
        choseShade(e);
    }else {
        e.target.style['background-color'] = 'black';
    }
}

createGrid(16,16)

function clearGrid() {
    cellArr = Array.from(cellArr);

    cellArr.forEach((cells) => {
        cells.style.backgroundColor = "white";
        cells.style.opacity = "1.1";
    })

}

function choseShade(e) {
    // Set Color to black
    e.target.style.backgroundColor = "black";

    let currOpacity = e.target.style.opacity;
    if (currOpacity > 1) {
        e.target.style.opacity = 0.2;
        return null
    } else if (currOpacity < 1) {
        e.target.style.opacity = (parseFloat(currOpacity) + 0.2)
    }
}