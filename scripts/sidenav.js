/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    //document.getElementById("main").style.marginLeft = "250px";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
    //document.body.style.backgroundColor = "white";
}

function make_responsive() {      
    var is_mobile = false;

    if( $('#nav-links').css('display')=='none') {
        is_mobile = true;       
    }

    // now i can use is_mobile to run javascript conditionally

    if (is_mobile == true) {
        $('#sidenav-toggle').css('display','block');
        
    } else {
    	$('#sidenav-toggle').css('display','none');
    	
    }
 };

 $( document ).ready(function() { 
 	make_responsive(); 
 });

$(window).resize(function() {
    make_responsive(); 
});