import { PerspectiveCamera,Vector3 } from "three";

export default class Camera extends PerspectiveCamera{

    private static readonly FOV: number = 60
    private static readonly NEAR: number = 1;
    private static readonly FAR: number = 23;

    constructor(aspect: number){
        super(
            Camera.FOV,
            aspect,
            Camera.NEAR,
            Camera.FAR
        )
        this.position.set(0, 0, 15);
    }

    getConvertedSizing(){
        const d = this.position.distanceTo(new Vector3(0,0,0))
        const x = Math.tan(this.fov/2 * Math.PI / 180) * 2 * d * this.aspect
        const y = x / this.aspect

        return {x,y}
    }

    resize(width: number,height: number){
        this.aspect = width / height;
        this.updateProjectionMatrix();
    }
}