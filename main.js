var users = [];

$('#addUserBtn').on('click', event, function() {
    event.preventDefault();
    let id = $('#userID').val();
    let email = $('#userEmail').val();
    let firstName = $('#givenName').val();
    let lastName = $('#familyName').val();
    let created = new Date();

    createUser(id, email, firstName, lastName, created);
    $('#addUser')[0].reset();
});

$('#showAllUsers').on('click', event, function () {
    event.preventDefault();
    $('#allUsers').show();

    for (var i = 0; i < users.length; i++) {
        var userData = users[i];
        var userDataRow = "<tr><td>" + userData.id + "</td><td>" + userData.email + "</td><td>" +
            userData.firstName + "</td><td>" + userData.lastName + "</td><td>" + userData.created + "</td></tr>";

        $('#allUsersData').append(userDataRow);
    }
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
    console.log(users);
}