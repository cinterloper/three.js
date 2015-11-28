/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ImageLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.ImageLoader.prototype = {

	constructor: THREE.ImageLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var cached = THREE.Cache.get( url );

		if ( cached !== undefined ) {

			scope.manager.itemStart( url );

			if ( onLoad ) {

				setTimeout( function () {

					onLoad( cached );

					scope.manager.itemEnd( url );

				}, 0 );

			} else {

				scope.manager.itemEnd( url );

			}

			return cached;

		}

		var image = new WebGL.Image();

		image.onload = function ( event ) {
			THREE.Cache.add( url, this );

			if ( onLoad ) onLoad( this );

			scope.manager.itemEnd( url );

		}

		scope.manager.itemStart( url );

		image.src = url;

		return image;

	},

	setCrossOrigin: function ( value ) {

	//	this.crossOrigin = value;

	}

};
