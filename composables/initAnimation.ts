import CustomSphere from "~~/background/sphere/CustomSphere";
import Camera from "~~/background/camera/Camera";
import Renderer from "~~/background/renderer/Renderer";
import idleAnimation from "~~/background/sphere/idleAnimation";
import {DirectionalLight,AmbientLight,Scene,Color} from "three";

// return {sphere}

export function initAnimation(canvas: HTMLElement) {
  const camera = new Camera(window.innerWidth / window.innerHeight);
  const renderer = new Renderer(canvas);
  renderer.setAnimationLoop(animate)

  const directionalLight = new DirectionalLight(0x00f1d8, 1);
  directionalLight.position.set(-100, 0.5, -0.5);
  
  const directionalLightPurp = new DirectionalLight(0x2935ba, 1)
  directionalLightPurp.position.set(-50, -50, 0);
  
  const ambientLight = new AmbientLight(0x1d1d1f);

  let { x: fullWidth, y: fullHeight } = camera.getConvertedSizing();
  const radius = fullWidth / 2 > 6 ? 6 : fullWidth / 2;

  const sphere = new CustomSphere(radius, 128, 128);
  sphere.position.set(fullWidth / 3, 0, 0);
  sphere.rotateX(Math.PI / 16);
  sphere.rotateY(-Math.PI / 4);

  const scene = new Scene();
  scene.background = new Color(0x1d1d1f);

  scene.add(sphere);
  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(directionalLightPurp);

  sphere.addAnimation(
    {
      start: 0,
      end: 713,
      func: function(scrollY){
        let scale = (scrollY - this.start)/this.end
        let from = fullWidth/3
        let to = -fullWidth/3
        
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
        sphere.addAnimation(
          {
            start: 0,
            end: 713,
            func: function(scrollY){
              let scale = (scrollY - this.start)/this.end
              let from = 1
              let to = 2
              
              let currentVal = from + (to - from) * scale
              sphere.morph += (currentVal - sphere.morph) * 0.2
            }
          })
        sphere.addAnimation(
          {
            start: 713,
            end: 1400,
            func: function(scrollY){
              let scale = (scrollY - this.start)/(this.end - this.start)
              let from = 0
              let to = 4
              
              let currentVal = from + (to - from) * scale
              sphere.position.z += (currentVal - sphere.position.z) * 0.2
            }
          })
          sphere.addAnimation(
            {
              start: 713,
              end: 1400,
              func: function(scrollY){
                let scale = (scrollY - this.start)/(this.end - this.start)
                let from = -fullWidth/3
                let to = 0
                
                let currentVal = from + (to - from) * scale
                sphere.position.x += (currentVal - sphere.position.x) * 0.2
              }
            })
            sphere.addAnimation(
              {
                start: 713,
                end: 1400,
                func: function(scrollY){
                  let scale = (scrollY - this.start)/(this.end - this.start)
                  let from = -fullHeight/3
                  let to = -fullHeight/2
                  
                  let currentVal = from + (to - from) * scale
                  sphere.position.y += (currentVal - sphere.position.y) * 0.2
                }
              })
              sphere.addAnimation(
                {
                  start: 713,
                  end: 1400,
                  func: function(scrollY){
                    let scale = (scrollY - this.start)/this.end
                    let from = -Math.PI / 4
                    let to = Math.PI / 2
                    
                    let currentVal = from + (to - from) * scale
                    sphere.rotation.y += (currentVal - sphere.rotation.y) * 0.2
                  }
                })
  

  // let test = 1
  // window.addEventListener("scroll", (e) => {
    // sphere.position.setX(fullWidth / 2 - window.scrollY / 100);
    // sphere.rotation.x =  Math.PI / 16 + window.scrollY / 500;
    // test = 1 + window.scrollY / 1000;

    // });
    
    
    function animate(time: any) {
      time = time / 2000;
      
      idleAnimation(time,sphere)
      sphere.animate(window.scrollY)
    // console.log()
    // sphere.animate(window.scrollY)
    
    renderer.render(scene, camera);
  }
  renderer.render(scene, camera);

}
