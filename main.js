$(document).ready(function() {

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let date = new Date();
    let today = new Date();
    let counter = 0;
    const fetchURI = 'https://rld-safety-sign-2e3e5dd3d14c.herokuapp.com/dataManager';
    const headers = {
        "access-control-allow-origin:": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
    };


    function getDateFromFile() {
        fetch(fetchURI, {
            method: "GET",
            headers: {
                "access-control-allow-origin:": "*",
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(json => {
                date = new Date(json.date);
                counter = Math.round(Math.abs((date - today) / oneDay));
                $('.daysCounter').append(counter);
            });
    }

    async function saveDateToFile() {
        let newdate = new Date($('.adminDatePicker')[0].value).toJSON();
        let dateJson = { date: newdate };


    }

    if($('.daysCounter').length > 0){
        getDateFromFile();
    }

    if($('.adminDatePicker').length > 0){
        $('.adminDatePicker').change(()=>saveDateToFile());
    }

});
