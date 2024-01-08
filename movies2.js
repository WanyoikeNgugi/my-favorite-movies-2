let movies = [];

let movieform = document.getElementById("movieform");
let movieTable = document.createElement("table");
let movieTableHead = document.createElement("thead");
let movieTableHeadRow = document.createElement("tr");
let movieTableHeaderHeading1 = document.createElement("th");
let movieTableHeaderHeading2 = document.createElement("th");
let movieTableHeaderHeading3 = document.createElement("th");
let movieTableHeaderHeading4 = document.createElement("th");

movieTableHeaderHeading1.innerHTML = "Image";
movieTableHeaderHeading2.innerHTML = "Title";
movieTableHeaderHeading3.innerHTML = "Rating";
movieTableHeaderHeading4.innerHTML = "";

movieTable.setAttribute("class", "table table-striped");

movieTableHead.appendChild(movieTableHeadRow);

movieTableHeadRow.appendChild(movieTableHeaderHeading1);

movieTableHeadRow.appendChild(movieTableHeaderHeading2);

movieTableHeadRow.appendChild(movieTableHeaderHeading3);

movieTableHeadRow.appendChild(movieTableHeaderHeading4);

movieTable.appendChild(movieTableHead);

document.getElementById("table").appendChild(movieTable);

function createMovieCellElementsAndAttachEvents(row, title, img, rating) {
  let imgCell = document.createElement("td");
  let titleCell = document.createElement("td");
  let ratingCell = document.createElement("td");
  let deleteCell = document.createElement("td");
  let imageElement = document.createElement("img");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.classList.add("btn", "btn-sm", "btn-danger");
  Object.assign(deleteButton.style, {
    backgroundColor: "red",
    borderRadius: "5px",
    boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
  });

  addDeleteEvent(deleteButton);
  deleteCell.appendChild(deleteButton);
  deleteCell.classList.add("align-middle");

  setCellContent(
    titleCell,
    imgCell,
    ratingCell,
    imageElement,
    title,
    img,
    rating
  );
  addImageCellEvents(imgCell);
  row.appendChild(imgCell);
  row.appendChild(titleCell);
  row.appendChild(ratingCell);
  row.appendChild(deleteCell);
}

function setCellContent(
  titleCell,
  imageCell,
  ratingCell,
  imageEl,
  title,
  image,
  rating
) {
  imageEl.src = image;
  imageEl.alt = "image not found";
  imageEl.width = 70;
  imageEl.classList.add("img-thumbnail");

  titleCell.classList.add("align-middle");

  ratingCell.setAttribute("class", "align-middle");

  titleCell.innerHTML = title;

  let ratingSpanThumbsUp = document.createElement("span");
  ratingSpanThumbsUp.classList.add("fa");
  ratingSpanThumbsUp.classList.add("fa-thumbs-up");
  ratingSpanThumbsUp.style.padding = "10px";

  let ratingSpanThumbsDown = document.createElement("span");
  ratingSpanThumbsDown.classList.add("fa");
  ratingSpanThumbsDown.classList.add("fa-thumbs-down");

  let ratingSpanNumber = document.createElement("span");
  ratingSpanNumber.style.cssText = "font-size:20px;";
  ratingSpanNumber.innerHTML = rating;
  ratingSpanNumber.style.padding = "10px";

  increaseRating(ratingSpanThumbsUp);
  decreaseRating(ratingSpanThumbsDown);
  ratingCell.appendChild(ratingSpanThumbsUp);
  ratingCell.appendChild(ratingSpanThumbsDown);
  ratingCell.appendChild(ratingSpanNumber);

  imageCell.appendChild(imageEl);
}
const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

function hideShowElement(el) {
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

document.getElementById("new-movie").addEventListener("click", function () {
  let el = document.getElementById("new-movie-form");
  hideShowElement(el);
});

function addImageCellEvents(imgCell) {
  imgCell.addEventListener("mouseover", function () {
    imgCell.childNodes[0].width = 90;
  });
  imgCell.addEventListener("mouseout", function () {
    imgCell.childNodes[0].width = 70;
  });
}
//================================= Add event to delete row
function addDeleteEvent(button) {
  button.addEventListener("click", function (event) {
    let row = event.target.closest("tr");

    const indexOfMovie = storedMovies.indexOf(row);
    storedMovies.splice(indexOfMovie, 1);
    localStorage.setItem("movies", JSON.stringify(storedMovies));
    if (row) {
      row.parentNode.removeChild(row);
    }
  });
}

/*function addDeleteEvent(button) {
  button.addEventListener("click", function (event) {
    let row = event.target.closest("tr");

    if (row) {
      movieTable.removeChild(row);
    }
  });
}
*/
function increaseRating(ratingSpanThumbsUp) {
  ratingSpanThumbsUp.addEventListener("click", function (event) {
    let numberRating = ratingSpanThumbsUp.nextSibling.nextSibling;
    let newRating = Number(numberRating.innerHTML) + 1;
    numberRating.innerHTML = newRating;
  });
}

function decreaseRating(ratingSpanThumbsDown) {
  ratingSpanThumbsDown.addEventListener("click", function (event) {
    let numberRating = ratingSpanThumbsDown.nextSibling;
    let newRating = Number(numberRating.innerHTML) - 1;
    numberRating.innerHTML = newRating;
  });
}

let body = document.createElement("tbody");
movieTable.appendChild(body);
movies.forEach(function (movie) {
  let row = document.createElement("tr");
  createMovieCellElementsAndAttachEvents(
    row,
    movie.title,
    movie.img,
    movie.rating
  );
  body.appendChild(row);
});

const addMovie = (event) =>
  movieform.addEventListener("submit", function (event) {
    event.preventDefault();

    let title = movieform[0].value;
    let imgsrc = movieform[1].value;
    console.log(imgsrc);
    let rating = movieform[2].value;

    if (imgsrc == "" || title == "" || rating == "") {
      document.getElementById("status").innerHTML =
        "OOPS! Please fill in all the fields.";
    } else {
      document.getElementById("status").innerHTML = "";
      let row = document.createElement("tr");
      createMovieCellElementsAndAttachEvents(
        row,
        movieform[0].value,
        movieform[1].value,
        movieform[2].value
      );

      movieTable.insertBefore(row, movieTable.childNodes[0]);
      let newMovie = { title: title, img: imgsrc, rating: rating };
      storedMovies.push(newMovie);
      localStorage.setItem("movies", JSON.stringify(storedMovies));
      movieform.reset();

      movieform[0].value = "";
      movieform[1].value = "";
      movieform[2].value = "";

      hideShowElement(document.getElementById("new-movie-form"));
    }
  });
function renderMovies() {
  storedMovies.forEach(function (movie) {
    let row = document.createElement("tr");
    createMovieCellElementsAndAttachEvents(
      row,
      movie.title,
      movie.img,
      movie.rating
    );
    body.appendChild(row);
  });
}

// Load movies from local storage when the window loads
window.onload = function () {
  if (storedMovies.length > 0) {
    renderMovies();
  }
};

const slideshow = document.querySelector(".slideshow");
const images = document.querySelectorAll(".slideshow img");
let currentImageIndex = 0;
const slideWidth = slideshow.clientWidth;
const slideInterval = 3000;

function slideImages() {
  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;

    images.forEach((img, index) => {
      let position = (index - currentImageIndex) * slideWidth;
      img.style.transition = "transform 1s ease";
      img.style.transform = `translateX(${position}px)`;
    });
  }, slideInterval);
}

slideImages();

const slideShowTransition = document.getElementById("slideShowTransition");
slideShowTransition.style.opacity = "0";
let opacityValue = 0;

function fadeIn() {
  if (opacityValue < 1) {
    opacityValue += 0.01;
    slideShowTransition.style.opacity = opacityValue;
    setTimeout(fadeIn, 10);
  }
}
fadeIn();

const contentContainer = document.querySelector(".content-container");
const scrollLeftButton = document.querySelector(".scroll-left-button");
const scrollRightButton = document.querySelector(".scroll-right-button");

scrollLeftButton.addEventListener("click", () => {
  const containerWidth =
    contentContainer.scrollWidth - contentContainer.clientWidth;
  contentContainer.scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

scrollRightButton.addEventListener("click", () => {
  const containerWidth =
    contentContainer.scrollWidth - contentContainer.clientWidth;
  contentContainer.scrollTo({
    left: containerWidth,
    behavior: "smooth",
  });
});
