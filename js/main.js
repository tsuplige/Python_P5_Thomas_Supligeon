console.log("heyyy")

let source = "http://127.0.0.1:8000/api/v1/"

// async function getBestMovie(){
//     const answer = await fetch(source + "titles/?sort_by=-imdb_score");
//     const data = await answer.json();
//     const result = data["results"][0]
//     const new_answer = await (await fetch(source + "titles/" + result.id)).json
//     return new_answer;
// }

async function getBestMovie(){

    const best_movie_filtre = "?sort_by=-imdb_score"

    let answer = await getMovieByTitle(best_movie_filtre)
    const id = answer["results"][0].id
    console.log(id)

    let nanswer = await getMovieByTitle(id)
    
    return nanswer;
}


async function getMovieByTitle(filtre){
    const answer = await fetch(source + 'titles/' +filtre);
    const data = await answer.json();
    return data;
}

let best_movie_data = await getBestMovie()

console.log(best_movie_data)

let best_movie = document.getElementById("best_movie_section");

let iurl = best_movie_data['image_url']
let best_content = document.getElementById("best_movie_content");

let html =  `<h2 class="best_movie_content--title">${best_movie_data.title}</h2>
            <button>Regarder</button>
            <p class="best_movie_content--resume">${best_movie_data.description}</p> <div class='best_movie_content--actors'>

`
 best_movie_data.actors.forEach(actor => { html += 
   ` <p class="best_movie_content--actor">${actor}, </p>`
    
 });

 html += "</div>"

 document.getElementById("best_movie_content").innerHTML = html
// console.log(iurl)

best_movie.style.backgroundImage = `url(${iurl})`;
