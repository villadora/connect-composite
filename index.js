
/**
 * Composite `middlewares` 
 *
 * @return {Function}
 */

module.exports = function(params){
    var middlewares  = (params instanceof Array) ? params : arguments;

    if(!middlewares.length) return function(req, res, next) {
        next();
    }; // empty middleware
    
    errorHandler = middlewares[0].length === 4;

    for(var i = 1, len = middlewares.length; i < len; ++i) {
        if ((errorHandler && middlewares[i].length !== 4)
            || (!errorHandler && middlewares[i].length === 4)) {
            throw new Error("Don't mix middleware and error handling together");
        }
    }

    if(errorHandler) {
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
                if(err || index === middlewares.length)
                    return next(err);
                try {
                    middlewares[index++](req, res, newNext);
                }catch(e) {
                    newNext(e);
                }
            }
            
            newNext();
        };
    }
};
