function byDefault() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("home").style.display = "flex";
}

// The difference between style.visibility and style.display:
// * visibility:hidden renders the tag, but isn't seen on the page.
// * style.display doesn't render the tag.
function showTab(id) {
    if (id == "about") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("about").style.display = "block";
        document.getElementById("home").style.display = "none";
    } else if (id == "home") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("about").style.display = "none";
        document.getElementById("home").style.display = "flex";
    } else { // main food menu
        document.getElementById("menu").style.display = "grid";
        document.getElementById("about").style.display = "none";
        document.getElementById("home").style.display = "none";
    }
    
}