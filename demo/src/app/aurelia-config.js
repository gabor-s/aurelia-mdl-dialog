import 'prismjs';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

export function configure(aurelia) {

    /* Prism configuration can go here, e.g.:

    Prism.plugins.NormalizeWhitespace.setDefaults({
        break-lines: 72
    });

    */

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-mdl');

    aurelia.start().then(() => aurelia.setRoot());
}