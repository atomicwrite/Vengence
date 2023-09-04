const fs = require('fs')
const path = require('path')

let scenesPath = path.join(__dirname, '../', 'src', 'game', 'scenes');
console.log(scenesPath)


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


function CreateSprite(scenePath, sprite_name, scene) {
    let sprite_def_folder = path.join(scenePath, "sprites", sprite_name);

    let sprite_def_file = path.join(sprite_def_folder, sprite_name + ".js");
    let sprite_image_folder = path.join(sprite_def_folder, 'images');

    if (!fs.existsSync(sprite_def_file)) {
        console.log("Sprite doesn't exists");
        readline.close();
        return;
    }
    if (!fs.existsSync(sprite_image_folder)) {
        fs.mkdirSync(sprite_image_folder);
    }

    function AddImages(image) {
        if (!fs.existsSync(image)) {
            console.log("No such path")
            readline.close();
            return;
        }

        let files;
        if (fs.lstatSync(image).isDirectory()) {
            files = fs.readdirSync(image).map(a => path.join(image, a))

        } else {
            files = [image];
        }
        for (let file_path of files) {

            const pathData = path.parse(file_path);
            const name = pathData.name.replace(/[^a-zA-Z0-9_]/g, '_');

            let new_image_path = path.join(sprite_image_folder, name + ".png");
            if (fs.existsSync(new_image_path)) {
                console.log("AddImages Sprite exists " + new_image_path)

                continue;
            }
            fs.copyFileSync(file_path, new_image_path)
            ModifySpriteFrame(sprite_def_file, name, scene, sprite_name)
        }
    }


    readline.question(`What is the image path or image folder path :`, image => {
        AddImages(image);

        readline.close();
    })
}



readline.question(`What is the scene name:`, scene => {
    let scenePath = path.join(scenesPath, scene);

    if (!fs.existsSync(scenePath)) {
        console.log("No such scene");
        return;
    }

    readline.question(`What is the sprite name:`, sprite => {
        CreateSprite(scenePath, sprite, scene);

    });

});


function ModifySpriteFrame(spriteFile, name, scene, sprite_name) {
    let importStatement = `import  _${name} from './images/${name}.png'
 `
    let frame = ` ['${scene}_${sprite_name}_${name}',_${name},0] `
    const sprite_file_data = fs.readFileSync(spriteFile, 'utf-8');
    const pathfinder = sprite_file_data.indexOf('let paths')
    let delimiter = ",";

    const exportStatement = sprite_file_data.indexOf("export", pathfinder);
    const StartOfArrayIndex = sprite_file_data.indexOf("[", pathfinder);
    let SecondEndOfArrayIndex = -1;
    for (let i = exportStatement; i >= 0; i--) {
        if (sprite_file_data[i] === ']') {
            SecondEndOfArrayIndex = i;
            break;
        }
    }
    if (SecondEndOfArrayIndex === -1) {
        console.log("Malformed file");
        return;
    }
    const existing = sprite_file_data.slice(StartOfArrayIndex + 1, SecondEndOfArrayIndex);
    if (existing.trim().length === 0) {
        delimiter = ""
          importStatement = `import  _${sprite_name} from './images/${name}.png'
 `
          frame = ` ['${scene}_${sprite_name}',_${sprite_name},0] `
    }
    if (sprite_file_data.indexOf(`import  _${name} `) >= 0) {
        console.log("Modify Sprite exists " + name)
        return;
    }





    let before = sprite_file_data.slice(0, SecondEndOfArrayIndex);
    let after = sprite_file_data.slice(SecondEndOfArrayIndex);
    const newSpritefont = importStatement + before + delimiter + frame + after;
    fs.writeFileSync(spriteFile, newSpritefont, 'utf-8');
}
