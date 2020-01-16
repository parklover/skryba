/**

 */
var AjaxHandler = /** @class */ (function () {
    /**
     * Constructor for Ajax class
     * @param  {PdfViewer} pdfviewer
     * @returns defaultType
     * @private
     */
    function AjaxHandler(pdfviewer) {
        /**
         * Specifies the URL to which request to be sent.
    
         */
        this.type = 'POST';
        /**
         * A boolean value indicating whether the request should be sent asynchronous or not.
    
         * @private
         */
        this.mode = true;
        /**
         * Specifies the ContentType to which request to be sent
    
         * @private
         */
        this.contentType = 'application/json;charset=UTF-8';
        this.pdfViewer = pdfviewer;
    }
    /**
     * Send the request to server
     * @param  {object} jsonObj - To send to service
     * @private
     */
    AjaxHandler.prototype.send = function (jsonObj) {
        var _this = this;
        this.httpRequest = new XMLHttpRequest();
        if (!this.mode) {
            setTimeout(function () { _this.sendRequest(jsonObj); });
        }
        else {
            this.sendRequest(jsonObj);
        }
        this.httpRequest.onreadystatechange = function () { _this.stateChange(_this); };
        this.httpRequest.onerror = function () { _this.error(_this); };
    };
    AjaxHandler.prototype.sendRequest = function (jsonObj) {
        this.httpRequest.open(this.type, this.url, this.mode);
        this.httpRequest.setRequestHeader('Content-Type', this.contentType);
        this.setCustomAjaxHeaders();
        if (this.responseType !== null) {
            this.httpRequest.responseType = this.responseType;
        }
        this.httpRequest.send(JSON.stringify(jsonObj)); // jshint ignore:line
    };
    AjaxHandler.prototype.stateChange = function (proxy) {
        var status = proxy.httpRequest.status;
        var statusString = status.toString().split('')[0];
        if (proxy.httpRequest.readyState === 4 && status === 200) {
            // tslint:disable-next-line
            var data = void 0;
            if (this.responseType !== null) {
                data = proxy.httpRequest.response;
            }
            else {
                data = proxy.httpRequest.responseText;
            }
            // tslint:disable-next-line
            var result = {
                name: 'onSuccess',
                data: data,
                readyState: proxy.httpRequest.readyState,
                status: proxy.httpRequest.status
            };
            proxy.successHandler(result);
        }
        else if (proxy.httpRequest.readyState === 4 && (statusString === '4' || statusString === '5')) { // jshint ignore:line)
            // For handling 4xx and 5xx errors.
            // tslint:disable-next-line
            var result = {
                name: 'onFailure',
                status: proxy.httpRequest.status,
                statusText: proxy.httpRequest.statusText
            };
            proxy.failureHandler(result);
        }
    };
    AjaxHandler.prototype.error = function (proxy) {
        // tslint:disable-next-line
        var result = {
            name: 'onError',
            status: this.httpRequest.status,
            statusText: this.httpRequest.statusText
        };
        proxy.errorHandler(result);
    };
    // tslint:disable-next-line
    AjaxHandler.prototype.successHandler = function (response) {
        if (this.onSuccess) {
            this.onSuccess(response);
        }
        return response;
    };
    // tslint:disable-next-line
    AjaxHandler.prototype.failureHandler = function (response) {
        if (this.onFailure) {
            this.onFailure(response);
        }
        return response;
    };
    // tslint:disable-next-line
    AjaxHandler.prototype.errorHandler = function (response) {
        if (this.onError) {
            this.onError(response);
        }
        return response;
    };
    AjaxHandler.prototype.setCustomAjaxHeaders = function () {
        for (var i = 0; i < this.pdfViewer.ajaxRequestSettings.ajaxHeaders.length; i++) {
            // tslint:disable-next-line:max-line-length
            this.httpRequest.setRequestHeader(this.pdfViewer.ajaxRequestSettings.ajaxHeaders[i].headerName, this.pdfViewer.ajaxRequestSettings.ajaxHeaders[i].headerValue);
        }
    };
    return AjaxHandler;
}());
export { AjaxHandler };
