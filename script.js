
var goGame = {

    table : [],
    turn  : 0
}

var chainCpt          = 1,
	compteNoir        = 0,
	compteBlanc       = 0,
	prisonnierNoir    = 0,
	prisonnierBlanc   = 0,
	timer             = -1,
	countdownSec      = 0,
	counter,
	chains            = [];




function initGame(secondsToPlay){

	timer = secondsToPlay;
	countdownSec = timer;

	// Créer le tableau qui générera le platea
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
	var imageHeight = $('.plateau').height();
	var imageWidth = $('.plateau').width();
	document.write('<div class="container-pions" style="height:' + imageHeight + 'px;width:' + imageWidth + 'px;">');
	for(x=0;x<goGame.table.length;x++){
		for(y=0;y<goGame.table[x].length;y++){
			document.write('<span style="height:' + 100/19 + '%;width:' + 100/19 + '%;" class="case" id="x' + x + 'y' + y +'" onClick="clicked('+ x +','+ y +');">.</span>');
		}
		document.write('<br>');
	}

	counter = setInterval(countdown, 1000);

}

function countdown()
{
  countdownSec=countdownSec-1;
  if (countdownSec <= 0)
  {
     passetour();
     restartCountdown();
     return;
  }
  $('.timer').html(countdownSec);
}

function restartCountdown(){
	clearInterval(counter);
	countdownSec = timer;
	counter = setInterval(countdown, 1000);
}



// Fonction principal qui change les couleurs au click 
function clicked(x,y){

	if(goGame.table[x][y].color == null ){

		if(checkPair(goGame.turn) == false){

			goGame.table[x][y] = {
				color : 'blanc'
			};
			$('#x'+x+'y'+y).addClass('blanc');
			$('.tour').text('Noir');
		}
		else{
			goGame.table[x][y] = {
				color : 'noir'
			};
			$('#x'+x+'y'+y).addClass('noir');
			$('.tour').text('Blanc');

		}
		goGame.turn = goGame.turn + 1;
		testChain(x,y);
		current_state(x,y);
		restartCountdown();
	}
	else{
		console.log('case déjà joué');
	}    
}


function testChain(x,y){

	var sameChainsAround = [];
	var differentChainsAround = [];

	for (var i = -1; i < 2; i=i+2) {
		if (x == 0 && i == -1) {
			console.log('bord haut');
		}
		else if (x == 18 && i == 1){
			console.log('bord bas');
		}
		else if (goGame.table[x+i][y].color == goGame.table[x][y].color){
			sameChainsAround.push(goGame.table[x+i][y].chain)
		}
		else if (goGame.table[x+i][y].color != goGame.table[x][y].color){
			differentChainsAround.push(goGame.table[x+i][y].chain)
		}
	}
	for (var j = -1; j < 2; j= j+2) {
		if (y == 0 && j == -1) {
			console.log('bord gauche');
		}
		else if (y == 18 && j == 1){
			console.log('bord droit');
		}
		else if (goGame.table[x][y+j].color == goGame.table[x][y].color){
			sameChainsAround.push(goGame.table[x][y+j].chain)
		}
		else if (goGame.table[x][y+j].color != goGame.table[x][y].color){
			differentChainsAround.push(goGame.table[x][y+j].chain)
		}
	}

	switch (sameChainsAround.length){
		case 0:
		goGame.table[x][y].chain = chainCpt;
		chains.push([{'x' : x, 'y' : y}]);
		chainCpt++;
		break;

		case 1:
		goGame.table[x][y].chain = sameChainsAround[0];
		chains[sameChainsAround[0]-1].push({'x' : x, 'y' : y});
		break;

		default:
		var chainToMerge = Math.min.apply(Math,sameChainsAround);
		sameChainsAround = $.grep(sameChainsAround, function(value) {
		  return value != chainToMerge;
		});

		goGame.table[x][y].chain = chainToMerge;
		mergeChains(sameChainsAround, chainToMerge);
		chains[chainToMerge-1].push({'x' : x, 'y' : y});
		sameChainsAround = [chainToMerge];
		break;
	}

	var chainsAround = sameChainsAround.concat(differentChainsAround);
	testChainsLiberty(chainsAround);

}


function mergeChains(array, chainToMerge){
	for(var i=0; i<array.length; i++) {
		for (var j = 0; j <chains[array[i]-1].length; j++) {
			var mergingChain = chains[array[i]-1][j];
			goGame.table[mergingChain.x][mergingChain.y].chain = chainToMerge;
			chains[chainToMerge-1].push({'x' : mergingChain.x, 'y' : mergingChain.y});
		}
	}
}

function isTrue(element, index, array) {
  return element == true;
}

function testChainsLiberty(chainsAround){

	for (var i = 0; i<chainsAround.length; i++) {
		if (chainsAround[i] != 0) {
			var chainEmprisoned = false;
			var prisonersCoins = [];
			for (var j = 0; j <chains[chainsAround[i]-1].length; j++) {
				prisonersCoins.push(testFourLiberties(chains[chainsAround[i]-1][j].x,chains[chainsAround[i]-1][j].y));
			}

			if (prisonersCoins.every(isTrue)){
				deleteChain(chainsAround[i]-1);
			}
		}
	}
}

function testFourLiberties(x,y){
	var prisoners = [false, false, false, false];
	var cpt = 0;

	for (var i = -1; i < 2; i=i+2) {
		if (x == 0 && i == -1) {
			prisoners[cpt] = true;
		}
		else if (x == 18 && i == 1){
			prisoners[cpt] = true;
		}
		else if (goGame.table[x+i][y].color == null){
			prisoners[cpt] = false;
		}
		else {
			prisoners[cpt] = true;
		}
		cpt++;
	}
	for (var j = -1; j < 2; j= j+2) {
		if (y == 0 && j == -1) {
			prisoners[cpt] = true;
		}
		else if (y == 18 && j == 1){
			prisoners[cpt] = true;
		}
		else if (goGame.table[x][y+j].color == null){
			prisoners[cpt] = false;
		}
		else {
			prisoners[cpt] = true;
		}
		cpt++;
	}

	if (prisoners[0] == true && prisoners[1] == true && prisoners[2] == true && prisoners[3] == true) {
		return true;
	}
	else {
		return false;
	}
}

function deleteChain(chainNum){
	for (i=0; i<chains[chainNum].length;i++){
		$('#x'+chains[chainNum][i].x+'y'+chains[chainNum][i].y).attr( "class", "case" );
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
	restartCountdown()
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
    clearInterval(counter);
}



initGame(10);