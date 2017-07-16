var MarvelApiService = (function () {
    /**
     * Marvel Api Service Constructor
     * @todo get values from configuration file.
     * @constructor
     */
    function MarvelApiService($q,$http) {
        this.q = $q;
        this.http = $http;
        // Set API default values
        this.apiOffset = 20;
        this.apiLimit = 20;
        // Set API configuration values
        this.marvelPublicKey = '475b5b01ea45bee45da8447573deeb30';
        this.marvelPrivateKey = '93d33b6e7433ae4400651279ebf55e7004243df7';
        this.marvelBaseUri = 'http://gateway.marvel.com/v1/public/';
    }

    /**
     * Format an URL included paginator and token.
     * Paginator was create by limit and offset (by page number).
     * Token has this format : Timestap + private Key + public Key.
     * @param $path
     * @param $nbPage
     * @returns {string}
     */
    MarvelApiService.prototype.formatUrl = function($path, $nbPage = 1){
        let formattedPath = this.marvelBaseUri + $path;

        let timestamp = Math.round(+new Date() / 1000);
        formattedPath += '?ts=' + timestamp;

        formattedPath += '&offset=' +  ($nbPage * this.apiOffset);

        formattedPath += '&limit=' + this.apiLimit;

        formattedPath += '&apikey=' + this.marvelPublicKey;

        let hashKey = timestamp + this.marvelPrivateKey + this.marvelPublicKey;

        formattedPath += '&hash=' + md5(hashKey);

        console.log(formattedPath);

        return formattedPath;
    };

    /**
     * Get the list of comics
     * @returns {string}
     */
    MarvelApiService.prototype.getComicListByPage = function ($nbPage = 1) {

        let comicsPath = this.formatUrl('comics', $nbPage);

        this.http.get(comicsPath).
        success(function(data, status, headers, config) {
            console.log('success');
            console.log(data);
            console.log('youpi');
            return data.results;
        });

    };

    /**
     * Get the list of characters by page (20 items by page)
     * http://gateway.marvel.com:80/v1/public/characters?limit=20&offset=20&apikey=
     * @returns {string}
     */
    MarvelApiService.prototype.getCharactersListByPage = function ($nbPage = 1) {

        let comicsPath = this.formatUrl('characters', $nbPage);

        let defer = this.q.defer();

        this.http.get(comicsPath).
        success(function(data, status, headers, config) {
            defer.resolve(data.data);
        });

        return defer.promise;
    };

    /**
     * Get details of character by Id
     * http://gateway.marvel.com:80/v1/public/characters/199?limit=20&offset=20&apikey=
     * @returns {string}
     */
    MarvelApiService.prototype.getCharactersDetailsById = function ($persoId = 1) {

        let comicsPath = this.formatUrl('characters/'+ $persoId, 1);

        let defer = this.q.defer();

        this.http.get(comicsPath).
        success(function(data, status, headers, config) {
            defer.resolve(data.data.results[0]);
        });

        return defer.promise;

    };

    return MarvelApiService;
})();

angular.module('marvel').service('$marvelApiService', ['$q','$http', function($q,$http) { return new MarvelApiService($q,$http); }]);