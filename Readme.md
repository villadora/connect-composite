# express-composite

 Composite multi middlewares into one.

## Usage

```javascript
   app.use('/', require('express-composite')([middleware1, middleware2]);
   // or
   app.use('/', require('express-composite')(middleware1, middleware2, ...);
```
The middleware could be normal one like:

    function(req, res, next) {
        ...
    }

Or error handler:

    function(req, res, next) {
        ...
    }

Note: don't mix middleware and error hanlders together, like following:

     require('express-composite')(function(req, res, next) {...}, function(err, req, res, next) {...}); // Throw Error


## License

  MIT
