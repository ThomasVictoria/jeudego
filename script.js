
var goGame = {

    table : [],
    turn  : 0
}

var chainCpt        = 1,
	compteNoir      = 0,
	compteBlanc     = 0,
	prisonnierNoir  = 0,
	prisonnierBlanc = 0;

// Créer le tableau qui générera le plateau
for(x=0;x<=18;x++){
	goGame.table[x] =[];
	for(y=0;y<=18;y++){
		goGame.table[x][y] = {
			xPiece : x+1,
			yPiece : y+1,
			color : null,
			chain : 0,
			prisoner : false
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
		testChain(x,y);
		current_state(x,y);
	}
	else{
		console.log('case déjà joué');
	}    
}

function testChain(x,y){
	var prisoners = [false, false, false, false];
	var cpt = 0;
	for (var i = -1; i < 2; i=i+2) {
		if (goGame.table[x+i][y].color != null && goGame.table[x+i][y].color != goGame.table[x][y].color){
			prisoners[cpt] = true;
		}
		cpt++;
	}
	for (var j = -1; j < 2; j= j+2) {
		if (goGame.table[x][y+j].color != null && goGame.table[x][y+j].color != goGame.table[x][y].color){
			prisoners[cpt] = true;
		}
		cpt++;
	}

	if (prisoners[0] == true && prisoners[1] == true && prisoners[2] == true && prisoners[3] == true) {
		goGame.table[x][y].prisoner = true;
	}

}

function current_state(x,y){
	var	afficheBlanc    = $('.valueBlanc'),
		afficheNoir     = $('.valueNoir'),
		affichePBlanc   = $('.prisonnierBlanc'),
		affichePNoir    = $('.prisonnierNoir');

	if (goGame.table[x][y].color == 'noir') {
		if (goGame.table[x][y].prisoner == true) {
			prisonnierBlanc++;
		}
		compteNoir++;
	}
	else if (goGame.table[x][y].color == 'blanc') {
		if (goGame.table[x][y].prisoner == true) {
			prisonnierNoir++;
		}
		compteBlanc++;
	}
		
	$(afficheNoir).text(compteNoir);
	$(afficheBlanc).text(compteBlanc);
	$(affichePBlanc).text(prisonnierNoir);
	$(affichePNoir).text(prisonnierBlanc);
}

// Fonction qui permet de determiner le tour du joueur
function checkPair(nombre){
    res = nombre%2;
    if(res === 1){
        return true;
    }
    else return false;
}


// Fonction qui determine la fin de partie
var comptePasse = 0;
function passetour(){

    comptePasse = comptePasse + 1;
    goGame.turn = goGame.turn + 1;

    if(comptePasse == 1)
    {
        $('.compteurPasse').val(''+goGame.turn+'');
    }
    else if(comptePasse == 2)
    {
        var precTurn = $('.compteurPasse').val();
        if(precTurn == (goGame.turn-1))
        {
            endGame();
        }

    }
    else
    {
        comptePasse = 1;
        $('.compteurPasse').val(''+goGame.turn+'');
    }

}

// Calcule resultat du jeu, affichage du gagnant et arret du jeu
function endGame()
{

    var compteNoir      = 0,
        compteBlanc     = 0,
        winner;

    for(x=0;x<goGame.table.length;x++){
        for(y=0;y<goGame.table[0].length;y++){

            if(goGame.table[x][y].color == 'noir')
            {
                compteNoir = compteNoir + 1;
            }  
            if(goGame.table[x][y].color == 'blanc')
            {
                compteBlanc = compteBlanc + 1;
            }  
            if(goGame.table[x][y].color == 'prisblanc')
            {
                compteNoir = compteNoir + 1;
            }  
            if(goGame.table[x][y].color == 'prisnoir')
            {
                compteBlanc = compteBlanc + 1;
            }
        }
    }
    
    // Ajout des points du Komi
    compteBlanc = compteBlanc + 7.5;
    
    if(compteBlanc > compteNoir)
    {
        winner = 'Blanc';
    }
    else
    {
        winner = 'Noir';
    }
    
    $('.winner').empty();
    $('.winner').text('Le joueur '+winner+' à gagné!');
    $('.winner').css({'position':'absolute','margin-left':'-800px','font-size':'70px'});
    $('.case').removeAttr('onclick');
    
}












