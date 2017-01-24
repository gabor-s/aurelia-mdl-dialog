import dialogPolyfill from 'dialog-polyfill';
import {Container, ViewSlot, CompositionEngine, Origin, InlineViewStrategy} from 'aurelia-framework';

export default class MdlDialogService {

    static inject() {
        return [dialogPolyfill, Container, CompositionEngine];
    }

    constructor(dialogPolyfill, container, compositionEngine) {
        this._dialogPolyfill = dialogPolyfill;
        this._container = container;
        this._compositionEngine = compositionEngine;
    }

    show(configuration) {
        if (typeof configuration.viewModel !== 'function' && typeof configuration.viewModel !== 'string') {
            throw new Error('viewModel is a mandatory configuration property and it has to be a function or a string');
        }

        if (typeof configuration.viewModel === 'function') {
            configuration.viewModel = Origin.get(configuration.viewModel).moduleId;
        }

        let viewSlot = new ViewSlot(document.createElement('mdl-dialog'), true);
        let addDialogToDom = () => {
            document.body.insertBefore(viewSlot.anchor, document.body.firstChild);
            viewSlot.attached();
        };
        let removeDialogFromDom = () => {
            if (viewSlot.isAttached) {
                document.body.removeChild(viewSlot.anchor);
                viewSlot.detached();
            }
        };

        let dialogControllerPromise, resolveDialogController, rejectDialogController;
        dialogControllerPromise = new Promise((resolve, reject) => {
            resolveDialogController = resolve;
            rejectDialogController = reject;
        });

        let childContainer = this._container.createChild();
        childContainer.registerInstance(Promise, dialogControllerPromise);

        let compositionContext = {
            container: this._container,
            childContainer: childContainer,
            viewModel: new MdlDialogViewModel(configuration),
            viewSlot: viewSlot
        };

        return new Promise((resolveDialogResult, rejectDialogResult) => {
            this._compositionEngine.compose(compositionContext)
                .then(controller => {
                    addDialogToDom();
                    let mdlDialog = controller.viewModel.dialog;
                    mdlDialog.addEventListener('close', function dialogCloseListener() {
                        this.removeEventListener('close', dialogCloseListener);
                        removeDialogFromDom();
                        resolveDialogResult(this.returnValue);
                    });
                    if (!mdlDialog.showModal) {
                        this._dialogPolyfill.registerDialog(mdlDialog);
                    }
                    configuration.nonModal ? mdlDialog.show() : mdlDialog.showModal();
                    resolveDialogController({
                        close: function (result) {
                            mdlDialog.close(result);
                        }
                    });
                })
                .catch(reason => {
                    removeDialogFromDom();
                    rejectDialogController(reason);
                    rejectDialogResult(reason);
                });
        });
    }
}

class MdlDialogViewModel {

    constructor(configuration) {
        this.configuration = configuration; // used in the view
    }

    getViewStrategy() {
        return new InlineViewStrategy(`
            <template>
                <require from="dialog-polyfill/dialog-polyfill.css"></require>

                <dialog mdl="dialog" ref="dialog" class.one-time="configuration.cssClass">
                    <compose view-model.bind="configuration.viewModel" model.bind="configuration.model" containerless></compose>
                </dialog>
            </template>
        `);
    }
}