Crabblet - How does it work?

Crabblet is a 2 player turn based game based on the game Gobblet. It has the same objective of classic
tic tac toe - getting 3 in a row - but players get 3 different sizes of pieces to choose from (2 of each size). Larger pieces can be placed ontop of smaller pieces, trapping them and changing control of the tile they are placed in.

It is played on a 3x3 board (or in this case beach) with hermit crabs looking for more sizeable abode.

-players take one turn each

-Crabs will only change colour shells if presented with a bigger one

-only the biggest shell (the visible one) on each tile counts towards the win conditions

-placed shells can be moved but only by their owner (dictated by colour) - this will use a turn

-to win a player must create a visible line of 3 adjascent shells of their colour

-a draw will occur if both players have placed down all shells and there is no winner

-if uncovering an oponents shell to create a 3 shell win condition also creates a win condition for your opponent, the player making the move will have priority in winning.

Use of Generative AI:
Chat GPT - 5.4 by OpenAI (https://chatgpt.com/) has been used in this work for the following:
-providing links to relevant javascript and html documentation pages/sites
-general debugging of code
-explain errors flagged by the linter (JSLint) and suggest fixes
-check sufficient functions had documentation


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/H6lPFq0J)
# Computing 2 Coursework Submission.
**CID**: [02600918]

This is the submission template for your Computing 2 Applications coursework submission.

## Checklist
### Install dependencies locally
This template relies on a a few packages from the Node Package Manager, npm.
To install them run the following commands in the terminal.
```properties
npm install
```
These won't be uploaded to your repository because of the `.gitignore`.
I'll run the same commands when I download your repos.

### Game Module – API
*You will produce an API specification, i.e. a list of function names and their signatures, for a Javascript module that represents the state of your game and the operations you can perform on it that advances the game or provides information.*

- [ ] Include a `.js ` module file in `/web-app` containing the API using `jsdoc`.
- [ ] Update `/jsdoc.json` to point to this module in `.source.include` (line 7)
- [ ] Compile jsdoc using the run configuration `Generate Docs`
- [ ] Check the generated docs have compiled correctly.

### Game Module – Implementation
*You will implement, in Javascript, the module you specified above. Such that your game can be simulated in code, e.g. in the debug console.*

- [ ] The file above should be fully implemented.

### Unit Tests – Specification
*For the Game module API you have produced, write a set of unit tests descriptions that specify the expected behaviour of one aspect of your API, e.g. you might pick the win condition, or how the state changes when a move is made.*

- [ ] Write unit test definitions in `/web-app/tests`.
- [ ] Check the headings appear in the Testing sidebar.

### Unit Tests – Implementation
*Implement in code the unit tests specified above.*

- [ ] Implement the tests above.

### Web Application
*Produce a web application that allows a user to interface with your game module.*

- Implement in `/web-app`
  - [ ] `index.html`
  - [ ] `default.css`
  - [ ] `main.js`
  - [ ] Any other files you need to include.

### Finally
- [ ] Push to GitHub.
- [ ] Sync the changes.
- [ ] Check submission on GitHub website.
