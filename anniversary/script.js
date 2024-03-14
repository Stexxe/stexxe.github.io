const app = document.getElementById('app')

function clearPage() {
  app.innerHTML = '';
}

function renderStart() {
  const template = document.getElementById('start-page');
  const clone = template.content.cloneNode(true);
  app.appendChild(clone)

  document.getElementById('play').addEventListener('click', () => {
    clearPage();
    renderPuzzle();
  });
}

function renderPuzzle() {
  const template = document.getElementById('puzzle-page');
  const clone = template.content.cloneNode(true);
  app.appendChild(clone)

  document.getElementById('get-gift').addEventListener('click', () => {
    clearPage();
    renderFinal();
  });

  initPuzzle();
}

function initPuzzle() {
  const img = new Image();
  img.src = 'assets/us.png';
  img.onload = () => {
    const puzzle = new headbreaker.Canvas('puzzle', {
      width: 345,
      height: 650,
      image: img,
      pieceSize: 100,
      proximity: 20,
      borderFill: 10,
      lineSoftness: 0.18,
      preventOffstageDrag: true,
      strokeWidth: 1
    });

    puzzle.adjustImagesToPuzzleHeight()
    puzzle.autogenerate({
      horizontalPiecesCount: 4,
      verticalPiecesCount: 4
    });
    puzzle.shuffle(0.7);
    puzzle.attachSolvedValidator()

    puzzle.draw();

    puzzle.onConnect((_piece, figure, _target) => {
      console.log(_target.puzzle.isValid())
    })
  }
}

function renderFinal() {
  const template = document.getElementById('final-page');
  const clone = template.content.cloneNode(true);
  app.appendChild(clone)
}

renderStart();
