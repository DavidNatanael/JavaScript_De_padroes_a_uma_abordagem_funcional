if (!Array.prototype.$flatMap) {
    Array.prototype.$flatMap = function (callBack) {
        return this.map(callBack).reduce((destArray, array) =>
            destArray.concat(array), []);
    };
}