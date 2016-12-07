import MdlDialogService from 'aurelia-mdl-dialog';
import {Dialog} from 'app/dialog/dialog';

export class App {

    static inject() {
        return [MdlDialogService];
    }

    constructor(mdlDialogService) {
        this._mdlDialogService = mdlDialogService;
        this.dialogTitle = "";
    }

    openDialog() {
        this._mdlDialogService.open({viewModel: Dialog, model: {title: this.dialogTitle}})
            .then(dialogResult => {
                // TODO:
            })
            .catch(reason => {
                // TODO:
            });
    }
}