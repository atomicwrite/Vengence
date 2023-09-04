import PlayScene from "@/game/BaseClasses/PlayScene/PlayScene";


/**
 * A class to do xrays
 */
export default class Xray {
    /**
     *
     * @param {PlayScene} Scene The scene that has the xray sprites
     */
    constructor(Scene) {
        this.Scene = Scene;
        this.mask = Scene.make.sprite({
            x: 400,
            y: 300,

            key: 'SchoolBathroom_locker_1',
            add: false,

        });
        this.mask.setOrigin(.5, .5)
        this.mask.displayWidth = 300;
        this.mask.displayHeight = 100;


    }

    Sprites = []

    /**
     * Attaches the xray to the images. This will be the _xray and _xray_full
     * @param images ['aba'] or ['aba','aba_xray']. the list of images to be xrayed
     * @constructor
     */
    Attach(images) {


        if (images.length === 0) return;

        this.Sprites = []
        // this.shape.beginPath();
        //
        // this.shape.fillRect(50, 0, 100, 75);
        //
        // this.mask = this.shape.createGeometryMask();
        // this.mask.invertAlpha = true;


        this.Sprites = images.map(a => this.Scene.getSpriteByName(a)).filter(a => a);
        for (let sprite of this.Sprites) {
            sprite.oldmask = sprite.mask;
            let bitmapMask = new Phaser.Display.Masks.BitmapMask(this.Scene, this.mask);
            sprite.mask = bitmapMask
            bitmapMask.invertAlpha = true;
        }
    }

    /**
     * Remove the xray
     * @constructor
     */
    Clear() {


        for (let sprite of this.Sprites) {

            sprite.mask = sprite.oldmask;
        }
        this.mask.destroy();

    }

    /**
     * Updates the mask's position   (call from Scene Mouse Move or similar)
     * @param payload the pointer
     * @constructor
     */
    Update(payload) {
        this.mask.x = payload.x;
        this.mask.y = payload.y;
    }
}
