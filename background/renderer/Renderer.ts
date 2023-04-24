import {WebGLRenderer,WebGLRendererParameters} from 'three'

export default class Renderer extends WebGLRenderer{    
    constructor(element:HTMLElement){
        super({canvas: element,antialias: false })
        this.setSize(window.innerWidth, window.innerHeight);
        this.setPixelRatio(window.devicePixelRatio)
    }

    resize(){

    }
}