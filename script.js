
var goGame = {

    table : [],
    turn  : 0
}

var chainCpt = 1;

for(x=0;x<=18;x++){
    goGame.table[x] =[];
    for(y=0;y<=18;y++){
        goGame.table[x][y] = {
            xPiece : x,
            yPiece : y,
            color : null,
            chain : 0
        }
    }
}

for(x=0;x<goGame.table.length;x++){
    for(y=0;y<goGame.table[x].length;y++){
        document.write('<span class="case" id="x' + x + 'y' + y +'" onClick="clicked('+ x +','+ y +');">.</span>');
    }
    document.write('<br>');
}

function clicked(x,y){

    if(goGame.table[x][y].color == null){

//
//        $('.passeTour').on('click', function(){
//
//            var passeBlanc = 0,
//                passeNoir  = 0;
//
//            if(checkPair(goGame.turn) == false)
//            {
//
//                passeBlanc = passeBlanc + 1;
//
//            }
//            else
//            {
//
//                passeNoir = passeNoir + 1;
//
//            }
//
//        });

        if(goGame.table[x][y].color == null ){

            if(checkPair(goGame.turn) == false){

                goGame.table[x][y] = {
                    color : 'blanc',
                    chain : chainCpt
                };
                chainCpt++;
                $('#x'+x+'y'+y).addClass('blanc');
                $('.tour').text('Noir');

            }
            else{

                goGame.table[x][y] = {
                    color : 'noir',
                    chain : chainCpt
                };
                chainCpt++;
                $('#x'+x+'y'+y).addClass('noir');
                $('.tour').text('Blanc');

            }
            goGame.turn = goGame.turn + 1;
        }
        else{
            console.log('case déjà joué');
        }    
        retireCouleur();
        current_state();
    }
}

    function testChain(x,y){

        for (var i = -1; i <= 1; i+2) {
            for (var j = -1; j <= 1; j+2) {
                if(goGame.table[x-1][y].color != null && goGame.table[x+1][y].color != null && goGame.table[x][y-1].color != null && goGame.table[x][y+1].color != null){
                    //tester les chaines
                }
            }
        }



        // for(x=0;x<goGame.table.length;x++){
        //     for(y=0;y<goGame.table[0].length;y++){

        //         if(goGame.table[x][y] == 1)
        //         {

        //             if(goGame.table[x-1][y] == 2 && goGame.table[x+1][y] == 2 && goGame.table[x][y-1] == 2 && goGame.table[x][y+1] == 2)
        //             {
        //                 goGame.table[x][y] = 3;
        //             }

        //         }
        //         if(goGame.table[x][y] == 2)
        //         {

        //             if(goGame.table[x-1][y] == 1 && goGame.table[x+1][y] == 1 && goGame.table[x][y-1] == 1 && goGame.table[x][y+1] == 1)
        //             {
        //                 goGame.table[x][y] = 4;
        //             }

        //         }

        //     }

        // }

    }

    function retireCouleur(){

        for(x=0;x<goGame.table.length;x++){
            for(y=0;y<goGame.table[0].length;y++){

                if(goGame.table[x][y] == 3)
                {

                    var mort = $('span#'+x+'.case[data-info='+y+']');
                    $(mort).removeClass('blanc');

                }
                if(goGame.table[x][y] == 4)
                {

                    var mort = $('span#'+x+'.case[data-info='+y+']');
                    $(mort).removeClass('noir');

                }
            }
        }
    }


    function current_state(){

        var compteNoir      = 0,
            compteBlanc     = 0,
            prisonnierNoir  = 0,
            prisonnierBlanc = 0,
            afficheBlanc    = $('.valueBlanc'),
            afficheNoir     = $('.valueNoir'),
            affichePBlanc   = $('.prisonnierBlanc'),
            affichePNoir    = $('.prisonnierNoir');

        for(x=0;x<goGame.table.length;x++){
            for(y=0;y<goGame.table[0].length;y++){

                if(goGame.table[x][y] == 1)
                {
                    compteNoir = compteNoir + 1;
                }  
                if(goGame.table[x][y] == 2)
                {
                    compteBlanc = compteBlanc + 1;
                }  
                if(goGame.table[x][y] == 3)
                {
                    prisonnierNoir = prisonnierNoir + 1;
                }  
                if(goGame.table[x][y] == 4)
                {
                    prisonnierBlanc = prisonnierBlanc + 1;
                }
            }

            $(afficheNoir).text(compteNoir);
            $(afficheBlanc).text(compteBlanc);
            $(affichePBlanc).text(prisonnierNoir);
            $(affichePNoir).text(prisonnierBlanc);

        }
    }




    function checkPair(nombre){
        res = nombre%2;
        if(res === 1){


            return true;
        }
        else return false;
    }






















