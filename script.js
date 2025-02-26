async function loadFilms() {
    const response = await fetch("data/films_data.json");
    let films = await response.json();

    function displayFilms(films) {
        const filmList = document.getElementById("film-list");
        filmList.innerHTML = "";
        films.forEach(film => {
            const card = document.createElement("div");
            card.className = "film-card";
            card.innerHTML = `
                <h3>${film.title} (${film.release_year})</h3>
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Box Office:</strong> $${film.box_office}</p>
            `;
            filmList.appendChild(card);
        });
    }

    document.getElementById("search").addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const filtered = films.filter(film => film.title.toLowerCase().includes(query));
        displayFilms(filtered);
    });

    document.getElementById("sort").addEventListener("change", function () {
        const key = this.value;
        films.sort((a, b) => a[key] > b[key] ? 1 : -1);
        displayFilms(films);
    });

    displayFilms(films);
}

loadFilms();