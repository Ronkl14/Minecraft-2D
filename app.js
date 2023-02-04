// ------------------------------------------------- Imports -------------------------------------------------------------

import { world1, world2, world3, world4, world5 } from "./worlds.js";
import {
  background,
  dirt,
  dirtGrass,
  sand,
  stone,
  wood,
  leaf,
  cloud,
  pumpkin,
} from "./tiles.js";

// ------------------------------------------------- Variables -------------------------------------------------------------

const tileGrid = document.querySelector(".blocks");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");
const thanos = document.querySelector(".thanos");
const inventoryButton = document.querySelector(".inventory");
const save = document.querySelector(".save");
const reset = document.querySelector(".reset");
const load = document.querySelector(".load");
const start = document.querySelector(".start");
const splash = document.querySelector(".splash-screen");

let currTool, currWorld, removedFromInventory;
let inventory = [];

// ------------------------------------------------- Functions -------------------------------------------------------------

function selectWorld() {
  const randomNum = Math.ceil(Math.random() * 5);
  switch (randomNum) {
    case 1:
      currWorld = world1;
      return;
    case 2:
      currWorld = world2;
      return;
    case 3:
      currWorld = world3;
      return;
    case 4:
      currWorld = world4;
      return;
    case 5:
      currWorld = world5;
      return;
    default:
      return;
  }
}

function numToTile(num) {
  switch (num) {
    case 0:
      return background;
    case 1:
      return dirt;
    case 2:
      return dirtGrass;
    case 3:
      return wood;
    case 4:
      return leaf;
    case 5:
      return stone;
    case 6:
      return sand;
    case 7:
      return cloud;
    case 8:
      return pumpkin;
    default:
      return "";
  }
}

function checkMatch(tile, currTool) {
  return tile.classList.contains(currTool) &&
    !tile.classList.contains("removed")
    ? true
    : false;
}

function removeTile(tile) {
  tile.classList.add("removed");
}

function addToInventory(tile) {
  let classArr = [tile.classList[0], tile.classList[1]];
  inventory.push(classArr);
  console.log(inventory);
}

function inventoryShowLast() {
  inventoryButton.classList.remove("removed");
  inventoryButton.classList.remove(inventoryButton.classList[1]);
  if (inventory.length > 0) {
    inventoryButton.classList.add(inventory[inventory.length - 1][0]);
  }
  console.log(inventoryButton);
}

function updateInventoryDisp() {
  removedFromInventory = inventory.pop();
  inventoryShowLast();
  if (inventory.length === 0) {
    inventoryButton.classList.add("removed");
  }
  console.log(inventory);
}

function insertTile(tile) {
  if (tile.classList[0] === "class" || tile.classList[2] === "removed") {
    updateInventoryDisp();
    tile.classList.remove(...tile.classList);
    tile.classList.add(removedFromInventory[0]);
    tile.classList.add(removedFromInventory[1]);
  }
}

function addListeners(tileDiv) {
  tileDiv.addEventListener("click", function (event) {
    if (checkMatch(event.target, currTool)) {
      removeTile(event.target);
      addToInventory(event.target);
      inventoryShowLast();
    }
    if (currTool === "inventory") {
      insertTile(event.target);
    }
    console.log(event.target);
  });
}

function createWorld(world) {
  for (let i = 0; i < world.length; i++) {
    for (let j = 0; j < world[i].length; j++) {
      const tileDiv = createTile(world, i, j);
      addListeners(tileDiv);
    }
  }
}

function createTile(world, rows, cols) {
  const currentTile = numToTile(world[rows][cols]);
  const tileDiv = document.createElement("div");
  tileGrid.appendChild(tileDiv);
  tileDiv.style.gridRowStart = rows + 1;
  tileDiv.style.gridRowEnd = rows + 2;
  tileDiv.style.gridColumnStart = cols + 1;
  tileDiv.style.gridColumnEnd = cols + 2;
  tileDiv.classList.add(currentTile.class);
  tileDiv.classList.add(currentTile.tool);
  return tileDiv;
}

// ------------------------------------------------- Event Listeners -------------------------------------------------------------

start.addEventListener("click", function () {
  splash.classList.add("hide");
});

axe.addEventListener("click", function () {
  currTool = "axe";
  console.log(currTool);
});

shovel.addEventListener("click", function () {
  currTool = "shovel";
  console.log(currTool);
});

pickaxe.addEventListener("click", function () {
  currTool = "pickaxe";
  console.log(currTool);
});

thanos.addEventListener("click", function () {
  currTool = "thanos";
  console.log(currTool);
  let divs = tileGrid.querySelectorAll(
    "div:not(.removed):not(.class):not(.cloud)"
  );
  const numberToRemove = Math.ceil(divs.length / 2);
  let counter = 0;
  let i = 0;

  function removeNextDiv() {
    if (i >= divs.length || counter >= numberToRemove) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * divs.length);
    divs[randomIndex].classList.add("removed");
    counter++;
    i++;

    setTimeout(removeNextDiv, 200);
  }

  removeNextDiv();
});

inventoryButton.addEventListener("click", function () {
  currTool = "inventory";
  console.log(currTool);
});

reset.addEventListener("click", function () {
  tileGrid.textContent = "";
  inventory = [];
  inventoryButton.classList.add("removed");
  console.log(inventoryButton);
  createWorld(currWorld);
});

save.addEventListener("click", function () {
  localStorage.setItem("progress", tileGrid.innerHTML);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  localStorage.setItem("inventoryBTN", inventoryButton.classList);
});

load.addEventListener("click", function () {
  tileGrid.innerHTML = localStorage.getItem("progress");
  for (let i = 0; i < tileGrid.children.length; i++) {
    addListeners(tileGrid.children[i]);
  }
  inventory = JSON.parse(localStorage.getItem("inventory"));
  inventoryButton.classList = localStorage.getItem("inventoryBTN");
  console.log(inventoryButton);
});

// ------------------------------------------------- Run App -------------------------------------------------------------

selectWorld();
createWorld(currWorld);

console.log(divs);
