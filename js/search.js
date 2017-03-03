var BASE_URL = 'https://api.sketchfab.com';
var searchForm = document.querySelector( 'form' );
var searchText = document.querySelector( 'input[type="text"]' );
var searchResults = document.querySelector( '.search-results' );

searchForm.addEventListener( 'submit', function ( e ) {
    e.preventDefault();
    onSearch();
    return false;
}, false );

document.addEventListener( 'click', function ( e ) {
    var parentLink = getAncestorElement( e.target, 'A', searchResults );
    if ( e.target && parentLink !== false ) {
        e.preventDefault();
        window.cep.util.openURLInDefaultBrowser( parentLink.getAttribute( 'href' ) );
    }
} );

function search( query ) {
    var url = BASE_URL + '/v3/search';
    return axios.get( url, {
        params: {
            q: query,
            type: 'models',
            features: 'downloadable'
        }
    } );
}

function onSearch() {
    var q = searchText.value;
    search( q ).then( function ( response ) {
        console.log( response );
        renderResults( response.data.results );
    } ).catch( function ( error ) {
        console.log( error );
    } );
}

function renderResults( results ) {
    var items = results.map( function ( result ) {

        var thumbnailUrl = result.thumbnails.images.reduce( function ( acc, current ) {
            if ( current.width <= 400 && acc === '' ) {
                return current.url;
            } else {
                return acc;
            }
        }, '' );

        return [
            '<li class="search-result">',
            '<a href="' + result.viewerUrl + '">',
            '<span class="thumb" style="background-image: url(\'' + thumbnailUrl + '\')"></span>',
            '<div class="info">',
            '<span class="info-name" title="' + result.name + '">' + result.name + '</span> ',
            '<span class="info-author">by ' + result.user.displayName + '</span>',
            '</div>',
            '</a>',
            '</li>'
        ].join( '' );
    } );
    searchResults.innerHTML = items.join( '' );
    searchResults.scrollTop = 0;
}

function getAncestorElement( el, tagname, limit ) {
    if ( el.nodeName === tagname ) return el;
    if ( el === limit ) return false;
    if ( el.parentNode ) return getAncestorElement( el.parentNode, tagname );
    return false;
}
