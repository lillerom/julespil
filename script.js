// Liste over positive ord som giver point
    const goodWords = ["🎄","🧑‍🎄","🎁","🍗","☃️"]; // Gode ord
    // Liste over negative ord som mister point
    const badWords = ["⛱️","🦋","👙","🩴"]; // Dårlige ord
    // Variabel til at tælle spillerens point
    let score = 0; // Starter med 0 point


    // Funktion der opdaterer pointene
    function updateScore(points) { // Modtager antal point der skal lægges til
      score += points; // Lægger pointene til den nuværende score
      document.getElementById("scoreboard").textContent = `Point: ${score}`; // Viser den nye score på skærmen
    } // Slutter funktionen


    // Funktion der laver nye ord
    function createWord() { // Starter funktionen
      // Bestemmer tilfældigt om ordet skal være godt eller dårligt
      const isGood = Math.random() < 0.5; // 50% chance for godt ord
      // Vælger et tilfældigt ord fra enten goodWords eller badWords
      const wordText = isGood // Hvis ordet er godt
        ? goodWords[Math.floor(Math.random() * goodWords.length)] // tag et tilfældigt godt ord
        : badWords[Math.floor(Math.random() * badWords.length)]; // ellers tag et tilfældigt dårligt ord


      // Laver et nyt HTML-element til ordet
      const word = document.createElement("div"); // Laver en ny div




word.className = `word ${isGood ? "good" : "bad"}`; // Sætter klassen til enten "good" eller "bad"
      word.textContent = wordText; // Teksten bliver ordet vi valgte
      word.style.left = Math.random() * (window.innerWidth - 100) + "px"; // Ordet starter på et tilfældigt sted horisontalt
      word.style.top = "-30px"; // Ordet starter over skærmen (øverst)


      // Tilføjer ordet til siden
      document.body.appendChild(word); // Sætter ordet ind på siden


      // Variable til at lave ord der falder ned
      let top = -30; // Ordet starter 30 piksler over skærmen
      const fallSpeed = 1 + Math.random() * 2; // Hastigheden er tilfældig mellem 1 og 3 piksler per frame


      // Timer der får ordet til at falde ned
      const interval = setInterval(() => { // Hver 20 millisekunder
        top += fallSpeed; // Ordet falder ned en smule
        word.style.top = top + "px"; // Ordet bevæges ned på skærmen


        // Hvis ordet falder under skærmen
        if (top > window.innerHeight) { // når ordet er faldet helt ned
          clearInterval(interval); // Stopper timeren
          word.remove(); // Fjerner ordet fra siden
        }
      }, 20); // 20 millisekunder mellem hver bevægelse


      // Gør det muligt at klikke på ordet
      word.addEventListener("click", () => { // når man klikker på ordet
        updateScore(isGood ? 1 : -1); // giver +1 point for godt ord, -1 for dårligt
        clearInterval(interval); // Stopper ordet fra at falde
        word.remove(); // Fjerner ordet fra siden
      });
    } // Slutter funktionen


    // Starter spillet ved at lave nye ord hver sekund
    setInterval(createWord, 1000); // Kalder createWord funktionen hver 1000 millisekunder (hvert sekund)
  