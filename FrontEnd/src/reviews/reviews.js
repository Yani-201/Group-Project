import Request from "../defaultFetch.mjs";

const request = new Request();

class reviewTemplate {
    review;
    constructor(id, reviewer, rating, review) {
        let stars = "";
        for (let i = 0; i < rating; i++) {
            stars += "&starf;";

        }
        for (let i = rating; i < 10; i++) {
            stars += "&star;"

        }
        const buttonClass = sessionStorage.getItem("currentUser").toLowerCase() == reviewer.toLowerCase() ? "d-flex flex-row-reverse" : "d-none d-flex flex-row-reverse";

        this.review = `<div class="container-fluid ml-5 p-2 border border-secondary rounded mb-2">
        <div class="d-flex justify-content-start align-items-center">
            <p class="text-muted m-0 p-0">Review by <strong class="text-light p-1">${reviewer}</strong></p>
            <p class="m-0 p-2"><span>${stars}</span></p>
        </div>
        <div style="text-indent: 1.5rem;">
            <p>${review}</p>
        </div>
        <div class="${buttonClass}">
            <button class="btn btn-outline-danger m-1 px-3" id="deleteReview${id}">Delete</button>
            <button class="btn btn-outline-success m-1 px-3" id="updateReview${id}" data-bs-toggle="modal"
                data-bs-target="#updateReviewModal${id}">Edit</button>
        </div>
        <div class="modal fade" id="updateReviewModal${id}" tabindex="-1" role="dialog"
            aria-labelledby="updateReviewModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content text-dark">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateReviewTitle${id}">Update Review</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form name="updateReviewForm" id="updateReviewForm${id}">
                            <div class="form-outline mb-4">
                                <label class="form-label" for="rating">New Rating</label>
                                <input class="form-control" type="number" id="rating${id}" min="1" max="10">
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="review">New Review</label>
                                <textarea id="review${id}" rows="4" class="form-control" minlength="10"></textarea>
                            </div>
                            <button type="submit" class="btn btn-success btn-block">Update Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }

}

document.querySelector("#createReviewForm").addEventListener('submit', createReview);


const reviewContainer = document.querySelector("#reviews")

const response = await request.Get(`movies/${sessionStorage.getItem("currentMovie")}/reviews`);
const data = await response.json()
if (!response.ok) {
    alert(data.message)
    console.error(data)
    location.href = "movies.html"
}

else {
    const idList = data.map(input => input.id);
    data.forEach(async movieReview => {
        const resp = await request.Get(`reviews/${movieReview.id}`) //NOT CHECKING FOR VALIDITY BECAUSE DATA CAME FROM API
        const { id, review, rating, reviewer } = await resp.json()
        const reviewObj = new reviewTemplate(id, reviewer.username, rating, review);
        reviewContainer.innerHTML += reviewObj.review;

    });

    setTimeout(() => {
        for (const idx of idList) {
            document.querySelector(`#deleteReview${idx}`).addEventListener('click', (e) => {
                e.preventDefault();
                deleteReview(idx);
            })
            document.querySelector(`#updateReviewForm${idx}`).addEventListener('submit', (e) => {
                e.preventDefault();
                updateReview(idx);
            })
        }
    }, 100)


}

async function createReview(e) {
    e.preventDefault();

    //VALIDATE INPUT
    const rating = Number(document.querySelector("#rating").value.trim());
    const review = document.querySelector("#review").value.trim();

    if (review.length < 11) {
        alert("Review should be more than 10 characters!");
        document.querySelector("#review").focus();
        return;
    }
    const response = await request.Post("reviews", {
        rating: rating,
        review: review,
        movieId: sessionStorage.getItem("currentMovie"),
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
        console.log(data);
        location.reload();
    }

}
async function deleteReview(id) {
    const res = await request.Del(`reviews/${id}`)


    if (!res.ok) {
        const data = await res.json()
        console.error(data.error);
        alert(data.message)
        location.reload()
    }
    else {
        location.reload();

    }
}

async function updateReview(id) {
    // DO WITH MODAL OR MAKE IT EDITABLE
    const rating = document.querySelector(`#rating${id}`).value.trim()
    const review = document.querySelector(`#review${id}`).value.trim()

    const data = {}
    if (rating) {
        data["rating"] = rating
    }
    if (review) {
        data["review"] = review
    }

    const res = await request.Patch(`reviews/${id}`, data);
    if (!res.ok) {
        const resData = await res.json();
        if (resData.message.constructor === Array) {
            alert(resData.message[0])
        } else {
            alert(resData.message)
        }
        location.reload()
    }
    else {
        location.reload();

    }

}
