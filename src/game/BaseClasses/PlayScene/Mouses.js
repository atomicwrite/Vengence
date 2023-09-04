import {store} from "@/data/store";
import {StopEventLoop} from "@/game/scenes/StopEventLoop";

export class Mouses {


    /**
     * @param {*} EventName The name of the event
     * @param {Phaser.GameObjects.Sprite} sprite The Sprite
     * @param {Phaser.Input.Pointer} pointer The pointer data from the event from the sprite
     * @param {{}} EventsData  From the Sprite Definition
     */
    MouseEvents(EventName, sprite, pointer, EventsData) {
        const quests = store.getters.CurrentQuests();
        for (const quest of quests) {
            try {
                this.MouseQuest(quest, EventsData, EventName, sprite, pointer);
            } catch (e) {
                if (e instanceof StopEventLoop) {
                    return;
                }

                console.log("MouseEvent Threw Eception");
                console.error(e);
                throw e
            }
        }
    }


    /**
     * @param {number} QuestName The quest being checked
     * @param EventsData From the Sprite Definition
     * @param EventName From the Sprite Definition
     * @param {Phaser.GameObjects.Sprite} sprite The Sprite
     * @param {Phaser.Input.Pointer} pointer The pointer that the sprite generated
     */
    MouseQuest(QuestName, EventsData, EventName, sprite, pointer) {

        const QuestMouseEvent = EventName;


        if (!(EventsData && EventsData[QuestName]) || !EventsData[QuestName][QuestMouseEvent]) {
            return;
        }

        EventsData[QuestName][QuestMouseEvent].bind(EventsData[QuestName])(this, sprite, pointer)

    }
}
