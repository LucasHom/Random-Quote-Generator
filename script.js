const newQuoteButton = document.querySelector("#js-new-quote");
//const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const endpoint = "https://www.tronalddump.io/random/quote";
const tweetButton = document.querySelector("#js-tweet");

newQuoteButton.addEventListener("click", generateQuote);

const loadingSpinner = document.getElementById("js-spinner");

async function generateQuote() {
  //Try block exectutes statements in it as usual 
  //If an exception is thrown, the statements defined in the catch block will be executed
  loadingSpinner.classList.remove("hidden");
  newQuoteButton.disabled = true;
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(reponse.statusText);
    }
    else {
      const json = await response.json();
      console.log(json);
      const quote = json.value;
      console.log(quote);
      displayQuote(quote);
      setTweetButton(quote);
    }
  }
  catch(err) {
    console.log(err);
    alert("failed to fetch new quote")
  }
  finally {
    loadingSpinner.classList.add("hidden");
    newQuoteButton.disabled = false;
  }
  
  console.log("Generate Quote button was clicked");
}

function displayQuote(quote) {
  const quoteBox = document.getElementById("js-quote-text");
  quoteBox.textContent = quote;
}

function setTweetButton(quote) {
  tweetButton.setAttribute("href", `https://twitter.com/share?text=${quote} - Donald Trump`);
}