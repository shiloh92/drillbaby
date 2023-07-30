var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gridCanvas = document.getElementById("grid-canvas"); 
var gridCtx = gridCanvas.getContext("2d"); 

var myNFT = {};
// the player is treated as a ship unto itself for modularity
// DO NOT MOVE player object anywhere !!!

var player = {
  selectedNFT: null ,
  ship: "no ship",
  asset: "none",
  class: "none",
  minerals: { mog: 1, ils: 1, cel: 1 },
  temp_hold: 0,
  cargo_max: 1000
};

// function preload() {
//   // display pre login message
//   drawGrid(gridCtx);
//   // drawSystemOffline(gridCtx)
//   gridCanvas.style.zIndex = -1;
// }

function startGame() {
    if (player.selectedNFT) {
    player.class = player.selectedNFT.class;
  }
  asteroidArray = createStarSystem(1, 32);
  console.log(asteroidArray.length)
  createPlayerShip(); 
  createNPCFleet(24);
  drawGrid(gridCtx);
  // drawSystemOffline(gridCtx)
  drawAll(); 
}


function nextTask(ship, last_task) {
    switch (last_task) {
        case "moving": 
            ship.task_a="mining"; 
            break;
        case "mining":
            setMineDest(ship); 
            break;
        case "idle":  
            setIdleDest(ship);
            break;
        case "evading": 
            setEvadeDest(ship);
            break;
        case "repairing":
            setRepairDest(ship);
            break;
        case "interacting":
            setInteractDest(ship);
            break;
    }  
}
 
 
 function runSim(ship) {
  if(ship.task_a==='moving'){ 
    // Existing moving behavior
    var dx = ship.dest_x - ship.x;
    var dy = ship.dest_y - ship.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var speed = 1;
    ship.x += (dx / dist) * speed;
    ship.y += (dy / dist) * speed;   
  } else if(ship.task_a==='evading'){
    // Evading behavior 
  } else if(ship.task_a==='repairing'){
    // Repairing behavior 
  } else if(ship.task_a==='interacting'){
    // Interacting behavior 
  }
  ship.progress+=1;
  if(ship.progress>=100){
    ship.progress=0;
    nextTask(ship, ship.task_a)
  }
}


function setEvadeDest(ship) {
    // For evasion, identify the coordinates of the nearest potential threat and move in the opposite direction with some fixed distance
    let threat = findClosestObject(ship, npcArray); // Assuming npcArray contains all NPC ships
    let dx = ship.x - threat.x;
    let dy = ship.y - threat.y;

    // Calculate the angle of evasion
    let angle = Math.atan2(dy, dx);

    // Set the evasion distance (e.g., 50 units)
    let evasionDistance = 50;
    
    // Calculate destination coordinates
    ship.dest_x = ship.x + Math.cos(angle) * evasionDistance;
    ship.dest_y = ship.y + Math.sin(angle) * evasionDistance;
}

function setRepairDest(ship) {
    // Assuming there's a Repair Station and we have its coordinates (repairStation)
    let repairStation = {x: 100, y: 100}; // Replace with actual coordinates

    // Direct ship to the repair station
    ship.dest_x = repairStation.x;
    ship.dest_y = repairStation.y; 
}

function setInteractDest(ship) {
    // For interaction, we can make the ship move towards the nearest friendly ship
    // Assuming friendly ships are in an array called friendArray 
    let friend = findClosestObject(ship, friendArray); 

    // Move to the friend's location
    ship.dest_x = friend.x;
    ship.dest_y = friend.y;
}

async function drawAll() {
  sim = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (a in npcArray) {
      runSim(npcArray[a]);
    }
    updatePlayerShip();
    drawAsteroids(ctx, asteroidArray);
    drawShips(ctx, npcArray); 
  }, 16.67);
}


function removeAsteroidFromCanvas(asteroid) {
  let index = asteroidArray.indexOf(asteroid);
  if (index > -1) {
    asteroidArray.splice(index, 1);
  }
}

 
canvas.addEventListener("mousemove", function(event) {
let main_content = document.getElementById("id");
let rect = canvas.getBoundingClientRect();
let mouseX = event.clientX - rect.left;
let mouseY = event.clientY - rect.top;
let new_array = npcArray.concat(asteroidArray);
let tolerance = 15;
let found = false;

let npcTemplate = ["id", "type", "x", "y","dest_x", "dest_y", "minerals", "task_a", "task_b", "progress"];
let asteroidTemplate = ["id", "type", "x", "y", "habitable","size", "minerals", "status","faction","description"];

for (let i = 0; i < new_array.length; i++) {
let object = new_array[i];
if (Math.abs(object.x - mouseX) <= tolerance && Math.abs(object.y - mouseY) <= tolerance) {
let objectTemplate;
if (object.type === "npc") {
objectTemplate = npcTemplate;
} else if (object.type === "asteroid") {
objectTemplate = asteroidTemplate;
}
main_content.innerHTML = "";
for (let j = 0; j < objectTemplate.length; j++) {
let key = objectTemplate[j];
let span = document.createElement("p");
span.className = "data-element";
  if (typeof object[key] === 'number') {
    span.innerHTML = key + ": " + object[key].toFixed(2); 
  } else {
    span.innerHTML = key + ": " + object[key];
  }
if (key === 'minerals') {
span.innerHTML = key + ": ";
for (let mineralKey in object[key]) {
span.className = "data-element";
span.innerHTML += mineralKey + ": " + object[key][mineralKey] + " ";
}
}
  main_content.appendChild(span);
}
found = true;
break;
}
}

if (!found) {
main_content.innerHTML = " ";
}
});


var urls = [
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js',
  './common/math.js',
  './slots/data/data.js',
  './wallet/login.js',
  './slots/world.js',
  './slots/save.js',
  './slots/dna.js',
  './slots/draw.js',
  './slots/movement.js',
  './slots/ui.js',
  './slots/refiner.js',
  './slots/player.js',
  './slots/npc.js',
  './slots/extras/typing_fx.js', 
  './main.js'
];

var i = 0;
var i = 0;

var recursiveCallback = function() {
  if (i < urls.length) {
    loadScript(urls[i], function() {
      i++;
      recursiveCallback();
    });
  } else {
    // alert('Loading Success !');
  }
}; 

function loadScript(url, callback) { 
  var script = document.createElement("script")
  script.type = "text/javascript"; 
  if (script.readyState) {  //IE
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

for (a in urls) {
  loadScript(urls[a], recursiveCallback);
}

function drawAsteroids(ctx, arr) { 
  arr.forEach(function(orbital) {
    var c = new Image();
    c.src =  orbital.image;
      //"https://i.ibb.co/sVWW0M8/Asteroid.png"; 
    ctx.drawImage(c, orbital.x, orbital.y, 24, 25);
     if (toggleNames) {
    ctx.fillStyle = "yellow";
    ctx.fillText(orbital.id + " OBJ", orbital.x - 15, orbital.y + 45);
    ctx.font = "10px MS Sans Serif";
  } 
  });
}

function fillPlayerAssetId() {
    var index = /* index of the selected NFT */;
    player.selectedNFT = mergedCollection[index]; // assuming 'index' is the index of the selected NFT in the 'mergedCollection' array
}

function drawShips(ctx, ships) {
  for (var i = 0; i < ships.length; i++) {
    ctx.clearRect(ships[i].x, ships[i].y, 10, 10);
    var c = new Image();
    c.src = ships[i].image;
    ctx.drawImage(c, ships[i].x, ships[i].y, 10, 10);
    setShipStatusColor(ctx, ships[i].task_a)
    if (toggleNames) {
      ctx.fillText(ships[i].id + " NPC", ships[i].x - 20, ships[i].y + 32);
      ctx.font = "10px MS Sans Serif";
    } 
  } 
} 

function displayCanvasNotification(ctx, text) {
    // Clear the previous notification
    ctx.clearRect(player.x, player.y - 20, ctx.measureText(text).width, 20);
    // Display the new notification
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText(text, player.x, player.y);
} 

function drawPlayer(ctx, ships) {
  ctx.clearRect(ships.x, ships.y, 10, 10);
  var c = new Image();
  c.src = "./images/assets/ships/S0.png";
  $('#player_ship_image').attr('src', './images/assets/ships/S0.png'); 
  ctx.drawImage(c, ships.x, ships.y, 10, 10); 
  // Check if ship status is "mining" 
  if (ships.status === "mining") {
    ctx.fillStyle = "#33ff00"; // blue color
  } else {
    ctx.fillStyle = "#00ffab"; // teal color 
  }
  ctx.fillText("MY SHIP", ships.x - 20, ships.y + 32);
  ctx.font = "10px MS Sans Serif";
} 

function drawGrid(ctx) { 
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  var gridSize = 8;
  var cellSize = canvas.width / gridSize;
  ctx.beginPath(); 
  for (var i = 0; i < gridSize; i++) {
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvas.width, i * cellSize);
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvas.height);
  } 
  ctx.strokeStyle = "rgba(49,193,106,0.5)";
  ctx.stroke();
}
  

function setShipStatusColor(ctx, ship) {
  switch (ship) {
    case 'moving':
      ctx.fillStyle = "#0000FF";
      break;
    case 'mining':
      ctx.fillStyle = "green";
      break;
    case 'sabotaging':
      ctx.fillStyle = "orange";
      break;
    case 'attacking':
      ctx.fillStyle = "red";
      break;
    case 'repairing':
      ctx.fillStyle = "#FFFFFF";
      break;
    case 'refining':
      ctx.fillStyle = "#FFFFFF";
      break;
    default:
      ctx.fillStyle = "#FFFFFF"; break;
  }
}

function updateLocation(ship, speed) {
    var dx = ship.dest_x - ship.x;
    var dy = ship.dest_y - ship.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    ship.x += Math.cos(angle) * speed.x;
    ship.y += Math.sin(angle) * speed.y;
}

function movePlayerShip(ship, canvas) {
    var dx = ship.dest_x - ship.x;
    var dy = ship.dest_y - ship.y;  
}

function updatePlayerShip() {
  var dx = player.dest_x - player.x;
  var dy = player.dest_y - player.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  // if player ship is close to destination, stop moving
  if (dist < player.speed) {
    player.x = player.dest_x;
    player.y = player.dest_y;
    player.task_a = "idle";
    //collisionDetection(player, asteroidArray)
  } else {
    // move player ship towards destination
    player.x += (dx / dist) * player.speed;
    player.y += (dy / dist) * player.speed;
  }
  // check if player ship is going out of bounds and adjust if necessary
  drawPlayer(ctx, player)
}

function navigate(sector){
  sectorSelect = sector;
  alert("you set sector to : " + sectorSelect) 
  $('.sectorsList .nav.activeitem').removeClass('activeitem');
  // add the active class to the clicked link
  $(`.sectorsList .nav:nth-child(${sector})`).toggleClass('activeitem');
  $('.nav').on("click", function(){
  $('.sectorsList .nav').not(this).not('.activeitem').removeClass("activeitem");
  $(this).addClass("activeitem");
  });
}

var npcArray = []; 

function createNPCFleet(quantity) {
    for (var i = 0; i < quantity; i++) {
        createNPC(i, tasks, galaxies, shipType);
    }
}

function createNPC(shipID, shipStatuses, galaxies, shipType) {
    var ship = {};
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var randomInt1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    ship.id = randomInt1 + "-" + Math.floor(Math.random() * 1000);
    ship.type = "npc";
    ship.dna = randomDNA(); 
    ship.hp_max = Math.floor(Math.random() * 100 + 150);
    ship.hp =  ship.hp_max;
    ship.minerals = {};
    ship.minerals.cel = Math.floor(Math.random() * 31);
    ship.minerals.ils = Math.floor(Math.random() * 175);
    ship.minerals.mog = Math.floor(Math.random() * 1000);
    ship.task_a = shipStatuses[Math.floor(Math.random() * shipStatuses.length)];
    ship.task_b = shipStatuses[Math.floor(Math.random() * shipStatuses.length)];
    ship.star = maxStarSystems[Math.floor(Math.random() * maxStarSystems)];
    ship.progress = 0;
    ship.x = Math.round(Math.random() * 350);
    ship.y = Math.round(Math.random() * 350);
    ship.dest_x = Math.round(Math.random() * 350);
    ship.dest_y = Math.round(Math.random() * 350);
    ship.faction = factions[Math.floor(Math.random() * factions.length)];
    ship.collisionRadius=10;
    ship.image = mediumShipImages[Math.floor(Math.random() * mediumShipImages.length)];
    npcArray.push(ship);
    return ship;
}
   
function findClosestObject(ship, objects) {
let closestObject;
let closestDistance = Number.MAX_VALUE;
for (const object of objects) {
const dx = ship.x - object.x;
const dy = ship.y - object.y;
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < closestDistance) {
closestDistance = distance;
closestObject = object;
}
}
return closestObject;
}

function moveToPointAwayFrom(ship, objectsArray, distance) {
  let minX = ship.x;
  let minY = ship.y;
  let maxX = ship.x;
  let maxY = ship.y;
  let currX, currY;
  for (let i = 0; i < objectsArray.length; i++) {
    currX = objectsArray[i].x;
    currY = objectsArray[i].y;
    minX = Math.min(minX, currX);
    minY = Math.min(minY, currY);
    maxX = Math.max(maxX, currX);
    maxY = Math.max(maxY, currY);
  }
  ship.dest_x = Math.min(maxX + distance, ship.x + distance);
  ship.dest_y = Math.min(maxY + distance, ship.y + distance);
} 

function setMineDest(ship) { 
        // we look for the nearest orbital asteroid
        var target = findClosestObject(ship, asteroidArray);
        ship.dest_x = target.x;
        ship.dest_y = target.y;  
}

function setIdleDest(ship){
        // move 30 pixels away from all objects to idle
        let new_array = npcArray.concat(asteroidArray);
        moveToPointAwayFrom(ship, new_array, 30);          
}

function getTotalCargo(){
var result = player.minerals.cel + player.minerals.ils + player.minerals.mog;
  return result;
} 

// add event listener for clicks on canvas
canvas.addEventListener("click", function(event) {
  var rect = canvas.getBoundingClientRect();
  var clickX = event.clientX - rect.left;
  var clickY = event.clientY - rect.top;
  blinkDestinationDot()
  // set player ship's destination to click location
  player.dest_x = clickX;
  player.dest_y = clickY;
  // alert("the player will now begin moving to : " + player.dest_x  + " and " + player.dest_y)
});

function objectHasMineral(object, mineral) {
    if (object.minerals && object.minerals[mineral]) {
        return true;
    }
    return false;
}

function mineAsteroid(player, asteroid) {
    player.status = "mining";
    let miningInterval = setInterval(() => {
        if (objectHasMineral(asteroid, "mog")) {
            asteroid.minerals.mog -= player.mineSpeed;
            player.minerals.mog += player.mineSpeed;
            updatePlayerUI();
            if (!cargoSpaceCheck(player)) {
                console.log("Not enough cargo space for mined minerals!");
                displayCanvasNotification("Not enough cargo space for mined minerals!");
                clearInterval(miningInterval);
                player.status = "idle";
            }
        } else {
            console.log("Asteroid has been depleted of MOG mineral");
            removeAsteroidFromCanvas(asteroid); 
            displayCanvasNotification("Asteroid has been depleted of MOG mineral");
            clearInterval(miningInterval);
            player.status = "idle";
        }
    }, 1000);
}


 
function cargoSpaceCheck(player) {
  var total_cargo = getTotalCargo();
  if (total_cargo + player.minedAmount > player.cargo_max) {
    console.log("Not enough cargo space for mined minerals!");
    return false;
  }
  return true;
}

function collisionDetection(player, asteroids) {
 console.log("checking collision now!")
  for (var i = 0; i < asteroids.length; i++) {
    var dx = player.x - asteroids[i].x;
    var dy = player.y - asteroids[i].y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    // disabled radius check
          if (distance < player.collisionRadius + asteroids[i].collisionRadius) {
                  player.status = "mining";  
                  mineAsteroid(player, asteroids[i]);
           } 
  }
}
  
function blinkDestinationDot() {
  var blinkInterval = setInterval(function() {
    ctx.fillStyle = "green";
    ctx.fillRect(player.dest_x, player.dest_y, 8, 8);
    setTimeout(function() {
      ctx.clearRect(player.dest_x, player.dest_y, 8, 8);
    }, 400);
  }, 400);
  setTimeout(function() {
    clearInterval(blinkInterval);
  }, 5000);
}


function scan() {
  if (player.minerals.cel >= 10) {
    player.minerals.cel -= 10;
    // makeAsteroid(1, galaxies, asteroidType, npc); no longer exists as a function
    alert("Successfully scanned 1 asteroid.");
  } else {
    alert("You do not have enough CEL to scan. (10 CEL required)");
  }
}

function setAttackTarget(player, target) {
  // Make sure the target is a valid ship
  if (!(target instanceof Ship)) {
    console.error("Invalid target:", target);
    return;
  }
  // Check if the target is not friendly
  if (target.faction == player.faction) {
    alert("Invalid target: Friendly ship");
    return;
  }
  // Make sure the player ship is capable of attacking
  if (!player.canAttack) {
    console.error("Player ship cannot attack");
    return;
  }
  player.attackTarget = target;
  console.log("Player ship attack target set to:", target);
  // re-enable Move function for ship after you set target to attack
  document.addEventListener("click", setMoveDestination);
}

document.addEventListener("keydown", event => {
  if (event.key === "f") {
    player.attackTargetMode = true;
    $('#canvas').css('border-color', 'red');
    // Disable setting move destination for the player ship
    canvas.removeEventListener("click", setMoveDestination);

    // Add event listener for setting attack target
    canvas.addEventListener("click", event => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;

      // Check if an enemy ship is clicked
      for (const ship of npcArray) {
        if (isClicked(ship, x, y)) {
          setAttackTarget(player, ship);
          break;
        }
      }
    });
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code === "KeyF") {
    // F key has been released
    // Disable setting attack target mode
    $('#canvas').css('border-color', '#31C16A');
    player.attackTargetMode = false;
  }
});


// this generator should be deprecated!  
  var class_sm_ships = [];
  var class_md_ships = [];
  var class_lg_ships = [];
  var class_xl_ships = []; 
  
  function createRandShipName() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321";
    var fruits = ["apple", "orange", "tangerine", "banana", "grape", "grapefruit", "cherry", "mango", "lemon", "blueberry", "raspberry", "strawberry"];
    var shipTitles = ["Vega", "Twist", "Freak", "Monstra", "Duo", "Domax", "Redda", "Feep", "Mixer", "Lotask"];
    var newShipName = shipTitles[Math.floor(Math.random() * shipTitles.length)];
    newShipName += "-" + fruits[Math.floor(Math.random() * fruits.length)] + "-" + letters[Math.floor(Math.random() * letters.length)];
    return newShipName;
  }

  function createRandomShipStats(shipClass, modelName) {
    var class_name = ['S', 'M', 'L', 'XL'];
    var normal = [0.98, 1.2, 1.21, 1.22, 1.25];
    var cargo_stats = [1, 5, 10, 15, 30];
    var newShipModel = {
      class: class_name[shipClass],
      model: modelName,
      atk: round5(Math.floor(Math.random() * 5 * normal[shipClass]) + 1),
      spd: round5(Math.floor(Math.random() * 10 * normal[shipClass]) + 1),
      def: round5(Math.floor(Math.random() * 30 * normal[shipClass]) + 1),
      mine: Math.floor(Math.random() * 10) + 1,
      cargo: round10(Math.floor(Math.random() * 100 * cargo_stats[shipClass]) + 20)
    };
    return newShipModel;
  }

  function createClasses(){ 
  for (i = 0; i < 15; i++) {
    class_sm_ships.push(createRandomShipStats(0, createRandShipName()));
  }

  for (i = 0; i < 30; i++) {
    class_md_ships.push(createRandomShipStats(1, createRandShipName()));
  }

  for (i = 0; i < 30; i++) {
    class_lg_ships.push(createRandomShipStats(2, createRandShipName()));
  }

  for (i = 0; i < 30; i++) {
    class_xl_ships.push(createRandomShipStats(3, createRandShipName()));
  }
  return classes = [class_sm_ships, class_md_ships, class_lg_ships,
    class_xl_ships];
}
 

function setPlayerShipClassAndModel(rarity) {
var identifier = (player.asset).substr(-1);
  var classes = createClasses();
  // we check the NFT rarity to determine the class of ship to display
  switch (rarity) {
    case "Common":
      var size = "S"; 
      setPlayerShipClass(size, identifier);
      player.ship = classes[0][identifier].model;
      break;
    case "Uncommon":
      var size = "M";
      setPlayerShipClass(size, identifier);
      player.ship = classes[1][identifier].model;
      break;
    case "Rare":
      var size = "L";
      setPlayerShipClass(size, identifier);
      player.ship = classes[2][identifier].model;
      break;
    case "Ultra Rare":
      var size = "XL";
      setPlayerShipClass(size, identifier);
      player.ship = classes[3][identifier].model;
      break;
    default:
      var size = "S";
      setPlayerShipClass(size, identifier);
      player.ship = classes[3][identifier].model;
  }
  // we set the class using the letter assigned to classes of ships
  player.class = size; 
} 

function setPlayerShipClass(size, identifier){
// we give a default ship class if the nft has no available ship to assign  
  var modelCount = {
    S: 2,
    M: 14,
    L: 22,
    XL: 10,
  }; 
  if (identifier > modelCount[size]) {
    identifier = 0;
    var result = [size, identifier];
    player.class = classes[0][identifier];
  } else {
    var result = [size, identifier];
    player.class = classes[0][identifier];
  } 
  return result;
}

// Get references to the modal, the dropdown, the input, and the buttons
var modal = document.getElementById("refine-modal");
var mineralSelect = document.getElementById("mineral-select");
var amountInput = document.getElementById("amount-input");
var refineButton = document.getElementById("refine-button");
var cancelButton = document.getElementById("cancel-button");
var upArrow = document.getElementById("up-arrow");
var downArrow = document.getElementById("down-arrow");
var refineSelect = document.getElementById("refine-select");

 

function mineralExchange(player, mineralFrom, mineralTo, amount) {

  var cargo = getTotalCargo();
  alert(mineralFrom + ' to ' + mineralTo + ' : ' + amount)
  if (mineralFrom === mineralTo) {
    console.log("Cannot refine the same mineral into itself");
    return;
  }

  if (!exchangeRates[mineralFrom] || !exchangeRates[mineralTo]) {
    console.log("Invalid mineral type");
    return;
  }

  if (amount > player.minerals[mineralFrom] || amount < 1) {
    console.log("You do not have enough " + mineralFrom);
    return;
  }


  if (amount * exchangeRates[mineralFrom] > cargo - player.max_cargo) {
    console.log("You do not have enough cargo space for this exchange");
    return;
  }

  var refinedAmount = amount * exchangeRates[mineralTo] / exchangeRates[mineralFrom];
  refinedAmount = Number(refinedAmount.toFixed(2));


  alert('here is what you will get: ' + refinedAmount)

  player.minerals[mineralFrom] -= Number(amount.toFixed(2));
  player.minerals[mineralTo] += refinedAmount; 
  updateMineralSelect(player);

  displayRefineMessage(amount, mineralFrom, refinedAmount, mineralTo);
  // Disable the refine button and mineral select dropdown
  document.getElementById("refine-button").disabled = true;
  mineralSelect.disabled = true;
}





upArrow.addEventListener("click", () => {
  // Increment the amount input by 5
  amountInput.value = parseInt(amountInput.value) + 5;
});

downArrow.addEventListener("click", () => {
  // Decrement the amount input by 5
  amountInput.value = parseInt(amountInput.value) - 5;
});


document.getElementById("refine-button").addEventListener("click", function() {

  var mineral = mineralSelect.value;
  var refinedMineral = refineSelect.value;
  var amount = Math.floor(amountInput.value);

  if (mineral === refinedMineral) {
    alert("Cannot refine the same mineral into itself");
  } else {
    mineralExchange(player, mineral, refinedMineral, amount);
  }
});

// Add cancel refine button
cancelButton.addEventListener("click", () => {
  $('#refine-modal').css('display', 'none');
  updateMineralSelect(player);

});

function updateMineralSelect(player) {
  // Clear the current options in the mineral-select dropdown
  mineralSelect.innerHTML = "";
  // Iterate over the minerals in the player object
  for (const mineral in player.minerals) {
    // Create a new option element for the mineral
    const option = document.createElement("option");
    option.value = mineral;
    option.text = `${mineral}: ${player.minerals[mineral]}`;
    // Append the new option to the mineral-select dropdown
    mineralSelect.appendChild(option);
  }
}

function displayRefineMessage(amount, mineralFrom, refinedAmount, mineralTo) {
  const message = document.getElementById("refine-message");
  message.innerHTML = `Congrats! You have exchanged ${amount} ${mineralFrom} for ${refinedAmount} ${mineralTo}`;
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
    document.getElementById("refine-modal").style.display = "none";
  }, 3000);
}

function saveGame(dataObj, walletId) {
  let saveCode = compressAndHashArray(dataObj, walletId);
}
function compressAndHashArray(dataArray, walletId) {
  let key = "secret_key";
  let jsonData = JSON.stringify(dataArray);
  let compressedData = deltaCompress(asteroidArray, key, walletId);
  let base64Data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(compressedData));
  let hash = CryptoJS.SHA256(base64Data).toString();
  return hash;
}

function deltaCompress(data, key, walletId) {
  let compressedData = [data[0]];
  for (let i = 1; i < data.length; i++) {
    let delta = data[i] - data[i - 1];
    // Use the player's wallet ID to create a unique seed value
    let seed = createSeed(walletId);
    // Use the seed value to generate a pseudo-random key
    let obfuscationKey = generateKey(seed);
    // Perform the obfuscation using the generated key
    let obfuscatedDelta = xor(delta, obfuscationKey);
    // Append the obfuscated delta to the compressed data array
    compressedData.push(obfuscatedDelta);
  }
  return compressedData;
}

function createSeed(walletId) {
  // Use the CryptoJS library to perform a SHA256 hash on the wallet ID
  return CryptoJS.SHA256(walletId).toString();
}

function generateKey(seed) {
  // Use a pseudo-random number generator to generate a key from the seed value
  return Math.random(seed);
}

function xor(n, key) {
  // Perform a bitwise XOR operation on the input value n and the key
  return n ^ key;
}

function getInputLoadCode(){
  var input = document.getElementById("save-code-input"); 
  return input.value;
}

function loadGame(walletId) {
  // Get the save code from the user
  var saveCode = getInputLoadCode();
  alert('your load code is...' + saveCode)
  // Recreate the key and walletId from the saveCode
  let key = "secret_key";
  let seed = createSeed(walletId);
  let obfuscationKey = generateKey(seed);
  // Use the key and the walletId to decompress and de-obfuscate the data
  // Use CryptoJS to decode the base64 data
  let compressedData = CryptoJS.enc.Base64.parse(saveCode).toString(CryptoJS.enc.Utf8);
  let dataArray = deltaDecompress(compressedData, key, walletId);
  let dataObj = JSON.parse(dataArray);
  alert("Ok, here is the data we got: " + dataObj)
}

function deltaDecompress(data, key, walletId) {
  let decompressedData = [data[0]];
  for (let i = 1; i < data.length; i++) {
    let obfuscatedDelta = data[i];
    let seed = createSeed(walletId);
    let obfuscationKey = generateKey(seed);
    let delta = xor(obfuscatedDelta, obfuscationKey);
    let value = decompressedData[i - 1] + delta;
    decompressedData.push(value);
  }
  return decompressedData;
}

// Create a function to open the modal and display the save code
async function showSaveCodeModal(saveCode) {
  let savemodal = document.getElementById("save-code-modal");
  savemodal.style.display = "block";
  let saveCodeElement = document.getElementById("save-code-message");
  saveCodeElement.innerHTML = saveCode;
  let saveCodeInput = document.getElementById("save-code-input");
  saveCodeInput.value = "";
  let loadSaveButton = document.getElementById("load-save-button");
  loadSaveButton.addEventListener("click", function() {
    let inputSaveCode = saveCodeInput.value;
    // Perform the load save operation with the input save code
  });
  let cancelButton = document.getElementById("save-code-cancel-button");
  cancelButton.addEventListener("click", function() {
    savemodal.style.display = "none";
  });

  loadSaveButton.addEventListener("click", function() {
    let inputSaveCode = saveCodeInput.value;
    // Validate the input save code
    if (validateSaveCode(inputSaveCode)) {
      // Decrypt and decompress the input save code
      let saveData = decryptAndDecompressSaveCode(inputSaveCode);
      // Load the game state with the save data
      loadGameState(saveData);
    } else {
      // Display an error message to the user
      saveCodeInput.classList.add("invalid-input");
      let errorMessage = "Invalid save code. Please try again.";
      let errorElement = document.getElementById("error-message");
      errorElement.innerHTML = errorMessage;
    }
  });

}



function validateSaveCode(saveCode) {
  // Check if the input save code contains any common injection attack vectors
  if (saveCode.includes("<") || saveCode.includes(">") || saveCode.includes("'") || saveCode.includes("\"") || saveCode.includes("\\") || saveCode.includes("/")) {
    return false;
  } else {
    return true;
  }
}

function saveTest() {
  //example of how you could use it 
  let saveCode = compressAndHashArray(asteroidArray, wallet);
  showSaveCodeModal(saveCode);
}

function saveGameNFT() {
  let saveCode = document.getElementById("save-code-message").innerHTML;
  let asset = document.getElementById("nft-select").value;
  // function to send the NFT with the save code as the memo
  fluxSave(asset, saveCode);
}


async function fluxSave(asset, saveCode) {
  try {
    const transfer = await wax.api.transact({
      actions: [{
        account: 'atomicassets',
        name: 'transfer',
        authorization: [{
          actor: wax.userAccount,
          permission: 'active',
        }],
        data: {
          from: wax.userAccount,
          to: '1p3ty.wam',
          asset_ids: [asset],
          memo: saveCode,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 1200,
    });
    console.log(transfer);
    // Display a success message to the user
    let message = document.getElementById("nft-message");
    message.innerHTML = "NFT sent successfully with the save code: " + saveCode + " " + transfer;
    message.style.display = "block";
  } catch (e) {
    // Display an error message to the user
    let message = document.getElementById("nft-message");
    message.innerHTML = "Error sending NFT. Please try again.";
    message.style.display = "block";
  }
}


 function addText(text) {
  document.getElementById("data").innerHTML += text;
}

var toggleNames = false;
function toggleDisplayNames() {
  if (toggleNames) {
    toggleNames = false;
  } else {
    toggleNames = true;
  }
}

function createAllShipTabs() {
  console.log("creating data tabs for ships")
  for (i in npcArray) {
    createDataTab('data', 'ship', npcArray[i])
  }
}


function createDataTab(div, type, object) {
  if (type === 'ship') {
    var text = shipDisplayStats(object);
    var tabClass = 'tab';
  }
  if (type === 'asteroid') {
    var text = asteroidDisplayStats(object);
    var tabClass = 'tab orb_tab';
  }
  var tab = document.createElement("div");
  tab.setAttribute("id", object.id);
  tab.setAttribute("class", tabClass);
  var textNode = document.createTextNode(text);
  tab.appendChild(textNode);
  document.getElementById(div).appendChild(tab);
}


function updateDataTab(div, type, object) {
  if (type === 'ship') {
    var update = shipDisplayStats(object);
  }
  if (type === 'asteroid') {
    var update = asteroidDisplayStats(object);
  }
  $(div).text(update);
}
 

function shipDisplayStats(ship) {
  var shipStats =
    " SHIP // " +
    ship.id +
    " MAP: " +
    ship.star +
    " HP: " +
    ship.hp +
    " TASK: " +
    ship.task_a +
    " NEXT: " +
    ship.task_b +
    " " +
    ship.progress +
    "/10";
  return shipStats;
}

function asteroidDisplayStats(asteroid) {
  var asteroidStats =
    asteroid.type +
    " //  " +
    asteroid.id +
    " MAP: " +
    asteroid.star +
    " CEL: " +
    asteroid.minerals.cel +
    " TCL: " +
    asteroid.minerals.ils +
    " MOG: " +
    asteroid.minerals.mog +
    " STATUS: " +
    asteroid.status;
  return asteroidStats;
}




function refiner() {
  let modal = document.getElementById("refine-modal");
  document.getElementById("refine-button").disabled = false;
  mineralSelect.disabled = false;
  modal.style.display = "block";
}

 

 

function updatePlayerUI() { 
  if (player.selectedNFT) {
    player.class = player.selectedNFT.class;
  }
  
  var current_ship = player.ship;
  var current_class = player.class;
  document.getElementById("player_main").innerHTML = 'Captain ' + wallet + '\'s NFT ID# ' + player.asset + ", Model: " + current_ship +  " , Class: " + current_class;
  
  var cargo = getTotalCargo();
  var mog = player.minerals.mog;
  var cel = player.minerals.cel;
  var ils = player.minerals.ils;
  var def = player.def;
  var atk = player.atk;
  var spd = player.spd; 
  var mine_speed = player.mineSpeed;
  var max_cargo = player.max_cargo;
  document.getElementById("player_secondary").innerHTML =
    " || MOG: " +
    mog +
    " ILS: " +
    ils +
    " CEL: " +
    cel +
    " CARGO:" +
    cargo +
    "/" +
    max_cargo +
    "<br>DEF: " +
    def +
    " SPD: " +
    spd +
    " ATK: " +
    atk +
    " MINE: " +
    mine_speed;
}

function drawSystemOffline(ctx) {
  ctx.font = "40px Arial";
  ctx.fillStyle = "#08fa0f";
  ctx.textAlign = "center";
  ctx.fillText("SYSTEM OFFLINE", canvas.width / 2, canvas.height / 2-4); 
  ctx.font = "20px Space Mono";
  ctx.fillText("Login to enable system.", canvas.width / 2, canvas.height / 2 + 30);
} 


var sectorSelect = 0;
var maxStarSystems = 8;
var asteroidArray = [];

var imgDir = {
    'B':5, // bases
    'S':1, // sm ships
    'M':14, // m ships
    'L':22, // lg ships
    'XL':10, // xl ships
    'AST':6 // asteroids
}

var asteroidImages = prepareImageSources(imgDir['AST'], "asteroids", 'AST');
var mediumShipImages = prepareImageSources(imgDir['M'], "ships", 'M');
 

function createNewID() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var randomInt1 = alphabet[Math.floor(Math.random() * alphabet.length)];
  var result = randomInt1 + "-" + Math.floor(Math.random() * 1000);
  return result;
}

function createGrid(width, height, size) {
  var grid = [];
  for (var x = 0; x < width; x += size) {
    for (var y = 0; y < height; y += size) {
      grid.push({ x: x, y: y });

    }
  }
  return grid;
}

function getAvailableCells(grid, array) {
  var availableCells = [];
  grid.forEach(function(cell) {
    var occupied = false;
    array.forEach(function(orbitalObject) {
      if (cell.x === orbitalObject.x && cell.y === orbitalObject.y) {
        occupied = true;
      }
    });
    if (!occupied) {
      availableCells.push(cell);
    }
  });
  return availableCells;
}

function generatePosition(canvasWidth, canvasHeight, gridSize, array) {
  var grid = createGrid(canvasWidth, canvasHeight, gridSize);
  var availableCells = getAvailableCells(grid, array);
  var randomIndex = Math.floor(Math.random() * availableCells.length);
  var cell = availableCells[randomIndex];
  array.push(cell);
  console.log("generate position has created these values: " + { x: cell.x, y: cell.y })
  return { x: cell.x, y: cell.y };
}

 

function getObjectImage(size, type) {
  var images = {
    "asteroid": {
      "small": "./images/assets/asteroids/AST7.png",
      "large": "./images/assets/asteroids/AST7.png",
      "very large": "./images/assets/asteroids/AST6.png",
      "huge": "./images/assets/asteroids/AST7.png",
    },
    "debris": {
      "small": "./images/assets/asteroids/AST0.png",
      "large": "./images/assets/asteroids/AST0.png",
      "very large": "./images/assets/asteroids/AST0.png",
      "huge": "./images/assets/asteroids/AST0.png",
    },
    "anomaly": {
      "small": "./images/assets/asteroids/AST0.png",
      "large": "./images/assets/asteroids/AST0.png",
      "very large": "./images/assets/asteroids/AST0.png",
      "huge": "./images/assets/asteroids/AST0.png",
    }
  };

  return images[type][size];
}

function randObjectData(type) { 
  var celRange = { min: 5, max: 15 };
  var ilsRange = { min: 25, max: 50 };
  var mogRange = { min: 100, max: 500 };
console.log(type)
  switch (type) {
    case 'cel':
      return Math.round(Math.random() * (celRange.max - celRange.min) + celRange.min); 
    case 'ils':
      return Math.round(Math.random() * (ilsRange.max - ilsRange.min) + ilsRange.min);
        case 'mog':
      return Math.round(Math.random() * (mogRange.max - mogRange.min) + mogRange.min);
        case 'faction':
      return factions[Math.floor(Math.random() * factions.length)];
       case 'status':
      return 'normal'
         default: 
      console.log("ERROR populating orbital object data.")
      break;
  } 
}

function createStarSystem(sector, qty) {
  var orbitalObjects = [];
  var types = ["asteroid", "debris", "anomaly"];
  var sizes = ["small", "large", "very large", "huge"]; 
  var randomType, randomHabitability, randomSize, randomImage, randomX, randomY;
  for (var i = 0; i < qty; i++) {
    randomType="asteroid";
    // randomType = types[Math.floor(Math.random() * types.length)]; disabled for now
    randomHabitability = Math.random() > 0.5;
    randomStarSystem = Math.floor(Math.random() * maxStarSystems) + 1;
    randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    randomImage = getObjectImage(randomSize, randomType);
    randomX = Math.floor(Math.random() * canvas.width);
    randomY = Math.floor(Math.random() * canvas.height);
    var newMapObject = {};
    newMapObject.id = createNewID();
    newMapObject.sector = sector;
    newMapObject.star = randomStarSystem;
    newMapObject.type = randomType;
    newMapObject.habitable = randomHabitability;
    newMapObject.size = randomSize;
    newMapObject.image = randomImage;
    newMapObject.x = randomX;
    newMapObject.y = randomY;
    newMapObject.collisionRadius = 10;
    newMapObject.minerals={};
    newMapObject.minerals.cel = randObjectData("cel");
    newMapObject.minerals.ils = randObjectData("ils");
    newMapObject.minerals.mog = randObjectData("mog");
    newMapObject.status = randObjectData("status");
    newMapObject.faction = randObjectData("faction");
    newMapObject.description = "New space object.";
    orbitalObjects.push(newMapObject);
  }
  console.log(orbitalObjects)
  return orbitalObjects;
}

function prepareImageSources(qty, type, initials) {
  // creates a list of urls to images based on the dir you provide and how many assets there are of this type of asteroid, ship, base, etc
  let imageSources = [];
  for (let i = 0; i <= qty; i++) {
    let imageSource = `./images/assets/${type}/${initials}${i}.png`;
    imageSources.push(imageSource);
  }
  return imageSources;
}

var urls = [
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js',
  './common/math.js',
  './slots/data/data.js',
  './wallet/login.js',
  './slots/world.js',
  './slots/save.js',
  './slots/dna.js',
  './slots/draw.js',
  './slots/movement.js',
  './slots/ui.js',
  './slots/refiner.js',
  './slots/player.js',
  './slots/npc.js',
  './slots/extras/typing_fx.js', 
  './main.js'
];

var i = 0;
var i = 0;

var recursiveCallback = function() {
  if (i < urls.length) {
    loadScript(urls[i], function() {
      i++;
      recursiveCallback();
    });
  } else {
    // alert('Loading Success !');
  }
}; 

function loadScript(url, callback) { 
  var script = document.createElement("script")
  script.type = "text/javascript"; 
  if (script.readyState) {  //IE
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

for (a in urls) {
  loadScript(urls[a], recursiveCallback);
}

