export function configure(aurelia) {

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-mdl')
        .plugin('aurelia-syntax-highlighter');

    aurelia.start().then(() => aurelia.setRoot());
}