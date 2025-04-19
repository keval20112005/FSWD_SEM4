// Initialize an array to hold movie objects
let movieCollection = [];

// Function to add a new movie to the collection
function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const year = parseInt(document.getElementById('year').value);

    if (title && genre && !isNaN(rating) && !isNaN(year)) {
        const movie = { title, genre, rating, year };
        movieCollection.push(movie);
        alert('Movie added successfully!');
        clearInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

// Function to clear input fields after adding a movie
function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('year').value = '';
}

// Function to list all movies
function listMovies() {
    const output = document.getElementById('movie-list');
    output.innerHTML = ''; // Clear previous list
    movieCollection.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `${movie.title} - ${movie.genre} - Rating: ${movie.rating} - Year: ${movie.year}`;
        output.appendChild(listItem);
    });
}

// Function to list movies by a specific genre
function listMoviesByGenre() {
    const genre = prompt('Enter the genre to filter by:');
    const filteredMovies = movieCollection.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    displayMovies(filteredMovies);
}

// Function to find the highest-rated movie
function findHighestRated() {
    const highestRated = movieCollection.reduce((max, movie) => (movie.rating > max.rating ? movie : max), movieCollection[0]);
    const output = document.getElementById('movie-list');
    output.innerHTML = `<li>The highest rated movie is: ${highestRated.title} with a rating of ${highestRated.rating}</li>`;
}

// Function to list movies released after a specific year
function listMoviesAfterYear() {
    const year = parseInt(prompt('Enter the year to filter movies released after:'));
    const filteredMovies = movieCollection.filter(movie => movie.year > year);
    displayMovies(filteredMovies);
}

// Helper function to display movies in the output area
function displayMovies(movies) {
    const output = document.getElementById('movie-list');
    output.innerHTML = ''; // Clear previous list
    if (movies.length > 0) {
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movie.title} - ${movie.genre} - Rating: ${movie.rating} - Year: ${movie.year}`;
            output.appendChild(listItem);
        });
    } else {
        output.innerHTML = '<li>No movies found.</li>';
    }
}

// Example of using map() to create a list of all movie titles
function getMovieTitles() {
    const titles = movieCollection.map(movie => movie.title);
    console.log('Movie Titles:', titles.join(', '));
}
