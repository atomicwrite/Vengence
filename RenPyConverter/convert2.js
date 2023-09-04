module.exports= class Convert2 {
    constructor(lines) {
        this.lines = lines;
        this.index = 0;
        this.Depth = 0;
    }

    CountWhiteSpace(item) {

        return item.length - item.trimStart().length

    }

    DepthLines = []

    ParseLine() {
        if (this.index >= this.lines.length) return null;
        const line = this.lines[this.index++]

        return {Line: line, Depth: this.CountWhiteSpace(line) / 2}
        if (line.trim().startsWith("label")) {
            this.Depth = 0;
        }
        if (line.trim().endsWith(":")) {
            this.Depth++;
            this.DepthLines.push(line)
            return {Line: line, Depth: this.Depth}
        }
        if (line.trim().toLowerCase().startsWith("return")) {
            this.Depth--;
            return {Line: line, Depth: this.Depth}
        }


        if (this.index > 0) {
            const countWhiteSpace = this.CountWhiteSpace(line)
            let line1 = this.lines[this.index - 2];
            if (line1.indexOf(':') < 0) {
                let previousWhiteSpace = this.CountWhiteSpace(line1)
                console.log(`Previous: ${previousWhiteSpace} . ${countWhiteSpace}`)
                if (previousWhiteSpace > countWhiteSpace) {

                    this.Depth--;
                }
            }
        }

        return {Line: line, Depth: this.Depth}

    }
}
