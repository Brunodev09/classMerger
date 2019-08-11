/* Tool built with the purpose of merging two classes that possess some values in common but with different key props */

class ClassMerger {

    constructor() {
        this.fClass = null;
        this.sClass = null;
        /*Specify the order of each property that is going to be merged with the other class.*/
        /*[[1,2],[2,1]]*/
        /*The above PAIR means, VALUE of class 1 into property of class 2*/
        /*The value can be set as anything as long as you have a correspondent in the first class*/
        this.orderVector = null;

        this.fKeys = null;
        this.sKeys = null;

        this.fVals = null;
        this.sVals = null;

        this.entries = [];

    }


    setFirst(object) {
        if (!object || typeof object !== "object") throw new Error("This is not a class to merge!");
        this.fClass = object;
        this.fKeys = Object.keys(this.fClass);
        this.fVals = Object.values(this.fClass);
    }

    setSecond(object) {
        if (!object || typeof object !== "object") throw new Error("This is not a class to merge!");
        this.sClass = object;
        this.sKeys = Object.keys(this.sClass);
        this.sVals = Object.values(this.sClass);
    }

    setVector(vec) {
        if (!vec || vec.length < this.fKeys.length || vec.length > this.sKeys.length) throw new Error("Invalid vector type or size!");
        if (!vec[0].length) throw new Error("This input is not a matrix!");
        this.orderVector = vec;
    }

    merge() {
        const PAIR = 2;

        if (!this.orderVector || !this.fClass || !this.sClass) throw new Error("Cannot merge without all settings!");

        for (let i = 0; i < this.orderVector.length; i++) {
            this.entries[i] = new Array(PAIR);
        }

        for (let i = 0; i < this.sKeys.length; i++) {
            this.entries[i][0] = this.sKeys[this.orderVector[i][1]];
            this.entries[i][1] = this.fVals[this.orderVector[i][0]];
        }

        let object = {};
        for(let i in this.entries) object[this.entries[i][0]] = this.entries[i][1];

        return object;
    }

    reset() {
        this.orderVector = null;
        this.fClass = null;
        this.sClass = null;
        this.fKeys = null;
        this.sKeys = null;
        this.fVals = null;
        this.sVals = null;
    }

    get ALL_CLASSES() {
        return {class1: this.fClass, class2: this.sClass}
    }

    get FIRST_SET() {
        return {class1: this.fClass}
    }

    get SECOND_SET() {
        return {class1: this.sClass}
    }


}


module.exports = ClassMerger;