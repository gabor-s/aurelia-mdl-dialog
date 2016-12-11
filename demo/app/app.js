import MdlDialogService from 'aurelia-mdl-dialog';
import {Dialog} from 'app/dialog/dialog';

export class App {

    static inject() {
        return [MdlDialogService];
    }

    constructor(mdlDialogService) {
        this._mdlDialogService = mdlDialogService;
        this.dialogTitle = "";
        this.modal = true;
        this.result = {};
    }

    showDialog() {
        this._mdlDialogService.open({
            viewModel: Dialog,
            nonModal: !this.modal,
            model: {
                title: this.dialogTitle
            }
        })
            .then(dialogResult => {
                this.result = JSON.stringify(dialogResult);
            })
            .catch(reason => {
                // TODO:
            });
    }
}