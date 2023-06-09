console.log("heyyy")

let source = "http://127.0.0.1:8000/api/v1/"

// async function getBestMovie(){
//     const answer = await fetch(source + "titles/?sort_by=-imdb_score");
//     const data = await answer.json();
//     const result = data["results"][0]
//     const new_answer = await (await fetch(source + "titles/" + result.id)).json
//     return new_answer;
// }

async function getBestMovie() {

  const best_movie_filtre = "?sort_by=-imdb_score"

  let answer = await getMovieByTitle(best_movie_filtre)
  const id = answer["results"][0].id
  console.log(id)

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
    id_list.push(movie.id)
  })

  answer = await getMovieByTitle("?page=2&" + movie_filtre)
  result = answer["results"]

  result.forEach(movie => {
    id_list.push(movie.id)
  })

  let html = ""
  for (const movie of id_list) {
    let movie_data = await getMovieByTitle(movie);
    let iurl = movie_data['image_url'];
    console.log(iurl);
    html += `<a href="" class="cat_list_element" role="link">
      <div class="cat_list-movie" data-id="${movie}">
        <img
          class="movie_img"
          src="${iurl}"
          alt=""
        />
      </div>
    </a>`;
  }

  document.getElementById(cat_id).innerHTML = html

  console.log(await html)
}

AddSliderMovieData('sort_by=-imdb_score', "most_popular_movie")

AddSliderMovieData('genre=animation', 'animation')
AddSliderMovieData('genre=action', 'action')
AddSliderMovieData('genre=comedy', 'comedy')
async function AddBestMovieData() {
  const best_movie_filtre = "?sort_by=-imdb_score"

  let answer = await getMovieByTitle(best_movie_filtre)
  const id = answer["results"][0].id
  let best_movie_data = await getMovieByTitle(id)

  let best_movie = document.getElementById("best_movie_section");

  let iurl = best_movie_data['image_url']
  let best_content = document.getElementById("best_movie_content");

  let html = `<h2 class="best_movie_content--title">${best_movie_data.title}</h2>
              <button>Regarder</button>
              <p class="best_movie_content--resume">${best_movie_data.description}</p> <div class='best_movie_content--actors'>
  
  `
  best_movie_data.actors.forEach(actor => {
    html +=
    ` <p class="best_movie_content--actor">${actor}, </p>`

  });

  html += "</div>"

  document.getElementById("best_movie_content").innerHTML = html
  // console.log(iurl)

  best_movie.style.backgroundImage = `url(${iurl})`;
}

AddBestMovieData()

// const scrollToStartButton = document.getElementById('scrollToStartButton');
// scrollToStartButton.addEventListener('click', function() {
//   const element = document.querySelector('.cat_list');
//   element.scrollLeft = 0;
// });

// const scrollToEndButton = document.getElementById('scrollToEndButton');
// scrollToEndButton.addEventListener('click', function() {
//   const element = document.querySelector('.cat_list');
//   element.scrollLeft = element.scrollWidth;
// });

// Fonction pour faire défiler le contenu vers une position spécifique avec une animation fluide
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

// Bouton pour aller au début du contenu scrollable
const scrollToStartButton = document.getElementById('scrollToStartButton');
scrollToStartButton.addEventListener('click', function () {
  const element = document.querySelector('.cat_list');
  scrollToPosition(element, 0, 500); // Défilement vers le début en 500ms
});

// Bouton pour aller à la fin du contenu scrollable
const scrollToEndButton = document.getElementById('scrollToEndButton');
scrollToEndButton.addEventListener('click', function () {
  const element = document.querySelector('.cat_list');
  const scrollWidth = element.scrollWidth - element.clientWidth;
  scrollToPosition(element, scrollWidth, 500); // Défilement vers la fin en 500ms
});

