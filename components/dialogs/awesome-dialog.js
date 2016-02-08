'use strict';

util.requireCSS('components/dialogs/awesome-dialog.css');
util.requireScript('components/headers/awesome-header.js');

var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = render;
proto.attributeChangedCallback = updateAttributes;
proto.defaults={
    title:''
}

document.registerElement(
    'awesome-dialog',
    {
        prototype: proto
    }
);

function updateAttributes(key,oldValue,newValue){
    if(key!=='data-title'){
        return false;
    }
    this.querySelector('awesome-header').dataset.title=newValue;
    return true;
}

function render(){
    util.mergeDataset(this,proto);

    this.innerHTML=`
        <awesome-header data-title='${this.dataset.title}'></awesome-header>
        <div class='content'>
            ${this.innerHTML}
        </div>
    `;
}
