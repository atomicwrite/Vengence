export function VanishTo(Scene, sprite,x = 200,y=0,duration=200) {
    if(sprite.visible === false) return;
    sprite.x -=x
    sprite.y = -y;

    sprite.visible = true;
    const tween = {
        targets: sprite,
        props: {
            x: {value: sprite.x +x, duration: duration, ease: 'Linear'},
            y: {value: sprite.y +y, duration: duration, ease: 'Linear'},
            alpha: {value:1,duration:1000}
        }
    }

    return new Promise(((resolve, reject) => {


        const timeline = Scene.tweens.timeline({})

        timeline.add(tween);


        timeline.on('complete', () => {
            resolve(sprite)
        });
        timeline.play()

    }))
}

export function AppearFrom(Scene, sprite,x = 200,y=200,duration=200) {
    if(sprite.visible === true) return;
    sprite.x -=x
    sprite.y = -y;
    sprite.alpha = 0
    sprite.visible = true;
    const tween = {
        targets: sprite,
        props: {
            x: {value: sprite.x +x, duration: duration, ease: 'Linear'},
            y: {value: sprite.y +y, duration: duration, ease: 'Linear'},
            alpha: {value:1,duration:1000}
        }
    }

    return new Promise(((resolve, reject) => {


        const timeline = Scene.tweens.timeline({})

        timeline.add(tween);


        timeline.on('complete', () => {
            resolve(sprite)
        });
        timeline.play()

    }))
}
