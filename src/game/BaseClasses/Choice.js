export class Choice {

    constructor(Scene, x, y, Text) {
        this.Scene = Scene;
        this.Toast = Scene.rexUI.add.toast({
            x: x,
            y: y,

            background: this.Scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            text: this.Scene.text(0, 0, '', {
                fontSize: '24px'
            }),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        })
        this.Toast.on('pointerup', this.OnClick.bind(this));
        s

    }

    Activate(text, handler) {
        this.OnClickHandler = handler;
        this.Toast.setDisplayTime(999999);
        this.Toast.showMessage(text);
    }

    OnClick(pointer) {
        if (this.OnClickHandler) {
            this.OnClickHandler(pointer);
        }
        this.Toast.fadeOut()
    }
}

class Choices {
    ChoiceWidth = 300;
    ChoiceHeight = 150;
    ChoiceVerticalPadding = 100;
    ChoiceHorizontalPadding = 100;

    async ShowChoicesAbove(Scene, Sprite, choiceDict,) {
        return this.ShowChoicesGrid(Scene, Sprite.x, Sprite.y + (Sprite.Height + this.ChoiceHeight + this.ChoiceVerticalPadding ), this.ChoiceWidth, this.ChoiceHeight, 6)
    }

    async ShowChoicesBelow(Scene, Sprite, choiceDict) {
        return this.ShowChoicesGrid(Scene, Sprite.x, Sprite.y - (Sprite.Height + this.ChoiceHeight + this.ChoiceHorizontalPadding), this.ChoiceWidth, this.ChoiceHeight, 6)
    }

    async ShowChoicesLeft(Scene, Sprite, choiceDict) {
        return this.ShowChoicesGrid(Scene, Sprite.x - this.ChoiceWidth, Sprite.y, this.ChoiceWidth, this.ChoiceHeight, 1)
    }

    async ShowChoicesGrid(Scene, startX, startY, perRow, choiceDict) {
        const ChoiceKeys = Object.keys(choiceDict);
        let col = 0;
        let row = 0;
        let ChoiceList = [];
        for (const string of ChoiceKeys) {
            let y = startY + (row * this.ChoiceHeight) + this.ChoiceVerticalPadding;
            let x = startX + (col * this.ChoiceWidth) + this.ChoiceHorizontalPadding;
            ChoiceList.push(new Choice(Scene, x, y, string))
            col++;
            if (col >= perRow) {
                col = 0;
                row++;
            }
        }

    }

}
