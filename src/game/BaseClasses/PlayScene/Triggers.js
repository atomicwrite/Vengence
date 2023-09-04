import {GetActiveQuests, GetAllQuests, GetQuestSection, GetSetting, SetSetting} from "@/data/storeHelper";
import GameMenuHelper from "@/game/BaseClasses/GameMenuHelper";
import {StopEventLoop} from "@/game/scenes/StopEventLoop";

export class Triggers {
    /**
     * @param {string} TextBoxName Found in definition file
     * @param {string} Quest
     * @param {*} payload
     */
    async triggerTextBox(TextBoxName, Quest = "Default", payload) {

        const box = this.TextBoxes.find(a => a.Name === TextBoxName);
        if (!box) return;
        const Section = GetQuestSection(Quest);

        const UniqueQuestSectionTextSetting = `${Quest}_${TextBoxName}_${Section}_Unique`;
        const UniqueQuestTextSetting = `${Quest}_${TextBoxName}_Unique`;
        const QuestSectionCountSetting = `${Quest}_${TextBoxName}_${Section}_Count`;
        const QuestCountSetting = `${Quest}_${TextBoxName}_Count`;

        const UniqueQuestSectionEvent = `${Quest}_${Section}_Unique`;
        const UniqueQuestEvent = `${Quest}_Unique`;
        const QuestSectionEvent = `${Quest}_${Section}`;
        const QuestEvent = `${Quest}`;


        const UniqueQuestSectionTextTest = () => box.text_box[UniqueQuestSectionEvent] && !GetSetting(UniqueQuestSectionTextSetting, Quest);
        const UniqueQuestTextTest = () => box.text_box[UniqueQuestEvent] && !GetSetting(UniqueQuestTextSetting, Quest);
        const QuestSectionText = () => box.text_box[QuestSectionEvent];

        const QuestSectionCount = GetSetting(QuestCountSetting, Quest, 0);
        const QuestCount = GetSetting(`${Quest}_${TextBoxName}_Count`, Quest, 0);
        const QuestText = () => box.text_box[QuestEvent];

        if (UniqueQuestSectionTextTest()) {
            await box.text_box[UniqueQuestSectionEvent].bind(box.text_box)(this, payload);
            SetSetting(UniqueQuestSectionTextSetting, true, this, Quest);

        } else if (UniqueQuestTextTest()) {
            await box.text_box[UniqueQuestEvent].bind(box.text_box)(this, payload);
            SetSetting(UniqueQuestTextSetting, true, this, Quest);

        } else {
            const questSectionText = QuestSectionText();
            if (questSectionText) {
                await questSectionText.bind(box.text_box)(this, QuestSectionCount, payload);
                SetSetting(QuestSectionCountSetting, QuestSectionCount + 1, this, Quest);
            } else {
                const questText = QuestText();

                if (questText) {
                    await questText.bind(box.text_box)(this, QuestCount, payload);
                    SetSetting(QuestCountSetting, QuestCount + 1, this, Quest)
                }
            }
        }


    }

    /**
     * @param {string} QuestName
     */
    triggerQuestFinished(QuestName) {
        this.triggerCustomEvents("Finished", QuestName)
    }

    /**
     * @param {string} QuestName
     */
    triggerQuestFailed(QuestName) {
        this.triggerCustomEvents("Failed", QuestName)
    }

    /**
     * @param {string} QuestName
     */
    triggerQuestStart(QuestName) {
        this.triggerCustomEvents("Started", QuestName)
    }

    /**
     * @param {string} scene_name the menu scene name
     * @param {boolean} pause Should it pause the current scene
     */
    triggerGameMenu(scene_name, pause) {
        const gameMenu = new GameMenuHelper(this, pause);
        gameMenu.Show(scene_name)
    }


    triggerSceneResume(oldScene) {
        this.scene.pause();
        this.scene.setVisible(false)
        this.scene.resume(oldScene)

    }

    /**
     * @param {string} NewScene
     */
    triggerSceneChange(NewScene) {
        const Quests = GetAllQuests()
        for (const quest of Quests) {
            this.triggerCustomEvents("SceneFinished")
        }


        this.cameras.main.fadeOut(1000, 0, 0, 0)

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(NewScene)
        })


    }

    /**
     *
     * @param {string} EventName
     * @param {*=} payload
     */
    triggerCustomEvents(EventName, payload = undefined) {

        if (this.SceneEvents[EventName]) {
            try {
                this.SceneEvents[EventName](this, payload)
            } catch (e) {
                if (e instanceof StopEventLoop) {
                    return;
                }
                throw e
            }
        }
        const Quests = GetActiveQuests()
        for (const Quest of Quests) {
            const QuestName = Quest.QuestId
            try {
                this.triggerCustomEvent(QuestName, EventName, payload);
            } catch (e) {
                if (e instanceof StopEventLoop) {
                    return;
                }
                throw e
            }
        }
    }

    /** triggers an event on a quest (default being the "world" quest the ends when you win.
     * @param {string} QuestName
     * @param {string} EventName
     * @param {*=} payload
     */
    triggerCustomEvent(QuestName, EventName, payload) {
        if (this.SceneEvents[EventName])

            this.SceneEvents[EventName](this, payload)

        const Sprites = this.SpriteList.filter(sprite =>
            sprite.sprite && sprite.EventsData && sprite.EventsData[QuestName] && sprite.EventsData[QuestName][EventName]
        )
        for (const sprite_def of Sprites) {

            sprite_def.EventsData[QuestName][EventName].bind(sprite_def.EventsData[QuestName])(this, sprite_def.sprite, payload)

        }
    }
}
