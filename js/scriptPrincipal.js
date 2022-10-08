'use strict';
const palabraClave = document.querySelector('.palabra-clave');
const box1 = document.querySelector('.caja-principal-1');
const box2 = document.querySelector('.caja-principal-2');
const box3 = document.querySelector('.caja-principal-3');
const btnIniciar = document.querySelector('.btn--iniciar');
const btnAgregar = document.querySelector('.btn--agregar');
const btnGuardar = document.querySelector('.btn--guardar');
const btnCancelar = document.querySelector('.btn--cancelar');
const btnNewJuego = document.querySelector('.btn--Newjuego');
const btnDesistir = document.querySelector('.btn--desistir');
const boxAdvertencia = document.querySelector('.advertencia');
const advertenciaTexto = document.querySelector('.advertencia-texto');
const advertenciaIcono = document.querySelector('.advertencia-icon');

const msjVictoria = document.querySelector('.msj--victoria');
const msjDerrota = document.querySelector('.msj--derrota');

const palabras = ['DIEGO', 'MARIA', 'LAVADERO', 'CICLISTA'];
let iguales = false;
let numeroRandom;
let nroLinea = 1;
let juegoPlay = true;
let indexCanvas = 0;
let contVictoria = 0;
let contDerrota = 0;
let cadenaIncorrecto = ' ';
let cadenaCorrecto = ' ';
box2.classList.add('hidden');
box3.classList.add('hidden');

const condicIniciales = function () {
  juegoPlay = true;
  nroLinea = 1;
  indexCanvas = 0;
  contVictoria = 0;
  contDerrota = 0;
  cadenaIncorrecto = ' ';
  cadenaCorrecto = palabras[numeroRandom];
  msjVictoria.classList.add('hidden');
  msjDerrota.classList.add('hidden');
  document.querySelector('body').style.background = '#e5e5e5';
};

/************GUARDAR PALABRAS E INICIAR*************/

btnGuardar.addEventListener('click', function () {
  const cadena = palabraClave.value;
  if (palabraClave.value.length <= 8 && cadena == cadena.toUpperCase()) {
    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i] === palabraClave.value) {
        iguales = true;
        break;
      }
    }
    if (!iguales) {
      palabras.push(palabraClave.value);
      palabraClave.value = '';
      box2.classList.add('hidden');
      box3.classList.remove('hidden');
      pantalla.width = pantalla.width;
      numeroRandom = Math.trunc(Math.random() * palabras.length);
      lineaLetra(palabras[numeroRandom].length);
      condicIniciales();
    }
    iguales = false;
    console.log(palabras);
  } else {
    let contador = 0;
    const alert = function () {
      advertenciaTexto.textContent =
        'Incorrecto - Máx 8 letras y/o Letras Mayusculas';
      boxAdvertencia.classList.add('alerta--incorrecto');
      contador++;
      if (contador === 25) {
        clearInterval(intervalo);
        boxAdvertencia.classList.remove('alerta--incorrecto');
        advertenciaTexto.textContent = 'Máx. de 8 letras ';
      }
    };
    let intervalo = setInterval(alert, 100);
  }
});
/*******************LIENZO******************************/
const pantalla = document.querySelector('canvas');
const pincel = pantalla.getContext('2d');

const lineaLetra = function (nro) {
  let x = 0;
  for (let i = 0; i < nro; i++) {
    pincel.moveTo(60 + x, 360);
    pincel.lineTo(110 + x, 360);
    pincel.strokeStyle = '#f43f5e';
    pincel.stroke();
    x += 60;
  }
};
/************APARICION Y DESAPARICION DE CONTENEDORES*************/
btnIniciar.addEventListener('click', function () {
  /* Limpiar canvas */
  pantalla.width = pantalla.width;
  box1.classList.add('hidden');
  box2.classList.add('hidden');
  box3.classList.remove('hidden');
  numeroRandom = Math.trunc(Math.random() * palabras.length);

  lineaLetra(palabras[numeroRandom].length);
  condicIniciales();
});

/************NUEVO JUEGO*************/
btnNewJuego.addEventListener('click', function () {
  /* Limpiar canvas */
  pantalla.width = pantalla.width;
  numeroRandom = Math.trunc(Math.random() * palabras.length);
  const palabraAdivinar = palabras[numeroRandom];
  lineaLetra(palabraAdivinar.length);
  condicIniciales();
});

btnDesistir.addEventListener('click', function () {
  pantalla.width = pantalla.width;
  numeroRandom = Math.trunc(Math.random() * palabras.length);
  const palabraAdivinar = palabras[numeroRandom];
  lineaLetra(palabraAdivinar.length);
  condicIniciales();
});
btnDesistir.addEventListener('click', function () {
  box1.classList.remove('hidden');
  box2.classList.add('hidden');
  box3.classList.add('hidden');
});
btnCancelar.addEventListener('click', function () {
  box1.classList.remove('hidden');
  box2.classList.add('hidden');
  box3.classList.add('hidden');
});

btnAgregar.addEventListener('click', function () {
  box1.classList.add('hidden');
  box2.classList.remove('hidden');
  box3.classList.add('hidden');
});
/*******************EVENTO AL PRESIONAR LAS TECLAS*********************/

document.addEventListener('keydown', function (e) {
  console.log(e.key.charCodeAt(0));
  const coorX = 60;
  const coorIncorrectoX = 25;
  let palabraMuestra = palabras[numeroRandom];
  if (
    contVictoria < palabraMuestra.length &&
    contDerrota < 10 &&
    e.key !== 'CapsLock' &&
    e.key.charCodeAt(0) >= 65 &&
    e.key.charCodeAt(0) <= 90
  ) {
    if (palabraMuestra.includes(e.key) && juegoPlay === true) {
      for (let i = 0; i < palabraMuestra.length; i++) {
        if (
          palabraMuestra[i] === e.key &&
          cadenaCorrecto.indexOf(e.key) !== -1
        ) {
          cadenaCorrecto = cadenaCorrecto.replace(e.key, '-');
          pincel.font = '6rem Roboto';
          pincel.fillStyle = '#be185d';
          pincel.fillText(`${e.key}`, 60 + coorX * i, 350);
          contVictoria++;
          if (contVictoria === palabraMuestra.length) {
            msjVictoria.classList.remove('hidden');
            document.querySelector('body').style.background = '#e2eefd';
          }
        }
      }
    } else if (
      nroLinea <= 10 &&
      juegoPlay &&
      !cadenaIncorrecto.includes(e.key)
    ) {
      cadenaIncorrecto += e.key;
      pincel.font = '3rem Roboto';
      pincel.fillStyle = '#be185d';
      pincel.fillText(`${e.key}`, 80 + coorIncorrectoX * indexCanvas, 420);
      switch (nroLinea) {
        case 1:
          pincel.moveTo(60, 250);
          pincel.lineTo(300, 250);
          break;
        case 2:
          pincel.moveTo(100, 250);
          pincel.lineTo(100, 10);
          break;
        case 3:
          pincel.moveTo(100, 10);
          pincel.lineTo(250, 10);
          break;
        case 4:
          pincel.moveTo(250, 10);
          pincel.lineTo(250, 60);
          break;
        case 5:
          pincel.beginPath();
          pincel.arc(250, 80, 20, 0, 2 * 3.14);
          break;
        case 6:
          pincel.moveTo(250, 100);
          pincel.lineTo(250, 180);
          break;
        case 7:
          pincel.moveTo(250, 100);
          pincel.lineTo(230, 130);
          break;
        case 8:
          pincel.moveTo(250, 100);
          pincel.lineTo(270, 130);
          break;
        case 9:
          pincel.moveTo(250, 180);
          pincel.lineTo(230, 210);
          break;
        case 10:
          pincel.moveTo(250, 180);
          pincel.lineTo(270, 210);
          nroLinea = 1;
          juegoPlay = false;
          indexCanvas = 0;
          break;
      }
      pincel.strokeStyle = '#0a3871';
      pincel.stroke();
      nroLinea++;
      indexCanvas++;
      contDerrota++;
      if (contDerrota === 10) {
        msjDerrota.classList.remove('hidden');
        document.querySelector('body').style.background = '#fee2e9';
      }
    }
  }
});
