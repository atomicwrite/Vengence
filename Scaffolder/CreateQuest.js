const fs = require('fs')
const path = require('path')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let scenesPath = path.join(__dirname, '../', 'src', 'game', 'scenes');
let _sprite_path = "";
let _sprite = ""
if (process.argv.length === 3) {
    _sprite_path = path.dirname(process.argv[2])
    _sprite = _sprite_path.split(path.sep).at(-1);
    GetQuestInfo(_sprite, _sprite_path);
} else {

    readline.question(`What is the scene name:`, scene => {
        let scenePath = path.join(scenesPath, scene);
        if (!fs.existsSync(scenePath)) {
            console.log("No such scene");
            return;
        }
        readline.question(`What is the sprite name:`, sprite => {
            let spritedir = path.join(scenePath, "sprites", sprite);
            if (!fs.existsSync(spritedir)) {
                console.log("No such sprite");
                return;
            }
            GetQuestInfo(sprite, spritedir);
        });
    });

}



function GetQuestInfo(sprite, spritedir) {
    readline.question(`What is the quest name:`, quest => {

        let events_index_file = path.join(spritedir, sprite + "_events.js");
        let eventsDir = path.join(spritedir, "events");
        if (!fs.existsSync(eventsDir)) {
            fs.mkdirSync(eventsDir, {recursive: true});
        }
        let events_file = path.join(spritedir, "events", quest + ".js");
        let eventsContent = "";
        if (fs.existsSync(events_index_file)) {
            eventsContent = fs.readFileSync(events_index_file, 'utf-8');
        }
        if (!(eventsContent.indexOf('/' + quest) >= 0)) {
            eventsContent += `import  ${quest}SceneEvents from './events/${quest}'
 
          export const ${quest}   = ${quest}SceneEvents`
            fs.writeFileSync(events_index_file, eventsContent, 'utf-8');
        }

        fs.writeFileSync(events_file, `import SceneSpriteEvents from "@/game/BaseClasses/SceneSpriteEvents";

export const exportClass = class _Jocounter${quest}DefaultSceneEvents extends SceneSpriteEvents {

}
export default exportClass
`, 'utf-8')


        readline.close();
    });
}


