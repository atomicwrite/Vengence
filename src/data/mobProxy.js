import {GetSetting, SetSetting} from "@/data/storeHelper";

/**
 *  Lets us use Jo.Lust = 3 or Jo.Sunglasses = 4 or return Job.Sunglasses or Jo.Location with events Mob_Move_Jo will get payload the new location handy
 *  for turning off and on sprites with out clogging up main logic
 * @param {PlayScene} scene The Sprite
 * @param {string} mob The pointer data from the event from the sprite
 * @param {string } Quest Only change for a quest specific mob.
 * @returns {MobProxyHelper}
 */
export function MobProxy(scene, mob, Quest = "Default") {

    return new Proxy(new MobProxyHelper(), {
        get: function (target, prop, receiver) {

            return GetSetting(`${mob}.${prop}`, undefined, Quest);
        },
        set: function (target, prop, value, receiver) {

            SetSetting(`${mob}_${prop}`, value, scene, Quest);
        }
    })
}

export class MobProxyHelper {

}

