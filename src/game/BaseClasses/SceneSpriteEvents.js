import Xray from "@/game/BaseClasses/Xray";

export default class SceneSpriteEvents {
    constructor() {

    }

    /**
     *  Triggers When a quest is started
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Quest Name
     */
    Started(Scene, Sprite, Payload) {
    }

    /**
     *  Triggers When a quest is Finished
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Quest Name
     */
    Finished(Scene, Sprite, Payload) {
    }

    /**
     *  Triggers When a mouse moves across this Sprite
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Pointer
     */
    PointerMove(Scene, Sprite, Payload) {

    }

    /**
     *  Triggers When a quest is Fails
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Quest Name
     */
    Failed(Scene, Sprite, Payload) {
    }

    /**
     *  Triggers When a mouse double clicks this Sprite
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Pointer
     */
    PointerDoubleClick(Scene, Sprite, Payload) {


    }

    /**
     *  Triggers When a mouse mouses up against this sprite (click)
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Pointer
     */
    PointerUp(Scene, Sprite, Payload) {


    }

    /**
     *  Triggers When a mouse leaves this Sprite
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Pointer
     */
    PointerOut(Scene, Sprite, Payload) {
    }

    /**
     *  Triggers When a scene is created
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload
     */
    SceneCreated(Scene, Sprite, Payload) {


        this.cursorKeys = Scene.input.keyboard.createCursorKeys();
        this.lastClick = 0

    }

    /**
     *  Triggers When a scene finishes
     * @param Scene The Scene that Triggered the Event
     * @param Sprite The Sprite that Triggered the Event
     * @param Payload The Pointer
     */
    SceneFinished(Scene, Sprite, Payload) {


    }


}


export const SceneEvents = class SceneEvents {
    /**
     *  Triggers When a mouse mouses up against this Sprite (click)
     * @param Scene The Scene that Triggered the Event

     * @param payload The Pointer
     */
    PointerUp(Scene, payload) {
    }

    /**
     *  Triggers When a mouse outside this Sprite after being over
     * @param Scene The Scene that Triggered the Event

     * @param payload The Pointer
     */
    PointerOut(Scene, payload) {
    }

    /**
     * Triggers When a mouse is over this Sprite
     * @param Scene The Scene that Triggered the Event

     * @param payload The Pointer
     */
    PointerOver(Scene, payload) {
    }

    /**
     *   Triggers When a mouse is over across this Sprite
     * @param Scene The Scene that Triggered the Event

     * @param payload The Pointer
     */
    PointerMove(Scene, payload) {
    }

    /**
     *  Triggers When a scene finishes
     * @param Scene The Scene that Triggered the Event

     * @param payload
     */
    SceneCreated(Scene, payload) {

    }

    /**
     *  Triggers When a scene pauses
     * @param Scene The Scene that Triggered the Event

     * @param payload
     */
    ScenePause(Scene, payload) {

    }

    /**
     *  Triggers When a scene boots
     * @param Scene The Scene that Triggered the Event

     * @param payload
     */
    SceneBoot(Scene, payload) {

    }

    /**
     *  Triggers When a scene resumes
     * @param Scene The Scene that Triggered the Event

     * @param payload
     */
    SceneResume(Scene, payload) {

    }

    /**
     *  Triggers When a scene destroys
     * @param Scene The Scene that Triggered the Event

     * @param payload
     */
    SceneDestroy(Scene, payload) {

    }

    /**
     *  Triggers When a scene finishes. Make sure to call super.SceneFinished if you override as garbage collection haappens.
     * @param Scene The Scene that Triggered the Event

     * @param payload
     */
    SceneFinished(Scene, payload) {
        Scene.TextBoxes.forEach((a) => {
            a.text_box = undefined
            a.Name = undefined
            a.Item = undefined
        });
        Scene.SpriteList.forEach((a) => {
            Object.keys(a).forEach(b => {
                a[b] = undefined;
            })
        });
        Scene.TextBoxes.splice(0,Scene.TextBoxes.length);
        Scene.SpriteList.splice(0,Scene.SpriteList.length)
    }

    //SomeCustomEvent

}
