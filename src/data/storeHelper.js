import {EQuestState, store} from "@/data/store";

/**
 *
 * @param QuestName The name of the existing Quest
 * @param QuestSection The Section you want to set to. It doesn't have to exist.
 * @param Scene
 */
export function SetQuestSection(QuestName, QuestSection, Scene) {

    store.commit('SetQuestSection', {QuestId: QuestName, Section: QuestSection})
    Scene.triggerCustomEvents(`QuestSectionUpdate_${QuestSection}`, QuestName)
}

/**
 *
 * @param QuestName The name of the existing Quest
 * @returns {string} The current Quest Section
 * @constructor
 */
export function GetQuestSection(QuestName) {

    return store.getters.GetQuestSection(QuestName)
}

/**
 *
 * @param QuestName The name of the existing Quest
 * @returns {boolean} If a quest is created
 * @constructor
 */
export function GetQuestCreated(QuestName) {

    return store.getters.GetQuestCreated(QuestName)
}

/**
 * Gets all quests (Completed, failed, started, paused)
 * @returns {QuestState[]}
 * @constructor
 */
export function GetAllQuests() {
    return store.getters.GetAllQuests();
}

/**
 * The the currently active quests
 * @returns {QuestState[]}
 * @constructor
 */
export function GetActiveQuests() {
    return store.getters.GetActiveQuests();
}
/**
 * Returns the Quest if it is completed, or undefined otherwise.
 * @param {string} QuestName The name of the existing Quest
 * @returns {QuestState|undefined}
 * @constructor
 */
export function GetQuestCompleted(QuestName) {

    return store.getters.GetQuestCompleted(QuestName)
}

/**
 * Returns a variable from a Quest

 * @returns {*}


 * @param {string} SettingName The name of the setting
 * @param {*=undefined} defaultValue  The value to return if the setting doesn't exist
 * @param {string="Default"} QuestId Scope to this quest.
 */
export function GetSetting(SettingName, defaultValue, QuestId = "Default") {
    const val = store.getters.GetQuestValue(QuestId, SettingName)
    return val === undefined ? defaultValue : val;
}

/**
 * Returns a variable from a mob.
 * @param SettingName The name of the setting on the mob
 * @param defaultValue The value to return if the setting doesn't exist
 * @param QuestId The name of the quest
 * @returns {*} The Setting Value
 */
export function GetMobSetting(SettingName, defaultValue, QuestId = "Default") {
    const val = store.getters.GetMobValue(QuestId, SettingName)
    return val === undefined ? defaultValue : val;
}

/**
 * Starts a new game save and moves the user to the kitchen
 * @param Scene
 * @returns {Promise<void>}
 * @constructor
 */
export async function NewGame(Scene) {
    store.commit("NewGame")
    Scene.triggerSceneChange("preload_HomeKitchen");

}

/**
 * Helper function to set a setting for a quest. There is a global quest called Default that should be used
 * if you are interested in global variables. Otherwise, passing the QuestId will scope that variable to the
 * specific quest only. So you can have the same variable in two different quests. This helps keep quest
 * logic grouped.
 * @param SettingName The name of the variable you want to set
 * @param SettingValue The value of the variable you are setting
 * @param Scene The scene that will emit the events
 * @param QuestId The name of the quest or Default

 */
export function SetSetting(SettingName, SettingValue, Scene, QuestId = "Default") {
    store.commit('SetQuestValue', {QuestId: QuestId, Value: SettingValue, Name: SettingName})

    Scene.triggerCustomEvents("QuestSettingsUpdate_" + SettingName, QuestId, SettingValue)
}

/**
 * Helper function to fail a quest and emit the appropriate event to the scene
 * @param QuestName the name of the Quest
 * @param scene The scene that will emit events
 * @constructor
 */
export function FailQuest(QuestName, scene) {
    store.commit('SetQuestState', {QuestId: QuestName, QuestState: EQuestState.Failed})
    scene.triggerQuestFailed(QuestName)
}

/**
 * Helper function to end a quest and emit the appropriate event to the scene
 * @param QuestName the name of the Quest
 * @param scene The scene that will emit events
 * @constructor
 */
export function EndQuest(QuestName, scene) {

    scene.triggerQuestFinished(QuestName)
    store.commit('SetQuestState', {QuestId: QuestName, QuestState: EQuestState.Finished})

}

/**
 * Helper function to start a quest and emit the appropriate event to the scene
 * @param scene The scene that will emit events
 * @param QuestName the name of the Quest
 * @param Section The Section of the quest to start in
 * @returns {Promise<void>}
 * @constructor
 */
export async function StartQuest(scene, QuestName, Section) {
    await store.commit('SetQuestState', {QuestId: QuestName, QuestSection: Section, QuestState: EQuestState.Started})
    await scene.triggerQuestStart(QuestName)

}
