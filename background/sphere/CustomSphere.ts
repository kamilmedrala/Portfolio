import {SphereGeometry,MeshStandardMaterial,Mesh,FrontSide} from 'three'

export default class CustomSphere extends Mesh<SphereGeometry, MeshStandardMaterial>{
    constructor(radius:number,widthSegments:number,heightSegments:number){
        const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
        const material = new MeshStandardMaterial({wireframe:true, color: 0xffffff,roughness: 0.2 , side:FrontSide });
        super(geometry,material)
    }
}