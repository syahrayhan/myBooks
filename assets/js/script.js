document.addEventListener("DOMContentLoaded", function () {
  if(isStorageExist()){
    loadDataFromStorage()
  }
});
const submitForm /* HTMLFormElement */ = document.getElementById("inputBook");

submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addBook();
});

document.addEventListener("ondatasaved", ()=> {
    console.log("Success data saved")
})

document.addEventListener("ondataloaded", ()=>{
    refreshDataFromBooks()
})
