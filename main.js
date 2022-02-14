const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
const win = "Congrats, you found your hat!";
const out = "Out of bounds - Game End!";
const lose = "Sorry, you fell down a hole!";
const directions = "Enter U, D, L or R.";

class Field {

        constructor(field = []) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
 
        for(let a = 0; a < col; a++) {
            this.field[a] = [];
        }

        this.generateField(row, col, 0.2);
        
    }

    generateField(height, width, percentage = 0.1) {
        //Generate field and hole location with 10% probability
        for (let y = 0; y < height; y++) {
            for (let x = 0; x< width; x++){
                const prob = Math.random();
                this.field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }
        //Generate hat location
        const hatLocation = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
        };
        this.field[hatLocation.y][hatLocation.x] = hat;

        //Character starting position
        this.field[0][0] = pathCharacter; 
    }

    //Character location
    inBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
      }
 
      inHole() {
        return this.field[this.locationY][this.locationX] === hole;
      }
    
      inHat() {
        return this.field[this.locationY][this.locationX] === hat;
      }

    runGame() {
        let start = true;
        while (start) {
        this.print();
        this.askQuestion();
        if (!this.inBounds()) {
            console.log(out);
            start = false;
            break;
          } else if (this.inHole()) {
            console.log(lose);
            start = false;
            break;
          } else if (this.inHat()) {
            console.log(win);
            start = false;
            break;
          }
          this.field[this.locationY][this.locationX] = pathCharacter; 
        }  
    }

    print() {
        clear();
        const displayString = this.field.map(row=> {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt ('Which way?').toUpperCase();
        switch (answer) {
            case 'U':
              this.locationY -= 1;
              break;
            case 'D':
              this.locationY += 1;
              break;
            case 'L':
              this.locationX -= 1;
              break;
            case 'R':
              this.locationX += 1;
              break;
            default:
              console.log(directions);
              this.askQuestion();
              break;
          }
    }

    
}
const myfield = new Field();
myfield.runGame();