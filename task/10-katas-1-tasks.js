'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    var sides = ['N','E','S','W'], arr = [], abbr = '', az = 11.25, temp = 0, res = [];
    var countSides = (function(){
      let count = 0;
      return function(){
        return count++;
      }
    }());
    for (var i = 0; i <32; i++) {
      if(i === 0){ //0,8
         arr[i] = sides[temp];
       }
       if (i % 4 < 2 && i !== 0 ){
         if(temp === 0 || temp === 1 || temp === 2) arr[i] = arr[i-1] + 'b' + sides[temp + 1];  //1,5
         else arr[i] = arr[i-1] + 'b' + sides[0];
       }
       if (i % 4 === 0 && i !== 0 && i % 8 !== 0){
         if(temp === 0 || temp === 2 )arr[i] = sides[temp] + sides[temp + 1];//4
         if(temp === 1) arr[i] = arr[i] = sides[temp+1] + sides[temp];//4
         if(temp === 3) arr[i] = arr[i] = sides[0] + sides[temp];//4
       }
       if (i % 8 === 2 && i !== 0){//2
         if(temp === 0 || temp === 2 )arr[i] = sides[temp] + sides[temp] + sides[temp+1];
         if(temp === 1) arr[i] = sides[temp] + sides[temp+1] + sides[temp];
         if(temp === 3)  arr[i] = sides[temp] + sides[0] + sides[temp];
       }
       if (i % 8 === 3 && i !== 0){
         if(temp === 0 || temp === 2 ) arr[i] = sides[temp] + sides[temp+1] + 'b' + sides[temp];//3
         if(temp === 1) arr[i] = sides[temp+1] + sides[temp] + 'b' + sides[temp];//3
         if(temp === 3) arr[i] = sides[0] + sides[temp] + 'b' + sides[temp];//3
       }
       if (i % 8 === 6 && i !== 0){
         if(temp === 0 || temp === 2 ) arr[i] = sides[temp+1] + sides[temp] + sides[temp+1];//6
         if(temp === 1) arr[i] = sides[temp+1] + sides[temp+1] + sides[temp];//6
         if(temp === 3) arr[i] = sides[0] + sides[0] + sides[temp];//6
       }
       if (i % 8 === 7 && i !== 0){
         if(temp === 0 || temp === 1 || temp === 2) arr[i] = sides[temp+1] + 'b' + sides[temp];//7
         else arr[i] = sides[0] + 'b' + sides[temp];//7
       }
       if (i % 8 === 0){ //0,8
         temp =  countSides();
          arr[i] = sides[temp];

        }
    }
    temp = -11.25;
    for (var i = 0; i < arr.length; i++) {
      let obj ={
        abbreviation: '',
        azimuth: temp
      };
      obj.abbreviation = arr[i];
      obj.azimuth += az;
      res[i] = obj;
      temp = obj.azimuth;
    }
    return res;
}




/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    throw new Error('Not implemented');
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
  this.height = n;
this.width = n;

this.mtx = [];
for (var i = 0; i < n; i++)
    this.mtx[i] = [];

var i=1, j=1;
for (var e = 0; e < n*n; e++) {
    this.mtx[i-1][j-1] = e;
    if ((i + j) % 2 == 0) {
        if (j < n) j ++;
        else       i += 2;
        if (i > 1) i --;
    } else {
        // Odd stripes
        if (i < n) i ++;
        else       j += 2;
        if (j > 1) j --;
    }
}
return this.mtx;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
  let temp = true, tempTile;
  for (var i = 1; i < dominoes.length; i++) {
    if(temp === false) break;
    if(dominoes[i][0] === dominoes[i-1][1] ||
       dominoes[i][0] === dominoes[i-1][0] ||
       dominoes[i][1] === dominoes[i-1][0] ||
       dominoes[i][1] === dominoes[i-1][1]
     )temp = true;
     else {
       temp = false;
     }
  }
  return temp;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    throw new Error('Not implemented');
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
