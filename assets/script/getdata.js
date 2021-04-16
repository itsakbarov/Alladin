document.querySelector('.search-input').addEventListener('keyup', () => {
    let searchValue = document.querySelector('.search-input').value
    const key = 'bb18b72f144594d22368e25f5a48f641';
    fetch(`https://api.themoviedb.org/3/movie/550?api_key=${key}`)
    .then(res =>  res.json())
    .then(movieData => {
        console.log(movieData);
        let para = document.createElement('p')
        para.innerHTML = movieData.data.original_title
        document.querySelector('.searched-movies').appendChild(para)
    })
})

// // const data = async () => {
// //     const res = await fetch(' http://api.tvmaze.com/search/shows?q=home')
// //      console.log(res)
// // }
// const elCreator = () => {
// res.map(movie => <div>{movie.name}</div>)
// }
