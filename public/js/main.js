const fetchCars = async () => {
    try {
        const response = await fetch('/cars');
        if (!response.ok) {
            throw new Error('Failed to fetch car data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching car data:', error);
        throw error;
    }
}

// Send form data to backend server
const submitForm = () => {
    let formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        password: $('#password').val(),
        email: $('#email').val()
    };

    fetch('/saveUserForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                // Check if response has content-type application/json
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json(); // Parse response body as JSON
                } else {
                    // If response doesn't have JSON content, return empty object
                    return {};
                }
            } else {
                throw new Error('Failed to submit form data');
            }
        })
        .then(data => {
            // Handle successful response from server
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerText = 'Form data submitted successfully.';
            $('#first_name').val('');
            $('#last_name').val('');
            $('#password').val('');
            $('#email').val('');
        })
        .catch(error => {
            // Handle error
            console.error('Error submitting form data:', error);
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerText = 'Error submitting form data. Please try again later.';
        });
}


const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
}
$(document).ready(async function () {
    $('.materialboxed-image').materialbox();

    try {
        const cars = await fetchCars();
        addCards(cars);
    } catch (error) {
        console.error('Error loading car data:', error);
    }
    $('#formSubmit').click(() => {
        submitForm();
    });
    $('.modal').modal();
});
