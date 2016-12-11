import MdlDialogService from 'aurelia-mdl-dialog';

export class InnerDialog {

    static inject() {
        return [MdlDialogService, Promise];
    }

    constructor(mdlDialogService, controllerPromise) {
        this._mdlDialogService = mdlDialogService;
        this._controllerPromise = controllerPromise;
    }

    activate(model) {
        this.text = model.text;
    }

    close() {
        this._controllerPromise
            .then(controller => {
                controller.close(this.text);
            });
    }
}