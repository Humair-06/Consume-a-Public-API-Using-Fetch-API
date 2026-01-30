// Function to fetch country data from the API
function getCountryData() {
  const countryName = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");
  const loadingText = document.getElementById("loading");


  resultDiv.innerHTML = "";
  loadingText.textContent = "";

  
  if (countryName === "") {
    resultDiv.innerHTML = "<p class='error'>Please enter a country name.</p>";
    return;
  }

  // Show loading indicator while data is being fetched
  loadingText.textContent = "⏳ Fetching data... Please wait.";

  // Fetch data from REST Countries API
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
     
      if (!response.ok) {
        throw new Error("Country not found or network issue.");
      }
      return response.json(); // Convert response to JSON format
    })
    .then(data => {
    
      const country = data[0];

      // Extract required fields
      const name = country.name.common;
      const capital = country.capital ? country.capital[0] : "N/A";
      const population = country.population.toLocaleString();
      const flag = country.flags.png;

      // Display data dynamically using DOM manipulation
      resultDiv.innerHTML = `
        <h3>${name}</h3>
        <img src="${flag}" width="150"><br>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
      `;
    })
    .catch(error => {
      // Handle errors like network failure or invalid country
      resultDiv.innerHTML = `<p class='error'>❌ ${error.message}</p>`;
    })
    .finally(() => {
    
      loadingText.textContent = "";
    });
}

/*
ASYCHRONOUS BEHAVIOR EXPLAINED:
 fwtch() runs asynchronously, meaning it does not block the page.
 .then() runs when the server responds.
 .catch() runs if there is an error (network issue, wrong country name).
.finally() runs at the end no matter what.
*/