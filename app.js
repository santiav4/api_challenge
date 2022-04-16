const apiUrl = "https://jsonplaceholder.typicode.com/users";

let tbody = document.getElementById("tbody");

fetch(apiUrl)
    .then((response) => response.json())
    .then((users) => {
        console.log(users);
        users.map((user) => {
            let tableRow = document.createElement("tr");
            let tableDataUser = document.createElement("td");
            tableDataUser.innerText = user.name;
            tableDataUser.setAttribute("id", user.id);
            tableRow.appendChild(tableDataUser);

            tbody.prepend(tableRow);

            tableDataUser.addEventListener("click", () => {
                let firstTableRow = document.getElementsByTagName("tr")[1];
                let h2 = document.getElementsByTagName("h2");
                let p = document.getElementsByTagName("p");

                if (h2) {
                    for (let element of h2) {
                        element.innerText = "";
                    }
                }
                if (p) {
                    for (let element of p) {
                        element.innerText = "";
                    }
                }

                fetch("https://jsonplaceholder.typicode.com/posts")
                    .then((response) => response.json())
                    .then((posts) => {
                        console.log(posts);
                        let postByUser = posts.filter(
                            (post) => user.id === post.userId
                        );
                        postByUser.map((post) => {
                            let postTitle = document.createElement("h2");
                            postTitle.innerText = post.title;
                            firstTableRow.appendChild(postTitle);

                            let postBody = document.createElement("p");
                            postBody.innerText = post.body;
                            firstTableRow.appendChild(postBody);
                        });
                    });
            });
        });
    });
