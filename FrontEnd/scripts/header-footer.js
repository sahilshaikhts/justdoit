class Custom_header extends HTMLElement {
    connectedCallback() {
        this.innerHTML =`
        <button/>
        `
    }
}
customElements.define("custom-header",Custom_header);