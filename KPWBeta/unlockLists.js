'use strict';

let unlockLists = {
    tick: function() {
        unlockLists.checkUnlocks();
    },
    checkUnlocks: function() {
        unlockLists.check(1, levelData && levelData.home.units.length === 0);
        unlockLists.check(2, gold > 0, ["goldContainer", "castleLabel1", "castleLabel2", "woodContainer"]);
        unlockLists.check(3, created.scavenger > 0, ["unitsToMove", "castleLabel3", "optionsActionContainer"]);
        unlockLists.check(4, created.spearman > 0);
        unlockLists.check(5, highestLevel >= 1);
        unlockLists.check(6, curLevel >= 1, ["kingLabel1", "kingLabel2"]);
        unlockLists.check(7, highestLevel >= 2);
        unlockLists.check(8, curLevel >= 2, ["kingLabel3"]);
        unlockLists.check(9, curLevel >= 3, ["directWorkerBonus"]);
        unlockLists.check(10, curLevel >= 4, ["favorContainer", "castleLabel4", "kingLabel4"]);
        unlockLists.check(11, curLevel >= 5, ["statLabel1", "statLabel2", "statLabel3"]);
        unlockLists.check(12, curLevel >= 6, ["soulCContainer", "spearmanEmpowerButton", "archerEmpowerButton", "catapultEmpowerButton"]);

        // unlockLists.check(20, false, ["heroesToMove"]);

        unlockLists.checkStory(0, true);
        unlockLists.checkStory(1, true);
        unlockLists.checkStory(2, true);
        unlockLists.checkStory(3, true);
        unlockLists.checkStory(4, true);
        unlockLists.checkStory(5, true);
        unlockLists.checkStory(6, true);
        initialUnlock = false;

        unlockLists.check(0, !unlockList[0]);
    },
    check: function(num, shouldUnlock, isMadeVisibleList) {
        if((shouldUnlock && !unlockList[num]) || (initialUnlock && unlockList[num])) {
            if(isMadeVisibleList) {
                for (let i = 0; i < isMadeVisibleList.length; i++) {
                    removeClassFromDiv(document.getElementById(isMadeVisibleList[i]), "hidden");
                }
            }
            if(!unlockList[num] && tutorial[num]) {
                recentTutorial = num;
                createTooltip(tutorial[num]);
            }
            unlockList[num] = true;
        }
    },
    checkStory: function(num, shouldUnlock) {
        if(unlockStory[num] === undefined && shouldUnlock) {
            unlockStory[num] = true;
            adjustStoryDivs();
        }
    }
};
