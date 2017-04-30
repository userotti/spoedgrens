import THREE = require("three");

export default class Pad {

    strepe: Array<number>;

    constructor(){

    }

    generateStrepe(streep_count = 100, scene: THREE.Scene){

        let strepe = [];


        var streepSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_streep.png');
        var streepMaterial = new THREE.MeshBasicMaterial( { map: streepSpriteMap, side:THREE.DoubleSide} );
        streepMaterial.map.magFilter = THREE.NearestFilter;

        var streepGeometry = new THREE.PlaneGeometry( 1, 10); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++){
            let streep = new THREE.Mesh(streepGeometry, streepMaterial);
            streep.position.y = -10;
            streep.position.z = i * -50;
            console.log(streep.position.z);
            streep.rotation.x = Math.PI/2;
            scene.add(streep);
        }

        return strepe;

    }


    generateTeer(streep_count = 100, scene: THREE.Scene){

        let strepe = [];


        var teerSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_teer.png');
        var teerMaterial = new THREE.MeshBasicMaterial( { map: teerSpriteMap, side:THREE.DoubleSide} );
        teerMaterial .map.magFilter = THREE.NearestFilter;

        var teerGeometry = new THREE.PlaneGeometry( 100, 100); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++){
            let streep = new THREE.Mesh(teerGeometry, teerMaterial );
            streep.position.y = -11;
            streep.position.z = i * -100;
            console.log(streep.position.z);
            streep.rotation.x = Math.PI/2;
            scene.add(streep);
        }

        return strepe;

    }

    generatePadTekensGroot(streep_count = 100, scene: THREE.Scene){

        let strepe = [];


        var tekenSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_teken_groot.png');
        var tekenMaterial = new THREE.MeshBasicMaterial( { map: tekenSpriteMap, side:THREE.DoubleSide, transparent: true} );
        tekenMaterial .map.magFilter = THREE.NearestFilter;

        var tekenGeometry = new THREE.PlaneGeometry( 190, 130); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++){
            let teken = new THREE.Mesh(tekenGeometry, tekenMaterial );
            teken.position.y = 50;
            teken.position.z = i * -800;
            console.log(teken.position.z);
            scene.add(teken);
        }

        return strepe;

    }

}

