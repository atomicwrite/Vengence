import Phaser from 'phaser'
import DissolvePostFx from 'phaser3-rex-plugins/plugins/dissolvepipeline.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import sceneList from "@/game/sceneList";


function launch(containerId) {

    return new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        parent: containerId,
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
                // ...
            ]
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false
            }
        },
        pipeline: [DissolvePostFx],
        scene: sceneList,
        // scale: {
        // //    parent: containerId,
        //     mode: Phaser.Scale.FIT,
        //     width: 800,
        //     height: 600
        // }
    })
}

window.debug_sprites = true;

export default launch
export {launch}
