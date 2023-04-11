import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function initAnimation(canvas: HTMLCanvasElement) {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1d1d1f)
  // roughness: 0.175, metalness: 0.975
  const directionalLight = new THREE.DirectionalLight(0x00f1d8, 1);
  const ambientLight = new THREE.AmbientLight(0x1d1d1f);
  directionalLight.position.set(-1, 0.5, -0.5);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 0, 15);
  controls.update();

  let d = camera.position.distanceTo(new THREE.Vector3(0,0,0))  
  let fullWidth = Math.sin(camera.fov * Math.PI / 180) * d * camera.aspect
  let fullHeight = fullWidth / camera.aspect

  const radius = fullWidth/2 > 6 ? 6 : fullWidth/2;
  const widthSegments = 64;
  const heightSegments = 64;

  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const material = new THREE.MeshStandardMaterial({wireframe:true, color: 0xffffff,roughness: 0.2 , side:THREE.FrontSide });
  const sphere = new THREE.Mesh(sphereGeometry, material);

  scene.add(sphere);
  scene.add(ambientLight)
  scene.add(directionalLight);

  sphere.position.set(fullWidth / 2,0,0)
  sphere.rotateX(Math.PI / 16)
  sphere.rotateY(-Math.PI / 4)
  // sphere.rotateZ(Math.PI / 16)




  // Animation test

// const mixer = new THREE.AnimationMixer(sphere);
// let track = new THREE.VectorKeyframeTrack(
//   '.position',
//   [0, 2],
//   [
//     sphere.position.x,
//     sphere.position.y,
//     sphere.position.z,
//     -fullWidth/4,
//     -fullHeight/3,
//     10,
//   ],
//   THREE.InterpolateSmooth
// );
// const animationClip = new THREE.AnimationClip('test', 2, [track]);
// const animationAction = mixer.clipAction(animationClip);
// animationAction.setLoop(THREE.LoopOnce,1);
// animationAction.clampWhenFinished = true
// setTimeout(()=>{
//   // animationAction.play();
// },3000)
// const clock = new THREE.Clock();

function lerp(,){

}

let test = 1
window.addEventListener('scroll',(e)=>{
  sphere.position.setX(6 - window.scrollY/100)
  sphere.rotation.x = window.scrollY/500
  test = 1 + window.scrollY/1000
})



  const positionAttribute = sphereGeometry.clone().getAttribute("position") as THREE.BufferAttribute;
  const normalAttribute = sphereGeometry.clone().getAttribute("normal") as THREE.BufferAttribute;

  let vertex = new THREE.Vector3();
  let normal = new THREE.Vector3();


  function animate(time: any) {
    time = time / 2000;

    for (let i = 0; i < sphereGeometry.attributes.position.count; i++) {
      vertex.fromBufferAttribute(positionAttribute as THREE.BufferAttribute, i);
      normal.fromBufferAttribute(normalAttribute as THREE.BufferAttribute, i);

      const xangle = vertex.x * test + time;
      const xsin = Math.sin(xangle);
      const yangle = vertex.y + time;
      const ycos = Math.cos(yangle);

      sphereGeometry.attributes.position.setXYZ(
        i,
        vertex.x + normal.x * (xsin + ycos),
        vertex.y + normal.y * (xsin + ycos),
        vertex.z + normal.z * (xsin + ycos)
      );
    }

    sphereGeometry.computeVertexNormals();
    sphereGeometry.attributes.position.needsUpdate = true;

    // mixer.update( clock.getDelta() );

    renderer.render(scene, camera);
  }
}






