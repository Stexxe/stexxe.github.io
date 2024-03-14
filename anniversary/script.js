// const img = new Image();
// img.src = 'us.png';
// img.onload = () => {
//   const puzzle = new headbreaker.Canvas('puzzle', {
//     width: 345,
//     height: 650,
//     image: img,
//     pieceSize: 100,
//     proximity: 20,
//     borderFill: 10,
//     lineSoftness: 0.18,
//     preventOffstageDrag: true,
//     strokeWidth: 1
//   });
//
//   puzzle.adjustImagesToPuzzleHeight()
//   puzzle.autogenerate({
//     horizontalPiecesCount: 4,
//     verticalPiecesCount: 4
//   });
//   // puzzle.shuffle(0.7);
//   puzzle.attachSolvedValidator()
//
//   puzzle.draw();
//
//   puzzle.onConnect((_piece, figure, _target) => {
//     console.log(_target.puzzle.isValid())
//   })
// }