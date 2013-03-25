// Steven Roseman
// MIU
// Term 1303
// Project 3


function  getEle(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    function createEle(y) {
        var createElement = document.createElement(y);
        return createElement;
    }

$('home').on('pageinit', function(){
	
});

$('aboutUs2').on('pageinit', function(){
	
});

$('news').on('pageinit', function(){
	
});

$('#addWed').on('pageinit', function(){

		var myForm = $('#wedForm');
                var errorsLink = $('#errorsLink');
		    myForm.validate({
                        invalidHandler: function(form, validator) {
                         errorsLink.click();
                        var html = '';
                        for(var key in validator.submitted){
                        var label = $('label[for^="'+ key +'"]').not('[generated]');
                        var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                        var fieldName = legend.length ? legend.text() : label.text();
                        html += '<li>' + fieldName + '</li>';

                        };
                        $("#recordErrors ul").html(html);
                        },
                        submitHandler: function() {
                            
                            var data = myForm.serializeArray();
                            storeData(data);
                            
                        }
                    });
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};



function storeData(data){
    var id                      = Math.floor(Math.random()*1000000001);
    
    var item                    ={};
        item.group              =["Group", getEle('wedGrp').value];
        item.fname              =["First Name", getEle('fname').value];
        item.lname              =["Last Name", getEle('lname').value];
        item.email              =["Email", getEle('email').value];
        item.dinnerOpt          =["Dinner Choice", dinnerValue];
        item.picture            =["Picture", getEle('funPic1').value];
        
        localStorage.setItem(id, JSON.stringify(item));
        alert("contact saved");
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


var dinnerValue;






