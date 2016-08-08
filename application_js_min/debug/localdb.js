/*
This file defines a global object called localDB which stores objects as json strings and can  be queried using json query.
*/
var localDB = {
    contains: function (strDatabase, strKey) {
        var strDBKey = this.makeKey(strDatabase, strKey);
        return localStorage.hasOwnProperty(strDBKey);
    },
    get: function (strDatabase, strKey) {
        var strDBKey = this.makeKey(strDatabase, strKey);
        var strValue = localStorage.getItem(strDBKey)
        if (strValue)
            return JSON.parse(strValue);
        return null;
    },
    set: function (strDatabase, strKey, valueToStore) {
        if (strKey) {
            var strDBKey = this.makeKey(strDatabase, strKey);
            localStorage.setItem(strDBKey, JSON.stringify(valueToStore));
        }
    },
    remove: function (strDatabase, strKey) {
        var strDBKey = this.makeKey(strDatabase, strKey);
        localStorage.removeItem(strDBKey);
    },
    makeKey: function (strDatabase, strKey) {
        return strDatabase + ':' + strKey;
    },
    query: function (strDatabase, strCriteria) {
        var arrRet = [];
        var arrRecords = this.values(strDatabase);
        for (var iIndex = 0; iIndex < arrRecords.length; ++iIndex) {
            if (this.isMatch(arrRecords[iIndex], strCriteria))
                arrRet.push(arrRecords[iIndex]);
        }
        return arrRet;
    },
    isMatch: function (obj, strCriteria) {
        if (obj) {
            if (eval(strCriteria))
                return true;
        }
        return false;
    },
    keys: function (strDatabase) {
        var arrRet = [];
        for (var strKey in localStorage) {
            var arrParts = strKey.split(':', 2);
            if (arrParts[0] == strDatabase)
                arrRet.push(arrParts[1]);
        }
        return arrRet;
    },
    values: function (strDatabase) {
        var arrRet = [];
        for (var strKey in localStorage) {
            var arrParts = strKey.split(':', 2);
            if (arrParts[0] == strDatabase)
                arrRet.push(JSON.parse(localStorage.getItem(strKey)));
        }
        return arrRet;
    },
    removeAll: function (strDatabase) {
        var iCount = 0;
        for (var strKey in localStorage) {
            var arrParts = strKey.split(':', 2);
            if (arrParts[0] == strDatabase) {
                localStorage.removeItem(strDBKey);
                ++iCount;
            }
        }
        return iCount;
    }
};