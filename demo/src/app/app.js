import MdlDialogService from 'aurelia-mdl-dialog';
import {Dialog} from './dialog/dialog';
import {default as appJsSource} from '!!raw-loader!./app.js';
import {default as appHtmlSource} from '!!raw-loader!./app.html';
import {default as dialogJsSource} from '!!raw-loader!./dialog/dialog.js';
import {default as dialogHtmlSource} from '!!raw-loader!./dialog/dialog.html';
import {default as dialogCssSource} from '!!raw-loader!./dialog/dialog.css';
import {default as innerDialogJsSource} from '!!raw-loader!./dialog/inner-dialog/inner-dialog.js';
import {default as innerDialogHtmlSource} from '!!raw-loader!./dialog/inner-dialog/inner-dialog.html';
import {default as innerDialogCssSource} from '!!raw-loader!./dialog/inner-dialog/inner-dialog.css';

export class App {

    static inject() {
        return [MdlDialogService];
    }

    constructor(mdlDialogService) {
        this._mdlDialogService = mdlDialogService;
        this.dialogTitle = '';
        this.modal = true;
        this.result = {
            textFromInnerDialog: '',
            selectedItems: []
        };
        this.sources = {
            app: {
                es2015: appJsSource,
                html: appHtmlSource
            },
            dialog: {
                es2015: dialogJsSource,
                html: dialogHtmlSource,
                css: dialogCssSource
            },
            innerDialog: {
                es2015: innerDialogJsSource,
                html: innerDialogHtmlSource,
                css: innerDialogCssSource
            }
        };
    }

    showDialog() {
        this._mdlDialogService.show({
            viewModel: Dialog,
            cssClass: 'dialog',
            nonModal: !this.modal,
            model: {
                title: this.dialogTitle,
                textFromInnerDialog: this.result.textFromInnerDialog,
                selectedItems: this.result.selectedItems
            }
        })
            .then(dialogResult => {
                this.result = JSON.parse(dialogResult);
                this.textFieldForInnerDialogText.MaterialTextfield.change(this.result.textFromInnerDialog);
                this.textFieldForSelectedItems.MaterialTextfield.change(this.result.selectedItems.join());
            });
    }
}