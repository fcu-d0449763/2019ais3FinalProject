var port = browser.runtime.connect({name: "panel"});
var tabId = browser.devtools.inspectedWindow.tabId;
var input, output, type, comment;
var MD5 = new Hashes.MD5;
var SHA1 = new Hashes.SHA1;
var SHA256 = new Hashes.SHA256;
functions = {
    "md5": function(s) {
        return MD5.hex(s);
    },
    "sha1": function(s) {
        return SHA1.hex(s);
    },
    "sha256": function(s) {
        return SHA256.hex(s);
    },
    "rot13":function(s){
        var arr = [];
        for(var i=0;i<s.length;++i){
            var ch=s.charAt(i);
            if(/^[A-Z]$/i.test(ch)){
                if(ch == ch.toUpperCase()){
                    arr.push(String.fromCharCode((ch.charCodeAt()-65+13)%26+65));
                }else{
                    arr.push(String.fromCharCode((ch.charCodeAt()-97+13)%26+97));
                }
            }else{
                arr.push(ch);
            }
        }
        return arr.join('');
    },
    "base64encode": function(s) {
        return btoa(s);
    },
    "base64decode": function(s) {
        return atob(s);
    },
    "urlencode": function(s) {
        return encodeURIComponent(s);
    },
    "urldecode": function(s) {
        return decodeURIComponent(s);
    },
    "ascii2hex": function(s) {
        var arr = [];
        for (var i = 0, l = s.length; i < l; i ++) {
            var hex = Number(s.charCodeAt(i)).toString(16);
            arr.push(hex);
        }
        return arr.join('');
    },
    "hex2ascii":function(s) {
        var hex = s.toString();
        var str = '';
        for (var i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    },
    "ascii2Bin":function(s) {
        var result = [];
        for (var i = 0; i < s.length; i++) {
            result.push(s.charCodeAt(i));
        }
        return result;
      },
      "toUpper":function(s){
        return s.toString().toUpperCase();
      },
      "toLower":function(s){
        return s.toString().toLowerCase();
      }
}
function convert(event) {
    output.value = functions[type.value](input.value);
}
document.addEventListener("DOMContentLoaded", () => {
    input = document.querySelector("#input");
    output = document.querySelector("#output");
    type = document.querySelector("#convert");
    comment = $("#comment");
    input.addEventListener("keyup", convert);
    type.addEventListener("change", convert);
});