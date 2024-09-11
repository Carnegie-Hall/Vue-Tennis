const form = document.getElementById("form");
const div = document.getElementById("profile");
console.log(form);

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  console.log("I was submitted");

  const newForm = {
    name: e.target.name.value,
    stats: e.target.stats.value,
    style: e.target.style.value,
    image: e.target.image.value,
  };

  console.log(newForm);
  newPlayer(newForm);

  e.target.reset();
}

function newPlayer(newForm) {
  fetch("http://localhost:3000/Players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newForm),
  })
    .then((resp) => resp.json())
    //   .then(player => console.log(player))
    .then((player) => showPlayer(player));
}

function showPlayer(player) {
  console.log(player);
  const addPlayer = document.createElement("img");
  const br = document.createElement("br");
  addPlayer.style.margin = "5px";

  addPlayer.addEventListener("mouseover", showBorder);
  addPlayer.addEventListener("mouseout", hideBorder);

  addPlayer.src = player.image;

  div.append(addPlayer);
  div.append(br);
}

fetch("http://localhost:3000/Players")
  .then((resp) => resp.json())
  .then((players) => {
    const filtered = players.filter((person) => person.stats >= 5);
    filtered.forEach((player) => {
      showPlayer(player);
    });
  });

// use debugger

// GOALS:
// 1. complete submit....done
// 2. POST ... done
// 3. create an area to display submitted data using dom...done
// list out all players with the same stat
// post newly submitted player data
// filter players by stat
// 4. DELETE
// 5. do border elements mouse over / mouse out

function showBorder(e) {
  e.target.style.border = "4px solid purple";
  console.log("hi");
}

function hideBorder(e) {
  e.target.style.border = "4px solid blue";

  e.target.style.border = "";
}
