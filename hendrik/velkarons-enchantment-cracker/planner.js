const Planner = {


    target:null,


    setTarget(target){

        this.target = target;

    },


    findPlan(seed){


        if(!seed){

            return [
                "Kein Seed vorhanden."
            ];

        }



        let plan=[];



        plan.push(
            "Seed gefunden: " + seed
        );



        plan.push(
            "Verzauberungstisch öffnen."
        );



        plan.push(
            "Bücherregale auf 15 setzen."
        );



        let prediction =
        EnchantmentCracker.predict(
            seed
        );



        plan.push(
            "Nächste Slots:"
        );


        plan.push(
            "Slot 1: " + prediction.slot1
        );


        plan.push(
            "Slot 2: " + prediction.slot2
        );


        plan.push(
            "Slot 3: " + prediction.slot3
        );



        if(this.target){


            plan.push(
                "Suche Ziel: " + this.target
            );


            plan.push(
                "Weitere Beobachtungen sammeln, um die Suche zu verfeinern."
            );


        }
        else{


            plan.push(
                "Kein Ziel gesetzt."
            );


        }



        return plan;


    },



    optimize(observations){


        let result=[];



        if(
            observations.length < 3
        ){

            result.push(
                "Mehr Beobachtungen benötigt."
            );

            return result;

        }



        result.push(
            "Genug Daten gesammelt."
        );


        result.push(
            "Nächster Schritt:"
        );


        result.push(
            "Weitere Bücher- oder Item-Rolls aufnehmen."
        );



        return result;


    }



};
