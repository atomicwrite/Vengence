import {PlayerSave} from "@/dtos";
import {QuestState} from "@/data/questState";
import {EQuestState} from "@/data/store";

/**
 * The Player Save.
 */
export class PlayerGameSave extends PlayerSave {
    /**
     *
     * @param partial A partial of a game save. Assigns the values of that save to this.
     */
    constructor(partial) {
        super();
        if (partial) {
            Object.assign(this, partial);
        }
    }


    ActiveQuestStates = [new QuestState({QuestId: "Default", QuestState: EQuestState.Started, QuestSection: "Started"})]
    FinishedQuestStates = []
    PausedQuestStates = []
    FailedQuestStates = []

    /**
     *
     * @returns {QuestState[]} All of the quests joined
     */
    get All() {
        return [this.FinishedQuestStates, this.PausedQuestStates, this.FailedQuestStates, this.ActiveQuestStates].flat();
    }
}


