const urlSearchParams = new URLSearchParams(window.location.search); /// url üzerinden query alıyor ?id=1018403&type=movie
const params = Object.fromEntries(urlSearchParams.entries()); /// gelen arrayi objeje çeviriyor ['id', '1018403']
const placeholder = "https://i.stack.imgur.com/yZlqh.png"
const getDetails = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=145ee673e96692552854699788fb94fc`)
  const json = await response.json()
  console.log(json)
  const title = document.getElementById("title")
  title.innerText = json.name
  const overview = document.getElementById("overview")
  overview.innerText = json.overview
  const genres = document.querySelector(".genres")
  json.genres.forEach(genre => {
    genres.innerHTML += `<div class="genre-chip">${genre.name}</div>`
  })
  const release_date = document.getElementById("published_at")
  release_date.innerText = (json?.first_air_date || "Not Aired Yet")
  const last_aired = document.getElementById("last-air-date")
  last_aired.innerText = (json?.last_air_date || "Stil On Air")
  const voters = document.getElementById("voter-count")
  voters.innerText = `/ ${json.vote_count}`
  const vote = document.getElementById("vote")
  vote.innerText = json.vote_average
  const movie_image = document.querySelector("#movie-image")
  movie_image.src = "https://image.tmdb.org/t/p/w500" + json.poster_path
  const companies = document.querySelector(".companies")
  json.production_companies.forEach(company => {
    companies.innerHTML += `<div class="company-card">
         <img class="company-logo" src="${company?.logo_path ? `https://image.tmdb.org/t/p/w500${company.logo_path}` : placeholder}" alt="">
         <p class="company-name">
           ${company.name}
         </p>
       </div>`
  })
  const seasons = document.querySelector(".seasons")
  json.seasons.forEach(season => {
    seasons.innerHTML += `<div class="season-card">
          <img class="serie-image" src="https://image.tmdb.org/t/p/w500${season.poster_path}" alt="">
          <div class="serie-card-body">
            <h3>
              ${season.name} - ${season?.episode_count || 0} Episodes
            </h3>
            <p>
              ${season.overview}
            </p>
          </div>
        </div>`

  })
}
const getCredits = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/aggregate_credits?api_key=145ee673e96692552854699788fb94fc`)
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