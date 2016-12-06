import MdlDialogService from 'aurelia-mdl-dialog';
import {Dialog} from 'app/all-in-one/dialog/dialog';

export class AllInOneCustomElement {

    static inject() {
        return [MdlDialogService];
    }

    constructor(mdlDialogService, controllerPromise) {
        this._mdlDialogService = mdlDialogService;
        // this._controllerPromise = controllerPromise;
        this.dialogTitle = "";
    }

    activate(model) {
        this.dialogTitle = model.title;
    }

    openDialog() {
        debugger;
        this._mdlDialogService.open({viewModel: Dialog, model: {title: this.dialogTitle}})
            .then(dialogResult => {
                // TODO:
            })
            .catch(reason => {
                // TODO:
            });
    }
}