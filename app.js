import { world1 } from "./worlds.js";

const tileGrid = document.querySelector(".blocks");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");
const inventoryButton = document.querySelector(".inventory");

let currTool;
let inventory = [];
let removedFromInventory;

const background = {
  tool: "tool",
  class: "class",
};

const dirt = {
  tool: "shovel",
  class: "dirt",
};

const dirtGrass = {
  tool: "shovel",
  class: "dirt-grass",
};

const sand = {
  tool: "shovel",
  class: "sand",
};

const stone = {
  tool: "pickaxe",
  class: "stone",
};

const wood = {
  tool: "axe",
  class: "tree",
};

const leaf = {
  tool: "axe",
  class: "leaf",
};

const cloud = {
  tool: "tool",
  class: "cloud",
};

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

function checkMatch(tile, currTool) {
  return tile.classList.contains(currTool) ? true : false;
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
  console.log(inventoryButton);
  inventoryButton.classList.remove(inventoryButton.classList[1]);
  inventoryButton.classList.add(inventory[inventory.length - 1][0]);
}

function updateInventoryDisp(tile) {
  removedFromInventory = inventory.pop();
  inventoryShowLast();
}

function insertTile(tile) {
  console.log(tile.classList[0]);
  if (tile.classList[0] === "class" || tile.classList[2] ==="removed") {
    updateInventoryDisp();
    tile.classList.remove(...tile.classList);
    tile.classList.add(removedFromInventory[0]);
    tile.classList.add(removedFromInventory[1]);
  }
}

for (let i = 0; i < world1.length; i++) {
  for (let j = 0; j < world1[i].length; j++) {
    const currentTile = numToTile(world1[i][j]);
    const tileDiv = document.createElement("div");
    tileGrid.appendChild(tileDiv);
    tileDiv.style.gridRowStart = i + 1;
    tileDiv.style.gridRowEnd = i + 2;
    tileDiv.style.gridColumnStart = j + 1;
    tileDiv.style.gridColumnEnd = j + 2;
    tileDiv.classList.add(currentTile.class);
    tileDiv.classList.add(currentTile.tool);
    tileDiv.addEventListener("click", function (event) {
      console.log(event.target);
      if (checkMatch(event.target, currTool)) {
        removeTile(event.target);
        addToInventory(event.target);
        inventoryShowLast();
      }
      if (currTool === "inventory") {
        console.log(inventory);
        insertTile(event.target);
      }
    });
  }
}
