
async function getRestfromCoord()
{
 
  const resList = await fetch("https://developers.zomato.com/api/v2.1/search?entity_type=zone&start=0&count=20&lat=30.73&lon=76.78&radius=3000&sort=real_distance&order=asc",{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}});
  const Json = await resList.json();
  console.log(Json);
  return Json;

}



function populateRestList(JsonData)
{


    for(let i=0;i<JsonData.restaurants.length;i++)
    {

        var elem0 = document.createElement('div');
elem0.classList.add('card', 'text-center');
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
elem5.setAttribute('src', JsonData.restaurants[i].restaurant.featured_image);
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
var txtnode = document.createTextNode('('+JsonData.restaurants[i].restaurant.user_rating.votes +' Reviews)');
elem10.appendChild(txtnode);
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
var txtnode = document.createTextNode('Price(for 2) : '+ JsonData.restaurants[i].restaurant.currency + 'Cuisines : '+ JsonData.restaurants[i].restaurant.average_cost_for_two);
elem19.appendChild(txtnode);
elem18.appendChild(elem19);
elem15.appendChild(elem18);
var elem20 = document.createElement('div');
elem20.classList.add('card-text');
var elem21 = document.createElement('span');
var txtnode = document.createTextNode('Cuisines : '+ JsonData.restaurants[i].restaurant.cuisines);
elem21.appendChild(txtnode);
elem20.appendChild(elem21);
elem15.appendChild(elem20);
elem8.appendChild(elem15);
elem7.appendChild(elem8);
elem6.appendChild(elem7);
var elem22 = document.createElement('div');
elem22.classList.add('row');
var elem23 = document.createElement('div');
elem23.classList.add('col-6');
var elem24 = document.createElement('a');
elem24.setAttribute('href', 'restinfo.html?res-id='+JsonData.restaurants[i].restaurant.R.res_id);
elem24.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');
var txtnode = document.createTextNode('View Details');
elem24.appendChild(txtnode);
elem23.appendChild(elem24);

var elem25 = document.createElement('div');
elem25.classList.add('col-6');
var elem26 = document.createElement('button');
elem26.setAttribute('data-phone', JsonData.restaurants[i].restaurant.phone_numbers);
elem26.classList.add('btn', 'btn-success', 'btn-lg', 'btn-block', 'call-button');
var txtnode = document.createTextNode('Call');
elem26.appendChild(txtnode);
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




async function main(){

    const results = await getRestfromCoord();

    populateRestList(results);


}

main()