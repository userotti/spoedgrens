import THREE = require("three");
import Howler = require("howler");


class Spoedgrens {

    camera: THREE.Camera;
    orth_camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    renderer: THREE.Renderer;

    background_color: THREE.Sprite;
    sky_graident: THREE.Sprite;
    table_mountain: THREE.Sprite;

    aspect_ratio: number;

    constructor() {



    }

    init(width, height) {

        this.aspect_ratio = width / height;


        this.orth_camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, -500, 1500);
        this.orth_camera.position.z = 10;

        this.camera = new THREE.PerspectiveCamera(75, this.aspect_ratio, 1, 10000);
        this.camera.position.z = 1000;

        this.scene = new THREE.Scene();

        var spriteMap = new THREE.TextureLoader().load('/assets/images/background_blue.png');
        var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
        spriteMaterial.map.magFilter = THREE.NearestFilter;
        this.background_color = new THREE.Sprite(spriteMaterial);
        this.background_color.scale.set(width, (6/8)*width, 1);
        this.background_color.position.z = 0;


        var skyMap = new THREE.TextureLoader().load('/assets/images/sky_gradient.png');
        var skySpriteMaterial = new THREE.SpriteMaterial({map: skyMap, color: 0xffffff});
        skySpriteMaterial.map.magFilter = THREE.NearestFilter;
        skySpriteMaterial.map.minFilter = THREE.LinearMipMapLinearFilter;

        this.sky_graident = new THREE.Sprite(skySpriteMaterial);


        this.sky_graident.scale.set(width, (6/8)*width, 1);
        this.sky_graident.position.y = 400;
        this.sky_graident.position.z = 2;

        var tableMap = new THREE.TextureLoader().load('/assets/images/table_mountain.png');
        var tableSpriteMaterial = new THREE.SpriteMaterial({map: tableMap, color: 0xffffff});
        tableSpriteMaterial.map.magFilter = THREE.NearestFilter;
        tableSpriteMaterial.map.minFilter = THREE.LinearMipMapLinearFilter;
        this.table_mountain = new THREE.Sprite(tableSpriteMaterial);
        this.table_mountain.scale.set(width, (6/8)*width, 1);
        this.table_mountain.position.z = 4;

        this.scene.add(this.background_color);
        this.scene.add(this.sky_graident);
        this.scene.add(this.table_mountain);




        this.renderer = new THREE.WebGLRenderer({antialias: false});
        this.renderer.setSize(width, height);

        document.body.appendChild(this.renderer.domElement);

    }

    animate() {

        requestAnimationFrame(() => {
            this.animate();
        });

        this.sky_graident.position.y += -0.05;
        this.renderer.render(this.scene, this.orth_camera);


    }

    resize(w,h){

        this.renderer.setSize(w, h);
    }
}

var video = new Spoedgrens();
video.init(window.innerWidth, window.innerHeight);
video.animate();

var resizeTimeout;
function resizeThrottler() {


    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            console.log("resizing");
            video.resize(window.innerWidth, window.innerHeight);

            // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
    }
}

window.addEventListener("resize", resizeThrottler)
