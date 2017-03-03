( function () {
    console.log( "onLoaded called" );
    var csInterface = new CSInterface();
    var appName = csInterface.hostEnvironment.appName;
    var gExtensionId = "com.sketchfab.search.SearchPanel";

    updateThemeWithAppSkinInfo( csInterface.hostEnvironment.appSkinInfo );
    csInterface.addEventListener( CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged );

    // Extension persistence https://www.davidebarranca.com/2014/02/html-panels-tips-9-persistence/
    var event = new CSEvent( "com.adobe.PhotoshopPersistent", "APPLICATION" );
    event.extensionId = gExtensionId;
    csInterface.dispatchEvent( event );

    function onAppThemeColorChanged( event ) {
        var skinInfo = JSON.parse( window.__adobe_cep__.getHostEnvironment() ).appSkinInfo;
        updateThemeWithAppSkinInfo( skinInfo );
    }

    function updateThemeWithAppSkinInfo( appSkinInfo ) {
        var panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
        document.body.dataset.bg = "bg" + toHex( panelBackgroundColor );
    }

    function toHex( color, delta ) {
        function computeValue( value, delta ) {
            var computedValue = !isNaN( delta ) ? value + delta : value;
            if ( computedValue < 0 ) {
                computedValue = 0;
            } else if ( computedValue > 255 ) {
                computedValue = 255;
            }

            computedValue = computedValue.toString( 16 );
            return computedValue.length == 1 ? "0" + computedValue : computedValue;
        }

        var hex = "";
        if ( color ) {
            with( color ) {
                hex = computeValue( red, delta ) + computeValue( green, delta ) + computeValue( blue, delta );
            };
        }
        return hex;
    }
} )();
