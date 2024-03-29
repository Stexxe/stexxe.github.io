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
  }, 500)
  setTimeout(() => {
    playButton.classList.add('vibrate')
  }, 2000)

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
      horizontalPiecesCount: 4,
      verticalPiecesCount: 4
    });
    puzzle.shuffle(0.7);
    puzzle.attachSolvedValidator()

    puzzle.draw();

    puzzle.onConnect((_piece, figure, _target) => {
      const solved = _target.puzzle.isValid()

      if (solved) {
        solvedAudio.play().then()
        const giftButton = document.getElementById('get-gift')
        setTimeout(() => {
          img.classList.add('us-solved', 'scale-in')
          document.querySelector('#app main').prepend(img)
          document.getElementById('puzzle').remove()
          document.querySelectorAll('h2').forEach((el) => el.remove())
          giftButton.classList.add('scale-in', 'visible')
          setTimeout(() => giftButton.classList.add('vibrate'), 2000)
        }, 1000)


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
