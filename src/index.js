import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function displayCatInfo(catData) {
  catInfo.innerHTML = `
    <img src="${catData[0].url}" alt="Cat">
    <h2>${catData[0].breeds[0].name}</h2>
    <p><strong>Description:</strong> ${catData[0].breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData[0].breeds[0].temperament}</p>
  `;
  catInfo.style.display = "block";
}

breedSelect.addEventListener("change", async event => {
  const selectedBreedId = event.target.value;

  loader.style.display = "block";
  catInfo.style.display = "none";
  error.style.display = "none"

  try {
    const catData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catData);
  } catch (error) {
    console.error("Error fetching cat data:", error);
    error.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
});

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    loader.style.display = "none";
    error.style.display = "none"
    breedSelect.style.display = "block";
  })
  .catch(err => {
    loader.style.display = "none";
    error.style.display = "block";
    console.error("Error fetching breeds:", err);
  });

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}