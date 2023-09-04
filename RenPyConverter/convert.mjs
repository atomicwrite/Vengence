import parseStatement from "./parseStatement.mjs";
import Statement from "./statement.mjs";
import {StatementBlock} from "./statementBlock.mjs";
import {parse} from 'csv-parse/sync';

;

import Convert2 from "./convert2.js";

import fs from "fs";

const data = fs.readFileSync('./test.yaml', 'utf-8')
const lines = data.split(/\r?\n/).filter(a => a.trim().length > 0);


let convert = new Convert2(lines);
let parsed_lines = [];
let line;
while (line = convert.ParseLine()) {


    parsed_lines.push(line);
}

//console.log(parsed_lines.filter(a => a.Depth === 0 || a.Depth === 1))


export class LabelStatement extends StatementBlock {
    GetLabelName() {
        return this.Line.split(/\s+/).at(1).split(":").at(0)
    }

    ConvertToJavascript() {
        let getLabelName = this.GetLabelName();
        if (getLabelName.indexOf('(') <= 0) {
            getLabelName += '()'
        }
        return `
function ${getLabelName}{
    ${this.Statements.map(a => a.ConvertToJavascript()).join("\n")}
}`.trim();
    }
}

export class MenuStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        return `new Menu([${this.Statements.map(a => a.ConvertToJavascript()).join(',')}])`
    }
}

export class ElseStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        return "else { " + statements + "}"
    }
}

export class IfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();

        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        return "if(" + this.Line.slice(this.Line.indexOf('if') + 2).replace(":", "") + ") { " + statements + "}"
    }
}

export class ReturnStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        return "return"
    }
}

export class ElIfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();

        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        return "else if(" + this.Line.slice(this.Line.indexOf('if') + 2).replace(":", "") + ") { " + statements + "}"
    }
}

export class QuestStatement extends Statement {

    ConvertToJavascript() {
        super.ConvertToJavascript();
        if (this.Line.match(/start\(\)/)) {
            const quest = this.Line.trim().split('.').at(1)
            return `StartQuest(convo.Scene,"${quest}");`
        }
    }
}

export class AvatarStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const trim = this.Line.trim().toLowerCase();
        if (trim.startsWith("$unlock_replay")) {
            return "UnlockReplay" + trim.slice(trim.indexOf('('))
        }
    }
}
export class PauseStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const items = this.Line.trim().split(' ');
        if(items.length === 2){
            return `convo.Pause(${items[1]})`
        }
        return "// coming soon " + this.Line;

    }
}
export class JumpStatement extends Statement {

}

export class TextStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        try {
            const parser = parse(this.Line.trim(), {
                    record_delimiter: ' ', escape: '\\'
                }
            ).map(a => a[0]);
            if (parser.length === 1) {
                return `convo.Say('Narrator','${parser[0]}');`
            }
            if (parser.length === 2) {
                return `convo.Say('${parser[0]}','${parser[1]}');`
            }
            if (parser.length === 3) {
                return `
                 convo.Pose('${parser[0]}','${parser[1]}');` + `
                 convo.Say('${parser[0]}','${parser[2]}');`
            }
            return this.Line.trim();

        } catch (e) {
            console.log(this.Line.trim())
        }
    }
}

export class ExtendStatement extends Statement {

}

export class ShowStatement extends Statement {
    ConvertToJavascript() {
        const base = super.ConvertToJavascript();
        let parser;
        try {
            parser = parse(this.Line.trim(), {
                record_delimiter: ' '
            }).map(a => a[0]);
        } catch (e) {
            //  throw e
            if (this.Line.indexOf('"') < 0) {
                parser = this.Line.trim().split(' ');
            } else {
                throw e;
            }
        }
        if (parser.length < 2) {
            return ""; //malformed
        }
        if (parser.length === 3) {
            this.Sprite = parser[1];
            this.Frame = parser[2];
            return `convo.Pose('${this.Sprite}','${this.Frame}');`
        } else if (parser.length === 4) {
            this.Sprite = "";
            this.Frame = parser[2];
            this.Effect = parser[3]
            return `convo.Pose('${this.Sprite}','${this.Frame}');`
        } else if (parser.length >4) {
            if(parser[3] === "at" || parser[3] === "with")
            this.Sprite = parser[1];
            this.Frame = parser[2];
            this.Effect = parser[4]
            return `convo.Pose('${this.Sprite}','${this.Frame}');`
        }

        return base;
    }
}

const ast = [];


function parseLabelName(line) {
    return line.split(/\s+/g).at(1).split(":").at(0)

}

export function lowerCase(line) {
    return line.trim().toLowerCase();
}

let i = 0;
while (i < parsed_lines.length) {
    let {j, statement} = parseStatement(parsed_lines, i);
    //console.log(statement)
    i = j
    ast.push(statement)
}

console.log(ast.map(a => a.ConvertToJavascript()).join("\n"))

