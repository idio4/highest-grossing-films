async function loadFilms() {
    const response = await fetch("data/films_data.json");
    let films = await response.json();

    function formatBoxOffice(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    function displayFilms(films) {
        const filmList = document.getElementById("film-list");
        filmList.innerHTML = "";
        films.forEach(film => {
            const card = document.createElement("div");
            card.className = "film-card";
            card.innerHTML = `
                <h3>${film.title} (${film.release_year})</h3>
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Box Office:</strong> ${formatBoxOffice(film.box_office)}</p>
            `;
            card.addEventListener("click", () => showFilmDetails(film));
            filmList.appendChild(card);
        });
    }

    function showFilmDetails(film) {
        const modal = document.getElementById("modal");
        const filmDetails = document.getElementById("film-details");
        filmDetails.innerHTML = `
            <h2>${film.title} (${film.release_year})</h2>
            <p><strong>Director:</strong> ${film.director}</p>
            <p><strong>Box Office:</strong> ${formatBoxOffice(film.box_office)}</p>
            <p><strong>Country:</strong> ${film.country}</p>
        `;
        modal.style.display = "block";
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

    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    });

    displayFilms(films);
}

loadFilms();