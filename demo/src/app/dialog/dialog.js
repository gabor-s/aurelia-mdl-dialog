import MdlDialogService from 'aurelia-mdl-dialog';
import {InnerDialog} from './inner-dialog/inner-dialog';

export class Dialog {

    static inject() {
        return [MdlDialogService, Promise];
    }

    constructor(mdlDialogService, controllerPromise) {
        this._mdlDialogService = mdlDialogService;
        this._controllerPromise = controllerPromise;
        this.title = "Untitled dialog";
        this.availableItems = ['Aurelia', 'Material Design Lite', 'Dialog'];
        this.selectedItems = [];
        this.textFromInnerDialog = '';
    }

    activate(model) {
        this.title = model.title || this.title;
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
                // https://github.com/google/material-design-lite/issues/903
                // https://github.com/google/material-design-lite/issues/4089
                this.textFromInnerDialog = text;
                this.inputForInnerDialogText.MaterialTextfield.change(this.textFromInnerDialog);
            })
            .catch(reason => {
                // TODO:
            });
    }

    close() {
        this._controllerPromise
            .then(controller => {
                controller.close(JSON.stringify({
                    selectedItems: this.selectedItems,
                    textFromInnerDialog: this.textFromInnerDialog
                }));
            });
    }
}