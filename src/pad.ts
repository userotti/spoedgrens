import THREE = require("three");

export default class Pad {

    strepe: Array<number>;

    constructor() {

    }

    generateStrepe(streep_count = 100, scene: THREE.Scene) {

        let strepe = [];


        var streepSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_streep.png');
        var streepMaterial = new THREE.MeshPhongMaterial({map: streepSpriteMap, side: THREE.DoubleSide});
        streepMaterial.map.magFilter = THREE.NearestFilter;

        var streepGeometry = new THREE.PlaneGeometry(1, 20); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++) {
            let streep = new THREE.Mesh(streepGeometry, streepMaterial);
            streep.position.y = 1;
            streep.position.z = i * -100;
            console.log(streep.position.z);
            streep.rotation.x = Math.PI / 2;
            scene.add(streep);

            let streep2 = new THREE.Mesh(streepGeometry, streepMaterial);
            streep2.position.x = 50;
            streep2.position.y = 1;
            streep2.position.z = i * -100;
            console.log(streep2.position.z);
            streep2.rotation.x = Math.PI / 2;
            scene.add(streep2);

            let streep3 = new THREE.Mesh(streepGeometry, streepMaterial);
            streep3.position.x = -50;
            streep3.position.y = 1;
            streep3.position.z = i * -100;
            console.log(streep3.position.z);
            streep3.rotation.x = Math.PI / 2;
            scene.add(streep3);
        }

        return strepe;

    }


    generateTeer(streep_count = 100, scene: THREE.Scene) {

        let strepe = [];


        var teerSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_teer.png');
        var teerMaterial = new THREE.MeshPhongMaterial({map: teerSpriteMap, side: THREE.DoubleSide});
        teerMaterial.map.magFilter = THREE.NearestFilter;

        var teerGeometry = new THREE.PlaneGeometry(250, 100); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++) {
            let streep = new THREE.Mesh(teerGeometry, teerMaterial);
            streep.position.z = i * -100;
            console.log(streep.position.z);
            streep.rotation.x = Math.PI / 2;
            scene.add(streep);
        }

        return strepe;

    }

    generatePadTekensGroot(streep_count = 100, scene: THREE.Scene) {

        let strepe = [];


        var tekenSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_teken_groot.png');
        var tekenMaterial = new THREE.MeshPhongMaterial({
            map: tekenSpriteMap,
            side: THREE.DoubleSide,
            transparent: true
        });
        tekenMaterial.map.magFilter = THREE.NearestFilter;

        var tekenGeometry = new THREE.PlaneGeometry(410, 250); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++) {
            let teken = new THREE.Mesh(tekenGeometry, tekenMaterial);
            teken.position.y = 115;
            teken.position.z = i * -1800;
            console.log(teken.position.z);
            scene.add(teken);
        }

        return strepe;

    }

    generateRandomSpoedTekens(streep_count = 100, scene: THREE.Scene) {

        let strepe = [];


        var tekenSpriteMap = new THREE.TextureLoader().load('/assets/images/pad_teken_spoed_blank.png');
        var tekenMaterial = new THREE.MeshPhongMaterial({
            map: tekenSpriteMap,
            side: THREE.DoubleSide,
            transparent: true
        });
        tekenMaterial.map.magFilter = THREE.NearestFilter;

        var tekenGeometry = new THREE.PlaneGeometry(30, 45); //new THREE.PlaneGeometry(10, 100, 2, 2);

        //create image



        tekenMaterial.map.magFilter = THREE.NearestFilter;

        var spoedNommerGeometry = new THREE.PlaneGeometry(30, 45); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < streep_count; i++) {

            var bitmap = document.createElement('canvas');
            var g = bitmap.getContext('2d');
            bitmap.width = 100;
            bitmap.height = 100;

            g.clearRect(0,0,100,100);
            g.font = 'Bold 26px Arial';
            g.fillStyle = 'black';

            var randomSpeed = Math.floor((Math.random()*30))*10 + "";
            g.fillText(randomSpeed, 0, 20);


            // canvas contents will be used for a texture
            var texture = new THREE.Texture(bitmap);
            texture.needsUpdate = true;

            var spoedNommerMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true
            });

            let spoedNommer = new THREE.Mesh(spoedNommerGeometry, spoedNommerMaterial);

            spoedNommer.position.x = 14 - (1.8 * randomSpeed.length);
            spoedNommer.position.y = -9;
            spoedNommer.position.z = 0.3;


            let teken = new THREE.Mesh(tekenGeometry, tekenMaterial);

            if (Math.random() < 0.5) {
                teken.position.x = 190;
            }else {
                teken.position.x = -170;
            }

            teken.position.y = 15;
            teken.position.z = i * -700;
            // console.log(teken.position.z);
            teken.add(spoedNommer);
            scene.add(teken);
        }

        return strepe;

    }

}

