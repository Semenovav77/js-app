(function (){
    'use strict';

    class Block {
        constructor(el) {
            this.el=el;
        }
        static Create(tagName = 'div', classes = [], attrs = {}){
            const el = document.createElement(tagName);
            classes.forEach(function (className){
                el.classList.add(className);
            });
            for (let name in attrs) {
                el.setAttribute(name, attrs[name]);
            }
            return new Block(el);
        }
        hide() {
            this.el.setAttribute('hidden', true);
        }
        show() {
            this.el.removeAttribute('hidden');
        }
        setText() {
            this.el.textContent = text;
        }
        append(block) {
            this.el.appendChild(block.el)
        }
    }
    window.Block = Block;
})();