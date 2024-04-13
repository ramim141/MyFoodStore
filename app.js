const loadData = (global) => {

    const searchText = document.getElementById("search-box").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText ? searchText : global}`)
        .then(res => res.json())
        .then((data) => DisplayData(data.meals));
}

const DisplayData = (data) => {
    document.getElementById("total-meals").innerText = data.length;

    const mealsContainer = document.getElementById("meals-container");

    data.forEach(meal => {
        const card = document.createElement("div");
        console.log(card);
        card.classList.add("box");
        card.innerHTML = `
        <img class="img-box" src=${meal.strMealThumb} alt="">
        <h2>${meal?.strMeal}</h2>
        <p>${meal.strInstructions.slice(0, 20)}</p>
        <button onclick="displayModal('${meal.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Details
    </button>
        `;

        mealsContainer.appendChild(card);
    });
};


const displayModal = async (id) => {

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        console.log(data.meals[0]);
        const modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `
        <h2>${data.meals[0].strMeal}</h2>
        <p>${data.meals[0].strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            <li>${data.meals[0].strIngredient1}</li>
            <li>${data.meals[0].strIngredient2}</li>
            <li>${data.meals[0].strIngredient3}</li>
        </ul>

        `
    }
    catch {
        (err) => {
            console.log(err);
        };
    }
};

loadData("a");