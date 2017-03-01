To Setup
=======================
Change remote git url to what you will be using: [set-url doc](https://help.github.com/articles/changing-a-remote-s-url/)
```
git remote set-url origin git@github.com:USERNAME/YOURREPO.git

git remote -v  // Confirm new remote url
```

Instal modules
```
npm install
```


To Run
=======================
Development: including hot reloading
```
npm start
```

Production: generate assets to `/build` for deployment
```
npm run build
```

Then go to `http://localhost:8080/`
