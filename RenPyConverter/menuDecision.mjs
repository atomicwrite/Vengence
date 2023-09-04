import {StatementBlock} from "./statementBlock.mjs";

export default class MenuDecision extends StatementBlock {
    static matcher = /"\\"([^\\]+)\\"/;
    static iconer = /image=([^}]+)/;

    GetMenuCondition() {
        const menu_conditions = this.Line.split(/\|/);
        if (menu_conditions.length === 0) {
            return "";
        }
        if (menu_conditions.length === 1) {
            return "";
        }
        let condition = new MenuCondition(menu_conditions.shift());


        for (let menuCondition of menu_conditions) {
            let exec = MenuDecision.matcher.exec(menuCondition);
            if (exec) {
                continue;
            }
            let icon = MenuDecision.iconer.exec(menuCondition)
            if (icon) {
                condition.Icons.push(new MenuDecisionIcon(icon[1]))
            }

        }
        return condition.ToJavaScript();
    }

    GetMenuText() {

        let exec = MenuDecision.matcher.exec(this.Line);
        if (exec) {

            return exec[1]
        }

        return this.Line.split("|").at(-1);
    }

    GetMenuTextAsClassName() {
        return this.GetMenuText().replace(/[^A-Za-z]/g, '').toUpperCase()
    }


    ConvertToJavascript() {
        const block = this.Statements.map(a => a.ConvertToJavascript()).join("\n")
        return `new MenuDecision('${this.GetMenuText()}', () => {${block}})`
    }
}


class MenuDecisionIcon {
    constructor(icon_text) {

    }

}

class MenuCondition {
    constructor(condition_text) {
        this.Conditions = condition_text.split("@")
        this.Icons = []
    }

    ToJavaScript() {
        return "";
    }
}
