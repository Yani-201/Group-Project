import Request from "../defaultFetch.mjs";

const request = new Request();


class movieTemplate {
    movie;
    constructor(id, title, desc, coverPage) {

        this.movie = `  
        <div class="card mb-3">
            <a class="text-light" href="movie.html" onclick="sessionStorage.setItem('currentMovie', ${id})">

                <article class="row g-0 bg-dark text-light">
                    <div class="col-md-4 ">
                        <img class="img-fluid rounded-start" src="${coverPage}"
                            alt="${title} movie cover poster" width="166" height="250">
                    </div>
                    <div class="col-md-8 card-body ml-5">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">
                            ${desc.slice(0, 100) + (desc.length > 100 ? "..." : "")}
                        </p>
                    </div>

                </article>
            </a>
        </div>`

    }

}


if (document.querySelector('#createMovie')) {
    document.querySelector('#createMovie').addEventListener('submit', createMovie);
}

const movieList = document.querySelector('#movieList');


const response = await request.Get("movies");

if (!response.ok) {
    const data = await response.json()
    alert(data.message)
    console.error(data)
}

else {
    const data = await response.json()
    data.forEach(movie => {
        const movieItem = new movieTemplate(movie.id, movie.title, movie.description, movie.coverPage);
        movieList.innerHTML += movieItem.movie;
    });
}





async function createMovie(e) {
    e.preventDefault()


    const title = document.querySelector("#title").value.trim()
    const desc = document.querySelector("#desc").value.trim()
    const cover = document.querySelector("#cover").value.trim()
    const trailer = document.querySelector("#trailer").value.trim()

    //CREATE MOVIE WITH CREATE MOVIE REQUEST TO API
    const response = await request.Post("movies", {
        title: title,
        description: desc,
        coverPage: cover,
        trailer: trailer
    });

    const data = await response.json()
    if (!response.ok) {
        if (data.message == "Unauthorized") {
            alert("Unauthorized: you should be logged in to create movie")
            location.href = "login.html"
        }
        else {
            alert(data.message + data.error)
        }
        console.error(data)
    }

    else {
        const { id } = data;
        sessionStorage.setItem("currentMovie", id)
        location.href = "movie.html"
    }



}