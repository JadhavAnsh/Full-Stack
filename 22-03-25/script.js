//settimeout example

// console.log("first");
// setTimeout(() => {
//     console.log("second");
// }, 0);
// console.log("thrid");

//promise example

function fetchUserData(userID) {
    return new Promise((resolve, reject) => {
        console.log("fetching user data..");

        setTimeout(() => {
            const users = {
                1: "Ansh",
                2: "Nishant",
                3: "Prabhat",
                4: "Dhruv"
            }

            const user = users[userID]

            if(user){
                console.log("API call successful");
                console.log("user data fetched");

                resolve(user)
            } else {
                console.log("API call failed");
                reject(new Error("user not found"));
            }
        }, 2000);
    });
}

fetchUserData(1)
.then((user) => {
    console.log("User fetched:", user);
})
.catch((error) => {
    console.log("Error:", error.message);
});
console.log("Request sent");