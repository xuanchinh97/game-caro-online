//xu ly ban co
let x = 20,y=25;
let checkLine = -1;
let gameFinish = false;
let arrChess = new Array(x);
let xflag = true;
    for(let i=0;i<x;i++){
        arrChess[i] = new Array(y); 
        for(let j=0;j<y;j++){
            jQuery('<div/>', {
                id: "pos-"+i+"-"+j,
                "class": 'align-items-center pb-2 mb-3 khung-ban-co khung-co'
            }).appendTo('#khung-ban-co-1');
            $("#pos-"+i+"-"+j).click(function() {
                if(checkAlClick(i,j)==true){
                    if(xflag == true){
                        xflag = false;
                        $("#pos-"+i+"-"+j).css('background-image', 'url("images/gomoku/X-chess-color.png")');
                        arrChess[i][j] = 1;
                        
                    }else{
                        xflag = true;
                        $("#pos-"+i+"-"+j).css('background-image', 'url("images/gomoku/O-chess-color.png")');
                        arrChess[i][j] = 0;
                    }
                    findPlayerWin();
                }
            });
        }
    }
    function findPlayerWin(){
        let player = -1;
        for(let i=0;i<x;i++){
            for(let j=0;j<y;j++){
                if(arrChess[i][j]==0){
                    if(checkWin(0,i,j)>=5){
                        fillColorLine(checkLine,i,j);
                        player = 0;
                    }
                }else if(arrChess[i][j]==1){
                    if(checkWin(1,i,j)>=5){
                        fillColorLine(checkLine,i,j);
                        player = 1;
                    }
                }
            }
        }
        showPlayerWin(player);
    }
    function showPlayerWin(player){
        if(player==0){
            $(".notice-result").text("O chiến thắng!!");
            $(".notice-result").css("display", "block");
            gameFinish = true;
            jQuery("#khung-ban-co-1").css('opacity', '0.6');
        }else if(player==1){
            $(".notice-result").text("X chiến thắng!!");
            $(".notice-result").css("display", "block");
            gameFinish = true;
            jQuery("#khung-ban-co-1").css('opacity', '0.6');
        }
    }
    function checkWin(c,i,j){
        let dem = 0;
        let itemp=i,jtemp=j;
        try {
            //check ngang;
            while(dem<5){
                if(arrChess[itemp][jtemp]==c){
                    dem++;
                    jtemp++;
                }else{
                    break;
                }
            }
            if(dem>=5){
                checkLine = 0;
                return dem;
            }
        } catch{}
        try {
            //check dọc;
            dem = 0,checkLine = -1;
            itemp=i,jtemp=j;
            while(dem<5){
                if(arrChess[itemp][jtemp]==c){
                    dem++;
                    itemp++;
                }else{
                    break;
                }
            }
            if(dem>=5){
                checkLine = 1;
                return dem;
            }
        } catch{}
        try {
            //check chéo chính
            dem = 0;checkLine = -1;
            itemp=i,jtemp=j;
            while(dem<5){
                if(arrChess[itemp][jtemp]==c){
                    dem++;
                    itemp++;jtemp++;
                }else{
                    break;
                }
            }
            if(dem>=5){
                checkLine = 2;
                return dem;
            }
        } catch{}
        try {
            //check chéo phụ
            dem = 0;checkLine = -1;
            itemp=i,jtemp=j;
            while(dem<5){
                if(arrChess[itemp][jtemp]==c){
                    dem++;
                    itemp++;jtemp--;
                }else{
                    break;
                }
            }
            if(dem>=5){
                checkLine = 3;
                return dem;
            }
        } catch{}
        //kết thúc
        return dem;
    }
    function fillColorLine(cas,i,j){
        painNum=5;
        if(cas==0){
            while(painNum>0){//duong ngang
                $("#pos-"+i+"-"+j).css('background-color', 'green');
                j++;painNum--;
            }
        }else if(cas==1){//duong doc
            while(painNum>0){
                $("#pos-"+i+"-"+j).css('background-color', 'green');
                i++;painNum--;
            }
        }else if(cas==2){
            while(painNum>0){//duong cheo chinh
                $("#pos-"+i+"-"+j).css('background-color', 'green');
                i++;j++;painNum--;
            }
        }else{
            while(painNum>0){//duong cheo phu
                $("#pos-"+i+"-"+j).css('background-color', 'green');
                i++;j--;painNum--;
            }
        }
    }
    function checkAlClick(i,j){
        if(arrChess[i][j]!=1 && arrChess[i][j]!=0 && gameFinish == false){
            return true;
        }else{
            return false;
        }
    }
    function restartGame(){
        $(".notice-result").css("display", "none");
        jQuery("#khung-ban-co-1").css('opacity', '1');
        $(".khung-co").css('background-image', 'none');
        $(".khung-co").css('background-color', 'white');
        //reset arr
        arrChess.slice(0,x);
        arrChess = new Array(x);
        for(let i=0;i<x;i++){
            arrChess[i] = new Array(y); 
        }
        checkLine = -1;
        gameFinish = false;
        xflag = true;
    }