const path = require('path')

module.exports = {
  entry : "./src/reName.ts",
  output : {
    filename : "app.js.bundle.js",
    path : path.resolve(__dirname, "dist")
  },
  module : {
    rules: [
      {
        test:/\.css$/, 
        use: ["style-loader", "css-loader"]
      },
      {
        test:/\.(js|jsx|ts|tsx) $/, 
        use:'babel-loader',
        exclude:/node_modules/,
      },
      {
        test:/\.(ts|tsx)$/, // ? 타입스크립트인지 확인 할거야
        use:'ts-loader',
        exclude:/node_modules/,
      }
    ]
  },
  resolve : {
    extensions : [".ts",".js",".jsx",".tsx",".css"]
  }
}