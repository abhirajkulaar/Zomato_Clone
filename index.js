//Function to get location of user via GeoLocation API and set as global window variables
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
           
           window.latitude=location.coords.latitude;
           window.longitude=location.coords.longitude;
           $('#countryModal').modal('hide');
          });
    } else {
      return;
    }
  }


//Adds auto-complete suggestions to the Country Selection Field
function attachAutoCompleteCountry()
{

    document.querySelector("#countrySearch").addEventListener("input",async (e)=>
    {
    console.log(e.target.value)
    if(e.target.value.length<3){return;}
    const locatSuggestion = await fetch("https://restcountries.eu/rest/v2/name/"+e.target.value)
    const json = await locatSuggestion.json();
    console.log(json)


        
        let arr = json
        var a, b, i, val = e.target.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", e.target.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        e.target.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
         
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].name + "</strong>";
            b.setAttribute("data-lat",arr[i].latlng[0]);
            b.setAttribute("data-long",arr[i].latlng[1]);
        
           
            /*insert a input field that will hold the current array item's value:*/
            
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                window.latitude=e.target.dataset.lat;
                window.longitude=e.target.dataset.long;
        
                closeAllLists();
                $("#countryModal").modal('hide')
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                
            });
            a.appendChild(b);
          
        }
    










}
    )



}

//THis function takes a restaurant result Json from Zomato API response and populates in DOM
function populateRestList(JsonData)
{
    document.getElementById("retaurant-container").innerHTML=""

    if(JsonData.restaurants.length==0)
    {
        var elem0 = document.createElement('div');
        elem0.classList.add('card', 'text-center','rest-card');
        var elem1 = document.createElement('div');
        elem1.classList.add('card-header');
        var txtnode = document.createTextNode( "Oops! Seems there are no results for your search query");
        elem1.appendChild(txtnode);
        elem0.appendChild(elem1);
        document.getElementById("retaurant-container").appendChild(elem0);
    }
    for(let i=0;i<JsonData.restaurants.length;i++)
    {

        var elem0 = document.createElement('div');
elem0.classList.add('card', 'text-center','rest-card');
var elem1 = document.createElement('div');
elem1.classList.add('card-header');
var txtnode = document.createTextNode( JsonData.restaurants[i].restaurant.establishment.join(" - "));
elem1.appendChild(txtnode);
elem0.appendChild(elem1);
var elem2 = document.createElement('div');
elem2.classList.add('card-body');
var elem3 = document.createElement('div');
elem3.classList.add('row');
var elem4 = document.createElement('div');
elem4.classList.add('col', 'col-12', 'col-md-4', 'col-lg-4');
var elem5 = document.createElement('img');
let img_source = JsonData.restaurants[i].restaurant.featured_image;
if (img_source==undefined||img_source==""){img_source="photos/missing.jpg"}
elem5.setAttribute('src', img_source);
elem5.classList.add('img-fluid', '${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}');
elem5.setAttribute('alt', '');
elem4.appendChild(elem5);
elem3.appendChild(elem4);
var elem6 = document.createElement('div');
elem6.classList.add('col');
var elem7 = document.createElement('div');
elem7.classList.add('row');
var elem8 = document.createElement('div');
elem8.classList.add('col-12');
var elem9 = document.createElement('h3');
elem9.classList.add('card-title');
var txtnode = document.createTextNode(JsonData.restaurants[i].restaurant.name);
elem9.appendChild(txtnode);
elem8.appendChild(elem9);
var elem10 = document.createElement('h5');
var elem11 = document.createElement('b');   
var txtnode = document.createTextNode('Rating: ' + JsonData.restaurants[i].restaurant.user_rating.aggregate_rating);
elem11.appendChild(txtnode);
elem10.appendChild(elem11);
var reviewButton=document.createElement('a')
reviewButton.innerHTML='('+JsonData.restaurants[i].restaurant.user_rating.votes +' Reviews)';
reviewButton.href="javascript:void(0)"
reviewButton.addEventListener("click",showReviews);
reviewButton.setAttribute("data-res_id",JsonData.restaurants[i].restaurant.R.res_id)


elem10.appendChild(reviewButton);
elem8.appendChild(elem10);
var elem12 = document.createElement('p');
elem12.classList.add('card-text');
var elem13 = document.createElement('div');
elem13.classList.add('font-weight-bold');
var txtnode = document.createTextNode(JsonData.restaurants[i].restaurant.location.locality_verbose);
elem13.appendChild(txtnode);
elem12.appendChild(elem13);
var elem14 = document.createElement('div');
var txtnode = document.createTextNode(JsonData.restaurants[i].restaurant.location.address);
elem14.appendChild(txtnode);
elem12.appendChild(elem14);
elem8.appendChild(elem12);
var elem15 = document.createElement('p');
elem15.classList.add('card-text');
var elem16 = document.createElement('div');
elem16.classList.add('card-text');
var elem17 = document.createElement('span');
var txtnode = document.createTextNode('Cuisines : '+ JsonData.restaurants[i].restaurant.cuisines);
elem17.appendChild(txtnode);
elem16.appendChild(elem17);
elem15.appendChild(elem16);
var elem18 = document.createElement('div');
elem18.classList.add('card-text');
var elem19 = document.createElement('span');
var txtnode = document.createTextNode('Price(for 2) : '+ JsonData.restaurants[i].restaurant.currency + ' '+ JsonData.restaurants[i].restaurant.average_cost_for_two);
elem19.appendChild(txtnode);
elem18.appendChild(elem19);
elem15.appendChild(elem18);
var elem20 = document.createElement('div');
elem20.classList.add('card-text');
var elem21 = document.createElement('span');
var txtnode = document.createTextNode('Highlights : '+ JsonData.restaurants[i].restaurant.highlights.join(","));
elem21.appendChild(txtnode);
elem20.appendChild(elem21);
elem15.appendChild(elem20);
elem8.appendChild(elem15);
elem7.appendChild(elem8);
elem6.appendChild(elem7);
var elem22 = document.createElement('div');
elem22.classList.add('row',"card-buttons");
var elem23 = document.createElement('div');
elem23.classList.add('col-6');
var elem24 = document.createElement('a');
elem24.setAttribute('href', JsonData.restaurants[i].restaurant.url);
elem24.setAttribute('target', "_blank");
elem24.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');
var txtnode = document.createTextNode('View Details');
elem24.appendChild(txtnode);
elem23.appendChild(elem24);

var elem25 = document.createElement('div');
elem25.classList.add('col-6');
var elem26 = document.createElement('button');
elem26.setAttribute('data-phone', JsonData.restaurants[i].restaurant.phone_numbers);
elem26.setAttribute('data-name', JsonData.restaurants[i].restaurant.name);
elem26.classList.add('btn', 'btn-success', 'btn-lg', 'btn-block', 'call-button');
var txtnode = document.createTextNode('Call');
elem26.appendChild(txtnode);
elem26.addEventListener("click",showPhoneModal)
elem25.appendChild(elem26);
elem22.appendChild(elem25);
elem22.appendChild(elem23);
elem6.appendChild(elem22);
elem3.appendChild(elem6);
elem2.appendChild(elem3);
elem0.appendChild(elem2);
var elem27 = document.createElement('div');
elem27.classList.add('card-footer', 'text-muted');
var txtnode = document.createTextNode(JsonData.restaurants[i].restaurant.timings);
elem27.appendChild(txtnode);
elem0.appendChild(elem27);
document.getElementById("retaurant-container").appendChild(elem0);





    }

}

//Function to show the phone number modal
function showPhoneModal(e)
{
    $('#phoneModal').modal('show');
    document.querySelector("#phoneModalTitle").innerText=e.target.dataset.name
    document.querySelector("#phoneModalDetails").innerText=e.target.dataset.phone
}

//Triggered when review details button is pressed
async function showReviews(e){

    console.log(e.target.dataset.res_id)

    const reviewsList = await fetch("https://developers.zomato.com/api/v2.1/reviews?res_id="+e.target.dataset.res_id+"&start=0&count=5",{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}})
    const reviewsJson = await reviewsList.json()
    document.getElementById("restReviewContainer").innerHTML='';
    document.getElementById("reviewModalTitle").innerText="Reviews"
    for(let i=0;i<reviewsJson.user_reviews.length;i++)
    {

    var elem0 = document.createElement('div');
elem0.classList.add('row', 'review-block');
var elem1 = document.createElement('div');
elem1.classList.add('col-sm-3');
var elem2 = document.createElement('img');
elem2.setAttribute('src', reviewsJson.user_reviews[i].review.user.profile_image);
elem2.classList.add('img-rounded');
elem1.appendChild(elem2);
var elem3 = document.createElement('div');
elem3.classList.add('review-block-name');
var elem4 = document.createElement('a');
elem4.setAttribute('href', reviewsJson.user_reviews[i].review.user.profile_url);
var txtnode = document.createTextNode(reviewsJson.user_reviews[i].review.user.name);
elem4.appendChild(txtnode);
elem3.appendChild(elem4);
elem1.appendChild(elem3);
var elem5 = document.createElement('div');
elem5.classList.add('review-block-date');
var elem6 = document.createElement('br');
var txtnode = document.createTextNode(reviewsJson.user_reviews[i].review.review_time_friendly);
elem6.appendChild(txtnode);
elem5.appendChild(elem6);
elem1.appendChild(elem5);
var elem7 = document.createElement('div');
elem7.classList.add('col-sm-9');
var elem8 = document.createElement('div');
elem8.classList.add('review-block-title');
var txtnode = document.createTextNode(reviewsJson.user_reviews[i].review.rating_text);
elem8.appendChild(txtnode);
var ratingScore = document.createElement("div");
ratingScore.classList.add("review-block-rate")

let starClass;

if(reviewsJson.user_reviews[i].review.rating<=1)
{
starClass="btn-danger"
}
if(reviewsJson.user_reviews[i].review.rating>1&&reviewsJson.user_reviews[i].review.rating<=3)
{
starClass="btn-warning"
}

if(reviewsJson.user_reviews[i].review.rating>=4)
{
starClass="btn-success"
}

for(let j=0;j<5;j++)
{
    let star =document.createElement("button");
    star.classList.add("btn","btn-xs","btn-review")
    if(j<=reviewsJson.user_reviews[i].review.rating)
    {star.classList.add(starClass)}
    else{star.classList.add("btn-secondary")}
    ratingScore.appendChild(star);
}



elem7.appendChild(ratingScore)
elem7.appendChild(elem8);
var elem9 = document.createElement('div');
elem9.classList.add('review-block-description');
var txtnode = document.createTextNode(reviewsJson.user_reviews[i].review.review_text);
elem9.appendChild(txtnode);
elem7.appendChild(elem9);

elem0.appendChild(elem1);
elem0.appendChild(elem7);
document.getElementById("restReviewContainer").appendChild(elem0);
    }
$('#reviewModal').modal('show');


}









//Adds auto-complete suggestions to the Location Selection Field
function attachAutoCompleteLocation()
{

    document.querySelector("#locationSearch").addEventListener("input",async (e)=>
    {
    console.log(e.target.value)
    if(e.target.value.length<3){closeAllLists();return;}
    const locatSuggestion = await fetch("https://developers.zomato.com/api/v2.1/locations?query="+e.target.value+"&lat="+window.latitude+"&lon="+window.longitude+"&count=5",{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}})
    const json = await locatSuggestion.json();
    console.log(json)


        
        let arr = json.location_suggestions
        var a, b, i, val = e.target.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", e.target.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        e.target.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          
         
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =  arr[i].title 
            b.setAttribute("data-entity_id",arr[i].entity_id);
            b.setAttribute("data-entity_type",arr[i].entity_type);
            b.setAttribute("data-latitude",arr[i].latitude);
            b.setAttribute("data-longitude",arr[i].longitude);
           
            /*insert a input field that will hold the current array item's value:*/
            
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                window.latitude=e.target.dataset.latitude
                window.longitude=e.target.dataset.longitude
                document.querySelector("#locationSearch").setAttribute("data-entity_id",e.target.dataset.entity_id)
                document.querySelector("#locationSearch").setAttribute("data-entity_type",e.target.dataset.entity_type)
                document.querySelector("#locationSearch").setAttribute("data-latitude",e.target.dataset.latitude)
                document.querySelector("#locationSearch").setAttribute("data-longitude",e.target.dataset.longitude)
                document.querySelector("#locationSearch").value = e.target.innerText;
                closeAllLists();
                applySelectLocation();
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                
            });
            a.appendChild(b);
          
        }
    










}
    )



}


//Adds auto-complete suggestions to the Restaurant Selection Field
function attachAutoCompleteRestaurant()
{

    document.querySelector("#restSearch").addEventListener("input",async (e)=>
    {

    e.target.dataset.rest_id="unset"
    if(e.target.value.length<3){closeAllLists();return;}
    let sortBy = document.querySelector("#orderBy").value
    let sortOrder = document.querySelector("#orderVal").value

    let entityID= document.querySelector("#locationSearch").dataset.entity_id
    let entityType=document.querySelector("#locationSearch").dataset.entity_type
    let json={};
    if(entityID!=undefined){
    const locatSuggestion = await fetch("https://developers.zomato.com/api/v2.1/search?entity_id="+entityID+"&entity_type="+entityType+"&q="+e.target.value+"&start=0&count=7&radius=3000&sort="+sortBy+"&order="+sortOrder,{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}})
     json = await locatSuggestion.json();
}
    else
    {
        const locatSuggestion = await fetch("https://developers.zomato.com/api/v2.1/search?lat="+window.latitude+"&lon="+window.longitude+"&q="+e.target.value+"&start=0&count=7&radius=3000&sort="+sortBy+"&order="+sortOrder,{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}})
         json = await locatSuggestion.json();

    }

    
    console.log(json)


        
        let arr = json;
        var a, b, i, val = e.target.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", e.target.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        e.target.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.restaurants.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
         
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr.restaurants[i].restaurant.name + "</strong>" + ", " +arr.restaurants[i].restaurant.location.locality_verbose;
            b.setAttribute("data-rest_name",arr.restaurants[i].restaurant.name);
            b.setAttribute("data-rest_id",arr.restaurants[i].restaurant.id);
 
           
            /*insert a input field that will hold the current array item's value:*/
            
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                document.querySelector("#restSearch").setAttribute("data-rest_name",e.target.dataset.rest_name)
                document.querySelector("#restSearch").setAttribute("data-rest_id",e.target.dataset.rest_id)
                document.querySelector("#restSearch").value = e.target.innerText;
                closeAllLists();
                applySelectRestaurant();
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                
            });
            a.appendChild(b);
          
        }
    










}
    )



}

//Shows Restaurants for selected Locations
async function  applySelectLocation(){




    let sortBy = document.querySelector("#orderBy").value
    let sortOrder = document.querySelector("#orderVal").value

    let entityID= document.querySelector("#locationSearch").dataset.entity_id
    let entityType=document.querySelector("#locationSearch").dataset.entity_type

    const resList = await fetch("https://developers.zomato.com/api/v2.1/search?entity_type="+entityType+"&entity_id="+entityID+"&start=0&count=20&radius=3000&sort="+sortBy+"&order="+sortOrder,{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}});
  const Json = await resList.json();

  populateRestList(Json)

 }

//Shows  Restaurants  for selected fields
async function applySelectRestaurant(){
    closeAllLists()
    let lat = document.querySelector("#locationSearch").dataset.latitude;
    let long = document.querySelector("#locationSearch").dataset.longitude;
    if(lat==undefined){
        lat=window.latitude;
        long=window.longitude;
    }
    let restid =document.querySelector("#restSearch").dataset.rest_id
    let qval = document.querySelector("#restSearch").value
    let sortBy = document.querySelector("#orderBy").value
    let sortOrder = document.querySelector("#orderVal").value
    let json = {};
    if(restid==undefined||restid=="unset")
    {
    const locatSuggestion = await fetch("https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+long+"&q="+qval+"&start=0&count=20&radius=3000&sort="+sortBy+"&order="+sortOrder,{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}})
     json = await locatSuggestion.json();}
    else{
        const locatSuggestion = await fetch("https://developers.zomato.com/api/v2.1/restaurant?res_id="+restid,{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}})
        let rjson = await locatSuggestion.json();
         
        json.restaurants=[];
        json.restaurants.push({restaurant:rjson})
    }
    //https://developers.zomato.com/api/v2.1/search?entity_id=5401&entity_type=subzone&q=red&start=0&count=6&radius=3000&sort=cost&order=asc

    
    populateRestList(json)

}


//closes all auto-complete suggestions
function closeAllLists() {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (true ) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}   


//Main driver function
function main(){


    window.latitude=0;
    window.longitude=0;

    $('#countryModal').modal({backdrop: 'static', keyboard: false})  
    //show country select modal
    $('#countryModal').modal('show');
    getLocation()
    //attach applt selected query to Go button
    document.querySelector("#restSearchForm").addEventListener("submit",()=>applySelectRestaurant())

    attachAutoCompleteLocation()
attachAutoCompleteRestaurant()
attachAutoCompleteCountry()


}

main()