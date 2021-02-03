const workBtn = document.getElementById('work');
let moneyDisplay = document.getElementById('money'),
    ppcDisplay = document.getElementById('ppc'),
    ppsDisplay = document.getElementById('pps'),
    shopContainer = document.getElementById('shop-container'),
    errorDisplay = document.getElementById('error');    

let ppc = 1;
let pps = 1;
let money = 0;




let upgrades = []
const upgradesAmount = 70;

if(!(localStorage.getItem('version') && localStorage.getItem('version')==1)) {
    localStorage.clear();
    localStorage.setItem('version', 1)
    console.log('chello');
}


if(localStorage.getItem('upgrades')) {
    upgrades = JSON.parse(localStorage.getItem('upgrades'));
    displayUpgrades();
} else {
   createUpgrades();
   localStorage.setItem('upgrades', JSON.stringify(upgrades));
}

if(localStorage.getItem('money')) {
    money = +localStorage.getItem('money');
    displayMoney();
} else {
    localStorage.setItem('money', money);
}

if(localStorage.getItem('ppc')) {
    ppc = +localStorage.getItem('ppc');
    displayPPC();
} else {
    localStorage.setItem('ppc', ppc);
}

if(localStorage.getItem('pps')) {
    pps = +localStorage.getItem('pps');
    displayPPS();
} else {
    localStorage.setItem('pps', pps);
}


displayMoney();
displayPPC();
displayPPS();
let clickLimit = 0
workBtn.addEventListener("click", function() {
    if(clickLimit < 20) {
        money = money + ppc;
        displayMoney();
    } else {
        errorDisplay.innerHTML = "You are clickingto fast!"

        setTimeout(() => {
            errorDisplay.innerHTML = "";
        }, 3000);
    }
});

setInterval(() => {
    addPPS();
    save();
    clickLimit = 0;
}, 1000);

function addPPS() {
    money = money + pps;
    displayMoney();
}

function displayMoney() {
    moneyDisplay.innerHTML= moneyFormat(money);
}

function displayPPC() {
    ppcDisplay.innerHTML=moneyFormat(ppc);
}

function displayPPS() {
    ppsDisplay.innerHTML=moneyFormat(pps);
}

function buyPPS(amount) {
    pps = pps + amount;
    displayPPS();
}

function buyPPC(amount) {
    ppc = ppc + amount;
    displayPPC();
}

function createUpgrades() {
    let type = 0;
    let pp = 1;
    let amount;
    let ofType = 1;
    for (let i = 0; i < upgradesAmount; i++) {

        if(pp == 1) {
            amount = 1
        } else {
            amount = 0;
        }
        let upgradeName = `${type? 'Worker':'Multiplayer'} ${ofType}`
        let price = pp * 100;
        let upgrade = {name: upgradeName,type: type, pp: pp, price: price, amount: amount, id: i}
    
        if(type) {
            type = 0;
            pp = pp*10;
            ofType++
        } else {
            type = 1;
        }
        upgrades.push(upgrade);
    }
    displayUpgrades();
}

function displayUpgrades() {
    let row;
    upgrades.forEach(element => {
        row = `<tr class="upgrade" id=upgrade-${element.id}>
        <td class="upgrade-name" id=upgrade-${element.id}-name>${element.name}</td>
        <td class="upgrade-pp ${element.type? 'W':'M'}" id=upgrade-${element.id}-pp>${moneyFormat(element.pp)}</td>
        <td class="upgrade-price" id=upgrade-${element.id}-price>${moneyFormat(element.price)}</td>
        <td class="upgrade-buy" id=upgrade-${element.id}-buy><a onclick="buyUpgrade(${element.id})">Buy</a></td>
        <td class="upgrade-amount" id=upgrade-${element.id}-amount>${element.amount}</td>
        </tr>`;
        shopContainer.innerHTML = shopContainer.innerHTML + row;
    });
}

function buyUpgrade(id) {
    let upgrade = upgrades[id];
    let upgradeRow = document.getElementById(`upgrade-${upgrade.id}`);
    let row;
    if(money >= upgrade.price) {
        money = money - upgrade.price;
        upgrade.amount++;
        upgrade.price = Math.round(upgrade.price*1.1);
        row = `<td class="upgrade-name" id=upgrade-${upgrade.id}-name>${upgrade.name}</td>
                <td class="upgrade-pp ${upgrade.type? 'W':'M'}" id=upgrade-${upgrade.id}-pp>${moneyFormat(upgrade.pp)}</td>
                <td class="upgrade-price" id=upgrade-${upgrade.id}-price>${moneyFormat(upgrade.price)}</td>
                <td class="upgrade-buy" id=upgrade-${upgrade.id}-buy><a onclick="buyUpgrade(${upgrade.id})">Buy</a></td>
                <td class="upgrade-amount" id=upgrade-${upgrade.id}-amount>${upgrade.amount}</td>`;
        upgradeRow.innerHTML = row;
        upgrades[id] = upgrade;
        if(upgrade.type) {
            buyPPS(upgrade.pp);
        } else {
            buyPPC(upgrade.pp);
        }
    } else {
        errorDisplay.innerHTML = "Not enought money!"

        setTimeout(() => {
            errorDisplay.innerHTML = "";
        }, 3000);
    }
}

function save() {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('money', money);
    localStorage.setItem('ppc', ppc);
    localStorage.setItem('pps', pps);
}

function moneyFormat(number) {
    preciseNumber = precise(number)
    let shortNumber = preciseNumber.split('e')[0];
    let numberLenght = preciseNumber.split('+')[1];

    if(numberLenght%3 == 0){
        
    } else if(numberLenght%3 == 1) {
        shortNumber = shortNumber * 10;
    } else if(numberLenght%3 == 2) {
        shortNumber = shortNumber * 100;
    }

    shortNumber = (""+shortNumber).split(".")[0]
    if(typeof numberLenght == 'undefined') {

    } else if (numberLenght >= 3 && numberLenght < 6) {
        shortNumber = shortNumber + " K"
    } else if(numberLenght >= 6 && numberLenght < 9) {
        shortNumber = shortNumber + " M"
    } else if(numberLenght >= 9 && numberLenght < 12) {
        shortNumber = shortNumber + " B"
    } else if(numberLenght >= 12 && numberLenght < 15) {
        shortNumber = shortNumber + " T"
    } else if(numberLenght >= 15 && numberLenght < 18) {
        shortNumber = shortNumber + " Q"
    } else if(numberLenght >= 18 && numberLenght < 21) {
        shortNumber = shortNumber + " QQ"
    } else if(numberLenght >= 21 && numberLenght < 24) {
        shortNumber = shortNumber + " S"
    } else if(numberLenght >= 24 && numberLenght < 27) {
        shortNumber = shortNumber + " SE"
    } else if(numberLenght >= 27 && numberLenght < 30) {
        shortNumber = shortNumber + " O"
    } else if(numberLenght >= 30 && numberLenght < 33) {
        shortNumber = shortNumber + " N"
    } else if(numberLenght >= 33 && numberLenght < 36) {
        shortNumber = shortNumber + " D"
    } else {
        shortNumber = shortNumber + " OMEGA"
    }

    return shortNumber;
}

function precise(x) {
    return Number.parseFloat(x).toPrecision(4);
  }