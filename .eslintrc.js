module.exports = {
    "parser": "babel-eslint", 
    "extends": "airbnb",  
    "rules": {    
        "no-magic-numbers": 0,    
        "react/prefer-es6-class": 0,    
        //"react/no-multi-comp": 0, // a 0 permet de desactiver le fait d'avoir plusieurs class par fichier    
        "linebreak-style": 0,    
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],    
        "react/forbid-prop-types": 0,    
        "react/jsx-curly-brace-presence": [0, { "props": "ignore", "children": "ignore" }],    
        "jsx-a11y/anchor-is-valid": [ "error", {      
            "components": [ "Link" ],      
            "specialLink": [ "to", "hrefLeft", "hrefRight" ],      
            "aspects": [ "noHref", "invalidHref", "preferButton" ]    
    }]  
    },  
    "env": {    
        "browser": true,    
        "es6": true,    
        "node": true,  
    },  
    "plugins": [    
        "babel",    
        "import",  
        "react-hooks"
    ]};
    