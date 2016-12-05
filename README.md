# aurelia-mdl-dialog
Aurelia wrapper for [Material Design Lite's Dialog](https://getmdl.io/components/#dialog-section) component.

Work in progess!

## Releasing

1. update version in *package.json* file

2. build the project
```bash
npm run build
```

3. commit the changes
```bash
git commit -m "Release $$version$$"
```

4. tag the commit
```bash
git tag -a v$$version$$ -m "Release $$version$$"
```

5. push the commit and the tag
```bash
git push origin master v$$version$$
```

6. 

7. publish package to NPM
```bash
npm publish --tag beta
```