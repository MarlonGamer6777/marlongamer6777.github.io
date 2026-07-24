class JavaRandom {

    constructor(seed){

        this.seed =
        (BigInt(seed) ^ 0x5DEECE66Dn)
        & ((1n << 48n) - 1n);

    }


    next(bits){

        this.seed =
        (
            this.seed * 25214903917n + 11n
        )
        &
        ((1n << 48n) - 1n);


        return Number(
            this.seed >> (48n - BigInt(bits))
        );

    }



    nextInt(bound){


        if(bound <= 0){

            throw new Error(
                "Bound muss größer als 0 sein"
            );

        }


        if(
            (bound & (bound - 1)) === 0
        ){

            return Number(
                (BigInt(bound) * BigInt(this.next(31))) >> 31n
            );

        }



        let bits;
        let value;


        do{


            bits=this.next(31);

            value=bits % bound;


        }while(
            bits - value + (bound - 1) < 0
        );



        return value;


    }




    nextLong(){


        let high =
        BigInt(this.next(32));


        let low =
        BigInt(this.next(32));


        return (
            (high << 32n)
            +
            low
        );


    }



    nextFloat(){

        return (
            this.next(24)
            /
            16777216
        );

    }



    nextDouble(){

        let high =
        BigInt(this.next(26));


        let low =
        BigInt(this.next(27));


        return Number(
            ((high << 27n) + low)
        )
        /
        9007199254740992;

    }


}




function randomSeed(){

    const high =
    BigInt(
        Math.floor(
            Math.random()*0xffffffff
        )
    );


    const low =
    BigInt(
        Math.floor(
            Math.random()*0xffffffff
        )
    );


    return (
        (high << 32n)
        |
        low
    );

}
