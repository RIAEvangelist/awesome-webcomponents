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

util.mergeDataset=function(el,proto){
    const data=Object.assign(
        proto.defaults,//merge passed values with defaults
        el.dataset //passed values via HTML data-*
    );

    Object.assign(
        el.dataset,//merge everything to dataset
        data
    );
}
