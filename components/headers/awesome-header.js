'use strict';

util.requireCSS('components/headers/awesome-header.css');

var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = render;
proto.attributeChangedCallback = render;
proto.defaults={
    title:''
}

document.registerElement(
    'awesome-header',
    {
        prototype: proto
    }
);

function render(){
    util.mergeDataset(this,proto);

    this.innerHTML=`
        <header>${this.dataset.title}</header>
    `;
}
