define(["sspa/system", "sspa/composition"], function (system, composition) {
    var app = {
        /**
        * @param path:string,root path
        * @param appHostElement:htmlElement Or htmlElement id
        */
        setRoot: function (path, appHostElement) {
            var hostElement
                , setting = {};
            if (!appHostElement || system.isString(appHostElement))
                hostElement = document.getElementById(appHostElement || "appHost");
            else
                hostElement = appHostElement;
            if (system.isString(path)) {
                setting.model = path;
                setting.view = path;
            }
            composition.compose(hostElement, setting);
        }
    };

    return app;
})