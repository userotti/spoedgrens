import THREE = require("three");
import Howler = require("howler");

import { EffectComposer, GlitchPass, RenderPass, FilmPass, Pass } from "postprocessing";

import Pad from "./pad"

class Spoedgrens {

    perspective_camera : THREE.PerspectiveCamera;
    orth_camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    renderer: THREE.Renderer;

    background_color: THREE.Sprite;
    sky_graident: THREE.Sprite;
    table_mountain: THREE.Sprite;

    headlights: THREE.Object3D;
    headlight_left: THREE.PointLight;
    headlight_right: THREE.PointLight;

    headlight_target: THREE.Object3D;
    aspect_ratio: number;

    canvas_width: number;
    canvas_height: number;

    background_orth_scene: THREE.Scene;
    road_scene: THREE.Scene;

    pad: Pad;
    composer: EffectComposer;
    clock: THREE.clock;

    mouse: THREE.Vector2;
    constructor() {


        //
        // const clock = new Clock();
        //
        // (function render() {
        //
        //     requestAnimationFrame(render);
        //     composer.render(clock.getDelta());
        //
        // }());

    }

    init(canvasCssWidth, canvasCssHeight, container) {

        this.canvas_width = canvasCssWidth;
        this.canvas_height= canvasCssHeight;

        this.aspect_ratio = this.canvas_width / this.canvas_height;

        var sound = new Howler.Howl({
            src: ['/assets/music/track.mp3'],
            autoplay: true,

            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        });

        sound.seek(65);
        // console.log("Sounds", sound );

        //Background stuff
        this.orth_camera = new THREE.OrthographicCamera(this.canvas_width/-2, this.canvas_width/2, this.canvas_height/2, this.canvas_height/-2, -500, 1500);
        this.orth_camera.position.z = 10;
        this.background_orth_scene = new THREE.Scene();
        this.setupBackgroundOrthSprites(this.background_orth_scene);


        //Road stuff
        this.perspective_camera = new THREE.PerspectiveCamera(75, this.aspect_ratio, 1, 10000);
        this.perspective_camera.position.y = 19;
        this.perspective_camera.position.x = -25;

        //Perspective scene
        this.road_scene = new THREE.Scene();



        this.headlights = new THREE.Object3D();

        this.headlight_target = new THREE.Object3D(this.perspective_camera.position.x, this.perspective_camera.position.y, this.perspective_camera.position.z);
        this.road_scene.add(this.headlight_target);

        //headlights
        this.headlight_left = new THREE.SpotLight( 0xffffff, 1.8);
        this.headlight_left.position.set( this.perspective_camera.position.x-10, this.perspective_camera.position.y-4, this.perspective_camera.position.z - 10 );
        this.headlight_left.angle = Math.PI / 5;
        this.headlight_left.penumbra = 0.15;
        this.headlight_left.decay = 3;
        this.headlight_left.distance = 2000;
        this.headlight_left.target.position.set(this.perspective_camera.position.x+10, this.perspective_camera.position.y-4, this.perspective_camera.position.z - 1000);
        this.headlight_left.target.updateMatrixWorld();

        //headlights
        this.headlight_right = new THREE.SpotLight( 0xffffff, 1.5);
        this.headlight_right.position.set( this.perspective_camera.position.x+10, this.perspective_camera.position.y-4, this.perspective_camera.position.z - 10 );
        this.headlight_right.angle = Math.PI / 5;
        this.headlight_right.penumbra = 0.2;
        this.headlight_right.decay = 3;
        this.headlight_right.distance = 2000;
        this.headlight_right.target.position.set(this.perspective_camera.position.x+10, this.perspective_camera.position.y-4, this.perspective_camera.position.z - 1000);
        this.headlight_right.target.updateMatrixWorld();


        this.headlights.add( this.headlight_left );
        this.headlights.add( this.headlight_right );
        this.road_scene.add(this.headlights);

        //more light
        var light = new THREE.AmbientLight( 0xffffff, 0.3 ); // soft white light
        this.road_scene.add( light );

        this.setupRoadSprites(this.road_scene);



        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            canvas: container
        });

        this.mouse = new THREE.Vector2();


        this.mouse.x = 0;


        this.composer = new EffectComposer(this.renderer);

        let pass3 = new RenderPass(this.background_orth_scene, this.orth_camera, {})
        pass3.renderToScreen = true;
        this.composer.addPass(pass3);

        // const pass1 = new GlitchPass();
        // // pass1.renderToScreen = true;
        // this.composer.addPass(pass1);

        let finalPass = new RenderPass(this.road_scene, this.perspective_camera, {clear: false, clearDepth: true});
        finalPass.renderToScreen = true;
        this.composer.addPass(finalPass);

        //
        // const pass = new FilmPass({greyscale: true});
        // pass.renderToScreen = true;
        // this.composer.addPass(pass);
        //




        this.clock = new THREE.Clock();


        this.renderer.setSize(this.canvas_width, this.canvas_height);
        this.renderer.autoClear = false;

        document.body.appendChild(this.renderer.domElement);

    }

    setupRoadSprites(scene) {

        this.pad = new Pad();


        this.pad.generateStrepe(150, scene);
        this.pad.generateTeer(150, scene);
        this.pad.generatePadTekensGroot(10, scene);
        this.pad.generateRandomSpoedTekens(23, scene);

    }

    setupBackgroundOrthSprites(scene) {

        var spriteMap = new THREE.TextureLoader().load('/assets/images/background_blue.png');
        var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
        spriteMaterial.map.magFilter = THREE.NearestFilter;
        this.background_color = new THREE.Sprite(spriteMaterial);
        this.background_color.scale.set(this.canvas_width, this.canvas_width, 1);
        this.background_color.position.z = 0;

        var skyMap = new THREE.TextureLoader().load('/assets/images/sky_gradient.png');
        var skySpriteMaterial = new THREE.SpriteMaterial({map: skyMap, color: 0xffffff});
        skySpriteMaterial.map.magFilter = THREE.NearestFilter;
        skySpriteMaterial.map.minFilter = THREE.LinearMipMapLinearFilter;
        this.sky_graident = new THREE.Sprite(skySpriteMaterial);
        this.sky_graident.scale.set(this.canvas_width, this.canvas_width, 1);
        this.sky_graident.position.y = 400;
        this.sky_graident.position.z = 2;

        var tableMap = new THREE.TextureLoader().load('/assets/images/table_mountain2.png');
        var tableSpriteMaterial = new THREE.SpriteMaterial({map: tableMap, color: 0xffffff});
        tableSpriteMaterial.map.magFilter = THREE.NearestFilter;
        tableSpriteMaterial.map.minFilter = THREE.LinearMipMapLinearFilter;
        this.table_mountain = new THREE.Sprite(tableSpriteMaterial);
        this.table_mountain.scale.set(1296, this.canvas_width, 1);
        this.table_mountain.position.z = 4;

        scene.add(this.background_color);
        scene.add(this.sky_graident);
        scene.add(this.table_mountain);

    }

    animate() {

        requestAnimationFrame(() => {
            this.animate();
        });

        this.sky_graident.position.y += -0.07;
        this.table_mountain.scale.set(this.table_mountain.scale.x+0.1, this.table_mountain.scale.y+0.1);

        this.perspective_camera.position.z -= 7;
        this.headlights.position.z -= 7;



        var mouse_diff_sqrt = (window.innerWidth/2 - this.mouse.x)*0.002;

        this.perspective_camera.position.x -= mouse_diff_sqrt;
        this.headlight_left.position.x -= mouse_diff_sqrt;
        this.headlight_right.position.x -= mouse_diff_sqrt;

        this.resetHeadlights();

        this.renderer.setSize(this.canvas_width, this.canvas_height);
        // this.renderer.clear();
        // this.renderer.render(this.background_orth_scene, this.orth_camera);
        // this.renderer.clearDepth();
        this.composer.render(this.clock.getDelta());




    }

    resize(canvasCssWidth, canvasCssHeight){

        this.canvas_width = canvasCssWidth;
        this.canvas_height = canvasCssHeight;

    }

    resetHeadlights() {
        this.headlight_left.target.position.set(this.perspective_camera.position.x+10, this.perspective_camera.position.y-4, this.perspective_camera.position.z - 1000);
        this.headlight_right.target.position.set(this.perspective_camera.position.x+10, this.perspective_camera.position.y-4, this.perspective_camera.position.z - 1000);
        this.headlight_left.target.updateMatrixWorld();
        this.headlight_right.target.updateMatrixWorld();


    }

}



var video = new Spoedgrens();

var container = document.getElementById("container");
console.log("container: ", container.clientWidth);
video.init(container.clientWidth, container.clientHeight, container);
video.animate();

var resizeTimeout;
function resizeThrottler() {


    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            console.log("resizing");
            video.resize(container.clientWidth, container.clientHeight);

            // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
    }
}

window.addEventListener("resize", resizeThrottler)

window.addEventListener("mousemove", (data)=>{

    video.mouse.x = data.clientX;
    // console.log("data:", data);
})
