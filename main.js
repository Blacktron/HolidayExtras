var users = [];

$('#addUserBtn').on('click', function(e) {
    e.preventDefault();
    let id = $('#userID').val();
    let email = $('#userEmail').val();
    let firstName = $('#givenName').val();
    let lastName = $('#familyName').val();
    let created = new Date();

    createUser(id, email, firstName, lastName, created);
    $('#addUser')[0].reset();
});

$('#showAllUsers').on('click', function (e) {
    e.preventDefault();
    $('#allUsers').show();
    let editBtn = "<button class=\"edit-button\" type=\"submit\">Edit</button>";
    let deleteBtn = "<button class=\"delete-button\" type=\"submit\">Delete</button>";

    for (let i = 0; i < users.length; i++) {
        let userData = users[i];
        let userDataRow = "<tr><td class='table-row-user-id'>" + userData.id + "</td><td>" + userData.email + "</td><td>" +
            userData.firstName + "</td><td>" + userData.lastName + "</td><td>" + userData.created +
            editBtn + deleteBtn + "</td></tr>";

        $('#allUsersData').append(userDataRow);
    }
});

$('table').on('click', 'tr button.delete-button', function(e) {
    e.preventDefault();
    let userID = $(this).closest('tr').find('.table-row-user-id').text();
    //$(this).closest('tr').remove();

    deleteUser(userID);
});

$('table').on('click', 'tr button.edit-button', function(e) {
    e.preventDefault();
    console.log('edit button clicked');
});

function createUser(id, email, firstName, lastName, created) {
    let user = {
        id: id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        created: created
    };

    users.push(user);
}

function deleteUser(userID) {
    console.log(users);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userID) {
            users.splice(i, 1);
            break;
        }
    }
    console.log(users);
}