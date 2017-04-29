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

    aspect_ratio: number;

    canvas_width: number;
    canvas_height: number;

    background_orth_scene: THREE.Scene;
    road_scene: THREE.Scene;

    pad: Pad;
    composer: EffectComposer;
    clock: THREE.clock;

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

        //Background stuff
        this.orth_camera = new THREE.OrthographicCamera(this.canvas_width/-2, this.canvas_width/2, this.canvas_height/2, this.canvas_height/-2, -500, 1500);
        this.orth_camera.position.z = 10;
        this.background_orth_scene = new THREE.Scene();
        this.setupBackgroundOrthSprites(this.background_orth_scene);


        //Road stuff
        this.perspective_camera = new THREE.PerspectiveCamera(75, this.aspect_ratio, 1, 10000);
        this.perspective_camera.position.z = 10;
        this.perspective_camera.position.x = -20;

        this.road_scene = new THREE.Scene();
        this.setupRoadSprites(this.road_scene);


        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            canvas: container
        });





        this.composer = new EffectComposer(this.renderer);

        this.composer.addPass(new RenderPass(this.background_orth_scene, this.orth_camera, {}));


        const pass1 = new GlitchPass();
        // pass1.renderToScreen = true;
        this.composer.addPass(pass1);

        let finalPass = new RenderPass(this.road_scene, this.perspective_camera, {clear: false, clearDepth: true});
        this.composer.addPass(finalPass);

        const pass = new FilmPass({greyscale: true});
        pass.renderToScreen = true;
        this.composer.addPass(pass);





        this.clock = new THREE.Clock();


        this.renderer.setSize(this.canvas_width, this.canvas_height);
        this.renderer.autoClear = false;

        document.body.appendChild(this.renderer.domElement);

    }

    setupRoadSprites(scene) {

        this.pad = new Pad();


        this.pad.generateStrepe(100, scene);
        this.pad.generateTeer(100, scene);


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

        var tableMap = new THREE.TextureLoader().load('/assets/images/table_mountain.png');
        var tableSpriteMaterial = new THREE.SpriteMaterial({map: tableMap, color: 0xffffff});
        tableSpriteMaterial.map.magFilter = THREE.NearestFilter;
        tableSpriteMaterial.map.minFilter = THREE.LinearMipMapLinearFilter;
        this.table_mountain = new THREE.Sprite(tableSpriteMaterial);
        this.table_mountain.scale.set(this.canvas_width, this.canvas_width, 1);
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


        this.perspective_camera.position.z -= 2;



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
