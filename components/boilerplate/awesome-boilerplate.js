'use strict';

util.requireCSS('components/boilerplate/awesome-boilerplate.css');

var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = render;
proto.attributeChangedCallback = updateAttributes;
proto.defaults={
    something:'boilerplate'
}

document.registerElement(
    'awesome-boilerplate',
    {
        prototype: proto
    }
);

function updateAttributes(key,oldValue,newValue){

}

function render(){
    util.mergeDataset(this,proto);

    this.innerHTML=`
        <p>
            ${this.dataset.something}
        </p>
        ${this.innerHTML}
    `;
}
