import {Scene} from 'phaser'



export default class PlayScene2 extends Scene {


    constructor() {
        super({key: 'PlayScene2'})

    }


    characters = {};


    create() {
        this.add.image(900,500,'bg_locker_2')

        const rectangle = this.add.rectangle(1200, 600, 125, 50, 0xff66ff, .2);
        rectangle.setInteractive()
        rectangle.on('pointerup', (pointer) => {
            this.scene.start('PlayScene')
        })
         this.tweens.add({

             targets: rectangle,
             angle: 90,
             yoyo: true,
             repeat: -1,
             ease: 'Sine.easeInOut'

         });
    }



    update() {
    }
}
