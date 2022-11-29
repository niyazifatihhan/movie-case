const urlSearchParams = new URLSearchParams(window.location.search); /// url üzerinden query alıyor ?id=1018403&type=movie
const params = Object.fromEntries(urlSearchParams.entries()); /// gelen arrayi objeje çeviriyor ['id', '1018403']
const placeholder = "https://i.stack.imgur.com/yZlqh.png"
const getDetails = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=145ee673e96692552854699788fb94fc`)
  const json = await response.json()
  const title = document.getElementById("title")
  title.innerText = json.title
  const overview = document.getElementById("overview")
  overview.innerText = json.overview
  const release_date = document.getElementById("published_at")
  release_date.innerText = json.release_date
  const voters = document.getElementById("voter-count")
  voters.innerText = `/ ${json.vote_count}`


  const genres = document.querySelector(".genres")
  json.genres.forEach(genre => {
    genres.innerHTML += `<div class="genre-chip">${genre.name}</div>`
  })
  const vote = document.getElementById("vote")
  vote.innerText = (json.vote_average || 0).toFixed(1)
  const movie_image = document.querySelector("#movie-image")
  movie_image.src = "https://image.tmdb.org/t/p/w500" + json.poster_path
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
const getCredits = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=145ee673e96692552854699788fb94fc`)
  const json = await response.json()
  console.log(json)
  const castList = document.querySelector(".cast")
  json.cast.slice(0, 10).forEach(cast => {
    castList.innerHTML += `<div class="company-card">
         <img class="company-logo" src="${cast?.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : placeholder}" alt="">
         <p class="company-name">
           ${cast.name}
         </p>
         <p class="cast-subtitle">
           ${cast.known_for_department}
         </p>
       </div>`
  })
}
getDetails()
getCredits()

// shadow https://getcssscan.com/css-box-shadow-examples