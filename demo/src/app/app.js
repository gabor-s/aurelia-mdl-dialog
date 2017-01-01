import MdlDialogService from 'aurelia-mdl-dialog';
import {Dialog} from './dialog/dialog';

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
        this._mdlDialogService.show({
            viewModel: Dialog,
            cssClass: 'dialog',
            nonModal: !this.modal,
            model: {
                title: this.dialogTitle,
                textFromInnerDialog: this.result.textFromInnerDialog
            }
        })
            .then(dialogResult => {
                this.result = JSON.parse(dialogResult);
                this.inputForInnerDialogText.MaterialTextfield.change(this.result.textFromInnerDialog);
            })
            .catch(reason => {
                // TODO:
            });
    }
}