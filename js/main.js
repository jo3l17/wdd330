const links = [
    {
        label: "Week1 notes and excersices",
        url: "week1"
    },
    {
        label: "Week2 notes and excersices",
        url: "week2"
    },
    {
        label: "Week3 notes and excersices",
        url: "week3"
    },
    {
        label: "Week4 tic tac toe",
        url: "week4"
    },
    {
        label: "Week4 connect four",
        url: "week4/connectfour"
    },
    {
        label: "Week5 notes and excersices",
        url: "week5"
    },
    {
        label: "ToDo App",
        url: "week6"
    },
    {
        label: "Week7 notes and excersices",
        url: "week7"
    },
    {
        label: "Week8 notes and excersices",
        url: "week8"
    },
    {
        label: "Week9 notes and excersices",
        url: "week9/parcel/src"
    },
    {
        label: "Week9 Team activity",
        url: "week9/team activity/"
    },
    {
        label: "Week10 notes and excersices",
        url: "week10"
    },
    {
        label: "Week11 notes and excersices",
        url: "week11/client/week11.html"
    },
    {
        label: "final Project deployed",
        url: "https://wdd330-weatherapp.herokuapp.com/"
    },
    {
        label: "final Project code",
        url: "https://github.com/jo3l17/wdd330-weatherapp"
    }
]
let main_container = document.getElementById("main_container");
let class_list = document.createElement("ul")
links.forEach(element=>{
    let item = document.createElement("li");
    let link = document.createElement("a");
    link.setAttribute("href",element.url);
    link.textContent=element.label;
    item.append(link)
    class_list.append(item)
})
main_container.append(class_list)