## Usage
- Сlone repository
- Install npm packages
```start
npm install
```
- Build project and opened in browser you need only run this command
```build
gulp
```
---

## Tech

* HTML5 canvas
* [Gulp](http://gulpjs.com/) - the streaming build system
* [jQuery](https://jquery.com/) -  JavaScript library
* [markdown-it](http://dillinger.io/) - parser

## Structure code
The game is built in HTML5 tag: `canvas`
Common object is `class Game` it:
- Monitors actions frome user
- Draws one of 5 scene:
    - `class MenuScene`
    - `class GameScene`
    - `class IntroScene`
    - `class SelectLevel`
    - `class ExitScene`
- Сounts the number of frames per second, using [requestAnimationFrame()](https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame)

Each scene has a link to the main object and has access to its methods and properties
- ##### Methods
- setScene(Scene) - change scene
- update(dt) - collect information `dt` is step in milliseconds
- render(dt, game) - draw current stage

Event of the user entered into one object `keys` = `{ keyCode : boolean }`
An important feature is the `map` that is formed by two-dimensional array
#### MenuScene && SelectScene
Have a similar structure.
Navigation with keyboard arrows and press Enter.
Menu navigate to other scenes and frome level scene you can choose another map.
#### IntroScene
Some short information about project.
#### GameScene
The largest facility that records all the information about the game map coordinates, logic, statistics...
- ##### Properties
- posX && posX2 - coords X tanks
- posY && posY2 - coords Y tanks
- ballX && ballX2 - coords X cannonball default = 0
- ballY && ballY2 - coords X cannonball default = 0
- speed && speed - speed cannonball
- killed && killed2 - statistic raund

- ##### Methods
- gameMap() - create map using canvas context methods
- move functions for each tank on the map
- fire functions
- render(dt) - drawing changes players and map
- update(dt) - keep up the actions of the players

 render method includes class player1, player2 and bullet
 player classes property `cannonball` and whene user click on attak button
 GamceScene run method `initFire()`
 after draw cannonball and will track its coordinates
 the logic of movement it transform the coordinates of the `cannonball` in place in the array
 if the coordinates outside the playing field or place in the array is not zero
 pick up the ball from the map
 map redrawn after the destruction of wall elements
> create game `let game = new Game();`
> the whole game is available in the onece property `window.game`
>
> features: statistics and sound effects

> demo version: https://willfulaversion.github.io/tanks/

License
----

[//]: # ()

   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [Gulp]: <http://gulpjs.com>
