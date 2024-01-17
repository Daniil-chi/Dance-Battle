const gameParametrs = {
    MAX_LEVEL: 10,
    MAX_STAT: 99,
    MIN_STAT: 10,
}

const gameClasses = {
    Mage: "Маг",
    Knight: "Рыцарь",
    Hero: "Класс",
}

let playHero = null;
let enemyHero = null;

const sendToBattleButton = document.getElementById("sendToBattleButton");
const getEnemyButton = document.getElementById("getEnemyButton");
const doSkillButton = document.getElementById("doSkillButton");
const startBattleButton = document.getElementById("startBattleButton");

function displayPlayerHero(hero) {
    document.getElementById("playerHeroClass").innerHTML = gameClasses[hero.constructor.name];
    document.getElementById("playerHeroName").innerHTML = hero.name;
    document.getElementById("playerHeroLevel").innerHTML = hero.level;
    document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
    document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
    document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
    document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;
    hero.displayHero();
}

function displayEnemyHero(hero) {
    document.getElementById("enemyHeroClass").innerHTML = gameClasses[hero.constructor.name];
    document.getElementById("enemyHeroName").innerHTML = hero.name;
    document.getElementById("enemyHeroLevel").innerHTML = hero.level;
    document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
    document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
    document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
    document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;
    hero.displayHero();
}

sendToBattleButton.onclick = () => {
    const heroName = document.getElementById("name").value;
    if (heroName !== "") {
        const heroClass = document.querySelector('input[name="class"]:checked').value;
        const heroLevel = document.getElementById("level").value;
        const heroStats = {};
        heroStats.str = Number(document.getElementById("strength").value)
        if (heroStats.str > gameParametrs.MAX_STAT) {
            heroStats.str = gameParametrs.MAX_STAT;
        }
        heroStats.int = Number(document.getElementById("intelligence").value)
        if (heroStats.int > gameParametrs.MAX_STAT) {
            heroStats.int = gameParametrs.MAX_STAT;
        }
        heroStats.agi = Number(document.getElementById("agility").value);
        if (heroStats.agi > gameParametrs.MAX_STAT) {
            heroStats.agi = gameParametrs.MAX_STAT;
        }
        const additionalAbility = document.querySelector('input[name="additionalAbility"]:checked').value;
        const additionalStat = document.getElementById("additionalStat").value;
        if (heroClass === "Mage") {
            playHero = new Mage(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
        }
        else if (heroClass === "Knight") {
            playHero = new Knight(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
        }
        else {
            console.error("Упс, произошла какая-то ошибка");
        }
        displayPlayerHero(playHero);

        getEnemyButton.removeAttribute("disabled");
        doSkillButton.removeAttribute("disabled");
    }
    else {
        alert("Добавьте имя героя");
    }
}

getEnemyButton.onclick = () => {
    fetch(`https://api-code.practicum-team.ru/heroes`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let randomEnemy = data[Math.floor(Math.random() * data.length)];
            console.log(randomEnemy);
            enemyHero = new Hero(
                randomEnemy.title,
                Math.floor(Math.random() * 10) + 1,
                randomEnemy.hp=100,
                {
                    str: randomEnemy.str,
                    int: randomEnemy.int,
                    agi: randomEnemy.agi,
                }
            );
            displayEnemyHero(enemyHero);
            if (playHero) {
                startBattleButton.removeAttribute("disabled");
            }
            getEnemyButton.setAttribute("disabled", "disabled");
        })
        .catch((error) => console.error("Ошибка:", error));
};

function countStatsSum(hero) {
    let statsSum = 0;
    statsSum += hero.stats.str;
    statsSum += hero.stats.int;
    statsSum += hero.stats.agi;
    statsSum += hero.healthPoints;
    return statsSum;
}

function arena(firstHero, secondHero) {
    console.log(`Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`);

    let winner = null;

    let fistHeroSum = countStatsSum(firstHero);
    let secondHeroSum = countStatsSum(secondHero);

    console.log("Сумма значений параметров первого героя: ", fistHeroSum);
    console.log("Сумма значений параметров второго героя: ", secondHeroSum);

    if (fistHeroSum > secondHeroSum) {
        winner = firstHero;
    }
    else if (secondHeroSum > fistHeroSum) {
        winner = secondHero;
    }

    if (winner) {
        console.log(`Ритмично чествуем победителя: ${winner.name}`);
        alert(`Ритмично чествуем победителя: ${winner.name}`);
    }
    else {
        console.log("В танцевальном баттле победила дружба!");
        alert("В танцевальном баттле победила дружба!");
    }
}

startBattleButton.onclick = () => {
    arena(playHero, enemyHero);
}

