const getMovies = async () => {
  const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=145ee673e96692552854699788fb94fc&page=1") // sunucudan verinin gelmesini bekliyoruz
  const json = await data.json() // json objesine ceviriyoruz

  const movies = document.getElementById("movies")
  //console.log(json)

  const first = json.results.sort((m1, m2) => m2.vote_average - m1.vote_average)[0] // gelen veriyi sort ediyoruz, daha sonrasında en yüksek puanı olanı seçiyoruz [1,2,3]
  //poster sol alan başlangıç
  const card1 = document.getElementById("c-1")
  card1.innerHTML = `
    <div onclick="gotoMovie(${first.id}, 'movie')" class="card">
    <div class="card-h-r">
      <div class="card-header card-header-white">
        ${first.vote_average}/10
      </div>
    </div>
    <div class="card-body">
      <img src="https://image.tmdb.org/t/p/w500${first.poster_path}" class="card-image">
      <div class="card-title">
        ${first.title}
      </div>
    </div>
  </div>
  `
  //poster sol alan bitiş 

  //movies alanı
  json.results.sort((m1, m2) => m2.vote_average - m1.vote_average).slice(0, 8).forEach((movie) => {
    movies.innerHTML += `
    <div onclick="gotoMovie(${movie.id}, 'movie')" class="card">
    <div class="card-h-r">
      <div class="card-header">
        ${movie.vote_average}/10
      </div>
    </div>
    <div class="card-body">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-image">
      <div class="card-title">
        ${movie.title}
      </div>
    </div>
  </div>
  `
  })

}
// arrow function () => {}
// async await -> promise
const getSeries = async () => {
  const data = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=145ee673e96692552854699788fb94fc&page=1")
  const json = await data.json()
  const series = document.getElementById("series")
  //poster sağ alan başlangıç
  const first = json.results.sort((s1, s2) => s2.vote_average - s1.vote_average)[0]
  const card2 = document.getElementById("c-2")

  card2.innerHTML = `
    <div onclick="gotoSerie(${first.id}, 'series')" class="card">
    <div class="card-h-r">
      <div class="card-header card-header-white">
        ${first.vote_average}/10
      </div>
    </div>
    <div class="card-body">
      <img src="https://image.tmdb.org/t/p/w500${first.poster_path}" class="card-image">
      <div class="card-title">
        ${first.name}
      </div>
    </div>
  </div>
  `
  //poster sağ alan bitişi

  //diziler
  json.results.sort((s1, s2) => s2.vote_average - s1.vote_average).slice(0, 8).forEach((movie) => {
    series.innerHTML += `
<div onclick="gotoSerie(${movie.id}, 'series')"  class="card">
    <div class="card-h-r">
      <div class="card-header">
        ${movie.vote_average}/10
      </div>
    </div>
    <div class="card-body">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-image">
      <div class="card-title">
        ${movie.name}
      </div>
    </div>
  </div>
  `
  })

}

getMovies()
getSeries()

const gotoMovie = (id, type) => {
  window.location = `/movie.html?id=${id}&type=${type}`
}
const gotoSerie = (id, type) => {
  window.location = `/serie.html?id=${id}&type=${type}`
}
