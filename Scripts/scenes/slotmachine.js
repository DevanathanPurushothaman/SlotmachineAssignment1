var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._grapesValue = 0;
            this._bananasValue = 0;
            this._orangesValue = 0;
            this._cherriesValue = 0;
            this._barsValue = 0;
            this._bellsValue = 0;
            this._sevensValue = 0;
            this._blanksValueValue = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // Reset the Game to initial values 
            this._resetAll();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
			// add ResetButton to the scene
			this._resetButton = new objects.Button("ResetButton", 160, 382, false);
            this.addChild(this._resetButton);
			 this._resetButton.on("click", this._resetButtonClick, this);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 225, 382, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 290, 382, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 355, 382, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 402, 377, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add JackPot Text to the scene
            this._jackpotText = new objects.Label(this.jackpot.toString(), "14px Consolas", "#ff0000", 353, 107, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            // add Credits Text to the scene
            this._creditsText = new objects.Label(this.PlayerCredit.toString(), "14px Consolas", "#ff0000", 254, 303, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);
            // add Bet Text to the scene
            this._betText = new objects.Label(this.BetAmount.toString(), "14px Consolas", "#ff0000", 351, 303, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            // add Result Text to the scene
            this._resultText = new objects.Label(this.WonAmount.toString(), "14px Consolas", "#ff0000", 450, 303, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
            // Initialize Array of Bitmaps 
            this._initializeBitmapArray();
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        SlotMachine.prototype._resetAll = function () {
            this.PlayerCredit = 1000;
            this.WonAmount = 0;
            this.jackpot = 5000;
            this.BetAmount = 0;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            //var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
              
				var value = Math.floor((Math.random() * 65) + 1);
                 switch (value) {
                    case this._checkRange(value, 1, 27):
                        betLine[spin] = "Blank";
                        this._blanksValueValue++;
                        break;
                    case this._checkRange(value, 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapesValue++;
                        break;
                    case this._checkRange(value, 38, 46):
                        betLine[spin] = "Banana";
                        this._bananasValue++;
                        break;
                    case this._checkRange(value, 47, 54):
                        betLine[spin] = "Orange";
                        this._orangesValue++;
                        break;
                    case this._checkRange(value, 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherriesValue++;
                        break;
                    case this._checkRange(value, 60, 62):
                        betLine[spin] = "Bar";
                        this._barsValue++;
                        break;
                    case this._checkRange(value, 63, 64):
                        betLine[spin] = "Bell";
                        this._bellsValue++;
                        break;
                    case this._checkRange(value, 65, 65):
                        betLine[spin] = "Seven";
                        this._sevensValue++;
                        break;
                }		
            }
			//alert("bananna "+this._bananasValue+" grapes "+this._grapesValue+" orange "+this._orangesValue+" cherry "+this._cherriesValue+" bar "+
           // this._barsValue+" bell "+this._bellsValue+" sevens "+this._sevensValue+" Blank "+this._blanksValueValue+"  player bet "+this.BetAmount);
					
            return betLine;
        };
        /* This function calculates the player's WonAmount, if any */
        SlotMachine.prototype._determineWonAmount = function () {
            if (this._blanksValueValue == 0) {
                if (this._grapesValue == 3) {
                    this.WonAmount = this.BetAmount * 10;
                }
                else if (this._bananasValue == 3) {
                    this.WonAmount = this.BetAmount * 20;
                }
                else if (this._orangesValue == 3) {
                    this.WonAmount = this.BetAmount * 30;
                }
                else if (this._cherriesValue == 3) {
                    this.WonAmount = this.BetAmount * 40;
                }
                else if (this._barsValue == 3) {
                    this.WonAmount = this.BetAmount * 50;
                }
                else if (this._bellsValue == 3) {
                    this.WonAmount = this.BetAmount * 75;
                }
                else if (this._sevensValue == 3) {
                    this.WonAmount = this.BetAmount * 100;
                }
                else if (this._grapesValue == 2) {
                    this.WonAmount = this.BetAmount * 2;
                }
                else if (this._bananasValue == 2) {
                    this.WonAmount = this.BetAmount * 2;
                }
                else if (this._orangesValue == 2) {
                    this.WonAmount = this.BetAmount * 3;
                }
                else if (this._cherriesValue == 2) {
                    this.WonAmount = this.BetAmount * 4;
                }
                else if (this._barsValue == 2) {
                    this.WonAmount = this.BetAmount * 5;
                }
                else if (this._bellsValue == 2) {
                    this.WonAmount = this.BetAmount * 10;
                }
                else if (this._sevensValue == 2) {
                    this.WonAmount = this.BetAmount * 20;
                }
                else if (this._sevensValue == 1) {
                    this.WonAmount = this.BetAmount * 5;
                }
                else {
                    this.WonAmount = this.BetAmount * 1;
					
                }
			    //alert("WonAmount "+this.WonAmount+" Player bet "this.BetAmount);
                console.log("Win!");
				createjs.Sound.play('YaySound');
            }
            else {
                console.log("Loss!");
            }
			//alert("WonAmount "+this.WonAmount+" Player bet "this.BetAmount);
			//alert();
            this._resultText.text = this.WonAmount.toString();
            this.PlayerCredit += this.WonAmount;
            this._creditsText.text = this.PlayerCredit.toString();
            this._resetFruitTally();
        };
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapesValue = 0;
            this._bananasValue = 0;
            this._orangesValue = 0;
            this._cherriesValue = 0;
            this._barsValue = 0;
            this._bellsValue = 0;
            this._sevensValue = 0;
            this._blanksValueValue = 0;
        };
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 216 + (reel * 84);
                this._reels[reel].y = 220;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        };
        SlotMachine.prototype._placeBet = function (BetAmount) {
            // ensure player's bet is less than or equal to players money
            if (BetAmount <= this.PlayerCredit) {
                this.BetAmount += BetAmount;
                this.PlayerCredit -= BetAmount;
                this._creditsText.text = this.PlayerCredit.toString();
                this._betText.text = this.BetAmount.toString();
            }
			else if (confirm("You ran out of Money! \nDo you want to play again?")) {
			this._creditsText.text = "1000";
            this._betText.text = "0";
			this._resultText.text ="0";
			this._jackpotText.text ="5000";
			this._resetAll();
           // showPlayerStats();
			}
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
			this._resultText.text ="0";
			this.WonAmount=0;
            this._placeBet(1);
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
			this._resultText.text ="0";
			this.WonAmount=0;
            this._placeBet(10);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
			this._resultText.text ="0";
			this.WonAmount=0;
            this._placeBet(100);
        };
		   SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset game");
				this._creditsText.text = "1000";
            this._betText.text = "0";
			this._resultText.text ="0";
			this._jackpotText.text ="5000";
			this._resetAll();
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            // ensure player has enough money to play
            if (this.BetAmount > 0) {
				createjs.Sound.play('SpinSound');
                var bitmap = this._spinReels();
                for (var reel = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }
                this._determineWonAmount();
                // reset player's bet to zero
                this.BetAmount = 0;
                this._betText.text = this.BetAmount.toString();
            }
        };
        return SlotMachine;
    }(objects.Scene));
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map