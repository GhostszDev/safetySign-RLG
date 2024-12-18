$(document).ready(function() {

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let date = new Date();
    let today = new Date();
    let counter = 0;
    const fetchURI = 'https://rlg-safetysign.onrender.com/datamanager';
    const headers = {
        "access-control-allow-origin:": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
    };


    async function getDateFromFile() {
        try{
            const response = await fetch(fetchURI);

            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
            
                // .then(response => response.json())
                // .then(json => {
                //     date = new Date(json.date);
                //     counter = Math.round(Math.abs((date - today) / oneDay));
                //     $('.daysCounter').append(counter);
                // });
            const json = await response.json();
            date = new Date(json.date);

            date.setHours(8);
            // today.setHours(23);

            console.log(date.toString());
            console.log(today.toString());

            counter = Math.round(Math.abs((date - today) / oneDay));
             $('.daysCounter').append(counter);
          } catch (error) {
            console.error(error.message);
          }
    }

    async function saveDateToFile() {
        let newdate = new Date($('.adminDatePicker')[0].value).toJSON();
        console.log(newdate);

        let response = $.post(fetchURI, {date: newdate});

        console.log(response);

    }

    if($('.daysCounter').length > 0){
        getDateFromFile();
    }

    if($('.adminDatePicker').length > 0){
        $('.adminDatePicker').change(()=>saveDateToFile());
    }

});
