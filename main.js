var users = [];

$('#addUserBtn').on('click', function(e) {
    e.preventDefault();
    let id = $('#userID').val();
    let email = $('#userEmail').val();
    let firstName = $('#givenName').val();
    let lastName = $('#familyName').val();
    let created = new Date();

    if (id === '' || email === '' || firstName === '' || lastName === '') {
        alert('Please provide value in every field.');
    } else {
        createUser(id, email, firstName, lastName, created);
        resetUserForm();
    }
});

$('#showAllUsers').on('click', function (e) {
    e.preventDefault();
    let userTable = $('#allUsersData');
    let editBtn = "<button class=\"edit-button\" type=\"submit\">Edit</button>";
    let deleteBtn = "<button class=\"delete-button\" type=\"submit\">Delete</button>";
    $('#allUsers').show();

    // Remove previously displayed data.
    userTable.find('tr:gt(0)').remove();

    for (let i = 0; i < users.length; i++) {
        let userData = users[i];
        let userDataRow = "<tr><td class='table-row-id'>" + userData.id + "</td><td class='table-row-email'>" + userData.email +
            "</td><td class='table-row-first-name'>" + userData.firstName + "</td><td class='table-row-last-name'>" + userData.lastName +
            "</td><td class='table-row-created'>" + userData.created + "</td><td>" + editBtn + deleteBtn + "</td></tr>";

        userTable.append(userDataRow);
    }
});

$('#editUserBtn').on('click', function(e) {
    e.preventDefault();
    let userID = $('#userID').val();
    let userEmail = $('#userEmail').val();
    let userFirstName = $('#givenName').val();
    let userLastName = $('#familyName').val();

    editUser(userID, userEmail, userFirstName, userLastName);
});

$('#resetUserBtn').on('click', function(e) {
    e.preventDefault();
    resetUserForm();
    $('#userID').removeAttr('disabled');
});

$('table').on('click', 'tr button.delete-button', function(e) {
    e.preventDefault();
    let userID = $(this).closest('tr').find('.table-row-id').text();
    $(this).closest('tr').remove();

    deleteUser(userID);
});

$('table').on('click', 'tr button.edit-button', function(e) {
    e.preventDefault();
    let userID = $(this).closest('tr').find('.table-row-id').text();
    let userEmail = $(this).closest('tr').find('.table-row-email').text();
    let userFirstName = $(this).closest('tr').find('.table-row-first-name').text();
    let userLastName = $(this).closest('tr').find('.table-row-last-name').text();

    $('#userID').val(userID).prop('disabled', 'disabled');
    $('#userEmail').val(userEmail);
    $('#givenName').val(userFirstName);
    $('#familyName').val(userLastName);
});

function createUser(id, email, firstName, lastName, created) {
    let isUserExists = false;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.id === id) {
            alert('User with the same ID already exists!');
            isUserExists = true;
        }
    }

    if (!isUserExists) {
        let user = {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            created: created
        };

        users.push(user);
        alert('User created successfully!');
    }
}

function deleteUser(userID) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userID) {
            users.splice(i, 1);
            break;
        }
    }
}

function editUser(userID, userEmail, userFirstName, userLastName) {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.id === userID)  {
            user.email = userEmail;
            user.firstName = userFirstName;
            user.lastName = userLastName;
            break;
        }
    }
}

function resetUserForm() {
    $('#addUser')[0].reset();
}