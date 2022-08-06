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
      pepperName.href="javascript:void(0);";
      var icon = document.createElement('i');
      icon.className = "fa fa-plus";
      var tagLine = document.createElement('h5');
      var pepperOrigin = document.createElement('span');
      pepperOrigin.className = "origin";
      var pepperSpecies = document.createElement('span');
      pepperSpecies.className = "species";
      var pepperDescription = document.createElement('p');
      var source = document.createElement('a');
      source.className = "source";     

      pepperName.textContent = list[i].Name; 
      pepperOrigin.textContent = list[i].Origin;
      pepperSpecies.textContent = list[i].Species;
      pepperDescription.textContent = list[i].Description;
      source.textContent = list[i].SourceName;
      
      var sourceURL = list[i].SourceURL;
      source.setAttribute('href', sourceURL);

      //add if loops here to check the origin and species aren't blank
      tagLine.appendChild(pepperOrigin);
      tagLine.appendChild(pepperSpecies);
      content.appendChild(tagLine);
      content.appendChild(pepperDescription);
      content.appendChild(source);
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


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
  }
};


$(function () {
  var value;
  $("#search").on("keyup", function () {
    value = $(this).val().toLowerCase();
    //console.log(value);
    $(".set").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  $("#searchReset").click(function () {
    $("#search").val("");
    value = "";
    //console.log(value);
    $(".set").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
