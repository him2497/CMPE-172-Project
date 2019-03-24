# React Boilerplate Setup

## Installing
1. Clone the repo
```
git clone https://github.com/him2497/ReactBoilerPlate.git
```

2. Get rid of git configurations

```
rm -rf .git && git init
```

3. Install the dependencies:
```
npm install
```

4. Change name of the application:

 - Change the name of the application in **src/index.html** under the title.
 - Change the name of the application in **package.json** under name.

## Commands to run the boilerplate

5. Start the webpack-dev-server
```
npm run start
```

6. Build the application for production

``` 
npm run build
```

### Additional Configurations

- To change the port of the application go into **package.json** under scripts and start change the port value to your liking currently it is set to port 5000. 