'use strict';

awesome.requireCSS(`${awesome.path}components/file-loader/awesome-file-loader.css`);

(
    function(){
        const defaults={}

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <input type='file' id='input-files' multiple>
                    <p id='fileInfo'>

                    </p>
                    <p class='upload-text'>
                        Select one or more files.
                    </p>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    this.update
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            update(e){
                let loadedFiles = document.getElementById('input-files').files;
                document.querySelector('.upload-text').classList.add('hidden');
                var txt='';

                for(var i = 0; i < loadedFiles.length; i++){
                    txt += "<br><strong>" + (i+1) + ". File</strong><br>";
                    var file = loadedFiles[i];
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                    if ('lastModifiedDate' in file) {
                        txt += "lastModified: " + file.lastModifiedDate.toUTCString() + "<hr>";
                    }
                }
                document.getElementById('fileInfo').innerHTML = txt;
            }
        }

        document.registerElement(
            'awesome-file-loader',
            Component
        );
    }
)();
