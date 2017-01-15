# aurelia-mdl-dialog
Aurelia wrapper for Material Design Lite's [Dialog](https://getmdl.io/components/#dialog-section) component.

## <a name="live-demo"></a>Live demo
It demonstrates showing a dialog from another one, passing values to and returning values from a dialog, positioning
a dialog.

The live demo is [here]().

## Install

```bash
npm install aurelia-mdl-dialog --save
```

### Dependencies

The *Aurelia Framework* and [*Google's Dialog Polyfill*](https://github.com/GoogleChrome/dialog-polyfill) for browsers 
without native ```<dialog>``` support.

## Usage

This component exports the ```MdlDialogService``` object which can be used to programmatically show a dialog. 
The ViewModel of the dialog must be passed to the ```show``` method of the ```MdlDialogService``` 
object. After showing the dialog, it receives a ```DialogController``` object which can be used to close the dialog and 
return a value. The ```show``` method returns a ```Promise``` ... TODO!!!

### Example

In this example a dialog with a single text input field is shown. The initial value of the input field is passed to the
dialog and the value entered into the input field is returned to the caller.

For a more complex example please check the [live demo](#live-demo).

#### <a name="dialog-viewmodel"></a>Dialog ViewModel

A plain Aurelia ViewModel class. The ```activate``` method handles the initial value of the input field. 
The injected ```Promise``` is fulfilled when the dialog is shown. The fulfillment value of the ```Promise```
is a ```DialogController``` object, which can be used to close 
the dialog and return a value. The returned value must be a [string](https://html.spec.whatwg.org/multipage/forms.html#the-dialog-element).

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

#### Dialog template

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

The ```MdlDialogService``` object's ```show``` method is used to actually show the dialog. The ```show``` method
returns a ```Promise``` which will be fulfilled when the dialog is closed. The fulfillment value of this ```Promise``` 
is the return value of the dialog.

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

#### Closing the dialog

The dialog cannot be closed from the caller, only from the dialog itself. As shown [earlier](#dialog-viewmodel) 
a ```DialogController``` object is available in the dialog and this object can be used to close the dialog and 
return a value. 

#### Canceling the dialog

TODO!!!

## API

### MdlDialogService

The ```MdlDialogService``` is the TODO!!!

#### ```show```

Shows a dialog and returns a ```Promise``` which is fulfilled when the dialog is closed. The fulfillment value is the 
return value of the dialog. 

The parameter of the ```show``` method is a configuration object with the following keys:

##### ```viewModel```

The ViewModel class of the dialog. Must be a string or a function. Mandatory parameter.

##### ```model```

The model object of the dialog. Can be used to pass values to the dialog. The ```activate``` method of the dialog's 
ViewModel class will be called with this object. Optional parameter.

##### ```cssClass```

The CSS class that will be assigned to the ```<dialog>``` HTML tag. TODO!!! 

```javascript
 this._mdlDialogService.show({
            viewModel: Dialog,
            model: {
                text: this.textFromDialog
            },
            cssClass: 'myDialog'
        })
        .then(text => {
            this.textFromDialog = text;
        });
```

### DialogController

The ```DialogController``` is obtained through a ```Promise``` which is injected automatically into the Dialog's 
ViewModel class. The promise is fulfilled when the dialog is shown and the fulfillment value is the 
```DialogController``` object.

#### ```close```

Closes the dialog and optionally returns a [string](https://html.spec.whatwg.org/multipage/forms.html#the-dialog-element) 
value as the return value of the dialog.

```javascript
dialogController.close('returnValue');
```

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

## Testing

TODO!!!

### Browsers

Tested only on **Chrome 55** and **Firefox 50**.

## Development

webpack, dev and prod build, the only difference is in linting errors TODO:

## License

[MIT](master/LICENSE)