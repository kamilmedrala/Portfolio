import {SphereGeometry,MeshStandardMaterial,Mesh,FrontSide,Vector3,BufferAttribute,BufferGeometry} from 'three'
import SphereAnimation from '../interfaces/SphereAnimation';
export default class CustomSphere extends Mesh<SphereGeometry, MeshStandardMaterial>{
        
    animationsArray: Array<SphereAnimation>;
    initialGeometry: BufferGeometry;
    
    constructor(radius:number,widthSegments:number,heightSegments:number){
        const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
        const material = new MeshStandardMaterial({wireframe:true, color: 0xffffff,roughness: 0.2 , side:FrontSide });
        super(geometry,material)
        this.initialGeometry = geometry.clone()
        this.animationsArray = []
    }
        
    addAnimation(animation:SphereAnimation){
        this.animationsArray.push(animation)
    }

    animate(pageScroll:number){
        this.animationsArray.forEach((animation)=>{
            if (animation.start <= pageScroll &&
                pageScroll < animation.end) {
                    animation.func(pageScroll)
            }
        })
        // select from animationsArray based on current position
    }
}