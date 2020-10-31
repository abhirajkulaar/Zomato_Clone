
async function main()
{
 
  const resList = await fetch("https://developers.zomato.com/api/v2.1/search?entity_type=zone&start=0&count=20&lat=30.73&lon=76.78&radius=3000&sort=real_distance&order=asc",{headers:{"user-key":"1649b13790f5b99b538c830ee66e73af"}});
  const Json = await resList.json();
  console.log(Json)

}

main()