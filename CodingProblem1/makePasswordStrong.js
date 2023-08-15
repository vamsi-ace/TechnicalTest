/*
If the length of string is 3 or less, only insertion is needed;
If the length is 4, two insertions and might one replacement are needed;
if the length is 5, one insertion and might two replacements are needed.
So it's easy to solve for the case that length is less than 6: Math.Max(requiredChar, 6 - s.Length); The requiredChar is at most 3.

For the case, 6<=length<=20, only replacements are needed.

If length is greater than 20, only replacements and deletions are needed.
For the case of a repeated substring which length is mutiple of 3 (note 3n, e.g. "aaa"), then one deletion will save a replacement to fix it;
For the case of a repeated substring which length is mutiple of 3 plus 1 (note 3n+1, e.g. "aaaa"), then two deletions will save a replacement to fix it;
For the case of a repeated substring which length is mutiple of 3 plus 2 (note 3n+2, e.g. "aaaaa"), then three deletions will save a replacement to fix it;

That is.
 */

var minStepsToStrongPassword = function(password) {
    var s = password;
    var requiredChar = GetRequiredChar(s);
    if (s.length < 6) return Math.max(requiredChar, 6 - s.length);

    // only need replacement and deletion now when s.Length >= 6
    var replace = 0; // total replacements for repeated chars. e.g. "aaa" needs 1 replacement to fix
    var oned = 0; // total deletions for 3n repeated chars. e.g. "aaa" needs 1 deletion to fix
    var twod = 0; // total deletions for 3n+1 repeated chars. e.g. "aaaa" needs 2 deletions to fix.

    for (var i = 0; i < s.length;) {
        var len = 1; // repeated len
        while (i + len < s.length && s[i + len] == s[i + len - 1]){
            len++;
        }
        if (len >= 3) {
            replace += Math.floor(len / 3); // Fix: Use Math.floor to get integer replacements
            if (len % 3 == 0) oned += 1;
            if (len % 3 == 1) twod += 1; // Fix: Use 1 instead of 2
        }
        i += len;
    }

    // no need deletion when s.Length <= 20
    if (s.length <= 20) return Math.max(requiredChar, replace);

    var deleteCount = s.length - 20;
    
    // deleting 1 char in (3n) repeated chars will save one replacement
    replace -= Math.min(deleteCount, oned);

    // deleting 2 chars in (3n+1) repeated chars will save one replacement
    replace -= Math.min(Math.max(deleteCount - oned, 0), twod * 2); // Fix: Multiply twod by 2

    // deleting 3 chars in (3n+2) repeated chars will save one replacement
    replace -= Math.max(deleteCount - oned * 2, 0) / 3; // Fix: Multiply oned by 2

    return deleteCount + Math.max(requiredChar, replace);
};

var GetRequiredChar = function(s) {
    var lowercase = 1, uppercase = 1, digit = 1;
    
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c >= 'a' && c <= 'z') lowercase = 0;
        else if (c >= 'A' && c <= 'Z') uppercase = 0;
        else if (c >= '0' && c <= '9') digit = 0;
    }

    return lowercase + uppercase + digit;
};

function testPasswordStrengthChecker() {
    console.log(minStepsToStrongPassword("aaaaaaaaaaaaaaaaaaaaa")); //  output: 5
    console.log(minStepsToStrongPassword("aaa111")); //  output: 2
    console.log(minStepsToStrongPassword("..................!!!")); //  output: 7
    console.log(minStepsToStrongPassword("bbaaaaaaaaaaaaaaacccccc")); //  output: 8
    console.log(minStepsToStrongPassword("aaaaabbbb1234567890ABA")); //  output: 3
    console.log(minStepsToStrongPassword("1Abababcaaaabababababa")); //  output: 2
  }
  
  testPasswordStrengthChecker();
