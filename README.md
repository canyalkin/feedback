# Treasure Hunter

Your job is to write the brain of a treasure troll. 
This troll will start on a randomly generated map with scattered obstacles and stackable blocks. 
Somewhere on the field, there is a tower, atop which rests a golden treasure. 
To attain this treasure, your troll must stack blocks and build a staircase. 
The object is to write a clean and understandable solution that finds the treasure in as few moves as possible.

Try to complete the solution in under 1000 moves. 

## Approach
The problem is identified as a 2D, sparse, Euclidean, braid Maze.

The troll is "in the dark" in this maze, meaning that he can not see anything that is not directly adjacent in one of the four cardinal direction. 

The following approach will be attempted:

1. Map the Perimeter using the Pledge Algorithm
2. Map the entire maze using a simplified Boustrophedon Algorithm,
3. Move troll to location of gold. 
4. Split the maze into quadrants. Push block locations from the three nearest quadrants onto a block stack. 
5. Build a scaffold around the gold 1 block high. 
6. Tell the troll that the region around the scaffold is a "wall" i.e. off limits and not to be used in pathfinding. 
7. Pop a block and use the A* path finding algorithm to send the troll to retrieve the nearest block.
8. Build a simple ladder up to the gold.
