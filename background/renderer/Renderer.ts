import {WebGLRenderer,WebGLRendererParameters} from 'three'

export default class Renderer extends WebGLRenderer{    
    constructor(element:HTMLElement){
        super({canvas: element,antialias: true })
        this.setSize(window.innerWidth, window.innerHeight);
    }

    resize(){

    }
}