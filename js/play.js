$("#player1").addClass("active");
let oBoxes = [];
let xBoxes = [];

/*
Gör en function som man ska calla varje gång någon clickar (efter resten av koden)
som checkar oBoxes och xBoxes om dom har nummer i sig som är en vinst. 
*/
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWins(oWin, xWin) {
    if (oBoxes.length == 5) {
        $('body').load('html_snippets/win.txt', function () {
            $('#finish').addClass('screen-win-tie');
            $('.message').text("It's a Tie!");
            $('.button').attr("href", "board.html");
        });
    }
    for (let u = 0, oPoints = 0, xPoints = 0; u < winConditions.length; u++, oPoints = 0, xPoints = 0) {
        for (let i = 0; i < oWin.length; i++) {
            if ($.inArray(oWin[i], winConditions[u]) != -1) {
                oPoints++;
                if (oPoints == 3) {
                    $('body').load('html_snippets/win.txt', function () {
                        $('#finish').addClass('screen-win-one');
                        $('.message').text('Winner');
                        $('.button').attr("href", "board.html");
                    });
                }
            }
        }
        for (let i = 0; i < xWin.length; i++) {
            if ($.inArray(xWin[i], winConditions[u]) != -1) {
                xPoints++;
                if (xPoints == 3) {
                    $('body').load('html_snippets/win.txt', function () {
                        $('#finish').addClass('screen-win-two');
                        $('.message').text('Winner');
                        $('.button').attr("href", "board.html");
                    });
                }
            }
        }
    }
}



$(".box").hover(function () {
    if ($(this).hasClass("box-filled-1") == false && $(this).hasClass("box-filled-2") == false) {
        if ($("#player1").hasClass("active")) {
            $(this).css("background-image", "url('/img/o.svg')")
        } else if ($("#player2").hasClass("active")) {
            $(this).css("background-image", "url('/img/x.svg')")
        }
    }

}, function () {
    if ($(this).hasClass("box-filled-1") == false && $(this).hasClass("box-filled-2") == false) {
        $(this).css('background-image', 'none');
    }

});

$(".box").click(function () {
    if ($(this).hasClass("box-filled-1") == false && $(this).hasClass("box-filled-2") == false) {
        if ($("#player1").hasClass("active")) {
            oBoxes.push($(this).index());
            $(this).addClass("box-filled-1");
            $("#player1").removeClass("active");
            $("#player2").addClass("active");
            checkWins(oBoxes, xBoxes);
        } else if ($("#player2").hasClass("active")) {
            xBoxes.push($(this).index());
            $(this).addClass("box-filled-2");
            $("#player2").removeClass("active");
            $("#player1").addClass("active");
            checkWins(oBoxes, xBoxes);
        }
    }

});