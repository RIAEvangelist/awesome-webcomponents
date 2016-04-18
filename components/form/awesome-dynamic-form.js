'use strict';

awesome.requireCSS(`${awesome.path}components/form/awesome-dynamic-form.css`);

(
    function(){
        let dispatcher=null;
        let constants = null;
        let action = null;
        const defaults={

        }

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            document.registerElement(
                'awesome-dynamic-form',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
            }

            attachedCallback(){
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            generate(formData){
                const form = document.querySelector('awesome-dynamic-form');

                const title = document.createElement('h1');
                title.innerHTML = formData.formDefinition.name;
                form.appendChild(title);


                for(const i in formData.fields){
                    this.create(form, formData, i);
                }

                const separator = document.createElement('div');
                form.appendChild(separator);

                for(const i in formData.actions){
                    const label = formData.actions[i].label;
                    const id = formData.actions[i].id;
                    const actionTrigger = formData.actions[i].actionTrigger;
                    const button = document.createElement('button');

                    button.setAttribute('id', id);
                    button.innerHTML = label;

                    this[id]=function(){
                        const data = this.getElementData(this);
                        console.log(JSON.stringify(data));
                        dispatcher.trigger(
                            actionTrigger,
                            data
                        );
                    }
                    button.addEventListener(
                        'click',
                        this[id].bind(this)
                    )
                    form.appendChild(button);
                }
            }

            create(form, formData, i){
                if(formData.fields[i].hasOwnProperty('path')){
                    awesome.requireScript(formData.fields[i].path);
                }

                const element = document.createElement(formData.fields[i].element);
                const label = document.createElement('label');
                label.innerHTML = formData.fields[i].label;


                for(const j in formData.fields[i]){

                    switch (j) {
                        case 'element':
                            continue;
                            break;
                        case 'dataAttr':
                            for(const k in formData.fields[i][j]){
                                element.setAttribute(k,formData.fields[i][j][k])
                            }
                            continue;
                            break;
                        default:
                            break;
                    }

                    if(j == 'value' && (typeof formData.fields[i][j] == 'object')){
                        this.multipleElements(form,formData.fields[i]);
                        return;
                    }

                    element.setAttribute(j,formData.fields[i][j])
                }
                form.appendChild(label);
                form.appendChild(element);
            }

            multipleElements(form,elementObject){
                for(const j in elementObject.value){
                    const element = document.createElement(elementObject.element);
                    const label = document.createElement('label');
                    label.innerHTML = elementObject.value[j];
                    for(const i in elementObject){
                        if(i == 'value'){
                            element.setAttribute('value', elementObject.value[j]);
                            element.setAttribute('id', elementObject.value[j]);
                            continue;
                        }
                        element.setAttribute(i, elementObject[i]);
                    }
                    form.appendChild(label);
                    form.appendChild(element);
                }

            }

            getElementData(){
                let data = {};
                for(const j in this.children){
                    if(!this.children[j].id){
                        continue;
                    };
                    if(this.children[j].localName == 'button'){
                        continue;
                    }
                    let id = this.children[j].id;
                    data[id] = {};

                    //this is a special case, if more should are added should be a switch case
                    if(this.children[j].type == 'radio'){
                        data[id].checked = this.children[j].checked;
                    }

                    data[id].value = this.children[j].value;
                }
                return(data);
            }
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)();
