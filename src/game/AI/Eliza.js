const Eliza = require('eliza-as-promised');

eliza = new Eliza();


module.exports = {
    Eliza: eliza, Talk: async (userinput) => {


        const response = await eliza.getResponse(userinput)

        let final_reply = response.final;
        let final = false

        if (final_reply) {
            final_reply = true;
        } else {
            final_reply = response.reply

        }

        return { Final: final,Reply:final_reply}
    }
}

