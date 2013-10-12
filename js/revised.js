/*=====================================================*/
/* Settings */
/*=====================================================*/

var MIN_WIDTH = -50000;
var MAX_WIDTH = 50000;
var settings = {
	"general": { "case_id": "#ui", "margin": 5, "border": 0 },
	screens: [
		{ "sid":1, "min_width": MIN_WIDTH, "max_width": 480, "columns": 2 },
		{ "sid":2, "min_width": 481, "max_width": 600, "columns": 2 },
		{ "sid":3, "min_width": 601, "max_width": 768, "columns": 2 },
		{ "sid":4, "min_width": 769, "max_width": MAX_WIDTH, "columns": 6 }
	]};


/*=====================================================*/
/* Ui */
/*=====================================================*/


$( window ).ready ( function () {
	start_ui(settings);
});


$( window ).resize (function () {
	start_ui(settings);
})


/*  Takes a JSON attribute 's' with all the settings. */
function start_ui(s) {
	var page_width = $( document ).width();


	// console.log(page_width);
	console.log($("#ui").width());

	// Find the correct Settings
	for(var i = 0; i < s.screens.length; i++){
		if(page_width > s.screens[i].min_width && 
		   page_width < s.screens[i].max_width){
			set_tiles(s.general, s.screens[i].columns);
			break;
		}
	}
}


/* 	Calculates and sets the width and height of the tiles 
	Attributes
		gen = general settings
		cols = columns per row
*/
function set_tiles(gen, cols) {
	var case_width = get_width(gen.case_id);
	var tile = get_sub_classes(gen.case_id, ".tile");




	// console.log(case_width);
	// console.log(tile.length);



	var tile_length = (case_width / cols) - 
					  ((gen.margin + gen.border) * 2);





	var tile_columns;
	var tile_extra = gen.margin + gen.border;
	var calc_width = 0;
	for(var i = 0; i < tile.length; i++){
		tile_columns = get_tile_columns(tile.eq(i));

		if(tile_columns > 1) {
			calc_width = (tile_length * tile_columns) + 
						 (tile_extra * tile_columns);

			tile.eq(i).css("width", calc_width + "px");

			console.log(calc_width);

		} else 
			tile.eq(i).css("width", tile_length * tile_columns + "px");
		tile.eq(i).css("height", tile_length + "px");
	}
}

/* 	Searches the class attributes for the tile width settings.
	Example 1:
		<div class="tile t-1"></div>
			column width = t-1 = 1

	Example 2:
		<div class="tile t-2"></div>
			column width = t-2 = 2
*/
function get_tile_columns(tile_div) {
	var class_attr = tile_div.attr("class");
	class_attr = class_attr.split(" ");

	// Find the matching t-x or t-xx attrib and
	// return the x or xx part.
	for(var i = 0; i < class_attr.length; i++){
		if (class_attr[i].match(/t-./) || 
			class_attr[i].match(/t-../)) { 
			return parseInt(class_attr[i].split("-")[1]);
		}
	}
}



/*=====================================================*/
/* Misc */
/*=====================================================*/

/*  Returns an array of objects with the specified class
	name inside the specified div. */
function get_sub_classes(root_id, class_name) {
	return $( root_id  + " " + class_name);
}

/* 	Returns the width of a the object with the specified id */
function get_width(id) { return $( id ).width(); }
