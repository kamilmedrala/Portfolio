import CustomSphere from "~~/background/sphere/CustomSphere";
import Camera from "~~/background/camera/Camera";
import Renderer from "~~/background/renderer/Renderer";
import idleAnimation from "~~/background/sphere/idleAnimation";
import {DirectionalLight,AmbientLight,Scene,Color} from "three";

// return {sphere}

export function initAnimation(canvas: HTMLElement) {
  const camera = new Camera(window.innerWidth / window.innerHeight);
  const renderer = new Renderer(canvas);

  const directionalLight = new DirectionalLight(0x00f1d8, 1);
  const ambientLight = new AmbientLight(0x1d1d1f);
  directionalLight.position.set(-1, 0.5, -0.5);

  let { x: fullWidth, y: fullHeight } = camera.getConvertedSizing();
  const radius = fullWidth / 2 > 6 ? 6 : fullWidth / 2;

  const sphere = new CustomSphere(radius, 64, 64);
  sphere.position.set(fullWidth / 2, 0, 0);
  sphere.rotateX(Math.PI / 16);
  sphere.rotateY(-Math.PI / 4);

  const scene = new Scene();
  scene.background = new Color(0x1d1d1f);

  scene.add(sphere);
  scene.add(ambientLight);
  scene.add(directionalLight);

  sphere.addAnimation(
    {
      start: 0,
      end: 713,
      func: function(scrollY){
        let scale = (scrollY - this.start)/this.end
        let from = fullWidth/2
        let to = -fullWidth/2
        
        let currentVal = from + (to - from) * scale
        sphere.position.x += (currentVal - sphere.position.x) * 0.2
      }
    })
    sphere.addAnimation(
      {
        start: 0,
        end: 713,
        func: function(scrollY){
          let scale = (scrollY - this.start)/this.end
          let from = 0
          let to = -fullHeight/3
          
          let currentVal = from + (to - from) * scale
          sphere.position.y += (currentVal - sphere.position.y) * 0.2
        }
      })
      sphere.addAnimation(
        {
          start: 0,
          end: 713,
          func: function(scrollY){
            let scale = (scrollY - this.start)/this.end
            let from = Math.PI / 16
            let to = -Math.PI / 2
            
            let currentVal = from + (to - from) * scale
            sphere.rotation.x += (currentVal - sphere.rotation.x) * 0.2
          }
        })
        // sphere.addAnimation(
        //   {
        //     start: 0,
        //     end: 713,
        //     func: function(scrollY){
        //       let scale = (scrollY - this.start)/this.end
        //       let from = 0
        //       let to = 2
              
        //       let currentVal = from + (to - from) * scale
        //       sphere.position.setZ(currentVal)
        //     }
        //   })
  

  // let test = 1
  // window.addEventListener("scroll", (e) => {
    // sphere.position.setX(fullWidth / 2 - window.scrollY / 100);
    // sphere.rotation.x =  Math.PI / 16 + window.scrollY / 500;
    // test = 1 + window.scrollY / 1000;

    // });
    
    
    function animate(time: any) {
      window.requestAnimationFrame(animate)
      time = time / 2000;
      
      idleAnimation(time,sphere)
      sphere.animate(window.scrollY)
    // console.log()
    // sphere.animate(window.scrollY)
    
    renderer.render(scene, camera);
  }
  window.requestAnimationFrame(animate)
}
