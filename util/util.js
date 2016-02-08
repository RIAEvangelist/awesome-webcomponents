'use strict';

const util={};

util.requireScript=function(path){
    const script=document.createElement('script');
    const existingScript=document.head.querySelector(`script[src='${path}']`);
    if(existingScript){
        return false;
    }
    script.src=path;
    document.head.appendChild(script);
    return true;
}

util.requireCSS=function(path){
    const css=document.createElement('link');
    const existingCSS=document.head.querySelector(`link[href='${path}']`);

    if(existingCSS){
        return false;
    }

    css.rel='stylesheet';
    css.href=path;
    document.head.appendChild(css);
}

util.mergeDataset=function(el,defaults){
    const data={};
    Object.assign(
        data,
        defaults
    );

    Object.assign(
        data,
        el.dataset
    );

    Object.assign(
        el.dataset,
        data
    );
}
