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
        label: "Week4 notes and excersices",
        url: "week4"
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
        url: "week9"
    },
    {
        label: "Week10 notes and excersices",
        url: "week10"
    },
    {
        label: "Week11 notes and excersices",
        url: "week11"
    },
    {
        label: "Week12 notes and excersices",
        url: "week12"
    },
    {
        label: "Week13 notes and excersices",
        url: "week13"
    },
    {
        label: "Week14 notes and excersices",
        url: "week14"
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