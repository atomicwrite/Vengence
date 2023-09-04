import {StartQuest} from "@/data/storeHelper";


/**
 *  A semi facade around phaser with promises around animation callbacks and such. Useful for await/async.
 */
export default class ConversationSequence {
    /**
     *
     * @param {Phaser.Scene} scene A Scene Object to run this on -- should be the active scene or subscene
     * @param {Object} sprites_aliases a string=>sprite object.
     * @param textboxes_aliases a string=>textbox object.
     * @callback EntryPoint The starting function of the conversation
     */
    constructor(scene, sprites_aliases, textboxes_aliases, EntryPoint) {
        debugger;
        this.Scene = scene
        this.Sprites = sprites_aliases;
        this.TextBoxes = textboxes_aliases;
        this.EntryPoint = EntryPoint;

    }

    FadeIn(sprite_name) {
        const sprite = this.GetSpriteByName(sprite_name);


        return this.animatetweens(this.Scene, sprite, [{
            alpha: 1,
            duration: 500,
            targets: sprite,
            ease: 'Power2'
        }]);
    }


    GetSpriteByName(sprite_name) {
        return this.Sprites[sprite_name];
    }

    FadeOut(sprite_name) {
        const sprite = this.Sprites[sprite_name];

        return this.animatetweens(this.Scene, sprite, [{
            alpha: 0,
            duration: 500,
            targets: sprite,
            ease: 'Power2'
        }]);
    }

    DissolveTo(sprite_name, toTexture) {
        const pipelineInstance = this.Scene.plugins.get('rexDissolvePipeline').add(this.GetSpriteByName(sprite_name), {
            toTexture: toTexture,
            // toFrame: frameName,
            // resizeMode: 1,

            // noiseX: undefined,
            // noiseY: undefined,
            // noiseZ: undefined,
            // fromEdgeStart: 0.01,
            // fromEdgeWidth: 0.05,
            // toEdgeStart: 0.01,
            // toEdgeWidth: 0.05,

            // progress: 0,

            // name: 'rexDissolvePostFx'
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500)
        });
    }

    DissolveOut(sprite_name) {
        const pipelineInstance = this.Scene.plugins.get('rexDissolvePipeline').add(this.GetSpriteByName(sprite_name), {

            // toFrame: frameName,
            // resizeMode: 1,

            // noiseX: undefined,
            // noiseY: undefined,
            // noiseZ: undefined,
            // fromEdgeStart: 0.01,
            // fromEdgeWidth: 0.05,
            // toEdgeStart: 0.01,
            // toEdgeWidth: 0.05,

            // progress: 0,

            // name: 'rexDissolvePostFx'
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500)
        });
    }

    animatetweens(scene, sprite, tweens) {
        return new Promise((resolve, reject) => {
            try {

                const timeline = scene.tweens.timeline({})
                tweens.forEach(a => {
                    timeline.add(a);
                })

                timeline.on('complete', () => {
                    resolve(sprite)
                });
                timeline.play()
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * Starts the conversation using the entry point given
     */
    async Start() {
        this.EntryPoint(this);
    }


    /**
     *
     * @param textbox_name
     * @param text
     * @returns {Promise<*|void>}
     * @constructor
     */
    async Say(textbox_name, text) {
        let textBox = this.TextBoxes[textbox_name];
        return await textBox.Say(text)
    }

    async StartQuest(QuestName) {
        StartQuest(this.Scene, QuestName)
    }

    /**
     *
     * @param sprite_name The name of the sprite frame from the sprite index file
     * @param frame The name of the frame from the sprite index file
     * @returns {Promise} A promise that resolves when the animation completes. Or rejects if the frame or sprite doesn't exist
     */
    async Pose(sprite_name, frame) {
        return new Promise((resolve, reject) => {

            this.Sprites[sprite_name].once(Phaser.Animations.Events.ANIMATION_COMPLETE, function (anim, frame, gameObject) {
                resolve();

            });
            try {
                this.Sprites[sprite_name].play({key: frame})
            } catch (e) {
                reject(e);
            }
        });

    }

    async Animate(frameList) {

    }

    Show(sprite_name, effect, ...effect_params) {
        this.Sprites[sprite_name].visibility = true
    }

    ShowTextbox(textbox_name, effect, ...effect_params) {
        this.TextBoxes[textbox_name].Show()
    }
    Hide(sprite_name, effect, ...effect_params) {

    }

}
