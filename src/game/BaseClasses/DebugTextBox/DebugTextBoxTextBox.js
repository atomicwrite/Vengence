import TextBox from "@/game/BaseClasses/TextBox";

function removeFirst(str) {
    let i = 0;
   return str.split('_').filter(a => {
        return i++ !== 0;
    }).join("_");
}

export class DebugTextBoxTextBox extends TextBox {

   async Default(Scene, ClickCount, Payload) {
      //  this.ClearText()
       this.AppendPage("Sprite: " + removeFirst(Payload.sprite.texture.key))
       this.TypeNextPage();
    }

    async Default_Unique(Scene, Payload) {

        this.SetText("Sprite: " + removeFirst(Payload.sprite.texture.key));
    }
}
