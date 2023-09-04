import {EQuestState} from "@/data/store";
import {QuestProxy} from "@/data/questProxy";

export class QuestState {
    /**
     *
     * @param {PlayScene} scene
     * @returns {QuestProxyHelper}
     */
    AsProxyObject(scene) {
        return QuestProxy(scene, this.QuestId);
    }

    /**
     * @readonly
     * @type {string}
     */
    QuestId = ''
    /**
     * @readonly
     * @type {Object.<string, *>}
     */
    QuestParameters = {}
    /**
     * @readonly
     * @type {Object.<string, *>}
     */
    MobParameters = {}
    /**
     *
     * @type {string}
     */
    QuestSection = 'Started'

    /**
     *
     * @param {QuestState} options
     */
    constructor(options) {
        Object.assign(this, options);
    }

    /**
     *
     * @type {number} Use EQuestState Enum
     */
    QuestState = EQuestState.Started


}
