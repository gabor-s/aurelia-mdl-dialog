import MdlDialogService from 'aurelia-mdl-dialog';

export class App {

    static inject() {
        return [MdlDialogService];
    }

    constructor(mdlDialogService) {
        this._mdlDialogService = mdlDialogService;
    }

    openDialog() {
        this.mdlDialogService.open({viewModel: Dialog1, model: {title: this.dialog1Title}})
            .then(dialogResult => {
                console.log('dialog result is '+dialogResult);
            })
            .catch(reason => {
                console.log('rejection reason in dashboard.js is '+reason);
            });
        console.log('waiting for dialog closing');
    }
}