let observations = [];

const item = document.getElementById("item");
const bookshelves = document.getElementById("bookshelves");

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");

const table = document.getElementById("observationTable");

const result = document.getElementById("result");
const predictions = document.getElementById("predictions");
const planner = document.getElementById("planner");

const addButton = document.getElementById("addObservation");
const calculateButton = document.getElementById("calculateSeed");
const resetButton = document.getElementById("reset");


window.onload = function(){

    const saved = localStorage.getItem("enchantObservations");

    if(saved){

        observations = JSON.parse(saved);
        updateTable();

    }

};



addButton.onclick = function(){

    const observation = {

        item:item.value,

        bookshelves:Number(
            bookshelves.value
        ),

        slots:[

            Number(slot1.value),
            Number(slot2.value),
            Number(slot3.value)

        ]

    };


    if(
        observation.slots.includes(0) ||
        observation.slots.some(
            value => Number.isNaN(value)
        )
    ){

        alert(
            "Bitte alle drei Level eintragen."
        );

        return;

    }


    observations.push(observation);

    save();

    updateTable();


    slot1.value="";
    slot2.value="";
    slot3.value="";


};



function updateTable(){

    table.innerHTML="";


    observations.forEach(
        function(obs,index){


            const row=document.createElement("tr");


            row.innerHTML=`

            <td>${index+1}</td>
            <td>${obs.item}</td>
            <td>${obs.bookshelves}</td>
            <td>${obs.slots[0]}</td>
            <td>${obs.slots[1]}</td>
            <td>${obs.slots[2]}</td>

            `;


            table.appendChild(row);


        }
    );

}



function save(){

    localStorage.setItem(
        "enchantObservations",
        JSON.stringify(observations)
    );

}




calculateButton.onclick=function(){


    if(observations.length===0){

        result.innerHTML=
        "Keine Beobachtungen vorhanden.";

        return;

    }



    const seeds =
    EnchantmentCracker.search(
        observations
    );



    if(seeds.length===0){

        result.innerHTML=
        `
        Keine passenden Seeds gefunden.
        `;

        predictions.innerHTML=
        "Keine Daten.";

        planner.innerHTML=
        "Keine Lösung.";

        return;

    }



    result.innerHTML=
    `
    Gefundene Seeds:
    <br><br>
    ${
        seeds
        .slice(0,20)
        .join("<br>")
    }

    <br><br>

    Anzahl:
    ${seeds.length}
    `;



    const prediction =
    EnchantmentCracker.predict(
        seeds[0]
    );



    predictions.innerHTML=
    `
    Slot 1:
    ${prediction.slot1}

    <br>

    Slot 2:
    ${prediction.slot2}

    <br>

    Slot 3:
    ${prediction.slot3}
    `;



    planner.innerHTML=
    `
    Verwende weitere Beobachtungen,
    um den Seed weiter einzugrenzen.
    `;



};





resetButton.onclick=function(){


    const confirmReset =
    confirm(
        "Alle Daten löschen?"
    );


    if(!confirmReset){
        return;
    }



    observations=[];


    localStorage.removeItem(
        "enchantObservations"
    );


    updateTable();



    result.innerHTML=
    "Keine Berechnung durchgeführt.";


    predictions.innerHTML=
    "Keine Vorhersagen.";


    planner.innerHTML=
    "Kein Plan vorhanden.";


};
