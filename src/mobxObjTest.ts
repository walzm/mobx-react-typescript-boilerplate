import { observable, autorun } from "mobx";

class X {
    @observable feld: any;
    run(v) {
        if (this.feld && this.feld.v === v) {
            return;
        }
        this.feld = {};
        this.feld = {};
    }
}

let x = new X();
autorun(() => {
    console.log(x.feld);
});
x.run("a")