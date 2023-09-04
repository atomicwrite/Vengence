const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
import {
    TextBox as RexTextBox,

    RoundRectangle,
    BBCodeText
} from 'phaser3-rex-plugins/templates/ui/ui-components.js';

/**
 *
 */
export default class TextBox {
    /**
     *
     * @param {PlayScene} scene A Scene to put the text box on
     * @param {{X:number,Y:number}} item XY Coords to put TextBox
     */
    constructor(scene, item) {

        this.text = '';

        this.scene = scene;

        this.createTextBox( {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
          x:  item.X,y:item.Y,
        })
        this.text_obj.fadeOut(1)

        this.page = this.text_obj.page
    }

    /**
     * Can Be overriden. Creates the background for the textbox.
     * @returns {Phaser.GameObjects.GameObject}
     */
    createBackground() {
        const rectangle = this.scene.rexUI.add.roundRectangle(this.scene, 0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT);

        return rectangle;
    }
    /**
     * Can Be overriden. Creates the icon for the text box.
     * @returns {Phaser.GameObjects.GameObject}
     */
    createIcon() {

        const rectangle = this.scene.rexUI.add.roundRectangle(this.scene, 0, 0, 2, 2, 20, COLOR_DARK)

        return rectangle;
    }
    /**
     * Can Be overriden. Creates the text box from this config
     * @returns {Phaser.GameObjects.GameObject}
     * @param {{wrapWidth: number, fixedWidth: number, x: number, y: number, fixedHeight: number}} config A config setting for the text box
     */
    createTextBox(config ) {

        const {
            wrapWidth,
            fixedWidth,
            fixedHeight,
            x, y


        } = config;

        this.text_obj = this.scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: this.createBackground(),

            icon: this.createIcon(),

            // text: this.getBuiltInText(wrapWidth, fixedWidth, fixedHeight),
            text: this.getBBcodeText(wrapWidth, fixedWidth, fixedHeight),

            action: this.scene.add.image(0, 0, 'Vines_Book').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
            .setOrigin(0)
            .layout();

        this.text_obj
            .setInteractive()
        const textBox = this.text_obj
        textBox
            .setInteractive()

            .on('pointerdown', this.TextBoxClick.bind(this))
            .on('pageend', this.PageEnd.bind(this))


        return this.text_obj;
    }
    /**
     * CallBack for a click for extra logic past
     */
    OnTextBoxClick(pointer) {

    }

    /**
     * Moves to the next page. Useful for speeding up text.
     */
    TypeNextPage() {
        this.text_obj.typeNextPage();
    }
    /**
     * The Click Event. Speeds up the page.
     */
    TextBoxClick(pointer) {

        const icon = this.text_obj.getElement('action').setVisible(false);
        this.text_obj.resetChildVisibleState(icon);
        if (this.text_obj.isTyping) {
            this.text_obj.stop(true);
        } else {
            this.text_obj.typeNextPage();
        }
        this.OnTextBoxClick(pointer);

    }

    /**
     * Called when a page ends (the text reaches the bottom)
     * @param {boolean} IsLastPage Is this the Very Last page?
     */
    OnPageEnd(IsLastPage) {
        if (IsLastPage) {
            this.Resolve()
        }
    }

    /**
     *  The Event for the Page Ending. Handles closing the box and speeding up the text.
     */
    PageEnd() {

        if (this.text_obj.isLastPage) {
            this.OnPageEnd(true);
            return;
        }

        const icon = this.text_obj.getElement('action').setVisible(true);
        this.text_obj.resetChildVisibleState(icon);
        icon.y -= 30;
        const tween = this.scene.tweens.add({
            targets: icon,
            y: '+=30', // '+=100'
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false
        });
        this.OnPageEnd(false, tween);
    }


    /**
     * Gets the Text Object for the text box
     * @param wrapWidth
     * @param fixedWidth
     * @param fixedHeight
     * @returns {Phaser.GameObjects.GameObject}
     */
    getBBcodeText(wrapWidth, fixedWidth, fixedHeight) {
        const bbcode = this.scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,

            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 3
        })


        return bbcode
    }


    resolve;
    reject;

    Resolve() {
        if (this.resolve) {
            this.resolve();
            return true;
        }
    }

    ClearText() {
        this.page.clearText();
    }

    /**
     * Adds another page to the text box to the queue
     * @param {string} content
     * @constructor
     */
    AppendPage(content) {
        this.page.appendPage(content);
    }

    /**
     * Sets the text of the text box
     * @param {string} text
     * @constructor
     */
    SetText(text) {

        this.page.setText(text);
    }
    /**
     * Adds another page to the text box to the queue
     * @param {string} text
     * @constructor
     */
    AppendText(text) {

        this.page.appendText(text);
    }

    /**
     * Starts the textbox on typing and adds the text as a page.
     * @param text The initial page of the text box
     * @param speed the speed of the text
     * @returns {Promise<unknown>} a promise that resolves when the text has reached the end of what is being said.
     * @constructor
     */
    Say(text, speed = 50) {
        const a = this.text_obj.start(text, speed);
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

        }).then(() => {
            this.resolve = null;
            this.reject = null;
        })


    }

    Show( ) {
        if (this.resolve) {
            this.resolve();


        }
        this.ShowEffect();

        this.text_obj.start(this.text, 50)

    }

    ShowEffect() {
        this.text_obj.fadeIn(50)
    }

    Hide() {
        if (this.resolve) {
            this.resolve();


        }
        this.HideEffect();


    }

    HideEffect() {

        this.text_obj.fadeOut(50)
    }

    NextEffect() {

    }

    Next() {
        this.text_obj.typeNextPage();
    }

}
