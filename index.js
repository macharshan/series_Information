const searchField = document.querySelector(`#searchField`)

const movieSection = document.querySelector(`#movieSection`)
const poster = document.querySelector(`#moviePoster`)
const movie = document.querySelector(`#movie`) 
const ott = document.querySelector(`#OTT`) 
const type = document.querySelector(`#type`)
const languages = document.querySelector(`#languages`)
const genres = document.querySelector(`#genres`)
const rating = document.querySelector(`#rating`)
const summary = document.querySelector(`#summary`)

const p = document.createElement(`p`)
const form = document.querySelector(`form`)

function titleSizing(){
    document.querySelector(`#headerMain`).style.fontSize = `3rem`
}

function formSizing(){
    form.style.fontSize = `2.5rem`
}

function displayMovieSection(){
    const movieSection = document.querySelector(`#movieSection`)

    movieSection.style.width = `90vw`
    movieSection.style.height = `fit-content`
    // movieSection.style.height = `fit-content`

}

document.querySelector(`#searchButton`)
.addEventListener(`click`, function(e){
    e.preventDefault();
    
    const searchTerm = searchField.value
    if(!searchTerm || searchTerm == ` `){
        p.append(document.createTextNode(`Enter a series name`))
        form.append(p)
        searchField.value = ``

    } else{
        fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            document.querySelector(`#contents`).style.width = `90vw`
            document.querySelector(`#contents`).style.height = `auto`
            titleSizing()
            formSizing()
            displayMovieSection()

            poster.style.backgroundImage = `url(${data[0].show.image.original})`
            movie.innerHTML = `<h2 class = "movieTitle">${data[0].show.name}</h2>`
            ott.innerHTML = `<h2>OTT: <a href="${data[0].show.officialSite}">${data[0].show.webChannel.name}</a></h2>`
            type.innerHTML = `<h2>Type: ${data[0].show.type}</h2>`
            languages.innerHTML = `<h2>Languages: ${data[0].show.language} (Original)</h2>`
            genres.innerHTML = `<h2>Genres: ${data[0].show.genres}</h2>`
            rating.innerHTML = `<h2>Rating: ${data[0].show.rating.average}</h2>`
            summary.innerHTML = `<h2>Summary:-<br> ${data[0].show.summary}</h2>`
            searchField.value =``
            form.removeChild(p)
        })
        .catch(function(error){
            p.append(document.createTextNode(`Error : Something Went Wrong`))
        })
    }
})