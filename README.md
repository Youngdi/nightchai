# NightChai

### Description
  - 1.) It is base on End to End test tool "[nightmare](https://github.com/segmentio/nightmare)"
  - 2.) A try catch plugin to help you write custom try catch funcion or you can use default screenshot function
  - 3.) easy to read
  - 4.) less code
  - 5.) We use [Ramda](http://ramdajs.com/) to build it 
***

# Installation

```sh
$ npm install nightchai
```

***

# usage
#### runPipe()
It is to combine your test case(it)
```sh
|         function        |         result                       |
| R.uncurryN(2,           |         R.pipe(                      |
| R.pipe(                 |         R.tap(login.gotoLogin),      |
| R.map(R.tap),           |         R.tap(login.typeId),         |
| R.apply(R.pipe)         |         R.tap(login.clickPassword)   |
| ));                     |         );
```
```sh
const { runPipe } = require('nightchai');
    const SC001 = runPipe([
      login.gotoLogin(url, port),
      login.typeId('admin'),
      login.clickPassword,
    ]);
    SC001(nightmare);
```


#### runTask(taskOptions)
It is to return it which can help you write less code of it. And each one is represnt a test case(it)
options -> nightmare -> it 

|         options         | args                                   |
| ----------------------- | -------------------------------------- |
| name                    | it(name)                               |
| action                  | nightmare.wait or nightmare.click      |
| catch                   | default nightmare.screenshot           |
| catchThen               | self invoking function                 |

```sh
const { runTask } = require('nightchai');
exports.typeId = (username) => runTask({
  name:'輸入帳號',
  action: (nightmare) => nightmare.type('input#idInput', username),
  catch:(done, e, nightmare) => {
    //over write the default catch
    nightmare
      .html(`${path}${taskOptions.name}.mhtml`, 'MHTML')  
      .screenshot(`${path}${taskOptions.name}.png`)
      .then(() => taskOptions.catchThen ? 
        Promise.reject(new CatchThenError(e)) :
        done(e)
      )
    done();
  },
  catchThen: (done, e, nightmare) => {
    nightmare
    .html('./reports/error.mhtml', 'MHTML')  
    .screenshot('./reports/error.png');
    done(e);
  }
});
```
#### setSnapshotPath(path)
It is to set your snapshot path
|         path         | 
| ----------------------- | 
| string                  | 
```sh
const { setSnapshotPath } = require('nightchai');
setSnapshotPath('./reports/');
```
License
----
MIT

