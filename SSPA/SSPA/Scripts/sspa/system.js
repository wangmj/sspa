define(["jquery"], function ($) {
    var system = {
        defer: function (action) {
            if (action)
                return $.Deferred(action);
            else
                return $.Deferred();
        },
        acquire: function () {
            var first = arguments[0]
                , modules
                , arrayRequest = false;
            if (system.isArray(first)) {
                modules = first;
                arrayRequest = true;
            }
            else
                modules = Array.prototype.slice.call(arguments, 0);

            return this.defer(function (dfd) {
                require(modules, function () {
                    var args = arguments;
                    setTimeout(function () {
                        if (args.length > 1 && arrayRequest)
                            dfd.resolve(Array.prototype.slice.call(args, 0));
                        else
                            dfd.resolve.apply(dfd, Array.prototype.slice.call(args,0));
                    })
                }, function (err) {
                    dfd.reject(err);
                });
            }).promise();

        }
    };
    var isChecks = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Array'];

    function makeIsFunction(name) {
        var value = '[object ' + name + ']';
        system['is' + name] = function (obj) {
            return Object.prototype.toString.call(obj) == value;
        };
    }

    for (var i = 0; i < isChecks.length; i++) {
        makeIsFunction(isChecks[i]);
    }


    return system;
})