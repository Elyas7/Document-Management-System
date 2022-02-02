
document.addEventListener("DOMContentLoaded", function(event) {
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
  
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
    // show navbar
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
    // Your code to run since DOM is loaded and ready
    });


    function sideBarNavigationToggle() {
        var element = document.getElementById("body-pd");
        element.classList.add("body-pd");
        var headerelement = document.getElementById("header");
        headerelement.classList.add("body-pd");
        var sidebarelement = document.getElementById("nav-bar");
        sidebarelement.classList.add("show");
        // var navelement = document.getElementById("nav-header-togle");
        // navelement.classList.remove("hidetoggle");
        var sideNavLogoElement = document.getElementById("sidenavelogo");
        sideNavLogoElement.classList.remove("hidetoggle");
      }

      
    function HideToggle() {
        // var element = document.getElementById("nav-header-togle");
        // element.classList.add("hidetoggle");
        var sideNavLogoElement = document.getElementById("sidenavelogo");
        sideNavLogoElement.classList.add("hidetoggle");
        var element = document.getElementById("body-pd");
        element.classList.remove("body-pd");
        var headerelement = document.getElementById("header");
        headerelement.classList.remove("body-pd");
        var sidebarelement = document.getElementById("nav-bar");
        sidebarelement.classList.remove("show");
        
      }
      
   