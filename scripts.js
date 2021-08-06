var section = document.querySelector('section');

var requestURL = 'https://raw.githubusercontent.com/TimDuschenes/Peppers/main/peppers.json';
//This json is keyed by heat level
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var data = request.response;
  showPeppers(data);
  accordion();
}

function showPeppers(data){
  Object.keys(data).forEach(function(key) {
    var list = data[key];
    console.log(list);

    var group = document.createElement('div');
    group.className = "group";
    group.setAttribute('id', 'Group-' + key);

    var groupName = document.createElement('h4');
    groupName.className = "groupName";
    groupName.textContent = key;
    group.appendChild(groupName);
    
    for (var i = 0; i < list.length; i++) { 

      var set = document.createElement('div');
      set.className = "set";
      var content = document.createElement('div');
      content.className = "content";
      var pepperName = document.createElement('a');
      pepperName.href="#";
      var icon = document.createElement('i');
      icon.className = "fa fa-plus";
      var pepperSpecies = document.createElement('p');
      var pepperDescription = document.createElement('p');

      pepperName.textContent = list[i].Name; 
      pepperSpecies.textContent = list[i].Species;
      pepperDescription.textContent = list[i].Description;

      content.appendChild(pepperSpecies);
      content.appendChild(pepperDescription);

      pepperName.appendChild(icon);

      set.appendChild(pepperName);
      set.appendChild(content);
      group.appendChild(set);
         
    }
    
    section.appendChild(group); 
    
  })
}


function accordion() {
  $(".set > a").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content")
        .slideUp(200);
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    } else {
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $(this)
        .find("i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this)
        .siblings(".content")
        .slideDown(200);
    }
  });
};
