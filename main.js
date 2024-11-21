import { Tetris } from "./Tetris.js";



// let leverControl = document.getElementById("leverControl");
// let isRotated = false;

// leverControl.addEventListener("click", () => {
//     if (isRotated) {
//       // Rotacija ulevo (vrati se u početni položaj)
//       gsap.to(".lever", {
//         rotate: 30, // Početni ugao
//         duration: 1,
//         ease: "Sine.out",
//       });
//     } else {
//       // Rotacija udesno
//       gsap.to(".lever", {
//         rotate: -40, // Ciljni ugao
//         duration: 1,
//         ease: "Sine.out",
//       });
//     }
  
//     // Obrni stanje
//     isRotated = !isRotated;
//   });


const game = new Tetris(document.body)
game.start()
