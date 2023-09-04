export default class Statement {
    constructor(parsedLine) {
        const {Line, Depth} = parsedLine
        this.Line = Line;
        this.Depth = Depth;

    }

    ConvertToJavascript() {

        return "//{} coming " + this.Line
    }
}
