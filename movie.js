const urlSearchParams = new URLSearchParams(window.location.search); /// url üzerinden query alıyor ?id=1018403&type=movie
const params = Object.fromEntries(urlSearchParams.entries()); /// gelen arrayi objeje çeviriyor ['id', '1018403']

const getDetails = async ( ) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=145ee673e96692552854699788fb94fc`)
  const json = await response.json()
  const title = document.getElementById("title")
  title.innerText = json.title
  const overview = document.getElementById("overview")
  overview.innerText = json.overview
  const genres = document.querySelector(".genres")
  json.genres.forEach(genre => {
    genres.innerHTML += `<div class="genre-chip">${genre.name}</div>`
  })
  const vote = document.getElementById("vote")
  vote.innerText = json.vote_average
  const movie_image = document.querySelector("#movie-image")
  movie_image.src = "https://image.tmdb.org/t/p/w500"+ json.poster_path
  const companies = document.querySelector(".companies")
  json.production_companies.forEach(company => {
    companies.innerHTML += `<div class="company-card">
         <img class="company-logo" src="https://image.tmdb.org/t/p/w500${company.logo_path}" alt="">
         <p class="company-name">
           ${company.name}
         </p>
       </div>`
  })
}

getDetails()

// shadow https://getcssscan.com/css-box-shadow-examples