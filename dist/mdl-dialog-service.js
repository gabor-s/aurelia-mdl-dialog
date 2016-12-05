'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dialogPolyfill = require('dialog-polyfill');

var _dialogPolyfill2 = _interopRequireDefault(_dialogPolyfill);

var _aureliaFramework = require('aurelia-framework');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MdlDialogService = function () {
    _createClass(MdlDialogService, null, [{
        key: 'inject',
        value: function inject() {
            return [_dialogPolyfill2.default, _aureliaFramework.Container, _aureliaFramework.CompositionEngine];
        }
    }]);

    function MdlDialogService(dialogPolyfill, container, compositionEngine) {
        _classCallCheck(this, MdlDialogService);

        this._dialogPolyfill = dialogPolyfill;
        this._container = container;
        this._compositionEngine = compositionEngine;
    }

    _createClass(MdlDialogService, [{
        key: 'open',
        value: function open(configuration) {
            var _this = this;

            if (typeof configuration.viewModel !== 'function' && typeof configuration.viewModel !== 'string') {
                throw new Error('viewModel is a mandatory configuration property and it has to be a function or a string');
            }

            if (typeof configuration.viewModel === 'function') {
                configuration.viewModel = _aureliaFramework.Origin.get(configuration.viewModel).moduleId;
            }

            var viewSlot = new _aureliaFramework.ViewSlot(document.createElement('mdl-dialog'), true);
            var addDialogToDom = function addDialogToDom() {
                document.body.insertBefore(viewSlot.anchor, document.body.firstChild);
                viewSlot.attached();
            };
            var removeDialogFromDom = function removeDialogFromDom() {
                if (viewSlot.isAttached) {
                    document.body.removeChild(viewSlot.anchor);
                    viewSlot.detached();
                }
            };

            var dialogControllerPromise = void 0,
                resolveDialogController = void 0,
                rejectDialogController = void 0;
            dialogControllerPromise = new Promise(function (resolve, reject) {
                resolveDialogController = resolve;
                rejectDialogController = reject;
            });

            var childContainer = this._container.createChild();
            childContainer.registerInstance(Promise, dialogControllerPromise);

            var compositionContext = {
                container: this._container,
                childContainer: childContainer,
                viewModel: new MdlDialogViewModel(configuration),
                viewSlot: viewSlot
            };

            return new Promise(function (resolveDialogResult, rejectDialogResult) {
                _this._compositionEngine.compose(compositionContext).then(function (controller) {
                    addDialogToDom();
                    var mdlDialog = controller.viewModel.dialog;
                    mdlDialog.addEventListener('close', function dialogCloseListener() {
                        this.removeEventListener('close', dialogCloseListener);
                        removeDialogFromDom();
                        resolveDialogResult(this.returnValue);
                    });
                    if (!mdlDialog.showModal) {
                        _this._dialogPolyfill.registerDialog(mdlDialog);
                    }
                    configuration.nonModal ? mdlDialog.show() : mdlDialog.showModal();
                    resolveDialogController({
                        close: function close(result) {
                            mdlDialog.close(result);
                        }
                    });
                }).catch(function (reason) {
                    removeDialogFromDom();
                    rejectDialogController(reason);
                    rejectDialogResult(reason);
                });
            });
        }
    }]);

    return MdlDialogService;
}();

exports.default = MdlDialogService;

var MdlDialogViewModel = function () {
    function MdlDialogViewModel(configuration) {
        _classCallCheck(this, MdlDialogViewModel);

        this.configuration = configuration; // used in the view
    }

    _createClass(MdlDialogViewModel, [{
        key: 'getViewStrategy',
        value: function getViewStrategy() {
            return new _aureliaFramework.InlineViewStrategy('\n            <template>\n                <require from="jspm_packages/github/GoogleChrome/dialog-polyfill@0.4.4/dialog-polyfill.css"></require>\n            \n                <dialog mdl="dialog" ref="dialog" class.one-time="configuration.cssClass">\n                    <compose view-model.bind="configuration.viewModel" model.bind="configuration.model" containerless></compose>\n                </dialog>\n            </template>\n        ');
        }
    }]);

    return MdlDialogViewModel;
}();