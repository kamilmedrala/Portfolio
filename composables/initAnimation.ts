import CustomSphere from "~~/background/sphere/CustomSphere";
import Camera from "~~/background/camera/Camera";
import Renderer from "~~/background/renderer/Renderer";
import * as THREE from "three";

// return {sphere}

export function initAnimation(canvas: HTMLElement) {
  const camera = new Camera(window.innerWidth / window.innerHeight);
  const renderer = new Renderer(canvas);
  renderer.setAnimationLoop(animate);

  const directionalLight = new THREE.DirectionalLight(0x00f1d8, 1);
  const ambientLight = new THREE.AmbientLight(0x1d1d1f);
  directionalLight.position.set(-1, 0.5, -0.5);

  let { x: fullWidth, y: fullHeight } = camera.getConvertedSizing();
  const radius = fullWidth / 2 > 6 ? 6 : fullWidth / 2;

  const sphere = new CustomSphere(radius, 64, 64);
  sphere.position.set(fullWidth / 2, 0, 0);
  sphere.rotateX(Math.PI / 16);
  sphere.rotateY(-Math.PI / 4);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1d1d1f);

  scene.add(sphere);
  scene.add(ambientLight);
  scene.add(directionalLight);

  let test = 1;
  window.addEventListener("scroll", (e) => {
    sphere.position.setX(6 - window.scrollY / 100);
    sphere.rotation.x = window.scrollY / 500;
    test = 1 + window.scrollY / 1000;
  });

  const positionAttribute = sphere.geometry.clone().getAttribute("position") as THREE.BufferAttribute;
  const normalAttribute = sphere.geometry.clone().getAttribute("normal") as THREE.BufferAttribute;

  let vertex = new THREE.Vector3();
  let normal = new THREE.Vector3();

  function animate(time: any) {
    time = time / 2000;

    for (let i = 0; i < sphere.geometry.attributes.position.count; i++) {
      vertex.fromBufferAttribute(positionAttribute as THREE.BufferAttribute, i);
      normal.fromBufferAttribute(normalAttribute as THREE.BufferAttribute, i);

      const xangle = vertex.x * test + time;
      const xsin = Math.sin(xangle);
      const yangle = vertex.y + time;
      const ycos = Math.cos(yangle);

      sphere.geometry.attributes.position.setXYZ(
        i,
        vertex.x + normal.x * (xsin + ycos),
        vertex.y + normal.y * (xsin + ycos),
        vertex.z + normal.z * (xsin + ycos)
      );
    }

    sphere.geometry.computeVertexNormals();
    sphere.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
}
