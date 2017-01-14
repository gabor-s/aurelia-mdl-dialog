export class InnerDialog {

    static inject() {
        return [Promise];
    }

    constructor(dialogControllerPromise) {
        this._dialogControllerPromise = dialogControllerPromise;
    }

    activate(model) {
        this.text = model.text;
    }

    close() {
        this._dialogControllerPromise
            .then(dialogController => {
                dialogController.close(this.text);
            });
    }
}