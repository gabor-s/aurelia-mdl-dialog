export function configure(aurelia) {

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
//        .plugin('aurelia-mdl');

    aurelia.start().then(() => aurelia.setRoot());
}