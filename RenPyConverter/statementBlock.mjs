import Statement from "./statement.mjs";
import parseStatement from "./parseStatement.mjs";

export class StatementBlock extends Statement {
    constructor(parsedLine) {
        super(parsedLine)
        this.Statements = []

    }

    parseMethodStatements(lines, i) {
        while (lines[i] && lines[i].Depth > this.Depth) {
            let {j, statement} = parseStatement(lines, i);
            this.Statements.push(statement);
            i = j;
        }

        return i
    }
}
