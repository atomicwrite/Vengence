// start an Eliza conversation
const {Eliza, Talk} = require("./Eliza.js");


console.log('>> ' + Eliza.getInitial());


async function TalkToEliza(userinput) {
    const result = await Talk(userinput)
    console.log(result.Reply);
    if (result.Final) {
        process.exit(0);
    }
}

process.stdin.on('readable', async () => {
    let chunk;
    // Use a loop to make sure we read all available data.
    while ((chunk = process.stdin.read()) !== null) {
        const userinput = `${chunk}`;
        await TalkToEliza(userinput);

    }
});
