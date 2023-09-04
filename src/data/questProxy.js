import {GetSetting, SetSetting} from "@/data/storeHelper";

/** Lets us use some_quest.someValue = 3 or read the value while calling the appropriate helper functions
  * @param {PlayScene} scene The Scene
 * @param {string} quest_name The the name of the quest
* @returns {QuestProxyHelper}
 */
export function QuestProxy(scene, quest_name) {
    return new Proxy(new QuestProxyHelper(), {
        get: function (target, prop, receiver) {
            return GetSetting(prop, undefined, quest_name)
        },
        set: function (target, prop, value, receiver) {

            return SetSetting(prop, value, scene, quest_name);
        }
    })
}

export class QuestProxyHelper {

}
