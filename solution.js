function Stacker(){

// Brick Variables
var
EMPTY = 0,
WALL = 1,
BLOCK = 2,
GOLD = 3;

// Direction Variables
var RIGHT = 0,
UP = 1,
LEFT = 2,
DOWN = 3,
facing = 0, 
direction = ["Right", "Up", "Left", "Down"];

// Location & Mapping Variables
/* Max and min variables are relative to start position. 
The distinction between abs_max and max is that max is the maximum x value for the maximum y */
var x=0, y=0, up = 0, 
map_mode = 0,
abs_max_x, abs_max_y,
abs_min_y, abs_min_x, 
max_y, max_x, 
min_y, min_x,
gold_x, gold_y,
initial_search = new Array();

/* The map array contains 324 objects (18 x 18), one for each cell on the map including the walls of the maze.
Information included in each object are location, type, level, and whether or not that particular cell has
been mapped i.e. visited by the troll */ 
var map = [ 	
   [{x_coord: 0, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 2, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 3, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 4, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 5, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 6, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 7, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 8, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord: 9, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:10, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:11, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:12, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:13, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:14, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:15, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:16, y_coord: 0, type: 1, level: 0, mapped:0},
	{x_coord:17, y_coord: 0, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 1, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 1, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 1, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 2, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 2, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 2, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 3, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 3, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 3, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 4, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 4, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 4, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 5, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 5, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 5, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 6, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 6, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 6, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 7, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 7, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 7, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 8, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 8, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 8, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord: 9, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord: 9, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord: 9, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:10, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:10, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:10, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:11, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:11, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:11, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:12, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:12, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:12, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:13, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:13, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:13, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:14, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:14, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:14, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:15, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:15, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:15, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:16, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 2, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 3, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 4, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 5, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 6, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 7, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 8, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord: 9, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:10, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:11, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:12, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:13, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:14, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:15, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:16, y_coord:16, type: 0, level: 0, mapped:0},
	{x_coord:17, y_coord:16, type: 1, level: 0, mapped:0}],	
   [{x_coord: 0, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 1, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 2, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 3, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 4, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 5, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 6, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 7, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 8, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord: 9, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:10, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:11, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:12, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:13, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:14, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:15, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:16, y_coord:17, type: 1, level: 0, mapped:0},
	{x_coord:17, y_coord:17, type: 1, level: 0, mapped:0}],
	];

/* the map_graph array is a special array to be passed to the A* pathfinding algorithm.
It is composed of boolean values for each of the 324 locations. 
A 1 signifies that the troll is able to visit this location. */

/* Note that the A* algorithm stores information differently. 
Locations are to passed to A* as map_graph[col][row]. Information is stored here as
map_graph[row][col]. These need to switched on passing. */
var map_graph = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

// Secondary Search
/* During the secondary search, the troll heads to eight discrete locations, which in 
a perfect maze would provide complete coverage of the maze. */
var search_point = 0,
search_points = [
	{x_coord:14, y_coord:13},
	{x_coord: 3, y_coord:13},
	{x_coord: 3, y_coord:10},
	{x_coord:14, y_coord:10},
	{x_coord:14, y_coord: 7},
	{x_coord: 3, y_coord: 7},
	{x_coord: 3, y_coord: 4},
	{x_coord:14, y_coord: 4}];

// Movement Variables	
var have_brick_target = 0, have_brick = 0,
have_ladder_target = 0, scaffold_iteration = 0,
quadrant = 1, secondary_quadrant = 2, tertiary_quadrant = 3, 
target_x = 14, target_y = 13, route_iterate = 1, next_obs = 0, graph, start, end,
result = [], block_route = [], blocks = [], secondary_blocks = [], tertiary_blocks = [], master_blocks = [], scaffold_all = [];
var scaffold = [
	{x_coord: 1, y_coord:-1},
	{x_coord: 1, y_coord: 0},
	{x_coord: 1, y_coord: 1},
	{x_coord: 0, y_coord: 1},
	{x_coord:-1, y_coord: 1},
	{x_coord:-1, y_coord: 0}],
	level_two = [
	{x_coord:-1, y_coord: 0},
	{x_coord:-1, y_coord: 1},
	{x_coord: 0, y_coord: 1},
	{x_coord: 1, y_coord: 1},
	{x_coord: 1, y_coord: 0}],	
	level_three = [
	{x_coord:-1, y_coord: 0},
	{x_coord:-1, y_coord: 1},
	{x_coord: 0, y_coord: 1},
	{x_coord: 1, y_coord: 1}],
	level_four = [
	{x_coord:-1, y_coord: 0},
	{x_coord:-1, y_coord: 1},
	{x_coord: 0, y_coord: 1}],	
	level_five = [
	{x_coord:-1, y_coord: 0},
	{x_coord:-1, y_coord: 1}],	
	level_six = [
	{x_coord:-1, y_coord: 0}],	
	wall = [
	{x_coord:-1, y_coord:-1},
	{x_coord:-2, y_coord:-1},
	{x_coord:-2, y_coord: 0},
	{x_coord:-2, y_coord: 1},
	{x_coord:-2, y_coord: 2},
	{x_coord:-1, y_coord: 2},
	{x_coord: 0, y_coord: 2},
	{x_coord: 1, y_coord: 2},
	{x_coord: 2, y_coord: 2},
	{x_coord: 2, y_coord: 1},
	{x_coord: 2, y_coord: 0}],
	ladder = [
	{x_coord: 1,y_coord: 0},
	{x_coord: 1,y_coord: 1},
	{x_coord: 0,y_coord: 1},
	{x_coord:-1,y_coord: 1},
	{x_coord:-1,y_coord: 0},
	{x_coord:-1,y_coord:-1},
	{x_coord: 1,y_coord: 0},
	{x_coord: 1,y_coord: 1},
	{x_coord: 0,y_coord: 1},
	{x_coord:-1,y_coord: 1},
	{x_coord:-1,y_coord: 0},
	{x_coord: 1,y_coord: 0},
	{x_coord: 1,y_coord: 1},
	{x_coord: 0,y_coord: 1},
	{x_coord:-1,y_coord: 1},
	{x_coord: 1,y_coord: 0},
	{x_coord: 1,y_coord: 1},
	{x_coord: 0,y_coord: 1},
	{x_coord: 1,y_coord: 0},
	{x_coord: 1,y_coord: 1},
	{x_coord: 1,y_coord: 0}]; 	
	
// Utility & Search Variables
var turn_counter = 0,
VERBOSE = 1;

// ----- Function: turn() ----- // 
this.turn = function(cell){
	// Take a look around
	/* The following are objects for each of the five squares the troll can see during each turn. 
	Note that they are not added to the map during the initial search (map_mode = 0). 
	This is because the x and y values used during the initial phase are relative to the starting location.
	Rather the objects an array, initial_search. Once the troll locates the upper right corner,
	the initial search objects are popped and recalibrated, their information added to the map.
	After that(map_mode > 0), the objects are added directly to the map. */	
	{
	var cur = new Object();
	cur.x_coord = x;
	cur.y_coord = y;
	cur.type = cell.type;
	cur.level = cell.level;
	if (map_mode == 0){
		initial_search.push(cur);	
	}
	if (map_mode > 0){
			map[cur.y_coord][cur.x_coord].x_coord = cur.x_coord;
			map[cur.y_coord][cur.x_coord].y_coord = cur.y_coord;
			map[cur.y_coord][cur.x_coord].type = cur.type;
			map[cur.y_coord][cur.x_coord].level = cur.level;
			map[cur.y_coord][cur.x_coord].mapped = 1;	
	}
	
	var top = new Object();
	top.x_coord = x;
	top.y_coord = y+1;
	top.type = cell.up.type;
	top.level = cell.up.level;
	if (map_mode == 0) initial_search.push(top);
	if (map_mode != 0){
			map[top.y_coord][top.x_coord].x_coord = top.x_coord;
			map[top.y_coord][top.x_coord].y_coord = top.y_coord;
			map[top.y_coord][top.x_coord].type = top.type;
			map[top.y_coord][top.x_coord].level = top.level;
			map[top.y_coord][top.x_coord].mapped = 1;	
	}
	
	var bot = new Object();
	bot.x_coord = x;
	bot.y_coord = y-1;
	bot.type = cell.down.type;
	bot.level = cell.down.level;
	if (map_mode == 0) initial_search.push(bot);
	if (map_mode != 0){
			map[bot.y_coord][bot.x_coord].x_coord = bot.x_coord;
			map[bot.y_coord][bot.x_coord].y_coord = bot.y_coord;
			map[bot.y_coord][bot.x_coord].type = bot.type;
			map[bot.y_coord][bot.x_coord].level = bot.level;
			map[bot.y_coord][bot.x_coord].mapped = 1;	
	}
	
	var lef = new Object();
	lef.x_coord = x-1;
	lef.y_coord = y;
	lef.type = cell.left.type;
	lef.level = cell.left.level;
	if (map_mode == 0)initial_search.push(lef);
	if (map_mode != 0){
			map[lef.y_coord][lef.x_coord].x_coord = lef.x_coord;
			map[lef.y_coord][lef.x_coord].y_coord = lef.y_coord;
			map[lef.y_coord][lef.x_coord].type = lef.type;
			map[lef.y_coord][lef.x_coord].level = lef.level;
			map[lef.y_coord][lef.x_coord].mapped = 1;	
	}
	
	var rht = new Object();
	rht.x_coord = x+1;
	rht.y_coord = y;
	rht.type = cell.right.type;
	rht.level = cell.right.level;
	if (map_mode == 0) initial_search.push(rht);
	if (map_mode != 0){
			map[rht.y_coord][rht.x_coord].x_coord = rht.x_coord;
			map[rht.y_coord][rht.x_coord].y_coord = rht.y_coord;
			map[rht.y_coord][rht.x_coord].type = rht.type;
			map[rht.y_coord][rht.x_coord].level = rht.level;
			map[rht.y_coord][rht.x_coord].mapped = 1;	
	}
	if (map_mode > 0){	
		for (i = 0; i < 18; i++){			
			for(j = 0; j < 18; j++){
				var graph_type = 1;
				if (map[i][j].type == 1) graph_type = 0;
				if (map[i][j].type == 3) graph_type = 0;
				map_graph[i][j] = graph_type;
			}
		}
	}
	}

	// Import Cell JSON object as local object for reference within functions
	cel = cell;
	
	// count the turn
	turn_counter++;

	// Console Output for Turn's State
	if (VERBOSE) {
		console.log(" ");
		console.log("Turn: " + turn_counter, "Map Mode: " + map_mode );
		if(map_mode > 1) console.log("Have Brick: " + have_brick );
		if(map_mode == 0) console.log("Position relative to start: " + x + "," + y);
		if(map_mode > 0) console.log("Absolute Position: " + x + "," + y);
	}
			
	// Map Perimeter
	if(map_mode == 0){
		// Identify the upper right corner of the maze
		if(x == max_x && y == max_y && turn_counter != 1 && up > 15 ) {
			if(VERBOSE) console.log("This is the corner of the Maze.");	
			if(VERBOSE) console.log("Upper Right Corner: " + max_x + "," + max_y);	
			if(VERBOSE) console.log("Lower Left Corner: " + min_x + "," + min_y);
			if(VERBOSE) console.log("Abs Max: " + abs_max_x + "," + abs_max_y);	
			if(VERBOSE) console.log("Abs Min: " + abs_min_x + "," + abs_min_y);

			/* Having found the upper right corner, pop the initial search array, 
			recalibrate their positions and add to the map of the maze */
			var init_length = initial_search.length;
			for (i = 0; i < init_length; i++){
				var map_cell = new Object();
				map_cell = initial_search.pop();
				var map_x = map_cell.x_coord + (16 - abs_max_x);
				var map_y = map_cell.y_coord + (16 - abs_max_y);
				map[map_y][map_x].x_coord = map_x;
				map[map_y][map_x].y_coord = map_y;
				map[map_y][map_x].type = map_cell.type;
				map[map_y][map_x].level = map_cell.level;
				map[map_y][map_x].mapped = 1;			
			}
			/* Update the map_graph with information from the initial search.  */
			for (i = 0; i < 18; i++){			
				for(j = 0; j < 18; j++){
					var graph_type = 1;
					if (map[i][j].type == 1) graph_type = 0;
					if (map[i][j].type == 3) graph_type = 0;
					map_graph[i][j] = graph_type;
				}
			}
		
			// Print Map
			print_map();
			print_map_type();
			
			// Recalibrate current location		
			x = x + (16 - abs_max_x);
			y = y + (16 - abs_max_y);
		
			map_mode = 1;
			target_x = search_points[search_point].x_coord;
			target_y = search_points[search_point].y_coord;

			prepare_route();
			// First move after route preparation.
			var next_move = result.shift();
			var next_x = next_move.y;
			var next_y = next_move.x;
			route_iterate = result.length;
			if ((next_x - x) ==  1) return forward(RIGHT);
			if ((next_x - x) == -1) return forward(LEFT);
			if ((next_y - y) ==  1) return forward(UP);
			if ((next_y - y) == -1) return forward(DOWN);
		}
		
		// Mapping 
		// Initialize Map Variables
		{if (turn_counter == 1) { 
			max_x = x;
			max_y = y;
			min_x = x;
			min_y = y;
			abs_max_x = x;
			abs_max_y = y;
			abs_min_x = x;
			abs_min_y = y;
		}
		
		// Set Max and Absolute Max
		if(max_y < y) {
			max_y = y;
			max_x = x;
		}
		if(max_y == y) {
			if(max_x < x) max_x = x;
		}
		if(min_y > y) {
			min_y = y;
			min_x = x;
		}
		if(min_y == y) {
			if(min_x > x) min_x = x;
		}
		if (abs_max_x < x) abs_max_x = x;
		if (abs_max_y < y) abs_max_y = y;
		if (abs_min_x > x) abs_min_x = x;
		if (abs_min_y > y) abs_min_y = y;
		}

		// Pledge Algorithm / Used to Map Perimeter
		if(facing > 0) {
			console.log("Pledge 1: Attempt Return");
			if(!obstructed(facing-1)){
				turn_right();
				return forward(facing);
			}
		}
		// Obstructed in Front
		console.log("Pledge 2: Attempt Forward");
		if(obstructed(facing)) {
			turn_left();
			// Obstructed to the left
			console.log("Pledge 3: Attempt Left");
			if(obstructed(facing)) {
				turn_left();
			}	
		}
		return forward(facing);	
		
	}
					
	// Map rest of Maze
	if(map_mode == 1){
		
		// Special handling
		/* As the troll is using A* to plot a path through a maze in which he cannot see 
		all of the obstacle, occasionally a search point will be an obstacle, in which case
		the troll will not be able to reach it and trigger the next search point. The following
		logic triggers the next search point if he is next to the target. */
		
		if(map[target_y][target_x].type == 1 || map[target_y][target_x].type == 3){
			if(x == target_x - 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x + 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y - 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y + 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
		}
		
		/* Troll reaches last search point. He then looks at the map for the location of the gold
		and uses that as his next destination */
		// TROUBLE_AREA: What if he doesn't find the gold? 
		// TROUBLE_AREA: What if a search location is unreachable?
		if (route_iterate == 0 && search_point == 7) {
			print_map();
			console.log(" ");
			print_map_type();
			for (i = 0; i < 18; i++){
				for (j = 0; j < 18; j++){
			 		if(map[i][j].type == 3) {
						console.log("Gold at " + map[i][j].x_coord + "," + map[i][j].y_coord);
						target_x = (map[i][j].x_coord)+1;
						gold_x = map[i][j].x_coord;
						target_y = map[i][j].y_coord;
						gold_y = map[i][j].y_coord;
					}
				}
			}

			
			map_mode = 2;
			
			// TROUBLE AREA: What if the troll ends his secondary map directly adjacent to the gold
			prepare_route();
			// First move after route preparation.
			var next_move
			if( next_move = result.shift()){
				var next_x = next_move.y;
				var next_y = next_move.x;
			}
			
			route_iterate--;
			if(x == target_x - 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x + 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y - 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y + 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
			if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
			if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
			if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
		}
		
		if (route_iterate == 0 && search_point < 8){
			console.log("End of route. Picking new route.");
			print_array();
			search_point++;
			target_x = search_points[search_point].x_coord;
			target_y = search_points[search_point].y_coord;
			graph = new Graph(map_graph);
			start = graph.grid[y][x];
			end = graph.grid[target_y][target_x];
			result = astar.search(graph, start, end, {closest: true});
			route_iterate = result.length;
			console.log("Distance: " + route_iterate +  " Search point: " + search_point + " " + target_x + "," + target_y);
		}

		// Next move in route that has been prepared. 
		// route_iterate variable is used to control the movement
		var next_move = result.shift();
		var next_x = next_move.y;
		var next_y = next_move.x;
		route_iterate--;
		if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
		if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
		if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
		if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);


		/* As the troll is using A* to plot a path through a maze in which he cannot see 
		all of the obstacle, occasionally a search point will be an obstacle, in which case
		the troll will not be able to reach it and trigger the next search point. The following
		logic triggers the next search point if he is next to the target. */
		
		if(map[target_y][target_x].type == 1){
			if(x == target_x - 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x + 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y - 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y + 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
		}
		
		// Occasionally, the troll will find a block in his path that has been prepared for him.
		// In this case, he must prepare a new path. 
		
		// Plot a new path
		prepare_route();
		route_iterate = result.length;
		
		

		var next_move_2 = result.shift();
		next_x = next_move_2.y;
		next_y = next_move_2.x;
		route_iterate--;
		if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
		if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
		if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
		if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);

		/* As the troll is using A* to plot a path through a maze in which he cannot see 
		all of the obstacle, occasionally a search point will be an obstacle, in which case
		the troll will not be able to reach it and trigger the next search point. The following
		logic triggers the next search point if he is next to the target. */
		
		if(map[target_y][target_x].type == 1){
			if(x == target_x - 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x + 1 && y == target_y) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y - 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
			if(x == target_x     && y == target_y + 1) {
				console.log("Next to target.");
				route_iterate = 0;
				if(search_point == 7){
					map_mode = 2;
				}
			}
		}
	}

	// Go to the Gold
	if(map_mode == 2){
	
		// Places troll in a square adjacent to the gold.
		if(x == target_x - 1 && y == target_y) {
			console.log("Next to target.");
			route_iterate = 0;
		}
		if(x == target_x + 1 && y == target_y) {
			console.log("Next to target.");
			route_iterate = 0;
		}
		if(x == target_x     && y == target_y - 1) {
			console.log("Next to target.");
			route_iterate = 0;
		}
		if(x == target_x     && y == target_y + 1) {
			console.log("Next to target.");
			route_iterate = 0;
		}
		
		if (route_iterate == 0) {
			
			map_mode = 3;
			
			/* Maze is split into quadrants. Troll retrieves blocks from current quadrant
			first, then adjacent quadrants */
			if(gold_x > 8){
					if(gold_y > 8) {
						quadrant = 1;
						if(gold_x > gold_y) {
							secondary_quadrant = 4;
							tertiary_quadrant = 2
						}
						else {
							secondary_quadrant = 2;
							tertiary_quadrant = 4;
						}
					}
					else {
						quadrant = 4;
						if(gold_x - 8 > 8 - gold_y) {
							secondary_quadrant = 1;
							tertiary_quadrant = 3;
						}
						else {
							secondary_quadrant = 3;
							tertiary_quadrant = 1;
						}
					}
				}
			else if(gold_y > 8) {
				quadrant = 2;
				if(8 - gold_x > gold_y - 8) {
					secondary_quadrant = 3;
					tertiary_quadrant = 1;
				}
				else {
					secondary_quadrant = 1;
					tertiary_quadrant = 3;
				}
				
			}
			else {
				quadrant = 3;
				if(8 - gold_x > 8 - gold_y) {
					secondary_quadrant = 2;
					tertiary_quadrant = 4;
				}
				else {
					secondary_quadrant = 4;
					tertiary_quadrant = 2;
				}
			}
			
			// Scaffold preparation 
			/* In order to normalize the area surrounding the gold where the troll will build 
			his ladder, first a scaffold of level 1 bricks will be built. Locations that already 
			contain bricks must be taken into account.
			Scaffold locations are pushed back into the scaffold array recalibrated for the
			gold location if their level is zero. These locations will be pulled from first
			in the next map mode. 
			All and pushed into an scaffold_all if
			their level is 1.  */
			
						
			for (i = 0; i < 6; i++){
				var examine = scaffold.shift();
				var examine_x = examine.x_coord+gold_x;
				var examine_y = examine.y_coord+gold_y;
				if(map[examine_y][examine_x].level == 0){
					scaffold.push({x_coord:examine_x,y_coord:examine_y});
				}
				scaffold_all.push({x_coord:examine_x,y_coord:examine_y});	
			}
			
			/* Set all scaffold locations to type zero so that they are ignored by the troll
			when hunting for blocks. */
			for (i in scaffold_all){
				var examine = scaffold_all[i];
				map[examine.y_coord][examine.x_coord].type = 0;
			}
			
			// Quadrants are scanned for blocks. Block stacks are prepared for troll to use.
			if (quadrant == 1){
				for (i = 9; i < 17; i++){
					for (j = 9; j < 17; j++){
					if (map[i][j].type == 2) blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (secondary_quadrant == 1){
				for (i = 9; i < 17; i++){
					for (j = 9; j < 17; j++){
					if (map[i][j].type == 2) secondary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (tertiary_quadrant == 1){
				for (i = 9; i < 17; i++){
					for (j = 9; j < 17; j++){
					if (map[i][j].type == 2) tertiary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (quadrant == 2){
				for (i = 9; i < 17; i++){
					for (j = 0; j < 9; j++){
					if (map[i][j].type == 2) blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (secondary_quadrant == 2){
				for (i = 9; i < 17; i++){
					for (j = 0; j < 9; j++){
					if (map[i][j].type == 2) secondary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (tertiary_quadrant == 2){
				for (i = 9; i < 17; i++){
					for (j = 0; j < 9; j++){
					if (map[i][j].type == 2) tertiary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (quadrant == 3){
				for (i = 0; i < 9; i++){
					for (j = 0; j < 9; j++){
					if (map[i][j].type == 2) blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (secondary_quadrant == 3){
				for (i = 0; i < 9; i++){
					for (j = 0; j < 9; j++){
					if (map[i][j].type == 2) secondary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (tertiary_quadrant == 3){
				for (i = 0; i < 9; i++){
					for (j = 0; j < 9; j++){
					if (map[i][j].type == 2) tertiary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (quadrant == 4){
				for (i = 0; i < 9; i++){
					for (j = 9; j < 17; j++){
					if (map[i][j].type == 2) blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (secondary_quadrant == 4){
				for (i = 0; i < 9; i++){
					for (j = 9; j < 17; j++){
					if (map[i][j].type == 2) secondary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			if (tertiary_quadrant == 4){
				for (i = 0; i < 9; i++){
					for (j = 9; j < 17; j++){
					if (map[i][j].type == 2) tertiary_blocks.push({x_coord:map[i][j].x_coord, y_coord:map[i][j].y_coord});
					}
				}
			}
			
			// Special Block Handling
			/* Wall is the region around the ladder through which the troll will not be able to cross once the ladder reaches
			level two. Here is it recalibrated for the gold position. */
			for (i = 0; i < 11; i++){
				var examine = wall.shift();
				var examine_x = examine.x_coord+gold_x;
				var examine_y = examine.y_coord+gold_y;
				wall.push({x_coord:examine_x,y_coord:examine_y});
			}
			for (i in blocks){
				var examine = blocks[i];
				var in_wall = 0;
				for (j in wall){
					if(blocks[i].x_coord == wall[j].x_coord && blocks[i].y_coord == wall[j].y_coord){
						in_wall = 1;
					}
				}
				if (in_wall == 1) master_blocks.push(examine);
				else master_blocks.unshift(examine);
			}
			
			/* Blocks in the wall are pushed to the top of the blocks array that they will be used first. */
			for (i in blocks){
				var examine = blocks[i];
				var in_wall = 0;
				for (j in wall){
					if(blocks[i].x_coord == wall[j].x_coord && blocks[i].y_coord == wall[j].y_coord){
						in_wall = 1;
					}
				}
				if (in_wall == 1) master_blocks.push(examine);
				else master_blocks.unshift(examine);
			}
			for (i in secondary_blocks){
				var examine = secondary_blocks[i];
				var in_wall = 0;
				for (j in wall){
					if(secondary_blocks[i].x_coord == wall[j].x_coord && secondary_blocks[i].y_coord == wall[j].y_coord){
						in_wall = 1;
					}
				}
				if (in_wall == 1) master_blocks.push(examine);
				else master_blocks.unshift(examine);
			}
			for (i in tertiary_blocks){
				var examine = tertiary_blocks[i];
				var in_wall = 0;
				for (j in wall){
					if(tertiary_blocks[i].x_coord == wall[j].x_coord && tertiary_blocks[i].y_coord == wall[j].y_coord){
						in_wall = 1;
					}
				}
				if (in_wall == 1) master_blocks.push(examine);
				else master_blocks.unshift(examine);
			}
		
		}
		if (route_iterate > 0){
			var next_move = result.shift();
			var next_x = next_move.y;
			var next_y = next_move.x;
			route_iterate--;
			if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
			if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
			if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
			if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
		
			console.log("Set path is blocked.");
			// Plot a new path
			graph = new Graph(map_graph);
			start = graph.grid[y][x];
			end = graph.grid[target_y][target_x];
			result = astar.search(graph, start, end, {closest: true});
			for (i in result) console.log(result[i]);
			route_iterate = result.length;
			console.log("Have new path.");

			var next_move_2 = result.shift();
			console.log(next_move_2);
			next_x = next_move_2.y;
			next_y = next_move_2.x;
			console.log("next move: " + next_x + " " + next_y);
			route_iterate--;
			if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
			if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
			if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
			if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
		}
	}
	
	// Build Ladder
	if (map_mode == 3){
	
		// if the troll is standing on a level 7 brick he must be to the left of the golf
		if(map[gold_y][gold_x-1].level == 7) return "right";
		
		// if the troll is standing on top of the gold pick it up
		if(x == gold_x && y == gold_y) return "pickup";
		
		// if the troll has a target and is not at the target, continue moving toward it
		if((have_brick_target == 1 || have_ladder_target == 1) && (target_x != x || target_y != y)){
			var next_move;
			if(next_move = result.shift()){	
				console.log(next_move);
				var next_x = next_move.y;
				var next_y = next_move.x;
				route_iterate--;
			}
			if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
			if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
			if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
			if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			
		
			console.log("Set path is blocked.", next_move, target_x, target_y);
			print_map_type();
			// Plot a new path
			graph = new Graph(map_graph);
			start = graph.grid[y][x];
			end = graph.grid[target_y][target_x];
			result = astar.search(graph, start, end, {closest: true});
			for (i in result) console.log(result[i]);
			route_iterate = result.length;
			console.log("Have new path.");
			
			if (target_x == x + 1 && target_y == y     && !(obstructed(RIGHT))) return forward(RIGHT);  
			if (target_x == x - 1 && target_y == y     && !(obstructed(LEFT))) return forward(LEFT);
			if (target_x == x     && target_y == y + 1 && !(obstructed(UP))) return forward(UP); 
			if (target_x == x     && target_y == y - 1 && !(obstructed(DOWN))) return forward(DOWN); 
			
			var next_move_2;
			if(next_move_2 = result.shift()){
				console.log(next_move_2);
				next_x = next_move_2.y;
				next_y = next_move_2.x;
				console.log("next move: " + next_x + " " + next_y);
				route_iterate--;
			}
			if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
			if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
			if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
			if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			
			// if the troll runs through this process achieving nothing, he is stuck
			// go get another brick
			have_brick_target = 0;
			
		}

		// Go get another brick
		if(have_brick_target == 0 && have_brick == 0){
		/* Set all scaffold locations to type zero so that they are ignored by the troll
			when hunting for blocks. */
			for (i in scaffold_all){
				var examine = scaffold_all[i];
				map[examine.y_coord][examine.x_coord].type = 0;
			}
			
			// if(blocks.length > 0) 
			var next_block = master_blocks.pop();
// 			else if(secondary_blocks.length > 0) var next_block = secondary_blocks.pop();
// 			else var next_block = tertiary_blocks.pop();
			have_brick_target = 1;
			target_x = next_block.x_coord;
			target_y = next_block.y_coord;
			if (target_x == x + 1 && target_y == y     && !(obstructed(RIGHT))) return forward(RIGHT);  
			if (target_x == x - 1 && target_y == y     && !(obstructed(LEFT))) return forward(LEFT);
			if (target_x == x     && target_y == y + 1 && !(obstructed(UP))) return forward(UP); 
			if (target_x == x     && target_y == y - 1 && !(obstructed(DOWN))) return forward(DOWN);
			if(map[gold_y-1][gold_x+1].level == 1){
				for (i in wall){
				var next_wall = wall[i];
				map[next_wall.y_coord][next_wall.x_coord].type = 1;
				}
				for (i = 0; i < 18; i++){			
					for(j = 0; j < 18; j++){
					var graph_type = 1;
					if (map[i][j].type == 1) graph_type = 0;
					if (map[i][j].type == 3) graph_type = 0;
					map_graph[i][j] = graph_type;
					}
				}
			}
			graph = new Graph(map_graph);
			start = graph.grid[y][x];
			end = graph.grid[target_y][target_x];
			result = astar.search(graph, start, end, {closest: true});
			route_iterate = result.length;
			var next_move;
			if(next_move = result.shift()){	
				console.log(next_move);
				var next_x = next_move.y;
				var next_y = next_move.x;
				route_iterate--;
			}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
				
		}

		// Have a brick, where should I put it?
		if(have_ladder_target == 0 && have_brick == 1){
			if(map[gold_y-1][gold_x+1].level == 1){
				for (i in wall){
				var next_wall = wall[i];
				map[next_wall.y_coord][next_wall.x_coord].type = 1;
				}
				for (i = 0; i < 18; i++){			
					for(j = 0; j < 18; j++){
					var graph_type = 1;
					if (map[i][j].type == 1) graph_type = 0;
					if (map[i][j].type == 3) graph_type = 0;
					map_graph[i][j] = graph_type;
					}
				}
			}
			
			// Build scaffold
			if(map[gold_y][gold_x-1].level == 0){
				target_x = gold_x-1;
				target_y = gold_y;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y+1][gold_x-1].level == 0){
				target_x = gold_x-1;
				target_y = gold_y+1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y+1][gold_x].level == 0){
				target_x = gold_x;
				target_y = gold_y+1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y+1][gold_x+1].level == 0){
				target_x = gold_x+1;
				target_y = gold_y+1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y][gold_x+1].level == 0){
				target_x = gold_x+1;
				target_y = gold_y;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y-1][gold_x+1].level == 0){
				target_x = gold_x+1;
				target_y = gold_y-1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			
			// Build Ladder 
			if(map[gold_y][gold_x-1].level == map[gold_y+1][gold_x-1].level){
				target_x = gold_x-1;
				target_y = gold_y;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y+1][gold_x-1].level == map[gold_y+1][gold_x].level && map[gold_y][gold_x-1].level > map[gold_y+1][gold_x-1].level){
				target_x = gold_x-1;
				target_y = gold_y+1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y+1][gold_x].level == map[gold_y+1][gold_x+1].level && map[gold_y+1][gold_x-1].level > map[gold_y+1][gold_x].level){
				target_x = gold_x;
				target_y = gold_y+1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y+1][gold_x+1].level == map[gold_y][gold_x+1].level && map[gold_y+1][gold_x].level > map[gold_y+1][gold_x+1].level){
				target_x = gold_x+1;
				target_y = gold_y+1;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			if(map[gold_y][gold_x+1].level == map[gold_y-1][gold_x+1].level && map[gold_y+1][gold_x+1].level > map[gold_y][gold_x+1].level){
				target_x = gold_x+1;
				target_y = gold_y;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}

			if(map[gold_y][gold_x-1].level == 6){
				target_x = gold_x - 1;
				target_y = gold_y;
				
				graph = new Graph(map_graph);
				start = graph.grid[y][x];
				end = graph.grid[target_y][target_x];
				result = astar.search(graph, start, end, {closest: true});
				route_iterate = result.length;
				console.log("Distance to block: " + route_iterate +  " " + target_x + "," + target_y);
				have_ladder_target = 1;
				var next_move;
				if(next_move = result.shift()){	
					console.log(next_move);
					var next_x = next_move.y;
					var next_y = next_move.x;
					route_iterate--;
				}
				if ((next_x - x) ==  1 && !(obstructed(RIGHT))) return forward(RIGHT);
				if ((next_x - x) == -1 && !(obstructed(LEFT))) return forward(LEFT);
				if ((next_y - y) ==  1 && !(obstructed(UP))) return forward(UP);
				if ((next_y - y) == -1 && !(obstructed(DOWN))) return forward(DOWN);
			}
			
			print_map_level();		
			return 0;	
		}
		
		// Arrived at my brick target
		if(have_brick_target ==1 && have_brick == 0 && target_x == x && target_y == y){
		if( !(x == gold_x+1 && y == gold_y-1) &&
			!(x == gold_x+1 && y == gold_y  ) &&
			!(x == gold_x+1 && y == gold_y+1) &&
			!(x == gold_x   && y == gold_y+1) &&
			!(x == gold_x-1 && y == gold_y+1) &&
			!(x == gold_x-1 && y == gold_y  )){
				have_brick_target = 0; 
				have_brick = 1;
				return "pickup";
			}
		}
		
		// Arrived at my ladder target
		if(have_ladder_target ==1 && have_brick == 1 && target_x == x && target_y == y){
			have_ladder_target = 0; 
			have_brick = 0;
			map[y][x].level = 1;
			print_map_level();
			return "drop";
		}

	// Carry On
	have_brick = 0;
	have_brick_target = 0;
	have_ladder_target = 0;	
	return "drop";
	}


}

// Utility Functions
	function obstructed(dir) {
		dir = dir%4;
		if (dir == RIGHT){
			if (cel.right.type == WALL || cel.right.type == GOLD) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
			if (cel.right.level > cel.level + 1 || cel.right.level < cel.level - 1) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
		}
		else if (dir == UP){
			if (cel.up.type == WALL || cel.up.type == GOLD) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
			if (cel.up.level > cel.level + 1 || cel.up.level < cel.level - 1) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
		}
		else if (dir == LEFT){
			if (cel.left.type == WALL || cel.left.type == GOLD) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
			if (cel.left.level > cel.level + 1 || cel.left.level < cel.level - 1) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
		}
		else if (dir == DOWN){
			if (cel.down.type == WALL || cel.down.type == GOLD) {
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
			if (cel.down.level > cel.level + 1 || cel.down.level < cel.level - 1){
				if (VERBOSE) console.log("My " + direction[dir%4] +  " is blocked.");
				return 1;
			}
		}
		else {
			if (VERBOSE) console.log("My " + direction[dir%4] +  " is clear.");
			return 0;	
		}
	}
	function forward(dir){
			dir = dir%4;
			if (dir == RIGHT) {
				if(!obstructed(RIGHT)){
					if(VERBOSE) console.log("move right");
					x++;
					return "right";
				}
				else return "Error. Right obstructed.";
			}
			else if (dir == UP) {
				if(!obstructed(UP)){
					if(VERBOSE) console.log("move up");
					y++;
					up++;
					return "up";
				}
				else return "Error. Up obstructed.";
			}
			else if (dir == LEFT) {
				if(!obstructed(LEFT)){
					x--;
					if(VERBOSE) console.log("move left");
					return "left";
				}
				else return "Error. Left obstructed.";
			}
			else if (dir == DOWN) {
				if(!obstructed(DOWN)){
					y--;
					if(VERBOSE) console.log("move down");
					return "down";
				}
				else return "Error. Down obstructed.";
			}
	}
	function turn_right(){
		facing--;
		if(VERBOSE)	console.log("Turn Right, Facing: " + direction[facing%4]);
	}
	function turn_left(){
		facing++;
		if(VERBOSE)	console.log("Turn Left, Facing: " + direction[facing%4]);
	}
	function prepare_route(){
		graph = new Graph(map_graph);
		start = graph.grid[y][x];
		end = graph.grid[target_y][target_x];
		result = astar.search(graph, start, end, {closest: true});
		route_iterate = result.length;
	}
	function go_to(){
		var next_move = result.shift();
		var next_x = next_move.y;
		var next_y = next_move.x;
		route_iterate = result.length;
		if ((next_x - x) ==  1) return forward(RIGHT);
		if ((next_x - x) == -1) return forward(LEFT);
		if ((next_y - y) ==  1) return forward(UP);
		if ((next_y - y) == -1) return forward(DOWN);
	}
	function print_map(){
		console.log(" ");
		for (var i = 17; i >= 0; i--){
			var row = i; 
			row += "\t"; 
			for (var j = 0; j < 18; j++){
			row += map[i][j].mapped + " ";
			}
			console.log(row);
		}
	}
	function print_map_type(){
		console.log(" ");
		for (var i = 17; i >= 0; i--){
			var row = i; 
			row += "\t"; 
			for (var j = 0; j < 18; j++){
			row += map[i][j].type + " ";
			}
			console.log(row);
		}
	}
	function print_map_level(){
		console.log(" ");
		for (var i = 17; i >= 0; i--){
			var row = i; 
			row += "\t"; 
			for (var j = 0; j < 18; j++){
			row += map[i][j].level + " ";
			}
			console.log(row);
		}
	}
	function print_array(){
		for (var i = 17; i >= 0; i--){
			var row = i; 
			row += "\t"; 
			for (var j = 0; j < 18; j++){
			row += map_graph[i][j] + " ";
			}
			console.log(row);
		}
	}

	// javascript-astar 0.3.0
	// http://github.com/bgrins/javascript-astar
	// Freely distributable under the MIT License.
	// Implements the astar search algorithm in javascript using a Binary Heap.
	// Includes Binary Heap (with modifications) from Marijn Haverbeke.
	// http://eloquentjavascript.net/appendix2.html

	(function(definition) {
		/* global module, define */
		if(typeof module === 'object' && typeof module.exports === 'object') {
			module.exports = definition();
		} else if(typeof define === 'function' && define.amd) {
			define([], definition);
		} else {
			var exports = definition();
			window.astar = exports.astar;
			window.Graph = exports.Graph;
		}
	})(function() {

	function pathTo(node){
		var curr = node,
			path = [];
		while(curr.parent) {
			path.push(curr);
			curr = curr.parent;
		}
		return path.reverse();
	}

	function getHeap() {
		return new BinaryHeap(function(node) {
			return node.f;
		});
	}

	var astar = {
		init: function(graph) {
			for (var i = 0, len = graph.nodes.length; i < len; ++i) {
				var node = graph.nodes[i];
				node.f = 0;
				node.g = 0;
				node.h = 0;
				node.visited = false;
				node.closed = false;
				node.parent = null;
			}
		},

		/**
		* Perform an A* Search on a graph given a start and end node.
		* @param {Graph} graph
		* @param {GridNode} start
		* @param {GridNode} end
		* @param {Object} [options]
		* @param {bool} [options.closest] Specifies whether to return the
				   path to the closest node if the target is unreachable.
		* @param {Function} [options.heuristic] Heuristic function (see
		*          astar.heuristics).
		*/
		search: function(graph, start, end, options) {
			astar.init(graph);

			options = options || {};
			var heuristic = options.heuristic || astar.heuristics.manhattan,
				closest = options.closest || false;

			var openHeap = getHeap(),
				closestNode = start; // set the start node to be the closest if required

			start.h = heuristic(start, end);

			openHeap.push(start);

			while(openHeap.size() > 0) {

				// Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
				var currentNode = openHeap.pop();

				// End case -- result has been found, return the traced path.
				if(currentNode === end) {
					return pathTo(currentNode);
				}

				// Normal case -- move currentNode from open to closed, process each of its neighbors.
				currentNode.closed = true;

				// Find all neighbors for the current node.
				var neighbors = graph.neighbors(currentNode);

				for (var i = 0, il = neighbors.length; i < il; ++i) {
					var neighbor = neighbors[i];

					if (neighbor.closed || neighbor.isWall()) {
						// Not a valid node to process, skip to next neighbor.
						continue;
					}

					// The g score is the shortest distance from start to current node.
					// We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
					var gScore = currentNode.g + neighbor.getCost(currentNode),
						beenVisited = neighbor.visited;

					if (!beenVisited || gScore < neighbor.g) {

						// Found an optimal (so far) path to this node.  Take score for node to see how good it is.
						neighbor.visited = true;
						neighbor.parent = currentNode;
						neighbor.h = neighbor.h || heuristic(neighbor, end);
						neighbor.g = gScore;
						neighbor.f = neighbor.g + neighbor.h;

						if (closest) {
							// If the neighbour is closer than the current closestNode or if it's equally close but has
							// a cheaper path than the current closest node then it becomes the closest node
							if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
								closestNode = neighbor;
							}
						}

						if (!beenVisited) {
							// Pushing to heap will put it in proper place based on the 'f' value.
							openHeap.push(neighbor);
						}
						else {
							// Already seen the node, but since it has been rescored we need to reorder it in the heap
							openHeap.rescoreElement(neighbor);
						}
					}
				}
			}

			if (closest) {
				return pathTo(closestNode);
			}

			// No result was found - empty array signifies failure to find path.
			return [];
		},
		// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
		heuristics: {
			manhattan: function(pos0, pos1) {
				var d1 = Math.abs(pos1.x - pos0.x);
				var d2 = Math.abs(pos1.y - pos0.y);
				return d1 + d2;
			},
			diagonal: function(pos0, pos1) {
				var D = 1;
				var D2 = Math.sqrt(2);
				var d1 = Math.abs(pos1.x - pos0.x);
				var d2 = Math.abs(pos1.y - pos0.y);
				return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
			}
		}
	};

	/**
	* A graph memory structure
	* @param {Array} gridIn 2D array of input weights
	* @param {Object} [options]
	* @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
	*/
	function Graph(gridIn, options) {
		options = options || {};
		this.nodes = [];
		this.diagonal = !!options.diagonal;
		this.grid = [];
		for (var x = 0; x < gridIn.length; x++) {
			this.grid[x] = [];

			for (var y = 0, row = gridIn[x]; y < row.length; y++) {
				var node = new GridNode(x, y, row[y]);
				this.grid[x][y] = node;
				this.nodes.push(node);
			}
		}
	}

	Graph.prototype.neighbors = function(node) {
		var ret = [],
			x = node.x,
			y = node.y,
			grid = this.grid;

		// West
		if(grid[x-1] && grid[x-1][y]) {
			ret.push(grid[x-1][y]);
		}

		// East
		if(grid[x+1] && grid[x+1][y]) {
			ret.push(grid[x+1][y]);
		}

		// South
		if(grid[x] && grid[x][y-1]) {
			ret.push(grid[x][y-1]);
		}

		// North
		if(grid[x] && grid[x][y+1]) {
			ret.push(grid[x][y+1]);
		}

		if (this.diagonal) {
			// Southwest
			if(grid[x-1] && grid[x-1][y-1]) {
				ret.push(grid[x-1][y-1]);
			}

			// Southeast
			if(grid[x+1] && grid[x+1][y-1]) {
				ret.push(grid[x+1][y-1]);
			}

			// Northwest
			if(grid[x-1] && grid[x-1][y+1]) {
				ret.push(grid[x-1][y+1]);
			}

			// Northeast
			if(grid[x+1] && grid[x+1][y+1]) {
				ret.push(grid[x+1][y+1]);
			}
		}

		return ret;
	};

	Graph.prototype.toString = function() {
		var graphString = [],
			nodes = this.grid, // when using grid
			rowDebug, row, y, l;
		for (var x = 0, len = nodes.length; x < len; x++) {
			rowDebug = [];
			row = nodes[x];
			for (y = 0, l = row.length; y < l; y++) {
				rowDebug.push(row[y].weight);
			}
			graphString.push(rowDebug.join(" "));
		}
		return graphString.join("\n");
	};

	function GridNode(x, y, weight) {
		this.x = x;
		this.y = y;
		this.weight = weight;
	}

	GridNode.prototype.toString = function() {
		return "[" + this.x + " " + this.y + "]";
	};

	GridNode.prototype.getCost = function() {
		return this.weight;
	};

	GridNode.prototype.isWall = function() {
		return this.weight === 0;
	};

	function BinaryHeap(scoreFunction){
		this.content = [];
		this.scoreFunction = scoreFunction;
	}

	BinaryHeap.prototype = {
		push: function(element) {
			// Add the new element to the end of the array.
			this.content.push(element);

			// Allow it to sink down.
			this.sinkDown(this.content.length - 1);
		},
		pop: function() {
			// Store the first element so we can return it later.
			var result = this.content[0];
			// Get the element at the end of the array.
			var end = this.content.pop();
			// If there are any elements left, put the end element at the
			// start, and let it bubble up.
			if (this.content.length > 0) {
				this.content[0] = end;
				this.bubbleUp(0);
			}
			return result;
		},
		remove: function(node) {
			var i = this.content.indexOf(node);

			// When it is found, the process seen in 'pop' is repeated
			// to fill up the hole.
			var end = this.content.pop();

			if (i !== this.content.length - 1) {
				this.content[i] = end;

				if (this.scoreFunction(end) < this.scoreFunction(node)) {
					this.sinkDown(i);
				}
				else {
					this.bubbleUp(i);
				}
			}
		},
		size: function() {
			return this.content.length;
		},
		rescoreElement: function(node) {
			this.sinkDown(this.content.indexOf(node));
		},
		sinkDown: function(n) {
			// Fetch the element that has to be sunk.
			var element = this.content[n];

			// When at 0, an element can not sink any further.
			while (n > 0) {

				// Compute the parent element's index, and fetch it.
				var parentN = ((n + 1) >> 1) - 1,
					parent = this.content[parentN];
				// Swap the elements if the parent is greater.
				if (this.scoreFunction(element) < this.scoreFunction(parent)) {
					this.content[parentN] = element;
					this.content[n] = parent;
					// Update 'n' to continue at the new position.
					n = parentN;
				}
				// Found a parent that is less, no need to sink any further.
				else {
					break;
				}
			}
		},
		bubbleUp: function(n) {
			// Look up the target element and its score.
			var length = this.content.length,
				element = this.content[n],
				elemScore = this.scoreFunction(element);

			while(true) {
				// Compute the indices of the child elements.
				var child2N = (n + 1) << 1,
					child1N = child2N - 1;
				// This is used to store the new position of the element, if any.
				var swap = null,
					child1Score;
				// If the first child exists (is inside the array)...
				if (child1N < length) {
					// Look it up and compute its score.
					var child1 = this.content[child1N];
					child1Score = this.scoreFunction(child1);

					// If the score is less than our element's, we need to swap.
					if (child1Score < elemScore){
						swap = child1N;
					}
				}

				// Do the same checks for the other child.
				if (child2N < length) {
					var child2 = this.content[child2N],
						child2Score = this.scoreFunction(child2);
					if (child2Score < (swap === null ? elemScore : child1Score)) {
						swap = child2N;
					}
				}

				// If the element needs to be moved, swap it, and continue.
				if (swap !== null) {
					this.content[n] = this.content[swap];
					this.content[swap] = element;
					n = swap;
				}
				// Otherwise, we are done.
				else {
					break;
				}
			}
		}
	};

	return {
		astar: astar,
		Graph: Graph
	};

	});


}

