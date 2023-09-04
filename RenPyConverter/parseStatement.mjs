import MenuDecision from "./menuDecision.mjs";

import Statement from "./statement.mjs";

import {
    AvatarStatement,
    ElIfStatement,
    ElseStatement, ExtendStatement,
    IfStatement,
    LabelStatement,
    lowerCase,
    MenuStatement, PauseStatement, QuestStatement,
    ReturnStatement, ShowStatement, TextStatement
} from "./convert.mjs";


export default function parseStatement(parsed_lines, i) {

    let parsedLine = parsed_lines[i];
    if (!parsedLine) {
        debugger
    }
    let line = parsedLine.Line;

    const trimmed_line = lowerCase(line);
    if (trimmed_line.startsWith("label")) {

        let conversationFunction = new LabelStatement(parsedLine);
        i = conversationFunction.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: conversationFunction}
    }
    if (trimmed_line.startsWith("menu")) {
        let menuStatement = new MenuStatement(parsedLine);

        i = menuStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuStatement}
    }
    if (trimmed_line.startsWith("elif")) {
        let elIfStatement = new ElIfStatement(parsedLine);

        i = elIfStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: elIfStatement}
    }
    if (trimmed_line.startsWith("if")) {
        let menuStatement = new IfStatement(parsedLine);

        i = menuStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuStatement}
    }
    if (trimmed_line.startsWith("else")) {
        let menuStatement = new ElseStatement(parsedLine);

        i = menuStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuStatement}
    }
    if (trimmed_line.startsWith('"?') || trimmed_line.startsWith('"\\"')) {
        let menuDecision = new MenuDecision(parsedLine);

        i = menuDecision.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuDecision}
    }

    // if (lowerCase(line).startsWith('$quest')) {
    //     let questStatement = new QuestStatement(parsedLine);
    //     return {j: i + 1, statement: questStatement}
    // }
    // if (lowerCase(line).startsWith('jump ')) {
    //     let jumpStatement = new JumpStatement(parsedLine);
    //     return {j: i + 1, statement: jumpStatement}
    // }
    if (trimmed_line.startsWith('return')) {
        let returnStatement = new ReturnStatement(parsedLine);
        return {j: i + 1, statement: returnStatement}
    }
    if (trimmed_line.startsWith('show')) {
        let showStatement = new ShowStatement(parsedLine);
        return {j: i + 1, statement: showStatement}
    }
    if (trimmed_line.startsWith('extend')) {
        let extendStatement = new ExtendStatement(parsedLine);
        return parseStatement(parsed_lines, i + 1)

    }
    if (trimmed_line.startsWith('pause')) {
        let pauseStatement = new PauseStatement(parsedLine);
        return {j: i + 1, statement: pauseStatement}

    }
    if (trimmed_line.startsWith('$quest')) {
        let questStatement = new QuestStatement(parsedLine);
        return {j: i + 1, statement: questStatement}
    }
    if (trimmed_line.startsWith('$')) {
        let avatarStatement = new AvatarStatement(parsedLine);
        return {j: i + 1, statement: avatarStatement}
    }
    return {j: i + 1, statement: new TextStatement(parsedLine)}
}
