
export class Creates {
    /**
     * @param {*} Sprite_Definition
     */
    createSprite(Sprite_Definition) {
        let {Name, Id, X, Y, Scale, Alpha, Visible, Interactive, MouseEvents, Items} = Sprite_Definition;

        let sprite = this.add.sprite(X, Y, this.SceneName + "_" + Name);

        for (const groupElement of Sprite_Definition.default) {
            let key = groupElement[0];
            const prefix = key.indexOf('_');
            if (prefix >= 0) {
                key = key.slice(prefix + 1);
            }

            const animation = this.anims.create({
                key: key,
                frames: [
                    {key: groupElement[0]}
                ],
                frameRate: 1,
                repeat: 0
            });


        }
        sprite.visible = Visible
        if (Interactive)
            sprite.setInteractive();
        sprite.scale = Scale;
        sprite.alpha = Alpha
        sprite.setOrigin(0, 0);
        //    sprite.setOriginFromFrame()

        sprite.width = Sprite_Definition.Width;
        sprite.height = Sprite_Definition.Height;
        const EventsData = this.SpriteLogic(Sprite_Definition.event_file);
        let sprite_def = {sprite, item: Sprite_Definition, Name, EventsData};
        let lastClick = 0;
        sprite.on('pointerout', (pointer) => {
            this.DebugText('PointerOut', pointer, sprite)
            this.MouseEvents('PointerOut', sprite, pointer, EventsData)
        })
        sprite.on('pointerover', (pointer) => {
            this.DebugText('PointerOver', pointer, sprite)
            this.MouseEvents('PointerOver', sprite, pointer, EventsData)
        });
        sprite.on('pointerup', (pointer) => {
            let clickTime = +(new Date());
            let lastClickTime = lastClick;
            lastClick = clickTime;
            let eventName = 'PointerDoubleClick';
            if (clickTime - lastClickTime > 500) {

                eventName = 'PointerUp'
            }
            this.MouseEvents(eventName, sprite, pointer, EventsData)


            this.DebugText(eventName, pointer, sprite)
        });


        this.SpriteList.push(sprite_def);
        return sprite;
    }

    DebugText(eventname, point, sprite) {
        if (window.debug_sprites)
            this.DebugTextBox.setText(sprite.texture.key)
        //this.triggerTextBox("DebugTextBox", "Default", {point, sprite})

    }

    createSpriteSheet(item, SceneName = '') {
        //  this.load.spritesheet(item.Name, item.default[0][1], { frameWidth: item.FrameWidth, frameHeight: item.FrameHeight });
        //    const sprite = this.add.sprite(item.X, item.Y2)

    }

    SpriteLogic(event_file) {
        const eventData = {};

        let indexes = Object.keys(event_file);
        indexes.forEach(a => {
            eventData[a] = new event_file[a]();
        });
        return eventData

    }


    /**
     * @param {*} Textbox_Definition
     */
    createTextBox(Textbox_Definition) {

        let {Name, Id, X, Y, FontFamily, TextClass, Interactive, EventsData} = Textbox_Definition;

        const text_box = new TextClass(this, Textbox_Definition);

        this.TextBoxes.push({text_box: text_box, Name: Name, Item: Textbox_Definition})
    }

}
