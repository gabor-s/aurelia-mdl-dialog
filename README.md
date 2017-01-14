# aurelia-mdl-dialog
Aurelia wrapper for [Material Design Lite's Dialog](https://getmdl.io/components/#dialog-section) component.

## Live demo
The live demo is ...

A live demo can be found [here]().

## Install

```bash
npm install aurelia-mdl-dialog --save
```

## Usage

This component makes available an ```MdlDialogService``` object which can be used to programmatically show a dialog. 
The ViewModel of the dialog must be passed to the ```show``` method of the ```MdlDialogService``` 
object. After showing the dialog, it receives a ```DialogController``` object which can be used to close the dialog and 
return a value.

### A simple dialog

In this example a simple dialog will be shown....

#### ViewModel

```javascript
export class Dialog {

    static inject() {
        return [Promise];
    }

    constructor(dialogControllerPromise) {
        this._dialogControllerPromise = dialogControllerPromise;
    }

    activate(model) {
        this.text = model.text;
    }

    close() {
        this._dialogControllerPromise
            .then(dialogController => {
                dialogController.close(this.text);
            });
    }
}
```

#### Markup

```html
<template>
    <h4 class="mdl-dialog__title">Dialog</h4>
    <div class="mdl-dialog__content">
        <p>Add some text. The text will be returned to the caller.</p>
        <div mdl="textfield" class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="text" id="text" value.bind="text">
            <label class="mdl-textfield__label" for="text">Some text</label>
        </div>
    </div>
    <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button mdl-button--colored" click.delegate="close()">Close</button>
    </div>
</template>
```

#### Showing the dialog

The ```MdlDialogService``` object's ```show``` method is then used to actually show the dialog. Please see the API documentation for more information. TODO LINK!

```javascript
import MdlDialogService from 'aurelia-mdl-dialog';
import {Dialog} from './dialog/dialog';

export class App {

    static inject() {
        return [MdlDialogService];
    }

    constructor(mdlDialogService) {
        this._mdlDialogService = mdlDialogService;
        this.textFromDialog = '';
    }

    showDialog() {
         this._mdlDialogService.show({
                    viewModel: Dialog,
                    model: {
                        text: this.textFromDialog
                    }
                })
                .then(text => {
                    this.textFromDialog = text;
                });
    }
}
```

#### Closing a dialog

...

A dialog cannot be closed from the caller, only from the dialog itself.

## MdlDialogService API

Work in progess!

## Releasing

1. update version in *package.json* file

2. build the project
```bash
npm run build
```

3. commit the changes
```bash
git commit -m "Release $$version$$"
```

4. tag the commit
```bash
git tag -a v$$version$$ -m "Release $$version$$"
```

5. push the commit and the tag
```bash
git push origin master v$$version$$
```

6. 

7. publish package to NPM
```bash
npm publish --tag beta
```