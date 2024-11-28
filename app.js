const main = document.querySelector("main");

const basicArray = [
  //9 enleve les element sur exercicresArray stoke le sur basicArray
  {
    pic: 0,
    min: 1,
  },

  {
    pic: 1,
    min: 1,
  },
  {
    pic: 2,
    min: 1,
  },
  {
    pic: 3,
    min: 1,
  },
  {
    pic: 4,
    min: 1,
  },
  {
    pic: 5,
    min: 1,
  },
  {
    pic: 6,
    min: 1,
  },
  {
    pic: 7,
    min: 1,
  },
  {
    pic: 8,
    min: 1,
  },
  {
    pic: 9,
    min: 1,
  },
];

let exercicesArray = [];
(() => {
  //10

  //une function qui se joue elle même une fois  au lancement de la page
  if (localStorage.exercices) {
    //recuperer les donnée du tableau une fois sur localstorage si il est true
    exercicesArray =JSON.parse(localStorage.exercices);
  } else {
    exercicesArray = basicArray;
    ///recuperer les donnée du tableau basicarray
  }
})();

class Exercices {}

const utils = {
  //1
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },

  handleEventMinutes: function () {
    //5
  
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        exercicesArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
            //verifie si l'input touchée  donc e.target.id  est égale  à l'id qui est actif donc exo.pic dans (exercicesArray)  si il est égale tu donne a exo.min la value de l'input touchée
          }
        });
      });
    });
  },

  handleEventArrow: function () {
    //6
    //pour échanger  les carte sur le button arrow tout en s'assurant que la positionement doit être different de 0
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exercicesArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position !== 0) {
            [exercicesArray[position], exercicesArray[position - 1]] = [
              exercicesArray[position - 1],
              exercicesArray[position],
            ];
            page.lobby();
            this.store();
          } else {
            position++;
          }
        });
      });
    });
  },

  deleteItem: function () {
    //7
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArr = [];
        exercicesArray.map((exo) => {
          if (exo.pic != e.target.dataset.pic) {
            newArr.push(exo);
          }
        });
        exercicesArray = newArr;
        page.lobby();
        this.store();
      });
    });
  },

  reboot: function () {
    //8 recuperer les donnée du tableau basicArray
    exercicesArray = basicArray;
    page.lobby();
    this.store();
  },

  store: function () {
    // 11
    localStorage.exercices = JSON.stringify(exercicesArray);
  },
};

const page = {
  //2
  lobby: function () {
    let mapArray = exercicesArray
      .map(
        (exo) =>
          `
   <li>
   <div class="card-header">
   <input type='number' id ="${exo.pic}" min="1" max="10" value="${exo.min}">
   <span>min</span>
   </div>
   <img src="./assets/img/${exo.pic}.png" />
   <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
    <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
   </li>
    
    `
      )
      .join("");

    utils.pageContent(
      "Paramétrage <i id='reboot' class=' fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>commencer<i class='far fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
  },

  routine: function () {
    //3
  
    utils.pageContent("Routine", "Exercice avec chrono", null);
  },

  finish: function () {
   //4
    utils.pageContent(
      "c'est terminé !",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class='btn-reboot'>Rénitialiser<i class='fas fa-times-circle'></i></button>"
    );
  },
};

page.lobby();
