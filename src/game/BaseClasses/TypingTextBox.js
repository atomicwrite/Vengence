const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
import {
    TextBox as RexTextBox,

    RoundRectangle,
    BBCodeText
} from 'phaser3-rex-plugins/templates/ui/ui-components.js';


export default class TextBox {
    constructor(scene, item) {

        this.text = '';

        this.scene = scene;

        this.createTextBox( {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
          x:  item.X,y:item.Y,
        }).start(this.text, 50)
        this.page = this.text_obj.page
    }

    createBackground() {
        const rectangle = this.scene.rexUI.add.roundRectangle(this.scene, 0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT);

        return rectangle;
    }

    createIcon() {

        const rectangle = this.scene.rexUI.add.roundRectangle(this.scene, 0, 0, 2, 2, 20, COLOR_DARK)

        return rectangle;
    }

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

    OnTextBoxClick(pointer) {

    }

    TypeNextPage() {
        this.text_obj.typeNextPage();
    }

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

    OnPageEnd(IsLastPage, tween) {
        if (IsLastPage) {
            this.Resolve()
        }
    }


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

    development = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development';

    getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {

        return this.scene.add.text(0, 0, development, {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
            .setFixedSize(fixedWidth, fixedHeight);
    }

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

    AppendPage(content) {
        this.page.appendPage(content);
    }

    SetText(text) {

        this.page.setText(text);
    }

    AppendText(text) {

        this.page.appendText(text);
    }

    Say(text, speed = 50) {
        return this.Show(text, speed)

    }

    Show(text, speed = 50) {

        const a = this.text_obj.start(text, speed);
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

        }).then(() => {
            this.resolve = null;
            this.reject = null;
        })


    }

    ShowEffect() {

    }

    Hide() {
        if (this.resolve) {
            this.resolve();

            this.HideEffect();
        }
        this.group.visible = false;
    }

    HideEffect() {

    }

    NextEffect() {

    }

    Next() {
        this.text_obj.typeNextPage();
    }

}
