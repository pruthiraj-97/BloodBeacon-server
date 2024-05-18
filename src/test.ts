const bloodGroup = new Map([
    ['A+', 0],
    ['A-', 0],
    ['B+', 0],
    ['B-', 0],
    ['AB+', 0],
    ['AB-', 0],
    ['O+', 0],
    ['O-', 0]
]);
const group='S+'
if(bloodGroup.has(group)){
    bloodGroup.set(group,20)
}else{
    console.log("key not found")
}

console.log(bloodGroup.get('A+')); // Output: 20
