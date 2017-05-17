define(["sspa/system", "jquery","knockout"], function (system, $,ko) {
    var locator = {
        viewPlugin: 'text',
        viewExtension: '.html',
        getOrignViewAndviewModel: function (setting) {
            var viewpath = this.translateViewIdToViewPath(setting.view);
            return system.defer(function (dfd) {
                system.acquire(viewpath, setting.model).done(function (view, model) {
                    dfd.resolve(view, model);
                }).fail(function (err) {
                    dfd.reject(err);
                }).promise();
            });
        },
        translateViewIdToViewPath: function (viewid) {
            return this.viewPlugin + "!" + viewid + this.viewExtension;
        }
    };
    var composition = {
        /**
        * @param element: container Element
        * @param setting:{obj},{view,model}
        */
        compose: function (element, setting) {
            locator.getOrignViewAndviewModel(setting).done(function (view, viewModel) {
                var $view = composition.parseMarkup(view);
                composition.bindAndShow(element, $view, viewModel);
            }).fail(function (err) {
                console.error(err);
            });
        },
        bindAndShow: function (parentElement, childElement, childViewModel) {
            $(parentElement).empty();
            $(parentElement).append(childElement);
            ko.applyBindings(childViewModel, childElement);
        },
        parseMarkup: function (html) {
            if ($.parseHTML) {
                return $.parseHTML(html)[0];
            } else {
                $(html).get(0);
            }
        }
    };

    return composition;
})