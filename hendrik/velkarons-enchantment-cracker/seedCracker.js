const EnchantmentCracker = {

    observations: [],

    possibleSeeds: [],


    search(observations){


        this.observations = observations;

        this.possibleSeeds = [];


        const maxSearch = 1000000;


        for(
            let seed = 0;
            seed < maxSearch;
            seed++
        ){


            if(
                this.testSeed(seed)
            ){

                this.possibleSeeds.push(seed);

            }


        }


        return this.possibleSeeds;

    },



    testSeed(seed){


        const rng =
        new JavaRandom(seed);



        for(
            const obs of this.observations
        ){


            const enchantSeed =
            rng.nextInt(2147483647);



            const slot1 =
            this.calculateLevel(
                enchantSeed,
                obs.bookshelves,
                0
            );


            const slot2 =
            this.calculateLevel(
                enchantSeed,
                obs.bookshelves,
                1
            );


            const slot3 =
            this.calculateLevel(
                enchantSeed,
                obs.bookshelves,
                2
            );



            if(
                slot1 !== obs.slots[0] ||
                slot2 !== obs.slots[1] ||
                slot3 !== obs.slots[2]
            ){

                return false;

            }


        }


        return true;

    },



    calculateLevel(seed,bookshelves,slot){


        const rng =
        new JavaRandom(
            seed + slot
        );



        let level =
        Math.floor(
            rng.nextInt(8)
        )
        +
        1
        +
        Math.floor(
            bookshelves / 2
        )
        +
        rng.nextInt(
            bookshelves + 1
        );



        if(slot===1){

            level =
            Math.floor(
                level * 2 / 3
            );

        }


        if(slot===2){

            level =
            Math.max(
                level,
                level * 2
            );

        }



        return Math.max(
            1,
            level
        );


    },



    predict(seed){


        const rng =
        new JavaRandom(seed);



        return {

            slot1:
            rng.nextInt(30)+1,


            slot2:
            rng.nextInt(30)+1,


            slot3:
            rng.nextInt(30)+1

        };


    }



};
