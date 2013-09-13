
/**
 * Composite `middlewares` 
 *
 * @param {Array} middlewares
 * @return {Function}
 */

module.exports = function(middlewares){
    if(!(middlewares instanceof Array))
        middlewares = arguments;

    var args;
    for(var i = 0, len = middlewares.length; i < len; ++i) {
        if(!args) {
            args = middlewares[i].length;
        }else if(args !== middlewares[i].length) {
            throw new Error("Don't mix middleware and error handling together");
        }
    }

    if(args === 4) {
        return function(err, req, res, next){
            var index = 0;
            function newNext(err) {
                if(index === middlewares.length)
                    return next(err);

                try {
                    middlewares[index++](err, req, res, newNext);
                }catch(e) {
                    newNext(e);
                }
            }
            newNext(err);
        };
    }else {
        return function(req, res, next) {
            var index = 0;
            function newNext(err) {
                if(index === middlewares.length)
                    return next(err);
                try {
                    middlewares[index++](req, res, newNext);
                }catch(e) {
                    newNext(e);
                }
            }
            
            newNext(err);
        };
    }
};
