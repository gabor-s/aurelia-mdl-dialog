import {BindingEngine} from 'aurelia-framework';
import MdlDialogService from 'aurelia-mdl-dialog';
import {InnerDialog} from './inner-dialog/inner-dialog';

export class Dialog {

    static inject() {
        return [BindingEngine, MdlDialogService, Promise];
    }

    constructor(bindingEngine, mdlDialogService, controllerPromise) {
        this._mdlDialogService = mdlDialogService;
        this._controllerPromise = controllerPromise;
        this.title = "Untitled dialog";
        this.availableItems = ['Aurelia', 'Material Design Lite', 'Dialog'];
        this.selectedItems = [];
        this.textFromInnerDialog = '';
        this._propertyObserverSubscription = bindingEngine.propertyObserver(this, 'textFromInnerDialog')
            .subscribe( (newValue, oldValue) => {
                //this.inputForInnerDialogText.className+=' is-dirty';
                //this.inputForInnerDialogText.MaterialTextfield.checkDirty();
            });
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
                this.textFromInnerDialog = text;
                //this.inputForInnerDialogText.className+=' is-dirty';
                setTimeout(() => {
                    this.inputForInnerDialogText.MaterialTextfield.checkDirty();
                }, 25);
            })
            .catch(reason => {
                // TODO:
            });
    }

    close() {
        this._controllerPromise
            .then(controller => {
                this._propertyObserverSubscription.dispose();
                controller.close(JSON.stringify({
                    selectedItems: this.selectedItems,
                    textFromInnerDialog: this.textFromInnerDialog
                }));
            });
    }
}