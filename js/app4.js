


//Variable for number of total students
var studentCount = $("li").length;

//variable for total number of pages needed
var numberOfPages = Math.ceil(studentCount/10);

//Empty array to put search results in
var results = [];

//Function to set page up for search
//(Dynamically add html markup)
function pageSetup(){
    $("div.page-header").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>");

    $(".student-list").append("<div class='message'><p>No matches found.</p></div>");

    $(".message").hide();


}

//Function enabling pagination
function pagination(){
    $("li.student-item").slice(10).hide(); //Hide student items starting at 10th index
    var $pageUList = $("<ul></ul>");
    $(".page").append("<div class='pagination'></div>");  //Start appending markup dynamically
    $(".pagination").append($pageUList);


    //Loop through page numbers with page links
    for(var i = 0; i < numberOfPages; i++){
        var link = "<a href='#'>" + (i+1) + "</a>";
        var $pageListItem = $("<li>" + link +"</li>");
        $(".pagination ul").append($pageListItem);

    }
    //Click event bound to pagination links
    $(".pagination a").click(function(){
        $(".student-item").hide();
        var currentPage = $(this).text();  //Use page number text as calculation starting point
        $(".pagination a").removeClass("active"); //remove active class from other clicked links
        $(this).addClass("active");  //Add active class to currently clicked link
        var startIndex = (currentPage * 10) - 10;
        var endIndex = currentPage * 10;
        $(".student-item").slice(startIndex, endIndex).show();  //Show 10 students per page using start and end index

        //If results array isn't empty then show ten per page
        if (results.length > 1){
            $(".student-item").hide();
            $(results).slice(startIndex, endIndex).show();
        }

    });

}


//Function enabling live search
function search(){
    $("input").keyup(function(){  //On keyup in search bar (input)
        $(".student-item").hide();

        //Set results array to empty
         results = [];

        //Get search input
        var search = $("input").val().toLowerCase();

        //Get name and email from each student list item and push to empty array
            //if search input matches
        $(".student-list").children().each(function(){
            var email = $(this).find(".email").text();
            var name = $(this).find("h3").text();

            if (email.indexOf(search) !== -1|| name.indexOf(search) !== -1){
                results.push(this);
            }
        });

        $(results).each(function(){ //show search results from results array
            $(this).show();
        });

        if (results.length < 1) {  //If no search results, show 'No matches found' message
            $(".message").show();
        } else {
            $(".message").hide();
        }


        $(results).slice(10).hide(); //Hide results in array starting at the tenth index

        $(".pagination li").show(); //Show pagination list items

        $(".pagination li").slice(Math.ceil(results.length/10)).hide();  //Hide pagination list items
                                                                        //Using results.length math.ceil calcultations as starting index

        if(results.length <= 10){
            $(".pagination ul").children().hide();  //Hide pagination list items is results array length is less than or
                                            //equal to 10
        }


    });

}



//Call all functions
pagination();

pageSetup();

search();
