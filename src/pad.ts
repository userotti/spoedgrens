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

    generateGround(ground_count = 100, scene: THREE.Scene) {

        let ground_block = [];


        var groundSpriteMap = new THREE.TextureLoader().load('/assets/images/ground.png');
        var groundMaterial = new THREE.MeshPhongMaterial({map: groundSpriteMap, side: THREE.DoubleSide});
        groundMaterial.map.magFilter = THREE.NearestFilter;

        var groundGeometry = new THREE.PlaneGeometry(500, 500); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < ground_count; i++) {
            for (let j = 0; j < 3; j++) {
                let ground = new THREE.Mesh(groundGeometry, groundMaterial);
                ground.position.z = i * -500;
                ground.position.y = -1;
                ground.position.x = -500 + (j * 500);

                ground.rotation.x = Math.PI / 2;
                scene.add(ground);
            }
        }



    }


    generateStraatLigte(lig_count = 100, scene: THREE.Scene) {

        let ligte = [];


        var straatligSpriteMap = new THREE.TextureLoader().load('/assets/images/straat_lig.png');
        var straatligMaterial = new THREE.MeshPhongMaterial({
            map: straatligSpriteMap,
            side: THREE.DoubleSide,
            transparent: true
        });
        straatligMaterial.map.magFilter = THREE.NearestFilter;

        var straatligGeometry = new THREE.PlaneGeometry(140, 140); //new THREE.PlaneGeometry(10, 100, 2, 2);


        for (let i = 0; i < lig_count ; i++) {
            let straat_lig = new THREE.Mesh(straatligGeometry, straatligMaterial);
            straat_lig.position.x = 220;
            straat_lig.position.y = 50;
            straat_lig.position.z = i * -180;
            scene.add(straat_lig);

            //headlights
            let lamp = new THREE.SpotLight( 0xdddeaa, 1.5);
            lamp.position.set( straat_lig.position.x - 160, straat_lig.position.y + 100, straat_lig.position.z );
            lamp.angle = Math.PI / 1.5;
            lamp.penumbra = 0.5;
            lamp.decay = 2;
            lamp.distance = 500;
            lamp.target.position.set(straat_lig.position.x, straat_lig.position.y, straat_lig.position.z - 10);
            lamp.target.updateMatrixWorld();
            scene.add(lamp);

        }

        return ligte;

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

            teken.position.y = 19;
            teken.position.z = i * -700;
            // console.log(teken.position.z);
            teken.add(spoedNommer);
            scene.add(teken);
        }

        return strepe;

    }

}

