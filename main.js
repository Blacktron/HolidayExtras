var users = [];

$('#addUserBtn').on('click', function(e) {
    e.preventDefault();
    let id = $('#userID').val();
    let email = $('#userEmail').val();
    let firstName = $('#givenName').val();
    let lastName = $('#familyName').val();
    let created = new Date();

    let isUserCreated = createUser(id, email, firstName, lastName, created);
    isUserCreated ? alert('User created successfully!') : alert('User with the same ID already exists!');

    resetUserForm();
});

$('#showAllUsers').on('click', function () {
    displayResult(users);
});

$('#editUserBtn').on('click', function(e) {
    e.preventDefault();
    let userID = $('#userID').val();
    let userEmail = $('#userEmail').val();
    let userFirstName = $('#givenName').val();
    let userLastName = $('#familyName').val();

    editUser(userID, userEmail, userFirstName, userLastName);
    resetUserForm();
});

$('#resetUserBtn').on('click', function() {
    resetUserForm();
});

$('#searchForUser').on('click', function() {
    let searchStr = $('#searchUser').val().toLowerCase();
    let foundUsers = [];

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.firstName.toLowerCase().includes(searchStr) || user.lastName.toLowerCase().includes(searchStr)) {
            foundUsers.push(user);
        }
    }

    displayResult(foundUsers);
});

$('table').on('click', 'tr button.delete-button', function() {
    let userID = $(this).closest('tr').find('.table-row-id').text();
    $(this).closest('tr').remove();

    deleteUser(userID);
});

$('table').on('click', 'tr button.edit-button', function() {
    let userID = $(this).closest('tr').find('.table-row-id').text();
    let userEmail = $(this).closest('tr').find('.table-row-email').text();
    let userFirstName = $(this).closest('tr').find('.table-row-first-name').text();
    let userLastName = $(this).closest('tr').find('.table-row-last-name').text();

    $('#userID').val(userID).prop('disabled', 'disabled');
    $('#userEmail').val(userEmail);
    $('#givenName').val(userFirstName);
    $('#familyName').val(userLastName);
});

/**
 * @function
 * @description         Creates a user.
 * @param id            The ID of the user.
 * @param email         The email of the user.
 * @param firstName     The first name.
 * @param lastName      The last name.
 * @param created       The creation date of the user.
 */
function createUser(id, email, firstName, lastName, created) {
    // Validate user data.
    let isUserDataValid = validateUserData(id, email, firstName, lastName);

    if (!isUserDataValid) {
        throw new Error('Please provide value in every field.');
    } else {
        // Do not create a user if user with the same ID already exists.
        for (let i = 0; i < users.length; i++) {
            let user = users[i];

            if (user.id === id) {
                return false;
            }
        }

        let user = {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            created: created
        };

        users.push(user);
        return true;
    }
}

/**
 * @function
 * @description     Deletes a user.
 * @param userID    The ID of the user which has to be deleted.
 */
function deleteUser(userID) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userID) {
            users.splice(i, 1);
            break;
        }
    }
}

/**
 * @function
 * @description             Modifies the data of a user. Everything except the ID and the date created
 * can be modified.
 * @param userID            The ID of the user.
 * @param userEmail         The email of the user.
 * @param userFirstName     The first name.
 * @param userLastName      The last name.
 */
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

/**
 * @function
 * @description     Clears the data from the form.
 */
function resetUserForm() {
    $('#addUser')[0].reset();
    $('#userID').removeAttr('disabled');
}

/**
 * @function
 * @description     Displays the user data in the table.
 * @param users     The array which holds the users and the date related to them.
 */
function displayResult(users) {
    let userTable = $('#allUsersData');
    let editBtn = "<button class=\"btn btn-success edit-button\" type=\"button\">Edit</button>";
    let deleteBtn = "<button class=\"btn btn-danger delete-button\" type=\"button\">Delete</button>";
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
}

/**
 * @function
 * @description         Validates if all data is provided
 * @param id            The ID of the user.
 * @param email         The email of the user.
 * @param firstName     The first name.
 * @param lastName      The last name.
 * @returns {boolean}   True if all data is provided, false otherwise.
 */
function validateUserData (id, email, firstName, lastName) {
    if (id === '' || email === '' || firstName === '' || lastName === '') {
        return false;
    }

    return true;
}

/**
 * @function
 * @description     Unit tests user creation.
 */
function testCreateUser(userID, userEmail, userFirstName, userLastName) {
    let created = new Date();
    let isTestUserCreated = createUser(userID, userEmail, userFirstName, userLastName, created);
    isTestUserCreated ? console.log('Success') : console.log('Fail');
}
testCreateUser('vbutanski', 'viktor.butanski@gmail.com', 'Viktor', 'Viktor', 'Butanski');