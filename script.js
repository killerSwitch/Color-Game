//alert("Connected!");

var new_color_button = document.getElementById("new_colors");
var colors;
var easy_button = document.getElementById("easy");
var hard_button = document.getElementById("hard");
var len = 6;
console.log(easy_button);

initialize();


function hide_blocks(){

   var str =  len == 3 ? "none": "block";
   for(var i=3; i<6; i++){
       squares[i].style.display = str;
   }
}



function initialize(){
    colors = generate_color(len);

    goal = random_color();
    squares = document.querySelectorAll(".square");

    message = document.getElementById("message");
    // Display/hide divs according to len
    hide_blocks();

    //Change RGB text
    pick_newColor();

    //reset background of h1 and message text
    resetH1_message();

    new_color_button.textContent ="New Colors";

    // paint squares with initial colors
    paint_squares();

}

function toggle_hard_easy() {
    easy_button.classList.toggle("selected");
    hard_button.classList.toggle("selected");
}

easy_button.addEventListener("click", function () {
    if(len != 3)
    {
        toggle_hard_easy();
        len = 3;
        initialize();
    }
});

hard_button.addEventListener("click", function(){
    if(len != 6)
    {
        toggle_hard_easy();
        len = 6;
        initialize();
    }
});

function resetH1_message(){
    var h1_background = document.querySelector(".header");
    h1_background.style.background = "steelblue";

    // change message
    message.textContent = "";
}


// paint with new colors when clicked
new_color_button.addEventListener("click", function(){
   //alert("Button Clickded");
    this.textContent = "New Colors";
    // generate new colors
    colors = generate_color(len);

    // change goal
    goal = random_color();

    // change picked color text
    pick_newColor();

    // change background of h1 element
    //change message content
    resetH1_message();

    paint_squares();
    //console.log(colors);
});


//Change rgb() text
function pick_newColor() {
    var pickedColor = document.getElementById("_goal");
    pickedColor.innerText = goal;
}



function generate_color(len){
// make and array
    var colors = [];
// add random colors to array
   for(var i=0; i<len; i++){
       var r = Math.floor(Math.random()*256);
       var g =Math.floor(Math.random()*256);
       var b =Math.floor(Math.random()*256);
       colors.push("rgb(" + r +", "+ g+ ", " +b+")");
       //colors[i] = "rgb(" + r +", "+ g+ ", " +b+")";
       //console.log(colors[i]);
    }
    // return array
    return colors;
}

function color_all() {
    for(var i=0; i<squares.length; i++){
        squares[i].style.background = goal;
    }
}

function paint_squares(){

    for(var i=0; i<squares.length; i++){
        // add initial colors
        squares[i].style.background = colors[i];

        // add event listeners
        squares[i].addEventListener("click", function(){
            // get the color of clicked square
            var guess = this.style.background;
            //alert(guess);
            if(guess === goal)
            {
                message.textContent = "Correct";
                color_all();
                var h1_background = document.querySelector(".header");
                h1_background.style.background = goal;
                new_color_button.textContent = "Play Again?";
            }
            else{
                this.style.background = "#232323";
                message.textContent = "Try Again";
            }

            // compare it with our goal or picked_color

        })
    }
}


function random_color() {
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}