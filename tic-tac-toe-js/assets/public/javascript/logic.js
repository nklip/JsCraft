$(document).ready(function() {
    $(".butt").click(function() {
        var id = $(this).attr('id');
        $("#hbut").attr('value', id);
    });
});