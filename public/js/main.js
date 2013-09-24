$(document).ready(function() {

});

    function getMenu(id) { // This event fires when a button is clicked
        
        $.ajax({ // ajax call starts
          url: '/get/restaurant/'+id+'/menu', // JQuery loads serverside.php
          dataType: 'json', // Choosing a JSON datatype
          success: function(data) // Variable data contains the data we get from serverside
          {
                
                /*var options ='<select name="restaurantmenu" class="">';
                for (var i = 0; i < data.length; i++) 
                {
                     options +=' <option value="'+data[i].id+'">'+data[i].id+'</option>';
                }
                options +='</select>';*/
                
                for (var i = 0; i < data.length; i++) 
                {
                    var options ='<div class="item">';
                    options +='<a href="#launch'+data[i].id+'" data-toggle="modal">';
                    options +='<img src="'+data[i].menu+'">';
                    options +='</a>';
                    options +='</div>';
                    options +='<section id="launch'+data[i].id+'" class="modal hide fade">';
                    options +='<div id="printThis">';
                    options +='<div class="modal-body">';
                    options +='<img src="'+data[i].menu+'">';
                    options +='</div>';
                    options +='</div>';
                    options +='</section>';
                    options +='<h4 class="text-center "> What will you prefer for you?</h4><ul><li><input id="rfirst" type="radio" name="cost" value="'+data[i].cost[0].Veg+'" checked="" hidden=""><label for="rfirst">Rs. '+data[i].cost[0].Veg+' - Veg</label></li><li><input id="rsecond" value="'+data[i].cost[0].Nonveg+'" type="radio" name="cost" hidden=""><label for="rsecond">Rs. '+data[i].cost[0].Nonveg+' - Non-Veg</label></li></ul>';
                     $("#menuid").val(data[i].id);
                     $("#amount").val(data[i].cost[0].Veg);
                }

                console.log(data[0].cost);
               $("#restaurantmenu").html(options);
               $('input[type=radio]').change(function(e) {
                if (this.id == 'rfirst') {
                    $("#amount").val(this.value);
                } else {
                    $("#amount").val(this.value);
                }
            });
                
          }
      });

    }
    
    
function getRestaurantByMenuType(menuType) { // This event fires when a button is clicked
        
        $.ajax({ // ajax call starts
          url: 'get/restaurants/menu/'+menuType, // JQuery loads serverside.php
          dataType: 'json', // Choosing a JSON datatype
          success: function(data) // Variable data contains the data we get from serverside
          {
                $('#restaurant').empty();
                if(data.length==0 && menuType!="Party")
                {
                     $("#menutimeinfo").html("Oops we can't find any "+menuType+" restaurants at this time")
                    $('#restaurantmenu').empty();
                } 
                $('#restaurant').append(new Option("Select a Restaurant", 0));     
                for (var i = 0; i < data.length; i++) 
                {
                     $('#restaurant').append(new Option(data[i].restName, data[i].restId));
                }
          }
      });

    }
    
function updateRestaurant(value)
{
    var menuType;
    value = value.split(" ");
    value[0]=value[0].split(":");
    value[0][0] = parseInt(value[0][0]);
    value[0][1] = parseInt(value[0][1]);
    console.log(value[0][0]);
    if (value[0][0] >= 7 && value[0][0] <= 11 && value[1]=="AM")
    {
        menuType="Breakfast";
        
    }
    else if (value[0][0] >= 11 && value[0][0] <= 12 && value[1]=="AM")
    {
        menuType="Brunch";
    }
    else if ((value[0][0] >= 1 && value[0][0] <= 4 && value[1]=="PM") || (value[0][0] == 12 && value[1]=="PM"))
    {
        menuType="Lunch";
    }    
    else if (value[0][0] >= 4 && value[0][0] <= 6 && value[1]=="PM")
    {
        menuType="Tea-Time";
    }
    else if (value[0][0] >= 7 && value[0][0] <= 11 && value[1]=="PM")
    {
        menuType="Dinner";
    }
    else if (value[0][0] >= 11 && value[0][0] <= 12 && value[1]=="PM")
    {
        menuType="Dinner";
    }
    else if (value[0][0] <= 6 && value[1]=="AM")
    {
        menuType="Party";
    }
    console.log(menuType);
    getRestaurantByMenuType(menuType);
    if(menuType!="Party")
        $("#menutimeinfo").html("Its time to select your "+menuType+" menu.")
    else
        $("#menutimeinfo").html("Oops you seems to be a "+menuType+" geek. Sorry No restaurants available.")
}

