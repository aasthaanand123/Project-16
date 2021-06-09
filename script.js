//draggable list
let sortinglist = document.querySelector(".first");
let sortable = Sortable.create(sortinglist);
let choices = document.querySelectorAll(".btn");

let body = document.querySelector("body");

let changecolr = function () {
  if (body.classList.contains("dark-theme")) {
    choices.forEach((choice) => {
      choice.style.color = "hsl(233, 14%, 35%)";
    });
  } else if (body.classList.contains("light-theme")) {
    choices.forEach((choice) => {
      choice.style.color = "gray";
    });
  }
};

let all_func = function () {
  let ar_one = Array.from(sortinglist.children);

  if (!ar_one.every((el) => (el.style.display = "flex"))) {
    ar_one.forEach((el) => {
      el.style.display = "flex";
    });
  }
};
// minus elements which contain add class

let all = document.querySelectorAll(".all");
let active = document.querySelectorAll(".active");
let completed_opt = document.querySelectorAll(".completed_opt");
//mode change
let icon_change = document.querySelector(".image");

icon_change.addEventListener("click", function () {
  choices.forEach((choice) => {
    if (choice.style.color === "hsl(220, 98%, 61%)") {
      choice.style.color = "hsl(220, 98%, 61%)";
    } else if (body.classList.contains("dark-theme")) {
      choice.style.color = "gray";
    } else if (body.classList.contains("light-theme")) {
      choice.style.color = "hsl(233, 14%, 35%)";
    }
  });
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");
  let save;
  if (body.classList.contains("light-theme")) {
    save = true;
  } else if (body.classList.contains("dark-theme")) {
    save = false;
  }
  localStorage.setItem("theme", save);
});
if (localStorage.getItem("theme") == "true") {
  body.classList.add("light-theme");
  body.classList.remove("dark-theme");
} else if (localStorage.getItem("theme") == "false") {
  body.classList.add("dark-theme");
  body.classList.remove("light-theme");
}
//display flex
let flex_display = function () {
  Array.from(sortinglist.children)
    .filter((el) => el.style.display == "flex")
    .forEach((child, index) => {
      if (index == 0) {
        child.style.borderTopLeftRadius = "5px";
        child.style.borderTopRightRadius = "5px";
      }
    });
};
//take input from user and make an element
let check = function () {
  if (sortinglist.childElementCount > 0 && todos.contains(enter)) {
    todos.removeChild(enter);
  } else if (sortinglist.childElementCount == 0 && !todos.contains(enter)) {
    todos.insertBefore(enter, options_one);
  }
};
let todos = document.querySelector(".todos");
let input = document.querySelector("input");
let enter = document.querySelector(".enter");
let options_one = document.querySelector(".options_one");
let todos_count = document.querySelector(".todos_number");
let newEl = function (input, tf) {
  let el = document.createElement("li");
  el.innerHTML = `<span class="complete">
  <button class="circle ${tf ? "add" : ""}"></button>
  <span class="inp ${tf ? "add_one" : ""}">${input}</span>
  </span>
  <button class="cross"></button>`;

  sortinglist.insertAdjacentElement("afterbegin", el);
  check();
};
let check_one = function () {
  Array.from(sortinglist.children).forEach((child, index) => {
    if (index > 0) {
      child.style.borderTopLeftRadius = "0px";
      child.style.borderTopRightRadius = "0px";
    } else if (index == 0) {
      child.style.borderTopLeftRadius = "5px";
      child.style.borderTopRightRadius = "5px";
    }
  });
};
let check_val = function () {
  let ar = Array.from(sortinglist.children);
  let ar_json = [];
  ar.forEach((el) => {
    let obj = {
      content: el.children[0].children[1].innerText,
      addOrNot: el.children[0].children[1].classList.contains("add_one"),
    };
    ar_json.push(obj);
  });
  localStorage.setItem("todos", JSON.stringify(ar_json));
  todos_count.innerText++;
};
//on pressing enter input is logged
input.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    let inputVal = e.target.value;
    if (inputVal) {
      if (
        Array.from(sortinglist.children).some(
          (el) =>
            el.style.borderTopLeftRadius == "5px" &&
            el.style.borderTopRightRadius == "5px"
        )
      ) {
        Array.from(sortinglist.children).forEach((child) => {
          child.style.borderTopRightRadius = "0px";
          child.style.borderTopLeftRadius = "0px";
        });
      }
      newEl(inputVal);
      e.target.value = "";
      changecolr();
      all_func();
      if (!(localStorage.getItem("todos") == null)) {
        let items = JSON.parse(localStorage.getItem("todos"));
        items.push({
          content: inputVal,
          addOrNot: false,
        });
        todos_count.innerText++;
        localStorage.setItem("todos", JSON.stringify(items));
      } else {
        check_val();
      }
      all.forEach((btn) => {
        btn.style.color = "hsl(220, 98%, 61%)";
      });
    }
  }
});
//when clicked on cross element gets removed
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cross")) {
    let items = JSON.parse(localStorage.getItem("todos"));
    items.forEach((el, index) => {
      if (e.target.parentElement.innerText.trim() == el.content) {
        items.splice(index, 1);
      }
    });
    let l = Array.from(items).length;
    localStorage.setItem("todos", JSON.stringify(items));
    let counter = 0;
    let ar = Array.from(sortinglist.children)
      .filter((el) => el.children[0].children[0].classList.contains("add"))
      .forEach((el) => {
        counter++;
      });
    if (
      !todos.contains(enter) &&
      (counter == 0 || sortinglist.childElementCount == 1) &&
      l == 0
    ) {
      todos.insertBefore(enter, options_one);
    }
    let count = todos_count.innerText;
    if (
      count > 0 &&
      !e.target.parentElement.children[0].children[0].classList.contains("add")
    ) {
      count--;
    }
    let bydef = false;
    active.forEach((el) => {
      if (el.style.color == "hsl(220, 98%, 61%)") {
        bydef = !bydef;
      }
    });
    if (sortinglist.childElementCount <= 2 && bydef) {
      todos.insertBefore(enter, options_one);
    }
    todos_count.innerText = count;
    sortinglist.removeChild(e.target.parentElement);
    flex_display();
  }
});
//underline when checkbox checked
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("circle")) {
    e.target.classList.toggle("add");
    changecolr();
    all.forEach((btn) => {
      btn.style.color = "hsl(220, 98%, 61%)";
    });

    if (e.target.classList.contains("add")) {
      if (todos_count.innerText > 0) {
        todos_count.innerText--;
      }
    } else {
      todos_count.innerText++;
    }
    all_func();

    e.target.nextElementSibling.classList.toggle("add_one");
    //modify local storage for properties
    let items = JSON.parse(localStorage.getItem("todos"));
    items.forEach((item) => {
      if (item.content == e.target.parentElement.children[1].innerText) {
        if (e.target.classList.contains("add")) {
          item.addOrNot = true;
        } else {
          item.addOrNot = false;
        }
      }
    });
    localStorage.setItem("todos", JSON.stringify(items));
  }
});

//clear completed
let completed_clear = document.querySelector(".clear_comp");
completed_clear.addEventListener("click", function () {
  let ar = Array.from(sortinglist.children);
  ar.forEach((el) => {
    if (el.children[0].children[0].classList.contains("add")) {
      sortinglist.removeChild(el);
      check();
      //remove from local storage
    }
  });
  if (
    ar
      .filter((el) => el.children[0].children[0].classList.contains("add"))
      .every((el) => el.style.display == "flex") &&
    completed_opt.forEach((opt) => opt.style.color == "hsl(220, 98%, 61%)")
  ) {
    todos.insertBefore(enter, options_one);
  }

  let array_items = [];
  Array.from(sortinglist.children).forEach((el) => {
    array_items.push({
      content: el.children[0].children[1].innerText,
      addOrNot: false,
    });
  });
  localStorage.setItem("todos", JSON.stringify(array_items));
});
//states of active completed

let filter = function (display_one, display_two) {
  let ar_one = Array.from(sortinglist.children);
  ar_one.forEach((el) => {
    if (el.children[0].children[0].classList.contains("add")) {
      el.style.display = display_one;
    } else {
      el.style.display = display_two;
    }
    if (ar_one.every((el) => el.style.display == "none")) {
      todos.insertBefore(enter, options_one);
    } else if (todos.contains(enter)) {
      todos.removeChild(enter);
    }
  });
};

all.forEach((btn) => {
  btn.addEventListener("click", function () {
    all_func();
    check();
    changecolr();
    // Array.from(sortinglist.children).forEach((el, index) => {
    //   if (index > 0) {
    //     el.style.borderTopRightRadius = "0px";
    //     el.style.borderTopLeftRadius = "0px";
    //   }
    // });
    all.forEach((btn) => (btn.style.color = "hsl(220, 98%, 61%)"));
  });
});
active.forEach((btn) => {
  btn.addEventListener("click", function () {
    filter("none", "flex");
    // borders();
    changecolr();
    active.forEach((btn) => (btn.style.color = "hsl(220, 98%, 61%)"));
  });
});
completed_opt.forEach((btn) => {
  btn.addEventListener("click", function () {
    filter("flex", "none");
    // borders();

    changecolr();
    completed_opt.forEach((btn) => (btn.style.color = "hsl(220, 98%, 61%)"));
  });
});
//when clicked color changes
let counter = 0;
if (JSON.parse(localStorage.getItem("todos") != null)) {
  JSON.parse(localStorage.getItem("todos")).forEach((el) => {
    newEl(el.content, el.addOrNot);
    if (!el.addOrNot) {
      counter++;
    }
  });
}

todos_count.innerText = counter;
let new_circle = document.querySelector(".new");
new_circle.addEventListener("click", function () {
  if (input.value) {
    new_circle.classList.add("add");
    newEl(input.value);
    if (!(localStorage.getItem("todos") == null)) {
      let items = JSON.parse(localStorage.getItem("todos"));
      items.push({
        content: input.value,
        addOrNot: false,
      });
      todos_count.innerText++;
      localStorage.setItem("todos", JSON.stringify(items));
    } else {
      check_val();
    }
    input.value = "";
    changecolr();
    all_func();
    setTimeout(() => {
      new_circle.classList.remove("add");
    }, 100);
  }
});
// function borders() {
//   if (
//     Array.from(sortinglist.children).some(
//       (el) =>
//         el.style.borderTopLeftRadius == "5px" &&
//         el.style.borderTopRightRadius == "5px"
//     )
//   ) {
//     Array.from(sortinglist.children).forEach((child) => {
//       child.style.borderTopRightRadius = "0px";
//       child.style.borderTopLeftRadius = "0px";
//     });
//   }
//   let filtered = Array.from(sortinglist.children).filter(
//     (el) => el.style.display == "flex"
//   );
//   console.log(filtered);
//   filtered[0].style.borderTopRightRadius = "5px";
//   filtered[0].style.borderTopLeftRadius = "5px";
// }
