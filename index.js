// Get references to the form elements and the friends list display container
const friendForm = document.querySelector('#friendForm'); // Form element for adding new friends
const friendNameInput = document.querySelector('#friendNameInput'); // Input field for friend's name
const friendNumberInput = document.querySelector('#friendNumberInput'); // Input field for friend's number
const friendsListInfo = document.querySelector('#friendsListInfo'); // Table body element to display the list of friends
const deleteBtn=document.getElementById('delete')

// Retrieve stored friends data from local storage or initialize empty arrays if no data exists
let friendNames = JSON.parse(localStorage.getItem('friendNames')) || [];
let friendNumbers = JSON.parse(localStorage.getItem('friendNumbers')) || [];

// Populate the friends list table if there is stored data
if (friendNames.length || friendNumbers.length) {
    // Build HTML string for the stored friends data
    let friendsTableHtml = '';
    for (let i = 0; i < friendNames.length; i++) {
        friendsTableHtml += `
        <tr>
            <td>${i+1}. ${friendNames[i]}</td>
            <td>${friendNumbers[i]}</td>
        </tr>
        `;
    }
    // Display the stored friends data in the table
    friendsListInfo.innerHTML = friendsTableHtml;
}

// Function to update local storage with the latest friends data
function updateLocalStorage() {
    // Store updated friends names and numbers arrays in local storage
    localStorage.setItem('friendNames', JSON.stringify(friendNames));
    localStorage.setItem('friendNumbers', JSON.stringify(friendNumbers));
}

// Function to add a new friend to the lists and update the table
function addFriend(name, number) {
    // Add the new friend to the arrays
    friendNames.push(name);
    friendNumbers.push(number);
    
    // Append the new friend to the table
    friendsListInfo.innerHTML += `
    <tr>
        <td>${friendNames.length}. ${name}</td>
        <td>${number}</td>
    </tr>
    `;
}

// Handle form submission to add a new friend
friendForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get input values from the form fields
    const friendName = friendNameInput.value;
    const friendNumber = friendNumberInput.value;

    // Add the new friend to the list and update the table display
    addFriend(friendName, friendNumber);
   
    // Update local storage with the new data
    updateLocalStorage();

    // Clear all input fields in the form to reset the form for new input
    friendForm.reset();
});

// Clear friendlist and update the dom
deleteBtn.addEventListener('click',function(){
   localStorage.clear()
   friendsListInfo.innerHTML=''
})
