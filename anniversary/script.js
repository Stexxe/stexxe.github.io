const app = document.getElementById('app')

function clearPage() {
  app.innerHTML = '';
}

function renderStart() {
  const template = document.getElementById('start-page');
  const clone = template.content.cloneNode(true);
  app.appendChild(clone)

  const playButton = document.getElementById('play')
  setTimeout(() => {
    document.querySelectorAll('.instruction').forEach((el) => {
      el.classList.add('instruction-full')
    })
    playButton.classList.add('heart-button-play-full')
  }, 500)
  playButton.addEventListener('click', () => {
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
  const audioFiles = [
      'assets/sounds/bravo.ogg',
      'assets/sounds/goodjob.ogg',
      'assets/sounds/slower.ogg',
      'assets/sounds/tak.ogg',
      'assets/sounds/bravo.ogg',
      'assets/sounds/tutelka.ogg',
      'assets/sounds/uh.ogg',
  ]

  const audios  = audioFiles.map((f) => new Audio(f));
  audios.forEach((a) => {
    a.addEventListener('ended', () => {
      playing = false
    })
  })

  const solvedAudio = new Audio('assets/sounds/tada.mp3')
  let playing = false;

  const img = new Image();
  img.src = 'assets/us.png';
  img.onload = () => {
    const puzzle = new headbreaker.Canvas('puzzle', {
      width: 345,
      height: 600,
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
      horizontalPiecesCount: 2,
      verticalPiecesCount: 2
    });
    puzzle.shuffle(0.7);
    puzzle.attachSolvedValidator()

    puzzle.draw();

    puzzle.onConnect((_piece, figure, _target) => {
      const solved = _target.puzzle.isValid()

      if (solved) {
        solvedAudio.play().then()
        document.getElementById('get-gift').classList.add('gift-button-show')
        return
      }

      if (!playing) {
        playing = true
        audios[Math.floor(Math.random() * audios.length)].play().then()
      }


    })
  }
}

function renderFinal() {
  const template = document.getElementById('final-page');
  const clone = template.content.cloneNode(true);
  app.appendChild(clone)
}

renderStart();
