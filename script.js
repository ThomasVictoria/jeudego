
var goGame = {

    table : [],
    turn  : 0
}

var chainCpt = 1;

// Créer le tableau qui générera le plateau
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


// Génére les cases du jeu de go en fonction du tableau goGame.table
for(x=0;x<goGame.table.length;x++){
    for(y=0;y<goGame.table[x].length;y++){
        document.write('<span class="case" id="x' + x + 'y' + y +'" onClick="clicked('+ x +','+ y +');">.</span>');
    }
    document.write('<br>');
}

// Fonction principal qui change les couleurs au click 
function clicked(x,y){

    if(goGame.table[x][y].color == null){

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

// Fonction qui determine la prise des cases
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

// Fonction qui retire la couleur à la case si elle est considéré morte
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

// Fonction qui affiche l'état de jeu
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

            if(goGame.table[x][y].color == 'blanc')
            {
                compteNoir = compteNoir + 1;
            }  
            if(goGame.table[x][y].color == 'noir')
            {
                compteBlanc = compteBlanc + 1;
            }  
            if(goGame.table[x][y].color == 'prisnoir')
            {
                prisonnierNoir = prisonnierNoir + 1;
            }  
            if(goGame.table[x][y].color == 'prisblanc')
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

// Fonction qui permet de determiner le tour du joueur
function checkPair(nombre){
    res = nombre%2;
    if(res === 1){
        return true;
    }
    else return false;
}


// Fonction qui determine la fin de partie (pas finit)
var comptePasse = 0;
$('.passeTour').on('click', function(){

    comptePasse = comptePasse + 1;
    goGame.turn = goGame.turn + 1;
    var precTurn = $('.compteurPasse').val();


    if(comptePasse == 1)
    {
        $('.compteurPasse').val(''+goGame.turn+'');
    }
    else if(comptePasse == 2)
    {
        if(precTurn == (goGame.turn-1))
        {
            alert('finit');
        }
        else{
            comptePasse = 1;
        }
    }
    else
    {
        comptePasse = 0;
    }

    console.log('compteur passe : '+comptePasse);
    console.log('compteur tour précedent : '+precTurn);
    console.log('tour : '+goGame.turn);


})














