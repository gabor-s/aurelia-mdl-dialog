import MdlDialogService from 'aurelia-mdl-dialog';
import {InnerDialog} from './inner-dialog/inner-dialog';

export class Dialog {

    static inject() {
        return [MdlDialogService, Promise];
    }

    constructor(mdlDialogService, dialogControllerPromise) {
        this._mdlDialogService = mdlDialogService;
        this._dialogControllerPromise = dialogControllerPromise;
        this.title = "Untitled dialog";
        this.availableItems = ['Aurelia', 'Material Design Lite', 'Dialog'];
        this.selectedItems = [];
        this.textFromInnerDialog = '';
    }

    activate(model) {
        this.title = model.title || this.title;
        this.textFromInnerDialog = model.textFromInnerDialog;
        this.selectedItems = model.selectedItems;
    }

    showInnerDialog() {
        this._mdlDialogService.show({
            viewModel: InnerDialog,
            cssClass: 'inner-dialog',
            model: {
                text: this.textFromInnerDialog
            }
        })
            .then(text => {
                this.textFromInnerDialog = text;
                // https://github.com/google/material-design-lite/issues/4089
                this.inputForInnerDialogText.MaterialTextfield.change(this.textFromInnerDialog);
            });
    }

    close() {
        this._dialogControllerPromise
            .then(dialogController => {
                dialogController.close(JSON.stringify({
                    selectedItems: this.selectedItems,
                    textFromInnerDialog: this.textFromInnerDialog
                }));
            });
    }
}