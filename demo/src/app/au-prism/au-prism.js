import * as Prism from "prismjs";

export class AuPrismCustomAttribute {

    static inject() {
        return [Element];
    }

    constructor(element) {
        this.element = element;
    }

    bind() {
        Prism.highlightElement(this.element);
    }
}