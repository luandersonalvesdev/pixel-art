// SELECT HTML ELEMENT
const getUlColors = document.querySelector('#color-palette');
const getButtonRandom = document.querySelector('#button-random-color');
const getButtonClear = document.querySelector('#clear-board');
const getPixelBoard = document.querySelector('#pixel-board');
const getInput = document.querySelector('#board-size');
const getButtonBoard = document.querySelector('#generate-board');

// FUNCAO PARA SALVAR AS CORES
const fSaveColorLS = () => {
  localStorage.setItem('colorPalette', getUlColors.innerHTML);
};

// FUNCAO PARA CARREGAR AS CORES
const fLoadColorsLS = () => {
  if (localStorage.getItem('colorPalette') !== null) {
    getUlColors.innerHTML = localStorage.getItem('colorPalette');
  }
};

// FUNCAO PARA SALVAR OS PIXELS PINTADOS
const fSavePixel = () => {
  localStorage.setItem('pixelBoard', getPixelBoard.innerHTML);
};

// FUNCAO PARA CARREGAR OS PIXELS PINTADOS
const fLoadPixel = () => {
  if (localStorage.getItem('pixelBoard') !== null) {
    getPixelBoard.innerHTML = localStorage.getItem('pixelBoard');
  }
};

// FUNCAO PARA SALVAR O VALOR DO INPUT
const fSaveInputValue = () => {
  localStorage.setItem('boardSize', JSON.stringify((getInput.value)));
};

// FUNCAO PARA DEFINIR O INICIO O INPUT
(function fInputInitial() {
  if (localStorage.getItem('boardSize') === null) {
    localStorage.setItem('boardSize', JSON.stringify(5));
  }
}());

// ARRAY DE CORES
const arrayColors = ['black', 'red', 'green', 'blue', 'yellow', 'brown', 'pink', 'purple', '#7C77B9', '#8FBFE0', '#1D8A99', '#14FFF7', '#26413C', '#03120E', '#FBB02D', '#F3DE2C', '#FB6107', '#A9B3CE', '#7CDEDC', '#474954', '#61C9A8', '#BA3B46', '#4C2C69', '#42253B', '#FFA686', '#AA767C', '#032B43', '#3F88C5', '#E0ACD5', '#111D4A', '#FFF8F0', '#FFCF99', '#DC758F', '#E3D3E4', '#664C43', '#A3A9AA',];

// CRIANDO AS PALETAS DE CORES
(function fCreateColorsPalette() {
  for (let index = 0; index < 4; index += 1) {
    if (index === 0) {
      const createLiColors = document.createElement('li');
      createLiColors.className = 'color';
      createLiColors.style.backgroundColor = arrayColors[index];
      getUlColors.appendChild(createLiColors);
    } else {
      const createLiColors = document.createElement('li');
      createLiColors.classList = 'color random';
      createLiColors.style.backgroundColor = arrayColors[index];
      getUlColors.appendChild(createLiColors);
    }
  }
}());

// GERADOR DE NÚMEROS ALEATÓRIOS DE 1 ATE TAMANHO DA ARRAY
const fGenerateRandomNumbers = () => {
  const random = Math.floor(Math.random() * ((arrayColors.length) - 1) + 1);
  return random;
};

// GERAR CORES ALEATÓRIAS
getButtonRandom.addEventListener('click', () => {
  let number = '';
  for (let index = 1; index < 4; index += 1) {
    number = fGenerateRandomNumbers();
    getUlColors.children[index].style.backgroundColor = arrayColors[number];
  }
  fSaveColorLS();
});

// GERANDO OS PIXELS
const fGeneratePixels = (inputValue) => {
  const sizeOfBoarder = inputValue;
  const sizeOfPixels = 40;
  for (let index = 0; index < (sizeOfBoarder * sizeOfBoarder); index += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = 'pixel';
    createDiv.style.backgroundColor = 'white';
    getPixelBoard.appendChild(createDiv);
  }
  getPixelBoard.style.width = `${sizeOfPixels * sizeOfBoarder}px`;
};
fGeneratePixels(JSON.parse(localStorage.getItem('boardSize')));

const fClasseSelected = () => {
  Array.from(getUlColors.children).forEach((value) => {
    if (value.classList.contains('selected')) {
      value.classList.remove('selected');
    }
  });
};

// COLOCANDO A CLASSE SELECTED NAS CORES
const fColorSelector = (e) => {
  fClasseSelected();
  e.target.classList.add('selected');
};
getUlColors.addEventListener('click', fColorSelector);

// PINTANDO OS PIXELS
const fPaintPixels = (e) => {
  Array.from(getUlColors.children).forEach((value) => {
    if (value.classList.contains('selected')) {
      e.target.style.backgroundColor = value.style.backgroundColor;
    }
  });
  fSavePixel();
};
getPixelBoard.addEventListener('click', fPaintPixels);

// BOTAO PARA LIMPAR O QUADRO
getButtonClear.addEventListener('click', () => {
  Array.from(getPixelBoard.children).forEach((value) => {
    const sunsValue = value;
    sunsValue.style.backgroundColor = 'white';
  });
  fSavePixel();
});

/* BONUSSSSSSSSSSSS */
// FUNCAO PARA REMOVER TODOS OS PIXELS DA TELA
const fRemoveAllPixels = () => {
  Array.from(getPixelBoard.children).forEach((value) => {
    value.remove();
  });
};

// BOTAO DE REDIMENSIONAMENTO DO QUADRO
getButtonBoard.addEventListener('click', () => {
  if (getInput.value === '' || getInput.value < 5) {
    alert('Board inválido!');
  } else if (getInput.value > 50) {
    alert('Board redefinido para 50');
    localStorage.removeItem('pixelBoard');
    fRemoveAllPixels();
    fGeneratePixels(50);
    fSavePixel();
    fSaveInputValue();
  } else {
    localStorage.removeItem('pixelBoard');
    fRemoveAllPixels();
    fGeneratePixels(getInput.value);
    fSavePixel();
    fSaveInputValue();
  }
});

window.onload = () => {
  fClasseSelected();
  getUlColors.firstElementChild.classList.add('selected');
};

fLoadColorsLS();
fLoadPixel();
localStorage.setItem('pixelBoard', getPixelBoard.innerHTML);
