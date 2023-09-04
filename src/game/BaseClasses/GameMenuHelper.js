export default class GameMenuHelper {
    /**
     * @param {Phaser.Scene} Scene A running scene
     * @param {boolean} shouldPause Pause the current scene if true
     */
    constructor(Scene, shouldPause) {
        this.MainScene = Scene.scene
        this.ShouldPause = shouldPause;
    }

    MainScene;

    /**
     * @param {string} MenuScene A Menu scene name
     */
    Show(MenuScene) {
        if (this.ShouldPause)
            this.MainScene.scene.pause();
        this.MainScene.launch(MenuScene, this)
    }

    /**
     *  Resumes the scene attached to this helper
     */
    Resume() {
        if (!this.MainScene) {
            return;
        }
        if (!this.MainScene.scene.isPaused()) {
            return;
        }
        this.MainScene.resume();

    }
}
