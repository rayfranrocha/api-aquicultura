module.exports = {
    logErrors: (err, req, res, next) => {
        console.log('Error log', err.statck);
        next(err)
    }
};