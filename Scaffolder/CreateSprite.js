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
        readline.close();
        return;
    }

        readline.question(`What is the sprite name:`, sprite => {
            let sprite_def_folder = path.join(scenePath,  "sprites", sprite);
            let sprite_event_folder = path.join(sprite_def_folder,"events");
            let preload_file_path = path.join(scenePath,  `Preload${scene}.js`);
            let scene_file_path = path.join(scenePath,  `${scene}.js`);
            let sprite_def_file = path.join(sprite_def_folder,  sprite + ".js");
            let sprite_events_path = path.join(sprite_def_folder, sprite + "_events.js");
            let sprite_default_event = path.join(sprite_event_folder,sprite + ".js");

            if(fs.existsSync(sprite_def_file)){
                console.log("Sprite exists");
                readline.close();
                return;
            }

            fs.mkdirSync(sprite_event_folder,{recursive:true})



            fs.writeFileSync(sprite_def_file, ` 
            
       
let paths = [ ]
export const event_file = require('./${sprite}_events.js');
 
export default paths
export let Items = () => paths.map(a => {
    return {Name: a[0], Id: a[2]}
});
export const Name = "${sprite}"
export const Id = 22;
export const GroupId = ""
export const Visible = true
export const X = 0;
export const Y = 0; 
export const Interactive= true 
export const Alpha = 1;
export let Scale = 1;
 
            

`, 'utf-8')

            fs.writeFileSync(sprite_default_event,` 
            import SceneSpriteEvents from "@/game/BaseClasses/SceneSpriteEvents";

   export const exportClass = class _${sprite}DefaultSceneEvents extends  SceneSpriteEvents{

    }
        export default exportClass

            
`,'utf-8')

            fs.writeFileSync(sprite_events_path,` 
      import  DefaultSceneEvents from './events/${sprite}'
 
          export const Default   = DefaultSceneEvents
   


            
`,'utf-8')

            const preloadFile = fs.readFileSync(preload_file_path,'utf-8');
            let newPreload = ModifySceneFile(preloadFile, sprite);
            fs.writeFileSync(preload_file_path,newPreload,'utf-8')


            const scene_file_data = fs.readFileSync(scene_file_path,'utf-8');
            let newScene = ModifySceneFile(scene_file_data, sprite);
            fs.writeFileSync(scene_file_path,newScene,'utf-8')


            readline.close();
        });

});


function ModifySceneFile(preloadFile, sprite) {
    const BeforeArrayIndex = preloadFile.indexOf('const SpriteNames')
    let AfterIndex = preloadFile.slice(BeforeArrayIndex);
    let BeforeIndex = preloadFile.slice(0, BeforeArrayIndex);
    let importStatement = `\n \n             const _${sprite} = require( './sprites/${sprite}/${sprite}') \n\n`;
    let arrayStatement = `, _${sprite}`;
    let newPreload = BeforeIndex + importStatement + AfterIndex;
    const EndOfArrayIndex = newPreload.indexOf("]", preloadFile.indexOf('const SpriteNames'));
    return newPreload.slice(0, EndOfArrayIndex) + arrayStatement + newPreload.slice(EndOfArrayIndex);
}
