var THREE = require('node.three.js'),
	TrackballControls = require('./misc/TrackballControls');

var camera, scene, renderer, controls,
particle1, particle2, particle4, particle4, particle5, particle6,
light1, light2, light3, light4, light5, light6;

var FAR = 300;

var clock = new THREE.Clock();

init();
animate();

function init() {

	// CAMERA

	camera = new THREE.PerspectiveCamera( 50, 800 / 600, 1, FAR );
	camera.position.set( 0, 15, 150 );
	camera.lookAt( new THREE.Vector3() );

	// SCENE

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x040306, 10, FAR );

	// CONTROLS

	var fly = false;

	if ( !fly ) {

		controls = new TrackballControls( camera );
		controls.target.set( 0, 0, 0 );

		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;

		controls.noZoom = false;
		controls.noPan = false;

		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.15;

		controls.keys = [ 65, 83, 68 ];

	} else {

		controls = new THREE.FirstPersonControls( camera );

		controls.movementSpeed = 25;
		controls.lookSpeed = 0.05;
		controls.lookVertical = true;

		controls.lon = -90;

	}


	// TEXTURES

	var texture = THREE.ImageUtils.loadTexture( "res/img/disturb.jpg" );
	texture.repeat.set( 20, 10 );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.format = THREE.RGBFormat;

	var texture2 = THREE.ImageUtils.loadTexture( "res/img/moon_1024.jpg" );
	texture2.repeat.set( 2, 1 );
	texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
	texture2.format = THREE.RGBFormat;

	// MATERIALS

	var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, ambient: 0x444444, map: texture } );
	var objectMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, ambient: 0x111111, specular: 0xffffff, metal: true, map: texture2 } );

	// GROUND

	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 800, 400, 2, 2 ), groundMaterial );
	mesh.position.y = -5;
	mesh.rotation.x = - Math.PI / 2;
	scene.add( mesh );

	// OBJECTS

	//var objectGeometry = new THREE.BoxGeometry( 0.5, 1, 1 );
	//var objectGeometry = new THREE.SphereGeometry( 1.5, 16, 8 );
	var objectGeometry = new THREE.TorusGeometry( 1.5, 0.4, 8, 16 );

	for ( var i = 0; i < 5000; i ++ ) {

		var mesh = new THREE.Mesh( objectGeometry, objectMaterial );

		mesh.position.x = 400 * ( 0.5 - Math.random() );
		mesh.position.y = 50 * ( 0.5 - Math.random() ) + 25;
		mesh.position.z = 200 * ( 0.5 - Math.random() );

		mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
		mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );

		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();
		scene.add( mesh );

	}

	// LIGHTS

	scene.add( new THREE.AmbientLight( 0x111111 ) );

	var intensity = 2.5;
	var distance = 100;
	var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
	//var c1 = 0xffffff, c2 = 0xffffff, c3 = 0xffffff, c4 = 0xffffff, c5 = 0xffffff, c6 = 0xffffff;

	var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );

	light1 = new THREE.PointLight( c1, intensity, distance );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
	scene.add( light1 );

	light2 = new THREE.PointLight( c2, intensity, distance );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
	scene.add( light2 );

	light3 = new THREE.PointLight( c3, intensity, distance );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
	scene.add( light3 );

	light4 = new THREE.PointLight( c4, intensity, distance );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
	scene.add( light4 );

	light5 = new THREE.PointLight( c5, intensity, distance );
	light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
	scene.add( light5 );

	light6 = new THREE.PointLight( c6, intensity, distance );
	light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
	scene.add( light6 );

	var dlight = new THREE.DirectionalLight( 0xffffff, 0.1 );
	dlight.position.set( 0.5, -1, 0 ).normalize();
	scene.add( dlight );

	// RENDERER

	renderer = new THREE.WebGLRenderer( { antialias: false, width: 800, height: 600 } );
	renderer.setClearColor( scene.fog.color, 1 );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	//

	THREE.document.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize(e) {

	camera.aspect = e.width / e.height;
	camera.updateProjectionMatrix();

	renderer.setSize( e.width, e.height );

	controls.handleResize(e);

}

//

function animate() {

	THREE.requestAnimationFrame( animate );

	render();

}

function render() {

	var time = Date.now() * 0.00025;
	var z = 20, d = 150;

	light1.position.x = Math.sin( time * 0.7 ) * d;
	light1.position.z = Math.cos( time * 0.3 ) * d;

	light2.position.x = Math.cos( time * 0.3 ) * d;
	light2.position.z = Math.sin( time * 0.7 ) * d;

	light3.position.x = Math.sin( time * 0.7 ) * d;
	light3.position.z = Math.sin( time * 0.5 ) * d;

	light4.position.x = Math.sin( time * 0.3 ) * d;
	light4.position.z = Math.sin( time * 0.5 ) * d;

	light5.position.x = Math.cos( time * 0.3 ) * d;
	light5.position.z = Math.sin( time * 0.5 ) * d;

	light6.position.x = Math.cos( time * 0.7 ) * d;
	light6.position.z = Math.cos( time * 0.5 ) * d;

	controls.update( clock.getDelta() );

	renderer.render( scene, camera );

}
