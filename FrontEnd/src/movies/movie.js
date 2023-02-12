// THIS IS FOR MOVIE.HTML, THIS SCRIPT POPULATES THE TEMPLATE WEBPAGE MOVIE.HTML WITH DATA.
// IN DOING SO IT ALSO SHOW CASES THE READ, DELETE AND UPDATE  CAPABILITY OF THE MOVIE FEATURE

import Request from "../defaultFetch.mjs";

const request = new Request();

const main = document.querySelector("main")
const movieContent = document.querySelector("#movieContent")

// SET THE CURRENT MOVIES DATA UP
main.setAttribute("data-id", sessionStorage.getItem("currentMovie"))

//ADD ONCLICK FUNCTION FOR DELETE
const deleteButton = document.querySelector("#deleteMovie")
const updateForm = document.querySelector("#updateMovieForm")
deleteButton.addEventListener('click', deleteMovie);
updateForm.addEventListener('submit', updateMovie);

const res = await request.Get(`movies/${sessionStorage.getItem("currentMovie")}`)

if (!res.ok) {
    console.error(await res.json());
}

else {
    const movie = await res.json()
    const { title, description, trailer, createdBy } = movie;

    //DISABLE USER SPECIFIC BUTTONS
    if (createdBy.username.toLowerCase() != sessionStorage.getItem("currentUser").toLowerCase()) {
        document.querySelector("#editMovie").disabled = true;
        deleteButton.disabled = true;
    }
    // POPULATE THE TEMPLATE PAGE WITH SPECIFICS
    document.querySelector('title').innerHTML = title;
    if (trailer) {
        movieContent.innerHTML = `<div class="bg-light embed-responsive embed-responsive-4by3 trailer-container">
            <iframe class="embed-responsive-item trailer"
                src="${trailer}" allowfullscreen title="Video Trailer">
            </iframe>
        </div>

        <p><strong>${title}</strong> ${description}
        </p>`
    }
    else {
        movieContent.innerHTML = `
           <p><strong>${title}</strong> ${description}
        </p>`
    }



}

async function deleteMovie() {
    const res = await request.Del(`movies/${sessionStorage.getItem("currentMovie")}`)
    const data = await res.json()

    if (!res.ok) {
        console.error(data.error);
        alert(data.message + ": movies can only be deleted by the users that created them")
        location.reload()
    }
    else {
        location.replace("movies.html");

    }

}

async function updateMovie(e) {
    e.preventDefault()

    // GET FORM ELEMENTS
    const title = document.querySelector("#title").value.trim()
    const desc = document.querySelector("#desc").value.trim()
    const cover = document.querySelector("#cover")
    const trailer = document.querySelector("#trailer").value.trim()

    //VALIDATION
    if (desc && desc.length < 11) {
        alert("Description must be more than 10 characters");
        document.querySelector("#desc").focus();
        return
    }


    //API CALL
    const formData = new FormData();

    if (title) {
        formData.append("title", title)

    }
    if (desc) {
        formData.append("description", desc)

    }
    if (cover.value) {
        formData.append('coverPage', cover.files[0]);
    }

    if (trailer) {
        formData.append("trailer", trailer)
    }

    const response = await fetch(`http://localhost:3000/movies/${sessionStorage.getItem("currentMovie")}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + sessionStorage.getItem("jwt"),
        },
        body: formData,
    });


    if (!res.ok) {
        const resData = await res.json();
        if (resData.message.constructor === Array) {
            alert(resData.message[0])
        } else {
            alert(resData.message)
        }
    } else {
        location.reload();
    }
}