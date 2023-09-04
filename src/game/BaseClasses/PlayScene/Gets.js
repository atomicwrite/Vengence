import {QuestProxy} from "@/data/questProxy";
import {MobProxy} from "@/data/mobProxy";

/**
 *
 */
export class Gets {
    /**
     * @param {string} QuestName The quest to get. Allows using SetSettings and GetSetting like object properties
     */
    GetQuestProxy(QuestName) {
        return new QuestProxy(this, QuestName);
    }

    /**
     * @param {string} MobName The Mob to track
     * @param {string} QuestName The quest (optional) to track them on. Note, if used, these settings won't be available to other quests or the global settings.
     */
    GetMobProxy(MobName, QuestName = "Default") {
        return new MobProxy(this, MobName, QuestName)
    }


    /**
     * @param {Phaser.GameObjects.Sprite} group_leader any sprite in the group
     * @param {string} prefix optional prefix to filter by
     */
    getSpritesByGroup(group_leader, prefix) {
        const leader = this.getSpriteByName(group_leader)
        const grouped = this.SpriteList.filter(b => leader.x === b.X && leader.y === b.Y && leader.width === b.Width && leader.height === b.Height)
        if (prefix)
            return grouped.filter(a => a.Name.startsWith(prefix)).map(a => a.sprite);
        return grouped.map(a => a.sprite);
    }

    /**
     * @param {string} Name Found in definition file
     */
    getTextBoxByName(Name) {
        let found = this.TextBoxes.find(a => a.Name === Name);
        if (!found) return undefined;
        return found.text_box;
    }

    /**
     * @param {string} Name Found in definition file
     */
    getSpriteByName(Name) {
        let found = this.SpriteList.find(a => a.Name === this.ConvertSpriteNameToSpriteSceneName(Name));
        if (!found) return undefined;
        return found.sprite;
    }
}
