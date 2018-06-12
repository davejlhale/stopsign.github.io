

function tick() {
    if(stop) {
        return;
    }
    timer++;

    prevState.stats = JSON.parse(JSON.stringify(stats));
    actions.tick();
    if(soulstoneChance < 1) {
        soulstoneChance += .000001;
        if(soulstoneChance > 1) {
            soulstoneChance = 1;
        }
    }


    if(shouldRestart || timer >= timeNeeded) {
        prepareRestart();
    }

    view.update();

    if(timer % 300 === 0) {
        save();
    }
}

function recalcInterval(newSpeed) {
    doWork.postMessage({stop:true});
    doWork.postMessage({start:true,ms:(1000 / newSpeed)});
}

function pauseGame() {
    stop = !stop;
    document.getElementById("pausePlay").innerHTML = stop ? "Play" : "Pause";
    if(!stop && (shouldRestart || timer >= timeNeeded)) {
        restart();
    }
}

function prepareRestart() {
    if(document.getElementById("pauseBeforeRestart").checked) {
        pauseGame();
    } else {
        restart();
    }
}

function restart() {
    shouldRestart = false;
    timer = 0;
    timeNeeded = timeNeededInitial;
    addGold(-gold);
    addReputation(-reputation);
    addSupplies(-supplies);
    restartStats();
    actions.restart();
    towns.forEach((town) => {
        town.restart();
    });
    skillList.forEach((skill) => {
        view.updateSkill(skill);
    });

    view.updateCurrentActionsDivs();
    save();
}

function addActionToList(name, townNum, isTravelAction) {
    towns[townNum].totalActionList.forEach((action) => {
        if(action.name === name) {
            if(action.visible() && action.unlocked()) {
                if(isTravelAction) {
                    actionTownNum = townNum+1;
                    actions.addAction(name, 1);
                } else {
                    actions.addAction(name);
                }
            }
        }
    });
    view.updateNextActions();
}

function addMana(amount) {
    timeNeeded += amount;
}

function addGold(amount) {
    gold += amount;
    view.updateGold();
}

function addReputation(amount) {
    reputation += amount;
    view.updateReputation();
}

function addSupplies(amount) {
    supplies += amount;
    view.updateSupplies();
}

function changeActionAmount(amount, num) {
    actions.addAmount = amount;
    view.updateAddAmount(num);
}

function selectLoadout(num) {
    if(curLoadout === num) {
        curLoadout = 0;
    } else {
        curLoadout = num;
    }
    view.updateLoadout(curLoadout);
}

function saveList() {
    if(curLoadout === 0) {
        save();
        return;
    }
    loadouts[curLoadout] = copyArray(actions.next);
    save();
}

function loadList() {
    if(curLoadout === 0) {
        return;
    }
    if(!loadouts[curLoadout]) {
        actions.next = [];
    } else {
        actions.next = copyArray(loadouts[curLoadout]);
    }
    // view.updateCurrentActionsDivs();
    view.updateNextActions();
}

function unlockTown(townNum) {
    if(townNum > maxTown) {
        maxTown = townNum;
        view.showTown(townNum); //refresh current
    }
    curTown = townNum;
}
