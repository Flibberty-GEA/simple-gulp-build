function showObject(object) { object.visibility = VISIBLE; }
/* Hide an object */
function hideObject(object) { object.visibility = HIDDEN; }
/* Slide the logo from top to middle */
function slideLogo(from, to) {
    if (from < to) {
        company.top = (from += 10);
        setTimeout('slideLogo(' + from + ',' + to + ')', 75);
    }
    else initObjects();
}
/* Rotate selected objects */
function rotateObjects() {
    for (var i = 0; i < pos.length; i++) {
        pos[i] += inc; objects[i].visibility = 'visible';
        objects[i].left = (r * Math.cos(pos[i])) + xoff
        objects[i].top = (r * Math.sin(pos[i])) + yoff;
    }
    rotateTimer = setTimeout("rotateObjects()", 70);
}
/* Initialize selected objects for rotation */
function initObjects() {
    /* Here is the array of HTML elements that will be rotated, from fly1 to fly4
     Just put the shortcut variables to the HTML elements in this little array
     and they will be rotated automatically */
    objects = new Array(fly1, fly2, fly3, fly4);
    pos = new Array();
    pos[0] = 0;
    for (var i = 1; i < objects.length; i++) {
        pos[i] = parseFloat(pos[i - 1] + ((2 * pi) / objects.length));
    }
    rotateObjects();
}
/* Variables for rotating objects */
var objects;
var pos;
var r = 160;        // radius
var xoff = 180;     // x offset
var yoff = 170;     // y offset
var pi = Math.PI;   // get pi
var inc = pi / 180; // degrees per rotation cycle
var objects;        // objects to be rotated
var pos;            // position for objects