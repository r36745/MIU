// When Dom content is entered function will load. This event listener makes
// sure none of the data is run till Dom content is loaded
window.addEventListener("DOMContentLoaded", function(){
    // A function to call my create elements and get element by ID;shortcut
    function  getEle(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    function createEle(y) {
        var createElement = document.createElement(y);
        return createElement;
    }
    
    //Create a select(drop down)field element and populate w/ options
    function makeGstList() {
        var formTag = document.getElementsByTagName("form"); //formTag is an array of all the form tags
        var selectLi = getEle("wedGrp");
        var makeSelect = createEle("select");
        makeSelect.setAttribute("id", "groups");
        
        for(var i=0, j=wedGst.length; i<j; i++) {
            var makeOption = createEle("option");
            var optText = wedGst[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    function getSelectedRadio () {
        var radios = document.forms[0].dinnerOpt;
        for(var i=0; i<radios.length; i++) {
            if(radios[i].checked) {
                dinnerValue = radios[i].value;
            }
        }
    }
    
    function getCheckBoxValue () {
        if(getEle("wedPic").checked) {
            picValue = getEle("wedPic").value;
        }else{
            picValue = "No"
        }
    }
    function toggleControls(n) {
        switch(n) {
            case "on":
                getEle("wedGstList").style.display ="none";
                getEle("clearData").style.display ="inline";
                getEle("displayData").style.display ="none";
                getEle("newItem").style.display = "inline";
                break;
            case "off":
                getEle("wedGstList").style.display ="block";
                getEle("clearData").style.display ="inline";
                getEle("displayData").style.display ="inline";
                getEle("newItem").style.display = "none";
                getEle("items").style.display ="none";
                break;
            default:
                return false;
        }
    }
    
    function storeData() {
        var id                 = Math.floor(Math.random()*100000001);
        //Gather all form field values and store in a object
        //Make sure object properties contain an array w/ both the form label and input value
        getSelectedRadio ();
        getCheckBoxValue ();
        var item               = {};
            item.group         = ["Group:", getEle("groups").value];
            item.fname         = ["First Name:", getEle("fname").value];
            item.lname         = ["Last Name:", getEle("lname").value];
            item.email         = ["Email:", getEle("email").value];
            item.interest      = ["Interest:", getEle("slider").value];
            item.dinnerOpt     = ["Dinner option:", dinnerValue];
            item.picture       = ["Wedding Pic:", picValue];
            item.date          = ["Date:", getEle("date").value];
            item.comments      = ["Comments:", getEle("comments").value] 
            
            //Save data into Local Storage; using stringify, convert the
            //the objet to a string
            localStorage.setItem(id, JSON.stringify(item));
            alert("Contact Saved");
            
    }
    function getData() {
      toggleControls("on");
      if(localStorage.length ===0) {
        alert("There is no data in LocalStorage")
      }
        var makeDiv = createEle("div");
        makeDiv.setAttribute("id", "items");
        var makeList = createEle("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        getEle("items").style.display = "block";
        for(var i=0, j=localStorage.length; i<j; i++) {
            var makeLi = createEle("li");
            var linksLi = createEle("li");
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = createEle("ul");
            makeLi.appendChild(makeSubList);
            for(var n in obj) {
                var makeSubLi = createEle("li");
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);//Create our edit and and delete buttons/link for each item in local storage
            
        }
        
    }
    //This function will create the edit and delete links for each stored
    //item when displayed
    function makeItemLinks(key, linksLi) {
    //add edit single item link
    var editLink = createEle("a");
        editLink.href = "#";
    editLink.key = key;
    var editText = "Edit RSVP";
    editLink.addEventListener("click", editItem);
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);
    
    //add link break
    var breakTag = createEle("br");
    linksLi.appendChild(breakTag);
    
    // add delete single item link
    var deleteLink = createEle("a");
    deleteLink.href = "#";
    deleteLink.key = key;
    var deleteText = "Delete RSVP";
 //   deleteLink.addEventListener("click", deleteItem);
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);
        
    }
    
    function editItem() {
        //Grab the data from local storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //SHow the form
        toggleControls("off");
        
        //populate the form fields w/ current local Storage values
        getEle("groups").value = item.group[1];
        getEle("fname").value = item.fname[1];
        getEle("lname").value = item.lname[1];
        getEle("email").value = item.email[1];
        var radios = document.forms[0].dinnerOpt;
        for(var i=0; i<radios.length; i++) {
            if(radios[i].value == "Shrimp Alfredo" && item.dinnerOpt[1] =="Shrimp Alfredo") {
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Baked Chicken" && item.dinnerOpt[1] == "Baked Chicken") {
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Veggie Platter" && item.dinnerOpt[1] == "Veggie Platter") {
                radios[i].setAttribute("checked", "checked");
            }
        }
        if(item.picture[1] == "Yes"){
            getEle("wedPic").setAttribute("checked", "checked");
        }
        getEle("slider").value = item.interest[1];
        getEle("date").value = item.date[1];
        getEle("comments").value = item.comments[1];
        
        //Remove the inital listener from the input button
        save.removeEventListener("click", storeData);
        //Change Submit Button Value to Say Edit Button
        getEle("submit").value = "Edit RSVP";
        var editSubmit = getEle("submit");
        //Save the dey value established in this function as a property of the edit submit event
        //doing this so I can use this value when we save the data we edited
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
        
        
    }
    
    function clearLocal() {
        if(localStorage.length === 0) {
            alert("There is no data to clear");
        }else{
            localStorage.clear();
            alert("RSVP has been deleted");
            window.location.reload();
            return false;
        }
    }
    
    function validate() {
        
    }
 
    
    
    //Variable defaults
    var wedGst = ["--Choose One Selection--", "Family", "Friend", "Attendee"]; // Group 
    var dinnerValue; // Call this var in storeData and getSelectRadio function
    var picValue; // Call this var in storeData and getSelectRadio function
 
   makeGstList();
  
    //Variables for click Events
    var displayLink = getEle("displayData");
    displayLink.addEventListener("click",getData);
    var clearLink = getEle("clearData");
    clearLink.addEventListener("click", clearLocal);
    var save = getEle("submit")
    save.addEventListener("click", storeData);
    

    
    
    
    
});