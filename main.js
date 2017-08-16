/** @module utils */

const uncurryN = require('ramda/src/uncurryN');
const pipe = require('ramda/src/pipe');
const map = require('ramda/src/map');
const tap = require('ramda/src/tap');
const apply = require('ramda/src/apply');
let defaultPath = './';

// var addFour = a => b => c => d => a + b + c + d;

// var uncurriedAddFour = R.uncurryN(4, addFour);
// uncurriedAddFour(1, 2, 3, 4); //=> 10

/**
* |         function        |         result                                |
* | ----------------------- |         -------------------------------------- |
* | R.uncurryN(2,           |         R.pipe(                      |
* | R.pipe(                 |         R.tap(login.gotoLogin),      |
* | R.map(R.tap),           |         R.tap(login.typeId),         |
* | R.apply(R.pipe)         |         R.tap(login.clickPassword)   |
* | ));                     |         );
*/
exports.runPipe = uncurryN(2,
  pipe(
    map(tap),
    apply(pipe)
  )
);

// pipe的輸入等於上一個的輸出
// tap的輸入什麼就輸出什麼
// map輸入array輸出為Array
//
// step1:
//   R.map =>
//   [R.tap(login.gotoLogin),
//   R.tap(login.typeId),
//   R.tap(login.clickPassword),
//   R.tap(login.typePassword),
//   R.tap(login.waitItembox),
//   R.tap(login.clickLogin),
//   R.tap(tutorial.clickSkip),
//   R.tap(login.getCookie)]

// step2:
// R.pipe(
//   R.tap(login.gotoLogin),
//   R.tap(login.typeId),
//   R.tap(login.clickPassword),
//   R.tap(login.typePassword),
//   R.tap(login.waitItembox),
//   R.tap(login.clickLogin),
//   R.tap(tutorial.clickSkip),
//   R.tap(login.getCookie)
//)

// step3:
// SC001(nightmare);
// R.tap(login.gotoLogin('http://172.17.28.213', '8082'))(nightmare) -> 輸出 nightmare
// 輸入 nightmare -> R.tap(login.typeId('admin')(nightmare) -> 輸出 nightmare,

// step4
// exports.gotoLogin = (url, port) => runTask({
//   name: `前往${url}:${port}`,
//   action: (nightmare) => nightmare.goto(`${url}:${port}/ns/login`),
// })

class CatchThenError {
  constructor(e){
    this.origin = e;
  }
}

/**
* options -> nightmare -> it 
* @param {Object} taskOptions
*
* |         options         | args                                   |
* | ----------------------- | -------------------------------------- |
* | name                    | it(name)                               |
* | action                  | nightmare.wait or nightmare.click      |
* | catch                   | default nightmare.screenshot           |
* | catchThen               | self invoking function                 |
*/
exports.runTask = (taskOptions) => (nightmare) => it(taskOptions.name, (done) => {
  const c = taskOptions.catch ? 
    (e) => taskOptions.catch(done, e, nightmare) :
    (e) => 
      nightmare
        .html(`${defaultPath}${taskOptions.name}.mhtml`, 'MHTML')  
        .screenshot(`${defaultPath}${taskOptions.name}.png`)
        .then(() => taskOptions.catchThen ? 
          Promise.reject(new CatchThenError(e)) :
          done(e)
        )
  taskOptions
    .action(nightmare)
    .then(() => done())
    .catch(c)
    .catch((e) => {
      if (e instanceof CatchThenError) {
        taskOptions.catchThen(done, e.origin, nightmare)
      } else {
        throw e
      }
    });
})

/**
 * It is to set your snapshot path
 */
exports.setSnapshotPath = (path) => {
  defaultPath = path;
}