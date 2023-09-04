// Create a new store instance.
import {createStore} from "vuex";
import {Inventory} from "@/dtos";
import {QuestState} from "@/data/questState";
import {PlayerGameSave} from "@/data/playerGameSave";

export const EQuestState = {
    'Started': 0,
    'Finished': 1,
    'Failed': 2,

}


export const store = createStore({
    state() {
        return {


            PlayerSave: new PlayerGameSave(),


        }
    },
    mutations: {

        incrementInventory(state, options = {itemId: -1, amount: 0}) {

            const Item = state.PlayerSave.items.find(a => a.itemId === options.itemId);
            if (!Item) {
                state.PlayerSave.items.push(new Inventory({
                    itemCount: options.amount,
                    itemId: options.itemId,
                }));
            } else {
                Item.itemCount += options.amount;
            }

        },
        /// for unique items
        incrementInventoryUnique(state, options = {itemId: -1}) {

            const Item = state.PlayerSave.items.find(a => a.itemId === options.itemId);
            if (Item) //todo: more here
                return;

            state.PlayerSave.items.push(new Inventory({
                itemCount: 1,
                itemId: options.itemId,
            }));

        },
        SetQuestState(state, options = {QuestId: -1, QuestSection: 'Start', QuestState: EQuestState.Failed}) {

            let qstate;
            let index = state.PlayerSave.ActiveQuestStates.findIndex(a => a.QuestId === options.QuestId);
            if (index < 0) {
                qstate = new QuestState(options);
                state.PlayerSave.ActiveQuestStates.push(qstate);
            } else {
                qstate = state.PlayerSave.ActiveQuestStates[index]
            }
            qstate.QuestState = options.QuestState;
            switch (qstate.QuestState) {
                case EQuestState.Finished:
                    state.PlayerSave.ActiveQuestStates.splice(index, 1);
                    state.PlayerSave.FinishedQuestStates.push(qstate)
                    break
            }


        },
        SetDefaultQuestValue(state, options = {QuestValue: {}, Name: ''}) {
            const qstate = state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === "Default");

            if (!qstate) {
                throw new Error("No Such Quest")
            }
            qstate.QuestParameters[options.Name] = options.QuestValue;

        },
        NewGame(state) {
            state.PlayerSave = new PlayerGameSave();
        },
        LoadGame(state) {
            state.PlayerSave = new PlayerGameSave(JSON.parse(localStorage.getItem("SaveGame1")));
        },
        SaveGame(state) {
            localStorage.setItem("SaveGame1", JSON.stringify(state.PlayerSave))
        },
        SetQuestValue(state, options = {QuestId: -1, Value: {}, Name: ''}) {
            const qstate = state.PlayerSave.All.find(a => a.QuestId === options.QuestId);

            if (!qstate) {
                throw new Error("No Such Quest")
            }
            qstate.QuestParameters[options.Name] = options.Value;

        },
        SetMobValue(state, options = {QuestId: -1, Value: {}, Name: ''}) {
            const qstate = state.PlayerSave.All.find(a => a.QuestId === options.QuestId);

            if (!qstate) {
                throw new Error("No Such Quest")
            }
            qstate.MobParameters[options.Name] = options.Value;

        },
        SetQuestSection(state, options = {QuestId: -1, Section: ''}) {

            const qstate = state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === options.QuestId);

            if (!qstate) {
                throw new Error("No Such Quest")
            }
            qstate.QuestSection = options.Section;

        },


    },
    getters: {
        GetCurrentScene: state => (getters, rootState, rootGetters) => {
            return state.CurrentScene;
        },
        GetInventory: state => (itemId) => {
            let Item = state.PlayerSave.items.find(a => a.itemId === itemId);
            if (!Item) {
                Item = new Inventory({
                    itemCount: 0,
                    itemId: itemId,
                });
                state.PlayerSave.items.push(Item);
            }
            return Item;

        },
        CurrentQuests: state => () => {
            return state.PlayerSave.ActiveQuestStates.map(a => a.QuestId);
        },
        GetActiveQuests: state => () => {
            return state.PlayerSave.ActiveQuestStates;
        },
        GetAllQuests: state => () => {
            return state.PlayerSave.All;
        },
        HasQuestState: state => (QuestId) => {
            return state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === QuestId);
        }, GetMobValue: state => (QuestId, ParameterName) => {
            const qstate = state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === QuestId);

            if (!qstate) {
                throw new Error("No Such Quest")
            }
            return qstate.MobParameters[ParameterName];
        },
        GetQuestValue: state =>
            /**
             *
             * @param {string} QuestId The Unique Quest Name
             * @param {string} ParameterName The name of the variable
             * @returns {*}
             */
                (QuestId, ParameterName) => {
                const qstate = state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === QuestId);

                if (!qstate) {
                    throw new Error("No Such Quest")
                }
                return qstate.QuestParameters[ParameterName];
            },
        GetQuestSection: state =>
            (QuestId) => {
                const qstate = state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === QuestId);

                if (!qstate) {
                    throw new Error("No Such Quest")
                }
                return qstate.QuestSection;
            }, GetQuestCompleted: state => (QuestId) => {
            return state.PlayerSave.FinishedQuestStates.find(a => a.QuestId === QuestId);


        },
        GetQuestCreated: state => (QuestId) => {
            return state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === QuestId) ||
                state.PlayerSave.FinishedQuestStates.find(a => a.QuestId === QuestId) ||
                state.PlayerSave.FailedQuestStates.find(a => a.QuestId === QuestId);
        },
        GetDefaultQuestValue: state => (ParameterName) => {
            const qstate = state.PlayerSave.ActiveQuestStates.find(a => a.QuestId === "Default");

            if (!qstate) {
                throw new Error("No Such Quest")
            }
            return qstate.QuestParameters[ParameterName];
        },
    }

})

