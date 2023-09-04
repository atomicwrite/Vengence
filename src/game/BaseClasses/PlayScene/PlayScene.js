import {Scene} from 'phaser'
import {GetAllQuests} from "@/data/storeHelper";
import {Triggers} from "@/game/BaseClasses/PlayScene/Triggers";
import {Creates} from "@/game/BaseClasses/PlayScene/Creates";
import {Mouses} from "@/game/BaseClasses/PlayScene/Mouses";
import {Gets} from "@/game/BaseClasses/PlayScene/Gets";
import {mixins} from "@/game/BaseClasses/PlayScene/MixinsHelper";

/**
 *
 * @typedef {Object} SpriteDefinition
 * @property {string} Name - The name of the sprite
 * @property {Object} item - The Sprite Definition
 * @property {string} Name - The Name of the Sprite from the Definition for quick access and look up
 * @property {Object.<string,SceneSpriteEvents>} EventsData - The Events this sprite listens to
 */


/**
 * The complete SpriteIndex, or one or more components of the SpriteIndex.
 * @typedef {Object} SpriteIndex
 * @property {boolean} sprite - The Sprite on the current Scene
 * @property {SpriteDefinition} item - The Sprite Definition
 * @property {string} Name - The Name of the Sprite from the Definition for quick access and look up
 * @property {Object.<string,SceneSpriteEvents>} EventsData - The Events this sprite listens to
 */

/**
 * @extends Scene
 * @extends Gets
 * @extends Mouses
 * @extends Creates
 * @extends Triggers
 */
export default class PlayScene extends mixins(Scene, Gets, Mouses, Creates, Triggers) {


    SceneName = '';
    TextBoxes = []

    /**
     *
     * @param {string} sceneName
     */
    constructor(sceneName = 'PlayScene') {
        super({key: sceneName})
        this.SceneName = sceneName;


    }

    /**
     * @param {Object.<string,SceneEvents>}
     */
    SceneEvents;

    /**
     *
     * @type {Object.<string, SpriteIndex>[]}
     */
    SpriteList = []


    ConvertSpriteNameToSpriteSceneName(name) {
        return name;
    }


    create() {
        this.SetupSceneEventsListeners();
        this.SetupMouseSceneEventsListeners();
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.triggerCustomEvents("SceneCreated");
        this.SetupDebug();
        this.children.bringToTop(this.DebugTextBox)


    }

    SetupDebug() {
        if (window.debug_sprites)
            this.DebugTextBox = this.add.text(10, 50, "Debug:", {
                fontSize: '40px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
                backgroundColor: '#640f64',

            })
    }



    SetupSceneEventsListeners() {
        this.events.on('pause', this.triggerScenePauseEvents.bind(this))
        this.events.on('boot', this.triggerSceneBootEvents.bind(this))
        this.events.on('destroy', this.triggerSceneDestroyEvents.bind(this))
        this.events.on('resume', this.triggerSceneResumeEvents.bind(this))
    }

    /**
     * @private
     * @param data
     */
    triggerSceneDestroyEvents(data) {
        this.triggerCustomEvents("SceneDestroy", data);
    }

    triggerSceneBootEvents(data) {
        this.triggerCustomEvents("SceneBoot", data);
    }

    triggerScenePauseEvents(data) {
        this.triggerCustomEvents("ScenePause", data);
    }


    triggerSceneResumeEvents(data) {
        this.triggerCustomEvents("SceneResume", data);
    }

    SetupMouseSceneEventsListeners() {
        this.input.on('pointerup', this.PointerUpListsener.bind(this));
        this.input.on('pointermove', this.PointerMoveListener.bind(this));
        this.input.on('pointerover', this.PointerOverListener.bind(this));
        this.input.on('pointerout', this.PointerOutListener.bind(this));
    }


    PointerMoveListener(pointer) {
        const Quests = GetAllQuests()
        for (const QuestName of Quests) {
            if (this.SceneEvents[QuestName] && this.SceneEvents[QuestName]['PointerMove']) {
                this.SceneEvents[QuestName]['PointerMove'](null, null, this, pointer)
            }
        }
    }

    PointerUpListsener(pointer) {
        const Quests = GetAllQuests()
        for (const QuestName of Quests) {
            if (this.SceneEvents[QuestName] && this.SceneEvents[QuestName]['PointerUp']) {
                this.SceneEvents[QuestName]['PointerUp'](null, null, this, pointer)
            }
        }
    }

    PointerOverListener(pointer) {
        const Quests = GetAllQuests()
        for (const QuestName of Quests) {
            if (this.SceneEvents[QuestName] && this.SceneEvents[QuestName]['PointerOver']) {
                this.SceneEvents[QuestName]['PointerOver'](null, null, this, pointer)
            }
        }
    }

    PointerOutListener(pointer) {
        const Quests = GetAllQuests()
        for (const QuestName of Quests) {
            if (this.SceneEvents[QuestName] && this.SceneEvents[QuestName]['PointerOut']) {
                this.SceneEvents[QuestName]['PointerOut'](null, null, this, pointer)
            }
        }
    }

    update() {
    }
}

