
var goGame = {

    table : [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    turn  : 0

}

for(x=0;x<goGame.table.length;x++){
    for(y=0;y<goGame.table[x].length;y++){
        document.write('<span class="case" id='+ x +' data-info=' + y + ' onClick="clicked(id,this);">.</span>');
    }
    document.write('<br>');
}

function clicked(e,u){
    var tableX = e,
        tableY = parseInt($(u).attr('data-info'));

    goGame.turn = goGame.turn + 1;

    if(goGame.table[tableX][tableY] === 0 ){

        function checkPair(nombre){
            res = nombre%2;

            if(res === 1){
                return true;
            }
            else return false;
        }

        if(checkPair(goGame.turn) == false){

            goGame.table[tableX][tableY] = 1;
            $(u).addClass('blanc');

        }
        else{

            goGame.table[tableX][tableY] = 2;
            $(u).addClass('noir');

        }

    }
    else{
        alert('case déjà joué');
        goGame.turn = goGame.turn - 1;
    }

    eliminate();

}

function eliminate(){

    for(x=0;x<goGame.table.length;x++){
        for(y=0;y<goGame.table[0].length;y++){
            
            if(goGame.table[x][y] == 1)
            {

                if(goGame.table[x-1][y] == 2 && goGame.table[x+1][y] == 2 && goGame.table[x][y-1] == 2 && goGame.table[x][y+1] == 2)
                {
                    goGame.table[x][y] = 3;
                }

            }

        }
        
    }

}

function retireCouleur(){
    
    
    
}





























