/* eslint-disable complexity */
// tamanho da tela 1366 x 768;
// tamanho máximo das imagens 500kb;

// eslint-disable-next-line func-names
window.onload = function () {
    // Ideia desenvolvida em conjunto com Vitor Dino e Arthur Palomino
    const colorOppening = document.querySelector('#black');
    colorOppening.classList.add('selected');
  };
  
  const header = document.createElement('header');
  document.body.appendChild(header);
  const title = document.createElement('h1');
  title.innerText = 'Paleta de Cores';
  title.id = 'title';
  header.appendChild(title);
  header.style.textAlign = 'center';
  title.style.color = 'rgb(0,191,255)';
  const sectionColor = document.createElement('section');
  document.body.appendChild(sectionColor);
  sectionColor.appendChild(document.querySelector('section'));
  sectionColor.style.width = '90%';
  const sectionButton = document.createElement('section');
  document.body.appendChild(sectionButton);
  sectionButton.id = 'buttons-container';
  const sectionBoard = document.createElement('section');
  console.log(sectionBoard);
  sectionBoard.setAttribute('id', 'pixel-board');
  document.body.appendChild(sectionBoard);
  sectionBoard.style.margin = '0px auto';
  
  function createDivs(numberOfDivs) {
    let receveNumber = 0;
    receveNumber = numberOfDivs;
    const createDiv = [];
    const createDivOfDiv = [];
    for (let index = 0; index < receveNumber; index += 1) {
      createDiv[index] = document.createElement('div');
      createDiv[index].classList = 'repeat-pixel';
      createDiv[index].style.gridArea = 'center';
      console.log(createDiv[index]);
      sectionBoard.appendChild(createDiv[index]);
      for (let count = 0; count < receveNumber; count += 1) {
        createDivOfDiv[count] = document.createElement('div');
        createDivOfDiv[count].classList = 'pixel';
        createDivOfDiv[count].style.gridArea = 'center';
        createDivOfDiv[count].style.backgroundColor = 'white';
        createDivOfDiv[count].addEventListener('click', colorIndividualPixel);
        createDivOfDiv[count].addEventListener('click', clearBoardButtonEventListener);
        createDiv[index].appendChild(createDivOfDiv[count]);
      }
    }
  }
  createDivs(5);
  
  function selectAColor(event) {
    // feito em ajuda com Alef Sloan
    // Pegar o evento
    const selectedColor = event.target;
    // selecionar o que eu preciso ver o evento;
    const selectedClass = document.querySelectorAll('.selected');
    // verificar se tem a classe
    if (selectedColor.classList.contains('selected')) {
      // empty
    } else {
      // como selected só pode acontecer em um por vez, a posição do selected
      // sempre vai ser a primeira.
      // para que não haja repetição, tirar da primeira posição.
      selectedClass[0].classList.remove('selected');
      // recolocar o selected;
      selectedColor.classList.add('selected');
    }
  }
  
  const colorClickEvent = document.querySelectorAll('.color');
  for (let index = 0; index < colorClickEvent.length; index += 1) {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colorClickEvent[index].style.backgroundColor = randomColor;
    if (colorClickEvent[index] === colorClickEvent[0]) {
      colorClickEvent[index].style.backgroundColor = 'black';
    } else if (randomColor === 'white') {
      colorClickEvent[index].addEventListener('click', selectAColor);
    }
    colorClickEvent[index].addEventListener('click', selectAColor);
  }
  
  // clicar em um pixel, depois de clicar
  // na cor e pintar ele com a cor selecionada.
  // questão resolvida com a ajuda do Alef Sloan, gente boníssima, já contratem ele.
  const pixelClick = document.querySelectorAll('.pixel');
  
  for (let index = 0; index < pixelClick.length; index += 1) {
    pixelClick[index].style.backgroundColor = 'white';
  }
  // colorir pixel individualmente.
  function colorIndividualPixel(event) {
    const selectedClass = document.getElementsByClassName('selected')[0];
    if (event.target.style.backgroundColor !== selectedClass.style.backgroundColor) {
      // eslint-disable-next-line no-param-reassign
      event.target.style.backgroundColor = selectedClass.style.backgroundColor;
    }
  }
  // criar botão de limpar
  function createClearBoardButton() {
    const createButton = document.createElement('button');
    const sectionButtonSelect = document.querySelector('#buttons-container');
    console.log(createButton);
    sectionButtonSelect.appendChild(createButton);
    createButton.style.margin = '20px auto';
    createButton.id = 'clear-board';
    createButton.style.display = 'inline-block';
    createButton.innerText = 'Limpar';
  }
  createClearBoardButton();
  
  // limpar o board
  function clearBoardButtonEventListener(event) {
    const clearButton = document.querySelector('#clear-board');  
    clearButton.addEventListener('click', () => {
      const selectedPixel = document.querySelectorAll('.pixel');
      for (let index = 0; index < selectedPixel.length; index += 1) {
        selectedPixel[index].style.backgroundColor = 'white';
      }
    });
  }
  clearBoardButtonEventListener();
  // criar barra de digitação
  function createInputAndButton() {
    const sectionButtonSelect = document.querySelector('#buttons-container');
    const inputItem = document.createElement('input');
    const buttonGeneretaBoardPixel = document.createElement('button');
    buttonGeneretaBoardPixel.innerText = 'VQV';
    buttonGeneretaBoardPixel.id = 'generate-board';
    sectionButtonSelect.appendChild(inputItem);
    sectionButtonSelect.appendChild(buttonGeneretaBoardPixel);
    inputItem.id = 'board-size';
    inputItem.type = 'number';
    inputItem.min = '1';
    inputItem.style.display = 'inline-block';
    inputItem.style.margin = '20px';
  }
  createInputAndButton();
  
  // criar board com valor do input;
  // eslint-disable-next-line max-lines-per-function
  function createBoardWithInput() {
    const boardButton = document.querySelector('#generate-board');
    // eslint-disable-next-line max-lines-per-function
    boardButton.addEventListener('click', () => {
      sectionBoard.innerHTML = '';
      let getInput = document.getElementById('board-size').value;
      if (getInput === '') {
        alert('Board inválido!');
        return (sectionBoard.innerHTML);
      } if (getInput < 0) {
        alert('Valores negativos não formam quadros ^^');
        return;
      } if (getInput >= 0 && getInput < 5) {
        getInput = 5;
      } else if (getInput > 50) {
        getInput = 50;
      }
      createDivs(getInput);
    });
  }
  
  createBoardWithInput();