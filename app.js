// ------------------------------------------------- Imports -------------------------------------------------------------

import { world1 } from "./worlds.js";
import {
  background,
  dirt,
  dirtGrass,
  sand,
  stone,
  wood,
  leaf,
  cloud,
} from "./tiles.js";

// ------------------------------------------------- Variables -------------------------------------------------------------

const tileGrid = document.querySelector(".blocks");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");
const inventoryButton = document.querySelector(".inventory");
const save = document.querySelector(".save");
const reset = document.querySelector(".reset");
const load = document.querySelector(".load");

let currTool, removedFromInventory;
let inventory = [];

// ------------------------------------------------- Functions -------------------------------------------------------------

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

inventoryButton.addEventListener("click", function () {
  currTool = "inventory";
  console.log(currTool);
});

reset.addEventListener("click", function () {
  tileGrid.textContent = "";
  inventory = [];
  inventoryButton.classList.add("removed");
  console.log(inventoryButton);
  createWorld(world1);
});

save.addEventListener("click", function () {
  localStorage.setItem("progress", tileGrid.innerHTML);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  localStorage.setItem("inventoryBTN", inventoryButton.classList);
});

let classes = "blalala";
console.log(classes);

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

createWorld(world1);
