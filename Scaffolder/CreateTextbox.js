const fs = require('fs')
const path = require('path')

let scenesPath = path.join(__dirname, '../', 'src', 'game', 'scenes');
console.log(scenesPath)


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question(`What is the scene name:`, scene => {
    let scenePath = path.join(scenesPath, scene);
    if (!fs.existsSync(scenePath)) {
        console.log("No such scene");
        return;
    }

        readline.question(`What is the text box name:`, textbox => {

            let textbox_path = path.join(scenePath,  "textboxes", "index.js");
            let textbox_def_folder = path.join(scenePath,  "textboxes", textbox);
            fs.mkdirSync(textbox_def_folder,{recursive:true})
            let textbox_def_index = path.join(textbox_def_folder, textbox + ".js")
            let textbox_class_index = path.join(textbox_def_folder, textbox + "TextBox.js")
            let textbox_index ="";
            if (fs.existsSync(textbox_path)) {
                textbox_index = fs.readFileSync(textbox_path, 'utf-8');
            }
            if (!(textbox_index.indexOf(  textbox) >= 0)) {
                textbox_index += ` 
                
                export const ${textbox}TextBox = require( "./${textbox}/${textbox}");
                
                
  `
                fs.writeFileSync(textbox_path, textbox_index, 'utf-8');
            }

            fs.writeFileSync(textbox_def_index, `import {${textbox}TextBox} from "./${textbox}TextBox";

    export const Name = "${textbox}"
    export const Id = "1"
export const X = 1022;
export const Y =360;
    export const FontFamily = 'Georgia, "Goudy Bookletter 1911", Times, serif'
    export const Interactive = false;
    export const EventsData = {}
    export const TextClass = ${textbox}TextBox;

`, 'utf-8')

            fs.writeFileSync(textbox_class_index,`import TextBox from "@/game/BaseClasses/TextBox";

 

export class ${textbox}TextBox extends TextBox {

   async Default(Scene, ClickCount, Payload) {
 
    }

    async Default_Unique(Scene, Payload) {
 
    }
}
`,'utf-8')


            readline.close();
        });

});

