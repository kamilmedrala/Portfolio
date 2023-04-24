import { Vector3,BufferAttribute } from "three";
import CustomSphere from "./CustomSphere";

const vertex = new Vector3();
const normal = new Vector3();

export default function idleAnimation(time:number, sphere:CustomSphere){
    const positionAttribute = sphere.initialGeometry.getAttribute("position") as BufferAttribute;
    const currentPositionAttribute = sphere.geometry.getAttribute("position") as BufferAttribute;
    const normalAttribute = sphere.initialGeometry.getAttribute("normal") as BufferAttribute;
    
    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        normal.fromBufferAttribute(normalAttribute, i);
  
        const xangle = vertex.x * sphere.morph + time;
        const xsin = Math.sin(xangle);
        const yangle = vertex.y + time;
        const ycos = Math.cos(yangle);
  
        currentPositionAttribute.setXYZ(
          i,
          vertex.x + normal.x * (xsin + ycos),
          vertex.y + normal.y * (xsin + ycos),
          vertex.z + normal.z * (xsin + ycos)
        );
      }
  
      sphere.geometry.computeVertexNormals();
      sphere.geometry.attributes.position.needsUpdate = true;
}