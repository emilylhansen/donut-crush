## JS Project Proposal: Donut Crush

### Background

Donut Crush is a game inspired by Candy Crush.  The original Donut Crush is a 0-player game that plays out on a rectangular grid.  
Each cell on the grid is populated with one of five different donuts.  
The player must move one donut to make a valid move. The donut cells follow these rules:

1) Any donut cell with 3 ore more neighbors of the same type in the horizontal or vertical direction are destroyed,
2) Destroyed donut cells are replaced with new donut cells,

### Functionality & MVP  

With this Donut Crush simulator, users will be able to:

- [ ] Start a new game
- [ ] Select squares to form valid moves each successive turn

In addition, this project will include:

- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github.  
Game controls will include a Start button. On the left, the user's score, number of moves, and elapsed time is displayed.

![wireframes](https://github.com/emilylhansen/donut-crush/blob/master/donut-crush-wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,

In addition to the entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary elements and rendering them to the DOM.

`row.js`: this script will handle the logic behind the scenes.  
A Row object will hold a 2D array of `Cell`s. It will be responsible for doing neighbor checks for each `Cell` upon a valid move and updating the `Row`object appropriately.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  
Each `Cell` will contain a `type` (pink donut, green donut, blue donut, yellow donut, purple donut) and a `points` (20, 40, 60).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. 
Write a basic entry file and the bare bones of all 3 scripts outlined above. Goals for today:

- Setup all necessary Node modules

**Day 2**: First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render the square grid. Goals for today:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid 
- Make each cell in the grid clickable, toggling the state of the square on click

**Day 3**: Create the Row logic backend.  Build out modular functions for handling the different grid types along with their unique neighbor checks and rule sets.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Automata` object with correct type and handling logic
- Have a functional grid on the frontend that correctly handles valid moves


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for new game 
- Create displays for elapsed time, score, and number of moves

### Bonus features

- [ ] Add options for games with and without timer
