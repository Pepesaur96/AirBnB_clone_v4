$(document).ready(function (){
    const amenityDict = {};
    $('input[type=checkbox]').click(function (){
        if ($(this).is(':checked')){
            amenityDict[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete amenityDict[$(this).data('id')];
        }
        const amenityList = Object.values(amenityDict);
        if (amenityList.length > 0){
            $('.amenities h4').text(Object.values(amenityDict).join(', '));
        }
        else {
            $('.amenities h4').html('&nbsp;');
        }
    })
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        console.log(data.status);
        if (data.status === "OK") {
            console.log('ok')
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    })

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: '{}',
        contentType: 'application/json',
        success: function (data) {
            for (const place of data) {
                $('section.places').append(
                    `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest(s)</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`
                );
            }
        }
    });
});
