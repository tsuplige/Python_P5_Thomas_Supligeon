let source = "http://127.0.0.1:8000/api/v1/"

async function getBestMovie() {

  const best_movie_filtre = "?sort_by=-imdb_score"

  let answer = await getMovieByTitle(best_movie_filtre)
  const id = answer["results"][0].id
  //console.log(id)

  let nanswer = await getMovieByTitle(id)

  return nanswer;
}

async function getMovieByTitle(filtre) {
  const answer = await fetch(source + 'titles/' + filtre);
  const data = await answer.json();
  return data;
}

async function AddSliderMovieData(movie_filtre, cat_id) {
  let answer = await getMovieByTitle('?' + movie_filtre)
  let result = answer["results"]

  let id_list = []
  result.forEach(movie => {
    id_list.push({ "id": movie.id, "img": movie.image_url })
  })

  answer = await getMovieByTitle("?page=2&" + movie_filtre)
  result = answer["results"]

  let cards = document.getElementsByClassName(cat_id)
  result.forEach(movie => {
    id_list.push({ "id": movie.id, "img": movie.image_url })
  })

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.innerHTML = `<img
              class="movie_img"
              src="${id_list[i].img}"
              data-id="${id_list[i].id}"
              alt=""
            />`
  }
}

async function AddBestMovieData() {
  const best_movie_filtre = "?sort_by=-imdb_score"

  let answer = await getMovieByTitle(best_movie_filtre)
  const id = answer["results"][0].id
  let best_movie_data = await getMovieByTitle(id)

  let best_movie = document.getElementById("best_movie_section");
  let best_movie_modal = document.getElementById("best-movie_modale-header");

  let iurl = best_movie_data['image_url']
  let best_content = document.getElementById("best_movie_content");

  let html = `<div id="best-movie_modal" class="modal">

  <div class="modal-content">
                <div class="modal__header" id="best-movie_modale-header">
                  <h3>${best_movie_data.title}</h3>
                  <span class="close">&times;</span>
                </div>
                <div class="modal__body">
                <img class=""
                src="${iurl}"
                alt="">
                  <div class="modal__body--right">
                    <p>${best_movie_data.duration} min</p>
                    <p>${best_movie_data.votes} votes</p>
                    <p>imdb_score: ${best_movie_data.imdb_score}</p>
                    <p>${best_movie_data.year}</p>
                    <p>${best_movie_data.description}</p>
                  </div>
                  <div class="modal__body--left">
                    <p> acteurs: ${best_movie_data.actors}</p>
                    <p>${best_movie_data.genres}</p>
                    <p>réalisateur: ${best_movie_data.directors}</p>
                    <p>${best_movie_data.countries}</p>
                    <p>${best_movie_data.budget} $</p>
                  </div>
                </div>
  
  </div>

            </div>`
  html += `
              <div id="best_movie_content">
              <h2 class="best_movie_content--title">${best_movie_data.title}</h2>
              <p class="best_movie_content--resume">${best_movie_data.description}</p>
              `

  let actors = ''
  best_movie_data.actors.forEach(actor => {
    actors +=
      `${actor}, `

  });
  

  html += ` <p class="best_movie_content--actor">${actors}</p>
  <button id="best-movie-button">Regarder</button>`

  document.getElementById("best_movie").innerHTML = html

  best_movie.style.backgroundImage = `url(${iurl})`;

  // Get the modal
  var modal = document.getElementById("best-movie_modal");

  // Get the button that opens the modal
  var btn = document.getElementById("best-movie-button");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

async function modalActivate(){
  let spanElements = document.querySelectorAll('.cat_list_element');
  var modal = document.getElementById("cat-modal");

  spanElements.forEach(function(spanElement) {
    spanElement.addEventListener('click',async function() {
      let imgElement = this.querySelector('img');
  
      let dataId = imgElement.getAttribute('data-id');
      let movie_data = await getMovieByTitle(dataId)
      // let movie_data = answer["results"]

      console.log(movie_data)
      modal.innerHTML = `<div class="modal-content">
      <div class="modal__header" id="best-movie_modale-header">
        <h3>${movie_data.title}</h3>
        <span class="close">&times;</span>
      </div>
      <div class="modal__body">
        <img class="img_modal" src="${movie_data.image_url}" alt="">
        <div class="modal__body--right">
          <p>${movie_data.duration} min</p>
          <p>${movie_data.votes} votes</p>
          <p>imdb_score: ${movie_data.imdb_score}</p>
          <p>${movie_data.year}</p>
          <p>${movie_data.description}</p>
        </div>
        <div class="modal__body--left">
          <p> acteurs: ${movie_data.actors}</p>
          <p>${movie_data.genres}</p>
          <p>réalisateur: ${movie_data.directors}</p>
          <p>Countrie : ${movie_data.countries}</p>
          <p>Budget : ${movie_data.budget} $</p>
        </div>
      </div>

    </div>`
      
      modal.style.display = "block";
      
      var close = document.getElementsByClassName("close")[1];
      
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      close.onclick = function () {
        modal.style.display = "none";
      }
    
      
  
      console.log(dataId);
    });
  });

  
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
AddBestMovieData()
AddSliderMovieData('sort_by=-imdb_score', "best-movie")
AddSliderMovieData('genre=animation', 'animation-movie')
AddSliderMovieData('genre=action', 'action-movie')
AddSliderMovieData('genre=comedy', 'comedy-movie')
modalActivate()


function scrollToPosition(element, to, duration) {
  const start = element.scrollLeft;
  const change = to - start;
  const startTime = performance.now();

  function animateScroll(timestamp) {
    const currentTime = timestamp - startTime;
    const increment = currentTime / duration;
    const easeInOut = 0.5 * (1 - Math.cos(Math.PI * increment));

    const newPosition = start + change * easeInOut;
    element.scrollLeft = newPosition;

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function sliderButton(starButton, endButton, slider){
  const scrollToStartButton = document.getElementById(starButton);
scrollToStartButton.addEventListener('click', function () {
  const element = document.querySelector(slider);
  scrollToPosition(element, 0, 500); // Défilement vers le début en 500ms
});

const scrollToEndButton = document.getElementById(endButton);
scrollToEndButton.addEventListener('click', function () {
  const element = document.querySelector(slider);
  const scrollWidth = element.scrollWidth - element.clientWidth;
  scrollToPosition(element, scrollWidth, 500); // Défilement vers la fin en 500ms
});
}

sliderButton('scrollToStartButton01', 'scrollToEndButton01', '.cat_list1')
sliderButton('scrollToStartButton02', 'scrollToEndButton02', '.cat_list2')
sliderButton('scrollToStartButton03', 'scrollToEndButton03', '.cat_list3')
sliderButton('scrollToStartButton04', 'scrollToEndButton04', '.cat_list4')

