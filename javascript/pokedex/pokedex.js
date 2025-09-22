import pokedex from "/pokedex.json" with {type: "json"};

/*stampa il nome del primo pokemon*/
console.log(pokedex[0].name.english);

/*stampa i pokemon con hp >= a 80*/
let pokemon = [];
pokedex.forEach((item, i) => {
    if(item.base){
        if(item.base.HP>=80){
            pokemon.push({
                id: item.id,
                name: item.name.english,
                hp: item.base.HP
            });
        }
    }
});

console.log(pokemon);

let max = 0;
pokedex.forEach((item, i)=>{
    if(item.base){
        if(item.base.HP>max){
            max = item.base.HP
        }
    }
})
pokedex.forEach((item, i)=>{
    if(item.base){
        if(item.base.HP==max){
            console.log(item)
        }
    }
})


