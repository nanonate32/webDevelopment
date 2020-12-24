let recipeData;
loadData();
function loadData(numberOfItems = 1){
    fetch('https://raw.githubusercontent.com/zealousAnemone/botw-recipes/master/openFlame.json')
    .then(response => response.json())
    .then(data => printItems(data,numberOfItems));
  
}
function printItems(itemData,numberOfItems){
recipeData=itemData;
let items = itemData.data;
for(let j=0;j<numberOfItems; j++ ){


let dropdown = document.createElement("select");
//dropdown.id = "dropdown" + j;
dropdown.setAttribute("id","ingredient" + j );
document.getElementById("recipePanel").appendChild(dropdown);
for(let i=0; i<items.length; i++){
 //console.log(items[i].item);
 let itemName = items[i].item;
 let newElement = document.createElement("option");
 newElement.value = i;
newElement.innerHTML=itemName;
dropdown.appendChild(newElement); 
}
}
}
let quantity = document.getElementById("itemQuantity");
quantity.addEventListener("input",updateDropdowns);
function updateDropdowns(inputElement){
let selectElements = document.getElementsByTagName("select");
for(let i=selectElements.length-1; i>=0; i--){
    selectElements[i].parentNode.removeChild(selectElements[i]);

}
let numberOfItems = inputElement.target.value;

loadData(numberOfItems);

}
function getRecipe(){
    let selectionElements = document.getElementsByTagName("select");
let selections = [];
for(let i = 0; i<selectionElements.length; i++){
    //selections.push(selectionElements[i].options);
    let index = selectionElements[i].selectedIndex;
    selections.push(selectionElements[i].options[index].text);
}
checkRecipes(selections);
}
function checkRecipes(selectedItems){
    fetch('https://raw.githubusercontent.com/joeyfigaro/zelda-json/master/recipes/max-hearts.json')
    .then(response => response.json())
    .then(data => recipeSearch(data,selectedItems));
  
}
function recipeSearch(recipeData, selectedItems){
    for(let i = 0; i<recipeData.length; i++){
        let recipe = recipeData[i];
        let variations = recipe.variations;
        for(let j = 0; j<variations.length; j++ ){
            let materials = variations[j].materials;
            if(compareMaterials(materials,selectedItems)){
            alert(recipe.name);

            }
        }
    }
}
function compareMaterials(recipeMaterials, selectedItems){
    if(recipeMaterials.length != selectedItems.length){
        return false;
    }
    
    recipeMaterials.sort();
    selectedItems.sort();
    for(let i = 0; i<recipeMaterials.length; i++){
        if(selectedItems[i].toLowerCase() != recipeMaterials[i]){
            return false;
        }

}
return true;
}
