import TextBox from "@/game/BaseClasses/TextBox";
import {EndQuest, StartQuest} from "@/data/storeHelper";

export class HelloTextBox extends TextBox {
    async Default() {
        await this.Start('Hello')
        await this.Next("I\'ve been waiting for you")
        StartQuest("Hello", this.scene)

    }

    async Hello() {
        await this.Start('We have to launch all zigs')
        await this.Next("HA HA HA HA")
        EndQuest("Hello", this.scene)

    }

    ShowEffect() {
        super.ShowEffect();
    }

}
